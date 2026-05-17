import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AI Content Factory',
  description: 'Terms of Service for AI Content Factory',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <a href="/" className="text-blue-600 hover:underline">← Back to AI Content Factory</a>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Terms of Service</h1>
        <p className="text-slate-500 mb-6">Last updated: May 17, 2026</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800">1. Acceptance of Terms</h2>
            <p className="text-slate-600">By accessing and using AI Content Factory, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">2. Description of Service</h2>
            <p className="text-slate-600">AI Content Factory provides AI-powered marketing content generation for various social media and e-commerce platforms. We use DeepSeek AI to generate content based on your input.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">3. Free Tier Usage</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Free users are limited to 20 content generations per day per IP address</li>
              <li>We reserve the right to modify the free tier limits at any time</li>
              <li>Abuse of the free tier (e.g., using proxies to circumvent limits) may result in access restriction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">4. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>You are responsible for the content you generate and how you use it</li>
              <li>Do not use the service to generate illegal, harmful, misleading, or offensive content</li>
              <li>Do not attempt to reverse engineer, hack, or disrupt the service</li>
              <li>Do not use automated tools to access the service beyond normal usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">5. Intellectual Property</h2>
            <p className="text-slate-600">Content generated through our service belongs to you. You have full rights to use, modify, and distribute the generated content. However, the AI Content Factory platform, design, and code remain our intellectual property.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">6. Disclaimer</h2>
            <p className="text-slate-600">AI-generated content may contain inaccuracies. You are solely responsible for reviewing and verifying the accuracy of generated content before publishing. We are not liable for any damages arising from the use of generated content.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">7. Service Availability</h2>
            <p className="text-slate-600">We strive to maintain high availability but do not guarantee uninterrupted service. We may modify, suspend, or discontinue the service at any time without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">8. Limitation of Liability</h2>
            <p className="text-slate-600">AI Content Factory shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">9. Changes to Terms</h2>
            <p className="text-slate-600">We reserve the right to update these Terms of Service at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">10. Contact</h2>
            <p className="text-slate-600">For questions about these Terms, please contact us at:</p>
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
