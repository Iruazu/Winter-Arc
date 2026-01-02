export type TaskId = 'workout' | 'english' | 'code';

export interface DailyTasks {
  workout: boolean;
  english: boolean;
  code: boolean;
}

export interface SentenceLog {
  id: string;
  date: string;
  sentence: string;
}

export type Phase = 'foundation' | 'intern' | 'results' | 'pre' | 'post';

export const WINTER_ARC_START = new Date('2026-01-01');
export const WINTER_ARC_END = new Date('2026-03-31');
