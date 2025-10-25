# Google AdSense 集成说明

## ✅ 已完成的配置

### 1. AdSense 代码已添加
Google AdSense 代码已成功添加到网站的所有页面中：

```html
<script async 
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4880646654838411"
  crossorigin="anonymous">
</script>
```

**位置：** 已集成到 `SEO.tsx` 组件中，自动包含在所有页面的 `<head>` 部分。

### 2. 覆盖的页面
- ✅ 首页 (`/`)
- ✅ 关于页面 (`/about`)
- ✅ 设置页面 (`/settings`)
- ✅ 未来添加的所有新页面（自动包含）

### 3. 创建的组件

#### SEO 组件（已更新）
- 文件：`src/components/SEO.tsx`
- 功能：自动在所有页面添加 AdSense 代码

#### AdUnit 组件（广告单元）
- 文件：`src/components/AdUnit.tsx`
- 功能：可重复使用的广告展示组件
- 用途：在页面任意位置插入广告

## 📋 AdSense 审核清单

### 提交前检查

- [x] **AdSense 代码已添加** - 所有页面包含正确的代码
- [x] **网站可访问** - 确保网站已上线并可公开访问
- [ ] **域名验证** - 使用自定义域名（不是 localhost）
- [ ] **内容充足** - 至少 10-15 个高质量页面
- [ ] **原创内容** - 所有内容必须是原创的
- [ ] **隐私政策** - 需要添加隐私政策页面
- [ ] **使用条款** - 建议添加使用条款

### 内容要求

✅ **已满足：**
- 网站有明确的目的和功能
- 提供实用工具
- 用户友好的界面
- 响应式设计

⚠️ **需要注意：**
- 确保有足够的文本内容
- 添加更多页面（博客、教程、帮助文档等）
- 保持内容更新

## 🎯 添加广告到页面

### 方法 1：自动广告（推荐初期使用）

AdSense 代码已添加，Google 会自动在合适的位置展示广告。

**优点：**
- 无需手动放置
- Google 自动优化位置
- 适合刚开始使用 AdSense

### 方法 2：手动放置广告单元

使用 `AdUnit` 组件在特定位置展示广告：

#### 示例 1：在首页添加广告

```tsx
// src/pages/index.astro
---
import AdUnit from '@/components/AdUnit';
---

<main>
  <ToolTabs client:load />
  
  {/* 内容中间的广告 */}
  <AdUnit slot="你的广告位ID" format="auto" responsive client:load />
  
  {/* 更多内容 */}
</main>
```

#### 示例 2：在侧边栏添加广告

```tsx
<aside>
  <AdUnit 
    slot="你的广告位ID" 
    format="vertical" 
    responsive={false}
    style={{ maxWidth: '300px' }}
    client:load
  />
</aside>
```

#### 示例 3：文章底部广告

```tsx
<article>
  {/* 文章内容 */}
  
  <AdUnit slot="你的广告位ID" format="horizontal" client:load />
</article>
```

### 广告格式选项

```typescript
format 选项：
- 'auto'       // 自适应（推荐）
- 'fluid'      // 流式布局
- 'rectangle'  // 矩形
- 'vertical'   // 垂直
- 'horizontal' // 水平
```

## 🚀 部署和验证

### 1. 部署网站

确保网站已部署到生产环境：

```bash
# 构建
npm run build

# 部署到 Vercel/Netlify/GitHub Pages
# 或使用你选择的托管平台
```

### 2. 验证 AdSense 代码

访问你的网站并：
1. 打开浏览器开发者工具（F12）
2. 查看 Network 标签
3. 搜索 `adsbygoogle.js`
4. 确认脚本已成功加载

### 3. 提交 AdSense 审核

1. 登录 [Google AdSense](https://www.google.com/adsense/)
2. 确认网站 URL
3. 提交审核
4. 等待 1-7 天的审核结果

## 📄 需要添加的页面

为了提高 AdSense 通过率，建议添加以下页面：

### 隐私政策（Privacy Policy）
**必需** - AdSense 要求

创建 `src/pages/privacy.astro`：

```astro
---
import Header from '@/components/Header';
import SEO from '@/components/SEO';
---

<html lang="zh-CN">
  <head>
    <SEO 
      title="隐私政策 - TextGrove"
      description="TextGrove 的隐私政策和数据处理说明"
      canonical="/privacy"
    />
  </head>
  <body>
    <Header client:load />
    <main>
      <h1>隐私政策</h1>
      
      <section>
        <h2>数据收集</h2>
        <p>TextGrove 完全在本地处理您的数据...</p>
      </section>
      
      <section>
        <h2>Cookie 使用</h2>
        <p>我们使用 Cookie 来...</p>
      </section>
      
      <section>
        <h2>第三方服务</h2>
        <p>本网站使用 Google AdSense...</p>
      </section>
      
      <section>
        <h2>您的权利</h2>
        <p>您有权访问、更正或删除您的数据...</p>
      </section>
    </main>
  </body>
</html>
```

### 联系页面（Contact）
**建议添加**

创建 `src/pages/contact.astro`

### 使用条款（Terms of Service）
**建议添加**

创建 `src/pages/terms.astro`

## 💡 优化建议

### 1. 内容增强

- **添加博客** - 定期发布使用教程和技巧
- **使用案例** - 展示工具的实际应用场景
- **帮助文档** - 详细的功能说明
- **FAQ** - 常见问题解答

### 2. 用户体验

- **加载速度** - 保持快速加载（< 3秒）
- **移动友好** - 确保移动端体验良好
- **导航清晰** - 易于浏览和使用
- **无侵入式广告** - 不影响核心功能使用

### 3. SEO 优化

- **元标签** - 已完成 ✅
- **Sitemap** - 已完成 ✅
- **结构化数据** - 已完成 ✅
- **定期更新** - 保持内容新鲜

## ⚠️ 重要提醒

### AdSense 政策遵守

1. **不要点击自己的广告** - 严格禁止
2. **不要鼓励点击** - 不能引导用户点击
3. **不要修改代码** - 保持 AdSense 代码完整
4. **内容合规** - 避免违禁内容

### 广告放置建议

- ✅ 页面顶部（非侵入式）
- ✅ 内容之间
- ✅ 侧边栏
- ✅ 页面底部
- ❌ 过多广告影响用户体验
- ❌ 广告遮挡主要内容

## 📊 预期收益

### 影响因素

- **流量** - 访问量越高，收益越多
- **地区** - 不同国家/地区 CPC 不同
- **利基市场** - 文本工具属于技术类，通常 CPC 较高
- **点击率** - 通常 1-5%
- **内容质量** - 高质量内容吸引高价值广告

### 估算

假设：
- 每日访问：1000 人
- 页面浏览：3000 次
- 点击率：2%
- CPC：$0.50

**月收益估算：** $900 - $1500

（实际收益会有波动）

## 🔍 监控和优化

### AdSense 控制台

定期检查：
- 收益报告
- 广告效果
- 点击率 (CTR)
- 页面 RPM

### 优化策略

1. **A/B 测试** - 测试不同广告位置
2. **热力图** - 了解用户行为
3. **响应式广告** - 适配不同设备
4. **广告密度** - 平衡收益和用户体验

## 📞 获取帮助

### AdSense 支持

- **帮助中心**: https://support.google.com/adsense
- **社区论坛**: https://support.google.com/adsense/community
- **政策中心**: https://support.google.com/adsense/answer/48182

### 常见问题

**Q: 多久能通过审核？**
A: 通常 1-7 天，有时可能更长

**Q: 被拒绝了怎么办？**
A: 根据拒绝原因改进网站，30天后可重新申请

**Q: 什么时候开始显示广告？**
A: 审核通过后立即开始（自动广告）或手动放置后显示

**Q: 如何提高收益？**
A: 增加流量、优化广告位置、提高内容质量

---

**重要**: AdSense 代码已正确添加到所有页面。确保网站部署到生产环境后再提交 AdSense 审核。

祝您申请顺利！💰

