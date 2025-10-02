import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import type { Language } from '@/lib/i18n';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

export default function LanguageSwitcher() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/50 transition text-sm font-medium"
        aria-label="切换语言 / Switch Language"
        aria-expanded={isOpen}
        type="button"
      >
        <span>{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-50 min-w-[150px] animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              type="button"
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-accent/20 transition text-left ${
                language === lang.code ? 'bg-brand-accent/30 font-semibold' : ''
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm">{lang.label}</span>
              {language === lang.code && (
                <span className="ml-auto text-brand-accent">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

