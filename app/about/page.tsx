import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - AI Content Factory',
  description: 'About AI Content Factory - AI-powered marketing content generation tool',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <a href="/" className="text-blue-600 hover:underline">← Back to AI Content Factory</a>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl mx-auto mb-6">
            ⚡
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">AI Content Factory</h1>
          <p className="text-slate-500 text-lg">AI-Powered Marketing Content Generator</p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">🎯 Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              We help marketers, entrepreneurs, and content creators generate high-quality marketing content 
              for multiple platforms in seconds. Powered by advanced AI technology, our tool eliminates 
              the need to hire expensive copywriters or spend hours crafting the perfect post.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">🌍 Global Reach</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We support 11+ platforms across Chinese and international markets:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-slate-600">
                <span>📕</span> Xiaohongshu
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>🎬</span> Douyin / TikTok
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>📸</span> Instagram
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>📦</span> Amazon
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>👍</span> Facebook
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>🐦</span> Twitter / X
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>💼</span> LinkedIn
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>▶️</span> YouTube
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>🛒</span> E-commerce
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>💬</span> WeChat
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">🤖 Technology</h2>
            <p className="text-slate-600 leading-relaxed">
              AI Content Factory is powered by <strong>DeepSeek AI</strong>, one of the most advanced 
              large language models. Our platform is built with Next.js and deployed on Vercel for 
              maximum reliability and performance.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">📧 Contact Us</h2>
            <div className="space-y-3 text-slate-600">
              <p>Email: <a href="mailto:support@aicontentfactory.app" className="text-blue-600 hover:underline">support@aicontentfactory.app</a></p>
              <p>GitHub: <a href="https://github.com/LD666666-CMD/ai-content-factory" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ai-content-factory</a></p>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400">
        <p>© 2026 AI Content Factory — Powered by DeepSeek AI</p>
      </footer>
    </div>
  );
}
