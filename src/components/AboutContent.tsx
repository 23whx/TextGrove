import { useTranslation } from '@/hooks/useTranslation';

export default function AboutContent() {
  const t = useTranslation();

  return (
    <div className="card p-8 rounded-2xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t.aboutTitle}</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">{t.aboutIntro}</h2>
        <p className="text-gray-600 leading-relaxed">{t.aboutIntroText}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">{t.aboutFeatures}</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-brand-accent">✓</span>
            <span>{t.aboutFeature1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-accent">✓</span>
            <span>{t.aboutFeature2}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-accent">✓</span>
            <span>{t.aboutFeature3}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-accent">✓</span>
            <span>{t.aboutFeature4}</span>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">{t.aboutTechStack}</h2>
        <ul className="flex flex-wrap gap-2">
          <li className="px-3 py-1 bg-brand-accent/20 rounded-lg text-sm">Astro</li>
          <li className="px-3 py-1 bg-brand-accent/20 rounded-lg text-sm">React</li>
          <li className="px-3 py-1 bg-brand-accent/20 rounded-lg text-sm">TypeScript</li>
          <li className="px-3 py-1 bg-brand-accent/20 rounded-lg text-sm">Tailwind CSS</li>
          <li className="px-3 py-1 bg-brand-accent/20 rounded-lg text-sm">Zustand</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">{t.aboutPrivacy}</h2>
        <p className="text-gray-600 leading-relaxed">{t.aboutPrivacyText}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">{t.aboutLicense}</h2>
        <p className="text-gray-600 leading-relaxed">{t.aboutLicenseText}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">{t.aboutContact}</h2>
        <div className="space-y-2 text-gray-600">
          <p>
            <strong>Email:</strong>
            <a
              href="mailto:wanghongxiang23@gmail.com"
              className="ml-2 text-brand-accent hover:underline"
            >
              wanghongxiang23@gmail.com
            </a>
          </p>
          <p>
            <strong>X (Twitter):</strong>
            <a
              href="https://x.com/Rollkey4"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-brand-accent hover:underline"
            >
              @Rollkey4
            </a>
          </p>
        </div>
      </section>

      <div className="pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">{t.aboutThankYou}</p>
      </div>
    </div>
  );
}

