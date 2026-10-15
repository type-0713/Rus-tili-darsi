import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Play,
  Award,
  BookOpen,
  Library,
  Gamepad2,
  ArrowRight,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BookScene } from '../3d/BookScene';
import { LESSON_STEPS } from '../../data/lessonData';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setCurrentStepId, xp, userLevel, nextLevelXp, levelProgress } = useApp();

  const handleStartLesson = () => {
    setCurrentStepId(1);
    setActiveTab('lesson');
  };

  return (
    <div className="space-y-10 py-4 max-w-7xl mx-auto">
      {/* Hero Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Title & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-6 text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
            <span>AI Russian Academy • 3D Ta’lim Platformasi</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
              КНИЖНЫЙ МИР{' '}
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                3D
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-purple-700">
              «О пользе чтения» — rus tilini yangi o‘lchamda o‘rganing!
            </p>
          </div>

          {/* Subtitle description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            Kitob mutolaasining xotira, aql va martabaga ta’siri haqidagi to‘liq interaktiv dars. 
            Nol backend, 100% offlayn, sinxron ruscha audio nutq, rasmdagi darslik grammatikasi (54 & 59-mashqlar), 7 ta o‘quv o‘yini va 15 ta tinglab tushunish topshirig‘i.
          </p>

          {/* XP & Level Indicator Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Darajangiz: <span className="text-purple-700 font-extrabold">{userLevel}</span>
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600">
                {xp} / {nextLevelXp} XP
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleStartLesson}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Darsni boshlash (11 bosqich)</span>
            </button>

            <button
              onClick={() => setActiveTab('textbook')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all hover:scale-[1.02]"
            >
              <FileText className="w-4 h-4 text-amber-700" />
              <span>Darslik mashqlari (54–59)</span>
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all hover:scale-[1.02]"
            >
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span>O‘yinlar (7 ta)</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 w-full"
        >
          <BookScene />
        </motion.div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Darslik Mashqlari',
            desc: 'Rasmdagi 54 va 59-mashqlar treynajori',
            icon: FileText,
            color: 'bg-amber-50/80 border-amber-200 text-amber-800',
            iconColor: 'bg-amber-100 text-amber-800',
            tab: 'textbook'
          },
          {
            title: '11 Dars Bosqichi',
            desc: 'Matndan tortib yakuniy xulosagacha',
            icon: BookOpen,
            color: 'bg-purple-50/80 border-purple-200 text-purple-900',
            iconColor: 'bg-purple-100 text-purple-700',
            tab: 'lesson'
          },
          {
            title: 'Grammatika A–K',
            desc: '«Чтобы», kelishiklar, fe’l va otlar',
            icon: Library,
            color: 'bg-cyan-50/80 border-cyan-200 text-cyan-900',
            iconColor: 'bg-cyan-100 text-cyan-700',
            tab: 'grammar'
          },
          {
            title: '7 O‘quv O‘yini',
            desc: 'Juftliklar, gap tuzish, bilimlar jangi',
            icon: Gamepad2,
            color: 'bg-indigo-50/80 border-indigo-200 text-indigo-900',
            iconColor: 'bg-indigo-100 text-indigo-700',
            tab: 'games'
          }
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(f.tab)}
              className={`p-4 rounded-3xl border ${f.color} shadow-sm text-left transition-all hover:scale-[1.02] active:scale-[0.98] group`}
            >
              <div className={`p-2.5 rounded-2xl w-fit mb-3 ${f.iconColor} transition-transform group-hover:scale-110`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {f.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">{f.desc}</p>
            </button>
          );
        })}
      </div>

      {/* 11 Steps Overview Map */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span>Dars dasturi: «О пользе чтения»</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Har bir bosqich mustaqil modul bo‘lib, o‘zbekcha tarjima va amaliy mashqlarni o‘z ichiga oladi.
            </p>
          </div>
          <button
            onClick={handleStartLesson}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm self-start sm:self-auto"
          >
            <span>Barcha bosqichlarni ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {LESSON_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => {
                setCurrentStepId(step.id);
                setActiveTab('lesson');
              }}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-sm text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                  {step.estimatedMinutes} daqiqa
                </span>
                <span className="text-[10px] font-bold text-amber-700">
                  +{step.xpReward} XP
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 group-hover:text-purple-700 transition-colors">
                {step.titleRu}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {step.titleUz}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
