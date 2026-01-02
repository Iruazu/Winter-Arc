import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, History } from 'lucide-react';
import { SentenceLog as LogType } from './types';
import { format } from 'date-fns';

interface SentenceLogProps {
  logs: LogType[];
  onAdd: (sentence: string) => void;
  onDelete: (id: string) => void;
}

export const SentenceLog: React.FC<SentenceLogProps> = ({ logs, onAdd, onDelete }) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="text-ice" />
          Today's Sentence
        </h2>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <History size={16} />
          {isOpen ? 'Hide History' : 'Show History'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="今日覚えた1文を入力..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-4 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-ice focus:ring-1 focus:ring-ice transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-ice text-midnight-900 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>

      {isOpen && (
        <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {logs.length === 0 ? (
            <p className="text-center text-slate-500 py-4">No sentences logged yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex justify-between items-start group">
                <div>
                  <p className="text-white font-medium">{log.sentence}</p>
                  <p className="text-xs text-slate-500 mt-1">{format(new Date(log.date), 'yyyy/MM/dd HH:mm')}</p>
                </div>
                <button 
                  onClick={() => onDelete(log.id)}
                  className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
