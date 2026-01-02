import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { DailyChecklist } from './DailyChecklist';
import { SentenceLog } from './SentenceLog';
import { FooterDeclaration } from './FooterDeclaration';
import { DailyTasks, SentenceLog as LogType, TaskId } from './types';
import { format } from 'date-fns';

const STORAGE_KEY_TASKS = 'winter_arc_tasks';
const STORAGE_KEY_LOGS = 'winter_arc_logs';
const STORAGE_KEY_LAST_DATE = 'winter_arc_last_date';

export const WinterArcApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<DailyTasks>({
    workout: false,
    english: false,
    code: false,
  });
  const [logs, setLogs] = useState<LogType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial Load & Date Check
  useEffect(() => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const lastDate = localStorage.getItem(STORAGE_KEY_LAST_DATE);
    
    // Load Logs
    const savedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }

    // Load Tasks or Reset
    if (lastDate !== todayStr) {
      // New Day: Reset tasks
      const newTasks = { workout: false, english: false, code: false };
      setTasks(newTasks);
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(newTasks));
      localStorage.setItem(STORAGE_KEY_LAST_DATE, todayStr);
    } else {
      // Same Day: Load tasks
      const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
    
    setIsLoaded(true);

    // Update current date every minute
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Save Tasks
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Save Logs
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
    }
  }, [logs, isLoaded]);

  const toggleTask = (id: TaskId) => {
    setTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addLog = (sentence: string) => {
    const newLog: LogType = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      sentence
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const deleteLog = (id: string) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-midnight-900 text-slate-200 pb-24 font-sans selection:bg-ice selection:text-midnight-900">
      <div className="max-w-md mx-auto px-6 py-8">
        <Header currentDate={currentDate} />
        
        <main className="space-y-10">
          <section>
            <DailyChecklist tasks={tasks} onToggle={toggleTask} />
          </section>

          <section className="pt-6 border-t border-slate-800">
            <SentenceLog logs={logs} onAdd={addLog} onDelete={deleteLog} />
          </section>
        </main>
      </div>
      
      <FooterDeclaration />
    </div>
  );
};
