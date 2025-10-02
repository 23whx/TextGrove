import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import { freqStats } from '@/lib/text';
import Button from '../ui/Button';
import { downloadCSV } from '@/lib/export';

export default function FreqPanel() {
  const text = useAppStore((state) => state.editor.text);
  const topN = useAppStore((state) => state.freq.topN);
  const setTopN = useAppStore((state) => state.freq.setTopN);
  const stopWords = useAppStore((state) => state.freq.stopWords);
  const showToast = useAppStore((state) => state.showToast);
  const t = useTranslation();

  const rows = freqStats(text, { top: topN, stop: stopWords });

  const handleDownload = () => {
    if (rows.length === 0) {
      showToast(t.toastNoData, 'error');
      return;
    }
    downloadCSV(rows, 'frequency.csv');
    showToast(t.toastExported, 'success');
  };

  return (
    <div className="card p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{t.freqTitle}</h2>

      <div className="flex items-center gap-4 flex-wrap">
        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t.freqShow}</span>
          <input
            type="number"
            min="1"
            max="1000"
            value={topN}
            onChange={(e) => setTopN(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 px-3 py-2 rounded-xl text-sm"
          />
          <span className="text-sm text-gray-600">{t.freqItems}</span>
        </label>

        <Button onClick={handleDownload} variant="secondary">
          {t.freqExportCSV}
        </Button>
      </div>

      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <div className="max-h-[400px] overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-accent/30 sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">#</th>
                <th className="text-left px-4 py-3 font-semibold">{t.freqToken}</th>
                <th className="text-right px-4 py-3 font-semibold">{t.freqCount}</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, idx) => (
                  <tr
                    key={`${row.token}-${idx}`}
                    className="border-b border-gray-200 hover:bg-white transition"
                  >
                    <td className="px-4 py-2 text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-2 font-mono">{row.token}</td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {row.count.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-400">
                    {t.freqNoData}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        {t.freqNote}
      </p>
    </div>
  );
}

