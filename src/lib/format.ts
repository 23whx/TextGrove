import { detectLang, normalizeText } from './text';

/**
 * 格式化选项
 */
export interface FormatOptions {
  /** 语言类型 */
  lang?: string;
  /** 模式：美化或压缩 */
  mode?: 'pretty' | 'min';
  /** 缩进宽度 */
  tabWidth?: number;
}

/**
 * 格式化内容
 * 注意：本实现为简化版本，完整版需要引入 prettier 等库
 */
export async function formatContent(
  input: string,
  opt: FormatOptions = {}
): Promise<string> {
  const lang = detectLang(input, opt.lang);
  const tabWidth = opt.tabWidth ?? 2;
  const indent = ' '.repeat(tabWidth);

  try {
    switch (lang) {
      case 'json':
        return formatJSON(input, opt.mode === 'min' ? 0 : tabWidth);
      
      case 'xml':
      case 'html':
        return formatXML(input, opt.mode === 'min' ? 0 : tabWidth);
      
      case 'css':
        return formatCSS(input, opt.mode === 'min');
      
      case 'sql':
        return formatSQL(input, opt.mode === 'min');
      
      default:
        return normalizeText(input, tabWidth);
    }
  } catch (error) {
    throw new Error(`格式化失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 格式化 JSON
 */
function formatJSON(input: string, spaces: number): string {
  const parsed = JSON.parse(input);
  return spaces > 0 ? JSON.stringify(parsed, null, spaces) : JSON.stringify(parsed);
}

/**
 * 简易 XML/HTML 格式化
 */
function formatXML(input: string, tabWidth: number): string {
  if (tabWidth === 0) {
    return input.replace(/>\s+</g, '><').trim();
  }

  const indent = ' '.repeat(tabWidth);
  let formatted = '';
  let level = 0;
  const lines = input.replace(/>\s*</g, '>\n<').split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 减少缩进（闭合标签）
    if (trimmed.startsWith('</')) {
      level = Math.max(0, level - 1);
    }

    formatted += indent.repeat(level) + trimmed + '\n';

    // 增加缩进（开放标签且非自闭合）
    if (trimmed.startsWith('<') && 
        !trimmed.startsWith('</') && 
        !trimmed.endsWith('/>') &&
        !trimmed.match(/<(br|img|input|meta|link|hr)[>\s]/i)) {
      level++;
    }
  }

  return formatted.trim();
}

/**
 * 简易 CSS 格式化
 */
function formatCSS(input: string, minify: boolean): string {
  if (minify) {
    return input
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*:\s*/g, ':')
      .trim();
  }

  return input
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/\s*;\s*/g, ';\n  ')
    .trim();
}

/**
 * 简易 SQL 格式化
 */
function formatSQL(input: string, minify: boolean): string {
  if (minify) {
    return input.replace(/\s+/g, ' ').trim();
  }

  const keywords = /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|GROUP BY|ORDER BY|HAVING|LIMIT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP)\b/gi;
  
  return input
    .replace(keywords, (match) => '\n' + match.toUpperCase())
    .replace(/,/g, ',\n  ')
    .trim();
}

