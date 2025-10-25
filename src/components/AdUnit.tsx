import { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  style?: React.CSSProperties;
}

/**
 * Google AdSense 广告单元组件
 * 
 * 使用示例：
 * <AdUnit slot="1234567890" format="auto" responsive />
 */
export default function AdUnit({ 
  slot, 
  format = 'auto',
  responsive = true,
  style = {}
}: AdUnitProps) {
  useEffect(() => {
    try {
      // 确保 adsbygoogle 已加载
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div style={{ margin: '20px 0', textAlign: 'center', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4880646654838411"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      ></ins>
    </div>
  );
}

