import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

const FLOATING_LETTERS = ['А', 'Б', 'В', 'Я', 'Ж', 'Ф', 'Ы', 'Э', 'Ю', 'Щ', 'Ъ', 'Д'];

export const BookFallback: React.FC = () => {
  return (
    <div className="relative w-full h-[380px] md:h-[460px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 via-purple-50/30 to-indigo-50/40 border border-slate-200/90 shadow-sm">
      {/* Background glow and shelf silhouette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-indigo-100/20 to-transparent pointer-events-none" />

      {/* Decorative shelf lines */}
      <div className="absolute bottom-10 w-4/5 h-2.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent rounded-full shadow-sm" />
      <div className="absolute bottom-8 w-3/4 h-1 bg-cyan-400/40 rounded-full blur-[1px]" />

      {/* Floating Russian Cyrillic Letters */}
      {FLOATING_LETTERS.map((letter, idx) => {
        const randomX = (idx % 6) * 15 - 40;
        const randomY = Math.floor(idx / 6) * 55 - 110;
        const delay = idx * 0.35;
        const duration = 4.5 + (idx % 3) * 1.5;

        return (
          <motion.div
            key={letter + idx}
            className="absolute font-serif font-black text-xl md:text-3xl select-none pointer-events-none"
            style={{
              left: `${50 + randomX}%`,
              top: `${50 + randomY}%`,
              color: idx % 2 === 0 ? '#7c3aed' : '#0284c7',
              textShadow: idx % 2 === 0 ? '0 2px 10px rgba(124,58,237,0.2)' : '0 2px 10px rgba(2,132,199,0.2)'
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, (idx % 2 === 0 ? 10 : -10), 0],
              rotate: [0, (idx % 2 === 0 ? 12 : -12), 0],
              opacity: [0.35, 0.9, 0.35]
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {letter}
          </motion.div>
        );
      })}

      {/* CSS 3D Open Book Container */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{
            y: [-6, 6, -6],
            rotateZ: [-1, 1, -1]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative flex items-center justify-center"
        >
          {/* Main Book Wings - Crisp White Pages with Indigo Leather Spine */}
          <div className="relative flex items-center shadow-xl rounded-2xl p-2 bg-purple-950/5 border border-purple-100">
            {/* Left Page */}
            <div className="w-36 h-48 md:w-52 md:h-64 bg-white border border-slate-200 rounded-l-2xl p-4 flex flex-col justify-between shadow-md transform -rotate-1 origin-right">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-[10px] md:text-xs tracking-wider uppercase font-bold text-purple-900">
                    КНИЖНЫЙ МИР
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-slate-200 rounded w-full" />
                  <div className="h-1.5 bg-slate-200 rounded w-5/6" />
                  <div className="h-1.5 bg-purple-200 rounded w-4/6" />
                  <div className="h-1.5 bg-cyan-200 rounded w-full mt-3" />
                  <div className="h-1.5 bg-slate-200 rounded w-3/4" />
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Стр. 54</div>
            </div>

            {/* Book Spine */}
            <div className="w-3.5 h-52 md:h-68 bg-gradient-to-b from-purple-800 via-indigo-700 to-purple-800 rounded-sm shadow-md z-10" />

            {/* Right Page */}
            <div className="w-36 h-48 md:w-52 md:h-64 bg-white border border-slate-200 rounded-r-2xl p-4 flex flex-col justify-between shadow-md transform rotate-1 origin-left">
              <div>
                <div className="flex items-center justify-end gap-1 mb-3">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  <span className="text-[10px] md:text-xs font-bold text-cyan-900">AI ACADEMY</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-slate-200 rounded w-full" />
                  <div className="h-1.5 bg-cyan-200 rounded w-5/6" />
                  <div className="h-1.5 bg-slate-200 rounded w-full" />
                  <div className="h-1.5 bg-purple-200 rounded w-2/3 mt-3" />
                  <div className="h-1.5 bg-slate-200 rounded w-4/5" />
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono text-right">Стр. 59</div>
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <div className="mt-5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-purple-200 text-xs font-bold text-purple-900 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-spin" />
          <span>Interaktiv 3D Kitob Olami</span>
        </div>
      </div>
    </div>
  );
};
