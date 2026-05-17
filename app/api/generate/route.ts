import { NextRequest, NextResponse } from 'next/server';

// Free tier: 20 requests per day per IP (increased for better user experience)
const FREE_DAILY_LIMIT = 20;

// In-memory rate limiting (use Vercel KV or similar for production)
const rateLimitMap = new Map<string, { count: number; date: string }>();

function checkRateLimit(ip: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  const record = rateLimitMap.get(ip);

  if (!record || record.date !== today) {
    rateLimitMap.set(ip, { count: 1, date: today });
    return true;
  }

  if (record.count >= FREE_DAILY_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Rate limiting
    const allowed = checkRateLimit(ip);
    const remaining = rateLimitMap.get(ip)?.count
      ? FREE_DAILY_LIMIT - (rateLimitMap.get(ip)?.count || 0)
      : FREE_DAILY_LIMIT;

    const { productName, productFeatures, platform, language } = await req.json();

    if (!productName) {
      return NextResponse.json({ error: '请输入产品名称 / Please enter product name' }, { status: 400 });
    }

    // Build prompt based on platform - supports both Chinese and international platforms
    const platformPrompts: Record<string, string> = {
      // === Chinese Platforms ===
      xiaohongshu: `你是一位小红书爆款笔记写手。请为以下产品写一篇种草笔记。

产品名称：${productName}
产品特点：${productFeatures || '暂无'}

要求：
1. 标题要吸睛，带 emoji，20字以内
2. 正文 300-500 字，口语化，像朋友推荐
3. 穿插 3-5 个 emoji
4. 结尾带 3-5 个相关话题标签（#xxx）
5. 分段清晰，适当留白
6. 突出产品痛点和解决方案`,

      douyin: `你是一位抖音短视频脚本写手。请为以下产品写一个 30-60 秒的短视频脚本。

产品名称：${productName}
产品特点：${productFeatures || '暂无'}

要求：
1. 开头 3 秒抓眼球（痛点/反问/数据）
2. 中间展示产品核心卖点
3. 结尾引导互动（点赞/评论/关注）
4. 标注画面建议和字幕
5. 总时长控制在 30-60 秒`,

      ecommerce: `你是一位电商运营专家。请为以下产品写一份详情页文案。

产品名称：${productName}
产品特点：${productFeatures || '暂无'}

要求：
1. 标题：含核心关键词，20字以内
2. 卖点提炼：3-5 个核心卖点，每个一句话
3. 产品描述：200-300 字，突出使用场景和效果
4. 规格参数区域文案
5. 适合人群描述`,

      wechat: `你是一位微信朋友圈文案写手。请为以下产品写一条朋友圈推广文案。

产品名称：${productName}
产品特点：${productFeatures || '暂无'}

要求：
1. 100-150 字
2. 口语化，像朋友分享好物
3. 带 1-2 个 emoji
4. 突出一个核心卖点
5. 不像广告，像真实体验分享`,

      // === International Platforms ===
      instagram: `You are an Instagram content expert. Create an engaging Instagram post for the following product.

Product: ${productName}
Features: ${productFeatures || 'N/A'}

Requirements:
1. Eye-catching caption with hook in first line
2. 150-300 characters, conversational tone
3. Include 5-10 relevant hashtags
4. Add 2-3 emojis naturally
5. Clear CTA (follow, like, comment, or link in bio)
6. Focus on lifestyle benefits, not just features`,

      tiktok: `You are a TikTok script writer. Create a viral 30-60 second video script for the following product.

Product: ${productName}
Features: ${productFeatures || 'N/A'}

Requirements:
1. Hook in first 3 seconds (question, shock, or relatable moment)
2. Show the problem → solution → result
3. Include on-screen text suggestions
4. Suggest trending audio type
5. End with strong CTA (follow for more, link in bio)
6. Keep it fast-paced and engaging`,

      amazon: `You are an Amazon listing expert. Create a compelling product listing for the following product.

Product: ${productName}
Features: ${productFeatures || 'N/A'}

Requirements:
1. Product Title: 150-200 characters, include main keywords
2. Bullet Points: 5 key benefits (not features), each 100-150 characters
3. Product Description: 200-300 words, emotional storytelling
4. Backend Keywords: 10-15 relevant search terms
5. Target Audience: Who should buy this and why`,

      facebook: `You are a Facebook marketing expert. Create an engaging Facebook post for the following product.

Product: ${productName}
Features: ${productFeatures || 'N/A'}

Requirements:
1. Attention-grabbing opening line
2. 150-250 words, conversational and authentic
3. Include a question to encourage comments
4. Add 2-3 relevant emojis
5. Clear CTA (shop now, learn more, comment below)
6. Focus on value and benefits`,

      twitter: `You are a Twitter/X marketing expert. Write a promotional tweet for the following product.

Product: ${productName}
Features: ${productFeatures || 'N/A'}

Requirements:
1. Under 280 characters total
2. Hook in the first line
3. Include 1-2 relevant hashtags
4. Clear CTA
5. Engaging and concise
6. Can use thread format if needed (indicate 1/2, 2/2)`,

      linkedin: `You are a LinkedIn content expert. Create a professional post for the following product/service.

Product: ${productName}
Features: ${productFeatures || 'N/A'}

Requirements:
1. Professional yet engaging opening
2. 150-300 words, industry-focused
3. Include data, statistics, or industry insight if relevant
4. Add 3-5 relevant hashtags
5. End with a question or CTA to drive engagement
6. Focus on business value and ROI`,

      youtube: `You are a YouTube script writer. Create a video script for the following product.

Product: ${productName}
Features: ${productFeatures || 'N/A'}

Requirements:
1. Title suggestions (3 options, under 60 characters each)
2. Hook in first 10 seconds
3. Main content structure (intro, features, demo, benefits)
4. Timestamps for key sections
5. End screen CTA (subscribe, like, comment)
6. Suggested video length: 3-8 minutes`,

      // === All Platforms ===
      all: `You are a global content marketing expert. Generate marketing content for the following product across multiple platforms.

Product: ${productName}
Features: ${productFeatures || 'N/A'}

Generate content for ALL platforms below, use === to separate each:

=== Instagram Post ===
Caption with hashtags and emojis (150-300 chars)

=== TikTok Script ===
30-60 second video script with hooks and CTAs

=== Amazon Listing ===
Title + 5 bullet points + description

=== Facebook Post ===
Engaging post with question and CTA (150-250 words)

=== Twitter/X Tweet ===
Under 280 characters with hashtags

=== LinkedIn Post ===
Professional post with industry focus (150-300 words)

=== YouTube Script ===
Title options + 3-5 minute script outline`
    };

    const selectedPlatform = platform || 'all';
    const prompt = platformPrompts[selectedPlatform];
    const lang = language || 'en';

    // Call DeepSeek API
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: lang === 'en'
              ? 'You are a professional content marketing expert specializing in social media and e-commerce. Generate high-quality, engaging marketing content that converts. Always be creative, authentic, and platform-appropriate.'
              : '你是一位专业的营销内容专家，擅长社交媒体和电商内容创作。生成高质量、有吸引力、能转化的营销内容。始终保持创意、真实，并符合各平台特点。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      return NextResponse.json({ error: 'AI generation failed, please try again' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'Generation failed, please retry';

    return NextResponse.json({
      content,
      platform: selectedPlatform,
      remaining: Math.max(0, remaining - 1),
      isFree: allowed,
      dailyLimit: FREE_DAILY_LIMIT
    });

  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Server error, please try again' }, { status: 500 });
  }
}
