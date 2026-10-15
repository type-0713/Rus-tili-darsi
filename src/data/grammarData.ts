import type { GrammarTopic } from '../types';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'topic-a',
    letterCode: 'A',
    titleRu: '«Чтобы» и «для того чтобы»',
    titleUz: '«Чтобы» va «для того чтобы» (Maqsad bog‘lovchilari)',
    level: 'Средний уровень',
    summaryUz: 'Harakatning maqsadi yoki sababini ifodalash uchun ishlatiladi. O‘zbek tilidagi «-ish uchun», «maqsadida» qo‘shimchalariga to‘g‘ri keladi.',
    ruleRu: 'Союзы «чтобы» и «для того чтобы» соединяют главное предложение с придаточным цели. Если подлежащее одно и то же в обеих частях, используется инфинитив (начальная форма глагола). Если субъекты разные — используется глагол в прошедшем времени.',
    formula: '[Главное предложение] + чтобы / для того чтобы + [Инфинитив (один субъект)] ИЛИ [Прошедшее время (разные субъекты)]',
    examples: [
      {
        ru: 'Чтобы улучшить память, нужно читать книги.',
        uz: 'Xotirani yaxshilash uchun kitob o‘qish kerak.',
        highlight: 'Чтобы улучшить'
      },
      {
        ru: 'Для того чтобы построить успешную карьеру, важно хорошо учиться.',
        uz: 'Muvaffaqiyatli martaba qurish uchun yaxshi o‘qish muhimdir.',
        highlight: 'Для того чтобы построить'
      },
      {
        ru: 'Учитель объяснил правило, чтобы ученики поняли тему.',
        uz: 'O‘quvchilar mavzuni tushunishlari uchun o‘qituvchi qoidani tushuntirdi.',
        highlight: 'чтобы ученики поняли'
      }
    ],
    comparisons: [
      {
        correctRu: 'Я читаю каждый день, чтобы знать много слов.',
        incorrectRu: 'Я читаю каждый день, для знать много слов.',
        explanationUz: 'Rus tilida «для» predlogi to‘g‘ridan-to‘g‘ri fe’l bilan kelmaydi! «Для» faqat otdan oldin keladi (для учебы). Fe’l oldidan esa albatta «чтобы» yoki «для того чтобы» qo‘yiladi.'
      },
      {
        correctRu: 'Мы пошли в библиотеку, чтобы взять словарь.',
        incorrectRu: 'Мы пошли в библиотеку что взять словарь.',
        explanationUz: '«Что» (nima/deb) bilan «чтобы» (uchun) chalkashtirilmasligi kerak. Shuningdek «чтобы» oldidan doim vergul qo‘yiladi.'
      }
    ],
    commonMistakesUz: [
      '«Для» so‘zidan keyin noaniq shakldagi fe’lni qo‘yish («для улучшить» — xato, «чтобы улучшить» — to‘g‘ri).',
      '«Что» va «чтобы» ni chalkashtirish: «Я хочу, что ты читал» (xato) -> «Я хочу, чтобы ты читал» (to‘g‘ri).',
      '«Что бы» (ayro) va «чтобы» (birga) yozilishini adashtirish. Maqsad bog‘lovchisi har doim birga yoziladi!'
    ],
    exercises: [
      {
        id: 'ex-a-1',
        instructionRu: 'Выберите правильный вариант для заполнения пропуска:',
        instructionUz: 'Bo‘sh o‘rin uchun to‘g‘ri variantni tanlang:',
        question: 'Ольга читает научные статьи, ________ расширить свой кругозор.',
        options: ['для', 'что', 'чтобы', 'потому что'],
        correctIndex: 2,
        explanationRu: 'Верно: «чтобы + инфинитив» (чтобы расширить).',
        explanationUz: 'To‘g‘ri: Maqsad ifodalanayotgani sababli fe’l oldidan «чтобы» qo‘yiladi.'
      },
      {
        id: 'ex-a-2',
        instructionRu: 'Какое предложение составлено грамматически верно?',
        instructionUz: 'Qaysi gap grammatik jihatdan to‘g‘ri tuzilgan?',
        question: 'Maqsadni to‘g‘ri ifodalovchi gapni toping:',
        options: [
          'Я занимаюсь спортом для быть здоровым.',
          'Я занимаюсь спортом, чтобы быть здоровым.',
          'Я занимаюсь спортом что быть здоровым.',
          'Я занимаюсь спортом, для того быть здоровым.'
        ],
        correctIndex: 1,
        explanationRu: 'Верно: «..., чтобы быть здоровым».',
        explanationUz: 'To‘g‘ri javob ikkinchisi: «чтобы быть...». Qolganlarida predlog yoki bog‘lovchi xato ishlatilgan.'
      }
    ]
  },
  {
    id: 'topic-b',
    letterCode: 'B',
    titleRu: 'Глаголы и существительные',
    titleUz: 'Fe’llar va otlar (Harakat va uning oti)',
    level: 'Начальный уровень',
    summaryUz: 'Harakatni bildiruvchi fe’llardan (nima qilmoq?) jarayon va natijani bildiruvchi otlar (nima?) yasalishi.',
    ruleRu: 'Отглагольные существительные образуются от глаголов с помощью суффиксов -ние, -ение, -тие, а также нулевого суффикса. Они обозначают действие как предмет и чаще всего относятся к среднему или женскому роду.',
    formula: 'Глагол (Что делать?) ➔ Отглагольное существительное (Что?) [-ние / -ение / -ь / -а]',
    examples: [
      { ru: 'Развивать ➔ Развитие', uz: 'Rivojlantirmoq ➔ Rivojlanish (taraqqiyot)', highlight: 'Развитие' },
      { ru: 'Изучать ➔ Изучение', uz: 'O‘rganmoq ➔ O‘rganish (tadqiq etish)', highlight: 'Изучение' },
      { ru: 'Улучшать ➔ Улучшение', uz: 'Yaxshilamoq ➔ Yaxshilanish (rivoj)', highlight: 'Улучшение' },
      { ru: 'Управлять ➔ Управление', uz: 'Boshqarmoq ➔ Boshqaruv (idora qilish)', highlight: 'Управление' },
      { ru: 'Достигать ➔ Достижение', uz: 'Erishmoq ➔ Yutuq (muvaffaqiyat)', highlight: 'Достижение' },
      { ru: 'Помогать ➔ Помощь', uz: 'Yordam bermoq ➔ Yordam (ko‘mak)', highlight: 'Помощь' },
      { ru: 'Защищать ➔ Защита', uz: 'Himoya qilmoq ➔ Himoya (mudofaa)', highlight: 'Защита' }
    ],
    comparisons: [
      {
        correctRu: 'Изучение языков требует терпения.',
        incorrectRu: 'Изучать языков требует терпения.',
        explanationUz: 'Gapning egasi ot bo‘lishi kerak: «Изучение языков» (tillarni o‘rganish).'
      },
      {
        correctRu: 'Мы стремимся к улучшению результатов.',
        incorrectRu: 'Мы стремимся к улучшать результатов.',
        explanationUz: '«К» predlogidan keyin Dative (jo‘nalish) kelishigidagi ot kerak: «к улучшению».'
      }
    ],
    commonMistakesUz: [
      'Fe’l o‘rniga otni yoki ot o‘rniga fe’lni noto‘g‘ri qo‘llash.',
      '«Помощь» so‘zining jinsini noaniq deb o‘ylash — «помощь» 3-skloneniye ayol jinsi (женский род: скорая помощь).'
    ],
    exercises: [
      {
        id: 'ex-b-1',
        instructionRu: 'Преобразуйте глагол в существительное:',
        instructionUz: 'Fe’ldan ot yasang: «достигать» fe’liga mos ot qaysi?',
        question: 'достигать ➔ ...',
        options: ['достигнуть', 'достижение', 'достижимый', 'достигатель'],
        correctIndex: 1,
        explanationRu: 'Верно: достигать ➔ достижение.',
        explanationUz: 'To‘g‘ri: erishmoq ➔ erishilgan natija, yutuq (достижение).'
      },
      {
        id: 'ex-b-2',
        instructionRu: 'Какое существительное соответствует глаголу «помогать»?',
        instructionUz: '«Помогать» fe’liga mos otni toping:',
        question: 'помогать ➔ ...',
        options: ['помощник', 'помощь', 'помогание', 'помогать'],
        correctIndex: 1,
        explanationRu: 'Верно: помогать ➔ помощь (женский род).',
        explanationUz: 'To‘g‘ri: «помогать» (yordam bermoq) ➔ «помощь» (yordam).'
      }
    ]
  },
  {
    id: 'topic-c',
    letterCode: 'C',
    titleRu: 'Числительные и существительные',
    titleUz: 'Sonlar va otlarning birikishi',
    level: 'Начальный уровень',
    summaryUz: 'Rus tilida otlar sonlar bilan birikganda sonning oxirgi raqamiga qarab kelishik va son o‘zgaradi. Bu qoidani bilish to‘g‘ri so‘zlashuv asosi.',
    ruleRu: '1) Число 1 (и числа, оканчивающиеся на 1, кроме 11): существительное в Именительном падеже ед. ч. (1 книга, 21 книга).\n2) Числа 2, 3, 4 (и оканчивающиеся на 2, 3, 4, кроме 12, 13, 14): существительное в Родительном падеже ед. ч. (2 книги, 24 книги).\n3) Числа 5–20, а также оканчивающиеся на 5–9, 0 и 11–14: существительное в Родительном падеже мн. ч. (5 книг, 11 книг, 25 книг).',
    formula: '1 ➔ И.п. ед.ч. | 2, 3, 4 ➔ Р.п. ед.ч. (-а/-я/-ы/-и) | 5-20, 11-14 ➔ Р.п. мн.ч. (-ов/-ев/-ей/нулевое)',
    examples: [
      { ru: '1 книга', uz: '1 ta kitob (birlik, bosh kelishik)', highlight: 'книга' },
      { ru: '2 книги, 3 книги, 4 книги', uz: '2, 3, 4 ta kitob (qaratqich, birlik)', highlight: 'книги' },
      { ru: '5 книг, 11 книг, 20 книг', uz: '5 ta kitob, 11 ta kitob (qaratqich, ko‘plik)', highlight: 'книг' },
      { ru: '21 книга', uz: '21 ta kitob (oxiri 1 bo‘lgani uchun birlik)', highlight: 'книга' },
      { ru: '22 книги, 44 книги, 52 книги', uz: '22, 44, 52 ta kitob (oxiri 2, 3, 4)', highlight: 'книги' },
      { ru: '25 книг, 30 книг', uz: '25 ta kitob (oxiri 5)', highlight: 'книг' },
      { ru: '31 книга', uz: '31 ta kitob (oxiri 1)', highlight: 'книга' }
    ],
    comparisons: [
      {
        correctRu: 'В библиотеке 21 книга.',
        incorrectRu: 'В библиотеке 21 книг.',
        explanationUz: '21 soni 1 bilan tugaganligi sababli ot bosh kelishik birlikda bo‘ladi: «21 книга»!'
      },
      {
        correctRu: 'Я прочитал 11 книг.',
        incorrectRu: 'Я прочитал 11 книги.',
        explanationUz: '11, 12, 13, 14 sonlari 5–20 guruhiga kiradi, shuning uchun ko‘plik qaratqich qo‘yiladi: «11 книг».'
      }
    ],
    commonMistakesUz: [
      '11 dan 14 gacha bo‘lgan sonlarni 1, 2, 3, 4 bilan adashtirib birlikda ishlatish (11 книг, 12 книг, 13 книг, 14 книг — doimo ko‘plik!).',
      '21, 31, 41 kabi sonlardan keyin ko‘plik qo‘yib yuborish (21 книги emas, 21 книга!).'
    ],
    exercises: [
      {
        id: 'ex-c-1',
        instructionRu: 'Выберите правильную форму слова «книга»:',
        instructionUz: '«Книга» so‘zining to‘g‘ri shaklini tanlang:',
        question: 'На полке стоит 44 ________.',
        options: ['книга', 'книги', 'книг', 'книгам'],
        correctIndex: 1,
        explanationRu: 'Верно: 44 оканчивается на 4 ➔ «книги» (Род. п., ед. ч.).',
        explanationUz: 'To‘g‘ri: 44 soni 4 bilan tugagani uchun «книги» shaklida bo‘ladi.'
      },
      {
        id: 'ex-c-2',
        instructionRu: 'Выберите правильную форму для числа 11:',
        instructionUz: '11 soni uchun to‘g‘ri shaklni toping:',
        question: 'В классе учится 11 ________.',
        options: ['ученик', 'ученика', 'учеников', 'ученики'],
        correctIndex: 2,
        explanationRu: 'Верно: 11 относится к группе 5–20 ➔ «учеников» (Род. п., мн. ч.).',
        explanationUz: 'To‘g‘ri: 11 soni uchun qaratqich kelishigi ko‘plik shakli «учеников» qo‘yiladi.'
      }
    ]
  },
  {
    id: 'topic-d',
    letterCode: 'D',
    titleRu: 'Проценты',
    titleUz: 'Foizlar (Проценты)',
    level: 'Начальный уровень',
    summaryUz: '«Процент» so‘zi ham sonlar bilan xuddi shunday qat’iy qoidaga bo‘ysunadi: 1 процент, 2-4 процента, 5-20 процентов.',
    ruleRu: '1) Число 1 (21, 31, 51... кроме 11): 1 процент.\n2) Числа 2, 3, 4 (22, 23, 24, 32, 44, 52... кроме 12, 13, 14): процента.\n3) Числа 5–20 (включая 11, 12, 13, 14), а также 25, 30, 100: процентов.\n\nОбратите внимание: 11–14 процентов — исключение из правила последних цифр!',
    formula: '...1 процент | ...2, 3, 4 процента | ...5-9, 0, а также 11-14 процентов',
    examples: [
      { ru: '1 процент, 21 процент, 31 процент', uz: '1%, 21%, 31% — процент', highlight: 'процент' },
      { ru: '2 процента, 4 процента, 22 процента, 44 процента, 52 процента', uz: '2%, 4%, 22%, 44%, 52% — процента', highlight: 'процента' },
      { ru: '5 процентов, 11 процентов, 12 процентов, 13 процентов, 14 процентов', uz: '5%, 11%, 12%, 13%, 14% — процентов (istisno!)', highlight: 'процентов' },
      { ru: '25 процентов, 100 процентов', uz: '25%, 100% — процентов', highlight: 'процентов' }
    ],
    comparisons: [
      {
        correctRu: 'Скидка составляет 14 процентов.',
        incorrectRu: 'Скидка составляет 14 процента.',
        explanationUz: '14 — 11-14 istisno guruhiga kiradi, shuning uchun faqat «процентов» bo‘ladi!'
      },
      {
        correctRu: 'Рост составил 52 процента.',
        incorrectRu: 'Рост составил 52 процентов.',
        explanationUz: '52 soni 2 bilan tugaydi, demak «процента» qo‘yiladi.'
      }
    ],
    commonMistakesUz: [
      '11, 12, 13, 14 sonlarida «процент» yoki «процента» deb xato aytish. Bu sonlar uchun har doim «процентов»!',
      '«На 5 процентов» iborasida qo‘shimchalarni unutib qo‘yish.'
    ],
    exercises: [
      {
        id: 'ex-d-1',
        instructionRu: 'Выберите правильную форму слова «процент»:',
        instructionUz: '«Процент» so‘zining to‘g‘ri shaklini tanlang:',
        question: 'Уровень стресса снизился на 68 ________.',
        options: ['процент', 'процента', 'процентов', 'процентами'],
        correctIndex: 2,
        explanationRu: 'Верно: 68 оканчивается на 8 ➔ «процентов».',
        explanationUz: 'To‘g‘ri: 68 soni 8 bilan tugaydi (5–9 guruhi), demak «процентов» bo‘ladi.'
      },
      {
        id: 'ex-d-2',
        instructionRu: 'Как правильно сказать: «12 ...»?',
        instructionUz: 'Qaysi biri to‘g‘ri: «12 ...»?',
        question: '12 ________.',
        options: ['процент', 'процента', 'процентов', 'проценты'],
        correctIndex: 2,
        explanationRu: 'Верно: 12 — исключение из правила, всегда «процентов».',
        explanationUz: 'To‘g‘ri: 12 soni istisno bo‘lib, «процентов» qo‘shimchasini oladi.'
      }
    ]
  },
  {
    id: 'topic-e',
    letterCode: 'E',
    titleRu: 'Падежи русского языка',
    titleUz: 'Rus tili kelishiklari (Barcha 6 ta kelishik)',
    level: 'Средний уровень',
    summaryUz: 'Rus tilidagi barcha 6 ta kelishikning so‘roqlari, asosiy vazifalari va gapdagi misollari.',
    ruleRu: 'В русском языке 6 падежей:\n1. Именительный (Кто? Что?) — исходная форма, подлежащее.\n2. Родительный (Кого? Чего? Откуда? Чей?) — отсутствие, принадлежность, количество.\n3. Дательный (Кому? Чему? Куда?) — адресат действия, возраст.\n4. Винительный (Кого? Что? Куда?) — прямой объект действия.\n5. Творительный (Кем? Чем? С кем?) — инструмент, совместность, профессия.\n6. Предложный (О ком? О чём? Где?) — тема мысли/речи, местоположение (всегда с предлогом).',
    formula: 'И: Кто? Что? | Р: Кого? Чего? | Д: Кому? Чему? | В: Кого? Что? | Т: Кем? Чем? | П: О ком? О чём?',
    examples: [
      { ru: 'И.п.: Книга лежит на столе.', uz: 'Kitob stolda yotibdi (Kim? Nima? — Bosh kelishik).', highlight: 'Книга' },
      { ru: 'Р.п.: У меня нет этой книги.', uz: 'Menda bu kitob yo‘q (Kimning? Nimaning? — Qaratqich kelishigi).', highlight: 'книги' },
      { ru: 'Д.п.: Я благодарен этой книге за знания.', uz: 'Men ushbu kitobga bilimlari uchun minnatdorman (Kimga? Nimaga?).', highlight: 'книге' },
      { ru: 'В.п.: Я читаю интересную книгу.', uz: 'Men qiziqarli kitobni o‘qiyapman (Kimni? Nimani? — Tushum kelishigi).', highlight: 'книгу' },
      { ru: 'Т.п.: Я горжусь прочитанной книгой.', uz: 'Men o‘qilgan kitob bilan faxrlanaman (Kim bilan? Nima bilan?).', highlight: 'книгой' },
      { ru: 'П.п.: Мы говорили об этой книге.', uz: 'Biz ushbu kitob haqida gaplashdik (Kim haqida? Nima haqida?).', highlight: 'об этой книге' }
    ],
    comparisons: [
      {
        correctRu: 'Я вижу новую книгу (Винительный).',
        incorrectRu: 'Я вижу новая книга.',
        explanationUz: 'Harakat to‘g‘ridan-to‘g‘ri qaratilgan ot tushum kelishigida (Винительный падеж) bo‘lishi shart (-у/-ю: книгу).'
      },
      {
        correctRu: 'Они думают о будущем (Предложный).',
        incorrectRu: 'Они думают будущее.',
        explanationUz: '«Думать» fe’lidan keyin mavzu Предложный падежда «о/об» bilan beriladi: «о будущем».'
      }
    ],
    commonMistakesUz: [
      'Винительный va Родительный kelishiklarini jonsiz otlarda adashtirish (jonsiz otlar bosh kelishik shaklini oladi: Я читаю журнал).',
      'Предложный kelishikni predlogsiz ishlatish — Предложный kelishik hech qachon predlogsiz kelmaydi (в, на, о, об, при).'
    ],
    exercises: [
      {
        id: 'ex-e-1',
        instructionRu: 'Определите падеж выделенного слова:',
        instructionUz: 'Ajratilgan so‘zning kelishigini aniqlang:',
        question: 'Ученик пишет в тетради ручкой.',
        options: ['Именительный', 'Винительный', 'Творительный', 'Дательный'],
        correctIndex: 2,
        explanationRu: 'Верно: пишет (чем?) ручкой ➔ Творительный падеж (инструмент действия).',
        explanationUz: 'To‘g‘ri: Nima bilan yozmoqda? — Ruchka bilan (Творительный падеж).'
      },
      {
        id: 'ex-e-2',
        instructionRu: 'Поставьте слово в правильный падеж:',
        instructionUz: 'Qavs ichidagi so‘zni to‘g‘ri kelishikka qo‘ying: «Я подарил книгу (сестра)».',
        question: 'Я подарил книгу ________.',
        options: ['сестра', 'сестры', 'сестре', 'сестру'],
        correctIndex: 2,
        explanationRu: 'Верно: подарил (кому?) сестре ➔ Дательный падеж.',
        explanationUz: 'To‘g‘ri: Kimga sovg‘a qildim? — Singlimga/opamga (сестре — Дательный падеж).'
      }
    ]
  },
  {
    id: 'topic-f',
    letterCode: 'F',
    titleRu: 'Род существительных',
    titleUz: 'Otning jinsi (Мужской, Женский, Средний род)',
    level: 'Начальный уровень',
    summaryUz: 'Rus tilida har bir ot uchta jinsdan biriga tegishli: Muzhskoy, Zhenskiy yoki Sredniy. Jins sifatlar va o‘tgan zamon fe’llarini moslashtirish uchun zarur.',
    ruleRu: '1) Мужской род (Он, мой): оканчивается на согласный (дом, стол, словарь [мягкий знак]), а также некоторые одушевлённые на -а/-я (папа, дядя, дедушка).\n2) Женский род (Она, моя): оканчивается на -а, -я (книга, песня, семья), а также на мягкий знак -ь (ночь, тетрадь, память).\n3) Средний род (Оно, моё): оканчивается на -о, -е, -ё, а также 10 разносклоняемых слов на -мя (время, имя, знамя).',
    formula: 'М.р.: согласный / -й / -ь | Ж.р.: -а / -я / -ь | Ср.р.: -о / -е / -мя',
    examples: [
      { ru: 'Мужской: Новый словарь, умный студент, любимый папа', uz: 'Yangi lug‘at, aqlli talaba, sevimli ota', highlight: 'словарь (м.р.)' },
      { ru: 'Женский: Интересная книга, хорошая память, глубокая мысль', uz: 'Qiziqarli kitob, yaxshi xotira, teran fikr', highlight: 'память (ж.р.)' },
      { ru: 'Средний: Новое слово, быстрое развитие, свободное время', uz: 'Yangi so‘z, tez rivojlanish, bo‘sh vaqt', highlight: 'время (ср.р.)' }
    ],
    comparisons: [
      {
        correctRu: 'Быстрое время летит незаметно.',
        incorrectRu: 'Быстрый время летит незаметно.',
        explanationUz: '«Время» so‘zi -мя bilan tugaydi va Sredniy rodga (o‘rta jins) tegishli: моё время, быстрое время!'
      },
      {
        correctRu: 'Вкусный кофе взбодрил меня.',
        incorrectRu: 'Вкусное кофе взбодрило меня.',
        explanationUz: '«Кофе» so‘zi an’anaviy adabiy tilda muzhskoy rod (erkak jinsi) hisoblanadi: чёрный кофе, горячий кофе.'
      }
    ],
    commonMistakesUz: [
      'Maftun etuvchi «-ь» (yumshatish belgisi) bilan tugaydigan so‘zlarda adashish: «словарь» — м.р., ammo «тетрадь», «память» — ж.р.',
      '«Время» va «имя» so‘zlarini erkak jinsi deb o‘ylash. Ular o‘rta jinsdir!'
    ],
    exercises: [
      {
        id: 'ex-f-1',
        instructionRu: 'Какого рода слово «память»?',
        instructionUz: '«Память» (xotira) so‘zi qaysi jinsga tegishli?',
        question: 'Слово «память» относится к...',
        options: ['Мужской род', 'Женский род', 'Средний род', 'Общий род'],
        correctIndex: 1,
        explanationRu: 'Верно: «память» — существительное женского рода 3-го склонения (моя память).',
        explanationUz: 'To‘g‘ri: «память» ayol jinsiga (женский род) tegishli: хорошая память.'
      }
    ]
  },
  {
    id: 'topic-g',
    letterCode: 'G',
    titleRu: 'Число существительных',
    titleUz: 'Otning soni (Birlik va Ko‘plik)',
    level: 'Начальный уровень',
    summaryUz: 'Otlar yakka (единственное число) yoki ko‘p (множественное число) bo‘lishi mumkin. Ko‘plik qo‘shimchalari va istisnolar.',
    ruleRu: 'Существительные мужского и женского рода во множественном числе обычно получают окончания -ы или -и (после г, к, х, ж, ч, ш, щ и мягких согласных). Средний род получает окончания -а или -я.\n\nИсключения: человек ➔ люди, ребёнок ➔ дети, друг ➔ друзья, брат ➔ братья, дерево ➔ деревья, время ➔ времена.',
    formula: 'М.р./Ж.р. ➔ -ы / -и | Ср.р. ➔ -а / -я | Особые формы: человек ➔ люди, ребёнок ➔ дети',
    examples: [
      { ru: 'Книга ➔ Книги, Студент ➔ Студенты', uz: 'Kitob ➔ Kitoblar, Talaba ➔ Talabalar', highlight: 'книги, студенты' },
      { ru: 'Слово ➔ Слова, Письмо ➔ Письма', uz: 'So‘z ➔ So‘zlar, Xat ➔ Xatlar', highlight: 'слова' },
      { ru: 'Человек ➔ Люди, Ребёнок ➔ Дети', uz: 'Inson ➔ Odamlar, Bola ➔ Bolalar', highlight: 'люди, дети' },
      { ru: 'Время ➔ Времена, Имя ➔ Имена', uz: 'Vaqt ➔ Zamonlar/davrlar, Ism ➔ Ismlar', highlight: 'времена' }
    ],
    comparisons: [
      {
        correctRu: 'В зале собрались многие люди.',
        incorrectRu: 'В зале собрались многие человеки.',
        explanationUz: '«Человек» so‘zining ko‘plik shakli umumiy ma’noda «люди» bo‘ladi (faqat sonlar bilan: 5 человек).'
      }
    ],
    commonMistakesUz: [
      '«Человеки» yoki «ребёнки» deb noto‘g‘ri aytish (to‘g‘risi: люди, дети).',
      'Г, К, Х, Ж, Ч, Ш, Щ harflaridan keyin hech qachon «Ы» yozilmaydi, faqat «И» yoziladi (книги, уроки).'
    ],
    exercises: [
      {
        id: 'ex-g-1',
        instructionRu: 'Выберите правильную форму множественного числа для слова «ребёнок»:',
        instructionUz: '«Ребёнок» so‘zining ko‘plik shaklini tanlang:',
        question: 'ребёнок ➔ ...',
        options: ['ребёнки', 'ребята', 'дети', 'детки'],
        correctIndex: 2,
        explanationRu: 'Верно: ребёнок ➔ дети.',
        explanationUz: 'To‘g‘ri: bola ➔ bolalar (дети).'
      }
    ]
  },
  {
    id: 'topic-h',
    letterCode: 'H',
    titleRu: 'Спряжение глаголов',
    titleUz: 'Fe’l tuslanishi (I va II tuslanish)',
    level: 'Средний уровень',
    summaryUz: 'Fe’llarning shaxs va sonda o‘zgarishi (tuslanishi). Rus tilida ikkita asosiy tuslanish (спряжение) mavjud.',
    ruleRu: '1) I спряжение: глаголы на -ать, -ять, -еть, -оть, -уть, а также исключения «брить, стелить, зиждиться». Окончания: -у/-ю, -ешь, -ет, -ем, -ете, -ут/-ют.\n2) II спряжение: глаголы на -ить, плюс 11 исключений (гнать, дышать, держать, обидеть, слышать, видеть, ненавидеть, зависеть, терпеть, вертеть, смотреть). Окончания: -у/-ю, -ишь, -ит, -им, -ите, -ат/-ят.',
    formula: 'I спр.: -ешь, -ет, -ем, -ете, -ут/-ют | II спр.: -ишь, -ит, -им, -ите, -ат/-ят',
    examples: [
      { ru: 'Читать (I): я читаю, ты читаешь, он читает, мы читаем, вы читаете, они читают', uz: 'O‘qimoq (I): men o‘qiyman, sen o‘qiysan...', highlight: 'читает' },
      { ru: 'Учить (II): я учу, ты учишь, он учит, мы учим, вы учите, они учат', uz: 'O‘rganmoq/o‘rgatmoq (II): men o‘rganaman...', highlight: 'учит' }
    ],
    comparisons: [
      {
        correctRu: 'Ты регулярно читаешь книги.',
        incorrectRu: 'Ты регулярно читаишь книги.',
        explanationUz: '«Читать» fe’li I tuslanishga kiradi, shuning uchun -ешь yoziladi: «читаешь».'
      }
    ],
    commonMistakesUz: [
      'I va II tuslanish qo‘shimchalarini adashtirish (он читаит emas, он читает; он строет emas, он строит).',
      '11 ta istisno fe’lni (видеть, слышать, смотреть...) unutib, ularni I tuslanishga qo‘yish.'
    ],
    exercises: [
      {
        id: 'ex-h-1',
        instructionRu: 'Выберите правильное окончание глагола:',
        instructionUz: 'Fe’lning to‘g‘ri qo‘shimchasini tanlang: «Мы регулярно чита... интересные книги».',
        question: 'Мы чита... книги.',
        options: ['-им', '-ем', '-ам', '-ом'],
        correctIndex: 1,
        explanationRu: 'Верно: читать — I спряжение ➔ мы читаем.',
        explanationUz: 'To‘g‘ri: «читать» I tuslanish bo‘lgani uchun «читаем» bo‘ladi.'
      }
    ]
  },
  {
    id: 'topic-i',
    letterCode: 'I',
    titleRu: 'Времена глаголов',
    titleUz: 'Fe’l zamonlari (O‘tgan, Hozirgi, Kelasi)',
    level: 'Начальный уровень',
    summaryUz: 'Harakat sodir bo‘lish vaqtini ko‘rsatuvchi 3 ta zamon: прошедшее, настоящее va будущее время.',
    ruleRu: '1) Прошедшее время: образуется с суффиксом -л (читал, читала, читало, читали). Изменяется по родам и числам, но НЕ по лицам!\n2) Настоящее время: только у глаголов несовершенного вида (я читаю, ты читаешь). Изменяется по лицам и числам.\n3) Будущее время: бывает простым (прочитаю — сов. вид) и сложным (буду читать — несов. вид).',
    formula: 'Прошедшее: основа + -л/-ла/-ло/-ли | Будущее сложное: буду/будешь... + инфинитив',
    examples: [
      { ru: 'Вчера он читал весь вечер (Прошедшее, м.р.).', uz: 'Kecha u butun oqshom kitob o‘qidi.', highlight: 'читал' },
      { ru: 'Сейчас мы читаем текст (Настоящее).', uz: 'Hozir biz matnni o‘qiyapmiz.', highlight: 'читаем' },
      { ru: 'Завтра я буду читать новую главу (Будущее сложное).', uz: 'Ertaga men yangi bobni o‘qiyman.', highlight: 'буду читать' }
    ],
    comparisons: [
      {
        correctRu: 'Она читала интересную книгу.',
        incorrectRu: 'Она читал интересную книгу.',
        explanationUz: 'O‘tgan zamonda fe’l jinsga moslashadi: ayol jinsi uchun -ла qo‘shiladi (читала).'
      }
    ],
    commonMistakesUz: [
      'O‘tgan zamonda ayol yoki ko‘plik shakllarida moslikni yo‘qotish (она сказал emas, она сказала).',
      'Mukammal turdagi fe’llarga «буду» qo‘shib yuborish («буду прочитать» — mutlaqo xato! «прочитаю» yoki «буду читать»).'
    ],
    exercises: [
      {
        id: 'ex-i-1',
        instructionRu: 'Вставьте правильную форму прошедшего времени для местоимения «Она»:',
        instructionUz: '«Она» olmoshi uchun o‘tgan zamonning to‘g‘ri shaklini tanlang:',
        question: 'Она вчера с интересом ________ весь роман.',
        options: ['прочитал', 'прочитала', 'прочитало', 'прочитали'],
        correctIndex: 1,
        explanationRu: 'Верно: женский род прошедшего времени ➔ прочитала.',
        explanationUz: 'To‘g‘ri: Ayol jinsi uchun -ла qo‘shimchasi (прочитала).'
      }
    ]
  },
  {
    id: 'topic-j',
    letterCode: 'J',
    titleRu: 'Прилагательные',
    titleUz: 'Sifatlar (Ot bilan jins, son va kelishikda moslashuv)',
    level: 'Средний уровень',
    summaryUz: 'Sifatlar har doim o‘zi bog‘langan otga to‘liq bo‘ysunadi va uning jinsi, soni hamda kelishigini takrorlaydi.',
    ruleRu: 'Прилагательные отвечают на вопросы: Какой? Какая? Какое? Какие? Они согласуются с существительным в роде, числе и падеже.\nОкончания в именительном падеже:\n- Мужской род: -ый, -ий, -ой (умный, синий, большой)\n- Женский род: -ая, -яя (умная, синяя)\n- Средний род: -ое, -ее (умное, синее)\n- Множественное число: -ые, -ие (умные, синие)',
    formula: 'Прилагательное [род, число, падеж] = Существительное [род, число, падеж]',
    examples: [
      { ru: 'Умный человек читает глубокие книги.', uz: 'Aqlli inson chuqur mazmunli kitoblarni o‘qiydi.', highlight: 'Умный, глубокие' },
      { ru: 'Вдумчивое чтение развивает мышление.', uz: 'Mulohazali mutolaa fikrlashni o‘stiradi.', highlight: 'Вдумчивое' }
    ],
    comparisons: [
      {
        correctRu: 'Интересная книга лежит на столе.',
        incorrectRu: 'Интересный книга лежит на столе.',
        explanationUz: '«Книга» ayol jinsida bo‘lgani uchun sifat ham ayol jinsida «интересная» bo‘ladi.'
      }
    ],
    commonMistakesUz: [
      'O‘rta jinsdagi so‘zga erkak jinsi sifatini qo‘yish («новое слово» o‘rniga «новый слово»).',
      'Ko‘plikda sifat qo‘shimchasini unutish (умные ученики).'
    ],
    exercises: [
      {
        id: 'ex-j-1',
        instructionRu: 'Выберите правильное прилагательное к слову «воображение»:',
        instructionUz: '«Воображение» (o‘rta jins) so‘ziga mos sifatni tanlang:',
        question: 'У писателя было очень ________ воображение.',
        options: ['богатый', 'богатая', 'богатое', 'богатые'],
        correctIndex: 2,
        explanationRu: 'Верно: воображение — ср. род ➔ богатое воображение.',
        explanationUz: 'To‘g‘ri: «воображение» o‘rta jins bo‘lgani sababli «богатое» tanlanadi.'
      }
    ]
  },
  {
    id: 'topic-k',
    letterCode: 'K',
    titleRu: 'Орфография и пунктуация',
    titleUz: 'Imlo va tinish belgilari (Asosiy qoidalar)',
    level: 'Продвинутый уровень',
    summaryUz: 'Rus tili imlosining oltin qoidalari (ЖИ-ШИ, ЧА-ЩА, ЧУ-ЩУ, -ТСЯ/-ТЬСЯ) va gaplardagi vergul qoidalari.',
    ruleRu: '1) ЖИ–ШИ пиши с буквой И (жизнь, ошибка).\n2) ЧА–ЩА пиши с буквой А (часто, пощада).\n3) ЧУ–ЩУ пиши с буквой У (чудо, щука).\n4) -ТСЯ и -ТЬСЯ: если глагол отвечает на вопрос «Что делать? Что сделать?» — пишется с «ь» (учиться). Если отвечает на вопрос «Что делает? Что делают?» — пишется без «ь» (он учится).\n5) Пунктуация: перед союзами «а», «но», «что», «чтобы», «потому что» ВСЕГДА ставится запятая!',
    formula: 'Что делать? ➔ -ТЬСЯ | Что делает? ➔ -ТСЯ | Запятая: [Предложение 1] , чтобы / а / но [Предложение 2]',
    examples: [
      { ru: 'Нужно учиться всю жизнь (Что делать? ➔ -ться).', uz: 'Butun umr o‘qish kerak.', highlight: 'учиться' },
      { ru: 'Студент усердно учится (Что делает? ➔ -тся).', uz: 'Talaba qunt bilan o‘qimoqda.', highlight: 'учится' },
      { ru: 'Мы читаем, чтобы знать язык.', uz: 'Biz tilni bilish uchun o‘qiymiz (vergulga e’tibor bering!).', highlight: ', чтобы' }
    ],
    comparisons: [
      {
        correctRu: 'Он любит учиться новому.',
        incorrectRu: 'Он любит учится новому.',
        explanationUz: '«Любит (что делать?) учиться» — noaniq shaklda «ь» yozilishi shart!'
      },
      {
        correctRu: 'Я хочу читать, но у меня мало времени.',
        incorrectRu: 'Я хочу читать но у меня мало времени.',
        explanationUz: '«Но» bog‘lovchisi oldidan har doim vergul qo‘yiladi!'
      }
    ],
    commonMistakesUz: [
      '-тся va -ться ni chalkashtirish (savol berish orqali tekshirish kerak: agar savolda «ь» bo‘lsa, fe’lda ham «ь» bo‘ladi).',
      '«Чтобы», «потому что», «но», «а» oldidan vergulni qoldirib ketish.'
    ],
    exercises: [
      {
        id: 'ex-k-1',
        instructionRu: 'Выберите правильное написание глагола:',
        instructionUz: 'Fe’lning to‘g‘ri imlosini tanlang: «Каждый человек должен стреми... к знаниям».',
        question: 'должен стреми... к знаниям (Что делать?)',
        options: ['стремится', 'стремиться', 'стремица', 'стремицца'],
        correctIndex: 1,
        explanationRu: 'Верно: должен (что делать?) стремиться — пишется с мягким знаком.',
        explanationUz: 'To‘g‘ri: Savol «nima qilmoq?» (что делать?), demak yumshatish belgisi bilan «стремиться».'
      }
    ]
  }
];
