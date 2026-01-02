import React from 'react';
import { Dumbbell, Languages, Code2, Check, ExternalLink, ShieldCheck, Trophy } from 'lucide-react';
import { DailyTasks, TaskId } from './types';
import clsx from 'clsx';

interface DailyChecklistProps {
  tasks: DailyTasks;
  onToggle: (id: TaskId) => void;
}

export const DailyChecklist: React.FC<DailyChecklistProps> = ({ tasks, onToggle }) => {
  const isMinimumCleared = tasks.workout;
  const isAllCleared = tasks.workout && tasks.english && tasks.code;

  const TaskItem = ({ 
    id, 
    label, 
    subLabel, 
    icon: Icon, 
    isCompleted, 
    extraContent 
  }: { 
    id: TaskId; 
    label: string; 
    subLabel: string; 
    icon: any; 
    isCompleted: boolean;
    extraContent?: React.ReactNode;
  }) => (
    <div 
      onClick={() => onToggle(id)}
      className={clsx(
        "relative overflow-hidden rounded-xl p-5 border-2 transition-all duration-300 cursor-pointer group",
        isCompleted 
          ? "bg-slate-800/80 border-ice/50 shadow-[0_0_15px_rgba(165,243,252,0.1)]" 
          : "bg-slate-900/50 border-slate-700 hover:border-slate-600"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={clsx(
          "p-3 rounded-lg transition-colors",
          isCompleted ? "bg-ice text-midnight-900" : "bg-slate-800 text-slate-400"
        )}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h3 className={clsx(
            "text-lg font-bold transition-colors",
            isCompleted ? "text-white" : "text-slate-300"
          )}>
            {label}
          </h3>
          <p className="text-sm text-slate-400 mt-1">{subLabel}</p>
          {extraContent && <div className="mt-3" onClick={e => e.stopPropagation()}>{extraContent}</div>}
        </div>
        <div className={clsx(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
          isCompleted 
            ? "bg-ice border-ice scale-110" 
            : "border-slate-600 group-hover:border-slate-500"
        )}>
          {isCompleted && <Check size={18} className="text-midnight-900 stroke-[3]" />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Daily Missions
        </h2>
        {isAllCleared ? (
          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm font-bold border border-yellow-500/50 flex items-center gap-1 animate-pulse">
            <Trophy size={14} /> PERFECT DAY
          </span>
        ) : isMinimumCleared ? (
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-bold border border-green-500/50 flex items-center gap-1">
            <ShieldCheck size={14} /> MINIMUM CLEARED
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-500 text-sm font-medium border border-slate-700">
            Unfinished
          </span>
        )}
      </div>

      <div className="space-y-4">
        <TaskItem
          id="workout"
          label="全身トレーニング 15分"
          subLabel="緊急避難ルール適用対象"
          icon={Dumbbell}
          isCompleted={tasks.workout}
          extraContent={
            <a 
              href="https://youtu.be/DpMOW5MVHfE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-ice hover:text-white transition-colors bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-ice/30"
            >
              <ExternalLink size={12} />
              動画を開く (YouTube)
            </a>
          }
        />

        <TaskItem
          id="english"
          label="英語スピーキング 5-10分"
          subLabel="振り返り → 英訳 → 1文抽出"
          icon={Languages}
          isCompleted={tasks.english}
        />

        <TaskItem
          id="code"
          label="技術スタック強化"
          subLabel="Python/C++ 基礎 or インターン業務"
          icon={Code2}
          isCompleted={tasks.code}
        />
      </div>
    </div>
  );
};
