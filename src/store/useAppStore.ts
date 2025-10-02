import { create } from 'zustand';
import type { DedupOptions } from '@/lib/text';
import type { Language } from '@/lib/i18n';

/**
 * 工具类型
 */
export type ToolType = 'stats' | 'dedup' | 'freq' | 'simptrad' | 'format' | 'more';

/**
 * 应用状态
 */
interface AppState {
  // 语言设置
  language: Language;
  setLanguage: (lang: Language) => void;

  // 编辑器状态
  editor: {
    text: string;
    setText: (text: string) => void;
  };

  // 当前活动工具
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;

  // 去重选项
  dedup: {
    options: DedupOptions;
    setOptions: (options: Partial<DedupOptions>) => void;
  };

  // 词频选项
  freq: {
    topN: number;
    setTopN: (n: number) => void;
    stopWords: Set<string>;
    setStopWords: (words: Set<string>) => void;
  };

  // 格式化选项
  format: {
    lang: string;
    setLang: (lang: string) => void;
    tabWidth: number;
    setTabWidth: (width: number) => void;
  };

  // Toast 消息
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
  } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

/**
 * 获取初始化数据
 */
const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('textgrove-language') as Language;
    if (saved && ['zh', 'en', 'ja', 'ko'].includes(saved)) {
      return saved;
    }
  }
  return 'zh';
};

const getInitialText = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('textgrove-content') || '';
  }
  return '';
};

/**
 * 创建应用 store
 */
export const useAppStore = create<AppState>((set) => ({
  // 语言
  language: getInitialLanguage(),
  setLanguage: (lang) => {
    set({ language: lang });
    if (typeof window !== 'undefined') {
      localStorage.setItem('textgrove-language', lang);
    }
  },

  // 编辑器
  editor: {
    text: getInitialText(),
    setText: (text) =>
      set((state) => {
        // 保存到 localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('textgrove-content', text);
        }
        return { editor: { ...state.editor, text } };
      }),
  },

  // 当前工具
  activeTool: 'stats',
  setActiveTool: (tool) => set({ activeTool: tool }),

  // 去重
  dedup: {
    options: {
      ignoreCase: false,
      trim: true,
      ignoreEmpty: true,
      normalizeWidth: false,
      sort: false,
    },
    setOptions: (options) =>
      set((state) => ({
        dedup: {
          ...state.dedup,
          options: { ...state.dedup.options, ...options },
        },
      })),
  },

  // 词频
  freq: {
    topN: 50,
    setTopN: (n) =>
      set((state) => ({
        freq: { ...state.freq, topN: n },
      })),
    stopWords: new Set(['的', '了', '是', '在', '我', '有', '和', '就', '不', '人', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']),
    setStopWords: (words) =>
      set((state) => ({
        freq: { ...state.freq, stopWords: words },
      })),
  },

  // 格式化
  format: {
    lang: 'auto',
    setLang: (lang) =>
      set((state) => ({
        format: { ...state.format, lang },
      })),
    tabWidth: 2,
    setTabWidth: (width) =>
      set((state) => ({
        format: { ...state.format, tabWidth: width },
      })),
  },

  // Toast
  toast: null,
  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => {
      set({ toast: null });
    }, 3000);
  },
  hideToast: () => set({ toast: null }),
}));

