import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import {
  simplifiedToTraditional,
  traditionalToSimplified,
  detectScript,
} from '@/lib/opencc';
import Button from '../ui/Button';
import { copyToClipboard, downloadText } from '@/lib/export';

export default function SimpTradPanel() {
  const text = useAppStore((state) => state.editor.text);
  const showToast = useAppStore((state) => state.showToast);
  const t = useTranslation();
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<'s2t' | 't2s'>('s2t');

  const handleConvert = () => {
    if (!text.trim()) {
      showToast(t.toastInputRequired, 'error');
      return;
    }

    const result =
      direction === 's2t'
        ? simplifiedToTraditional(text)
        : traditionalToSimplified(text);
    
    setOutput(result);
    showToast(t.toastConvertComplete, 'success');
  };

  const handleAutoDetect = () => {
    if (!text.trim()) {
      showToast(t.toastInputRequired, 'error');
      return;
    }

    const detected = detectScript(text);
    if (detected === 'simplified') {
      setDirection('s2t');
      showToast(t.toastDetectedSimplified, 'info');
    } else if (detected === 'traditional') {
      setDirection('t2s');
      showToast(t.toastDetectedTraditional, 'info');
    } else {
      showToast(t.toastUnknownType, 'info');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    showToast(success ? t.toastCopied : t.toastCopyFailed, success ? 'success' : 'error');
  };

  const handleDownload = () => {
    if (!output) return;
    downloadText(output, 'converted.txt');
    showToast(t.toastExported, 'success');
  };

  return (
    <div className="card p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{t.simpTradTitle}</h2>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="direction"
            checked={direction === 's2t'}
            onChange={() => setDirection('s2t')}
            className="w-4 h-4"
          />
          <span>{t.simpTradS2T}</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="direction"
            checked={direction === 't2s'}
            onChange={() => setDirection('t2s')}
            className="w-4 h-4"
          />
          <span>{t.simpTradT2S}</span>
        </label>

        <Button onClick={handleAutoDetect} variant="outline">
          {t.simpTradAutoDetect}
        </Button>

        <Button onClick={handleConvert}>{t.simpTradConvert}</Button>
      </div>

      <div className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-xl border border-yellow-200">
        {t.simpTradNote}
      </div>

      {output && (
        <>
          <div className="bg-gray-50 p-4 rounded-xl max-h-[400px] overflow-auto">
            <pre className="text-sm whitespace-pre-wrap break-words">
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

      {!output && (
        <div className="text-center py-8 text-gray-400 text-sm">
          {t.simpTradEmpty}
        </div>
      )}
    </div>
  );
}

