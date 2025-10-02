import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import { formatContent } from '@/lib/format';
import Button from '../ui/Button';
import { copyToClipboard, downloadText } from '@/lib/export';

export default function FormatPanel() {
  const text = useAppStore((state) => state.editor.text);
  const lang = useAppStore((state) => state.format.lang);
  const setLang = useAppStore((state) => state.format.setLang);
  const tabWidth = useAppStore((state) => state.format.tabWidth);
  const setTabWidth = useAppStore((state) => state.format.setTabWidth);
  const showToast = useAppStore((state) => state.showToast);
  const t = useTranslation();

  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormat = async (mode: 'pretty' | 'min') => {
    if (!text.trim()) {
      showToast(t.toastInputRequired, 'error');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const result = await formatContent(text, {
        lang: lang === 'auto' ? undefined : lang,
        mode,
        tabWidth,
      });
      setOutput(result);
      showToast(t.toastFormatComplete, 'success');
    } catch (err) {
      const message = err instanceof Error ? err.message : t.toastFormatFailed;
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    showToast(success ? t.toastCopied : t.toastCopyFailed, success ? 'success' : 'error');
  };

  const handleDownload = () => {
    if (!output) return;
    const ext = lang === 'auto' ? 'txt' : lang;
    downloadText(output, `formatted.${ext}`);
    showToast(t.toastExported, 'success');
  };

  return (
    <div className="card p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{t.formatTitle}</h2>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t.formatType}</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-3 py-2 rounded-xl bg-brand-accent/20"
          >
            <option value="auto">{t.formatAuto}</option>
            <option value="json">JSON</option>
            <option value="xml">XML</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="md">Markdown</option>
            <option value="sql">SQL</option>
            <option value="text">纯文本</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t.formatIndent}</span>
          <input
            type="number"
            min="1"
            max="8"
            value={tabWidth}
            onChange={(e) => setTabWidth(Math.max(1, parseInt(e.target.value) || 2))}
            className="w-16 px-3 py-2 rounded-xl text-sm"
          />
        </label>

        <Button onClick={() => handleFormat('pretty')} disabled={isProcessing}>
          {isProcessing ? t.formatProcessing : t.formatBeautify}
        </Button>

        <Button
          onClick={() => handleFormat('min')}
          variant="secondary"
          disabled={isProcessing}
        >
          {t.formatMinify}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {output && (
        <>
          <div className="bg-gray-50 p-4 rounded-xl max-h-[400px] overflow-auto">
            <pre className="text-sm whitespace-pre-wrap break-words font-mono">
              {output}
            </pre>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCopy}>{t.copyResult}</Button>
            <Button onClick={handleDownload} variant="secondary">
              {t.exportFile}
            </Button>
          </div>
        </>
      )}

      {!output && !error && (
        <div className="text-center py-8 text-gray-400 text-sm">
          {t.formatEmpty}
        </div>
      )}
    </div>
  );
}

