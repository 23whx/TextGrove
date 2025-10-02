import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import { getTextStats } from '@/lib/text';
import { formatBytes } from '@/lib/bytes';

export default function StatsCard() {
  const text = useAppStore((state) => state.editor.text);
  const t = useTranslation();
  const stats = getTextStats(text);

  const statItems = [
    { label: t.statsCharsWithSpace, value: stats.charsWithSpace.toLocaleString() },
    { label: t.statsCharsWithoutSpace, value: stats.charsWithoutSpace.toLocaleString() },
    { label: t.statsUnicodeChars, value: stats.codePoints.toLocaleString() },
    { label: t.statsLines, value: stats.lines.toLocaleString() },
    { label: t.statsWords, value: stats.words.toLocaleString() },
    { label: t.statsBytes, value: `${stats.bytes.toLocaleString()} (${formatBytes(stats.bytes)})` },
  ];

  return (
    <div className="card p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.statsTitle}</h2>
      <div className="space-y-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-gray-600">{item.label}</span>
            <span className="font-semibold text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>

      {text.length === 0 && (
        <div className="mt-4 text-center text-gray-400 text-sm">
          {t.statsEmpty}
        </div>
      )}
    </div>
  );
}

