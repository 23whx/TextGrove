/**
 * 国际化（i18n）配置
 */

export type Language = 'zh' | 'en' | 'ja' | 'ko';

export interface Translations {
  // 导航和通用
  appName: string;
  appSubtitle: string;
  settings: string;
  about: string;
  backToHome: string;
  
  // 工具标签
  toolStats: string;
  toolDedup: string;
  toolFreq: string;
  toolSimpTrad: string;
  toolFormat: string;
  
  // 编辑器
  editorPlaceholder: string;
  clear: string;
  copy: string;
  importFile: string;
  
  // 统计面板
  statsTitle: string;
  statsCharsWithSpace: string;
  statsCharsWithoutSpace: string;
  statsUnicodeChars: string;
  statsLines: string;
  statsWords: string;
  statsBytes: string;
  statsEmpty: string;
  
  // 去重面板
  dedupTitle: string;
  dedupIgnoreCase: string;
  dedupTrim: string;
  dedupIgnoreEmpty: string;
  dedupNormalizeWidth: string;
  dedupSort: string;
  dedupOriginalLines: string;
  dedupAfterDedup: string;
  dedupRemoved: string;
  dedupNoResult: string;
  
  // 词频面板
  freqTitle: string;
  freqTopN: string;
  freqShow: string;
  freqItems: string;
  freqExportCSV: string;
  freqToken: string;
  freqCount: string;
  freqNoData: string;
  freqNote: string;
  
  // 简繁转换
  simpTradTitle: string;
  simpTradS2T: string;
  simpTradT2S: string;
  simpTradAutoDetect: string;
  simpTradConvert: string;
  simpTradNote: string;
  simpTradEmpty: string;
  
  // 格式化
  formatTitle: string;
  formatType: string;
  formatAuto: string;
  formatIndent: string;
  formatBeautify: string;
  formatMinify: string;
  formatProcessing: string;
  formatEmpty: string;
  
  // 按钮和操作
  copyResult: string;
  exportFile: string;
  download: string;
  
  // Toast 消息
  toastFileImported: string;
  toastFileImportFailed: string;
  toastCleared: string;
  toastCopied: string;
  toastCopyFailed: string;
  toastFormatComplete: string;
  toastFormatFailed: string;
  toastConvertComplete: string;
  toastInputRequired: string;
  toastNoData: string;
  toastExported: string;
  toastDetectedSimplified: string;
  toastDetectedTraditional: string;
  toastUnknownType: string;
  
  // 关于页面
  aboutTitle: string;
  aboutIntro: string;
  aboutIntroText: string;
  aboutFeatures: string;
  aboutFeature1: string;
  aboutFeature2: string;
  aboutFeature3: string;
  aboutFeature4: string;
  aboutTechStack: string;
  aboutPrivacy: string;
  aboutPrivacyText: string;
  aboutLicense: string;
  aboutLicenseText: string;
  aboutContact: string;
  aboutThankYou: string;
  
  // 设置页面
  settingsTitle: string;
  settingsStopWords: string;
  settingsStopWordsDesc: string;
  settingsCurrentStopWords: string;
  settingsStopWordsNote: string;
  settingsDataManagement: string;
  settingsClearCache: string;
  settingsClearCacheDesc: string;
  settingsExportSettings: string;
  settingsExportSettingsDesc: string;
  settingsAboutStorage: string;
  settingsAboutStorageText: string;
  
  // 页脚
  footerCopyright: string;
  footerPrivacy: string;
}

export const translations: Record<Language, Translations> = {
  zh: {
    appName: 'TextGrove',
    appSubtitle: '文本工具站',
    settings: '设置',
    about: '关于',
    backToHome: '返回首页',
    
    toolStats: '总字数统计',
    toolDedup: '文本去重',
    toolFreq: '词频统计',
    toolSimpTrad: '简繁转换',
    toolFormat: '文本格式化',
    
    editorPlaceholder: '在此输入或粘贴文本...',
    clear: '清空',
    copy: '复制',
    importFile: '导入文件',
    
    statsTitle: '文本统计',
    statsCharsWithSpace: '字符数（含空白）',
    statsCharsWithoutSpace: '字符数（不含空白）',
    statsUnicodeChars: 'Unicode 字符数',
    statsLines: '行数',
    statsWords: '单词数',
    statsBytes: '估算字节数',
    statsEmpty: '请在左侧输入文本以查看统计信息',
    
    dedupTitle: '文本去重',
    dedupIgnoreCase: '忽略大小写',
    dedupTrim: '去除前后空白',
    dedupIgnoreEmpty: '忽略空行',
    dedupNormalizeWidth: '全角/半角标准化',
    dedupSort: '结果排序',
    dedupOriginalLines: '原始行数',
    dedupAfterDedup: '去重后',
    dedupRemoved: '移除',
    dedupNoResult: '（无结果）',
    
    freqTitle: '词频统计',
    freqTopN: '显示前',
    freqShow: '显示前',
    freqItems: '个',
    freqExportCSV: '导出 CSV',
    freqToken: '词条',
    freqCount: '频次',
    freqNoData: '无数据，请输入文本',
    freqNote: '* 统计包含拉丁单词和中文字符，已过滤常见停用词',
    
    simpTradTitle: '简繁转换',
    simpTradS2T: '简体 → 繁体',
    simpTradT2S: '繁体 → 简体',
    simpTradAutoDetect: '自动检测',
    simpTradConvert: '转换',
    simpTradNote: 'ℹ️ 当前使用内置简易转换（常用字）。如需完整转换，请安装 opencc-js 库。',
    simpTradEmpty: '选择转换方向后点击"转换"按钮',
    
    formatTitle: '文本格式化',
    formatType: '类型',
    formatAuto: '自动检测',
    formatIndent: '缩进',
    formatBeautify: '美化',
    formatMinify: '压缩',
    formatProcessing: '处理中...',
    formatEmpty: '选择格式化选项后点击"美化"或"压缩"按钮',
    
    copyResult: '复制结果',
    exportFile: '导出文件',
    download: '下载',
    
    toastFileImported: '文件导入成功',
    toastFileImportFailed: '文件导入失败',
    toastCleared: '已清空内容',
    toastCopied: '已复制到剪贴板',
    toastCopyFailed: '复制失败',
    toastFormatComplete: '格式化完成',
    toastFormatFailed: '格式化失败',
    toastConvertComplete: '转换完成',
    toastInputRequired: '请先输入内容',
    toastNoData: '无数据可导出',
    toastExported: '已导出文件',
    toastDetectedSimplified: '检测到简体中文，已设置为"简→繁"',
    toastDetectedTraditional: '检测到繁体中文，已设置为"繁→简"',
    toastUnknownType: '无法确定文本类型',
    
    aboutTitle: '关于 TextGrove',
    aboutIntro: '项目简介',
    aboutIntroText: 'TextGrove 是一个简洁高效的文本工具站，提供多种实用的文本处理功能。所有处理完全在浏览器本地进行，不会上传任何数据到服务器，充分保护您的隐私。',
    aboutFeatures: '核心功能',
    aboutFeature1: '总字数统计：实时统计字符数、行数、字节数等信息',
    aboutFeature2: '文本去重：支持逐行去重，可配置多种去重规则',
    aboutFeature3: '词频统计：分析文本中词语出现频率，支持停用词过滤',
    aboutFeature4: '文本格式化：支持 JSON、XML、HTML、CSS、SQL 等多种格式美化和压缩',
    aboutTechStack: '技术栈',
    aboutPrivacy: '隐私保护',
    aboutPrivacyText: 'TextGrove 完全在浏览器本地运行，所有文本处理都在您的设备上完成。我们不会收集、存储或传输您的任何文本数据。您可以放心使用本工具处理敏感信息。',
    aboutLicense: '开源许可',
    aboutLicenseText: '本项目采用 MIT 许可证开源。欢迎访问我们的 GitHub 仓库查看源代码、提交问题或贡献代码。',
    aboutContact: '联系方式',
    aboutThankYou: '感谢您使用 TextGrove！',
    
    settingsTitle: '设置',
    settingsStopWords: '停用词管理',
    settingsStopWordsDesc: '停用词会在词频统计中被过滤掉。您可以在这里查看和管理停用词列表。',
    settingsCurrentStopWords: '当前停用词',
    settingsStopWordsNote: '* 自定义停用词功能将在后续版本中提供',
    settingsDataManagement: '数据管理',
    settingsClearCache: '清除本地缓存',
    settingsClearCacheDesc: '清除浏览器中保存的文本内容和设置',
    settingsExportSettings: '导出设置',
    settingsExportSettingsDesc: '导出您的个性化设置为 JSON 文件',
    settingsAboutStorage: '关于本地存储',
    settingsAboutStorageText: 'TextGrove 使用浏览器的 localStorage 来保存您的文本内容和设置，以便下次访问时自动恢复。所有数据仅存储在您的设备上，不会上传到服务器。您可以随时清除这些数据。',
    
    footerCopyright: '© 2025 TextGrove | 完全本地处理，保护您的隐私',
    footerPrivacy: '完全本地处理，保护您的隐私',
  },
  
  en: {
    appName: 'TextGrove',
    appSubtitle: 'Text Tools',
    settings: 'Settings',
    about: 'About',
    backToHome: 'Back to Home',
    
    toolStats: 'Character Count',
    toolDedup: 'Deduplication',
    toolFreq: 'Word Frequency',
    toolSimpTrad: 'CN Conversion',
    toolFormat: 'Formatter',
    
    editorPlaceholder: 'Enter or paste your text here...',
    clear: 'Clear',
    copy: 'Copy',
    importFile: 'Import File',
    
    statsTitle: 'Text Statistics',
    statsCharsWithSpace: 'Characters (with spaces)',
    statsCharsWithoutSpace: 'Characters (without spaces)',
    statsUnicodeChars: 'Unicode Characters',
    statsLines: 'Lines',
    statsWords: 'Words',
    statsBytes: 'Estimated Bytes',
    statsEmpty: 'Enter text on the left to view statistics',
    
    dedupTitle: 'Deduplication',
    dedupIgnoreCase: 'Ignore case',
    dedupTrim: 'Trim whitespace',
    dedupIgnoreEmpty: 'Ignore empty lines',
    dedupNormalizeWidth: 'Normalize width',
    dedupSort: 'Sort results',
    dedupOriginalLines: 'Original lines',
    dedupAfterDedup: 'After dedup',
    dedupRemoved: 'Removed',
    dedupNoResult: '(No result)',
    
    freqTitle: 'Word Frequency',
    freqTopN: 'Top',
    freqShow: 'Show top',
    freqItems: 'items',
    freqExportCSV: 'Export CSV',
    freqToken: 'Token',
    freqCount: 'Count',
    freqNoData: 'No data, please enter text',
    freqNote: '* Includes Latin words and Chinese characters, common stop words filtered',
    
    simpTradTitle: 'Simplified ⇄ Traditional',
    simpTradS2T: 'Simplified → Traditional',
    simpTradT2S: 'Traditional → Simplified',
    simpTradAutoDetect: 'Auto Detect',
    simpTradConvert: 'Convert',
    simpTradNote: 'ℹ️ Currently using built-in conversion (common characters). Install opencc-js for complete conversion.',
    simpTradEmpty: 'Select direction and click "Convert"',
    
    formatTitle: 'Text Formatter',
    formatType: 'Type',
    formatAuto: 'Auto Detect',
    formatIndent: 'Indent',
    formatBeautify: 'Beautify',
    formatMinify: 'Minify',
    formatProcessing: 'Processing...',
    formatEmpty: 'Click "Beautify" or "Minify" after selecting options',
    
    copyResult: 'Copy Result',
    exportFile: 'Export File',
    download: 'Download',
    
    toastFileImported: 'File imported successfully',
    toastFileImportFailed: 'File import failed',
    toastCleared: 'Content cleared',
    toastCopied: 'Copied to clipboard',
    toastCopyFailed: 'Copy failed',
    toastFormatComplete: 'Formatting complete',
    toastFormatFailed: 'Formatting failed',
    toastConvertComplete: 'Conversion complete',
    toastInputRequired: 'Please enter content first',
    toastNoData: 'No data to export',
    toastExported: 'File exported',
    toastDetectedSimplified: 'Detected Simplified Chinese, set to "S→T"',
    toastDetectedTraditional: 'Detected Traditional Chinese, set to "T→S"',
    toastUnknownType: 'Unable to determine text type',
    
    aboutTitle: 'About TextGrove',
    aboutIntro: 'Introduction',
    aboutIntroText: 'TextGrove is a clean and efficient text tools website that provides various practical text processing features. All processing is done locally in your browser, without uploading any data to servers, fully protecting your privacy.',
    aboutFeatures: 'Core Features',
    aboutFeature1: 'Character Count: Real-time statistics of characters, lines, bytes, etc.',
    aboutFeature2: 'Deduplication: Line-by-line deduplication with configurable rules',
    aboutFeature3: 'Word Frequency: Analyze word frequency with stop word filtering',
    aboutFeature4: 'Text Formatter: Support JSON, XML, HTML, CSS, SQL formatting and minification',
    aboutTechStack: 'Tech Stack',
    aboutPrivacy: 'Privacy Protection',
    aboutPrivacyText: 'TextGrove runs entirely in your browser, all text processing is done on your device. We do not collect, store, or transmit any of your text data. You can safely use this tool to process sensitive information.',
    aboutLicense: 'Open Source License',
    aboutLicenseText: 'This project is open source under the MIT License. Feel free to visit our GitHub repository to view the source code, submit issues, or contribute.',
    aboutContact: 'Contact',
    aboutThankYou: 'Thank you for using TextGrove!',
    
    settingsTitle: 'Settings',
    settingsStopWords: 'Stop Words Management',
    settingsStopWordsDesc: 'Stop words will be filtered in word frequency statistics. You can view and manage the stop word list here.',
    settingsCurrentStopWords: 'Current Stop Words',
    settingsStopWordsNote: '* Custom stop words feature will be provided in future versions',
    settingsDataManagement: 'Data Management',
    settingsClearCache: 'Clear Local Cache',
    settingsClearCacheDesc: 'Clear text content and settings saved in browser',
    settingsExportSettings: 'Export Settings',
    settingsExportSettingsDesc: 'Export your personalized settings as a JSON file',
    settingsAboutStorage: 'About Local Storage',
    settingsAboutStorageText: 'TextGrove uses browser localStorage to save your text content and settings for automatic recovery on next visit. All data is stored only on your device and not uploaded to servers. You can clear this data at any time.',
    
    footerCopyright: '© 2025 TextGrove | All processing done locally to protect your privacy',
    footerPrivacy: 'All processing done locally to protect your privacy',
  },
  
  ja: {
    appName: 'TextGrove',
    appSubtitle: 'テキストツール',
    settings: '設定',
    about: '概要',
    backToHome: 'ホームに戻る',
    
    toolStats: '文字数カウント',
    toolDedup: '重複削除',
    toolFreq: '単語頻度',
    toolSimpTrad: '簡繁変換',
    toolFormat: 'フォーマッター',
    
    editorPlaceholder: 'ここにテキストを入力または貼り付けてください...',
    clear: 'クリア',
    copy: 'コピー',
    importFile: 'ファイル読込',
    
    statsTitle: 'テキスト統計',
    statsCharsWithSpace: '文字数（空白含む）',
    statsCharsWithoutSpace: '文字数（空白除く）',
    statsUnicodeChars: 'Unicode文字数',
    statsLines: '行数',
    statsWords: '単語数',
    statsBytes: '推定バイト数',
    statsEmpty: '左側にテキストを入力して統計を表示',
    
    dedupTitle: '重複削除',
    dedupIgnoreCase: '大文字小文字を無視',
    dedupTrim: '前後の空白を削除',
    dedupIgnoreEmpty: '空行を無視',
    dedupNormalizeWidth: '全角半角正規化',
    dedupSort: '結果をソート',
    dedupOriginalLines: '元の行数',
    dedupAfterDedup: '削除後',
    dedupRemoved: '削除',
    dedupNoResult: '（結果なし）',
    
    freqTitle: '単語頻度',
    freqTopN: 'トップ',
    freqShow: '上位',
    freqItems: '件表示',
    freqExportCSV: 'CSV出力',
    freqToken: 'トークン',
    freqCount: '回数',
    freqNoData: 'データなし、テキストを入力してください',
    freqNote: '* ラテン語の単語と漢字を含む、一般的なストップワードをフィルタリング済み',
    
    simpTradTitle: '簡体字⇄繁体字',
    simpTradS2T: '簡体字 → 繁体字',
    simpTradT2S: '繁体字 → 簡体字',
    simpTradAutoDetect: '自動検出',
    simpTradConvert: '変換',
    simpTradNote: 'ℹ️ 現在、組み込み変換（一般的な文字）を使用しています。完全な変換にはopencc-jsをインストールしてください。',
    simpTradEmpty: '方向を選択して「変換」をクリック',
    
    formatTitle: 'テキストフォーマッター',
    formatType: 'タイプ',
    formatAuto: '自動検出',
    formatIndent: 'インデント',
    formatBeautify: '整形',
    formatMinify: '圧縮',
    formatProcessing: '処理中...',
    formatEmpty: 'オプションを選択して「整形」または「圧縮」をクリック',
    
    copyResult: '結果をコピー',
    exportFile: 'ファイル出力',
    download: 'ダウンロード',
    
    toastFileImported: 'ファイルを正常に読み込みました',
    toastFileImportFailed: 'ファイルの読み込みに失敗しました',
    toastCleared: 'コンテンツをクリアしました',
    toastCopied: 'クリップボードにコピーしました',
    toastCopyFailed: 'コピーに失敗しました',
    toastFormatComplete: 'フォーマット完了',
    toastFormatFailed: 'フォーマット失敗',
    toastConvertComplete: '変換完了',
    toastInputRequired: '最初にコンテンツを入力してください',
    toastNoData: 'エクスポートするデータがありません',
    toastExported: 'ファイルを出力しました',
    toastDetectedSimplified: '簡体字中国語を検出、「簡→繁」に設定しました',
    toastDetectedTraditional: '繁体字中国語を検出、「繁→簡」に設定しました',
    toastUnknownType: 'テキストタイプを判定できません',
    
    aboutTitle: 'TextGroveについて',
    aboutIntro: 'プロジェクト紹介',
    aboutIntroText: 'TextGroveは、さまざまな実用的なテキスト処理機能を提供する、クリーンで効率的なテキストツールWebサイトです。すべての処理はブラウザでローカルに実行され、データをサーバーにアップロードしないため、プライバシーを完全に保護します。',
    aboutFeatures: '主な機能',
    aboutFeature1: '文字数カウント：文字、行、バイトなどのリアルタイム統計',
    aboutFeature2: '重複削除：設定可能なルールで行ごとの重複削除',
    aboutFeature3: '単語頻度：ストップワードフィルタリングで単語頻度を分析',
    aboutFeature4: 'テキストフォーマッター：JSON、XML、HTML、CSS、SQLのフォーマットと圧縮をサポート',
    aboutTechStack: '技術スタック',
    aboutPrivacy: 'プライバシー保護',
    aboutPrivacyText: 'TextGroveはブラウザ内で完全に実行され、すべてのテキスト処理はデバイス上で行われます。テキストデータの収集、保存、送信は一切行いません。機密情報の処理にも安心してご利用いただけます。',
    aboutLicense: 'オープンソースライセンス',
    aboutLicenseText: 'このプロジェクトはMITライセンスの下でオープンソース化されています。GitHubリポジトリにアクセスして、ソースコードの閲覧、問題の報告、または貢献をお気軽に行ってください。',
    aboutContact: '連絡先',
    aboutThankYou: 'TextGroveをご利用いただきありがとうございます！',
    
    settingsTitle: '設定',
    settingsStopWords: 'ストップワード管理',
    settingsStopWordsDesc: 'ストップワードは単語頻度統計でフィルタリングされます。ここでストップワードリストを表示および管理できます。',
    settingsCurrentStopWords: '現在のストップワード',
    settingsStopWordsNote: '* カスタムストップワード機能は将来のバージョンで提供されます',
    settingsDataManagement: 'データ管理',
    settingsClearCache: 'ローカルキャッシュをクリア',
    settingsClearCacheDesc: 'ブラウザに保存されたテキストコンテンツと設定をクリア',
    settingsExportSettings: '設定をエクスポート',
    settingsExportSettingsDesc: 'パーソナライズされた設定をJSONファイルとしてエクスポート',
    settingsAboutStorage: 'ローカルストレージについて',
    settingsAboutStorageText: 'TextGroveはブラウザのlocalStorageを使用してテキストコンテンツと設定を保存し、次回のアクセス時に自動的に復元します。すべてのデータはデバイスにのみ保存され、サーバーにアップロードされません。いつでもこのデータをクリアできます。',
    
    footerCopyright: '© 2025 TextGrove | すべての処理はローカルで行われ、プライバシーを保護します',
    footerPrivacy: 'すべての処理はローカルで行われ、プライバシーを保護します',
  },
  
  ko: {
    appName: 'TextGrove',
    appSubtitle: '텍스트 도구',
    settings: '설정',
    about: '정보',
    backToHome: '홈으로 돌아가기',
    
    toolStats: '문자 수 세기',
    toolDedup: '중복 제거',
    toolFreq: '단어 빈도',
    toolSimpTrad: '간번 변환',
    toolFormat: '포맷터',
    
    editorPlaceholder: '여기에 텍스트를 입력하거나 붙여넣으세요...',
    clear: '지우기',
    copy: '복사',
    importFile: '파일 가져오기',
    
    statsTitle: '텍스트 통계',
    statsCharsWithSpace: '문자 수 (공백 포함)',
    statsCharsWithoutSpace: '문자 수 (공백 제외)',
    statsUnicodeChars: 'Unicode 문자 수',
    statsLines: '줄 수',
    statsWords: '단어 수',
    statsBytes: '예상 바이트 수',
    statsEmpty: '왼쪽에 텍스트를 입력하여 통계 보기',
    
    dedupTitle: '중복 제거',
    dedupIgnoreCase: '대소문자 무시',
    dedupTrim: '공백 제거',
    dedupIgnoreEmpty: '빈 줄 무시',
    dedupNormalizeWidth: '전각/반각 정규화',
    dedupSort: '결과 정렬',
    dedupOriginalLines: '원본 줄 수',
    dedupAfterDedup: '제거 후',
    dedupRemoved: '제거됨',
    dedupNoResult: '(결과 없음)',
    
    freqTitle: '단어 빈도',
    freqTopN: '상위',
    freqShow: '상위',
    freqItems: '개 표시',
    freqExportCSV: 'CSV 내보내기',
    freqToken: '토큰',
    freqCount: '횟수',
    freqNoData: '데이터 없음, 텍스트를 입력하세요',
    freqNote: '* 라틴 단어와 한자 포함, 일반적인 불용어 필터링됨',
    
    simpTradTitle: '간체자⇄번체자',
    simpTradS2T: '간체자 → 번체자',
    simpTradT2S: '번체자 → 간체자',
    simpTradAutoDetect: '자동 감지',
    simpTradConvert: '변환',
    simpTradNote: 'ℹ️ 현재 내장 변환(일반 문자)을 사용 중입니다. 완전한 변환을 위해 opencc-js를 설치하세요.',
    simpTradEmpty: '방향을 선택하고 "변환"을 클릭하세요',
    
    formatTitle: '텍스트 포맷터',
    formatType: '유형',
    formatAuto: '자동 감지',
    formatIndent: '들여쓰기',
    formatBeautify: '정리',
    formatMinify: '압축',
    formatProcessing: '처리 중...',
    formatEmpty: '옵션을 선택한 후 "정리" 또는 "압축"을 클릭하세요',
    
    copyResult: '결과 복사',
    exportFile: '파일 내보내기',
    download: '다운로드',
    
    toastFileImported: '파일을 성공적으로 가져왔습니다',
    toastFileImportFailed: '파일 가져오기 실패',
    toastCleared: '콘텐츠를 지웠습니다',
    toastCopied: '클립보드에 복사되었습니다',
    toastCopyFailed: '복사 실패',
    toastFormatComplete: '포맷 완료',
    toastFormatFailed: '포맷 실패',
    toastConvertComplete: '변환 완료',
    toastInputRequired: '먼저 콘텐츠를 입력하세요',
    toastNoData: '내보낼 데이터가 없습니다',
    toastExported: '파일을 내보냈습니다',
    toastDetectedSimplified: '간체 중국어 감지, "간→번"으로 설정했습니다',
    toastDetectedTraditional: '번체 중국어 감지, "번→간"으로 설정했습니다',
    toastUnknownType: '텍스트 유형을 확인할 수 없습니다',
    
    aboutTitle: 'TextGrove 정보',
    aboutIntro: '프로젝트 소개',
    aboutIntroText: 'TextGrove는 다양한 실용적인 텍스트 처리 기능을 제공하는 깔끔하고 효율적인 텍스트 도구 웹사이트입니다. 모든 처리는 브라우저에서 로컬로 수행되며 서버에 데이터를 업로드하지 않아 개인정보를 완전히 보호합니다.',
    aboutFeatures: '주요 기능',
    aboutFeature1: '문자 수 세기: 문자, 줄, 바이트 등의 실시간 통계',
    aboutFeature2: '중복 제거: 구성 가능한 규칙로 줄별 중복 제거',
    aboutFeature3: '단어 빈도: 불용어 필터링으로 단어 빈도 분석',
    aboutFeature4: '텍스트 포맷터: JSON, XML, HTML, CSS, SQL 포맷팅 및 압축 지원',
    aboutTechStack: '기술 스택',
    aboutPrivacy: '개인정보 보호',
    aboutPrivacyText: 'TextGrove는 브라우저에서 완전히 실행되며 모든 텍스트 처리는 장치에서 수행됩니다. 텍스트 데이터를 수집, 저장 또는 전송하지 않습니다. 민감한 정보를 처리하는 데 안전하게 사용할 수 있습니다.',
    aboutLicense: '오픈 소스 라이선스',
    aboutLicenseText: '이 프로젝트는 MIT 라이선스에 따라 오픈 소스입니다. GitHub 리포지토리를 방문하여 소스 코드를 보고 문제를 제출하거나 기여할 수 있습니다.',
    aboutContact: '연락처',
    aboutThankYou: 'TextGrove를 사용해 주셔서 감사합니다!',
    
    settingsTitle: '설정',
    settingsStopWords: '불용어 관리',
    settingsStopWordsDesc: '불용어는 단어 빈도 통계에서 필터링됩니다. 여기에서 불용어 목록을 보고 관리할 수 있습니다.',
    settingsCurrentStopWords: '현재 불용어',
    settingsStopWordsNote: '* 사용자 정의 불용어 기능은 향후 버전에서 제공될 예정입니다',
    settingsDataManagement: '데이터 관리',
    settingsClearCache: '로컬 캐시 지우기',
    settingsClearCacheDesc: '브라우저에 저장된 텍스트 콘텐츠 및 설정 지우기',
    settingsExportSettings: '설정 내보내기',
    settingsExportSettingsDesc: '개인화된 설정을 JSON 파일로 내보내기',
    settingsAboutStorage: '로컬 저장소 정보',
    settingsAboutStorageText: 'TextGrove는 브라우저의 localStorage를 사용하여 텍스트 콘텐츠와 설정을 저장하여 다음 방문 시 자동으로 복구합니다. 모든 데이터는 장치에만 저장되며 서버에 업로드되지 않습니다. 언제든지 이 데이터를 지울 수 있습니다.',
    
    footerCopyright: '© 2025 TextGrove | 모든 처리는 로컬에서 수행되어 개인정보를 보호합니다',
    footerPrivacy: '모든 처리는 로컬에서 수행되어 개인정보를 보호합니다',
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations.zh;
}

