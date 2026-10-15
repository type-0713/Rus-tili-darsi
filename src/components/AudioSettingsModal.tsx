import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, AlertCircle, CheckCircle2, Play } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    settings,
    updateSettings,
    russianVoices,
    selectedVoice,
    hasRussianVoice,
    isSupported,
    speak
  } = useAudio();

  if (!isOpen) return null;

  const testPhrase = 'Здравствуйте! Добро пожаловать в Академию русского языка.';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white shadow-2xl border border-slate-200 text-slate-900"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Ruscha Ovoz Sozlamalari</h3>
              <p className="text-xs text-slate-500">Web Speech API (Internet va API kalitsiz)</p>
            </div>
          </div>

          {/* Voice Status Alert */}
          {!isSupported ? (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-900">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <span>Brauzeringiz Web Speech API imkoniyatini qo‘llab-quvvatlamaydi. Chrome yoki Edge brauzeridan foydalanish tavsiya etiladi.</span>
            </div>
          ) : !hasRussianVoice ? (
            <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-bold mb-0.5">Tizimda ruscha ovoz aniqlanmadi!</p>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Windows Sozlamalari (Settings ➔ Time & Language ➔ Speech) orqali rus tili ovoz paketini qo‘shishingiz yoki Google Chrome brauzeridan foydalanishingiz mumkin.
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Ruscha ovoz moduli faol va to‘liq ishlamoqda.</span>
            </div>
          )}

          {/* Voice Selector */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mavjud ruscha ovozlar ({russianVoices.length})
            </label>
            <select
              value={selectedVoice?.voiceURI || ''}
              onChange={(e) => updateSettings({ selectedVoiceURI: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-purple-500 font-medium"
              disabled={russianVoices.length === 0}
            >
              {russianVoices.length === 0 ? (
                <option value="">Standart tizim ovozi</option>
              ) : (
                russianVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Playback Rate Slider (0.7x - 1.2x) */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Ovoz tezligi
              </label>
              <span className="text-xs font-mono text-purple-700 font-bold">
                {settings.rate.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.2"
              step="0.05"
              value={settings.rate}
              onChange={(e) => updateSettings({ rate: parseFloat(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
              <span>0.7x (Sekin/Ta’lim)</span>
              <span>1.0x (Normal)</span>
              <span>1.2x (Tez)</span>
            </div>
          </div>

          {/* Volume Slider (0 - 100%) */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Ovoz balandligi
              </label>
              <span className="text-xs font-mono text-purple-700 font-bold">
                {Math.round(settings.volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Test Voice Button */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => speak(testPhrase)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Ovozni sinab ko‘rish</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Yopish
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
