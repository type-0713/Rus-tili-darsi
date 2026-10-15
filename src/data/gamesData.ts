export interface MatchPair {
  id: string;
  ru: string;
  uz: string;
}

export interface SentencePuzzle {
  id: string;
  targetSentenceRu: string;
  translationUz: string;
  scrambledWords: string[];
  acceptableVariants?: string[];
}

export interface PartOfSpeechItem {
  id: string;
  wordRu: string;
  wordUz: string;
  type: 'verb' | 'noun';
}

export interface PercentageChallengeItem {
  id: string;
  number: number;
  options: string[];
  correctText: string;
  ruleHintUz: string;
}

export interface CaseTrainerItem {
  id: string;
  sentenceWithBlankRu: string;
  sentenceUz: string;
  missingWordBase: string;
  targetCaseName: string;
  options: string[];
  correctAnswer: string;
  explanationUz: string;
}

export interface AudioGameItem {
  id: string;
  audioPromptRu: string;
  questionUz: string;
  optionsRu: string[];
  correctIndex: number;
  explanationUz: string;
}

export interface BattleQuestion {
  id: string;
  questionRu: string;
  questionUz: string;
  options: string[];
  correctIndex: number;
  points: number;
}

// 1. Найди перевод juftliklari
export const MATCH_PAIRS_POOL: MatchPair[] = [
  { id: 'm1', ru: 'Чтение', uz: 'Kitob o‘qish' },
  { id: 'm2', ru: 'Память', uz: 'Xotira' },
  { id: 'm3', ru: 'Воображение', uz: 'Tasavvur' },
  { id: 'm4', ru: 'Развитие', uz: 'Rivojlanish' },
  { id: 'm5', ru: 'Словарный запас', uz: 'So‘z boyligi' },
  { id: 'm6', ru: 'Улучшение', uz: 'Yaxshilanish' },
  { id: 'm7', ru: 'Успешный', uz: 'Muvaffaqiyatli' },
  { id: 'm8', ru: 'Вдумчиво', uz: 'Fikr yuritib' },
  { id: 'm9', ru: 'Эрудиция', uz: 'Keng bilim' },
  { id: 'm10', ru: 'Помощь', uz: 'Yordam' },
  { id: 'm11', ru: 'Выяснить', uz: 'Aniqlamoq' },
  { id: 'm12', ru: 'Сохранить', uz: 'Saqlamoq' }
];

// 2. Собери предложение
export const SENTENCE_PUZZLES: SentencePuzzle[] = [
  {
    id: 'sp-1',
    targetSentenceRu: 'Чтение развивает память и воображение',
    translationUz: 'Kitob mutolaasi xotira va tasavvurni rivojlantiradi',
    scrambledWords: ['память', 'Чтение', 'воображение', 'развивает', 'и'],
    acceptableVariants: [
      'Чтение развивает память и воображение',
      'Чтение развивает воображение и память'
    ]
  },
  {
    id: 'sp-2',
    targetSentenceRu: 'Чтобы улучшить память нужно читать книги',
    translationUz: 'Xotirani yaxshilash uchun kitob o‘qish kerak',
    scrambledWords: ['книги', 'Чтобы', 'улучшить', 'читать', 'память', 'нужно'],
    acceptableVariants: [
      'Чтобы улучшить память нужно читать книги',
      'Нужно читать книги чтобы улучшить память'
    ]
  },
  {
    id: 'sp-3',
    targetSentenceRu: 'Мы читаем регулярно и вдумчиво каждый день',
    translationUz: 'Biz har kuni muntazam va chuqur o‘ylab o‘qiymiz',
    scrambledWords: ['день', 'регулярно', 'Мы', 'читаем', 'каждый', 'и', 'вдумчиво'],
    acceptableVariants: [
      'Мы читаем регулярно и вдумчиво каждый день',
      'Мы читаем вдумчиво и регулярно каждый день',
      'Мы каждый день читаем регулярно и вдумчиво'
    ]
  },
  {
    id: 'sp-4',
    targetSentenceRu: 'Книги помогают нам получать новые знания',
    translationUz: 'Kitoblar bizga yangi bilimlarni olishga yordam beradi',
    scrambledWords: ['получать', 'помогают', 'Книги', 'знания', 'нам', 'новые'],
    acceptableVariants: [
      'Книги помогают нам получать новые знания'
    ]
  },
  {
    id: 'sp-5',
    targetSentenceRu: 'Успешные люди читают книги очень часто',
    translationUz: 'Muvaffaqiyatli odamlar kitoblarni juda tez-tez o‘qiydilar',
    scrambledWords: ['читают', 'Успешные', 'очень', 'книги', 'люди', 'часто'],
    acceptableVariants: [
      'Успешные люди читают книги очень часто',
      'Успешные люди очень часто читают книги'
    ]
  }
];

// 3. Глагол или существительное?
export const PARTS_OF_SPEECH_ITEMS: PartOfSpeechItem[] = [
  { id: 'pos-1', wordRu: 'Развивать', wordUz: 'Rivojlantirmoq', type: 'verb' },
  { id: 'pos-2', wordRu: 'Развитие', wordUz: 'Rivojlanish', type: 'noun' },
  { id: 'pos-3', wordRu: 'Улучшать', wordUz: 'Yaxshilamoq', type: 'verb' },
  { id: 'pos-4', wordRu: 'Улучшение', wordUz: 'Yaxshilanish', type: 'noun' },
  { id: 'pos-5', wordRu: 'Изучать', wordUz: 'O‘rganmoq', type: 'verb' },
  { id: 'pos-6', wordRu: 'Изучение', wordUz: 'O‘rganish', type: 'noun' },
  { id: 'pos-7', wordRu: 'Управлять', wordUz: 'Boshqarmoq', type: 'verb' },
  { id: 'pos-8', wordRu: 'Управление', wordUz: 'Boshqaruv', type: 'noun' },
  { id: 'pos-9', wordRu: 'Достигать', wordUz: 'Erishmoq', type: 'verb' },
  { id: 'pos-10', wordRu: 'Достижение', wordUz: 'Yutuq', type: 'noun' },
  { id: 'pos-11', wordRu: 'Помогать', wordUz: 'Yordam bermoq', type: 'verb' },
  { id: 'pos-12', wordRu: 'Помощь', wordUz: 'Yordam', type: 'noun' },
  { id: 'pos-13', wordRu: 'Защищать', wordUz: 'Himoya qilmoq', type: 'verb' },
  { id: 'pos-14', wordRu: 'Защита', wordUz: 'Himoya', type: 'noun' },
  { id: 'pos-15', wordRu: 'Воображать', wordUz: 'Tasavvur qilmoq', type: 'verb' },
  { id: 'pos-16', wordRu: 'Воображение', wordUz: 'Tasavvur', type: 'noun' }
];

// 4. Процентный вызов
export const PERCENTAGE_CHALLENGES: PercentageChallengeItem[] = [
  {
    id: 'pc-1',
    number: 1,
    options: ['1 процент', '1 процента', '1 процентов'],
    correctText: '1 процент',
    ruleHintUz: '1 soni (va oxiri 1 bo‘lgan sonlar, 11 dan tashqari) ➔ «процент»'
  },
  {
    id: 'pc-2',
    number: 4,
    options: ['4 процент', '4 процента', '4 процентов'],
    correctText: '4 процента',
    ruleHintUz: '2, 3, 4 sonlari ➔ «процента»'
  },
  {
    id: 'pc-3',
    number: 5,
    options: ['5 процент', '5 процента', '5 процентов'],
    correctText: '5 процентов',
    ruleHintUz: '5–20 sonlari ➔ «процентов»'
  },
  {
    id: 'pc-4',
    number: 11,
    options: ['11 процент', '11 процента', '11 процентов'],
    correctText: '11 процентов',
    ruleHintUz: '11–14 sonlari alohida istisno guruhi ➔ faqat «процентов»!'
  },
  {
    id: 'pc-5',
    number: 14,
    options: ['14 процент', '14 процента', '14 процентов'],
    correctText: '14 процентов',
    ruleHintUz: '14 soni 11–14 istisnosiga kiradi ➔ «процентов»'
  },
  {
    id: 'pc-6',
    number: 21,
    options: ['21 процент', '21 процента', '21 процентов'],
    correctText: '21 процент',
    ruleHintUz: '21 oxiri 1 bilan tugaydi ➔ «процент»'
  },
  {
    id: 'pc-7',
    number: 22,
    options: ['22 процент', '22 процента', '22 процентов'],
    correctText: '22 процента',
    ruleHintUz: '22 oxiri 2 bilan tugaydi ➔ «процента»'
  },
  {
    id: 'pc-8',
    number: 25,
    options: ['25 процент', '25 процента', '25 процентов'],
    correctText: '25 процентов',
    ruleHintUz: '25 oxiri 5 bilan tugaydi ➔ «процентов»'
  },
  {
    id: 'pc-9',
    number: 44,
    options: ['44 процент', '44 процента', '44 процентов'],
    correctText: '44 процента',
    ruleHintUz: '44 oxiri 4 bilan tugaydi ➔ «процента»'
  },
  {
    id: 'pc-10',
    number: 52,
    options: ['52 процент', '52 процента', '52 процентов'],
    correctText: '52 процента',
    ruleHintUz: '52 oxiri 2 bilan tugaydi ➔ «процента»'
  },
  {
    id: 'pc-11',
    number: 100,
    options: ['100 процент', '100 процента', '100 процентов'],
    correctText: '100 процентов',
    ruleHintUz: '100 soni ➔ «процентов»'
  }
];

// 5. Падежный тренажёр
export const CASE_TRAINER_ITEMS: CaseTrainerItem[] = [
  {
    id: 'ct-1',
    sentenceWithBlankRu: 'Я каждый вечер читаю интересную ________.',
    sentenceUz: 'Men har oqshom qiziqarli kitobni o‘qiyman.',
    missingWordBase: 'книга',
    targetCaseName: 'Винительный падеж (кого? что?)',
    options: ['книга', 'книгу', 'книги', 'книгой'],
    correctAnswer: 'книгу',
    explanationUz: 'Harakat bevosita kitobga qaratilgan (oqimoq nimani?), ayol jinsi uchun -у qo‘shimchasi (книгу).'
  },
  {
    id: 'ct-2',
    sentenceWithBlankRu: 'В новой библиотеке совсем нет этой ________.',
    sentenceUz: 'Yangi kutubxonada bu kitob mutlaqo yo‘q.',
    missingWordBase: 'книга',
    targetCaseName: 'Родительный падеж (кого? чего?)',
    options: ['книга', 'книги', 'книгу', 'книге'],
    correctAnswer: 'книги',
    explanationUz: '«Нет» so‘zidan keyin har doim qaratqich kelishigi (Родительный падеж) qo‘yiladi: нет (чего?) книги.'
  },
  {
    id: 'ct-3',
    sentenceWithBlankRu: 'Ученики долго говорили об этом сложном ________.',
    sentenceUz: 'O‘quvchilar bu murakkab matn haqida uzoq gaplashdilar.',
    missingWordBase: 'текст',
    targetCaseName: 'Предложный падеж (о ком? о чём?)',
    options: ['текст', 'текста', 'тексту', 'тексте'],
    correctAnswer: 'тексте',
    explanationUz: '«О ком? О чём?» so‘rog‘i Предложный kelishigiga tegishli: о тексте (-е).'
  },
  {
    id: 'ct-4',
    sentenceWithBlankRu: 'Он пишет новую заметку простой ________.',
    sentenceUz: 'U yangi qaydni oddiy ruchka bilan yozmoqda.',
    missingWordBase: 'ручка',
    targetCaseName: 'Творительный падеж (кем? чем?)',
    options: ['ручка', 'ручку', 'ручкой', 'ручке'],
    correctAnswer: 'ручкой',
    explanationUz: 'Harakat vositasi/quroli (nima bilan?) Творительный падежда -ой bo‘ladi: ручкой.'
  },
  {
    id: 'ct-5',
    sentenceWithBlankRu: 'Учитель объяснил правило нашему новому ________.',
    sentenceUz: 'O‘qituvchi yangi o‘quvchimizga qoidani tushuntirdi.',
    missingWordBase: 'ученик',
    targetCaseName: 'Дательный падеж (кому? чему?)',
    options: ['ученик', 'ученика', 'ученику', 'учеником'],
    correctAnswer: 'ученику',
    explanationUz: 'Harakat yo‘naltirilgan shaxs (kimga?) Дательный падежда -у oladi: ученику.'
  }
];

// 6. Послушай и ответь
export const AUDIO_GAME_ITEMS: AudioGameItem[] = [
  {
    id: 'ag-1',
    audioPromptRu: 'Регулярное чтение вдумчиво тренирует память человека.',
    questionUz: 'Eshitilgan jumlada kitob o‘qish nimani mashq qildirishi aytildi?',
    optionsRu: ['Мышцы ног', 'Память человека', 'Скорость бега', 'Зрение'],
    correctIndex: 1,
    explanationUz: 'Jumlada «тренирует память человека» (inson xotirasini mashq qildiradi) deyilgan.'
  },
  {
    id: 'ag-2',
    audioPromptRu: 'Чтобы достичь успеха, нужно ежедневно обогащать словарный запас.',
    questionUz: 'Muvaffaqiyatga erishish uchun har kuni nimani boyitish kerak?',
    optionsRu: ['Кошелёк', 'Словарный запас', 'Компьютерные игры', 'Социальные сети'],
    correctIndex: 1,
    explanationUz: '«...обогащать словарный запас» (so‘z boyligini boyitish) to‘g‘ri javob.'
  },
  {
    id: 'ag-3',
    audioPromptRu: 'На книжной полке стоят ровно двадцать две книги.',
    questionUz: 'Javonda aniq nechta kitob turibdi?',
    optionsRu: ['12 книг', '20 книг', '22 книги', '25 книг'],
    correctIndex: 2,
    explanationUz: 'Ovozda «двадцать две книги» (22 ta kitob) deb aytildi.'
  },
  {
    id: 'ag-4',
    audioPromptRu: 'Чтение снижает уровень стресса на шестьдесят восемь процентов.',
    questionUz: 'Mutolaa stress darajasini necha foizga pasaytiradi?',
    optionsRu: ['На 15 процентов', 'На 50 процентов', 'На 68 процентов', 'На 80 процентов'],
    correctIndex: 2,
    explanationUz: '«...на шестьдесят восемь процентов» (68 foizga).'
  }
];

// 7. Битва знаний
export const BATTLE_QUESTIONS: BattleQuestion[] = [
  {
    id: 'bq-1',
    questionRu: 'Выберите отглагольное существительное к слову «изучать»:',
    questionUz: '«Изучать» so‘ziga mos otni tanlang:',
    options: ['Изученный', 'Изучение', 'Изучатель', 'Изучать'],
    correctIndex: 1,
    points: 15
  },
  {
    id: 'bq-2',
    questionRu: 'Как правильно сказать: 14 ...?',
    questionUz: '14 sonidan keyin qaysi so‘z to‘g‘ri keladi?',
    options: ['книга', 'книги', 'книг', 'книгам'],
    correctIndex: 2,
    points: 15
  },
  {
    id: 'bq-3',
    questionRu: 'Какой союз выражает цель действия?',
    questionUz: 'Harakat maqsadini qaysi bog‘lovchi ifodalaydi?',
    options: ['Потому что', 'Чтобы', 'Хотя', 'Так как'],
    correctIndex: 1,
    points: 15
  },
  {
    id: 'bq-4',
    questionRu: 'К какому роду относится слово «память»?',
    questionUz: '«Память» so‘zi qaysi jinsga tegishli?',
    options: ['Мужской', 'Женский', 'Средний', 'Общий'],
    correctIndex: 1,
    points: 15
  },
  {
    id: 'bq-5',
    questionRu: 'Как правильно: «на 44 ...»?',
    questionUz: '44 sonidan keyin to‘g‘ri shaklni toping:',
    options: ['процент', 'процента', 'процентов', 'процентах'],
    correctIndex: 1,
    points: 15
  },
  {
    id: 'bq-6',
    questionRu: 'В каком падеже стоит слово в предложении: «Я горжусь книгой»?',
    questionUz: '«Я горжусь книгой» gapida «книгой» qaysi kelishikda?',
    options: ['Именительный', 'Винительный', 'Творительный', 'Дательный'],
    correctIndex: 2,
    points: 15
  },
  {
    id: 'bq-7',
    questionRu: 'Что означает слово «вдумчиво»?',
    questionUz: '«Вдумчиво» so‘zining ma’nosi nima?',
    options: ['Tezda', 'Chuqur fikr yuritib', 'Baland ovozda', 'Kechqurun'],
    correctIndex: 1,
    points: 15
  },
  {
    id: 'bq-8',
    questionRu: 'Какое окончание пишется в слове «Мы чита...м»?',
    questionUz: '«Мы чита...м» so‘zida qaysi harf tushib qolgan?',
    options: ['-и-', '-е-', '-я-', '-а-'],
    correctIndex: 1,
    points: 15
  }
];
