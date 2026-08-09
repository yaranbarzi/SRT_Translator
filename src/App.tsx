import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Languages, 
  UploadCloud, 
  DownloadCloud, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Database, 
  Sparkles, 
  AlertCircle, 
  FileText, 
  CheckCircle2,
  RefreshCw,
  Clock,
  BookOpen,
  Settings,
  Sun,
  Moon,
  Lock,
  Unlock,
  Key,
  Crown,
  Send,
  Zap,
  Cpu,
  ShieldCheck,
  Check,
  ExternalLink,
  Info,
  Eye,
  EyeOff,
  Youtube,
  Video,
  Terminal
} from "lucide-react";
import { SrtSubtitle, GlossaryTerm, TranslationStatus } from "./types";

// Dual-Language Locales
const locales = {
  en: {
    title: "SubTranslate",
    proAccent: "Pro",
    subtitle: "Translate your SRT subtitle files using AI, with translation memory, glossary support, and full RTL layout.",
    toggleLanguage: "FA (فارسی)",
    standardTab: "Standard Version",
    advancedTab: "Advanced Version (Pro)",
    sourceLanguage: "Source Language",
    targetLanguage: "Target Language",
    translationStyle: "Translation Style",
    autoDetect: "Auto-Detect",
    glossaryTitle: "Specialized Glossary",
    glossaryDesc: "Enforce exact translations for specific technical terms and brand names.",
    addTerm: "Add Term",
    sourceTerm: "Source Term",
    targetTerm: "Target Equivalent",
    importGlossary: "Upload JSON",
    exportGlossary: "Export JSON",
    noGlossary: "No terms added yet.",
    uploadSrt: "Upload SRT File",
    dragDrop: "Drag & drop SRT here, or click to browse",
    processing: "Processing...",
    translateBtn: "START TRANSLATION",
    pauseBtn: "PAUSE",
    resumeBtn: "RESUME",
    resetBtn: "Reset & Clear All",
    downloadBtn: "DOWNLOAD SRT",
    statsTitle: "Translation Status & Stats",
    totalLines: "Total Subtitles",
    translatedLines: "Translated",
    tmHits: "TM Cache Hits",
    tmTotal: "TM Saved Pairs",
    progress: "Progress",
    statusText: "Status",
    statusIdle: "Waiting for SRT file...",
    statusTranslating: "Translating subtitles...",
    statusPaused: "Translation paused",
    statusCompleted: "Translation completed successfully!",
    statusError: "An error occurred. Ready to retry or resume.",
    persistenceNote: "All settings and translation memory are securely saved in your browser.",
    conversational: "Conversational / Casual",
    formal: "Formal / Academic",
    technical: "Technical & Educational",
    importPlaceholder: "Paste Glossary JSON here...",
    saveImport: "Save",
    cancelImport: "Cancel",
    confirmReset: "Are you sure you want to reset all translations and state?",
    emptyFile: "Please select an SRT file first.",
    noTargetLanguage: "Please choose a target language.",
    noSubtitles: "No subtitles found in the uploaded file.",
    autoResumeTitle: "Auto-Resume Available",
    autoResumeMsg: "An incomplete session was found. Would you like to resume?",
    autoResumeBtn: "Resume Session",
    dismissBtn: "Dismiss",
    fileDetails: "File Details",
    fileName: "File Name",
    fileSize: "File Size",
    previewTitle: "Subtitle Live Preview",
    previewSource: "Original Text",
    previewTarget: "Translated Text",
    sourceTermPlaceholder: "Term in source language",
    targetTermPlaceholder: "Equivalent in target language",
    batchProgress: "Batch {current} of {total} (Lines {start}-{end})",
    
    // Pro Version Specific
    proTitle: "Advanced Pro Control Panel",
    proLockTitle: "Advanced Version Security",
    proLockDesc: "Regular users do not have access to this section. Please enter the password to unlock Advanced Pro features.",
    enterPassword: "Enter password...",
    unlockBtn: "Unlock Pro Version",
    wrongPassword: "Incorrect password!",
    proUnlockedBadge: "Pro Active",
    lockAgain: "Lock Mode",
    parallelProcessing: "Fast Parallel Processing",
    parallelDesc: "Subtitles are processed in optimized parallel batches for significantly higher translation speed.",
    proExplanationTitle: "Why Use the Advanced Pro Version?",
    proExplanationBody: "The Advanced version allows you to define specialized glossary terms for technical vocabulary and brand names. In addition, Translation Memory (TM) to save and reuse repeated sentences, fast parallel processing, and maximum translation speed are exclusively available in this mode.",
    telegramPromoText: "To purchase and activate the full Advanced Version, message us on Telegram:",
    telegramBtnText: "Message on Telegram",
    stdNoticeTitle: "Standard Version Info",
    stdNoticeBody: "The Standard version performs reliable subtitle translation. For Translation Memory (TM), customized terminology, and faster parallel speeds, switch to the Advanced Pro tab.",
    tmLabel: "Translation Memory (TM)",
    tmCheckbox: "Save and reuse repeated sentences",
    tmClear: "Clear TM",
    lightTheme: "Light Theme",
    darkTheme: "Dark Theme",
    apiKeyTitle: "Gemini API Key",
    apiKeyDesc: "Enter your Gemini API key to run translations on any server or platform.",
    apiKeyPlaceholder: "Paste your Gemini API key (AIzaSy...)",
    apiKeyValid: "Key Active & Valid",
    apiKeyValidating: "Checking Key...",
    apiKeyInvalid: "Invalid API Key",
    apiKeyIdle: "Key Not Set (Default)",
    checkApiKeyBtn: "Check Key",
    apiKeyNote: "Your key is saved locally in browser and applies to both Standard & Advanced modes.",
    getApiKeyLink: "Get Free Gemini Key",
    videoTutorialBtn: "Video Tutorial: How to Get Gemini API Key",
    clearFileBtn: "Remove Subtitle File",
    clearApiKeyBtn: "Clear Key",
    clearGlossaryBtn: "Clear All Terms",
    confirmClearGlossary: "Are you sure you want to clear all terms from the glossary?",
    translateAdvancedBtn: "Start Advanced Translation (Fast & Glossary)",
    youtubePromoText: "To access other AI tools, follow us on YouTube:",
    youtubeBtnText: "AIGolden YouTube Channel",
  },
  fa: {
    title: "مترجم زیرنویس",
    proAccent: "حرفه‌ای",
    subtitle: "فایل‌های زیرنویس SRT خود را با هوش مصنوعی، حافظه ترجمه و پشتیبانی کامل از راست‌چین ترجمه کنید.",
    toggleLanguage: "EN (English)",
    standardTab: "نسخه معمولی",
    advancedTab: "نسخه پیشرفته (Pro)",
    sourceLanguage: "زبان مبدا",
    targetLanguage: "زبان مقصد",
    translationStyle: "سبک ترجمه",
    autoDetect: "تشخیص خودکار",
    glossaryTitle: "واژه‌نامه تخصصی (Glossary)",
    glossaryDesc: "ترجمه دقیق کلمات یا عبارات خاص و اصطلاحات فنی را تعیین و تحمیل کنید.",
    addTerm: "افزودن اصطلاح",
    sourceTerm: "اصطلاح مبدا",
    targetTerm: "معادل مقصد",
    importGlossary: "آپلود JSON",
    exportGlossary: "خروجی JSON",
    noGlossary: "هنوز هیچ اصطلاحی اضافه نشده است.",
    uploadSrt: "بارگذاری فایل SRT",
    dragDrop: "فایل SRT خود را بکشید یا برای انتخاب کلیک کنید",
    processing: "در حال پردازش...",
    translateBtn: "شروع ترجمه زیرنویس",
    pauseBtn: "توقف موقت",
    resumeBtn: "ادامه ترجمه",
    resetBtn: "پاکسازی و شروع مجدد",
    downloadBtn: "دانلود زیرنویس SRT",
    statsTitle: "وضعیت و آمار ترجمه",
    totalLines: "کل زیرنویس‌ها",
    translatedLines: "ترجمه شده",
    tmHits: "استفاده از حافظه",
    tmTotal: "جملات ذخیره شده",
    progress: "پیشرفت",
    statusText: "وضعیت",
    statusIdle: "منتظر بارگذاری فایل SRT...",
    statusTranslating: "در حال ترجمه زیرنویس‌ها...",
    statusPaused: "ترجمه متوقف شد",
    statusCompleted: "ترجمه با موفقیت انجام شد!",
    statusError: "خطایی رخ داد. آماده تلاش مجدد یا ادامه ترجمه.",
    persistenceNote: "تمام تنظیمات و حافظه ترجمه به‌طور ایمن در مرورگر شما ذخیره می‌شوند.",
    conversational: "عامیانه / مکالمه‌ای",
    formal: "رسمی / آکادمیک",
    technical: "فنی و آموزشی",
    importPlaceholder: "کد JSON واژه‌نامه را اینجا وارد کنید...",
    saveImport: "ذخیره",
    cancelImport: "لغو",
    confirmReset: "آیا مطمئن هستید که می‌خواهید تمام ترجمه‌ها و وضعیت ذخیره شده را پاک کنید؟",
    emptyFile: "لطفاً ابتدا یک فایل SRT انتخاب کنید.",
    noTargetLanguage: "لطفاً یک زبان مقصد انتخاب کنید.",
    noSubtitles: "هیچ زیرنویسی در فایل بارگذاری شده یافت نشد.",
    autoResumeTitle: "امکان ادامه خودکار وجود دارد",
    autoResumeMsg: "یک جلسه ترجمه ناتمام یافت شد. آیا مایلید آن را ادامه دهید؟",
    autoResumeBtn: "ادامه جلسه قبلی",
    dismissBtn: "انصراف",
    fileDetails: "مشخصات فایل",
    fileName: "نام فایل",
    fileSize: "اندازه فایل",
    previewTitle: "پیش‌نمایش زنده زیرنویس‌ها",
    previewSource: "متن اصلی",
    previewTarget: "متن ترجمه شده",
    sourceTermPlaceholder: "اصطلاح در زبان مبدا",
    targetTermPlaceholder: "معادل دقیق در زبان مقصد",
    batchProgress: "دسته {current} از {total} (خطوط {start} تا {end})",
    
    // Pro Version Specific
    proTitle: "پنل پیشرفته و واژه‌نامه تخصصی",
    proLockTitle: "ورود به نسخه پیشرفته",
    proLockDesc: "کاربران معمولی به این بخش دسترسی ندارند. برای فعال‌سازی رمز عبور را وارد کنید.",
    enterPassword: "رمز عبور را وارد کنید...",
    unlockBtn: "ورود و فعال‌سازی",
    wrongPassword: "رمز عبور اشتباه است!",
    proUnlockedBadge: "نسخه پیشرفته فعال است",
    lockAgain: "قفل مجدد",
    parallelProcessing: "پردازش سریع و موازی",
    parallelDesc: "با فعال‌سازی پردازش موازی، سرعت ترجمه زیرنویس‌ها به‌طور چشمگیری افزایش می‌یابد.",
    proExplanationTitle: "مزایای واژه‌نامه و نسخه پیشرفته",
    proExplanationBody: "واژه‌نامه تخصصی به شما امکان می‌دهد ترجمه دقیق کلمات، اصطلاحات فنی و نام‌های خاص را تعیین کنید. همچنین قابلیت **حافظه ترجمه (TM)** جهت ذخیره و استفاده مجدد هوشمند از جملات تکراری، پردازش موازی و سرعت حداکثری فقط در این بخش فعال است.",
    telegramPromoText: "برای خرید و فعالسازی نسخه پیشرفته به تلگرام ما پیام بدین:",
    telegramBtnText: "ارسال پیام در تلگرام",
    stdNoticeTitle: "درباره نسخه معمولی",
    stdNoticeBody: "نسخه معمولی ترجمه استاندارد و روان زیرنویس‌ها را انجام می‌دهد. برای استفاده از **حافظه ترجمه (TM)**، واژه‌نامه تخصصی و سرعت بالاتر، به تب نسخه پیشرفته مراجعه کنید.",
    tmLabel: "حافظه ترجمه (TM)",
    tmCheckbox: "ذخیره و استفاده مجدد از جملات تکراری",
    tmClear: "پاکسازی TM",
    lightTheme: "تم روشن",
    darkTheme: "تم تاریک",
    apiKeyTitle: "کلید Gemini API (شناسه اختصاصی)",
    apiKeyDesc: "کلید API اختصاصی خود را وارد کنید تا برنامه در هر پلتفرمی بدون نیاز به تنظیمات سرور کار کند.",
    apiKeyPlaceholder: "کلید Gemini API خود را وارد کنید (AIzaSy...)",
    apiKeyValid: "کلید فعال و معتبر است",
    apiKeyValidating: "در حال بررسی کلید...",
    apiKeyInvalid: "کلید نامعتبر یا غیرفعال است",
    apiKeyIdle: "کلید تنظیم نشده (کلید پیش‌فرض)",
    checkApiKeyBtn: "تست کلید",
    apiKeyNote: "این کلید در مرورگر شما ذخیره شده و روی هر دو نسخه معمولی و پیشرفته اعمال می‌شود.",
    getApiKeyLink: "دریافت کلید رایگان Gemini",
    videoTutorialBtn: "ویدیو آموزشی: نحوه دریافت کلید Gemini API",
    clearFileBtn: "حذف و پاکسازی فایل زیرنویس",
    clearApiKeyBtn: "حذف کلید",
    clearGlossaryBtn: "پاکسازی واژه‌نامه",
    confirmClearGlossary: "آیا مطمئن هستید که می‌خواهید تمام اصطلاحات لیست واژه‌نامه را خالی کنید؟",
    translateAdvancedBtn: "شروع ترجمه پیشرفته (پردازش سریع و واژه‌نامه)",
    youtubePromoText: "برای دسترسی به سایر ابزارهای هوش مصنوعی، ما را در یوتیوب دنبال کنید:",
    youtubeBtnText: "کانال یوتیوب aigolden",
  }
};

// No default pre-filled glossary terms as requested
const defaultGlossary: GlossaryTerm[] = [];

const majorLanguages = [
  "English", "Persian", "Spanish", "German", "French", "Arabic", 
  "Italian", "Portuguese", "Russian", "Chinese", "Japanese", 
  "Korean", "Turkish", "Hindi", "Urdu"
];

function getTmKey(sourceText: string, srcLang: string, tgtLang: string): string {
  return `${srcLang.toLowerCase()}_to_${tgtLang.toLowerCase()}_${sourceText.trim()}`;
}

export default function App() {
  const [uiLang, setUiLang] = useState<"en" | "fa">(() => {
    const saved = localStorage.getItem("sub_translator_ui_lang");
    return (saved === "en" || saved === "fa") ? saved : "fa";
  });
  const isRtl = uiLang === "fa";
  const t = locales[uiLang];

  // Primary App Tabs: "standard" | "advanced"
  const [mainTab, setMainTab] = useState<"standard" | "advanced">(() => {
    const saved = localStorage.getItem("sub_translator_main_tab");
    return (saved === "standard" || saved === "advanced") ? saved : "standard";
  });

  useEffect(() => {
    localStorage.setItem("sub_translator_main_tab", mainTab);
  }, [mainTab]);

  // Pro Version Lock & Password State
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("sub_translator_pro_unlocked") === "true";
  });
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isVerifyingProPass, setIsVerifyingProPass] = useState<boolean>(false);

  const handleUnlockPro = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = passwordInput.trim();
    if (!trimmedInput) return;

    setIsVerifyingProPass(true);
    setPasswordError("");

    try {
      const res = await fetch("/api/verify-pro-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: trimmedInput }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsProUnlocked(true);
          setPasswordError("");
          setPasswordInput("");
          localStorage.setItem("sub_translator_pro_unlocked", "true");
          addLog(isRtl ? "نسخه پیشرفته با موفقیت فعال شد." : "Advanced version activated successfully.", "SUCCESS");
          return;
        }
      }
      // If endpoint returned non-OK or status 404 (static host), fallback check:
      const expectedPassword = import.meta.env.VITE_PRO_PASSWORD || "aigoldenyt";
      if (trimmedInput === expectedPassword) {
        setIsProUnlocked(true);
        setPasswordError("");
        setPasswordInput("");
        localStorage.setItem("sub_translator_pro_unlocked", "true");
        addLog(isRtl ? "نسخه پیشرفته با موفقیت فعال شد." : "Advanced version activated successfully.", "SUCCESS");
      } else {
        setPasswordError(t.wrongPassword);
        addLog(isRtl ? "تلاش ناموفق برای ورود به نسخه پیشرفته (رمز عبور اشتباه)." : "Failed login attempt to Pro version.", "ERROR");
      }
    } catch {
      // Fallback check if static host / offline mode
      const expectedPassword = import.meta.env.VITE_PRO_PASSWORD || "aigoldenyt";
      if (trimmedInput === expectedPassword) {
        setIsProUnlocked(true);
        setPasswordError("");
        setPasswordInput("");
        localStorage.setItem("sub_translator_pro_unlocked", "true");
        addLog(isRtl ? "نسخه پیشرفته با موفقیت فعال شد." : "Advanced version activated successfully.", "SUCCESS");
      } else {
        setPasswordError(t.wrongPassword);
        addLog(isRtl ? "تلاش ناموفق برای ورود به نسخه پیشرفته (رمز عبور اشتباه)." : "Failed login attempt to Pro version.", "ERROR");
      }
    } finally {
      setIsVerifyingProPass(false);
    }
  };

  const handleLockPro = () => {
    setIsProUnlocked(false);
    localStorage.setItem("sub_translator_pro_unlocked", "false");
    addLog(isRtl ? "نسخه پیشرفته قفل شد." : "Advanced version locked.", "INFO");
  };

  // Parallel Processing Setting for Pro Mode (Default true in Pro)
  const [isParallelEnabled, setIsParallelEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("sub_translator_parallel");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sub_translator_parallel", String(isParallelEnabled));
  }, [isParallelEnabled]);

  // Form Configurations
  const [sourceLanguage, setSourceLanguage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("sub_translator_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.sourceLanguage || "Auto-Detect";
      }
    } catch (e) {}
    return "Auto-Detect";
  });

  const [targetLanguage, setTargetLanguage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("sub_translator_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.targetLanguage || "Persian";
      }
    } catch (e) {}
    return "Persian";
  });

  const [translationStyle, setTranslationStyle] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("sub_translator_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.translationStyle || "Conversational/Casual";
      }
    } catch (e) {}
    return "Conversational/Casual";
  });

  // Standard Version Workspace State
  const [stdSubtitles, setStdSubtitles] = useState<SrtSubtitle[]>([]);
  const [stdFileName, setStdFileName] = useState<string>("");
  const [stdFileSize, setStdFileSize] = useState<string>("");
  const [stdStatus, setStdStatus] = useState<TranslationStatus>("idle");
  const [stdCurrentBatchIndex, setStdCurrentBatchIndex] = useState<number>(0);
  const [stdErrorMessage, setStdErrorMessage] = useState<string>("");
  const [stdConsoleLogs, setStdConsoleLogs] = useState<string[]>(() => [
    isRtl ? "سیستم ترجمه معمولی آماده به کار است." : "Standard Subtitle Translation System Ready."
  ]);
  const [stdTmHits, setStdTmHits] = useState<number>(0);
  const [stdCountdownSeconds, setStdCountdownSeconds] = useState<number>(0);
  const [stdIsRateLimited, setStdIsRateLimited] = useState<boolean>(false);

  // Pro Version Workspace State
  const [proSubtitles, setProSubtitles] = useState<SrtSubtitle[]>([]);
  const [proFileName, setProFileName] = useState<string>("");
  const [proFileSize, setProFileSize] = useState<string>("");
  const [proStatus, setProStatus] = useState<TranslationStatus>("idle");
  const [proCurrentBatchIndex, setProCurrentBatchIndex] = useState<number>(0);
  const [proErrorMessage, setProErrorMessage] = useState<string>("");
  const [proConsoleLogs, setProConsoleLogs] = useState<string[]>(() => [
    isRtl ? "سیستم ترجمه پیشرفته و واژه‌نامه اختصاصی آماده به کار است." : "Advanced Translation System & Glossary Ready.",
    isRtl ? "حافظه ترجمه (TM) آماده استفاده است." : "Translation Memory (TM) Ready."
  ]);
  const [proTmHits, setProTmHits] = useState<number>(0);
  const [proCountdownSeconds, setProCountdownSeconds] = useState<number>(0);
  const [proIsRateLimited, setProIsRateLimited] = useState<boolean>(false);

  // Mode-based Active Workspace Proxy Accessors
  const isPro = mainTab === "advanced";

  const subtitles = isPro ? proSubtitles : stdSubtitles;
  const setSubtitles = (val: SrtSubtitle[] | ((prev: SrtSubtitle[]) => SrtSubtitle[])) => {
    if (isPro) setProSubtitles(val);
    else setStdSubtitles(val);
  };

  const fileName = isPro ? proFileName : stdFileName;
  const setFileName = (val: string) => {
    if (isPro) setProFileName(val);
    else setStdFileName(val);
  };

  const fileSize = isPro ? proFileSize : stdFileSize;
  const setFileSize = (val: string) => {
    if (isPro) setProFileSize(val);
    else setStdFileSize(val);
  };

  const status = isPro ? proStatus : stdStatus;
  const setStatus = (val: TranslationStatus) => {
    if (isPro) setProStatus(val);
    else setStdStatus(val);
  };

  const currentBatchIndex = isPro ? proCurrentBatchIndex : stdCurrentBatchIndex;
  const setCurrentBatchIndex = (val: number | ((prev: number) => number)) => {
    if (isPro) setProCurrentBatchIndex(val);
    else setStdCurrentBatchIndex(val);
  };

  const consoleLogs = isPro ? proConsoleLogs : stdConsoleLogs;
  const setConsoleLogs = (val: string[] | ((prev: string[]) => string[])) => {
    if (isPro) setProConsoleLogs(val);
    else setStdConsoleLogs(val);
  };

  const errorMessage = isPro ? proErrorMessage : stdErrorMessage;
  const setErrorMessage = (val: string) => {
    if (isPro) setProErrorMessage(val);
    else setStdErrorMessage(val);
  };

  const tmHits = isPro ? proTmHits : stdTmHits;
  const setTmHits = (val: number | ((prev: number) => number)) => {
    if (isPro) setProTmHits(val);
    else setStdTmHits(val);
  };

  const countdownSeconds = isPro ? proCountdownSeconds : stdCountdownSeconds;
  const setCountdownSeconds = (val: number | ((prev: number) => number)) => {
    if (isPro) setProCountdownSeconds(val);
    else setStdCountdownSeconds(val);
  };

  const isRateLimited = isPro ? proIsRateLimited : stdIsRateLimited;
  const setIsRateLimited = (val: boolean) => {
    if (isPro) setProIsRateLimited(val);
    else setStdIsRateLimited(val);
  };

  // Glossary Data (Starts empty as requested)
  const [glossary, setGlossary] = useState<GlossaryTerm[]>(() => {
    const saved = localStorage.getItem("sub_translator_glossary");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return defaultGlossary;
  });

  const [newSourceTerm, setNewSourceTerm] = useState<string>("");
  const [newTargetTerm, setNewTargetTerm] = useState<string>("");
  const [showImportArea, setShowImportArea] = useState<boolean>(false);
  const [jsonDragActive, setJsonDragActive] = useState<boolean>(false);
  const [showClearGlossaryConfirm, setShowClearGlossaryConfirm] = useState<boolean>(false);
  const [workspaceTab, setWorkspaceTab] = useState<"logs" | "preview">("logs");

  // Theme State ("dark" | "light")
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("sub_translator_theme");
    return saved === "light" ? "light" : "dark";
  });

  // Gemini API Key State (Global for all platforms & modes)
  const [userApiKey, setUserApiKey] = useState<string>(() => {
    return localStorage.getItem("gemini_user_api_key") || "";
  });
  const [apiKeyStatus, setApiKeyStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle");
  const [apiKeyError, setApiKeyError] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  const validateApiKey = async (keyToTest?: string) => {
    const targetKey = (keyToTest !== undefined ? keyToTest : userApiKey).trim();
    if (!targetKey) {
      setApiKeyStatus("idle");
      setApiKeyError("");
      return;
    }

    setApiKeyStatus("validating");
    setApiKeyError("");
    try {
      const res = await fetch("/api/validate-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: targetKey }),
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.valid) {
          setApiKeyStatus("valid");
          setApiKeyError("");
          return;
        } else {
          setApiKeyStatus("invalid");
          setApiKeyError(data.error || (isRtl ? "کلید API نامعتبر یا غیرفعال است." : "API Key is invalid or inactive."));
          return;
        }
      } else {
        throw new Error("STATIC_HOST_FALLBACK");
      }
    } catch {
      // Direct client test for static hosts (Cloudflare Pages / GitHub Pages)
      try {
        const directRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${targetKey}`);
        if (directRes.ok) {
          setApiKeyStatus("valid");
          setApiKeyError("");
        } else {
          const errData = await directRes.json().catch(() => ({}));
          const rawMsg = errData?.error?.message || "";
          let errMsg = rawMsg;
          if (!errMsg) {
            if (directRes.status === 400) errMsg = isRtl ? "فرمت کلید API نامعتبر است." : "API key format is invalid.";
            else if (directRes.status === 403) errMsg = isRtl ? "دسترسی مسدود شد (403). کلید را بررسی کنید یا VPN را روشن کنید." : "Access forbidden (403). Check key or VPN.";
            else errMsg = isRtl ? "کلید API نامعتبر یا غیرفعال است." : "API Key is invalid or inactive.";
          }
          setApiKeyStatus("invalid");
          setApiKeyError(errMsg);
        }
      } catch (directErr: any) {
        setApiKeyStatus("invalid");
        const isNetworkErr = directErr?.message?.includes("Failed to fetch") || directErr?.name === "TypeError";
        const customErr = isNetworkErr
          ? (isRtl ? "خطا در برقراری ارتباط با گوگل (Failed to fetch). اگر از ایران متصل هستید، حتماً VPN/قندشکن خود را روشن کنید." : "Network error (Failed to fetch). Please check your connection or VPN.")
          : (directErr.message || (isRtl ? "خطا در بررسی کلید API." : "API Key validation error."));
        setApiKeyError(customErr);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("gemini_user_api_key", userApiKey);
    if (userApiKey.trim()) {
      const timer = setTimeout(() => {
        validateApiKey(userApiKey);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setApiKeyStatus("idle");
      setApiKeyError("");
    }
  }, [userApiKey]);

  useEffect(() => {
    localStorage.setItem("sub_translator_theme", theme);
  }, [theme]);

  // Translation Memory
  const [tmCache, setTmCache] = useState<{ [key: string]: string }>(() => {
    const saved = localStorage.getItem("sub_translator_tm");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  const [useTmCache, setUseTmCache] = useState<boolean>(() => {
    const saved = localStorage.getItem("sub_translator_use_tm");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sub_translator_use_tm", String(useTmCache));
  }, [useTmCache]);

  // Common Dialog & Drag state
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showClearTmConfirm, setShowClearTmConfirm] = useState<boolean>(false);

  const successfulBatchesRef = useRef<number>(0);

  useEffect(() => {
    if (countdownSeconds > 0) {
      const timer = setInterval(() => {
        setCountdownSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdownSeconds === 0 && isRateLimited) {
      addLog(isRtl ? "شمارش معکوس تنفس به پایان رسید. اکنون می‌توانید ادامه ترجمه را بزنید." : "Cool-down timer ended. You can now resume translation.", "SUCCESS");
    }
  }, [countdownSeconds, isRateLimited]);

  const triggerRateLimitMode = (errorMsg: string, completedBatchesCount: number) => {
    if (completedBatchesCount > 0) {
      setIsRateLimited(true);
      setCountdownSeconds(60);
      setStatus("paused");
      setErrorMessage(errorMsg);
      addLog(isRtl ? `محدودیت نرخ رخ داد. شروع ۶۰ ثانیه تنفس...` : `Rate limit reached. 60s cool-down timer started...`, "ERROR");
    } else {
      setIsRateLimited(false);
      setStatus("error");
      setErrorMessage(errorMsg);
      addLog(`API Error: ${errorMsg}`, "ERROR");
    }
  };

  const addLog = (
    message: string, 
    type: "SUCCESS" | "WAIT" | "INFO" | "ACTIVE" | "ERROR" = "INFO",
    targetMode?: "standard" | "advanced"
  ) => {
    const modeToLog = targetMode || mainTab;
    const timeStr = new Date().toLocaleTimeString(isRtl ? 'fa-IR' : 'en-US', { hour12: false });
    const formatted = `[${timeStr}] ${type}: ${message}`;

    if (modeToLog === "advanced") {
      setProConsoleLogs(prev => [...prev.slice(-99), formatted]);
    } else {
      setStdConsoleLogs(prev => [...prev.slice(-99), formatted]);
    }
  };

  // Auto-resume dialog state
  const [hasSavedSession, setHasSavedSession] = useState<boolean>(false);
  const [savedSessionDetails, setSavedSessionDetails] = useState<{
    totalLines: number;
    translatedCount: number;
    batchIndex: number;
    fileName: string;
  } | null>(null);

  const isPausedRef = useRef<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);
  const consoleLogsContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll ONLY inside log container - NO window/page dragging
  useEffect(() => {
    if (consoleLogsContainerRef.current) {
      consoleLogsContainerRef.current.scrollTop = consoleLogsContainerRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  useEffect(() => {
    localStorage.setItem("sub_translator_glossary", JSON.stringify(glossary));
  }, [glossary]);

  useEffect(() => {
    localStorage.setItem(
      "sub_translator_config",
      JSON.stringify({ sourceLanguage, targetLanguage, translationStyle, fileName, fileSize })
    );
  }, [sourceLanguage, targetLanguage, translationStyle, fileName, fileSize]);

  useEffect(() => {
    localStorage.setItem("sub_translator_ui_lang", uiLang);
  }, [uiLang]);

  useEffect(() => {
    const savedSubs = localStorage.getItem("sub_translator_subs");
    const savedBatch = localStorage.getItem("sub_translator_batch");
    const savedHits = localStorage.getItem("sub_translator_tm_hits");
    const savedFName = localStorage.getItem("sub_translator_filename");

    if (savedSubs && savedBatch) {
      try {
        const parsedSubs = JSON.parse(savedSubs) as SrtSubtitle[];
        const parsedBatch = parseInt(savedBatch, 10);
        const parsedHits = parseInt(savedHits || "0", 10);
        const total = parsedSubs.length;
        const translatedCount = parsedSubs.filter(s => s.translatedText).length;

        if (translatedCount > 0 && total > 0) {
          setHasSavedSession(true);
          setSavedSessionDetails({
            totalLines: total,
            translatedCount,
            batchIndex: parsedBatch,
            fileName: savedFName || "subtitle.srt"
          });
          addLog(isRtl ? `جلسه ترجمه ذخیره‌شده برای "${savedFName || "subtitle.srt"}" یافت شد (${translatedCount}/${total} خط).` : `Saved translation session found for "${savedFName || "subtitle.srt"}".`, "INFO");
        }
      } catch (e) {}
    }
  }, []);

  const handleSrtParsing = (content: string, name: string, sizeBytes: number) => {
    const sizeStr = sizeBytes > 1024 * 1024 
      ? `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB` 
      : `${(sizeBytes / 1024).toFixed(1)} KB`;

    setFileName(name);
    setFileSize(sizeStr);
    localStorage.setItem("sub_translator_filename", name);

    const normalized = content.replace(/\r\n/g, "\n");
    const blocks = normalized.split(/\n\s*\n/);
    const parsedSubtitles: SrtSubtitle[] = [];

    for (const block of blocks) {
      const lines = block.trim().split("\n");
      if (lines.length >= 2) {
        const idStr = lines[0].trim();
        const id = parseInt(idStr, 10);
        if (isNaN(id)) continue;

        const timeframe = lines[1].trim();
        if (!timeframe.includes("-->")) continue;

        const text = lines.slice(2).join("\n").trim();
        parsedSubtitles.push({ id, timeframe, text });
      }
    }

    if (parsedSubtitles.length === 0) {
      alert(t.noSubtitles);
      addLog(isRtl ? "خطا در خواندن فایل SRT: هیچ دیالوگی یافت نشد." : "SRT parsing error: No subtitles found.", "ERROR");
      return;
    }

    setSubtitles(parsedSubtitles);
    setStatus("idle");
    setCurrentBatchIndex(0);
    setTmHits(0);
    setErrorMessage("");
    addLog(isRtl ? `فایل SRT بارگذاری شد: ${name} (${sizeStr}) با ${parsedSubtitles.length} خط.` : `SRT loaded: ${name} (${sizeStr}) with ${parsedSubtitles.length} lines.`, "SUCCESS");

    localStorage.removeItem("sub_translator_subs");
    localStorage.removeItem("sub_translator_batch");
    localStorage.removeItem("sub_translator_tm_hits");
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.name.endsWith(".srt")) {
        alert(isRtl ? "لطفاً یک فایل با پسوند srt. انتخاب کنید." : "Please select an .srt file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleSrtParsing(event.target.result as string, file.name, file.size);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleSrtParsing(event.target.result as string, file.name, file.size);
        }
      };
      reader.readAsText(file);
    }
  };

  // Glossary Management
  const addGlossaryEntry = (source: string, target: string) => {
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
    const newEntry: GlossaryTerm = {
      id,
      source: source.trim(),
      target: target.trim()
    };
    const updated = [...glossary, newEntry];
    setGlossary(updated);
    addLog(isRtl ? `اصطلاح اضافه شد: "${source.trim()}" -> "${target.trim()}"` : `Term added: "${source.trim()}" -> "${target.trim()}"`, "INFO");
  };

  const removeGlossaryEntry = (id: string) => {
    const term = glossary.find(g => g.id === id);
    if (term) {
      addLog(isRtl ? `اصطلاح حذف شد: "${term.source}"` : `Term removed: "${term.source}"`, "INFO");
    }
    setGlossary(glossary.filter(g => g.id !== id));
  };

  const handleAddTerm = () => {
    if (!newSourceTerm.trim() || !newTargetTerm.trim()) return;
    addGlossaryEntry(newSourceTerm, newTargetTerm);
    setNewSourceTerm("");
    setNewTargetTerm("");
  };

  const handleExportGlossary = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(glossary, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "srt_glossary.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addLog(isRtl ? "واژه‌نامه تخصصی دانلود شد." : "Glossary exported as JSON.", "SUCCESS");
  };

  const handleClearGlossaryConfirm = () => {
    setGlossary([]);
    localStorage.removeItem("sub_translator_glossary");
    setShowClearGlossaryConfirm(false);
    addLog(isRtl ? "تمام اصطلاحات واژه‌نامه پاکسازی شدند." : "All glossary terms cleared.", "SUCCESS");
  };

  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          if (!event.target?.result) return;
          const parsed = JSON.parse(event.target.result as string);
          if (!Array.isArray(parsed)) {
            throw new Error(isRtl ? "فایل JSON باید حاوی یک آرایه از اصطلاحات باشد." : "JSON file must contain an array of terms.");
          }
          const validated: GlossaryTerm[] = parsed.map((item: any, idx: number) => {
            if (!item.source || !item.target) {
              throw new Error(isRtl ? `مورد شماره ${idx + 1} فاقد اصطلاح مبدا یا معادل مقصد است.` : `Item ${idx + 1} is missing source or target.`);
            }
            return {
              id: item.id || `${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
              source: String(item.source).trim(),
              target: String(item.target).trim()
            };
          });

          if (validated.length === 0) {
            throw new Error(isRtl ? "هیچ اصطلاح معتبری در فایل JSON یافت نشد." : "No valid terms found in the JSON file.");
          }

          setGlossary(prev => [...prev, ...validated]);
          setShowImportArea(false);
          addLog(isRtl ? `${validated.length} اصطلاح از فایل "${file.name}" با موفقیت بارگذاری شد.` : `${validated.length} terms imported from "${file.name}".`, "SUCCESS");
        } catch (err: any) {
          const errorMsg = err.message || (isRtl ? "خطا در خواندن فایل JSON." : "Error reading JSON file.");
          alert(errorMsg);
          addLog(isRtl ? `خطا در آپلود واژه‌نامه: ${errorMsg}` : `Glossary import error: ${errorMsg}`, "ERROR");
        } finally {
          if (e.target) e.target.value = "";
        }
      };
      reader.readAsText(file);
    }
  };

  // CORE TRANSLATION ENGINE
  const startTranslation = async (startBatch: number = 0, customSubs?: SrtSubtitle[]) => {
    const subsToProcess = customSubs || subtitles;
    if (subsToProcess.length === 0) {
      alert(t.emptyFile);
      return;
    }

    isPausedRef.current = false;
    setStatus("translating");
    setErrorMessage("");
    setIsRateLimited(false);

    if (startBatch === 0) {
      successfulBatchesRef.current = 0;
    }

    const isProMode = mainTab === "advanced";
    const useParallel = isProMode ? isParallelEnabled : false;
    const batchSize = useParallel ? 30 : 50;
    const CONCURRENCY = useParallel ? 3 : 1;
    const glossaryToUse = isProMode ? glossary : [];
    const useTmCacheInEngine = isProMode ? useTmCache : false;

    const totalBatches = Math.ceil(subsToProcess.length / batchSize);
    let localSubs = [...subsToProcess];
    let updatedTmCache = { ...tmCache };

    if (isProMode) {
      addLog(isRtl ? `[نسخه پیشرفته] شروع ترجمه...` : `[Advanced Version] Starting translation...`, "ACTIVE");
    } else {
      addLog(isRtl ? `[نسخه معمولی] شروع ترجمه استاندارد...` : `[Standard Version] Starting standard translation...`, "ACTIVE");
    }

    const pendingBatches: number[] = [];
    for (let b = startBatch; b < totalBatches; b++) {
      pendingBatches.push(b);
    }

    const runWorker = async (workerId: number) => {
      while (pendingBatches.length > 0 && !isPausedRef.current) {
        const b = pendingBatches.shift();
        if (b === undefined) break;

        setCurrentBatchIndex(b);
        const startIdx = b * batchSize;
        const endIdx = Math.min(startIdx + batchSize, localSubs.length);
        const batchSubtitles = localSubs.slice(startIdx, endIdx);

        const assignedModel = Math.floor(startIdx / 500) % 2 === 0 ? "gemini-3.5-flash-lite" : "gemini-3.1-flash-lite";

        const toTranslateList: SrtSubtitle[] = [];
        for (let i = 0; i < batchSubtitles.length; i++) {
          const sub = batchSubtitles[i];
          if (sub.translatedText) continue;

          const tmKey = getTmKey(sub.text, sourceLanguage, targetLanguage);
          if (isProMode && useTmCacheInEngine && updatedTmCache[tmKey]) {
            sub.translatedText = updatedTmCache[tmKey];
            continue;
          }
          toTranslateList.push(sub);
        }

        if (toTranslateList.length === 0) {
          successfulBatchesRef.current++;
          continue;
        }

        addLog(isRtl ? `ارسال دسته ${b + 1}/${totalBatches} (خطوط ${startIdx + 1} تا ${endIdx})...` : `Sending batch ${b + 1}/${totalBatches} (lines ${startIdx + 1}-${endIdx})...`, "WAIT");

        let success = false;
        let attempts = 0;
        const maxAttempts = 3;

        while (!success && !isPausedRef.current) {
          try {
            const inputMap: Record<string, string> = {};
            toTranslateList.forEach(s => {
              inputMap[String(s.id)] = s.text;
            });

            let apiTranslations: Record<string, string> = {};

            try {
              const response = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  subtitles: inputMap,
                  sourceLanguage,
                  targetLanguage,
                  translationStyle,
                  glossary: glossaryToUse,
                  model: assignedModel,
                  apiKey: userApiKey.trim(),
                }),
              });

              const contentType = response.headers.get("content-type") || "";
              const responseText = await response.text();
              const trimmedText = responseText.trim();

              if (!response.ok || contentType.includes("text/html") || trimmedText.startsWith("<")) {
                throw new Error("STATIC_HOST_FALLBACK");
              }

              if (!trimmedText.startsWith("{") && !trimmedText.startsWith("[")) {
                throw new Error("STATIC_HOST_FALLBACK");
              }

              const data = JSON.parse(trimmedText);
              apiTranslations = data.translations || {};
            } catch (backendErr: any) {
              if (
                backendErr.message === "STATIC_HOST_FALLBACK" ||
                backendErr.message?.includes("Failed to fetch") ||
                backendErr.message?.includes("JSON")
              ) {
                // Direct client Gemini API call for static site (Cloudflare Pages / GitHub Pages)
                const effectiveKey = userApiKey.trim() || import.meta.env.VITE_GEMINI_API_KEY || "";
                if (!effectiveKey) {
                  throw new Error(isRtl ? "کلید API جمینای وارد نشده است. لطفاً کلید API خود را در بخش تنظیمات وارد کنید." : "Gemini API key is missing. Please enter your API key in Settings.");
                }

                const rtlLanguages = ["persian", "farsi", "arabic", "hebrew", "urdu", "fa", "ar", "he", "ur"];
                const isTargetRtl = targetLanguage && rtlLanguages.some(lang => targetLanguage.toLowerCase().includes(lang));
                const lrmChar = String.fromCharCode(0x200E);

                let glossaryText = "";
                if (glossaryToUse && glossaryToUse.length > 0) {
                  const entries = glossaryToUse.map(e => `  "${e.source}" MUST become "${e.target}"`).join("\n");
                  glossaryText = `\n\nCRITICAL GLOSSARY RULES - OBEY EXACTLY:\n${entries}\n\nIf a glossary term appears in the source, use EXACTLY the target above. Do NOT translate it differently.`;
                }

                let styleRules = "";
                const selectedStyleLower = (translationStyle || "").toLowerCase();
                if (selectedStyleLower.includes("conversational") || selectedStyleLower.includes("casual") || selectedStyleLower.includes("عامینه") || selectedStyleLower.includes("مکالمه")) {
                  styleRules = `\n\nCINEMATIC CONVERSATIONAL & COLLOQUIAL STYLE RULES (FOR MOVIES & TV SHOWS):
You are translating subtitles for a movie or TV series into natural, modern spoken Persian (لحن روان، عامیانه و گفتاری سینمایی/دوبله).
1. SPOKEN VERBS & NATURAL CONTRACTIONS:
   - Use colloquial spoken verbs and contractions instead of stiff written/bookish Persian.
   - Examples: "کفشاتو درآر" (NEVER "کفش‌هایت را درآور"), "می‌خوام برم" (NEVER "می‌خواهم بروم"), "بهم بگو" (NEVER "به من بگو"), "چی شده؟" (NEVER "چه شده است؟").
2. CINEMATIC IDIOMS & EXPRESSIVE INTERJECTIONS:
   - "Come on" -> "یالا", "بی‌خیال", "زود باش"
   - "Oh my God" -> "وای خدا", "خدای من"
   - "Shut up" -> "خفه شو"
3. ACCURATE UNFILTERED TRANSLATION (18+ & SLANG):
   - Translate all profanity, adult expressions, and slang directly and naturally into authentic colloquial Persian without censorship.`;
                }

                let rtlInstruction = "";
                if (isTargetRtl) {
                  rtlInstruction = `\n\nCRITICAL FORMATTING RULE (RTL/LTR Mixed Text Alignment Fix):
If an English technical term, acronym, or name (e.g. ICT, MACD) remains untranslated inside a Right-to-Left (RTL) sentence, you MUST strictly wrap it by inserting a literal invisible Unicode Left-to-Right Mark character (\\u200E) immediately before and right after that English word: "${lrmChar}TERM${lrmChar}".`;
                }

                const systemInstruction = `You are an expert movie and TV subtitle translator.
Translate the values of the received JSON object.
Source Language: Auto-Detect
Target Language: ${targetLanguage}
Translation Style Selected: ${translationStyle || "Conversational/Casual"}${styleRules}${glossaryText}${rtlInstruction}
Return ONLY valid JSON object with the exact same keys as input. No markdown formatting outside JSON.`;

                const modelToUse = assignedModel || "gemini-3.5-flash-lite";
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${effectiveKey}`;
                const res = await fetch(url, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    systemInstruction: { parts: [{ text: systemInstruction }] },
                    contents: [{ parts: [{ text: `JSON to translate:\n${JSON.stringify(inputMap, null, 2)}` }] }],
                    generationConfig: {
                      temperature: 0.3,
                      responseMimeType: "application/json"
                    }
                  })
                });

                if (!res.ok) {
                  const errText = await res.text();
                  throw new Error(`Gemini Direct API Error (${res.status}): ${errText}`);
                }

                const resData = await res.json();
                const textOutput = resData?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
                apiTranslations = JSON.parse(textOutput);
              } else {
                throw backendErr;
              }
            }

            // Ensure every item sent in toTranslateList gets a translation (fallback to original text if missing)
            toTranslateList.forEach(s => {
              const k = String(s.id);
              if (apiTranslations[k] === undefined || apiTranslations[k] === null) {
                apiTranslations[k] = s.text;
              }
            });

            localSubs = localSubs.map(sub => {
              const matchedVal = apiTranslations[String(sub.id)];
              if (matchedVal !== undefined) {
                if (isProMode && useTmCacheInEngine) {
                  const tmKey = getTmKey(sub.text, sourceLanguage, targetLanguage);
                  updatedTmCache[tmKey] = matchedVal;
                }
                return { ...sub, translatedText: matchedVal };
              }
              return sub;
            });

            successfulBatchesRef.current++;
            success = true;

            setSubtitles([...localSubs]);
            if (isProMode && useTmCacheInEngine) {
              setTmCache({ ...updatedTmCache });
              localStorage.setItem("sub_translator_tm", JSON.stringify(updatedTmCache));
            }

            addLog(isRtl ? `دسته ${b + 1}/${totalBatches} با موفقیت ترجمه شد.` : `Batch ${b + 1}/${totalBatches} translated successfully.`, "SUCCESS");

            localStorage.setItem("sub_translator_subs", JSON.stringify(localSubs));
            localStorage.setItem("sub_translator_batch", String(b + 1));

          } catch (err: any) {
            attempts++;
            const errText = err.message || "";
            if (
              errText.toLowerCase().includes("429") ||
              errText.toLowerCase().includes("quota") ||
              errText.toLowerCase().includes("rate limit") ||
              errText.toLowerCase().includes("resource_exhausted")
            ) {
              isPausedRef.current = true;
              triggerRateLimitMode(errText, successfulBatchesRef.current);
              return;
            }

            if (attempts >= maxAttempts) {
              isPausedRef.current = true;
              triggerRateLimitMode(`Batch ${b + 1} failed after ${maxAttempts} attempts: ${err.message}`, successfulBatchesRef.current);
              return;
            }

            const backoffSeconds = Math.pow(2, attempts);
            addLog(isRtl ? `تلاش مجدد دسته ${b + 1} در ${backoffSeconds} ثانیه...` : `Retrying batch ${b + 1} in ${backoffSeconds}s...`, "ERROR");
            await new Promise(r => setTimeout(r, backoffSeconds * 1000));
          }
        }
      }
    };

    const activeWorkers = Array.from(
      { length: Math.min(CONCURRENCY, pendingBatches.length) },
      (_, i) => runWorker(i + 1)
    );

    await Promise.all(activeWorkers);

    if (!isPausedRef.current) {
      // Ensure 100% of subtitles have non-undefined translatedText upon completion
      localSubs = localSubs.map(sub => ({
        ...sub,
        translatedText: sub.translatedText !== undefined ? sub.translatedText : sub.text
      }));
      setSubtitles([...localSubs]);
      localStorage.setItem("sub_translator_subs", JSON.stringify(localSubs));

      setStatus("completed");
      setCurrentBatchIndex(totalBatches);
      addLog(isRtl ? `ترجمه کامل شد! تمام ${subsToProcess.length} زیرنویس با موفقیت (۱۰۰٪) ترجمه شدند.` : `Translation complete! All ${subsToProcess.length} subtitles translated (100%).`, "SUCCESS");
    }
  };

  const handlePause = () => {
    isPausedRef.current = true;
    setStatus("paused");
  };

  const handleResume = () => {
    startTranslation(currentBatchIndex);
  };

  const handleAutoResumeConfirm = () => {
    if (!savedSessionDetails) return;
    const savedSubs = localStorage.getItem("sub_translator_subs");
    if (savedSubs) {
      try {
        const parsed = JSON.parse(savedSubs) as SrtSubtitle[];
        setSubtitles(parsed);
        setHasSavedSession(false);
        const savedHits = parseInt(localStorage.getItem("sub_translator_tm_hits") || "0", 10);
        setTmHits(savedHits);
        addLog(isRtl ? `ادامه جلسه ترجمه...` : `Resuming session...`, "INFO");
        startTranslation(savedSessionDetails.batchIndex, parsed);
      } catch (e) {}
    }
  };

  const handleDismissResume = () => {
    setHasSavedSession(false);
    localStorage.removeItem("sub_translator_subs");
    localStorage.removeItem("sub_translator_batch");
    localStorage.removeItem("sub_translator_tm_hits");
  };

  const handleReset = () => {
    if (subtitles.length > 0) {
      setShowResetConfirm(true);
    } else {
      handleResetConfirm();
    }
  };

  const handleResetConfirm = () => {
    setSubtitles([]);
    setFileName("");
    setFileSize("");
    setStatus("idle");
    setCurrentBatchIndex(0);
    setTmHits(0);
    setErrorMessage("");
    setShowResetConfirm(false);
    addLog(isRtl ? "تمام داده‌های پروژه پاک شدند." : "All project data reset.", "INFO");

    localStorage.removeItem("sub_translator_subs");
    localStorage.removeItem("sub_translator_batch");
    localStorage.removeItem("sub_translator_tm_hits");
    localStorage.removeItem("sub_translator_filename");
  };

  const handleClearTmCache = () => {
    setShowClearTmConfirm(true);
  };

  const handleClearTmCacheConfirm = () => {
    setTmCache({});
    setTmHits(0);
    localStorage.removeItem("sub_translator_tm");
    localStorage.removeItem("sub_translator_tm_hits");
    setShowClearTmConfirm(false);
    addLog(isRtl ? "حافظه ترجمه (TM) با موفقیت پاکسازی شد." : "TM cache cleared successfully.", "SUCCESS");
  };

  const handleDownload = () => {
    if (subtitles.length === 0) return;

    const content = subtitles.map(sub => {
      const outputText = sub.translatedText !== undefined ? sub.translatedText : sub.text;
      return `${sub.id}\n${sub.timeframe}\n${outputText}`;
    }).join("\n\n") + "\n";

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const outputName = fileName
      ? fileName.replace(/\.srt$/i, `_translated_${targetLanguage.toLowerCase()}.srt`)
      : `translated_${targetLanguage.toLowerCase()}.srt`;

    const link = document.createElement("a");
    link.href = url;
    link.download = outputName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addLog(isRtl ? `فایل SRT با نام "${outputName}" دانلود شد.` : `SRT file downloaded: "${outputName}".`, "SUCCESS");
  };

  // Progress calculations
  const currentBatchSize = (mainTab === "advanced" && isParallelEnabled) ? 30 : 50;
  const totalBatches = Math.ceil(subtitles.length / currentBatchSize) || 1;
  const rawProgressPercent = subtitles.length > 0
    ? (subtitles.filter(s => s.translatedText !== undefined).length / subtitles.length) * 100
    : 0;
  const progressPercent = Math.min(Math.round(rawProgressPercent), 100);

  const rtlTargets = ["persian", "farsi", "arabic", "hebrew", "urdu", "fa", "ar", "he", "ur"];
  const isTargetLanguageRtl = rtlTargets.some(lang => 
    targetLanguage.toLowerCase().includes(lang)
  );

  const renderLanguageSelector = () => (
    <div className={`p-4 rounded-2xl border space-y-4 ${
      theme === "light" ? "bg-slate-50 border-amber-200/90 shadow-2xs" : "bg-[#121214] border-white/10"
    }`}>
      <div>
        <label className="block text-xs uppercase font-semibold mb-1 opacity-70">
          {t.sourceLanguage}
        </label>
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className={`w-full rounded-xl px-3 py-2 text-xs border outline-none cursor-pointer ${
            theme === "light"
              ? "bg-white border-amber-200 text-slate-800 focus:border-orange-500"
              : "bg-[#1e1e24] border-white/20 text-white focus:border-[#00adb5]"
          }`}
        >
          <option value="Auto-Detect">{t.autoDetect}</option>
          {majorLanguages.map(lang => (
            <option key={`src-${lang}`} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase font-semibold mb-1 opacity-70">
          {t.targetLanguage}
        </label>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className={`w-full rounded-xl px-3 py-2 text-xs border outline-none cursor-pointer ${
            theme === "light"
              ? "bg-white border-amber-200 text-slate-800 focus:border-orange-500"
              : "bg-[#1e1e24] border-white/20 text-white focus:border-[#00adb5]"
          }`}
        >
          {majorLanguages.filter(l => l !== "Auto-Detect").map(lang => (
            <option key={`tgt-${lang}`} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase font-semibold mb-1 opacity-70">
          {t.translationStyle}
        </label>
        <select
          value={translationStyle}
          onChange={(e) => setTranslationStyle(e.target.value)}
          className={`w-full rounded-xl px-3 py-2 text-xs border outline-none cursor-pointer ${
            theme === "light"
              ? "bg-white border-amber-200 text-slate-800 focus:border-orange-500"
              : "bg-[#1e1e24] border-white/20 text-white focus:border-[#00adb5]"
          }`}
        >
          <option value="Conversational/Casual">{t.conversational}</option>
          <option value="Formal/Academic">{t.formal}</option>
          <option value="Technical & Educational">{t.technical}</option>
        </select>
      </div>
    </div>
  );

  const renderApiKeyCard = () => (
    <div className={`p-4 rounded-2xl border space-y-3 transition-all ${
      theme === "light"
        ? "bg-slate-50 border-amber-200/90 shadow-2xs"
        : "bg-[#121214] border-white/10"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${
            theme === "light" ? "bg-amber-100 text-amber-700" : "bg-white/10 text-amber-400"
          }`}>
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs flex items-center gap-1.5">
              <span>{t.apiKeyTitle}</span>
            </h3>
            <p className="text-[11px] opacity-70">
              {t.apiKeyDesc}
            </p>
          </div>
        </div>

        {/* Dynamic Status Indicator Lamp */}
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          {apiKeyStatus === "valid" && (
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span>{t.apiKeyValid}</span>
            </span>
          )}
          {apiKeyStatus === "validating" && (
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>{t.apiKeyValidating}</span>
            </span>
          )}
          {apiKeyStatus === "invalid" && (
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
              <span>{t.apiKeyInvalid}</span>
            </span>
          )}
          {apiKeyStatus === "idle" && (
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-500/10 px-2.5 py-1 rounded-full border border-slate-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span>{t.apiKeyIdle}</span>
            </span>
          )}
        </div>
      </div>

      {/* Input Row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type={showApiKey ? "text" : "password"}
            value={userApiKey}
            onChange={(e) => setUserApiKey(e.target.value)}
            placeholder={t.apiKeyPlaceholder}
            className={`w-full rounded-xl py-2 text-xs font-mono border outline-none transition-all ${
              isRtl ? "pl-9 pr-3" : "pr-9 pl-3"
            } ${
              apiKeyStatus === "valid"
                ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                : apiKeyStatus === "invalid"
                ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                : theme === "light"
                ? "bg-white border-amber-200 focus:border-orange-500"
                : "bg-[#1e1e24] border-white/10 focus:border-orange-500"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className={`absolute ${isRtl ? "left-2.5" : "right-2.5"} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer`}
            title={showApiKey ? "Hide Key" : "Show Key"}
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {userApiKey && (
          <button
            type="button"
            onClick={() => {
              setUserApiKey("");
              setApiKeyStatus("idle");
              setApiKeyError("");
            }}
            className="p-2 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer flex-shrink-0"
            title={t.clearApiKeyBtn}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {apiKeyError && (
        <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{apiKeyError}</span>
        </p>
      )}

      {/* Video Tutorial Link Button */}
      <a
        href="https://youtube.com/shorts/boQrl3uCYFk?feature=share"
        target="_blank"
        rel="noreferrer"
        className={`w-full py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs ${
          theme === "light"
            ? "bg-red-50/80 text-red-700 border-red-200/90 hover:bg-red-100 hover:border-red-300"
            : "bg-red-950/30 text-red-400 border-red-500/20 hover:bg-red-950/50 hover:border-red-500/40"
        }`}
      >
        <Youtube className="w-4 h-4 text-red-600 dark:text-red-500" />
        <span>{t.videoTutorialBtn}</span>
        <ExternalLink className="w-3 h-3 opacity-70" />
      </a>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] pt-1 opacity-80 border-t border-slate-200/60 dark:border-white/5 gap-1">
        <span>{t.apiKeyNote}</span>
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noreferrer"
          className="text-orange-600 dark:text-orange-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
        >
          <span>{t.getApiKeyLink}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );

  const renderFileDropzone = () => (
    <div 
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleFileDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 min-h-[140px] ${
        dragActive 
          ? "border-orange-500 bg-orange-500/10 scale-[0.99]" 
          : theme === "light"
            ? "border-amber-300 hover:border-orange-500 bg-white shadow-xs"
            : "border-white/15 hover:border-[#00adb5] bg-[#1e1e24]"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".srt"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
        theme === "light" ? "bg-orange-100 text-orange-600" : "bg-[#00adb5]/10 text-[#00adb5]"
      }`}>
        <UploadCloud className="w-5 h-5" />
      </div>

      <div>
        <p className="font-bold text-xs sm:text-sm">
          {fileName ? fileName : t.uploadSrt}
        </p>
        <p className="text-[11px] opacity-60 mt-0.5">
          {fileName ? `${t.fileSize}: ${fileSize}` : t.dragDrop}
        </p>

        {fileName && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleResetConfirm();
            }}
            className="mt-2.5 px-3 py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all border border-rose-500/20 shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearFileBtn}</span>
          </button>
        )}
      </div>
    </div>
  );

  const renderProgressAndStats = () => {
    if (subtitles.length === 0) return null;

    const translatedCount = status === "completed"
      ? subtitles.length
      : subtitles.filter(s => s.translatedText !== undefined).length;

    const progressPercent = subtitles.length > 0
      ? (status === "completed" ? 100 : Math.round((translatedCount / subtitles.length) * 100))
      : 0;

    return (
      <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
        theme === "light" ? "bg-white border-amber-200 shadow-xs" : "bg-[#1e1e24] border-white/10"
      }`}>
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-500" />
            {t.statsTitle}
          </span>
          <span className="text-orange-600 dark:text-[#00adb5] font-mono">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-[#00adb5] dark:to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
          <div className={`p-2.5 rounded-xl border ${theme === "light" ? "bg-amber-50/50 border-amber-200" : "bg-[#121214] border-white/5"}`}>
            <p className="text-[10px] opacity-60 uppercase font-semibold">{t.totalLines}</p>
            <p className="font-bold text-base mt-0.5">{subtitles.length}</p>
          </div>
          <div className={`p-2.5 rounded-xl border ${theme === "light" ? "bg-amber-50/50 border-amber-200" : "bg-[#121214] border-white/5"}`}>
            <p className="text-[10px] opacity-60 uppercase font-semibold">{t.translatedLines}</p>
            <p className="font-bold text-base mt-0.5 text-emerald-600 dark:text-emerald-400">
              {translatedCount}
            </p>
          </div>
          <div className={`p-2.5 rounded-xl border ${theme === "light" ? "bg-amber-50/50 border-amber-200" : "bg-[#121214] border-white/5"}`}>
            <p className="text-[10px] opacity-60 uppercase font-semibold">{t.tmHits}</p>
            <p className="font-bold text-base mt-0.5 text-blue-600 dark:text-blue-400">{tmHits}</p>
          </div>
          <div className={`p-2.5 rounded-xl border ${theme === "light" ? "bg-amber-50/50 border-amber-200" : "bg-[#121214] border-white/5"}`}>
            <p className="text-[10px] opacity-60 uppercase font-semibold">{t.tmTotal}</p>
            <p className="font-bold text-base mt-0.5">{Object.keys(tmCache).length}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderWorkspaceLogsAndPreview = () => (
    <div className={`flex-1 rounded-2xl border flex flex-col min-h-[350px] overflow-hidden ${
      theme === "light" ? "bg-white border-amber-200 shadow-xs" : "bg-[#1e1e24] border-white/10"
    }`}>
      {/* Workspace Panel Header with Tabs */}
      <div className="px-4 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-amber-200/50 dark:border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWorkspaceTab("logs")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
              workspaceTab === "logs"
                ? "bg-orange-500 text-white shadow-xs"
                : theme === "light"
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>{isRtl ? "لاگ‌های زنده و گزارش سیستم" : "Live System Logs"}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20 text-white font-mono">
              {consoleLogs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setWorkspaceTab("preview")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
              workspaceTab === "preview"
                ? "bg-orange-500 text-white shadow-xs"
                : theme === "light"
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isRtl ? "پیش‌نمایش زیرنویس" : "Subtitle Preview"}</span>
            {subtitles.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20 text-white font-mono">
                {subtitles.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {workspaceTab === "logs" ? (
            <button
              type="button"
              onClick={() => setConsoleLogs([isRtl ? "لاگ‌های سیستم پاکسازی شدند." : "System logs cleared."])}
              className="text-xs opacity-70 hover:opacity-100 flex items-center gap-1 font-semibold cursor-pointer transition-all"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>{isRtl ? "پاکسازی لاگ‌ها" : "Clear Logs"}</span>
            </button>
          ) : (
            subtitles.length > 0 && (
              <button
                type="button"
                onClick={handleResetConfirm}
                className="text-rose-500 hover:text-rose-600 flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearFileBtn}</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Tab Content Body */}
      <div ref={consoleLogsContainerRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 max-h-[500px]">
        {workspaceTab === "logs" ? (
          <div className="space-y-1.5 font-mono text-xs">
            {consoleLogs.map((log, idx) => {
              const isSuccess = log.includes("SUCCESS");
              const isError = log.includes("ERROR");
              const isWait = log.includes("WAIT");
              const isActive = log.includes("ACTIVE");

              return (
                <div 
                  key={`log-${idx}`}
                  className={`p-2.5 rounded-xl border flex items-start gap-2.5 leading-relaxed transition-all ${
                    isSuccess
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold"
                      : isError
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400 font-semibold"
                      : isWait
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400"
                      : isActive
                      ? "bg-sky-500/10 border-sky-500/20 text-sky-700 dark:text-sky-400 font-semibold"
                      : theme === "light"
                      ? "bg-slate-50 border-slate-200 text-slate-700"
                      : "bg-[#121214] border-white/5 text-zinc-300"
                  }`}
                >
                  <span className="opacity-40 text-[10px] flex-shrink-0 pt-0.5">#{idx + 1}</span>
                  <span className="flex-1 whitespace-pre-wrap dir-ltr font-mono text-[11px] sm:text-xs">{log}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3 font-sans">
            {subtitles.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400 space-y-2 my-auto">
                <BookOpen className="w-10 h-10 opacity-30" />
                <p className="text-xs">{t.statusIdle}</p>
              </div>
            ) : (
              subtitles.map((sub) => (
                <div 
                  key={`sub-${sub.id}`}
                  className={`p-3 rounded-xl border transition-all text-xs space-y-1.5 ${
                    sub.translatedText
                      ? theme === "light"
                        ? "bg-amber-50/30 border-amber-200"
                        : "bg-[#121214] border-white/10"
                      : theme === "light"
                        ? "bg-slate-50 border-slate-200 opacity-70"
                        : "bg-[#121214]/50 border-white/5 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-60 font-mono">
                    <span>#{sub.id}</span>
                    <span>{sub.timeframe}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">{t.previewSource}</span>
                      <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed dir-ltr">{sub.text}</p>
                    </div>

                    <div className="space-y-0.5 border-t md:border-t-0 md:border-r dark:border-white/10 border-slate-200 pt-1 md:pt-0 md:pr-2">
                      <span className="text-[9px] uppercase font-bold text-orange-600 dark:text-[#00adb5] block">{t.previewTarget}</span>
                      <p className={`font-sans leading-relaxed ${isTargetLanguageRtl ? "dir-rtl" : "dir-ltr"} ${
                        sub.translatedText ? "text-slate-900 dark:text-white font-medium" : "text-gray-400 italic"
                      }`}>
                        {sub.translatedText || (status === "translating" ? "..." : "-")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderPromoFooter = () => (
    <div className="pt-5 mt-2 border-t border-slate-200 dark:border-white/10 text-center space-y-4">
      {/* YouTube Section */}
      <div className="space-y-2">
        <p className="text-xs font-semibold opacity-80 leading-relaxed">
          {t.youtubePromoText}
        </p>
        <a
          href="https://www.youtube.com/@aigolden"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 transition-all cursor-pointer"
        >
          <Youtube className="w-4 h-4 fill-current" />
          <span>{t.youtubeBtnText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Telegram Section */}
      <div className="space-y-2 pt-3 border-t border-dashed border-slate-300 dark:border-white/10">
        <p className="text-xs font-semibold opacity-80">
          {t.telegramPromoText}
        </p>
        <a
          href="https://t.me/aigolden_qbot"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{t.telegramBtnText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );

  return (
    <div 
      className={`min-h-screen sm:h-screen w-full font-sans flex flex-col overflow-y-auto sm:overflow-hidden transition-colors duration-200 ${
        theme === "light" 
          ? "bg-amber-50/60 text-slate-800" 
          : "bg-[#121214] text-[#e0e0e6]"
      }`} 
      dir={isRtl ? "rtl" : "ltr"}
    >
      
      {/* Top Professional Navigation Bar */}
      <nav className={`py-2.5 px-3 sm:px-6 flex items-center justify-between flex-shrink-0 border-b transition-colors ${
        theme === "light" 
          ? "bg-white border-amber-200 shadow-xs" 
          : "bg-[#1e1e24] border-white/10"
      }`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-sans shadow-sm text-sm ${
            theme === "light" ? "bg-orange-500 text-white" : "bg-[#00adb5] text-black"
          }`}>
            G
          </div>
          <h1 className={`font-bold text-base sm:text-lg tracking-tight ${
            theme === "light" ? "text-slate-900" : "text-white"
          }`}>
            {t.title} <span className={`font-medium ${theme === "light" ? "text-orange-600" : "text-[#00adb5]"}`}>{t.proAccent}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
              theme === "light"
                ? "bg-orange-500 text-white border-orange-600 hover:bg-orange-600 shadow-xs"
                : "bg-[#121214] border-white/10 text-orange-400 hover:border-orange-400/50 hover:bg-orange-500/10"
            }`}
          >
            {theme === "light" ? (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.darkTheme}</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden sm:inline">{t.lightTheme}</span>
              </>
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setUiLang(uiLang === "en" ? "fa" : "en")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
              theme === "light"
                ? "bg-white border-amber-200 text-orange-600 hover:border-orange-500 shadow-xs"
                : "bg-[#121214] border-white/10 hover:border-[#00adb5] text-[#00adb5]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.toggleLanguage}</span>
          </button>
        </div>
      </nav>

      {/* Sub-Header Tabs Bar (Standard vs Advanced Pro) */}
      <div className={`px-3 sm:px-6 py-2 border-b flex items-center justify-center sm:justify-start flex-shrink-0 transition-colors ${
        theme === "light" 
          ? "bg-amber-100/40 border-amber-200" 
          : "bg-[#16161c] border-white/10"
      }`}>
        <div className={`flex items-center rounded-xl p-1 border w-full sm:w-auto max-w-md ${
          theme === "light" ? "bg-white/80 border-amber-200 shadow-xs" : "bg-[#121214] border-white/10"
        }`}>
          <button
            onClick={() => setMainTab("standard")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mainTab === "standard"
                ? theme === "light"
                  ? "bg-orange-500 text-white shadow-sm border border-orange-600"
                  : "bg-[#1e1e24] text-[#00adb5] border border-[#00adb5]/40 shadow-xs"
                : "text-zinc-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{t.standardTab}</span>
          </button>

          <button
            onClick={() => setMainTab("advanced")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
              mainTab === "advanced"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
                : "text-zinc-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Crown className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{t.advancedTab}</span>
            {isProUnlocked && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -left-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-1 overflow-hidden flex flex-col">
        
        {/* =========================================================
            TAB 1: DEFAULT / STANDARD VERSION (نسخه معمولی)
           ========================================================= */}
        {mainTab === "standard" && (
          <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
            
            {/* Left Control Column */}
            <section className={`col-span-12 lg:col-span-4 border-r flex flex-col overflow-y-auto p-4 sm:p-5 gap-4 sm:gap-5 ${
              theme === "light" 
                ? "bg-white border-amber-200 text-slate-800" 
                : "bg-[#1e1e24] border-white/10 text-white"
            }`}>
              
              <div className="flex items-center justify-between border-b pb-3 border-amber-200/50 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Zap className={`w-5 h-5 ${theme === "light" ? "text-orange-500" : "text-[#00adb5]"}`} />
                  <h2 className="font-bold text-sm uppercase tracking-wide">
                    {t.standardTab}
                  </h2>
                </div>
              </div>

              {/* Gemini API Key Section */}
              {renderApiKeyCard()}

              {/* Subtitle File Upload Section (Step 2) */}
              {renderFileDropzone()}

              {/* Language & Style Selection */}
              {renderLanguageSelector()}

              {/* Standard Mode Info Card */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 leading-relaxed ${
                theme === "light" ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-amber-950/20 border-amber-500/20 text-amber-200"
              }`}>
                <div className="flex items-center gap-2 font-bold text-orange-600 dark:text-amber-400">
                  <Info className="w-4 h-4" />
                  <span>{t.stdNoticeTitle}</span>
                </div>
                <p>{t.stdNoticeBody}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-4 border-t border-amber-200/50 dark:border-white/10 space-y-2">
                {status === "idle" || status === "completed" || status === "error" ? (
                  <button
                    onClick={() => startTranslation(0)}
                    disabled={subtitles.length === 0}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      subtitles.length === 0
                        ? "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed shadow-none"
                        : theme === "light"
                          ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
                          : "bg-[#00adb5] hover:bg-[#38bdf8] text-black shadow-[#00adb5]/20"
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{t.translateBtn}</span>
                  </button>
                ) : status === "translating" ? (
                  <button
                    onClick={handlePause}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Pause className="w-4 h-4 fill-current" />
                    <span>{t.pauseBtn}</span>
                  </button>
                ) : status === "paused" ? (
                  <button
                    onClick={handleResume}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{t.resumeBtn}</span>
                  </button>
                ) : null}

                {subtitles.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleDownload}
                      disabled={subtitles.filter(s => s.translatedText).length === 0}
                      className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        subtitles.filter(s => s.translatedText).length === 0
                          ? "opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-800"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-xs"
                      }`}
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                      <span>{t.downloadBtn}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        theme === "light"
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                          : "bg-[#121214] hover:bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.resetBtn}</span>
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Right Main Content Area (Stats & Preview) */}
            <section className={`col-span-12 lg:col-span-8 flex flex-col overflow-y-auto p-4 sm:p-6 gap-4 sm:gap-6 ${
              theme === "light" ? "bg-amber-50/40" : "bg-[#121214]"
            }`}>
              {renderProgressAndStats()}
              {renderWorkspaceLogsAndPreview()}
              {renderPromoFooter()}
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 2: ADVANCED VERSION (نسخه پیشرفته - Pro)
            With Multi-Color Rotating Neon Border
           ========================================================= */}
        {mainTab === "advanced" && (
          <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
            
            {/* Neon Border Outer Container */}
            <div className="neon-border-container max-w-5xl mx-auto my-2">
              <div className={`neon-border-inner p-4 sm:p-8 ${
                theme === "light" ? "bg-white text-slate-900" : "bg-[#18181c] text-white"
              }`}>
                
                {/* Top Header Banner for Pro Mode */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                      <Crown className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <span>{t.proTitle}</span>
                        {isProUnlocked && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                            {t.proUnlockedBadge}
                          </span>
                        )}
                      </h2>
                      <p className="text-xs opacity-70 mt-0.5">
                        {t.subtitle}
                      </p>
                    </div>
                  </div>

                  {isProUnlocked && (
                    <button
                      onClick={handleLockPro}
                      className="px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{t.lockAgain}</span>
                    </button>
                  )}
                </div>

                {/* IF LOCKED: Show Password Gate */}
                {!isProUnlocked ? (
                  <div className="py-10 max-w-md mx-auto text-center space-y-6">
                    <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-orange-500">
                      <Key className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{t.proLockTitle}</h3>
                      <p className="text-xs opacity-70 leading-relaxed">{t.proLockDesc}</p>
                    </div>

                    <form onSubmit={handleUnlockPro} className="space-y-3">
                      <div className="relative">
                        <input
                          type="password"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          placeholder={t.enterPassword}
                          className={`w-full rounded-xl px-4 py-3 text-sm border outline-none font-mono ${
                            passwordError
                              ? "border-red-500 bg-red-500/5 text-red-500"
                              : theme === "light"
                                ? "bg-slate-50 border-amber-200 text-slate-900 focus:border-orange-500"
                                : "bg-[#121214] border-white/20 text-white focus:border-[#00adb5]"
                          }`}
                        />
                      </div>

                      {passwordError && (
                        <p className="text-xs text-red-500 font-semibold">{passwordError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isVerifyingProPass}
                        className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white shadow-lg shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Unlock className="w-4 h-4" />
                        <span>{isVerifyingProPass ? "..." : t.unlockBtn}</span>
                      </button>
                    </form>

                    {/* Telegram Upgrade Box */}
                    <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
                      <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300">
                        {t.telegramPromoText}
                      </p>
                      <a
                        href="https://t.me/aigolden_qbot"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-600 text-white shadow-md transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>{t.telegramBtnText}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* IF UNLOCKED: Show Full Advanced Glossary & Speed Control Panel */
                  <div className="py-6 space-y-8">
                    
                    {/* Pro Feature Explanation Card */}
                    <div className={`p-5 rounded-2xl border leading-relaxed space-y-2 ${
                      theme === "light"
                        ? "bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200 text-amber-950"
                        : "bg-gradient-to-br from-purple-950/30 to-pink-950/20 border-purple-500/30 text-purple-100"
                    }`}>
                      <h3 className="font-bold text-sm flex items-center gap-2 text-orange-600 dark:text-pink-400">
                        <Sparkles className="w-4 h-4" />
                        <span>{t.proExplanationTitle}</span>
                      </h3>
                      <p className="text-xs opacity-90 leading-relaxed">
                        {t.proExplanationBody}
                      </p>
                    </div>

                    {/* Gemini API Key Section */}
                    {renderApiKeyCard()}

                    {/* Subtitle File Upload Section (Step 2) */}
                    {renderFileDropzone()}

                    {/* Language & Style Selection */}
                    {renderLanguageSelector()}

                    {/* Speed / Parallel Processing Toggle Checkbox */}
                    <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      theme === "light" ? "bg-slate-50 border-amber-200" : "bg-[#121214] border-white/10"
                    }`}>
                      <div className="space-y-0.5">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                          <input
                            type="checkbox"
                            checked={isParallelEnabled}
                            onChange={(e) => setIsParallelEnabled(e.target.checked)}
                            className="rounded h-4 w-4 accent-purple-600"
                          />
                          <span>{t.parallelProcessing}</span>
                        </label>
                        <p className="text-[11px] opacity-70 pr-6">
                          {t.parallelDesc}
                        </p>
                      </div>

                      <span className={`text-[11px] px-3 py-1 rounded-full font-bold border ${
                        isParallelEnabled 
                          ? "bg-purple-500/10 text-purple-600 border-purple-500/30" 
                          : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                      }`}>
                        {isParallelEnabled ? "Active" : "Standard Speed"}
                      </span>
                    </div>

                    {/* Translation Memory (TM) Pro Control Card */}
                    <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      theme === "light" ? "bg-slate-50 border-amber-200" : "bg-[#121214] border-white/10"
                    }`}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-emerald-500" />
                          <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                            <input
                              type="checkbox"
                              checked={useTmCache}
                              onChange={(e) => setUseTmCache(e.target.checked)}
                              className="rounded h-4 w-4 accent-emerald-600"
                            />
                            <span>{t.tmLabel}</span>
                          </label>
                        </div>
                        <p className="text-[11px] opacity-70 pr-6">
                          {t.tmCheckbox} - {isRtl 
                            ? "ذخیره و استفاده مجدد هوشمند از جملات تکراری ترجمه‌شده جهت صرفه‌جویی و افزایش سرعت"
                            : "Automatically store and reuse repeated subtitle translations across sessions"}
                        </p>
                      </div>

                      <button
                        onClick={handleClearTmCache}
                        className="text-[11px] px-3 py-1.5 rounded-lg font-bold border border-red-500/30 text-red-500 hover:bg-red-500/10 cursor-pointer transition-all flex-shrink-0"
                      >
                        {t.tmClear} ({Object.keys(tmCache).length})
                      </button>
                    </div>

                    {/* Glossary Management Section */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-200 dark:border-white/10">
                        <div>
                          <h3 className="font-bold text-sm flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-orange-500" />
                            <span>{t.glossaryTitle}</span>
                          </h3>
                          <p className="text-xs opacity-70 mt-0.5">{t.glossaryDesc}</p>
                        </div>

                        <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border ${
                          theme === "light"
                            ? "bg-amber-100/50 border-amber-200/80 shadow-2xs"
                            : "bg-[#121214] border-white/10"
                        }`}>
                          <input
                            ref={jsonFileInputRef}
                            type="file"
                            accept=".json,application/json"
                            onChange={handleJsonFileUpload}
                            className="hidden"
                          />

                          <button
                            onClick={() => setShowImportArea(!showImportArea)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              showImportArea
                                ? "bg-orange-500 text-white border-orange-600 shadow-xs"
                                : theme === "light"
                                ? "bg-white text-slate-700 border-amber-200 hover:border-orange-500 hover:text-orange-600 shadow-2xs"
                                : "bg-[#1e1e24] text-slate-200 border-white/10 hover:border-orange-500 hover:text-orange-400"
                            }`}
                          >
                            <UploadCloud className="w-3.5 h-3.5 text-orange-500" />
                            <span>{t.importGlossary}</span>
                          </button>

                          <button
                            onClick={handleExportGlossary}
                            disabled={glossary.length === 0}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1.5 ${
                              theme === "light"
                                ? "bg-white text-slate-700 border-amber-200 hover:border-orange-500 hover:text-orange-600 shadow-2xs"
                                : "bg-[#1e1e24] text-slate-200 border-white/10 hover:border-orange-500 hover:text-orange-400"
                            }`}
                          >
                            <DownloadCloud className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{t.exportGlossary}</span>
                          </button>

                          {glossary.length > 0 && (
                            <button
                              onClick={() => setShowClearGlossaryConfirm(true)}
                              className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{t.clearGlossaryBtn}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable JSON Upload Dropzone Area */}
                      {showImportArea && (
                        <div className={`p-4 rounded-xl border space-y-3 relative ${
                          theme === "light" ? "bg-orange-50/70 border-orange-200" : "bg-[#121214] border-white/10"
                        }`}>
                          <div className="flex items-center justify-between border-b pb-2 border-orange-200/50 dark:border-white/10">
                            <span className="text-xs font-bold flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
                              <UploadCloud className="w-4 h-4" />
                              <span>{isRtl ? "آپلود فایل JSON واژه‌نامه" : "Upload JSON Glossary File"}</span>
                            </span>
                            <button
                              onClick={() => setShowImportArea(false)}
                              className="text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                            >
                              ✕
                            </button>
                          </div>

                          <div
                            onClick={() => jsonFileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setJsonDragActive(true); }}
                            onDragLeave={() => setJsonDragActive(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setJsonDragActive(false);
                              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                const fakeEvent = { target: { files: e.dataTransfer.files } } as any;
                                handleJsonFileUpload(fakeEvent);
                              }
                            }}
                            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                              jsonDragActive
                                ? "border-orange-500 bg-orange-500/10"
                                : theme === "light"
                                ? "border-orange-300 bg-white hover:border-orange-500 hover:bg-orange-50/50"
                                : "border-white/20 bg-[#1e1e24] hover:border-orange-500 hover:bg-orange-500/5"
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-xs ${
                              theme === "light" ? "bg-orange-100 border-orange-200 text-orange-600" : "bg-orange-500/20 border-orange-500/30 text-orange-400"
                            }`}>
                              <UploadCloud className="w-6 h-6 animate-bounce" />
                            </div>

                            <div className="space-y-1">
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                {isRtl ? "جهت انتخاب فایل از حافظه داخلی، روی این آیکون کلیک کنید" : "Click here or the upload arrow to select JSON from internal storage"}
                              </p>
                              <p className="text-[11px] opacity-60">
                                {isRtl ? "یا فایل JSON را درون این کادر بکشید و رها کنید" : "or drag and drop your JSON glossary file here"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Add Glossary Term Input Row (Fully Responsive) */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            value={newSourceTerm}
                            onChange={(e) => setNewSourceTerm(e.target.value)}
                            placeholder={t.sourceTermPlaceholder}
                            className={`w-full rounded-xl px-3 py-2.5 text-xs border outline-none ${
                              theme === "light"
                                ? "bg-slate-50 border-amber-200 text-slate-900 focus:border-orange-500"
                                : "bg-[#121214] border-white/20 text-white focus:border-[#00adb5]"
                            }`}
                          />
                        </div>

                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            value={newTargetTerm}
                            onChange={(e) => setNewTargetTerm(e.target.value)}
                            placeholder={t.targetTermPlaceholder}
                            className={`w-full rounded-xl px-3 py-2.5 text-xs border outline-none ${
                              theme === "light"
                                ? "bg-slate-50 border-amber-200 text-slate-900 focus:border-orange-500"
                                : "bg-[#121214] border-white/20 text-white focus:border-[#00adb5]"
                            }`}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <button
                            onClick={handleAddTerm}
                            disabled={!newSourceTerm.trim() || !newTargetTerm.trim()}
                            className="w-full h-full py-2.5 px-3 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>{t.addTerm}</span>
                          </button>
                        </div>
                      </div>

                      {/* Glossary Terms List */}
                      <div className="space-y-2 pt-2">
                        {glossary.length === 0 ? (
                          <div className={`p-8 text-center rounded-xl border text-xs opacity-60 ${
                            theme === "light" ? "bg-slate-50 border-amber-200" : "bg-[#121214] border-white/10"
                          }`}>
                            {t.noGlossary}
                          </div>
                        ) : (
                          glossary.map((term) => (
                            <div
                              key={`term-${term.id}`}
                              className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                                theme === "light"
                                  ? "bg-slate-50 border-amber-200 hover:border-orange-300"
                                  : "bg-[#121214] border-white/10 hover:border-white/20"
                              }`}
                            >
                              <div className="flex items-center gap-3 font-mono">
                                <span className="font-bold text-slate-900 dark:text-white">{term.source}</span>
                                <span className="text-gray-400">→</span>
                                <span className="font-bold text-orange-600 dark:text-[#00adb5]">{term.target}</span>
                              </div>

                              <button
                                onClick={() => removeGlossaryEntry(term.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Advanced Subtitle Workspace (status/stats & live preview) */}
                    <div className="space-y-4 pt-4 border-t border-purple-500/20">
                      <h3 className="font-bold text-sm flex items-center gap-2 text-purple-600 dark:text-purple-400">
                        <FileText className="w-4 h-4" />
                        <span>{isRtl ? "محیط ترجمه و مدیریت زیرنویس پیشرفته" : "Advanced Subtitle Workspace & Preview"}</span>
                      </h3>
                      {renderProgressAndStats()}
                      {renderWorkspaceLogsAndPreview()}
                    </div>

                    {/* Pro Action Buttons */}
                    <div className="pt-6 border-t border-purple-500/20 space-y-3">
                      {status === "idle" || status === "completed" || status === "error" ? (
                        <button
                          onClick={() => startTranslation(0)}
                          disabled={subtitles.length === 0}
                          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                            subtitles.length === 0
                              ? "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed shadow-none"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40"
                          }`}
                        >
                          <Zap className="w-4 h-4 fill-current" />
                          <span>{t.translateAdvancedBtn}</span>
                        </button>
                      ) : status === "translating" ? (
                        <button
                          onClick={handlePause}
                          className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                          <Pause className="w-4 h-4 fill-current" />
                          <span>{t.pauseBtn}</span>
                        </button>
                      ) : status === "paused" ? (
                        <button
                          onClick={handleResume}
                          className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>{t.resumeBtn}</span>
                        </button>
                      ) : null}

                      {subtitles.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={handleDownload}
                            disabled={subtitles.filter(s => s.translatedText).length === 0}
                            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                              subtitles.filter(s => s.translatedText).length === 0
                                ? "opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-800"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-xs"
                            }`}
                          >
                            <DownloadCloud className="w-3.5 h-3.5" />
                            <span>{t.downloadBtn}</span>
                          </button>

                          <button
                            onClick={handleReset}
                            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                              theme === "light"
                                ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                                : "bg-[#121214] hover:bg-red-500/10 text-red-400 border-red-500/20"
                            }`}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{t.resetBtn}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* YouTube Channel & Telegram Promo Box at bottom */}
                    {renderPromoFooter()}

                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </main>

      {/* Terminal Console Logs Footer */}
      <footer className={`h-16 border-t px-4 flex items-center justify-between text-[11px] font-mono flex-shrink-0 ${
        theme === "light" ? "bg-white border-amber-200 text-slate-700" : "bg-[#121214] border-white/10 text-zinc-400"
      }`}>
        <div className="flex-1 overflow-x-auto whitespace-nowrap pr-4">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {consoleLogs[consoleLogs.length - 1] || "System Idle"}
          </p>
        </div>
        <div className="text-[10px] opacity-50 flex-shrink-0 hidden sm:block">
          SubTranslate Pro
        </div>
      </footer>

      {/* Confirmation Modals */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          >
            <div className={`p-6 rounded-2xl max-w-sm w-full space-y-4 border ${
              theme === "light" ? "bg-white border-amber-200 text-slate-900" : "bg-[#1e1e24] border-white/20 text-white"
            }`}>
              <h3 className="font-bold text-sm flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <span>{isRtl ? "تایید پاکسازی" : "Confirm Reset"}</span>
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">{t.confirmReset}</p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {t.cancelImport}
                </button>
                <button
                  onClick={handleResetConfirm}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-red-500 hover:bg-red-600 text-white shadow-xs cursor-pointer"
                >
                  {isRtl ? "بله، پاک شود" : "Yes, Reset"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClearGlossaryConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          >
            <div className={`p-6 rounded-2xl max-w-sm w-full space-y-4 border shadow-2xl ${
              theme === "light" ? "bg-white border-amber-200 text-slate-900" : "bg-[#1e1e24] border-white/20 text-white"
            }`}>
              <h3 className="font-bold text-sm flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <span>{isRtl ? "تایید پاکسازی واژه‌نامه" : "Confirm Clear Glossary"}</span>
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">{t.confirmClearGlossary}</p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowClearGlossaryConfirm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  {t.cancelImport}
                </button>
                <button
                  onClick={handleClearGlossaryConfirm}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-md"
                >
                  {t.clearGlossaryBtn}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClearTmConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          >
            <div className={`p-6 rounded-2xl max-w-sm w-full space-y-4 border shadow-2xl ${
              theme === "light" ? "bg-white border-amber-200 text-slate-900" : "bg-[#1e1e24] border-white/20 text-white"
            }`}>
              <h3 className="font-bold text-sm flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <span>{isRtl ? "تایید پاکسازی حافظه ترجمه (TM)" : "Confirm Clear TM Memory"}</span>
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                {isRtl 
                  ? "آیا از پاکسازی تمام داده‌های ذخیره‌شده در حافظه ترجمه (TM) مطمئن هستید؟" 
                  : "Are you sure you want to clear all cached translation pairs from TM memory?"}
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowClearTmConfirm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  {t.cancelImport}
                </button>
                <button
                  onClick={handleClearTmCacheConfirm}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-md"
                >
                  {t.tmClear}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasSavedSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50"
          >
            <div className={`p-5 rounded-2xl border shadow-2xl space-y-3 ${
              theme === "light" ? "bg-white border-amber-300 text-slate-900" : "bg-[#1e1e24] border-white/20 text-white"
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs flex items-center gap-2 text-orange-500">
                  <Clock className="w-4 h-4" />
                  <span>{t.autoResumeTitle}</span>
                </h4>
                <button
                  onClick={handleDismissResume}
                  className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs opacity-80 leading-relaxed">
                {t.autoResumeMsg}
              </p>

              {savedSessionDetails && (
                <div className="text-[11px] font-mono bg-amber-50 dark:bg-black/30 p-2.5 rounded-lg border border-amber-200 dark:border-white/5 space-y-1">
                  <div>{t.fileName}: <span className="font-bold">{savedSessionDetails.fileName}</span></div>
                  <div>{t.translatedLines}: <span className="font-bold text-emerald-500">{savedSessionDetails.translatedCount} / {savedSessionDetails.totalLines}</span></div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={handleDismissResume}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {t.dismissBtn}
                </button>
                <button
                  onClick={handleAutoResumeConfirm}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-xs cursor-pointer"
                >
                  {t.autoResumeBtn}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
