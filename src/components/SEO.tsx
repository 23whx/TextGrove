interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noindex?: boolean;
  lang?: string;
}

export default function SEO({
  title = 'TextGrove - 文本工具站 | Text Tools',
  description = 'TextGrove 是一个简洁高效的文本工具站，提供字数统计、文本去重、词频分析、简繁转换、代码格式化等功能。完全本地处理，保护您的隐私。',
  canonical,
  ogType = 'website',
  ogImage = '/og-image.png',
  noindex = false,
  lang = 'zh-CN',
}: SEOProps) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://textgrove.app';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <>
      {/* 基础 Meta 标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="文本工具,字数统计,文本去重,词频分析,简繁转换,代码格式化,JSON格式化,text tools,character count,text deduplication,word frequency" />
      <meta name="author" content="TextGrove" />
      <meta name="language" content={lang} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="TextGrove" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:locale" content={lang.replace('-', '_')} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Rollkey4" />
      <meta name="twitter:creator" content="@Rollkey4" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#E8F5E9" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="TextGrove" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Favicon - 多格式支持 */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="shortcut icon" href="/favicon.ico" />
      
      {/* 浏览器主题色 */
      <meta name="msapplication-TileColor" content="#E8F5E9" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* 结构化数据 (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "TextGrove",
          "description": description,
          "url": siteUrl,
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Person",
            "name": "TextGrove Team",
            "email": "wanghongxiang23@gmail.com"
          },
          "creator": {
            "@type": "Person",
            "name": "TextGrove Team",
            "url": "https://x.com/Rollkey4"
          },
          "featureList": [
            "Character Count",
            "Text Deduplication",
            "Word Frequency Analysis",
            "Simplified-Traditional Chinese Conversion",
            "Code Formatting (JSON, XML, HTML, CSS, SQL)"
          ],
          "softwareVersion": "1.0.0",
          "screenshot": fullOgImage,
          "inLanguage": ["zh-CN", "en-US", "ja-JP", "ko-KR"]
        })}
      </script>
      
      {/* Google AdSense */}
      <script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4880646654838411"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

