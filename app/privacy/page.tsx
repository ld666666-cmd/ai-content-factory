import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - AI Content Factory',
  description: 'Privacy Policy for AI Content Factory',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <a href="/" className="text-blue-600 hover:underline">← Back to AI Content Factory</a>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-6">Last updated: May 17, 2026</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800">1. Information We Collect</h2>
            <p className="text-slate-600">We collect minimal information to provide our service:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Usage Data:</strong> We track the number of content generations per IP address for rate limiting purposes (up to 20 free generations per day). This data is stored in memory and automatically deleted daily.</li>
              <li><strong>Product Information:</strong> Product names and features you enter are sent to our AI API to generate content. We do not store this information after generation is complete.</li>
              <li><strong>IP Address:</strong> Used for rate limiting only. Not stored permanently.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>To provide AI content generation services</li>
              <li>To enforce daily usage limits</li>
              <li>To improve our service quality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">3. Third-Party Services</h2>
            <p className="text-slate-600">We use the following third-party services:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>DeepSeek AI:</strong> Processes your product information to generate marketing content. Please refer to <a href="https://www.deepseek.com/privacy" className="text-blue-600 hover:underline">DeepSeek&apos;s Privacy Policy</a>.</li>
              <li><strong>Google AdSense:</strong> May use cookies to display relevant advertisements. Please refer to <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">Google&apos;s Privacy Policy</a>.</li>
              <li><strong>Vercel:</strong> Hosts our website. Please refer to <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:underline">Vercel&apos;s Privacy Policy</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">4. Cookies</h2>
            <p className="text-slate-600">We may use cookies for:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Analytics to understand website usage</li>
              <li>Advertising to display relevant ads</li>
            </ul>
            <p className="text-slate-600">You can disable cookies in your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">5. Data Retention</h2>
            <p className="text-slate-600">We do not permanently store your product information or generated content. Rate limiting data is automatically reset daily.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">6. Children&apos;s Privacy</h2>
            <p className="text-slate-600">Our service is not intended for children under 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">7. Changes to This Policy</h2>
            <p className="text-slate-600">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">8. Contact Us</h2>
            <p className="text-slate-600">If you have questions about this Privacy Policy, please contact us at:</p>
            <p className="text-slate-600">Email: <a href="mailto:support@aicontentfactory.app" className="text-blue-600 hover:underline">support@aicontentfactory.app</a></p>
          </section>
        </div>
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400">
        <p>© 2026 AI Content Factory — Powered by DeepSeek AI</p>
      </footer>
    </div>
  );
}
