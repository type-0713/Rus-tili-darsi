import React, { useState } from 'react';
import {
  BookOpen,
  Trophy,
  Volume2,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Gamepad2,
  Headphones,
  Mic,
  FileCheck2,
  Presentation,
  BookA,
  Library,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AudioSettingsModal } from './AudioSettingsModal';

interface NavItem {
  id: string;
  labelRu: string;
  labelUz: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelRu: 'Главная 3D', labelUz: 'Bosh sahifa', icon: Sparkles },
  { id: 'lesson', labelRu: 'Урок (11)', labelUz: 'Asosiy dars', icon: BookOpen },
  { id: 'textbook', labelRu: 'Учебник (54–59)', labelUz: 'Darslik', icon: FileText, badge: '54–59' },
  { id: 'grammar', labelRu: 'Грамматика', labelUz: 'Qoidalar', icon: Library, badge: 'A–K' },
  { id: 'dictionary', labelRu: 'Словарь', labelUz: 'Lug‘at', icon: BookA, badge: '27+' },
  { id: 'pronunciation', labelRu: 'Произношение', labelUz: 'Talaffuz', icon: Mic },
  { id: 'listening', labelRu: 'Аудирование', labelUz: 'Tinglash', icon: Headphones, badge: '15' },
  { id: 'games', labelRu: 'Игры', labelUz: 'O‘yinlar', icon: Gamepad2, badge: '7' },
  { id: 'quiz', labelRu: 'Тест', labelUz: 'Sinov', icon: FileCheck2 },
  { id: 'teacher', labelRu: 'Учитель', labelUz: 'O‘qituvchi', icon: Presentation },
  { id: 'summary', labelRu: 'Итоги', labelUz: 'Xulosa', icon: GraduationCap }
];

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, xp, userLevel } = useApp();
  const [isAudioModalOpen, setIsAudioModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab('home');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left group flex-shrink-0"
          >
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  КНИЖНЫЙ МИР 3D
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                  ACADEMY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                Interaktiv rus tili ta’lim platformasi
              </p>
            </div>
          </button>

          {/* Desktop Nav links (Visible on large screens) */}
          <nav className="hidden 2xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-50 text-purple-900 border border-purple-300 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                  <span>{item.labelRu}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded-full bg-purple-100 text-purple-700 font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Gamification XP & Level Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200/80 shadow-sm">
              <Trophy className="w-4 h-4 text-amber-600 animate-bounce" />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="font-mono font-black text-xs text-amber-900">{xp}</span>
                  <span className="text-[10px] text-amber-700 font-bold">XP</span>
                </div>
                <div className="text-[9px] font-bold text-amber-800 leading-none">
                  {userLevel}
                </div>
              </div>
            </div>

            {/* Audio Settings Button */}
            <button
              onClick={() => setIsAudioModalOpen(true)}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors"
              title="Ruscha ovoz sozlamalari"
            >
              <Volume2 className="w-4 h-4 text-purple-700" />
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="2xl:hidden p-2 rounded-2xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
              title="Barcha bo‘limlar"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Global Horizontal Quick-Pills Navigation (Clean, responsive across all devices) */}
        <div className="border-t border-slate-100 bg-white/90 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto scrollbar-thin">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-900 border border-slate-200/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                  <span>{item.labelRu}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded-md font-mono font-bold ${
                        isActive ? 'bg-purple-700 text-purple-100' : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu (Full Grid) */}
        {isMobileMenuOpen && (
          <div className="2xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-fadeIn">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Akademiya Bo‘limlari:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-semibold text-left transition-all ${
                      isActive
                        ? 'bg-purple-50 text-purple-900 border-2 border-purple-500 shadow-sm'
                        : 'text-slate-800 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <div className="truncate">
                      <p className="truncate font-bold">{item.labelRu}</p>
                      <p className="text-[10px] text-slate-500">{item.labelUz}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Audio Settings Modal */}
      <AudioSettingsModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
      />
    </>
  );
};
