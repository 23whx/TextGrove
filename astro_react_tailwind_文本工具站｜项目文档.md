# 项目概述

**项目名称**：TextGrove（可替换）  
**目标**：构建一个简洁高效的文本工具网站，提供 5 个核心功能：
1) 总字数统计；2) 文本去重（逐行去重）；3) 字数/词频统计；4) 简体/繁体转换；5) 文本格式化（JSON/XML/HTML/CSS/JS/TS/Markdown/SQL 等）。  
并预留扩展若干常用文本工具模块。  
**技术栈**：Astro（框架/构建）+ React（交互）+ Tailwind CSS（样式）+ TypeScript 。

---

## 1. 需求与范围

### 1.1 核心功能
- **总字数统计**：输入文本，实时统计 **字符数（含/不含空白）**、**行数**、**字节数（UTF-8 估算）**。
- **文本去重（逐行）**：输入多行文本 → 输出去重后的行；支持 **保留顺序**、**忽略大小写**、**忽略前后空白**、**忽略全角/半角差异（可选标准化）**。
- **字数 / 词频统计**：
  - 统计：总字符、总单词（拉丁基于空白分词）、标点/空白计数；
  - 词频：按 **中文（单字/简易分词）** 与 **拉丁（单词）** 分开显示；
  - 支持停用词过滤、Top-N 导出。
- **简体 ⇆ 繁体转换**：基于 OpenCC 词典实现，支持 **段落转换** 与 **行内实时预览**。

- **文本格式化**：支持 JSON / XML / HTML / CSS / JS / TS / Markdown / SQL 等常见类型的**美化（Pretty Print）**与**压缩（Minify）**；自动类型检测或手动选择；选项：缩进宽度、换行、尾逗号、单双引号、保留注释（按格式生效）；超过阈值（如 200KB）启用 Web Worker 处理；提供格式化前后差异视图与导出。

### 1.2 增值功能（建议新增，默认隐藏于“更多工具”）
- **去空行 / 去多余空格 / 统一缩进**。
- **大小写转换**（大写/小写/标题式）。
- **排序与去重**（按字典序/长度/自然排序）。
- **正则查找替换**（支持多行与分组引用，提供常用模板）。
- **文本对比（Diff）**：两段文本差异高亮。
- **URL / 邮箱提取** 与去重导出。
- **CSV 格式化与压缩**（限本地解析，防注入）。
- **Base64 编解码**、**URL 编解码**。
- **Markdown 预览**（安全渲染，禁脚本）。
- **二维码生成/解析**（快速分享与校验）。
- **敏感词检测**（本地词表，可自定义）。
- **文本切片**（按字数/行数/分隔符切割）。

> 可在 MVP 后按优先级逐步上线。

### 1.3 非功能性要求
- 风格：**简约**；主色白、背景淡绿、强调淡红。
- 体验：响应式、键盘可达、WCAG AA 对比度。
- 隐私：**完全本地处理**（不上传服务器）。
- 性能：大型文本（≥1MB）编辑与统计需保持主线程流畅（Web Worker 可选）。

---

## 2. 视觉与主题

- **全局背景**：淡绿色 `#E8F5E9`；
- **主色**：白色 `#FFFFFF`（卡片/输入主底）；
- **强调色**：淡红色 `#F8BBD0`（按钮/滑块/标签/高亮）；
- 字体：系统字体栈；圆角 `rounded-2xl`；轻阴影 `shadow-lg`；
- 动效：轻过渡 `transition`，在 `motion-safe` 下启用。

**Tailwind 配置示意（`tailwind.config.ts`）**
```ts
export default {
  theme: {
    extend: {
      colors: {
        brand: { bg: '#E8F5E9', base: '#FFFFFF', accent: '#F8BBD0' }
      }
    }
  }
}
```

**全局样式（`src/styles/global.css`）**
```css
:root { --bg:#E8F5E9; --base:#FFFFFF; --accent:#F8BBD0; }
html { background: var(--bg); }
.card { background: var(--base); }
```

---

## 3. 信息架构与路由

- `/`：首页（工具切换 Tabs + 主编辑区 + 结果面板）。
- `/about`：说明、隐私与开源许可。
- `/settings`：个性化（主题强度、对比度辅助、停用词管理、默认分词策略）。
- `/*`：404。

**首页 Tabs**（按优先级）：
1. 统计（总字数）
2. 去重（逐行）
3. 词频统计
4. 简繁转换
5. 文本格式化
6. 更多工具（折叠面板）

---

## 4. 页面布局（首页）

- **头部**：Logo（字标 TextGrove）+ 设置/关于。
- **主区**：两列栅格（移动端单列）：
  - **左列**：输入编辑器（`<textarea>` 或 `contenteditable`），工具栏（清空/粘贴/导入文件/复制）。
  - **右列**：结果卡片（统计数据、转换预览、导出按钮）。
- **底部**：版权、隐私、GitHub 链接。

---

## 5. 组件设计（React）

- `Editor`：核心输入组件，支持粘贴与文件导入（`FileReader`），自动保存到 `localStorage`。
- `ToolTabs`：切换功能模块。
- `StatsCard`：显示字符数、行数、字节数等。
- `DedupPanel`：去重选项与结果导出。
- `FreqPanel`：词频参数（停用词/TopN/分词策略）与结果表格。
- `SimpTradPanel`：简繁转换与实时对照。
- `FormatPanel`：文本/代码格式化（类型选择、参数、结果/差异预览）。
- `MoreTools`：扩展工具集合（开关式加载）。
- `Toast`：结果提示；`CopyButton`：复制到剪贴板；`DownloadButton`：导出 txt/csv。

**状态管理**：Zustand / useReducer（避免频繁重渲染）。
- `editor.text`，`settings`（停用词、分词策略、UI 偏好），`freq.result`，`dedup.result`。

---

## 6. 关键算法与实现

### 6.1 总字数统计
- 字符数（含空白）：`text.length`（UTF-16 代码单元）。
- 字符数（按 Unicode code point）：用 `Array.from(text).length`。
- 行数：`text.split(/\r?\n/).length`（空文本返回 0 需特判）。
- 估算字节（UTF-8）：遍历 code point 按区间估算 1–4 字节。

**示例**
```ts
export function utf8Bytes(s: string){
  let n = 0; for (const ch of s){
    const cp = ch.codePointAt(0)!;
    n += cp <= 0x7F ? 1 : cp <= 0x7FF ? 2 : cp <= 0xFFFF ? 3 : 4;
  } return n;
}
```

### 6.2 文本去重（逐行）
- 预处理：按选项进行 **trim**、**大小写统一**、**全角/半角标准化**、**空行策略**；
- 算法：`Set` + 顺序保留；
- 输出：可选择 **排序** 或 **保持原顺序**。

```ts
export function dedupLines(text: string, opt:{
  ignoreCase?: boolean; trim?: boolean; ignoreEmpty?: boolean; normalizeWidth?: boolean; sort?: boolean;
}={}){
  const lines = text.split(/\r?\n/);
  const seen = new Set<string>(); const out: string[] = [];
  const norm = (s:string)=>{
    let t = opt.trim ? s.trim() : s;
    if (opt.ignoreCase) t = t.toLowerCase();
    if (opt.normalizeWidth) t = t.normalize('NFKC'); // 全半角/兼容字形标准化
    return t;
  }
  for (const line of lines){
    const key = norm(line);
    if (opt.ignoreEmpty && key === '') continue;
    if (!seen.has(key)){ seen.add(key); out.push(line); }
  }
  return opt.sort ? out.sort() : out;
}
```

### 6.3 字数 / 词频统计
- **拉丁词**：`/([A-Za-z0-9_\-']+)/g` 提取；
- **中文**：提供两种模式：
  1) **单字频率**（稳定、零依赖）
  2) **简易分词**（可选，启用 `jieba-wasm` 或 `segmentit`，浏览器支持下懒加载）
- 合并结果后排序，支持停用词过滤与 Top-N。

```ts
export function freqStats(text: string, opt:{ top?: number; stop?: Set<string>; mode?: 'char'|'word' }={}){
  const map = new Map<string, number>();
  const push=(k:string)=> map.set(k, (map.get(k)||0)+1);
  for(const token of text.matchAll(/([A-Za-z0-9_\-']+)|([\p{Script=Han}])/gu)){
    const t = (token[1]||token[2])!;
    if (opt.stop?.has(t.toLowerCase())) continue;
    push(opt.mode==='char'? t : t);
  }
  const arr = [...map.entries()].sort((a,b)=> b[1]-a[1]);
  return opt.top ? arr.slice(0, opt.top) : arr;
}
```

### 6.4 简体 / 繁体转换
- 依赖 `opencc-js`（浏览器）或 `opencc-wasm`（更快，懒加载）。
- 提供 **段落转换** 与 **实时对照**（左右栏或上下栏）。

```ts
// 伪代码
import { OpenCC } from 'opencc-js';
const s2t = new OpenCC('s2t.json');
const t2s = new OpenCC('t2s.json');
const toTrad = async (s:string)=> await s2t.convertPromise(s);
```

> 兼容性：若资源加载失败，降级到提示并关闭此模块。

### 6.5 文本格式化
- **类型检测**：基于文件扩展名 + 内容启发（如首/末字符、关键字），允许手动覆盖。
- **实现策略**：
  - 使用 `prettier/standalone` + 解析器：`parser-babel`（JS/TS/JSON）、`parser-html`、`parser-postcss`（CSS）、`parser-markdown`；
  - XML 使用 `xml-formatter`；SQL 使用 `sql-formatter`；
  - 纯文本提供缩进/换行标准化与去 BOM；
  - 提供 **美化** 与 **压缩** 两种模式（压缩模式下移除多余空白与换行；保留字符串与必要空格）。
- **大文本处理**：超过阈值时调度到 `text.worker.ts`；
- **错误处理**：解析失败返回错误行列；不改变原文，提示用户检查语法。

```ts
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserHtml from 'prettier/plugins/html';
import parserMarkdown from 'prettier/plugins/markdown';
import parserPostcss from 'prettier/plugins/postcss';
import xmlFormat from 'xml-formatter';
import { format as sqlFormat } from 'sql-formatter';

export async function formatContent(input: string, opt:{lang?:string; mode?:'pretty'|'min'; tabWidth?:number}={}){
  const lang = detectLang(input, opt.lang);
  const common = { tabWidth: opt.tabWidth ?? 2, printWidth: 100 };
  if (lang==='json' || lang==='js' || lang==='ts'){
    return prettier.format(input, { ...common, parser: lang==='json'?'json':'babel', plugins:[parserBabel] });
  } else if (lang==='html'){
    return prettier.format(input, { ...common, parser: 'html', plugins:[parserHtml] });
  } else if (lang==='css'){
    return prettier.format(input, { ...common, parser: 'css', plugins:[parserPostcss] });
  } else if (lang==='md'){
    return prettier.format(input, { ...common, parser: 'markdown', plugins:[parserMarkdown] });
  } else if (lang==='xml'){
    return xmlFormat(input, { indentation: ' '.repeat(common.tabWidth) });
  } else if (lang==='sql'){
    return sqlFormat(input, { indent: ' '.repeat(common.tabWidth) });
  }
  return normalizeText(input, common.tabWidth);
}
```

---

## 7. 文件结构

```
project-root
├─ astro.config.mjs
├─ package.json
├─ tailwind.config.ts
├─ src
│  ├─ pages
│  │  ├─ index.astro
│  │  ├─ about.astro
│  │  └─ settings.astro
│  ├─ components
│  │  ├─ Editor.tsx
│  │  ├─ ToolTabs.tsx
│  │  ├─ panels
│  │  │  ├─ StatsCard.tsx
│  │  │  ├─ DedupPanel.tsx
│  │  │  ├─ FreqPanel.tsx
│  │  │  └─ SimpTradPanel.tsx
│  │  └─ ui/*（按钮/开关/表格/下载等）
│  ├─ workers
│  │  └─ text.worker.ts（重型任务/分词）
│  ├─ lib
│  │  ├─ text.ts（统计/去重/分词封装）
│  │  ├─ bytes.ts（UTF-8 估算）
│  │  └─ export.ts（下载 txt/csv）
│  ├─ store
│  │  └─ useAppStore.ts
│  └─ styles/global.css
└─ public
   └─ icons/*
```

---

## 8. 页面与组件示例

### 8.1 `index.astro`（骨架）
```astro
---
import ToolTabs from '@/components/ToolTabs';
---
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TextGrove</title>
  </head>
  <body class="min-h-screen bg-[var(--bg)] text-gray-800">
    <header class="sticky top-0 backdrop-blur">
      <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-medium">TextGrove</h1>
        <nav class="flex gap-2">
          <a href="/settings" class="px-3 py-1 rounded-xl bg-brand-accent/50">设置</a>
          <a href="/about" class="px-3 py-1 rounded-xl">关于</a>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-8">
      <ToolTabs />
    </main>
    <footer class="py-10 text-center text-sm opacity-70">© 2025 TextGrove</footer>
  </body>
</html>
```

### 8.2 `DedupPanel.tsx`（片段）
```tsx
import { useStore } from '@/store/useAppStore';
import { dedupLines } from '@/lib/text';

export default function DedupPanel(){
  const text = useStore(s=>s.editor.text);
  const [opt, setOpt] = useStore(s=>[s.dedup.opt, s.dedup.setOpt]);
  const result = dedupLines(text, opt).join('\n');
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <textarea className="card p-4 rounded-2xl shadow min-h-[280px]" defaultValue={text} onChange={e=>useStore.getState().editor.setText(e.target.value)} />
      <div className="card p-4 rounded-2xl shadow">
        <div className="flex items-center gap-3">
          <label><input type="checkbox" checked={opt.ignoreCase} onChange={e=>setOpt({ignoreCase:e.target.checked})}/> 忽略大小写</label>
          <label><input type="checkbox" checked={opt.trim} onChange={e=>setOpt({trim:e.target.checked})}/> 去前后空白</label>
          <label><input type="checkbox" checked={opt.normalizeWidth} onChange={e=>setOpt({normalizeWidth:e.target.checked})}/> 全半角标准化</label>
        </div>
        <pre className="mt-3 whitespace-pre-wrap break-words">{result}</pre>
      </div>
    </div>
  );
}
```

### 8.3 `FreqPanel.tsx`（片段）
```tsx
import { freqStats } from '@/lib/text';

export default function FreqPanel(){
  const text = useStore(s=>s.editor.text);
  const [top, setTop] = useState(50);
  const rows = freqStats(text, { top }).map(([k,v])=>({ token:k, count:v }));
  return (
    <div className="card p-4 rounded-2xl shadow">
      <div className="flex items-center gap-4">
        <label className="min-w-20">Top-N</label>
        <input type="number" className="w-24 px-3 py-2 rounded-xl bg-white/80" value={top} onChange={e=>setTop(+e.target.value)} />
        <button className="px-3 py-2 rounded-xl bg-brand-accent/60">导出 CSV</button>
      </div>
      <div className="mt-4 overflow-auto max-h-[360px]">
        <table className="w-full text-sm">
          <thead><tr><th className="text-left">Token</th><th className="text-right">Count</th></tr></thead>
          <tbody>
            {rows.map(r=> (
              <tr key={r.token} className="border-b border-black/5"><td>{r.token}</td><td className="text-right">{r.count}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### 8.4 `FormatPanel.tsx`（片段）
```tsx
import { formatContent } from '@/lib/format';

export default function FormatPanel(){
  const [lang, setLang] = useState<'auto'|'json'|'xml'|'html'|'css'|'js'|'ts'|'md'|'sql'>('auto');
  const [tab, setTab] = useState(2);
  const text = useStore(s=>s.editor.text);
  const [out, setOut] = useState('');
  const onFormat = async ()=> setOut(await formatContent(text, { lang: lang==='auto'?undefined:lang, tabWidth: tab }));
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <textarea className="card p-4 rounded-2xl shadow min-h-[280px]" defaultValue={text} onChange={e=>useStore.getState().editor.setText(e.target.value)} />
      <div className="card p-4 rounded-2xl shadow">
        <div className="flex flex-wrap items-center gap-3">
          <select value={lang} onChange={e=>setLang(e.target.value as any)} className="px-3 py-2 rounded-xl bg-brand-accent/40">
            <option value="auto">自动检测</option>
            <option value="json">JSON</option>
            <option value="xml">XML</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JS</option>
            <option value="ts">TS</option>
            <option value="md">Markdown</option>
            <option value="sql">SQL</option>
          </select>
          <label className="flex items-center gap-2">缩进
            <input type="number" className="w-20 px-3 py-2 rounded-xl bg-white/80" value={tab} onChange={e=>setTab(+e.target.value)} />
          </label>
          <button onClick={onFormat} className="px-3 py-2 rounded-xl bg-brand-accent/60">格式化</button>
          <button onClick={()=>navigator.clipboard.writeText(out)} className="px-3 py-2 rounded-xl">复制结果</button>
        </div>
        <pre className="mt-3 whitespace-pre-wrap break-words">{out}</pre>
      </div>
    </div>
  )
}
```
---

## 9. 性能与并发

- 对 ≥1MB 文本，统计与分词可下放到 **Web Worker**；
- 去抖/节流输入，避免每个 keystroke 触发重计算；
- 懒加载大依赖（如 `opencc-wasm`、`jieba-wasm`）；
- 结果表格虚拟化（`react-virtual`）。

---

## 10. 可访问性

- 组件语义化：表格/按钮/标签配对；
- `aria-live="polite"` 推送统计更新；
- 焦点可见（`focus:ring`），键盘操作完整；
- 颜色对比：淡红背景上的文字统一使用深色以保证 ≥4.5:1 对比度。

---

## 11. 数据导入/导出

- 导入：粘贴、拖放 `.txt`、`.csv`；
- 导出：去重结果、词频（CSV）与转换文本（TXT）。

---

## 12. 配置与部署

- 开发：`pnpm dev`；生产：`pnpm build && pnpm preview`；
- 部署：任意静态托管（Vercel/Netlify/GitHub Pages）。
- PWA（可选）：仅缓存 UI 与小词典；
- CSP：`worker-src blob:`；禁远程脚本（所有字典内置或经缓存）。

---

## 13. 依赖建议

- **核心**：`zustand`、`opencc-js` 或 `opencc-wasm`；
- **可选**：`jieba-wasm` / `segmentit`（中文分词）、`remark/markdown-it`（MD 预览）、`diff`（文本对比）、`papaparse`（CSV）、`qrcode` & `jsqr`（二维码）、`js-beautify`（备用格式化）。
- **格式化相关**：`prettier/standalone` + `parser-babel`/`parser-html`/`parser-postcss`/`parser-markdown`，`xml-formatter`，`sql-formatter`。

---

## 14. 测试与质量

- 单测：Vitest + RTL；
- E2E：Playwright（大文本输入、去重、词频、简繁转换、格式化）；
- 性能基线：1MB 混合文本统计 < 200ms（P95，WasM 开启）。

---

## 15. 里程碑

- **M1**：UI 骨架 + 总字数统计（1 周）
- **M2**：去重（逐行）+ 词频（Top-N 导出）+ 文本格式化（1 周）
- **M3**：简繁转换（OpenCC）+ 更多工具容器（1 周）
- **M4**：PWA/Worker/依赖懒加载与 A11y 完善（1 周）

---

## 16. 法务与隐私

- 明示“本地处理，不上传数据”；
- 展示第三方许可证（MIT/Apache-2.0 等）。

---

## 17. 成功指标

- 成功完成一项操作并导出结果的会话比率；
- 大文本操作的 P95 延迟；
- 错误率与崩溃率；
- 回访率（使用 ≥2 个不同工具模块的比例）。

---

## 18. 后续扩展路线

- 词典/停用词在线更新（可选、需用户同意）；
- 更强中文分词（自定义词库）；
- 多文本批处理与历史会话管理；
- 分享短链接（仅在用户明确授权且脱敏）。

---

## 19. 作者联系方式

- 在网站导航栏和主页底部添加作者的联系方式。
- email：wanghongxiang23@gmail.com
- X：@Rollkey4

