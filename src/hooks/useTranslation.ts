import { useAppStore } from '@/store/useAppStore';
import { getTranslation } from '@/lib/i18n';

export function useTranslation() {
  const language = useAppStore((state) => state.language);
  return getTranslation(language);
}

