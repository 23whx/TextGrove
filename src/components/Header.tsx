import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslation();

  return (
    <header className="sticky top-0 backdrop-blur-md bg-brand-bg/80 z-40 border-b border-white/20">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <h1 className="text-2xl font-bold text-gray-800">🌲 {t.appName}</h1>
            <span className="text-sm text-gray-500 hidden sm:inline">{t.appSubtitle}</span>
          </a>
        </div>
        <nav className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="/settings"
            className="px-4 py-2 rounded-xl bg-brand-accent/50 hover:bg-brand-accent/70 transition font-medium text-sm"
          >
            {t.settings}
          </a>
          <a
            href="/about"
            className="px-4 py-2 rounded-xl hover:bg-white/50 transition font-medium text-sm"
          >
            {t.about}
          </a>
        </nav>
      </div>
    </header>
  );
}

