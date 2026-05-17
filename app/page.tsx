'use client';

import { useState } from 'react';

type Platform = 'xiaohongshu' | 'douyin' | 'ecommerce' | 'wechat' | 'instagram' | 'tiktok' | 'amazon' | 'facebook' | 'twitter' | 'linkedin' | 'youtube' | 'all';

interface PlatformOption {
  id: Platform;
  label: string;
  labelEn: string;
  icon: string;
  desc: string;
  descEn: string;
}

const platforms: PlatformOption[] = [
  // Chinese Platforms
  { id: 'xiaohongshu', label: '小红书笔记', labelEn: 'Xiaohongshu', icon: '📕', desc: '种草笔记，带 emoji 和话题标签', descEn: 'Viral posts with emojis & hashtags' },
  { id: 'douyin', label: '抖音脚本', labelEn: 'Douyin Script', icon: '🎬', desc: '30-60 秒短视频脚本', descEn: '30-60 sec video scripts' },
  { id: 'ecommerce', label: '电商详情页', labelEn: 'E-commerce Page', icon: '🛒', desc: '商品标题 + 卖点 + 描述', descEn: 'Product title, bullets, description' },
  { id: 'wechat', label: '朋友圈文案', labelEn: 'WeChat Moment', icon: '💬', desc: '100-150 字口语化分享', descEn: 'Casual 100-150 char posts' },
  // International Platforms
  { id: 'instagram', label: 'Instagram', labelEn: 'Instagram', icon: '📸', desc: '帖子 + Hashtags + Emojis', descEn: 'Posts with hashtags & emojis' },
  { id: 'tiktok', label: 'TikTok 脚本', labelEn: 'TikTok Script', icon: '🎵', desc: '病毒短视频脚本', descEn: 'Viral short video scripts' },
  { id: 'amazon', label: 'Amazon Listing', labelEn: 'Amazon Listing', icon: '📦', desc: '产品标题 + 5个卖点', descEn: 'Title + 5 bullet points' },
  { id: 'facebook', label: 'Facebook 帖子', labelEn: 'Facebook Post', icon: '👍', desc: '互动帖子 + CTA', descEn: 'Engaging posts with CTA' },
  { id: 'twitter', label: 'Twitter/X', labelEn: 'Twitter/X', icon: '🐦', desc: '280 字符推文', descEn: '280-char tweets' },
  { id: 'linkedin', label: 'LinkedIn 帖子', labelEn: 'LinkedIn Post', icon: '💼', desc: '专业职场内容', descEn: 'Professional B2B content' },
  { id: 'youtube', label: 'YouTube 脚本', labelEn: 'YouTube Script', icon: '▶️', desc: '视频标题 + 脚本大纲', descEn: 'Video titles + script outline' },
  // All
  { id: 'all', label: '全部生成', labelEn: 'Generate All', icon: '🚀', desc: '一键生成所有平台内容', descEn: 'One-click all platforms' },
];

export default function Home() {
  const [productName, setProductName] = useState('');
  const [productFeatures, setProductFeatures] = useState('');
  const [platform, setPlatform] = useState<Platform>('all');
  const [language, setLanguage] = useState<'zh' | 'en'>('en');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(20);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!productName.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: productName.trim(),
          productFeatures: productFeatures.trim(),
          platform,
          language,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setResult(`❌ ${data.error}`);
      } else {
        setResult(data.content);
        setRemaining(data.remaining);
      }
    } catch {
      setResult('❌ Network error, please check your connection');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
              ⚡
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">AI Content Factory</h1>
              <p className="text-xs text-slate-500">
                {language === 'zh' ? 'AI 内容工厂 — 一键生成全平台营销内容' : 'AI Content Factory — Generate Marketing Content for All Platforms'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500">
              {language === 'zh' ? '今日剩余：' : 'Today remaining: '}
              <span className="font-bold text-blue-600">{remaining}</span> / 20
            </div>
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            >
              {language === 'zh' ? '🇨🇳 中文' : '🇺🇸 English'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            {language === 'zh' ? '输入产品，生成全平台内容' : 'Enter Product, Get All-Platform Content'}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {language === 'zh'
              ? 'AI 自动生成小红书、抖音、Instagram、TikTok、Amazon、Facebook、Twitter、LinkedIn、YouTube 等平台内容'
              : 'AI generates content for Xiaohongshu, Douyin, Instagram, TikTok, Amazon, Facebook, Twitter, LinkedIn, YouTube and more'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            {/* Product Name */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                📦 {language === 'zh' ? '产品名称' : 'Product Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder={language === 'zh' ? '例如：智能保温杯' : 'e.g., Smart Thermos Bottle'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800"
              />
            </div>

            {/* Product Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                ✨ {language === 'zh' ? '产品特点（可选）' : 'Product Features (Optional)'}
              </label>
              <textarea
                value={productFeatures}
                onChange={(e) => setProductFeatures(e.target.value)}
                placeholder={language === 'zh'
                  ? '例如：12小时保温、智能温控显示、316不锈钢内胆、便携设计'
                  : 'e.g., 12hr insulation, smart temp display, 316 stainless steel, portable design'}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800 resize-none"
              />
            </div>

            {/* Platform Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                🎯 {language === 'zh' ? '选择平台' : 'Select Platform'}
              </label>
              
              {/* Chinese Platforms */}
              <p className="text-xs text-slate-400 mb-2">🇨🇳 {language === 'zh' ? '国内平台' : 'Chinese Platforms'}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {platforms.filter(p => ['xiaohongshu', 'douyin', 'ecommerce', 'wechat'].includes(p.id)).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`p-2.5 rounded-xl border-2 text-left transition ${
                      platform === p.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{p.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{language === 'zh' ? p.label : p.labelEn}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* International Platforms */}
              <p className="text-xs text-slate-400 mb-2">🌍 {language === 'zh' ? '国际平台' : 'International Platforms'}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {platforms.filter(p => ['instagram', 'tiktok', 'amazon', 'facebook', 'twitter', 'linkedin', 'youtube'].includes(p.id)).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`p-2.5 rounded-xl border-2 text-left transition ${
                      platform === p.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{p.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{p.labelEn}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* All Platforms */}
              <button
                onClick={() => setPlatform('all')}
                className={`w-full p-3 rounded-xl border-2 text-left transition ${
                  platform === 'all'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚀</span>
                  <span className="text-sm font-semibold text-slate-700">
                    {language === 'zh' ? '全部生成（推荐）' : 'Generate All (Recommended)'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'zh' ? '一键生成所有平台内容' : 'One-click content for all platforms'}
                </p>
              </button>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !productName.trim() || remaining <= 0}
              className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition ${
                loading || !productName.trim() || remaining <= 0
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-200'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {language === 'zh' ? 'AI 生成中...' : 'Generating...'}
                </span>
              ) : remaining <= 0 ? (
                language === 'zh' ? '今日免费次数已用完' : 'Daily limit reached'
              ) : (
                `⚡ ${language === 'zh' ? '一键生成' : 'Generate'}`
              )}
            </button>

            {/* Upgrade CTA */}
            {remaining <= 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-center">
                <p className="text-amber-800 font-semibold mb-2">
                  {language === 'zh' ? '🔥 免费次数已用完' : '🔥 Free limit reached'}
                </p>
                <p className="text-amber-600 text-sm mb-3">
                  {language === 'zh'
                    ? '升级会员，每天无限生成，仅需 ¥19.9/月'
                    : 'Upgrade to Pro for unlimited daily generation — only $2.9/month'}
                </p>
                <button className="px-6 py-2 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition">
                  {language === 'zh' ? '升级 Pro 会员' : 'Upgrade to Pro'}
                </button>
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-700">
                📝 {language === 'zh' ? '生成结果' : 'Result'}
              </h3>
              {result && !result.startsWith('❌') && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 transition"
                >
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
              )}
            </div>
            <div className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
              {result ? (
                <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-sans">
                  {result}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-[350px] text-slate-300">
                  <div className="text-6xl mb-4">✍️</div>
                  <p className="text-lg">
                    {language === 'zh' ? '输入产品信息，点击生成' : 'Enter product info and click Generate'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            {
              icon: '🚀',
              title: language === 'zh' ? '5 秒生成' : '5-Second Generation',
              desc: language === 'zh'
                ? '输入产品名，AI 秒级生成'
                : 'Enter product, get content instantly'
            },
            {
              icon: '🌍',
              title: language === 'zh' ? '11+ 平台' : '11+ Platforms',
              desc: language === 'zh'
                ? '覆盖国内外主流平台'
                : 'Chinese & international platforms'
            },
            {
              icon: '🌐',
              title: language === 'zh' ? '中英双语' : 'Bilingual',
              desc: language === 'zh'
                ? '支持中英文内容生成'
                : 'Chinese & English content'
            },
            {
              icon: '💰',
              title: language === 'zh' ? '免费使用' : 'Free to Use',
              desc: language === 'zh'
                ? '每天 20 次免费生成'
                : '20 free generations daily'
            },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16 py-8 text-center text-sm text-slate-400">
        <div className="flex items-center justify-center gap-4 mb-4">
          <a href="/about" className="hover:text-slate-600 transition">About</a>
          <span>·</span>
          <a href="/privacy" className="hover:text-slate-600 transition">Privacy Policy</a>
          <span>·</span>
          <a href="/terms" className="hover:text-slate-600 transition">Terms of Service</a>
        </div>
        <p>© 2026 AI Content Factory — Powered by DeepSeek AI</p>
      </footer>
    </div>
  );
}
