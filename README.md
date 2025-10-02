# TextGrove 🌲

一个简洁高效的文本工具站，提供多种实用的文本处理功能。

## ✨ 核心功能

- **总字数统计**：实时统计字符数（含/不含空白）、行数、字节数、单词数
- **文本去重**：逐行去重，支持多种配置选项（大小写、空白、全半角等）
- **词频统计**：分析文本中词语出现频率，支持停用词过滤和 Top-N 导出
- **文本格式化**：支持 JSON、XML、HTML、CSS、SQL 等格式的美化和压缩

## 🛠️ 技术栈

- **Astro** - 静态站点生成器
- **React** - 交互式组件
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Zustand** - 状态管理

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 开发

```bash
npm run dev
# 或
pnpm dev
```

访问 `http://localhost:4321` 查看网站。

### 构建

```bash
npm run build
# 或
pnpm build
```

### 预览

```bash
npm run preview
# 或
pnpm preview
```

## 📁 项目结构

```
textgrove/
├── src/
│   ├── components/
│   │   ├── Editor.tsx           # 文本编辑器
│   │   ├── ToolTabs.tsx         # 工具标签页
│   │   ├── panels/              # 功能面板
│   │   │   ├── StatsCard.tsx    # 统计面板
│   │   │   ├── DedupPanel.tsx   # 去重面板
│   │   │   ├── FreqPanel.tsx    # 词频面板
│   │   │   └── FormatPanel.tsx  # 格式化面板
│   │   └── ui/                  # UI 组件
│   │       ├── Button.tsx
│   │       └── Toast.tsx
│   ├── lib/
│   │   ├── text.ts              # 文本处理工具
│   │   ├── format.ts            # 格式化工具
│   │   ├── bytes.ts             # 字节计算
│   │   └── export.ts            # 导出功能
│   ├── store/
│   │   └── useAppStore.ts       # 全局状态管理
│   ├── pages/
│   │   ├── index.astro          # 首页
│   │   ├── about.astro          # 关于页
│   │   └── settings.astro       # 设置页
│   └── styles/
│       └── global.css           # 全局样式
├── package.json
├── astro.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 设计理念

- **简约美观**：采用淡绿色背景 + 白色卡片 + 淡红色强调的配色方案
- **隐私优先**：所有处理完全在浏览器本地进行，不上传任何数据
- **响应式设计**：支持桌面和移动设备
- **键盘友好**：支持键盘操作和快捷键
- **无障碍访问**：遵循 WCAG AA 标准

## 🔒 隐私保护

TextGrove 完全在浏览器本地运行，所有文本处理都在您的设备上完成。我们不会收集、存储或传输您的任何文本数据。

## 📄 开源许可

MIT License

## 👨‍💻 作者

- Email: wanghongxiang23@gmail.com
- X (Twitter): [@Rollkey4](https://x.com/Rollkey4)

## 🙏 致谢

感谢所有开源项目的贡献者！

---

**享受使用 TextGrove！** 🎉

