import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  Pause,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Info,
  Award,
  Trophy,
  Gamepad2,
  Mic
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAudio } from '../../context/AudioContext';
import { LESSON_STEPS, MAIN_LESSON_TEXT, INTERACTIVE_WORDS_MAP } from '../../data/lessonData';
import { TEXTBOOK_EXERCISES_54, TEXTBOOK_RULE_1 } from '../../data/textbookData';
import { DICTIONARY_DATA } from '../../data/dictionaryData';

export const LessonSection: React.FC = () => {
  const {
    currentStepId,
    setCurrentStepId,
    unlockStep,
    addXP,
    openWordModal,
    setActiveTab,
    xp,
    userLevel
  } = useApp();

  const {
    speak,
    speakSentenceQueue,
    isSpeaking,
    isPaused,
    pause,
    resume,
    stop,
    activeSentenceIndex
  } = useAudio();

  const [showTranslations, setShowTranslations] = useState<boolean>(true);

  // Step 1 Comprehension State
  const [step1Understood, setStep1Understood] = useState<boolean>(false);

  // Step 3 Comprehension Questions State
  const [step3Answers, setStep3Answers] = useState<Record<number, number>>({});
  const [step3Checked, setStep3Checked] = useState<boolean>(false);

  // Step 5 Grammar 54-mashq state
  const [step5Answers, setStep5Answers] = useState<Record<string, number>>({});
  const [step5Checked, setStep5Checked] = useState<Record<string, boolean>>({});

  // Step 6 Percentage exercise state (3 questions)
  const [step6Answers, setStep6Answers] = useState<Record<number, string>>({});
  const [step6Checked, setStep6Checked] = useState<Record<number, boolean>>({});

  // Step 7 Speech Recognition state
  const [recognizedVoiceText, setRecognizedVoiceText] = useState<string>('');
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string>('');

  // Step 8 Listening state (3 questions)
  const [step8Answers, setStep8Answers] = useState<Record<number, number>>({});
  const [step8Checked, setStep8Checked] = useState<Record<number, boolean>>({});

  // Step 9 Mini Game state
  const [step9Selected, setStep9Selected] = useState<string | null>(null);
  const [step9Matched, setStep9Matched] = useState<string[]>([]);

  // Step 10 Mini Quiz state (5 questions)
  const [step10Answers, setStep10Answers] = useState<Record<number, number>>({});
  const [step10Submitted, setStep10Submitted] = useState<boolean>(false);

  const currentStep = LESSON_STEPS.find((s) => s.id === currentStepId) || LESSON_STEPS[0];

  const handleNextStep = () => {
    stop();
    const nextId = currentStepId + 1;
    if (nextId <= LESSON_STEPS.length) {
      addXP(currentStep.xpReward, `step-${currentStepId}`, true);
      unlockStep(nextId);
      setCurrentStepId(nextId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    stop();
    if (currentStepId > 1) {
      setCurrentStepId(currentStepId - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReadFullText = () => {
    const sentences = MAIN_LESSON_TEXT.map((s) => s.ru);
    speakSentenceQueue(sentences);
  };

  // Web Speech Recognition for Step 7
  const handleStartVoiceCheck = (expectedText: string) => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceFeedback('Brauzeringizda ovozni aniqlash (Speech Recognition) qo‘llab-quvvatlanmaydi.');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognition.lang = 'ru-RU';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListeningVoice(true);
      setVoiceFeedback('Tinglanmoqda... Ruscha jumlani baland va aniq ayting...');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        setRecognizedVoiceText(spoken);
        setIsListeningVoice(false);

        const clean = (s: string) => s.toLowerCase().replace(/[.,!?;:]/g, '').trim();
        if (clean(spoken).includes(clean(expectedText).slice(0, 10))) {
          setVoiceFeedback(`✓ Ajoyib talaffuz! Eshitildi: «${spoken}» (+20 XP)`);
          addXP(20, 'voice-practice', true);
        } else {
          setVoiceFeedback(`Eshitildi: «${spoken}». Yana bir bor aniqroq takrorlab ko‘ring!`);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = () => {
        setIsListeningVoice(false);
        setVoiceFeedback('Ovoz yozilmadi yoki mikrofonga ruxsat berilmadi. Qayta urinib ko‘ring.');
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      recognition.start();
    } catch {
      setIsListeningVoice(false);
      setVoiceFeedback('Ovozni aniqlashda xatolik yuz berdi.');
    }
  };

  // Mini quiz questions for Step 10
  const miniQuizQuestions = [
    {
      qRu: 'Для чего нужно читать книги согласно тексту?',
      qUz: 'Matnga ko‘ra nima uchun kitob o‘qish kerak?',
      options: [
        'Чтобы развивать память, мышление и словарный запас',
        'Чтобы больше спать и отдыхать',
        'Чтобы ни с кем не общаться'
      ],
      correct: 0,
      expUz: 'To‘g‘ri! Kitob mutolaasi xotira, tafakkur va so‘z boyligini rivojlantirishning asosiy vositasidir.'
    },
    {
      qRu: '«Для сохранения ясности ума...» — сложным предложением будет:',
      qUz: '«Для сохранения...» iborasining qo‘shma gapdagi to‘g‘ri shakli (54-bet):',
      options: [
        'Чтобы сохранить ясность ума...',
        'Для сохранить ясность ума...',
        'Что сохранить ясность ума...'
      ],
      correct: 0,
      expUz: 'To‘g‘ri! Qo‘shma gapda «Чтобы» + noaniq shakldagi fe’l (сохранить) qo‘llaniladi.'
    },
    {
      qRu: 'Какая форма верна: «22 [...] россиян [...] книги»?',
      qUz: '«22» soni bilan qaysi shakllar to‘g‘ri moslashadi (59-bet)?',
      options: [
        '22 процента россиян читают',
        '22 процент россиян читает',
        '22 процентов россиян читает'
      ],
      correct: 0,
      expUz: 'To‘g‘ri! 2, 3, 4, 22, 32 sonlaridan keyin «процента» va ko‘plikdagi kesim «читают» ishlatiladi.'
    },
    {
      qRu: 'Какая форма верна: «13 [...] россиян [...] книги»?',
      qUz: '«13» soni bilan qaysi foiz shakli to‘g‘ri (11–14 istisno)?',
      options: [
        '13 процентов россиян читают',
        '13 процента россиян читают',
        '13 процент россиян читает'
      ],
      correct: 0,
      expUz: 'To‘g‘ri! 11, 12, 13, 14 sonlari alohida istisno bo‘lib, «процентов» shaklini oladi.'
    },
    {
      qRu: 'От глагола «улучшать» образуется существительное:',
      qUz: '«Улучшать» (yaxshilamoq) fe’lidan yasalgan ot so‘z:',
      options: [
        'Улучшение',
        'Улучшатель',
        'Улучшенный'
      ],
      correct: 0,
      expUz: 'To‘g‘ri! Улучшать ➔ улучшение (yaxshilanish).'
    }
  ];

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto text-left">
      {/* Lesson Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
              Bosqich {currentStep.id} / 11
            </span>
            <span className="text-xs text-amber-800 font-bold font-mono bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              +{currentStep.xpReward} XP
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentStep.titleRu}
          </h2>
          <p className="text-xs sm:text-sm text-purple-700 font-semibold mt-0.5">
            {currentStep.titleUz} — {currentStep.descriptionUz}
          </p>
        </div>

        {/* Next / Prev Step Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handlePrevStep}
            disabled={currentStepId === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 border border-slate-200 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Oldingi</span>
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepId === LESSON_STEPS.length}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:pointer-events-none text-white shadow-sm transition-all"
          >
            <span>Keyingi bosqich</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Steps Horizontal Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {LESSON_STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              stop();
              setCurrentStepId(s.id);
            }}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              s.id === currentStepId
                ? 'bg-purple-600 text-white shadow-sm font-bold border border-purple-500'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            {s.id}. {s.titleRu.replace(/^\d+\.\s*/, '')}
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 1-BOSQICH: ВВЕДЕНИЕ (Chuqur kirish va 4 asosiy qadriyat) */}
      {/* ======================================================== */}
      {currentStepId === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Mavzuning mohiyati: «О пользе чтения»</h3>
              <p className="text-xs text-slate-500">Kitob mutolaasining qudrati va inson tafakkuriga ko‘rsatadigan ta’siri</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 text-slate-800 leading-relaxed text-sm sm:text-base space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Вводное слово урока:
              </span>
              <button
                onClick={() => speak('Добро пожаловать в Академию русского языка! Чтение — это сложнейшая интеллектуальная тренировка, которая развивает мышление, улучшает память и обогащает словарный запас.')}
                className="p-1.5 rounded-lg bg-purple-200/60 text-purple-900 hover:bg-purple-200 flex items-center gap-1 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ovoz chiqarib o‘qish</span>
              </button>
            </div>
            <p>
              Добро пожаловать в Академию русского языка! Чтение — это не просто механический процесс складывания букв в слова. 
              Это сложнейшая интеллектуальная тренировка, активирующая миллиарды нейронов и открывающая двери к успеху в карьере и жизни.
            </p>
            <p className="text-purple-900 text-xs sm:text-sm font-semibold border-t border-purple-200/60 pt-2">
              Rus tili akademiyasiga xush kelibsiz! Kitob o‘qish shunchaki so‘zlarni ko‘zdan kechirish emas, balki miyaning barcha sohalarini rivojlantiruvchi, xotirani kuchaytiruvchi va muvaffaqiyat garovi bo‘lgan buyuk aqliy faoliyatdir.
            </p>
          </div>

          {/* 4 Core Values from Textbook Photo */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Darslikda ko‘rsatilgan mutolaaning 4 ta bosh foydasi:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-purple-900">1. Интеллектуальное развитие</h5>
                  <button onClick={() => speak('Интеллектуальное развитие: чтение тренирует память и стимулирует мышление.')} className="text-purple-700">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Aqliy rivojlanish:</strong> Har bir sahifa yangi ma’lumotlarni tahlil qilishga, solishtirishga va mantiqiy xulosalar chiqarishga o‘rgatadi.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-cyan-900">2. Обогащение словарного запаса</h5>
                  <button onClick={() => speak('Обогащение словарного запаса: книги учат грамотной и красивой речи.')} className="text-cyan-700">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>So‘z boyligini oshirish:</strong> Badiiy va ilmiy kitoblar inson nutqini boyitadi, so‘zlarni aniq va go‘zal ifodalash imkonini beradi.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-emerald-900">3. Эмпатия и понимание людей</h5>
                  <button onClick={() => speak('Развитие эмпатии: читающие люди лучше понимают чувства окружающих.')} className="text-emerald-700">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Hissiy aql (empatiya):</strong> Qahramonlarning kechinmalarini his qilish orqali kitobxonlar boshqa insonlar bilan osonroq umumiy til topadilar.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-amber-900">4. Снижение стресса и концентрация</h5>
                  <button onClick={() => speak('Снижение стресса: регулярное чтение успокаивает нервную систему.')} className="text-amber-700">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Stressni yengish:</strong> Tadqiqotlarga ko‘ra, kuniga 15 daqiqa mutolaa qilish asabiy zo‘riqishni 68% gacha kamaytiradi.
                </p>
              </div>
            </div>
          </div>

          {/* Quick confirmation check */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-950">
              Mavzuning kirish qismi tushunarlimi?
            </span>
            <button
              onClick={() => {
                setStep1Understood(true);
                addXP(10, 'step1-understood', true);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                step1Understood
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              {step1Understood ? '✓ Tushundim (+10 XP)' : 'Ha, tushundim'}
            </button>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>2-bosqich: Matnni o‘qishga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 2-BOSQICH: ЧТЕНИЕ И ЕГО ПОЛЬЗА (Matn 1-qism) */}
      {/* ======================================================== */}
      {currentStepId === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          {/* Audio Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              {!isSpeaking ? (
                <button
                  onClick={handleReadFullText}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Matnni to‘liq tinglash</span>
                </button>
              ) : (
                <>
                  {isPaused ? (
                    <button
                      onClick={resume}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Davom ettirish</span>
                    </button>
                  ) : (
                    <button
                      onClick={pause}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pauza</span>
                    </button>
                  )}
                  <button
                    onClick={stop}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>To‘xtatish</span>
                  </button>
                </>
              )}
            </div>

            {/* Toggle Uzbek Translations */}
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                showTranslations
                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {showTranslations ? 'Tarjimani yashirish' : 'O‘zbekcha tarjimani ko‘rsatish'}
            </button>
          </div>

          {/* Hint banner */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-900">
            <Info className="w-4 h-4 flex-shrink-0 text-cyan-600" />
            <span>
              Matndagi binafsha so‘zlarni bosing — to‘liq tarjima, grammatik izoh va audio ochiladi!
            </span>
          </div>

          {/* Sentences List (First 4 sentences) */}
          <div className="space-y-3.5">
            {MAIN_LESSON_TEXT.slice(0, 4).map((sentence, idx) => {
              const isCurrentPlaying = isSpeaking && activeSentenceIndex === idx;

              return (
                <div
                  key={sentence.id}
                  className={`p-5 rounded-2xl transition-all border ${
                    isCurrentPlaying
                      ? 'bg-purple-50 border-purple-400 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
                      {sentence.words.map((w, wIdx) => {
                        if (w.clickableWord && INTERACTIVE_WORDS_MAP[w.clickableWord]) {
                          const info = INTERACTIVE_WORDS_MAP[w.clickableWord];
                          return (
                            <button
                              key={wIdx}
                              onClick={() => openWordModal(info)}
                              className="inline-block text-purple-700 hover:text-purple-900 font-bold underline decoration-purple-300 decoration-2 underline-offset-4 hover:bg-purple-100 px-1 py-0.5 rounded transition-all cursor-pointer"
                              title={`${info.translation} (Bosing)`}
                            >
                              {w.text}
                            </button>
                          );
                        }
                        return <span key={wIdx}>{w.text}</span>;
                      })}
                    </div>

                    <button
                      onClick={() => speak(sentence.ru)}
                      className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex-shrink-0 transition-colors"
                      title="Ushbu gapni tinglash"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {showTranslations && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 font-normal italic border-t border-slate-100 pt-2">
                      {sentence.uz}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-100">
            <span className="text-xs text-slate-500">1-qism o‘qildimi?</span>
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>3-bosqich: Matn tahlili</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 3-BOSQICH: РАБОТА С ТЕКСТОМ (Matn 2-qism va Tahliliy Savollar) */}
      {/* ======================================================== */}
      {currentStepId === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Matnning davomi va chuqur tahlil (5–7 gaplar)
            </h3>
            <p className="text-xs text-slate-500">
              Matnni diqqat bilan o‘qib chiqing va quyidagi tahliliy savollarga javob bering:
            </p>
          </div>

          {/* Remaining Sentences */}
          <div className="space-y-3">
            {MAIN_LESSON_TEXT.slice(4).map((sentence) => (
              <div
                key={sentence.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
                    {sentence.words.map((w, wIdx) => {
                      if (w.clickableWord && INTERACTIVE_WORDS_MAP[w.clickableWord]) {
                        const info = INTERACTIVE_WORDS_MAP[w.clickableWord];
                        return (
                          <button
                            key={wIdx}
                            onClick={() => openWordModal(info)}
                            className="inline-block text-purple-700 hover:text-purple-900 font-bold underline decoration-purple-300 decoration-2 underline-offset-4 hover:bg-purple-100 px-1 py-0.5 rounded transition-all cursor-pointer"
                          >
                            {w.text}
                          </button>
                        );
                      }
                      return <span key={wIdx}>{w.text}</span>;
                    })}
                  </div>
                  <button
                    onClick={() => speak(sentence.ru)}
                    className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex-shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 italic border-t border-slate-100 pt-2">
                  {sentence.uz}
                </p>
              </div>
            ))}
          </div>

          {/* Comprehension Questions */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
              Matnni tushunishni tekshirish savollari:
            </h4>

            {[
              {
                id: 1,
                q: '1. Har kuni 15 daqiqa mutolaa qilish stressni necha foizga kamaytiradi?',
                opts: ['50%', '68%', '100%'],
                correct: 1,
                exp: 'To‘g‘ri! Matnda 68% gacha kamaytirishi ko‘rsatilgan.'
              },
              {
                id: 2,
                q: '2. Muvaffaqiyatli martaba qurish uchun matnda nimalar muhim deb ko‘rsatilgan?',
                opts: ['Yuksak bilim va chiroyli nutq', 'Faqat tez yugurish', 'Ko‘p uxlash'],
                correct: 0,
                exp: 'To‘g‘ri! Yuqori eruditsiya va fikrni chiroyli ifodalash juda muhim.'
              },
              {
                id: 3,
                q: '3. Yaxshi kitob o‘quvchiga qanday imkoniyat beradi?',
                opts: ['Noyob olamga sho‘ng‘ish va minglab hayotlarni kechirish', 'Hech narsa o‘ylamaslik', 'Vaqtni behuda sarflash'],
                correct: 0,
                exp: 'To‘g‘ri! Kitob o‘quvchiga cheksiz dunyolarni kashf etish imkonini taqdim etadi.'
              }
            ].map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-800">{item.q}</p>
                <div className="flex flex-wrap gap-2">
                  {item.opts.map((opt, oIdx) => {
                    const isSelected = step3Answers[item.id] === oIdx;
                    let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                    if (isSelected) cls = 'bg-purple-50 border-purple-400 text-purple-900 font-bold';
                    if (step3Checked) {
                      if (oIdx === item.correct) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      else if (isSelected) cls = 'bg-red-50 border-red-400 text-red-900';
                    }
                    return (
                      <button
                        key={oIdx}
                        onClick={() => {
                          if (!step3Checked) setStep3Answers((prev) => ({ ...prev, [item.id]: oIdx }));
                        }}
                        className={`px-4 py-2 rounded-xl text-xs border transition-all ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              {!step3Checked ? (
                <button
                  onClick={() => {
                    setStep3Checked(true);
                    addXP(20, 'step3-comprehension', true);
                  }}
                  disabled={Object.keys(step3Answers).length < 3}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs disabled:opacity-40 shadow-sm"
                >
                  Javoblarni tekshirish (+20 XP)
                </button>
              ) : (
                <p className="text-xs font-bold text-emerald-700">✓ Barcha tahlil savollari muvaffaqiyatli bajarildi!</p>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>4-bosqich: Yangi so‘zlar laboratoriyasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 4-BOSQICH: НОВЫЕ СЛОВА (Kategoriyalangan so'zlar) */}
      {/* ======================================================== */}
      {currentStepId === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Mavzuga oid yangi so‘zlar</h3>
              <p className="text-xs text-slate-500">Har bir so‘zni tinglang, tarjimasini ko‘ring va darslik lug‘atini boyiting:</p>
            </div>
            <button
              onClick={() => setActiveTab('dictionary')}
              className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200"
            >
              To‘liq lug‘at (27+ so‘z) ➔
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {DICTIONARY_DATA.slice(0, 9).map((word) => (
              <div
                key={word.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">{word.wordRu}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{word.transcription}</span>
                    </div>
                    <button
                      onClick={() => speak(word.wordRu)}
                      className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700"
                      title="Ovoz"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-purple-900 mt-2">«{word.wordUz}»</p>
                  <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-2">{word.exampleRu}</p>
                </div>

                <button
                  onClick={() => openWordModal({
                    word: word.wordRu,
                    lemma: word.id,
                    translation: word.wordUz,
                    explanation: `${word.partOfSpeech.toUpperCase()} — darslik leksikasi. Misol: ${word.exampleRu} (${word.exampleUz})`,
                    transcription: word.transcription,
                    partOfSpeech: word.partOfSpeech,
                    examples: [{ ru: word.exampleRu, uz: word.exampleUz }]
                  })}
                  className="w-full py-1.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-purple-700 text-[11px] font-bold border border-slate-200 text-center mt-3"
                >
                  Batafsil ma’lumot ➔
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>5-bosqich: Darslik grammatikasi (54-bet)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 5-BOSQICH: ГРАММАТИКА (54-bet: ДЛЯ vs ЧТОБЫ) */}
      {/* ======================================================== */}
      {currentStepId === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          {/* Authentic Rule 54 */}
          <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Запомните! (Darslik qoidasi, 54-bet)
              </span>
              <button
                onClick={() => speak(TEXTBOOK_RULE_1.formula)}
                className="p-1.5 rounded-lg bg-amber-200 text-amber-900 hover:bg-amber-300 flex items-center gap-1 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ovoz</span>
              </button>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              Для того чтобы выразить цель, в <strong>простом предложении</strong> используют предлог <strong>для + родительный падеж</strong>, а в <strong>сложном предложении</strong> — союзы <strong>чтобы, для того чтобы</strong>:
            </p>
            <div className="p-3 rounded-xl bg-white border border-amber-200 text-xs font-mono font-bold text-amber-950">
              Формула: {TEXTBOOK_RULE_1.formula}
            </div>
          </div>

          {/* 54-Mashq Amaliy Topshiriqlari (All 4 exercises) */}
          <div className="space-y-4">
            <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span>54-mashq: Oddiy gapni qo‘shma gapga aylantiring (barcha 4 ta topshiriq)</span>
            </h4>

            {TEXTBOOK_EXERCISES_54.map((ex) => {
              const selectedIdx = step5Answers[ex.id];
              const isChecked = step5Checked[ex.id];
              const isCorrect = selectedIdx !== undefined && ex.optionsRu[selectedIdx] === ex.correctAnswerRu;

              return (
                <div key={ex.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <p className="text-sm font-bold text-slate-900">
                    Oddiy gap: «{ex.simpleSentenceRu}»
                  </p>
                  <p className="text-xs text-slate-500 italic">Ma’nosi: {ex.simpleSentenceUz}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ex.optionsRu.map((opt, oIdx) => {
                      let btnCls = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';
                      if (selectedIdx === oIdx) btnCls = 'bg-purple-50 text-purple-900 border-purple-400 font-bold';
                      if (isChecked) {
                        if (opt === ex.correctAnswerRu) btnCls = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                        else if (selectedIdx === oIdx) btnCls = 'bg-red-50 text-red-900 border-red-400 line-through';
                      }
                      return (
                        <button
                          key={oIdx}
                          disabled={isChecked}
                          onClick={() => setStep5Answers((prev) => ({ ...prev, [ex.id]: oIdx }))}
                          className={`p-3 rounded-xl text-xs text-left border transition-all ${btnCls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {!isChecked ? (
                    <button
                      onClick={() => {
                        setStep5Checked((prev) => ({ ...prev, [ex.id]: true }));
                        if (ex.optionsRu[selectedIdx] === ex.correctAnswerRu) addXP(15, `step5-${ex.id}`, true);
                      }}
                      disabled={selectedIdx === undefined}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-40"
                    >
                      Tekshirish
                    </button>
                  ) : (
                    <p className={`text-xs font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isCorrect ? '✓ To‘g‘ri almashtirildi (+15 XP)!' : '✕ Noto‘g‘ri! Qoidani qayta o‘qing.'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>6-bosqich: Sonlar va foizlar (59-bet)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 6-BOSQICH: ЧИСЛИТЕЛЬНЫЕ И ПРОЦЕНТЫ (59-bet) */}
      {/* ======================================================== */}
      {currentStepId === 6 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          {/* Rule 59 */}
          <div className="p-6 rounded-3xl bg-cyan-50/80 border-2 border-cyan-300 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-950">
              Запомните! (Darslik qoidasi, 59-bet)
            </span>
            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              Вспомните, в какой форме стоят имена существительные после числительных. <strong>Обратите внимание на форму сказуемого!</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3.5 rounded-2xl bg-white border border-cyan-200 space-y-1">
                <span className="font-bold text-cyan-800">1, 21, 31, 41...</span>
                <p className="text-slate-700">И.п. ед.ч. + <u>читает</u> (ед.ч.):</p>
                <p className="font-semibold text-cyan-900 bg-cyan-50 p-1.5 rounded">31 процент россиян читает</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-cyan-200 space-y-1">
                <span className="font-bold text-purple-800">2, 3, 4, 22, 44...</span>
                <p className="text-slate-700">Р.п. ед.ч. + <u>читают</u> (мн.ч.):</p>
                <p className="font-semibold text-purple-900 bg-purple-50 p-1.5 rounded">22 процента россиян читают</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-cyan-200 space-y-1">
                <span className="font-bold text-emerald-800">5... 13... 100</span>
                <p className="text-slate-700">Р.п. мн.ч. + <u>читают</u> (мн.ч.):</p>
                <p className="font-semibold text-emerald-900 bg-emerald-50 p-1.5 rounded">13 процентов россиян читают</p>
              </div>
            </div>
            <p className="text-xs text-red-700 font-bold bg-white p-2.5 rounded-xl border border-red-200">
              ⚠️ DIQQAT: 11, 12, 13, 14 sonlari alohida istisno bo‘lib, «процентов» shaklini talab qiladi!
            </p>
          </div>

          {/* 3 Interactive Exercises */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900">
              Qoidalarni amalda qo‘llang (3 ta vazifa):
            </h4>

            {[
              {
                id: 1,
                sentence: '«31 [ ... ] россиян [ ... ] книги каждый день»',
                nounOptions: ['процент', 'процента', 'процентов'],
                correctNoun: 'процент',
                predOptions: ['читает', 'читают'],
                correctPred: 'читает',
                ruleUz: '31 oxiri «1» bo‘lgani uchun: процент + birlikdagi kesim (читает).'
              },
              {
                id: 2,
                sentence: '«44 [ ... ] россиян [ ... ] книги о спорте»',
                nounOptions: ['процент', 'процента', 'процентов'],
                correctNoun: 'процента',
                predOptions: ['читает', 'читают'],
                correctPred: 'читают',
                ruleUz: '44 oxiri «4» bo‘lgani uchun: процента + ko‘plikdagi kesim (читают).'
              },
              {
                id: 3,
                sentence: '«13 [ ... ] россиян [ ... ] классическую литературу»',
                nounOptions: ['процент', 'процента', 'процентов'],
                correctNoun: 'процентов',
                predOptions: ['читает', 'читают'],
                correctPred: 'читают',
                ruleUz: '13 soni 11–14 istisnosiga kirgani uchun: процентов + читают.'
              }
            ].map((q) => {
              const chosen = step6Answers[q.id];
              const isChecked = step6Checked[q.id];
              const isRight = chosen === q.correctNoun;

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <p className="text-sm font-bold text-slate-900">{q.sentence}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.nounOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setStep6Answers((prev) => ({ ...prev, [q.id]: opt }));
                          setStep6Checked((prev) => ({ ...prev, [q.id]: true }));
                          if (opt === q.correctNoun) addXP(15, `step6-${q.id}`, true);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          chosen === opt
                            ? opt === q.correctNoun
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                              : 'bg-red-50 border-red-400 text-red-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {isChecked && (
                    <p className={`text-xs font-bold ${isRight ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isRight ? `✓ To‘g‘ri! ${q.ruleUz}` : `✕ Noto‘g‘ri! ${q.ruleUz}`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>7-bosqich: To‘g‘ri talaffuz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 7-BOSQICH: ПРОИЗНОШЕНИЕ (Nutq va urg'ular) */}
      {/* ======================================================== */}
      {currentStepId === 7 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Talaffuz va fonetik mashg‘ulot</h3>
            <p className="text-xs text-slate-500">
              Quyidagi jumlalarni sekin (0.7x) yoki normal (1.0x) tezlikda tinglang va mikrofon orqali o‘z talaffuzingizni tekshiring:
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                ru: 'Чтение развивает память и воображение.',
                phon: '[чте́-ни-е  раз-ви-ва́-ет  па́-мять  и  во-об-ра-же́-ни-е]',
                uz: 'Kitob mutolaasi xotira va tasavvurni rivojlantiradi.'
              },
              {
                ru: 'Чтобы улучшить речь, нужно читать вслух.',
                phon: '[што́-бы  у-луч-шыть  речь,  ну́ж-на  чи-та́ть  вслух]',
                uz: 'Nutqni yaxshilash uchun ovoz chiqarib o‘qish kerak.'
              },
              {
                ru: 'Книги помогают нам получать новые знания.',
                phon: '[кни́-ги  па-ма-га́-ют  нам  па-лу-ча́ть  но́-вы-е  зна́-ни-я]',
                uz: 'Kitoblar bizga yangi bilimlarni olishga ko‘maklashadi.'
              },
              {
                ru: 'Для сохранения ясности ума нужно читать каждый день.',
                phon: '[для  сах-ра-не́-ни-я  я́с-нас-ти  у-ма́  ну́ж-на  чи-та́ть]',
                uz: 'Aql tiniqligini saqlash uchun har kuni o‘qish lozim.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-base text-slate-900">{item.ru}</h4>
                    <p className="text-xs font-mono text-purple-700 font-bold mt-0.5">{item.phon}</p>
                    <p className="text-xs text-slate-500 italic mt-1">{item.uz}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 pt-1 sm:pt-0">
                    <button
                      onClick={() => speak(item.ru, undefined, 0.7)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                      title="Sekin o‘qish"
                    >
                      0.7x
                    </button>
                    <button
                      onClick={() => speak(item.ru, undefined, 1.0)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-sm"
                      title="Normal tezlik"
                    >
                      1.0x
                    </button>
                    <button
                      onClick={() => handleStartVoiceCheck(item.ru)}
                      disabled={isListeningVoice}
                      className="p-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200"
                      title="Mikrofon orqali sinash"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {voiceFeedback && (
            <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs font-semibold text-cyan-950 space-y-1">
              <p>{voiceFeedback}</p>
              {recognizedVoiceText && (
                <p className="text-[11px] text-slate-600">
                  Tan olingan ovoz: <span className="font-bold text-slate-900">«{recognizedVoiceText}»</span>
                </p>
              )}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>8-bosqich: Tinglab tushunish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 8-BOSQICH: АУДИРОВАНИЕ (Eshitib tushunish) */}
      {/* ======================================================== */}
      {currentStepId === 8 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Eshitib tushunish laboratoriyasi</h3>
            <p className="text-xs text-slate-500">Audioni eshiting va savollarga to‘g‘ri javob bering:</p>
          </div>

          {[
            {
              id: 1,
              audio: 'Чтение не только развивает ум, но и помогает лучше понимать эмоции других людей. Читающие люди легче находят общий язык с окружающими.',
              question: '1. Tinglangan audioga ko‘ra, kitobxon insonlar nimani osonroq uddalaydilar?',
              options: [
                'Boshqalar bilan umumiy til topishni',
                'Mashinani tezroq haydashni',
                'Hech kim bilan gaplashmaslikni'
              ],
              correct: 0,
              exp: 'To‘g‘ri! Matnda kitobxonlar boshqalar bilan umumiy til topishi ta’kidlangan.'
            },
            {
              id: 2,
              audio: 'Чтобы улучшить память и речь, специалисты рекомендуют читать не менее пятнадцати минут в день.',
              question: '2. Xotira va nutqni yaxshilash uchun mutaxassislar kuniga qancha vaqt mutolaa qilishni tavsiya qiladilar?',
              options: [
                'Kamida 15 daqiqa',
                'Kamida 5 soat',
                'Haftada 1 daqiqa'
              ],
              correct: 0,
              exp: 'To‘g‘ri! Mutaxassislar kuniga kamida 15 daqiqa o‘qishni tavsiya qiladilar.'
            }
          ].map((item) => {
            const selected = step8Answers[item.id];
            const isChecked = step8Checked[item.id];

            return (
              <div key={item.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => speak(item.audio)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm inline-flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Audioni tinglash</span>
                  </button>
                  <span className="text-xs text-slate-500">Jumlani diqqat bilan eshiting</span>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-sm text-slate-900">{item.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {item.options.map((opt, oIdx) => {
                      const isChosen = selected === oIdx;
                      let cls = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';
                      if (isChosen) cls = 'bg-purple-50 border-purple-400 text-purple-900 font-bold';
                      if (isChecked) {
                        if (oIdx === item.correct) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        else if (isChosen) cls = 'bg-red-50 border-red-400 text-red-900';
                      }
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setStep8Answers((prev) => ({ ...prev, [item.id]: oIdx }));
                            setStep8Checked((prev) => ({ ...prev, [item.id]: true }));
                            if (oIdx === item.correct) addXP(15, `step8-${item.id}`, true);
                          }}
                          className={`p-3 rounded-xl text-xs text-left border transition-all ${cls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isChecked && (
                  <p className={`text-xs font-bold ${selected === item.correct ? 'text-emerald-700' : 'text-red-700'}`}>
                    {selected === item.correct ? `✓ ${item.exp}` : `✕ Noto‘g‘ri javob! ${item.exp}`}
                  </p>
                )}
              </div>
            );
          })}

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>9-bosqich: Interaktiv o‘yin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 9-BOSQICH: ИНТЕРАКТИВНЫЕ ИГРЫ (Mini o'yin) */}
      {/* ======================================================== */}
      {currentStepId === 9 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Mini O‘yin: So‘z va Tarjima juftligi</h3>
              <p className="text-xs text-slate-500">Ruscha so‘zni bosing va uning o‘zbekcha tarjimasini toping:</p>
            </div>
            <button
              onClick={() => setActiveTab('games')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Barcha 7 ta o‘yinni ochish</span>
            </button>
          </div>

          {/* 3 Pairs Matcher */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'p1-ru', match: 'p1', label: 'Чтение', lang: 'ru' },
              { id: 'p1-uz', match: 'p1', label: 'Mutolaa', lang: 'uz' },
              { id: 'p2-ru', match: 'p2', label: 'Память', lang: 'ru' },
              { id: 'p2-uz', match: 'p2', label: 'Xotira', lang: 'uz' },
              { id: 'p3-ru', match: 'p3', label: 'Развитие', lang: 'ru' },
              { id: 'p3-uz', match: 'p3', label: 'Rivojlanish', lang: 'uz' }
            ].map((c) => {
              const isMatched = step9Matched.includes(c.match);
              const isSelected = step9Selected === c.id;

              return (
                <button
                  key={c.id}
                  disabled={isMatched}
                  onClick={() => {
                    if (c.lang === 'ru') speak(c.label);
                    if (!step9Selected) {
                      setStep9Selected(c.id);
                    } else {
                      const prevCard = [
                        { id: 'p1-ru', match: 'p1' }, { id: 'p1-uz', match: 'p1' },
                        { id: 'p2-ru', match: 'p2' }, { id: 'p2-uz', match: 'p2' },
                        { id: 'p3-ru', match: 'p3' }, { id: 'p3-uz', match: 'p3' }
                      ].find((x) => x.id === step9Selected);

                      if (prevCard && prevCard.match === c.match && prevCard.id !== c.id) {
                        setStep9Matched((prev) => [...prev, c.match]);
                        addXP(15, `mini-game-${c.match}`, true);
                      }
                      setStep9Selected(null);
                    }
                  }}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all h-20 flex items-center justify-center text-center shadow-sm ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                      : isSelected
                      ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold scale-105'
                      : 'bg-white border-slate-200 hover:border-purple-300 text-slate-800'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {step9Matched.length === 3 && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-900 font-bold text-xs">
              🎉 Ajoyib! Barcha mini-juftliklar topildi (+45 XP)!
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>10-bosqich: Dars testi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 10-BOSQICH: ИТОГОВЫЙ ТЕСТ (Dars ekspress testi - 5 savol) */}
      {/* ======================================================== */}
      {currentStepId === 10 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Dars yakuni bo‘yicha 5 ta test savoli</h3>
              <p className="text-xs text-slate-500">Mavzuni to‘liq o‘zlashtirganingizni sinab ko‘ring:</p>
            </div>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200"
            >
              Katta test (32 savol) ➔
            </button>
          </div>

          <div className="space-y-4">
            {miniQuizQuestions.map((q, qIdx) => {
              const selected = step10Answers[qIdx];
              return (
                <div key={qIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-sm text-slate-900">{q.qRu}</p>
                  <p className="text-xs text-slate-500 italic">{q.qUz}</p>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      let cls = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';
                      if (selected === oIdx) cls = 'bg-purple-50 border-purple-400 text-purple-900 font-bold';
                      if (step10Submitted) {
                        if (oIdx === q.correct) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        else if (selected === oIdx) cls = 'bg-red-50 border-red-400 text-red-900';
                      }
                      return (
                        <button
                          key={oIdx}
                          disabled={step10Submitted}
                          onClick={() => setStep10Answers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                          className={`p-3 rounded-xl text-xs text-left border transition-all ${cls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {step10Submitted && (
                    <p className="text-[11px] text-slate-600 pt-1">{q.expUz}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            {!step10Submitted ? (
              <button
                onClick={() => {
                  setStep10Submitted(true);
                  addXP(40, 'step10-quiz', true);
                }}
                disabled={Object.keys(step10Answers).length < 5}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs disabled:opacity-40 shadow-sm"
              >
                Testni yakunlash (+40 XP)
              </button>
            ) : (
              <p className="text-xs font-bold text-emerald-700">✓ Test yakunlandi! Natija saqlandi.</p>
            )}

            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-cyan-600 hover:bg-cyan-500 shadow-sm"
            >
              <span>11-bosqich: Dars xulosasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 11-BOSQICH: ИТОГИ УРОКА (Yakuniy Xulosa) */}
      {/* ======================================================== */}
      {currentStepId === 11 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto border border-purple-200 shadow-sm">
            <Trophy className="w-8 h-8 text-amber-500 animate-bounce" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Tabriklaymiz! «О пользе чтения» darsi to‘liq o‘zlashtirildi!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Siz barcha 11 ta bosqichni muvaffaqiyatli tugatib, yuqori natijaga erishdingiz.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Главный вывод урока:
              </span>
              <button
                onClick={() => speak('Чтение — один из лучших способов развивать память, мышление, речь и воображение. Книги помогают нам получать знания, становиться грамотнее и лучше понимать окружающий мир.')}
                className="p-1.5 rounded-lg bg-purple-100 text-purple-800 hover:bg-purple-200 flex items-center gap-1 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ovoz</span>
              </button>
            </div>
            <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed font-sans">
              «Чтение — один из лучших способов развивать память, мышление, речь и воображение. Книги помогают нам получать знания, становиться грамотнее и лучше понимать окружающий мир».
            </p>
            <p className="text-xs sm:text-sm text-slate-600 italic border-t border-slate-200 pt-2">
              «Kitob o‘qish — xotira, fikrlash, nutq va tasavvurni rivojlantirishning eng yaxshi usullaridan biridir. Kitoblar bizga bilim olishga, savodliroq bo‘lishga va atrofimizdagi olamni yaxshiroq tushunishga yordam beradi».
            </p>
          </div>

          {/* User Score Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">To‘plangan XP</p>
              <p className="text-2xl font-black text-purple-700 font-mono mt-1">{xp} XP</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Daraja</p>
              <p className="text-base font-bold text-slate-900 mt-1">{userLevel}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
              <p className="text-xs text-slate-500 font-medium">Holat</p>
              <p className="text-base font-bold text-emerald-700 mt-1">100% Tugallandi</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setCurrentStepId(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200"
            >
              Darsni qayta takrorlash
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm"
            >
              7 ta o‘quv o‘yinini o‘ynash
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm"
            >
              Xulosa diplomini ko‘rish
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
