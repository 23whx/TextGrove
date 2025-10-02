import { useAppStore, type ToolType } from '@/store/useAppStore';
import { useTranslation } from '@/hooks/useTranslation';
import Editor from './Editor';
import StatsCard from './panels/StatsCard';
import DedupPanel from './panels/DedupPanel';
import FreqPanel from './panels/FreqPanel';
import SimpTradPanel from './panels/SimpTradPanel';
import FormatPanel from './panels/FormatPanel';

export default function ToolTabs() {
  const activeTool = useAppStore((state) => state.activeTool);
  const setActiveTool = useAppStore((state) => state.setActiveTool);
  const t = useTranslation();

  const tools = [
    { id: 'stats' as ToolType, label: t.toolStats },
    { id: 'dedup' as ToolType, label: t.toolDedup },
    { id: 'freq' as ToolType, label: t.toolFreq },
    { id: 'simptrad' as ToolType, label: t.toolSimpTrad },
    { id: 'format' as ToolType, label: t.toolFormat },
  ];

  const renderPanel = () => {
    switch (activeTool) {
      case 'stats':
        return <StatsCard />;
      case 'dedup':
        return <DedupPanel />;
      case 'freq':
        return <FreqPanel />;
      case 'simptrad':
        return <SimpTradPanel />;
      case 'format':
        return <FormatPanel />;
      default:
        return <StatsCard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 工具标签 */}
      <div className="flex flex-wrap gap-2 p-2 bg-white/50 rounded-2xl backdrop-blur">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              activeTool === tool.id
                ? 'bg-brand-accent text-gray-900 shadow-md'
                : 'bg-white/70 text-gray-600 hover:bg-white'
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* 主内容区 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <Editor />
        </div>
        <div>{renderPanel()}</div>
      </div>
    </div>
  );
}

