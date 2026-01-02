import React from 'react';
import { AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';
import { Phase, WINTER_ARC_START, WINTER_ARC_END } from './types';
import { differenceInDays, format, isWithinInterval } from 'date-fns';
import clsx from 'clsx';

interface HeaderProps {
  currentDate: Date;
}

export const Header: React.FC<HeaderProps> = ({ currentDate }) => {
  const getPhase = (date: Date): { phase: Phase; label: string; color: string } => {
    const month = date.getMonth(); // 0 = Jan, 1 = Feb, 2 = Mar
    const year = date.getFullYear();

    if (year < 2026) return { phase: 'pre', label: '準備期間', color: 'text-gray-400' };
    if (year > 2026 || month > 2) return { phase: 'post', label: 'Winter Arc 完了', color: 'text-green-400' };

    if (month === 0) return { phase: 'foundation', label: '1月: 基礎固め', color: 'text-blue-400' };
    if (month === 1) return { phase: 'intern', label: '2月: インターン開始', color: 'text-purple-400' };
    if (month === 2) return { phase: 'results', label: '3月: 成果創出', color: 'text-ice' };

    return { phase: 'pre', label: '準備期間', color: 'text-gray-400' };
  };

  const { label, color } = getPhase(currentDate);

  // Progress Calculation
  const totalDays = differenceInDays(WINTER_ARC_END, WINTER_ARC_START) + 1;
  const daysPassed = differenceInDays(currentDate, WINTER_ARC_START) + 1;
  const progress = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);

  // Exam Period: Feb 3 - Feb 9
  const isExamPeriod = isWithinInterval(currentDate, {
    start: new Date(2026, 1, 3), // Month is 0-indexed
    end: new Date(2026, 1, 9)
  });

  return (
    <div className="space-y-6 mb-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Winter Arc</h1>
          <p className={clsx("text-lg font-medium mt-1", color)}>{label}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm">{format(currentDate, 'yyyy/MM/dd')}</p>
          <p className="text-ice font-bold text-xl">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <div 
          className="h-full bg-ice transition-all duration-500 ease-out shadow-[0_0_10px_rgba(165,243,252,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Exam Alert */}
      {isExamPeriod && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-center gap-3 animate-pulse">
          <AlertTriangle className="text-red-400 w-6 h-6 flex-shrink-0" />
          <div>
            <p className="text-red-200 font-bold">期末試験期間 (2/3 - 2/9)</p>
            <p className="text-red-300/80 text-sm">学業最優先。最低限のルーティン維持を目標に。</p>
          </div>
        </div>
      )}
    </div>
  );
};
