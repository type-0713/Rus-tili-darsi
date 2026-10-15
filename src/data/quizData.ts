import type { QuizQuestion } from '../types';

export const QUIZ_BANK: QuizQuestion[] = [
  // 1. Matn mazmuni
  {
    id: 'q-1',
    category: 'Текст',
    questionRu: 'Согласно тексту урока, сколько минут ежедневного чтения снижают уровень стресса на 68%?',
    questionUz: 'Dars matniga ko‘ra, har kungi necha daqiqa o‘qish stressni 68% ga kamaytiradi?',
    optionsRu: ['5 минут', '15 минут', '45 минут', '60 минут'],
    correctIndex: 1,
    explanationRu: 'В тексте сказано: «даже 15 минут ежедневного чтения снижают уровень стресса на 68 процентов».',
    explanationUz: 'Matnda keltirilgan: har kungi atigi 15 daqiqa mutolaa stressni 68 foizga pasaytiradi.'
  },
  {
    id: 'q-2',
    category: 'Текст',
    questionRu: 'Что активно строит наш мозг, когда мы читаем регулярно и вдумчиво?',
    questionUz: 'Biz muntazam va fikr yuritib o‘qiganimizda, miyamiz nimani faol quradi?',
    optionsRu: ['Мышечные волокна', 'Новые нейронные связи', 'Сложные формулы', 'Защитные барьеры'],
    correctIndex: 1,
    explanationRu: '«...наш мозг активно строит новые нейронные связи».',
    explanationUz: 'Matnda ko‘rsatilgan: miyamiz yangi neyron aloqalarini shakllantiradi.'
  },
  {
    id: 'q-3',
    category: 'Текст',
    questionRu: 'Чтение — один из лучших способов развивать...',
    questionUz: 'Kitob o‘qish nimalarni rivojlantirishning eng yaxshi usulidir?',
    optionsRu: [
      'только скорость речи',
      'память, мышление, речь и воображение',
      'физическую силу',
      'компьютерную грамотность'
    ],
    correctIndex: 1,
    explanationRu: 'Чтение развивает память, мышление, речь и воображение.',
    explanationUz: 'Matnning birinchi jumlasiga ko‘ra: xotira, fikrlash, nutq va tasavvurni rivojlantiradi.'
  },
  {
    id: 'q-4',
    category: 'Текст',
    questionRu: 'Для чего человеку необходимо читать разнообразную литературу?',
    questionUz: 'Inson nima uchun turli xil adabiyotlarni o‘qishi zarur?',
    optionsRu: [
      'Чтобы просто провести свободное время',
      'Чтобы улучшить память и обогатить словарный запас',
      'Чтобы меньше общаться с окружающими',
      'Чтобы быстрее заснуть'
    ],
    correctIndex: 1,
    explanationRu: 'В тексте: «Чтобы улучшить память и обогатить словарный запас...».',
    explanationUz: 'Xotirani yaxshilash va so‘z boyligini oshirish uchun.'
  },

  // 2. Lug'at
  {
    id: 'q-5',
    category: 'Словарь',
    questionRu: 'Что означает слово «вдумчиво» на узбекском языке?',
    questionUz: '«Вдумчиво» so‘zi o‘zbek tilida nima ma’noni bildiradi?',
    optionsRu: ['Tez va shoshilib', 'Chuqur fikr yuritib, o‘ylab', 'Baland ovozda', 'Ko‘zlarni yumib'],
    correctIndex: 1,
    explanationRu: 'Вдумчиво — fikr yuritib, chuqur mulohaza qilib.',
    explanationUz: '«Вдумчиво» — shoshilmasdan, har bir ma’noga e’tibor berib, chuqur fikr yuritib deganidir.'
  },
  {
    id: 'q-6',
    category: 'Словарь',
    questionRu: 'Какое слово переводится как «aniqlamoq, bilib olmoq»?',
    questionUz: 'Qaysi so‘z «aniqlamoq, bilib olmoq» deb tarjima qilinadi?',
    optionsRu: ['Выяснить', 'Сохранить', 'Погрузиться', 'Управлять'],
    correctIndex: 0,
    explanationRu: 'Выяснить = Aniqlamoq, oydinlashtirmoq.',
    explanationUz: 'To‘g‘ri javob: «Выяснить» (aniqlamoq).'
  },
  {
    id: 'q-7',
    category: 'Словарь',
    questionRu: 'Выберите перевод словосочетания «словарный запас»:',
    questionUz: '«Словарный запас» iborasining tarjimasini tanlang:',
    optionsRu: ['Lug‘at kitobi', 'So‘z boyligi', 'Yangi qoida', 'Katta kutubxona'],
    correctIndex: 1,
    explanationRu: 'Словарный запас — это совокупность слов, которыми владеет человек (so‘z boyligi).',
    explanationUz: '«Словарный запас» inson egallagan barcha so‘zlar boyligini bildiradi.'
  },
  {
    id: 'q-8',
    category: 'Словарь',
    questionRu: 'Какое значение имеет слово «эрудиция»?',
    questionUz: '«Эрудиция» so‘zining ma’nosi nima?',
    optionsRu: ['Jismoniy chaqqonlik', 'Keng bilimdonlik, teran aql', 'Boylik', 'Tez o‘qish mahorati'],
    correctIndex: 1,
    explanationRu: 'Эрудиция — глубокие, всесторонние познания в различных областях.',
    explanationUz: '«Эрудиция» — turli sohalardagi chuqur va keng bilimdonlik.'
  },
  {
    id: 'q-9',
    category: 'Словарь',
    questionRu: 'Как переводится глагол «погрузиться» в контексте чтения?',
    questionUz: 'Mutolaa mazmunida «погрузиться» fe’li qanday tarjima qilinadi?',
    optionsRu: ['Cho‘kib ketmoq', 'Sho‘ng‘imoq, butunlay berilib ketmoq', 'Suzib yurmoq', 'Uxlab qolmoq'],
    correctIndex: 1,
    explanationRu: 'Погрузиться в чтение — kitob mutolaasiga butun vujudi bilan berilib ketmoq.',
    explanationUz: 'Ko‘chma ma’noda: kitob dunyosiga butunlay sho‘ng‘imoq.'
  },

  // 3. Grammatika («чтобы», «для того чтобы»)
  {
    id: 'q-10',
    category: 'Грамматика',
    questionRu: 'Какой союз используется для выражения цели действия?',
    questionUz: 'Harakat maqsadini ifodalash uchun qaysi bog‘lovchi ishlatiladi?',
    optionsRu: ['Потому что', 'Чтобы', 'Если', 'Когда'],
    correctIndex: 1,
    explanationRu: 'Союз «чтобы» (для того чтобы) выражает цель действия.',
    explanationUz: '«Чтобы» maqsad bildiradi: kitob o‘qish uchun (чтобы читать).'
  },
  {
    id: 'q-11',
    category: 'Грамматика',
    questionRu: 'Какое предложение построено грамматически ПРАВИЛЬНО?',
    questionUz: 'Qaysi gap grammatik jihatdan TO‘G‘RI tuzilgan?',
    optionsRu: [
      'Я читаю книги для улучшить память.',
      'Я читаю книги, чтобы улучшить память.',
      'Я читаю книги что улучшить память.',
      'Я читаю книги, для того улучшить память.'
    ],
    correctIndex: 1,
    explanationRu: 'Правильно: «..., чтобы улучшить память». Конструкция «для + инфинитив» в русском языке ошибочна.',
    explanationUz: 'Rus tilida «для» predlogidan keyin fe’l kelmaydi. Faqat «чтобы» ishlatiladi!'
  },
  {
    id: 'q-12',
    category: 'Грамматика',
    questionRu: 'Что ставится перед союзом «чтобы» в сложноподчинённом предложении?',
    questionUz: 'Qo‘shma gapda «чтобы» bog‘lovchisidan oldin qanday tinish belgisi qo‘yiladi?',
    optionsRu: ['Двоеточие', 'Запятая', 'Тире', 'Точка с запятой'],
    correctIndex: 1,
    explanationRu: 'Перед союзом «чтобы» всегда ставится запятая.',
    explanationUz: '«Чтобы» bog‘lovchisidan oldin har doim vergul qo‘yiladi.'
  },

  // 4. Fe'l va ot
  {
    id: 'q-13',
    category: 'Части речи',
    questionRu: 'Какое отглагольное существительное образуется от глагола «развивать»?',
    questionUz: '«Развивать» fe’lidan qaysi ot yasaladi?',
    optionsRu: ['Развитый', 'Развитие', 'Развивающий', 'Развиватель'],
    correctIndex: 1,
    explanationRu: 'Развивать ➔ развитие (ср. род).',
    explanationUz: 'Rivojlantirmoq ➔ rivojlanish (развитие).'
  },
  {
    id: 'q-14',
    category: 'Части речи',
    questionRu: 'Какое существительное соответствует глаголу «улучшать»?',
    questionUz: '«Улучшать» fe’liga qaysi ot mos keladi?',
    optionsRu: ['Улучшенный', 'Улучшение', 'Улучшатель', 'Лучший'],
    correctIndex: 1,
    explanationRu: 'Улучшать ➔ улучшение.',
    explanationUz: 'Yaxshilamoq ➔ yaxshilanish (улучшение).'
  },
  {
    id: 'q-15',
    category: 'Части речи',
    questionRu: 'От какого глагола образовано существительное «достижение»?',
    questionUz: '«Достижение» oti qaysi fe’ldan yasalgan?',
    optionsRu: ['Доставать', 'Достигать', 'Догонять', 'Доставлять'],
    correctIndex: 1,
    explanationRu: 'Достигать ➔ достижение.',
    explanationUz: '«Достижение» (yutuq) «достигать» (erishmoq) fe’lidan yasalgan.'
  },
  {
    id: 'q-16',
    category: 'Части речи',
    questionRu: 'Какое существительное соответствует глаголу «помогать»?',
    questionUz: '«Помогать» fe’liga qaysi ot mos keladi?',
    optionsRu: ['Помощник', 'Помощь', 'Помогание', 'Помогать'],
    correctIndex: 1,
    explanationRu: 'Помогать ➔ помощь (ж.р.).',
    explanationUz: 'Yordam bermoq ➔ yordam (помощь).'
  },

  // 5. Sonlar va otlar
  {
    id: 'q-17',
    category: 'Числа и проценты',
    questionRu: 'Как правильно сказать: «У меня на столе 21 ...»?',
    questionUz: '«У меня на столе 21 ...» jumlasida qaysi so‘z to‘g‘ri?',
    optionsRu: ['книга', 'книги', 'книг', 'книгам'],
    correctIndex: 0,
    explanationRu: 'Число 21 оканчивается на 1 ➔ Именительный падеж ед. ч. «книга».',
    explanationUz: '21 soni 1 bilan tugaydi, shuning uchun birlik bosh kelishik: «21 книга».'
  },
  {
    id: 'q-18',
    category: 'Числа и проценты',
    questionRu: 'Как правильно сказать: «В библиотеке 44 ...»?',
    questionUz: '«В библиотеке 44 ...» jumlasi uchun qaysi shakl to‘g‘ri?',
    optionsRu: ['книга', 'книги', 'книг', 'книгах'],
    correctIndex: 1,
    explanationRu: 'Число 44 оканчивается на 4 ➔ Родительный падеж ед. ч. «книги».',
    explanationUz: '44 soni 4 bilan tugaydi (2, 3, 4 guruhi), demak «44 книги».'
  },
  {
    id: 'q-19',
    category: 'Числа и проценты',
    questionRu: 'Как правильно: «В коробке 11 ...»?',
    questionUz: '«В коробке 11 ...» qaysi shaklni talab qiladi?',
    optionsRu: ['книга', 'книги', 'книг', 'книгам'],
    correctIndex: 2,
    explanationRu: 'Числа 11–14 требуют Родительного падежа множественного числа: «11 книг».',
    explanationUz: '11 soni 11–14 istisno guruhiga kiradi va ko‘plik qaratqich kelishigini oladi: «11 книг».'
  },
  {
    id: 'q-20',
    category: 'Числа и проценты',
    questionRu: 'Какая форма верна: «52 ...»?',
    questionUz: '«52 ...» bilan qaysi shakl ishlatiladi?',
    optionsRu: ['книга', 'книги', 'книг', 'книгами'],
    correctIndex: 1,
    explanationRu: '52 оканчивается на 2 ➔ «книги».',
    explanationUz: '52 soni 2 bilan tugaganligi sababli «52 книги» bo‘ladi.'
  },

  // 6. Foizlar
  {
    id: 'q-21',
    category: 'Числа и проценты',
    questionRu: 'Как правильно сказать: «Скидка составляет 14 ...»?',
    questionUz: '«Скидка составляет 14 ...» jumlasida qaysi so‘z to‘g‘ri?',
    optionsRu: ['процент', 'процента', 'процентов', 'проценты'],
    correctIndex: 2,
    explanationRu: '14 — это число из исключения 11–14, всегда «процентов»!',
    explanationUz: '11–14 sonlari istisno bo‘lib, faqat «процентов» shaklini oladi.'
  },
  {
    id: 'q-22',
    category: 'Числа и проценты',
    questionRu: 'Как правильно сказать: «Прирост составил 2 ...»?',
    questionUz: '«Прирост составил 2 ...» jumlasi qaysi shaklni oladi?',
    optionsRu: ['процент', 'процента', 'процентов', 'процентами'],
    correctIndex: 1,
    explanationRu: 'После чисел 2, 3, 4 используется форма «процента».',
    explanationUz: '2, 3, 4 sonlaridan keyin «процента» qo‘yiladi.'
  },
  {
    id: 'q-23',
    category: 'Числа и проценты',
    questionRu: 'Как правильно: «Уровень грамотности вырос на 31 ...»?',
    questionUz: '«...на 31 ...» jumlasi qanday bo‘ladi?',
    optionsRu: ['процент', 'процента', 'процентов', 'процентами'],
    correctIndex: 0,
    explanationRu: '31 оканчивается на 1 ➔ «процент».',
    explanationUz: '31 soni 1 bilan tugaydi, demak «31 процент».'
  },
  {
    id: 'q-24',
    category: 'Числа и проценты',
    questionRu: 'Какая форма используется с числом 100?',
    questionUz: '100 soni bilan qaysi shakl to‘g‘ri keladi?',
    optionsRu: ['100 процент', '100 процента', '100 процентов', '100 проценты'],
    correctIndex: 2,
    explanationRu: '100 процентов (оканчивается на ноль ➔ Р.п. мн.ч.).',
    explanationUz: '100 soni nol bilan tugagani sababli «100 процентов» bo‘ladi.'
  },

  // 7. Kelishiklar
  {
    id: 'q-25',
    category: 'Падежи',
    questionRu: 'На какие вопросы отвечает Родительный падеж?',
    questionUz: 'Родительный падеж (qaratqich kelishigi) qaysi so‘roqlarga javob beradi?',
    optionsRu: ['Кто? Что?', 'Кого? Чего?', 'Кому? Чему?', 'Кем? Чем?'],
    correctIndex: 1,
    explanationRu: 'Родительный падеж отвечает на вопросы: Кого? Чего? Откуда? Чей?',
    explanationUz: 'Родительный падеж: Кого? Чего? (Kimning? Nimaning?).'
  },
  {
    id: 'q-26',
    category: 'Падежи',
    questionRu: 'В каком падеже стоит слово «книгу» в предложении: «Я читаю книгу»?',
    questionUz: '«Я читаю книгу» gapida «книгу» so‘zi qaysi kelishikda?',
    optionsRu: ['Именительный', 'Винительный', 'Дательный', 'Предложный'],
    correctIndex: 1,
    explanationRu: 'Читаю (что?) книгу ➔ Винительный падеж (прямой объект).',
    explanationUz: 'Harakat to‘g‘ridan-to‘g‘ri kitobga qaratilgan: Винительный падеж (tushum).'
  },
  {
    id: 'q-27',
    category: 'Падежи',
    questionRu: 'Какой падеж всегда употребляется ТОЛЬКО с предлогами?',
    questionUz: 'Qaysi kelishik har doim FAQAT predloglar bilan ishlatiladi?',
    optionsRu: ['Родительный', 'Творительный', 'Предложный', 'Именительный'],
    correctIndex: 2,
    explanationRu: 'Предложный падеж никогда не используется без предлогов (о, об, в, на, при).',
    explanationUz: 'Предложный падеж hech qachon predlogsiz kelmaydi (nomi ham shundan olingan!).'
  },
  {
    id: 'q-28',
    category: 'Падежи',
    questionRu: 'Вставьте правильную форму: «Мы гордимся нашим новым ________».',
    questionUz: 'To‘g‘ri shaklni qo‘ying: «Мы гордимся нашим новым ________» (учитель).',
    optionsRu: ['учитель', 'учителя', 'учителю', 'учителем'],
    correctIndex: 3,
    explanationRu: 'Гордимся (кем?) учителем ➔ Творительный падеж.',
    explanationUz: '«Гордиться» fe’lidan keyin Творительный падеж keladi (кем? чем? — учителем).'
  },

  // 8. Jins, son, orfografiya
  {
    id: 'q-29',
    category: 'Грамматика',
    questionRu: 'К какому роду относится существительное «время»?',
    questionUz: '«Время» (vaqt) oti qaysi jinsga tegishli?',
    optionsRu: ['Мужской род', 'Женский род', 'Средний род', 'Общий род'],
    correctIndex: 2,
    explanationRu: 'Слово «время» оканчивается на -мя и относится к среднему роду (моё время).',
    explanationUz: '«Время» -мя bilan tugaydigan o‘rta jins (средний род) so‘zidir.'
  },
  {
    id: 'q-30',
    category: 'Грамматика',
    questionRu: 'Какая гласная пишется в сочетаниях ЖИ–ШИ?',
    questionUz: 'ЖИ–ШИ birikmalarida qaysi unli yoziladi?',
    optionsRu: ['Буква Ы', 'Буква И', 'Буква Е', 'Буква Я'],
    correctIndex: 1,
    explanationRu: 'Правило: ЖИ–ШИ пиши только с буквой И (жизнь, ошибка).',
    explanationUz: 'Qoida: ЖИ–ШИ faqat «И» harfi bilan yoziladi!'
  },
  {
    id: 'q-31',
    category: 'Грамматика',
    questionRu: 'В каком случае глагол пишется с мягким знаком: -ться?',
    questionUz: 'Qaysi holatda fe’l yumshatish belgisi bilan «-ться» yoziladi?',
    optionsRu: [
      'Когда глагол отвечает на вопрос «Что делает?»',
      'Когда глагол отвечает на вопрос «Что делать? Что сделать?»',
      'В прошедшем времени',
      'В форме 3-го лица множественного числа'
    ],
    correctIndex: 1,
    explanationRu: 'Если глагол в неопределённой форме отвечает на вопрос «Что делать?», пишется -ться (учиться).',
    explanationUz: 'Agar fe’l «Что делать?» (nima qilmoq?) noaniq shaklida bo‘lsa, «-ться» yoziladi.'
  },
  {
    id: 'q-32',
    category: 'Текст',
    questionRu: 'Как произносится союз «чтобы» в живой русской речи?',
    questionUz: '«Чтобы» bog‘lovchisi jonli ruscha nutqda qanday talaffuz qilinadi?',
    optionsRu: ['[что́-бы]', '[што́-бы]', '[кто́-бы]', '[чи-то́-бы]'],
    correctIndex: 1,
    explanationRu: 'Союз «чтобы» орфоэпически произносится как [што́бы].',
    explanationUz: 'Rus tilida «чтобы» so‘zidagi «ч» harfi [ш] deb aytiladi: [што́бы].'
  }
];
