import { utf8Bytes } from './bytes';

/**
 * 文本统计结果
 */
export interface TextStats {
  /** 字符数（含空白） */
  charsWithSpace: number;
  /** 字符数（不含空白） */
  charsWithoutSpace: number;
  /** 字符数（Unicode code points） */
  codePoints: number;
  /** 行数 */
  lines: number;
  /** 估算字节数（UTF-8） */
  bytes: number;
  /** 单词数 */
  words: number;
}

/**
 * 统计文本信息
 */
export function getTextStats(text: string): TextStats {
  if (!text) {
    return {
      charsWithSpace: 0,
      charsWithoutSpace: 0,
      codePoints: 0,
      lines: 0,
      bytes: 0,
      words: 0,
    };
  }

  const charsWithSpace = text.length;
  const charsWithoutSpace = text.replace(/\s/g, '').length;
  const codePoints = Array.from(text).length;
  const lines = text.split(/\r?\n/).length;
  const bytes = utf8Bytes(text);
  const words = text.match(/\b\w+\b/g)?.length || 0;

  return {
    charsWithSpace,
    charsWithoutSpace,
    codePoints,
    lines,
    bytes,
    words,
  };
}

/**
 * 文本去重选项
 */
export interface DedupOptions {
  /** 忽略大小写 */
  ignoreCase?: boolean;
  /** 去除前后空白 */
  trim?: boolean;
  /** 忽略空行 */
  ignoreEmpty?: boolean;
  /** 全角/半角标准化 */
  normalizeWidth?: boolean;
  /** 排序结果 */
  sort?: boolean;
}

/**
 * 文本去重（逐行）
 */
export function dedupLines(text: string, opt: DedupOptions = {}): string[] {
  const lines = text.split(/\r?\n/);
  const seen = new Set<string>();
  const out: string[] = [];

  const norm = (s: string) => {
    let t = opt.trim ? s.trim() : s;
    if (opt.ignoreCase) t = t.toLowerCase();
    if (opt.normalizeWidth) t = t.normalize('NFKC'); // 全半角/兼容字形标准化
    return t;
  };

  for (const line of lines) {
    const key = norm(line);
    if (opt.ignoreEmpty && key === '') continue;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(line);
    }
  }

  return opt.sort ? out.sort() : out;
}

/**
 * 词频统计结果
 */
export interface FreqEntry {
  token: string;
  count: number;
}

/**
 * 词频统计选项
 */
export interface FreqOptions {
  /** 最多返回前 N 个 */
  top?: number;
  /** 停用词集合 */
  stop?: Set<string>;
  /** 统计模式 */
  mode?: 'char' | 'word';
}

/**
 * 词频统计
 */
export function freqStats(text: string, opt: FreqOptions = {}): FreqEntry[] {
  const map = new Map<string, number>();
  const push = (k: string) => map.set(k, (map.get(k) || 0) + 1);

  // 提取拉丁词和中文字符
  const regex = /([A-Za-z0-9_\-']+)|([\p{Script=Han}])/gu;
  for (const token of text.matchAll(regex)) {
    const t = (token[1] || token[2])!;
    const lower = t.toLowerCase();
    if (opt.stop?.has(lower)) continue;
    push(t);
  }

  const arr = [...map.entries()]
    .map(([token, count]) => ({ token, count }))
    .sort((a, b) => b.count - a.count);

  return opt.top ? arr.slice(0, opt.top) : arr;
}

/**
 * 检测语言类型
 */
export function detectLang(input: string, hint?: string): string {
  if (hint && hint !== 'auto') return hint;

  const trimmed = input.trim();
  
  // JSON
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || 
      (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch {
      // 可能是 JS 对象字面量
    }
  }

  // XML/HTML
  if (trimmed.startsWith('<?xml') || trimmed.startsWith('<!DOCTYPE')) {
    return trimmed.toLowerCase().includes('html') ? 'html' : 'xml';
  }
  if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
    return trimmed.includes('</') ? 'html' : 'xml';
  }

  // SQL
  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s+/i.test(trimmed)) {
    return 'sql';
  }

  // CSS
  if (/[.#]\w+\s*{/.test(trimmed)) {
    return 'css';
  }

  // Markdown
  if (/^#{1,6}\s/.test(trimmed) || /^\*\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
    return 'md';
  }

  return 'text';
}

/**
 * 标准化纯文本（统一缩进和换行）
 */
export function normalizeText(input: string, tabWidth: number = 2): string {
  return input
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' '.repeat(tabWidth))
    .replace(/^\uFEFF/, ''); // 移除 BOM
}

