import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  Sparkles,
  Info
} from 'lucide-react';

import { PRONUNCIATION_DATA } from '../../data/pronunciationData';
import { useAudio } from '../../context/AudioContext';
import { useApp } from '../../context/AppContext';

// Optional Web Speech Recognition interface
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

export const PronunciationSection: React.FC = () => {
  const { speak } = useAudio();
  const { addXP } = useApp();

  const [activePhraseId, setActivePhraseId] = useState<string>('pr-1');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedTranscript, setRecordedTranscript] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState<boolean>(true);

  const activePhrase = PRONUNCIATION_DATA.find((p) => p.id === activePhraseId) || PRONUNCIATION_DATA[0];

  const handleTestSpeech = (targetText: string) => {
    // Check if SpeechRecognition or webkitSpeechRecognition exists
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechRecognitionSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ru-RU';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordedTranscript(null);
        setMatchScore(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setRecordedTranscript(transcript);

        // Simple similarity comparison
        const cleanTarget = targetText.toLowerCase().replace(/[^a-zа-яё]/gi, '');
        const cleanSpoken = transcript.toLowerCase().replace(/[^a-zа-яё]/gi, '');

        if (cleanTarget === cleanSpoken || cleanTarget.includes(cleanSpoken) || cleanSpoken.includes(cleanTarget)) {
          setMatchScore(95);
          addXP(10, `pronun-${activePhrase.id}`, true);
        } else {
          setMatchScore(65);
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setSpeechRecognitionSupported(false);
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto text-left">
      {/* Header Banner - Clean Light Design */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-pink-50 text-pink-700 border border-pink-200">
              <Mic className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-pink-700 tracking-wider uppercase">
              Лаборатория Произношения
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Talaffuz va Jonli Ruscha Nutq
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Urg‘ular, fonetika, sekin (0.7x) va normal tezlikda tinglash hamda o‘z nutqingizni sinash laboratoriyasi.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-800 self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Fonetika va urg‘u darslari</span>
        </div>
      </div>

      {/* Main Pronunciation Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Phrases Selection */}
        <div className="lg:col-span-5 space-y-2">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Mashq qilish uchun iborani tanlang:
          </p>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
            {PRONUNCIATION_DATA.map((item) => {
              const isSelected = item.id === activePhrase.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePhraseId(item.id);
                    setRecordedTranscript(null);
                    setMatchScore(null);
                  }}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between gap-2 shadow-sm ${
                    isSelected
                      ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-100 text-purple-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">
                      {item.textRu}
                    </h4>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">{item.textUz}</p>
                  </div>

                  <Volume2 className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-purple-600' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Phrase Deep Dive Card */}
        <div className="lg:col-span-7 space-y-5 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm">
          {/* Active Phrase Big Display */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/90 text-center space-y-2 shadow-sm">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              {activePhrase.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activePhrase.textRu}
            </h3>
            {activePhrase.phonetics && (
              <p className="text-sm sm:text-base font-mono text-purple-800 font-bold">
                {activePhrase.phonetics}
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-600 italic pt-1">
              Tarjimasi: «{activePhrase.textUz}»
            </p>
          </div>

          {/* Audio Speed Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => speak(activePhrase.textRu, undefined, 0.7)}
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold text-xs shadow-sm transition-all"
            >
              <Volume2 className="w-4 h-4 text-cyan-700" />
              <span>Sekin o‘qish (0.7x)</span>
            </button>

            <button
              onClick={() => speak(activePhrase.textRu, undefined, 1.0)}
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Normal tezlik (1.0x)</span>
            </button>
          </div>

          {/* Phonetics & Pronunciation Notes */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Talaffuz sirlari va urg‘u qoidasi:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {activePhrase.notesUz}
            </p>
          </div>

          {/* Optional Speech Recognition (Microphone practice) */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                O‘zingiz aytib ko‘ring (Mikrofon orqali):
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Ixtiyoriy funksiya</span>
            </div>

            {!speechRecognitionSupported ? (
              <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                Brauzeringizda SpeechRecognition qo‘llab-quvvatlanmadi yoki ruxsat berilmadi. Ovozni eshitib, o‘zingiz mustaqil ravishda qaytarishingiz mumkin!
              </p>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => handleTestSpeech(activePhrase.textRu)}
                  disabled={isRecording}
                  className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                    isRecording
                      ? 'bg-red-600 animate-pulse text-white'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>
                    {isRecording ? 'Tinglanmoqda... Ruscha gapiring!' : 'Mikrofonni bosib gapiring'}
                  </span>
                </button>

                {recordedTranscript && (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 text-xs">
                    <p className="text-slate-600">
                      Sizning nutqingiz: <span className="text-slate-900 font-bold">«{recordedTranscript}»</span>
                    </p>
                    {matchScore && (
                      <p className="text-emerald-700 font-bold">
                        Taxminiy o‘xshashlik: {matchScore}%
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 italic pt-1">
                      Izoh: Nutqni tanish brauzer imkoniyatiga bog‘liq bo‘lib, rasmiy imtihon bahosi emas.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
