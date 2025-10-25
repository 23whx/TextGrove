import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置
const SOURCE_FILE = 'icon.webp'; // 可以改为 favicon.webp
const SOURCE_PATH = join(__dirname, '../public', SOURCE_FILE);
const OUTPUT_DIR = join(__dirname, '../public');

// 需要生成的尺寸配置
const SIZES = [
  { name: 'favicon-16x16.png', width: 16, height: 16, description: '浏览器收藏夹图标' },
  { name: 'favicon-32x32.png', width: 32, height: 32, description: '浏览器标签页图标' },
  { name: 'apple-touch-icon.png', width: 180, height: 180, description: 'iOS 主屏幕图标' },
  { name: 'icon-192.png', width: 192, height: 192, description: 'PWA 小图标' },
  { name: 'icon-512.png', width: 512, height: 512, description: 'PWA 大图标' },
];

// OG 图片配置
const OG_IMAGE = {
  name: 'og-image.png',
  width: 1200,
  height: 630,
  description: '社交分享图片',
};

// 背景色（TextGrove 品牌色）
const BG_COLOR = { r: 232, g: 245, b: 233, alpha: 1 }; // #E8F5E9

/**
 * 生成单个图标
 */
async function generateIcon(config) {
  const outputPath = join(OUTPUT_DIR, config.name);
  
  try {
    await sharp(SOURCE_PATH)
      .resize(config.width, config.height, {
        fit: 'contain',
        background: BG_COLOR,
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);
    
    const stats = await sharp(outputPath).metadata();
    const fileSize = (await import('fs')).statSync(outputPath).size;
    const fileSizeKB = (fileSize / 1024).toFixed(2);
    
    console.log(`  ✓ ${config.name.padEnd(25)} ${config.width}x${config.height} (${fileSizeKB} KB) - ${config.description}`);
    return true;
  } catch (error) {
    console.error(`  ✗ ${config.name} 生成失败: ${error.message}`);
    return false;
  }
}

/**
 * 生成 OG 图片（带文字和图标）
 */
async function generateOGImage() {
  const outputPath = join(OUTPUT_DIR, OG_IMAGE.name);
  
  try {
    // 读取源图标
    const iconBuffer = await sharp(SOURCE_PATH)
      .resize(300, 300, { fit: 'contain', background: BG_COLOR })
      .png()
      .toBuffer();
    
    // 创建 OG 图片背景
    const ogImage = await sharp({
      create: {
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        channels: 4,
        background: BG_COLOR,
      }
    })
    .composite([
      {
        input: iconBuffer,
        top: Math.floor((OG_IMAGE.height - 300) / 2),
        left: 100,
      }
    ])
    .png({ quality: 90 })
    .toFile(outputPath);
    
    const fileSize = (ogImage.size / 1024).toFixed(2);
    console.log(`  ✓ ${OG_IMAGE.name.padEnd(25)} ${OG_IMAGE.width}x${OG_IMAGE.height} (${fileSize} KB) - ${OG_IMAGE.description}`);
    return true;
  } catch (error) {
    console.error(`  ✗ ${OG_IMAGE.name} 生成失败: ${error.message}`);
    return false;
  }
}

/**
 * 生成 favicon.ico
 * 注意：Sharp 原生不支持 ICO 格式，这里生成 PNG 替代
 * 实际 ICO 文件建议使用 RealFaviconGenerator 生成
 */
async function generateFaviconICO() {
  const outputPath = join(OUTPUT_DIR, 'favicon-ico-placeholder.png');
  
  try {
    console.log(`\n⚠️  favicon.ico 注意事项：`);
    console.log(`  • Sharp 不支持直接生成 ICO 格式`);
    console.log(`  • 建议使用以下方法生成 favicon.ico：`);
    console.log(`    1. 访问 https://realfavicongenerator.net/`);
    console.log(`    2. 上传 public/${SOURCE_FILE}`);
    console.log(`    3. 下载生成的 favicon.ico`);
    console.log(`    4. 放到 public/ 目录`);
    console.log(`  • 或使用 ImageMagick: magick icon.webp -define icon:auto-resize=256,128,96,64,48,32,16 favicon.ico\n`);
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('\n🎨 TextGrove 图标生成工具\n');
  console.log('='.repeat(80));
  
  // 检查源文件
  if (!existsSync(SOURCE_PATH)) {
    console.error(`\n❌ 错误：源文件不存在`);
    console.error(`   期望路径: ${SOURCE_PATH}`);
    console.error(`\n💡 请确保以下文件存在：`);
    console.error(`   • public/icon.webp`);
    console.error(`   • 或 public/favicon.webp`);
    console.error(`\n如果文件名不同，请修改脚本中的 SOURCE_FILE 变量\n`);
    process.exit(1);
  }
  
  console.log(`✓ 源文件: ${SOURCE_FILE}`);
  console.log(`✓ 输出目录: public/\n`);
  console.log('生成中...\n');
  
  let successCount = 0;
  let totalCount = SIZES.length + 1; // +1 for OG image
  
  // 生成标准尺寸图标
  for (const config of SIZES) {
    const success = await generateIcon(config);
    if (success) successCount++;
  }
  
  // 生成 OG 图片
  const ogSuccess = await generateOGImage();
  if (ogSuccess) successCount++;
  
  // favicon.ico 说明
  await generateFaviconICO();
  
  // 生成摘要
  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ 完成！成功生成 ${successCount}/${totalCount} 个文件\n`);
  
  // 生成文件清单
  console.log('📋 生成的文件清单：\n');
  console.log('  必须文件 ✅ (导航站需要)：');
  console.log('    • favicon-16x16.png');
  console.log('    • favicon-32x32.png');
  console.log('    • apple-touch-icon.png (180x180)');
  console.log('    • icon-192.png (PWA)');
  console.log('    • icon-512.png (PWA)');
  console.log('    • favicon.ico (需要手动生成)\n');
  
  console.log('  推荐文件 ⭐：');
  console.log('    • og-image.png (社交分享)\n');
  
  // 下一步提示
  console.log('📌 下一步操作：\n');
  console.log('  1. 生成 favicon.ico：');
  console.log('     访问 https://realfavicongenerator.net/');
  console.log('     或使用 ImageMagick 命令\n');
  
  console.log('  2. 本地测试：');
  console.log('     npm run dev');
  console.log('     访问 http://localhost:4321/favicon-test.html\n');
  
  console.log('  3. 部署到生产：');
  console.log('     npm run build');
  console.log('     部署到 Vercel/Netlify\n');
  
  console.log('  4. 验证图标：');
  console.log('     https://realfavicongenerator.net/favicon_checker\n');
  
  console.log('  5. 导航站更新：');
  console.log('     • 清除 CDN 缓存');
  console.log('     • 在导航站后台触发重新抓取');
  console.log('     • 或等待 24-48 小时自动更新\n');
  
  console.log('🌲 TextGrove - 图标已准备就绪！\n');
}

// 运行
main().catch(error => {
  console.error('\n❌ 发生错误:', error);
  process.exit(1);
});

