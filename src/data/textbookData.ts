export interface TextbookRule {
  id: string;
  sourceLabel: string;
  titleRu: string;
  titleUz: string;
  ruleBoxRu: string;
  ruleBoxUz: string;
  formula: string;
  examples: {
    simpleRu: string;
    complexRu: string;
    translationUz: string;
  }[];
}

export interface SentenceTransformExercise {
  id: string;
  number: number;
  simpleSentenceRu: string;
  simpleSentenceUz: string;
  targetVerb: string;
  optionsRu: string[];
  correctAnswerRu: string;
  explanationUz: string;
}

export interface NumberAgreementExercise {
  id: string;
  ruleCategory: '1, 21, 31...' | '2, 3, 4, 22, 33, 44, 52...' | '5, 6... 10... 13... 100';
  sentenceTemplateRu: string;
  translationUz: string;
  number: number;
  nounForm: string;
  predicateFormRu: string; // читает yoki читают
  fullSentenceRu: string;
  nounOptionsRu: string[];
  correctNounIndex: number;
  predicateOptionsRu: string[];
  correctPredicateIndex: number;
  grammaticalReasonUz: string;
}

// 1-RASMDAGI QOIDALAR VA 54-MASHQ
export const TEXTBOOK_RULE_1: TextbookRule = {
  id: 'tb-rule-1',
  sourceLabel: 'Учебник: Правило на стр. 54',
  titleRu: 'Для + Родительный падеж vs Чтобы / Для того чтобы',
  titleUz: 'Oddiy gapda «ДЛЯ», qo‘shma gapda «ЧТОБЫ / ДЛЯ ТОГО ЧТОБЫ»',
  ruleBoxRu: `Запомните!
Для того чтобы выразить цель, в простом предложении используют предлог ДЛЯ + родительный падеж, а в сложном предложении — союзы ЧТОБЫ, ДЛЯ ТОГО ЧТОБЫ:
• Для сохранения ясности ума нужно постоянно тренировать свой мозг. (Простое предложение: ДЛЯ + отглагольное существительное в Р.п.)
=
• Чтобы сохранить ясность ума, нужно постоянно тренировать свой мозг. (Сложноподчинённое предложение: ЧТОБЫ + инфинитив глагола)`,
  ruleBoxUz: `Eslab qoling!
Maqsadni ifodalash uchun oddiy gapda «ДЛЯ + qaratqich kelishigi (Родительный падеж)» qo‘llaniladi, qo‘shma gapda esa «ЧТОБЫ» yoki «ДЛЯ ТОГО ЧТОБЫ» bog‘lovchilari ishlatiladi:
• Для сохранения ясности ума... (Ong tiniqligini saqlash uchun... — Ot bilan)
=
• Чтобы сохранить ясность ума... (Ong tiniqligini saqlab qolish uchun... — Fe’l bilan).
Eslatma: Qo‘shma gaplarda bog‘lovchidan oldin doimo vergul qo‘yiladi!`,
  formula: 'Простое: ДЛЯ + [Существительное в Р.п.]  ⟺  Сложное: ЧТОБЫ / ДЛЯ ТОГО ЧТОБЫ + [Инфинитив]',
  examples: [
    {
      simpleRu: 'Для сохранения ясности ума нужно тренировать мозг.',
      complexRu: 'Чтобы сохранить ясность ума, нужно тренировать мозг.',
      translationUz: 'Ong tiniqligini saqlash uchun miyani mashq qildirish kerak.'
    },
    {
      simpleRu: 'Для увеличения словарного запаса нужно читать книги.',
      complexRu: 'Для того чтобы увеличить словарный запас, нужно читать книги.',
      translationUz: 'So‘z boyligini oshirish uchun kitob o‘qish zarur.'
    }
  ]
};

// 1-RASMDAGI 54-MASHQ (TO‘LIQ 4 TA TOPSHIRIQ)
export const TEXTBOOK_EXERCISES_54: SentenceTransformExercise[] = [
  {
    id: 'ex-54-1',
    number: 1,
    simpleSentenceRu: 'Для увеличения словарного запаса нужно больше читать.',
    simpleSentenceUz: 'So‘z boyligini oshirish uchun ko‘proq o‘qish kerak.',
    targetVerb: 'увеличить',
    optionsRu: [
      'Чтобы увеличить словарный запас, нужно больше читать.',
      'Для увеличить словарный запас, нужно больше читать.',
      'Что увеличить словарный запас нужно больше читать.',
      'Для увеличения словарный запас, нужно больше читать.'
    ],
    correctAnswerRu: 'Чтобы увеличить словарный запас, нужно больше читать.',
    explanationUz: 'To‘g‘ri: «Для увеличения» (ot) fe’lli murakkab gapga aylanganda «Чтобы увеличить...» bo‘ladi va vergul qo‘yiladi.'
  },
  {
    id: 'ex-54-2',
    number: 2,
    simpleSentenceRu: 'Для познания мира и самого себя человеку надо много читать.',
    simpleSentenceUz: 'Dunyo va o‘zligini anglash uchun insonga ko‘p o‘qish lozim.',
    targetVerb: 'познать',
    optionsRu: [
      'Для познать мир и самого себя, человеку надо много читать.',
      'Чтобы познать мир и самого себя, человеку надо много читать.',
      'Человеку надо много читать для познания мир.',
      'Что познать мир и самого себя человеку надо много читать.'
    ],
    correctAnswerRu: 'Чтобы познать мир и самого себя, человеку надо много читать.',
    explanationUz: 'To‘g‘ri: «Для познания» (ot) ➔ «Чтобы познать...» (fe’l) shakliga o‘tadi.'
  },
  {
    id: 'ex-54-3',
    number: 3,
    simpleSentenceRu: 'Для развития навыков красивой речи школьники должны читать книги хороших писателей.',
    simpleSentenceUz: 'Chiroyli nutq ko‘nikmalarini rivojlantirish uchun o‘quvchilar yaxshi yozuvchilarning kitoblarini o‘qishlari shart.',
    targetVerb: 'развить / развивать',
    optionsRu: [
      'Для развить навыки красивой речи, школьники должны читать книги.',
      'Чтобы развить навыки красивой речи, школьники должны читать книги хороших писателей.',
      'Школьники должны читать книги для развитие красивой речи.',
      'Чтобы развивать навыки красивой речи школьники должны читать.'
    ],
    correctAnswerRu: 'Чтобы развить навыки красивой речи, школьники должны читать книги хороших писателей.',
    explanationUz: 'To‘g‘ri: «Для развития» ➔ «Чтобы развить...». Bog‘lovchidan keyin vergul qat’iy qo‘yiladi!'
  },
  {
    id: 'ex-54-4',
    number: 4,
    simpleSentenceRu: 'Для развития памяти полезно учить стихи.',
    simpleSentenceUz: 'Xotirani rivojlantirish uchun she’r yodlash foydali.',
    targetVerb: 'развивать',
    optionsRu: [
      'Для развивать память полезно учить стихи.',
      'Чтобы развивать память, полезно учить стихи.',
      'Что развивать память, полезно учить стихи.',
      'Для того развитие памяти, полезно учить стихи.'
    ],
    correctAnswerRu: 'Чтобы развивать память, полезно учить стихи.',
    explanationUz: 'To‘g‘ri: «Для развития памяти» ➔ «Чтобы развивать память, ...».'
  }
];

// 2-RASMDAGI QOIDALAR VA STATISTIK FOIZLAR (59-QOIDA)
export const TEXTBOOK_RULE_2: TextbookRule = {
  id: 'tb-rule-2',
  sourceLabel: 'Учебник: Запомните на стр. 59',
  titleRu: 'Числительные, проценты и форма сказуемого (читает vs читают)',
  titleUz: 'Sonlar, foizlar va kesimning birlik/ko‘plikda moslashuvi',
  ruleBoxRu: `Запомните!
Вспомните, в какой форме стоят имена существительные после числительных. Обратите внимание на форму сказуемого!

1. 1, 21, 31... существительное в именительном падеже единственного числа + сказуемое в единственном числе:
   • 31 процент россиян читает книги для детей. (31 процент — ед.ч. ➔ ЧИТАЕТ)

2. 2, 3, 4, 22, 33, 44, 52... существительное в родительном падеже единственного числа + сказуемое во множественном числе:
   • 22 процента россиян читают женские детективы. (22 процента ➔ ЧИТАЮТ)

3. 5, 6... 10... 13... 100 существительное в родительном падеже множественного числа + сказуемое во множественном числе:
   • 13 процентов россиян читают книги о красоте и здоровье. (13 процентов ➔ ЧИТАЮТ)`,
  ruleBoxUz: `Eslab qoling!
Sonlardan keyin otlarning shakliga va ayniqsa KESIMNING (fe’lning) shakliga e’tibor bering:

1. 1, 21, 31... (oxiri 1 bilan tugaganlar, 11 dan tashqari):
   Ot birlik bosh kelishikda bo‘ladi, kesim ham BIRLIKDA bo‘ladi!
   • 31 процент россиян читает книги для детей. (31 foiz bolalar kitobini o‘qiydi — читает!)

2. 2, 3, 4, 22, 33, 44, 52... (oxiri 2, 3, 4):
   Ot birlik qaratqich kelishigida bo‘ladi, kesim esa KO‘PLIKDA bo‘ladi!
   • 22 процента россиян читают женские детективы. (22 foiz... o‘qiydilar — читают!)

3. 5–20 (shu jumladan 11–14 istisno!), 25, 100...:
   Ot ko‘plik qaratqich kelishigida bo‘ladi, kesim KO‘PLIKDA bo‘ladi!
   • 13 процентов россиян читают книги о красоте и здоровье. (13 foiz... o‘qiydilar — читают!)`,
  formula: '...1 процент + глагол в ЕД.Ч. (-ет/-ит)  |  ...2-4 процента / ...5-20 процентов + глагол во МН.Ч. (-ут/-ят)',
  examples: [
    {
      simpleRu: '31 процент россиян читает книги для детей.',
      complexRu: '1, 21, 31... ➔ И.п. ед.ч. (процент) + ед.ч. глагола (читает)',
      translationUz: 'Rossiyaliklarning 31 foizi bolalar uchun kitoblarni o‘qiydi.'
    },
    {
      simpleRu: '22 процента россиян читают женские детективы.',
      complexRu: '2, 3, 4, 22... ➔ Р.п. ед.ч. (процента) + мн.ч. глагола (читают)',
      translationUz: 'Rossiyaliklarning 22 foizi ayollar detektivlarini o‘qiydilar.'
    },
    {
      simpleRu: '13 процентов россиян читают книги о красоте и здоровье.',
      complexRu: '5... 13... 100 ➔ Р.п. мн.ч. (процентов) + мн.ч. глагола (читают)',
      translationUz: 'Rossiyaliklarning 13 foizi go‘zallik va salomatlik haqidagi kitoblarni o‘qiydilar.'
    }
  ]
};

// 2-RASMDAGI FOIZLAR VA KESIM MOSLASHUVI BO‘YICHA INTERAKTIV TOPSHIRIQLAR
export const TEXTBOOK_EXERCISES_59: NumberAgreementExercise[] = [
  {
    id: 'ex-59-1',
    ruleCategory: '1, 21, 31...',
    number: 31,
    sentenceTemplateRu: '31 [процент...] россиян [читает/читают] книги для детей.',
    translationUz: 'Rossiyaliklarning 31 foizi bolalar kitoblarini o‘qiydi.',
    nounForm: 'процент',
    predicateFormRu: 'читает',
    fullSentenceRu: '31 процент россиян читает книги для детей.',
    nounOptionsRu: ['процент', 'процента', 'процентов'],
    correctNounIndex: 0,
    predicateOptionsRu: ['читает (ед.ч.)', 'читают (мн.ч.)'],
    correctPredicateIndex: 0,
    grammaticalReasonUz: '31 soni 1 bilan tugaganligi sababli ot «процент» (birlik bosh kelishik), kesim esa birlikda «читает» bo‘ladi!'
  },
  {
    id: 'ex-59-2',
    ruleCategory: '2, 3, 4, 22, 33, 44, 52...',
    number: 22,
    sentenceTemplateRu: '22 [процент...] россиян [читает/читают] женские детективы.',
    translationUz: 'Rossiyaliklarning 22 foizi ayollar detektivlarini o‘qiydilar.',
    nounForm: 'процента',
    predicateFormRu: 'читают',
    fullSentenceRu: '22 процента россиян читают женские детективы.',
    nounOptionsRu: ['процент', 'процента', 'процентов'],
    correctNounIndex: 1,
    predicateOptionsRu: ['читает (ед.ч.)', 'читают (мн.ч.)'],
    correctPredicateIndex: 1,
    grammaticalReasonUz: '22 soni 2 bilan tugaydi ➔ «процента» (qaratqich birlik), kesim esa ko‘plikda «читают» bo‘ladi!'
  },
  {
    id: 'ex-59-3',
    ruleCategory: '5, 6... 10... 13... 100',
    number: 13,
    sentenceTemplateRu: '13 [процент...] россиян [читает/читают] книги о красоте и здоровье.',
    translationUz: 'Rossiyaliklarning 13 foizi go‘zallik va salomatlik kitoblarini o‘qiydilar.',
    nounForm: 'процентов',
    predicateFormRu: 'читают',
    fullSentenceRu: '13 процентов россиян читают книги о красоте и здоровье.',
    nounOptionsRu: ['процент', 'процента', 'процентов'],
    correctNounIndex: 2,
    predicateOptionsRu: ['читает (ед.ч.)', 'читают (мн.ч.)'],
    correctPredicateIndex: 1,
    grammaticalReasonUz: '13 soni 11–14 istisno guruhiga kiradi ➔ «процентов» (qaratqich ko‘plik), kesim «читают»!'
  },
  {
    id: 'ex-59-4',
    ruleCategory: '1, 21, 31...',
    number: 21,
    sentenceTemplateRu: '21 [процент...] студентов регулярно [посещает/посещают] библиотеку.',
    translationUz: 'Talabalarning 21 foizi muntazam kutubxonaga tashrif buyuradi.',
    nounForm: 'процент',
    predicateFormRu: 'посещает',
    fullSentenceRu: '21 процент студентов регулярно посещает библиотеку.',
    nounOptionsRu: ['процент', 'процента', 'процентов'],
    correctNounIndex: 0,
    predicateOptionsRu: ['посещает (ед.ч.)', 'посещают (мн.ч.)'],
    correctPredicateIndex: 0,
    grammaticalReasonUz: '21 oxiri 1 ➔ «процент», kesim birlikda «посещает».'
  },
  {
    id: 'ex-59-5',
    ruleCategory: '2, 3, 4, 22, 33, 44, 52...',
    number: 44,
    sentenceTemplateRu: '44 [процент...] опрошенных [предпочитает/предпочитают] электронные книги.',
    translationUz: 'So‘ralganlarning 44 foizi elektron kitoblarni afzal ko‘radilar.',
    nounForm: 'процента',
    predicateFormRu: 'предпочитают',
    fullSentenceRu: '44 процента опрошенных предпочитают электронные книги.',
    nounOptionsRu: ['процент', 'процента', 'процентов'],
    correctNounIndex: 1,
    predicateOptionsRu: ['предпочитает (ед.ч.)', 'предпочитают (мн.ч.)'],
    correctPredicateIndex: 1,
    grammaticalReasonUz: '44 oxiri 4 ➔ «процента», kesim ko‘plikda «предпочитают».'
  }
];

// Darslikdagi mutolaa madaniyati taqqoslovi (Kitob o‘qiydigan va o‘qimaydigan inson xususiyatlari)
export const TEXTBOOK_COMPARISONS_READING = {
  titleRu: 'Почему чтение формирует успешного человека? (Из учебника)',
  titleUz: 'Nima uchun kitob o‘qish muvaffaqiyatli shaxsni shakllantiradi?',
  bookReader: {
    titleRu: 'Человек читающий (Kitobxon shaxs)',
    points: [
      'Чтение учит рассуждать и глубоко анализировать факты',
      'Основа успешности в школе, университете и взрослой жизни',
      'Развивает воображение и творческие способности',
      'Повышает общую грамотность и развивает навыки красивой речи',
      'Общителен, уверен в себе, легко находит общий язык с людьми'
    ]
  },
  nonReader: {
    titleRu: 'Человек нечитающий (Kitob o‘qimaydigan shaxs)',
    points: [
      'Мало знает, его мир ограничен лишь непосредственно увиденным',
      'Сложно развиваться, учиться и получать качественное образование',
      'Испытывает нехватку словарного запаса при общении',
      'Часто не уверен в себе и своих силах перед публикой',
      'Труднее адаптируется к современным изменениям в карьере'
    ]
  }
};
