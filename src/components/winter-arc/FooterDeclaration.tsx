import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Flame } from 'lucide-react';
import clsx from 'clsx';

export const FooterDeclaration: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Handle for dragging/tapping */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-midnight-800/95 backdrop-blur-lg border-t border-slate-700 p-4 cursor-pointer hover:bg-midnight-700/95 transition-colors flex items-center justify-between shadow-2xl"
      >
        <div className="flex items-center gap-2 text-ice font-bold">
          <Flame size={20} className={clsx("transition-all duration-500", isOpen ? "text-orange-500 scale-110" : "text-ice")} />
          <span>最後の宣言</span>
        </div>
        {isOpen ? <ChevronDown className="text-slate-400" /> : <ChevronUp className="text-slate-400" />}
      </div>

      {/* Content */}
      <div className={clsx(
        "bg-midnight-900/95 backdrop-blur-xl border-t border-slate-800 transition-all duration-500 ease-in-out overflow-y-auto",
        isOpen ? "max-h-[80vh] p-6" : "max-h-0"
      )}>
        <div className="space-y-6 text-slate-300 leading-relaxed max-w-2xl mx-auto pb-8">
          <section>
            <h3 className="text-white font-bold text-lg mb-2">0. 宣言</h3>
            <p>私はこの冬、自分自身を変えるためにWinter Arcを開始する。</p>
          </section>
          
          <section>
            <h3 className="text-white font-bold text-lg mb-2">1. 目的</h3>
            <p>ただの習慣化ではない。圧倒的な結果を出すための期間だ。</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-2">8. 最後の宣言</h3>
            <p className="text-ice font-bold text-xl border-l-4 border-ice pl-4 py-2 bg-ice/5">
              「私は、今日やるべきことをやったか？」<br/>
              この問いに毎日YESと答えること。<br/>
              それが唯一のルールだ。
            </p>
          </section>

          <div className="text-center text-xs text-slate-500 mt-8 pt-8 border-t border-slate-800">
            ※ ユーザー設定で全文を編集してください
          </div>
        </div>
      </div>
    </div>
  );
};
