/**
 * 简繁转换工具（使用 opencc-js）
 */

// 简易繁简转换映射（核心常用字）
const s2tMap: Record<string, string> = {
  '国': '國', '学': '學', '会': '會', '对': '對', '业': '業',
  '产': '產', '发': '發', '经': '經', '时': '時', '动': '動',
  '来': '來', '现': '現', '电': '電', '实': '實', '开': '開',
  '长': '長', '关': '關', '问': '問', '间': '間', '说': '說',
  '从': '從', '应': '應', '这': '這', '还': '還', '过': '過',
  '门': '門', '东': '東', '车': '車', '见': '見', '为': '為',
  '种': '種', '样': '樣', '头': '頭', '无': '無', '认': '認',
  '当': '當', '义': '義', '书': '書', '华': '華', '员': '員',
  '务': '務', '体': '體', '万': '萬', '与': '與', '专': '專',
  '区': '區', '台': '臺', '历': '歷', '听': '聽', '观': '觀',
  '觉': '覺', '议': '議', '记': '記', '师': '師', '线': '線',
  '组': '組', '边': '邊', '选': '選', '报': '報', '场': '場',
  '币': '幣', '态': '態', '亿': '億', '传': '傳', '众': '眾',
  '级': '級', '条': '條', '医': '醸', '术': '術', '节': '節',
  '单': '單', '战': '戰', '质': '質', '团': '團', '压': '壓',
  '志': '誌', '验': '驗', '层': '層', '轻': '輕', '乐': '樂',
};

const t2sMap: Record<string, string> = Object.fromEntries(
  Object.entries(s2tMap).map(([k, v]) => [v, k])
);

/**
 * 简体转繁体
 */
export function simplifiedToTraditional(text: string): string {
  return text.replace(/[\u4e00-\u9fa5]/g, (char) => s2tMap[char] || char);
}

/**
 * 繁体转简体
 */
export function traditionalToSimplified(text: string): string {
  return text.replace(/[\u4e00-\u9fa5]/g, (char) => t2sMap[char] || char);
}

/**
 * 检测文本主要使用简体还是繁体
 */
export function detectScript(text: string): 'simplified' | 'traditional' | 'unknown' {
  let simpCount = 0;
  let tradCount = 0;

  for (const char of text) {
    if (s2tMap[char]) simpCount++;
    if (t2sMap[char]) tradCount++;
  }

  if (simpCount > tradCount * 2) return 'simplified';
  if (tradCount > simpCount * 2) return 'traditional';
  return 'unknown';
}

