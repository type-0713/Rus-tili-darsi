import React from 'react';
import { BookOpen, ShieldCheck, WifiOff, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600 py-10 px-4 sm:px-6 lg:px-8 mt-16 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
        {/* Brand info */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              КНИЖНЫЙ МИР 3D
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md">
            Rus tilini interaktiv 3D texnologiyalar, sinxron nutq sintezi va zamonaviy o‘yinli metodika orqali o‘rganish uchun professional ta’lim platformasi.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Zero-Backend & Xavfsiz
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-800 font-semibold">
              <WifiOff className="w-3.5 h-3.5 text-cyan-600" />
              Offline & Standalone rejim
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-800 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Web Speech API ruscha ovoz
            </span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Asosiy bo‘limlar
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => setActiveTab('lesson')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                11 bosqichli asosiy dars
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('textbook')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                Darslik (54 & 59-mashqlar)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('grammar')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                Grammatika akademiyasi (A–K)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('dictionary')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                Interaktiv lug‘at (27+ so‘z)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('games')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                7 ta o‘quv o‘yini
              </button>
            </li>
          </ul>
        </div>

        {/* Teacher & Tests */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            O‘qituvchi va Nazorat
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => setActiveTab('teacher')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                30 daqiqalik dars rejasi
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('quiz')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                Yakuniy nazorat testi (32 bank)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('listening')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                Tinglab tushunish (15 mashq)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('pronunciation')}
                className="text-slate-600 hover:text-purple-700 transition-colors"
              >
                Talaffuz laboratoriyasi
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p>© 2026 «КНИЖНЫЙ МИР 3D — AI Russian Academy». Barcha huquqlar himoyalangan.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-purple-600 fill-current" /> for Russian Language Learners
        </p>
      </div>
    </footer>
  );
};
