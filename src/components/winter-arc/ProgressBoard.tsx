import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, Calendar, Award } from 'lucide-react';
import { DailyTasks } from './types';
import { format, subDays, startOfDay } from 'date-fns';
import clsx from 'clsx';

interface ProgressBoardProps {
  history: Record<string, DailyTasks>; // date string -> tasks
  currentTasks: DailyTasks;
}

export const ProgressBoard: React.FC<ProgressBoardProps> = ({ history, currentTasks }) => {
  const stats = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(startOfDay(new Date()), 6 - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      return {
        date: dateStr,
        dayLabel: format(date, 'EEE'),
        tasks: history[dateStr] || { workout: false, english: false, code: false }
      };
    });

    const totalDays = Object.keys(history).length + 1; // +1 for today
    const completedDays = Object.values(history).filter(tasks => 
      tasks.workout && tasks.english && tasks.code
    ).length + (currentTasks.workout && currentTasks.english && currentTasks.code ? 1 : 0);

    const workoutCount = Object.values(history).filter(t => t.workout).length + (currentTasks.workout ? 1 : 0);
    const englishCount = Object.values(history).filter(t => t.english).length + (currentTasks.english ? 1 : 0);
    const codeCount = Object.values(history).filter(t => t.code).length + (currentTasks.code ? 1 : 0);

    const currentStreak = (() => {
      let streak = 0;
      const today = format(new Date(), 'yyyy-MM-dd');
      let checkDate = new Date();
      
      while (true) {
        const dateStr = format(checkDate, 'yyyy-MM-dd');
        const tasks = dateStr === today ? currentTasks : history[dateStr];
        
        if (!tasks || !(tasks.workout && tasks.english && tasks.code)) break;
        
        streak++;
        checkDate = subDays(checkDate, 1);
      }
      
      return streak;
    })();

    return {
      last7Days,
      totalDays,
      completedDays,
      completionRate: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
      taskCompletion: {
        workout: workoutCount,
        english: englishCount,
        code: codeCount,
      },
      currentStreak
    };
  }, [history, currentTasks]);

  const getCompletionColor = (count: number, total: number) => {
    const rate = total > 0 ? count / total : 0;
    if (rate >= 0.8) return 'bg-green-500';
    if (rate >= 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTaskCompletionCount = (tasks: DailyTasks) => {
    return (tasks.workout ? 1 : 0) + (tasks.english ? 1 : 0) + (tasks.code ? 1 : 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="text-ice" />
          Progress Board
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Award size={16} />
            <span>Perfect Days</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats.completedDays}</span>
            <span className="text-sm text-slate-500">/ {stats.totalDays}</span>
          </div>
          <div className="mt-2 text-xs font-medium text-ice">
            {stats.completionRate}% completion
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <TrendingUp size={16} />
            <span>Current Streak</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats.currentStreak}</span>
            <span className="text-sm text-slate-500">days</span>
          </div>
          <div className="mt-2 text-xs font-medium text-orange-400">
            {stats.currentStreak > 0 ? 'Keep it up! 🔥' : 'Start today!'}
          </div>
        </div>
      </div>

      {/* Last 7 Days Heatmap */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
          <Calendar size={16} />
          <span>Last 7 Days</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {stats.last7Days.map((day, idx) => {
            const completionCount = getTaskCompletionCount(day.tasks);
            const isToday = day.date === format(new Date(), 'yyyy-MM-dd');
            
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="text-xs text-slate-500 font-medium">{day.dayLabel}</div>
                <div
                  className={clsx(
                    "w-full aspect-square rounded-lg transition-all duration-300",
                    completionCount === 3 && "bg-ice shadow-[0_0_10px_rgba(165,243,252,0.3)]",
                    completionCount === 2 && "bg-green-600/60",
                    completionCount === 1 && "bg-yellow-600/60",
                    completionCount === 0 && "bg-slate-700/50",
                    isToday && "ring-2 ring-ice ring-offset-2 ring-offset-midnight-900"
                  )}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {completionCount > 0 && (
                      <span className="text-xs font-bold text-white">{completionCount}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-slate-700/50"></div>
            <span>0</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-600/60"></div>
            <span>1</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-600/60"></div>
            <span>2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-ice"></div>
            <span>3</span>
          </div>
        </div>
      </div>

      {/* Task Breakdown */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <div className="text-slate-400 text-sm mb-4">Task Completion</div>
        <div className="space-y-4">
          {[
            { label: 'Workout', count: stats.taskCompletion.workout, icon: '💪' },
            { label: 'English', count: stats.taskCompletion.english, icon: '🗣️' },
            { label: 'Code', count: stats.taskCompletion.code, icon: '💻' },
          ].map((task, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white font-medium flex items-center gap-2">
                  <span>{task.icon}</span>
                  {task.label}
                </span>
                <span className="text-xs text-slate-400">
                  {task.count} / {stats.totalDays}
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={clsx(
                    "h-full transition-all duration-500",
                    getCompletionColor(task.count, stats.totalDays)
                  )}
                  style={{ width: `${(task.count / stats.totalDays) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};