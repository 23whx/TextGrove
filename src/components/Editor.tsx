import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import Button from './ui/Button';
import { copyToClipboard } from '@/lib/export';

export default function Editor() {
  const text = useAppStore((state) => state.editor.text);
  const setText = useAppStore((state) => state.editor.setText);
  const showToast = useAppStore((state) => state.showToast);
  const t = useTranslation();

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
      showToast(t.toastFileImported, 'success');
    };
    reader.onerror = () => {
      showToast(t.toastFileImportFailed, 'error');
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    setText('');
    showToast(t.toastCleared, 'info');
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    showToast(success ? t.toastCopied : t.toastCopyFailed, success ? 'success' : 'error');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleClear} variant="secondary">
          {t.clear}
        </Button>
        <Button onClick={handleCopy} variant="secondary">
          {t.copy}
        </Button>
        <label className="inline-block cursor-pointer">
          <input
            type="file"
            accept=".txt,.csv,.json,.xml,.html,.css,.js,.ts,.md,.sql"
            onChange={handleFileImport}
            className="hidden"
          />
          <span className="inline-block px-4 py-2 rounded-xl font-medium transition-all bg-gray-200 hover:bg-gray-300 text-gray-800">
            {t.importFile}
          </span>
        </label>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.editorPlaceholder}
        className="w-full min-h-[400px] p-4 rounded-2xl shadow-lg resize-y font-mono text-sm"
        spellCheck={false}
      />
    </div>
  );
}

