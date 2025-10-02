import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import { dedupLines } from '@/lib/text';
import Button from '../ui/Button';
import { copyToClipboard, downloadText } from '@/lib/export';

export default function DedupPanel() {
  const text = useAppStore((state) => state.editor.text);
  const options = useAppStore((state) => state.dedup.options);
  const setOptions = useAppStore((state) => state.dedup.setOptions);
  const showToast = useAppStore((state) => state.showToast);
  const t = useTranslation();

  const result = dedupLines(text, options);
  const resultText = result.join('\n');
  const originalLines = text.split(/\r?\n/).length;
  const dedupedLines = result.length;
  const removedLines = originalLines - dedupedLines;

  const handleCopy = async () => {
    const success = await copyToClipboard(resultText);
    showToast(success ? t.toastCopied : t.toastCopyFailed, success ? 'success' : 'error');
  };

  const handleDownload = () => {
    downloadText(resultText, 'deduped.txt');
    showToast(t.toastExported, 'success');
  };

  return (
    <div className="card p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{t.dedupTitle}</h2>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.ignoreCase}
            onChange={(e) => setOptions({ ignoreCase: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span>{t.dedupIgnoreCase}</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.trim}
            onChange={(e) => setOptions({ trim: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span>{t.dedupTrim}</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.ignoreEmpty}
            onChange={(e) => setOptions({ ignoreEmpty: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span>{t.dedupIgnoreEmpty}</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.normalizeWidth}
            onChange={(e) => setOptions({ normalizeWidth: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span>{t.dedupNormalizeWidth}</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.sort}
            onChange={(e) => setOptions({ sort: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span>{t.dedupSort}</span>
        </label>
      </div>

      <div className="py-3 px-4 bg-brand-accent/10 rounded-xl">
        <p className="text-sm text-gray-700">
          {t.dedupOriginalLines}: <strong>{originalLines}</strong> | 
          {t.dedupAfterDedup}: <strong>{dedupedLines}</strong> | 
          {t.dedupRemoved}: <strong className="text-red-600">{removedLines}</strong>
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl max-h-[300px] overflow-auto">
        <pre className="text-sm whitespace-pre-wrap break-words font-mono">
          {resultText || t.dedupNoResult}
        </pre>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleCopy}>{t.copyResult}</Button>
        <Button onClick={handleDownload} variant="secondary">
          {t.exportFile}
        </Button>
      </div>
    </div>
  );
}

