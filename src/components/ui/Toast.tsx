import { useAppStore } from '@/store/useAppStore';

export default function Toast() {
  const toast = useAppStore((state) => state.toast);
  const hideToast = useAppStore((state) => state.hideToast);

  if (!toast) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[toast.type];

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3`}
      >
        <span>{toast.message}</span>
        <button
          onClick={hideToast}
          className="text-white/80 hover:text-white"
          aria-label="关闭"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

