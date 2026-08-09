export interface SrtSubtitle {
  id: number;
  timeframe: string; // e.g., "00:01:20,000 --> 00:01:23,000"
  text: string;      // The original text
  translatedText?: string;
}

export interface GlossaryEntry {
  id: string;
  source: string;  // کلمه در زبان مبدأ
  target: string;  // ترجمه دلخواه در زبان مقصد
}

export type GlossaryTerm = GlossaryEntry;

export type TranslationStatus = "idle" | "translating" | "paused" | "completed" | "error";

export interface AppState {
  sourceLanguage: string;
  targetLanguage: string;
  translationStyle: string;
  status: TranslationStatus;
  currentBatchIndex: number;
  fileName: string;
  fileSize: string;
}
