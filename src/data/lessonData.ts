import type { InteractiveWord, LessonStep } from '../types';

export const LESSON_STEPS: LessonStep[] = [
  {
    id: 1,
    slug: 'intro',
    titleRu: '1. Введение',
    titleUz: '1. Kirish',
    descriptionRu: 'Знакомство с темой урока: почему книги меняют наш мозг и жизнь.',
    descriptionUz: 'Dars mavzusi bilan tanishuv: nega kitoblar miyamiz va hayotimizni o‘zgartiradi.',
    estimatedMinutes: 3,
    xpReward: 15
  },
  {
    id: 2,
    slug: 'text-reading',
    titleRu: '2. Чтение и его польза',
    titleUz: '2. O‘qish va uning foydasi',
    descriptionRu: 'Основной текст урока с синхронным аудио и переводом.',
    descriptionUz: 'Sinxron audio va tarjimaga ega asosiy dars matni.',
    estimatedMinutes: 5,
    xpReward: 25
  },
  {
    id: 3,
    slug: 'text-work',
    titleRu: '3. Работа с текстом',
    titleUz: '3. Matn bilan ishlash',
    descriptionRu: 'Анализ предложений, поиск ключевых мыслей и интерактивные вопросы.',
    descriptionUz: 'Gaplarni tahlil qilish, asosiy fikrlarni topish va savollar.',
    estimatedMinutes: 4,
    xpReward: 20
  },
  {
    id: 4,
    slug: 'vocab',
    titleRu: '4. Новые слова',
    titleUz: '4. Yangi so‘zlar',
    descriptionRu: 'Ключевая лексика по теме чтения с карточками и аудио.',
    descriptionUz: 'Kartochkalar va audio orqali kitob o‘qish mavzusidagi yangi so‘zlar.',
    estimatedMinutes: 5,
    xpReward: 25
  },
  {
    id: 5,
    slug: 'grammar',
    titleRu: '5. Грамматика',
    titleUz: '5. Grammatika',
    descriptionRu: 'Целевые конструкции «чтобы», отглагольные существительные и падежи.',
    descriptionUz: '«Чтобы» maqsad birikmasi, fe’ldan yasalgan otlar va kelishiklar.',
    estimatedMinutes: 8,
    xpReward: 35
  },
  {
    id: 6,
    slug: 'numbers',
    titleRu: '6. Числительные и проценты',
    titleUz: '6. Sonlar va foizlar',
    descriptionRu: 'Правила согласования числительных и процентов с существительными.',
    descriptionUz: 'Son va foizlarning otlar bilan grammatik moslashuv qoidalari.',
    estimatedMinutes: 6,
    xpReward: 25
  },
  {
    id: 7,
    slug: 'pronunciation',
    titleRu: '7. Произношение',
    titleUz: '7. Talaffuz',
    descriptionRu: 'Отработка интонации, ударений и беглости русской речи.',
    descriptionUz: 'Ruscha nutqning ohangi, urg‘ulari va ravonligini mashq qilish.',
    estimatedMinutes: 5,
    xpReward: 20
  },
  {
    id: 8,
    slug: 'listening',
    titleRu: '8. Аудирование',
    titleUz: '8. Tinglab tushunish',
    descriptionRu: 'Восприятие русской речи на слух с проверкой понимания.',
    descriptionUz: 'Ruscha nutqni eshitib tushunish va savollarga javob berish.',
    estimatedMinutes: 6,
    xpReward: 30
  },
  {
    id: 9,
    slug: 'games',
    titleRu: '9. Интерактивные игры',
    titleUz: '9. Interaktiv o‘yinlar',
    descriptionRu: '7 увлекательных тренажёров для закрепления материала.',
    descriptionUz: 'Mavzuni mustahkamlash uchun 7 ta qiziqarli o‘yin-mashq.',
    estimatedMinutes: 8,
    xpReward: 40
  },
  {
    id: 10,
    slug: 'final-quiz',
    titleRu: '10. Итоговый тест',
    titleUz: '10. Yakuniy test',
    descriptionRu: 'Контрольная проверка знаний из 15 случайных вопросов.',
    descriptionUz: '15 ta tasodifiy savoldan iborat yakuniy bilim sinovi.',
    estimatedMinutes: 7,
    xpReward: 50
  },
  {
    id: 11,
    slug: 'summary',
    titleRu: '11. Итоги урока',
    titleUz: '11. Dars xulosasi',
    descriptionRu: 'Финальный вывод о силе чтения, сертификация и результаты.',
    descriptionUz: 'Kitob o‘qish kuchi haqida yakuniy xulosa va natijalar.',
    estimatedMinutes: 2,
    xpReward: 20
  }
];

export interface TextSentence {
  id: number;
  ru: string;
  uz: string;
  words: {
    text: string;
    clickableWord?: string;
  }[];
}

export const MAIN_LESSON_TEXT: TextSentence[] = [
  {
    id: 1,
    ru: 'Чтение — один из лучших способов развивать память, мышление, речь и воображение.',
    uz: 'Kitob o‘qish — xotira, fikrlash, nutq va tasavvurni rivojlantirishning eng yaxshi usullaridan biridir.',
    words: [
      { text: 'Чтение', clickableWord: 'Чтение' },
      { text: ' — один из лучших способов ' },
      { text: 'развивать', clickableWord: 'Развивать' },
      { text: ' ' },
      { text: 'память', clickableWord: 'Память' },
      { text: ', мышление, речь и ' },
      { text: 'воображение', clickableWord: 'Воображение' },
      { text: '.' }
    ]
  },
  {
    id: 2,
    ru: 'Когда мы читаем книги регулярно и вдумчиво, наш мозг активно строит новые нейронные связи.',
    uz: 'Biz kitoblarni muntazam va chuqur fikr yuritib o‘qiganimizda, miyamiz faol ravishda yangi neyron aloqalarini hosil qiladi.',
    words: [
      { text: 'Когда мы читаем книги ' },
      { text: 'регулярно', clickableWord: 'Регулярно' },
      { text: ' и ' },
      { text: 'вдумчиво', clickableWord: 'Вдумчиво' },
      { text: ', наш мозг активно строит новые нейронные связи.' }
    ]
  },
  {
    id: 3,
    ru: 'Книги помогают нам получать знания, становиться грамотнее и лучше понимать окружающий мир.',
    uz: 'Kitoblar bizga bilim olishga, savodliroq bo‘lishga va atrofimizdagi olamni yaxshiroq anglashga yordam beradi.',
    words: [
      { text: 'Книги ' },
      { text: 'помогают', clickableWord: 'Помощь' },
      { text: ' нам получать знания, становиться ' },
      { text: 'грамотнее', clickableWord: 'Эрудиция' },
      { text: ' и лучше понимать окружающий мир.' }
    ]
  },
  {
    id: 4,
    ru: 'Учёные выяснили, что даже 15 минут ежедневного чтения снижают уровень стресса на 68 процентов.',
    uz: 'Olimlar aniqlashicha, har kungi atigi 15 daqiqa o‘qish ham stress darajasini 68 foizga pasaytiradi.',
    words: [
      { text: 'Учёные ' },
      { text: 'выяснили', clickableWord: 'Выяснить' },
      { text: ', что даже 15 минут ежедневного чтения снижают уровень стресса на ' },
      { text: '68 процентов', clickableWord: 'Проценты' },
      { text: '.' }
    ]
  },
  {
    id: 5,
    ru: 'Чтобы улучшить память и обогатить словарный запас, человеку необходимо читать разнообразную литературу.',
    uz: 'Xotirani yaxshilash va so‘z boyligini oshirish uchun inson turli xil adabiyotlarni o‘qishi zarur.',
    words: [
      { text: 'Чтобы', clickableWord: 'Чтобы' },
      { text: ' ' },
      { text: 'улучшить', clickableWord: 'Улучшение' },
      { text: ' память и обогатить ' },
      { text: 'словарный запас', clickableWord: 'Словарный запас' },
      { text: ', человеку необходимо читать разнообразную литературу.' }
    ]
  },
  {
    id: 6,
    ru: 'Для того чтобы построить успешную карьеру, важны высокая эрудиция и умение красиво выражать свои мысли.',
    uz: 'Muvaffaqiyatli martaba qurish uchun yuksak bilim va o‘z fikrlarini chiroyli bayon qila olish muhimdir.',
    words: [
      { text: 'Для того чтобы', clickableWord: 'Чтобы' },
      { text: ' построить ' },
      { text: 'успешную', clickableWord: 'Успешный' },
      { text: ' ' },
      { text: 'карьеру', clickableWord: 'Карьера' },
      { text: ', важны высокая ' },
      { text: 'эрудиция', clickableWord: 'Эрудиция' },
      { text: ' и умение красиво выражать свои мысли.' }
    ]
  },
  {
    id: 7,
    ru: 'Хорошая книга позволяет читателю погрузиться в уникальный мир и пережить тысячи жизней.',
    uz: 'Yaxshi kitob o‘quvchiga noyob olamga sho‘ng‘ish va minglab turmushlarni yashab o‘tish imkonini beradi.',
    words: [
      { text: 'Хорошая книга позволяет читателю ' },
      { text: 'погрузиться', clickableWord: 'Погрузиться' },
      { text: ' в уникальный мир и пережить тысячи жизней.' }
    ]
  }
];

export const INTERACTIVE_WORDS_MAP: Record<string, InteractiveWord> = {
  'Чтение': {
    word: 'Чтение',
    lemma: 'чтение',
    translation: 'O‘qish, mutolaa',
    explanation: 'Отглагольное существительное среднего рода от глагола «читать». Означает процесс восприятия письменного текста.',
    transcription: '[чте́-ни-е]',
    partOfSpeech: 'существительное (ср.р.)',
    examples: [
      { ru: 'Утреннее чтение дарит вдохновение.', uz: 'Ertalabki mutolaa ilhom bag‘ishlaydi.' },
      { ru: 'Чтение — лучшее учение.', uz: 'O‘qish — eng yaxshi ta’lim.' }
    ]
  },
  'Развивать': {
    word: 'Развивать',
    lemma: 'развивать',
    translation: 'Rivojlantirmoq, o‘stirmoq',
    explanation: 'Глагол несовершенного вида, I спряжения. Обозначает процесс качественного улучшения навыков.',
    transcription: '[раз-ви-ва́ть]',
    partOfSpeech: 'глагол (I спр.)',
    examples: [
      { ru: 'Мы должны развивать свои способности.', uz: 'Biz o‘z qobiliyatlarimizni rivojlantirishimiz kerak.' },
      { ru: 'Спорт развивает выносливость.', uz: 'Sport chidamlilikni rivojlantiradi.' }
    ]
  },
  'Память': {
    word: 'Память',
    lemma: 'память',
    translation: 'Xotira',
    explanation: 'Существительное женского рода, 3-го склонения. Способность сохранять и воспроизводить информацию.',
    transcription: '[па́-мять]',
    partOfSpeech: 'существительное (ж.р., 3-е скл.)',
    examples: [
      { ru: 'У него великолепная зрительная память.', uz: 'Unda ajoyib ko‘rish xotirasi bor.' },
      { ru: 'Тренировка укрепляет память.', uz: 'Mashg‘ulot xotirani mustahkamlaydi.' }
    ]
  },
  'Воображение': {
    word: 'Воображение',
    lemma: 'воображение',
    translation: 'Tasavvur, xayolot',
    explanation: 'Существительное среднего рода на -ие. Способность мысленно создавать образы.',
    transcription: '[во-об-ра-же́-ни-е]',
    partOfSpeech: 'существительное (ср.р.)',
    examples: [
      { ru: 'Книги будят наше воображение.', uz: 'Kitoblar tasavvurimizni uyg‘otadi.' }
    ]
  },
  'Регулярно': {
    word: 'Регулярно',
    lemma: 'регулярно',
    translation: 'Muntazam ravishda, doimiy',
    explanation: 'Наречие образа действия. Отвечает на вопрос «как?». Означает систематическое повторение.',
    transcription: '[ре-гу-ля́р-но]',
    partOfSpeech: 'наречие',
    examples: [
      { ru: 'Он регулярно делает зарядку.', uz: 'U muntazam badantarbiya qiladi.' }
    ]
  },
  'Вдумчиво': {
    word: 'Вдумчиво',
    lemma: 'вдумчиво',
    translation: 'Chuqur fikrlab, diqqat bilan',
    explanation: 'Наречие, образованное от прилагательного «вдумчивый». Означает внимательное и глубокое осмысление.',
    transcription: '[вду́м-чи-во]',
    partOfSpeech: 'наречие',
    examples: [
      { ru: 'Она вдумчиво читала каждую строку.', uz: 'U har bir satrni chuqur o‘ylab o‘qirdi.' }
    ]
  },
  'Помощь': {
    word: 'Помощь (помогать)',
    lemma: 'помощь',
    translation: 'Yordam (yordam bermoq)',
    explanation: 'Существительное женского рода (3-е склонение). Связано с глаголом «помогать».',
    transcription: '[по́-мощь]',
    partOfSpeech: 'существительное (ж.р.)',
    examples: [
      { ru: 'Спасибо за своевременную помощь.', uz: 'O‘z vaqtidagi yordam uchun rahmat.' }
    ]
  },
  'Выяснить': {
    word: 'Выяснить',
    lemma: 'выяснить',
    translation: 'Aniqlamoq, oydinlik kiritmoq',
    explanation: 'Глагол совершенного вида, II спряжения. Сделать ясным, понятным или узнать точные факты.',
    transcription: '[вы́-яс-нить]',
    partOfSpeech: 'глагол (соверш. вид)',
    examples: [
      { ru: 'Нам удалось выяснить причину.', uz: 'Bizga sababni aniqlash nasib qildi.' }
    ]
  },
  'Проценты': {
    word: 'Проценты',
    lemma: 'процент',
    translation: 'Foizlar',
    explanation: '1 процент, 2-4 процента, 5-20 процентов, 11-14 процентов (исключение).',
    transcription: '[про-це́н-ты]',
    partOfSpeech: 'числовая конструкция',
    examples: [
      { ru: 'На 68 процентов (Родительный падеж мн. числа после числа 8).', uz: '68 foizga.' }
    ]
  },
  'Чтобы': {
    word: 'Чтобы / Для того чтобы',
    lemma: 'чтобы',
    translation: '...uchun, maqsadida',
    explanation: 'Целевой подчинительный союз. Служит для выражения цели действия. После него используется инфинитив или прошедшее время.',
    transcription: '[что́-бы] (произносится [што́бы])',
    partOfSpeech: 'союз цели',
    examples: [
      { ru: 'Чтобы хорошо знать язык, нужно практиковаться каждый день.', uz: 'Tilni yaxshi bilish uchun har kuni amaliyot qilish kerak.' }
    ]
  },
  'Улучшение': {
    word: 'Улучшить (улучшение)',
    lemma: 'улучшение',
    translation: 'Yaxshilamoq (yaxshilanish)',
    explanation: 'Отглагольное существительное: улучшать/улучшить -> улучшение.',
    transcription: '[у-луч-ше́-ни-е]',
    partOfSpeech: 'существительное',
    examples: [
      { ru: 'Улучшение произношения заметно уже через неделю.', uz: 'Talaffuzning yaxshilanishi bir haftadanoq seziladi.' }
    ]
  },
  'Словарный запас': {
    word: 'Словарный запас',
    lemma: 'словарный запас',
    translation: 'Lug‘at boyligi (so‘z boyligi)',
    explanation: 'Устойчивое словосочетание: прилагательное + существительное. Означает совокупность слов, которыми владеет человек.',
    transcription: '[сло-ва́р-ный за-па́с]',
    partOfSpeech: 'словосочетание',
    examples: [
      { ru: 'Чтение расширяет активный словарный запас.', uz: 'Kitob mutolaasi faol so‘z boyligini kengaytiradi.' }
    ]
  },
  'Успешный': {
    word: 'Успешный',
    lemma: 'успешный',
    translation: 'Muvaffaqiyatli, omadli',
    explanation: 'Качественное прилагательное мужского рода. Связано со словом «успех».',
    transcription: '[ус-пе́ш-ный]',
    partOfSpeech: 'прилагательное',
    examples: [
      { ru: 'Успешный студент много читает.', uz: 'Muvaffaqiyatli talaba ko‘p o‘qiydi.' }
    ]
  },
  'Карьера': {
    word: 'Карьера',
    lemma: 'карьера',
    translation: 'Karyera, xizmat pog‘onasi',
    explanation: 'Существительное женского рода 1-го склонения. Успешное продвижение в профессии.',
    transcription: '[карь-е́-ра]',
    partOfSpeech: 'существительное (ж.р.)',
    examples: [
      { ru: 'Его карьера стремительно развивается.', uz: 'Uning faoliyati shiddat bilan rivojlanmoqda.' }
    ]
  },
  'Эрудиция': {
    word: 'Эрудиция',
    lemma: 'эрудиция',
    translation: 'Eruditsiya, teran bilimdonlik',
    explanation: 'Существительное женского рода на -ия. Глубокие и разносторонние познания.',
    transcription: '[э-ру-ди́-ци-я]',
    partOfSpeech: 'существительное (ж.р.)',
    examples: [
      { ru: 'Его эрудиция поразила всех присутствующих.', uz: 'Uning bilimdonligi yig‘ilganlarning barchasini hayratda qoldirdi.' }
    ]
  },
  'Погрузиться': {
    word: 'Погрузиться',
    lemma: 'погрузиться',
    translation: 'Sho‘ng‘imoq, butunlay berilmoq',
    explanation: 'Возвратный глагол совершенного вида, II спряжения. Переносное значение: полностью уйти в чтение или мысли.',
    transcription: '[по-гру-зи́ть-ся]',
    partOfSpeech: 'возвратный глагол',
    examples: [
      { ru: 'Погрузиться в чтение с головой.', uz: 'Kitob o‘qishga butun vujudi bilan berilib ketmoq.' }
    ]
  }
};
