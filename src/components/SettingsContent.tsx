import { useTranslation } from '@/hooks/useTranslation';

export default function SettingsContent() {
  const t = useTranslation();

  const clearStorage = () => {
    if (confirm(t.settingsClearCacheDesc + '?')) {
      localStorage.clear();
      alert(t.toastCleared);
      window.location.href = '/';
    }
  };

  const exportSettings = () => {
    const settings = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      data: {
        content: localStorage.getItem('textgrove-content') || '',
        language: localStorage.getItem('textgrove-language') || 'zh',
      },
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'textgrove-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card p-8 rounded-2xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t.settingsTitle}</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">{t.settingsStopWords}</h2>
        <p className="text-sm text-gray-600">{t.settingsStopWordsDesc}</p>

        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-medium mb-3 text-gray-700">{t.settingsCurrentStopWords}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              的
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              了
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              是
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              在
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              我
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              有
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              和
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              就
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              不
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              人
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              the
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              a
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              an
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              and
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              or
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              but
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              in
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              on
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              at
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              to
            </span>
            <span className="px-3 py-1 bg-white rounded-lg text-sm border border-gray-200">
              for
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500">{t.settingsStopWordsNote}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">{t.settingsDataManagement}</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h3 className="font-medium text-gray-700">{t.settingsClearCache}</h3>
              <p className="text-sm text-gray-600 mt-1">{t.settingsClearCacheDesc}</p>
            </div>
            <button
              onClick={clearStorage}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
            >
              {t.clear}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h3 className="font-medium text-gray-700">{t.settingsExportSettings}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {t.settingsExportSettingsDesc}
              </p>
            </div>
            <button
              onClick={exportSettings}
              className="px-4 py-2 bg-brand-accent/60 hover:bg-brand-accent/80 rounded-xl transition"
            >
              {t.exportFile}
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">{t.settingsAboutStorage}</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t.settingsAboutStorageText}
        </p>
      </section>
    </div>
  );
}

