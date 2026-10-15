import type { ListeningExercise } from '../types';

export const LISTENING_DATA: ListeningExercise[] = [
  // --- ЛЁГКИЙ УРОВЕНЬ (5 упражнений) ---
  {
    id: 'l-easy-1',
    level: 'Лёгкий',
    titleRu: 'Утренняя привычка',
    titleUz: 'Ertalabki odat',
    audioTextRu: 'Привет! Меня зовут Алишер. Каждое утро перед завтраком я читаю ровно одну главу интересной книги. Это помогает мне настроиться на продуктивный день.',
    audioTextUz: 'Salom! Mening ismim Alisher. Har kuni ertalab nonushtadan oldin men qiziqarli kitobning roppa-rosa bitta bobini o‘qiyman. Bu menga unumli kunga moslashishga yordam beradi.',
    questionRu: 'Когда именно Алишер читает книгу?',
    questionUz: 'Alisher kitobni aynan qaysi paytda o‘qiydi?',
    optionsRu: ['Перед сном', 'Перед завтраком', 'Во время обеда', 'Вечером после работы'],
    correctIndex: 1,
    explanationUz: 'Matnda aniq aytildi: «Каждое утро перед завтраком я читаю ровно одну главу...» — ya’ni nonushtadan oldin.',
    vocabulary: [
      { ru: 'Перед завтраком', uz: 'Nonushtadan oldin' },
      { ru: 'Глава книги', uz: 'Kitob bobi' },
      { ru: 'Настроиться', uz: 'Moslashmoq, chog‘lanmoq' }
    ]
  },
  {
    id: 'l-easy-2',
    level: 'Лёгкий',
    titleRu: 'Любимый жанр',
    titleUz: 'Sevimli janr',
    audioTextRu: 'Анна очень любит читать исторические романы. Она считает, что через историю можно глубже понять поступки и культуру разных народов.',
    audioTextUz: 'Anna tarixiy romanlarni o‘qishni juda yaxshi ko‘radi. U tarix orqali turli xalqlarning qilmishlari va madaniyatini chuqurroq anglash mumkin deb hisoblaydi.',
    questionRu: 'Какой жанр литературы предпочитает Анна?',
    questionUz: 'Anna qaysi adabiy janrni afzal ko‘radi?',
    optionsRu: ['Детективы', 'Фантастику', 'Исторические романы', 'Поэзию'],
    correctIndex: 2,
    explanationUz: 'Matnda shunday deyilgan: «Анна очень любит читать исторические романы» (tarixiy romanlar).',
    vocabulary: [
      { ru: 'Исторический роман', uz: 'Tarixiy roman' },
      { ru: 'Поступки', uz: 'Xatti-harakatlar' },
      { ru: 'Понять глубже', uz: 'Chuqurroq anglamoq' }
    ]
  },
  {
    id: 'l-easy-3',
    level: 'Лёгкий',
    titleRu: 'В библиотеке',
    titleUz: 'Kutubxonada',
    audioTextRu: 'Сегодня в городской библиотеке открылся новый читальный зал. Там светло, тихо и стоят удобные кресла для вдумчивого чтения.',
    audioTextUz: 'Bugun shahar kutubxonasida yangi qiroatxona ochildi. U yerda yorug‘, sokin va chuqur mutolaa uchun qulay kreslolar qo‘yilgan.',
    questionRu: 'Какая атмосфера царит в новом зале?',
    questionUz: 'Yangi qiroatxonada qanday muhit hukmron?',
    optionsRu: ['Шумно и темно', 'Светло и тихо', 'Много музыки', 'Тесно и холодно'],
    correctIndex: 1,
    explanationUz: 'Matnda «Там светло, тихо и стоят удобные кресла...» deyilgan.',
    vocabulary: [
      { ru: 'Читальный зал', uz: 'Qiroatxona' },
      { ru: 'Удобные кресла', uz: 'Qulay kreslolar' },
      { ru: 'Тихо', uz: 'Sokin, tinch' }
    ]
  },
  {
    id: 'l-easy-4',
    level: 'Лёгкий',
    titleRu: 'Подарок для друга',
    titleUz: 'Do‘st uchun sovg‘a',
    audioTextRu: 'На день рождения Тимура друзья решили подарить ему энциклопедию об искусстве, потому что он мечтает стать дизайнером.',
    audioTextUz: 'Temurning tug‘ilgan kuniga do‘stlari san’at haqidagi ensiklopediyani sovg‘a qilishga qaror qilishdi, chunki u dizayner bo‘lishni orzu qiladi.',
    questionRu: 'Что именно подарили Тимуру?',
    questionUz: 'Temurga aynan nima sovg‘a qilishdi?',
    optionsRu: ['Новый смартфон', 'Энциклопедию об искусстве', 'Спортивную форму', 'Наушники'],
    correctIndex: 1,
    explanationUz: 'Do‘stlari unga san’at ensiklopediyasini (энциклопедию об искусстве) sovg‘a qilishdi.',
    vocabulary: [
      { ru: 'Энциклопедия', uz: 'Ensiklopedik kitob' },
      { ru: 'Искусство', uz: 'San’at' },
      { ru: 'Мечтать', uz: 'Orzu qilmoq' }
    ]
  },
  {
    id: 'l-easy-5',
    level: 'Лёгкий',
    titleRu: 'Книжная закладка',
    titleUz: 'Kitob xatcho‘pi',
    audioTextRu: 'Малика всегда использует красивую шёлковую закладку, чтобы не загибать страницы книг и бережно относиться к печатному изданию.',
    audioTextUz: 'Malika kitob sahifalarini buklamaslik va nashrga ehtiyotkorona munosabatda bo‘lish uchun doimo chiroyli ipak xatcho‘pdan foydalanadi.',
    questionRu: 'Зачем Малика использует закладку?',
    questionUz: 'Malika nega xatcho‘pdan foydalanadi?',
    optionsRu: ['Чтобы украсить полку', 'Чтобы не загибать страницы', 'Чтобы быстрее читать', 'Чтобы рисовать в книге'],
    correctIndex: 1,
    explanationUz: 'Sahifalarni buklamaslik uchun («чтобы не загибать страницы»).',
    vocabulary: [
      { ru: 'Закладка', uz: 'Xatcho‘p' },
      { ru: 'Загибать страницы', uz: 'Sahifalarni buklamoq' },
      { ru: 'Бережно', uz: 'Ehtiyotkorlik bilan' }
    ]
  },

  // --- СРЕДНИЙ УРОВЕНЬ (5 упражнений) ---
  {
    id: 'l-med-1',
    level: 'Средний',
    titleRu: 'Исследование о стрессе',
    titleUz: 'Stress bo‘yicha tadqiqot',
    audioTextRu: 'Британские учёные провели интересное исследование. Оказалось, что чтение печатной книги в течение всего шести минут замедляет сердечный ритм и снимает напряжение в мышцах быстрее, чем прослушивание музыки или прогулка.',
    audioTextUz: 'Britaniyalik olimlar qiziqarli tadqiqot o‘tkazdilar. Ma’lum bo‘lishicha, bosma kitobni bor-yo‘g‘i olti daqiqa o‘qish yurak urishini me’yoriga keltiradi va mushaklardagi zo‘riqishni musiqa tinglash yoki sayr qilishdan ham tezroq bartaraf etadi.',
    questionRu: 'Сколько минут чтения достаточно, чтобы снять мышечное напряжение?',
    questionUz: 'Mushaklardagi zo‘riqishni bartaraf etish uchun necha daqiqa o‘qish yetarli bo‘ldi?',
    optionsRu: ['Тридцать минут', 'Шесть минут', 'Пятнадцать минут', 'Один час'],
    correctIndex: 1,
    explanationUz: 'Matnda «в течение всего шести минут» (bor-yo‘g‘i 6 daqiqa ichida) deb aytildi.',
    vocabulary: [
      { ru: 'Замедляет сердечный ритм', uz: 'Yurak urishini sekinlashtiradi' },
      { ru: 'Снимает напряжение', uz: 'Zo‘riqishni ketkazadi' },
      { ru: 'Печатная книга', uz: 'Bosma qog‘oz kitob' }
    ]
  },
  {
    id: 'l-med-2',
    level: 'Средний',
    titleRu: 'Словарный запас и успех',
    titleUz: 'So‘z boyligi va muvaffaqiyat',
    audioTextRu: 'Психологи утверждают: богатый словарный запас напрямую влияет на карьерный рост. Люди, которые много читают, точнее формулируют мысли, увереннее ведут переговоры и реже испытывают затруднения при публичных выступлениях.',
    audioTextUz: 'Psixologlarning ta’kidlashicha: boy so‘z boyligi bevosita mansab o‘sishiga ta’sir qiladi. Ko‘p o‘qiydigan insonlar fikrlarini aniqroq ifodalaydi, muzokaralarni ishonch bilan olib boradi va jamoat oldida chiqishda kamroq qiynaladi.',
    questionRu: 'Какое преимущество получают люди с богатым словарным запасом?',
    questionUz: 'Boy so‘z boyligiga ega odamlar qanday ustunlikka ega bo‘ladi?',
    optionsRu: [
      'Они меньше спят',
      'Они точнее формулируют мысли и увереннее говорят',
      'Они быстрее бегают',
      'Они вообще не ошибаются'
    ],
    correctIndex: 1,
    explanationUz: 'Matnda aytilganidek: «точнее формулируют мысли, увереннее ведут переговоры».',
    vocabulary: [
      { ru: 'Переговоры', uz: 'Muzokaralar' },
      { ru: 'Публичные выступления', uz: 'Jamoat oldidagi nutqlar' },
      { ru: 'Затруднения', uz: 'Qiyinchiliklar' }
    ]
  },
  {
    id: 'l-med-3',
    level: 'Средний',
    titleRu: 'Электронная или бумажная?',
    titleUz: 'Elektronmi yoki qog‘ozmi?',
    audioTextRu: 'Хотя электронные книги очень удобны в путешествиях, бумажные издания обладают уникальными свойствами. Запах бумаги, шелест страниц и осязание переплёта активируют дополнительные зоны мозга, что улучшает запоминание сюжета.',
    audioTextUz: 'Elektron kitoblar sayohatlarda juda qulay bo‘lsa-da, qog‘oz nashrlar o‘ziga xos xususiyatlarga ega. Qog‘oz hidi, sahifalar shitirlashi va muqovaning his etilishi miyaning qo‘shimcha sohalarini faollashtiradi, bu esa asar syujetining esda qolishini yaxshilaydi.',
    questionRu: 'Почему бумажная книга помогает лучше запоминать сюжет?',
    questionUz: 'Nima sababdan qog‘oz kitob syujetni yaxshiroq eslab qolishga yordam beradi?',
    optionsRu: [
      'Она стоит дороже',
      'Она активирует дополнительные зоны мозга через осязание и звуки',
      'В ней меньше страниц',
      'Она ярче светится'
    ],
    correctIndex: 1,
    explanationUz: 'Hid, tovush va ushlash orqali miyaning qo‘shimcha sohalarini faollashtiradi («активируют дополнительные зоны мозга»).',
    vocabulary: [
      { ru: 'Шелест страниц', uz: 'Sahifalarning shitirlashi' },
      { ru: 'Осязание', uz: 'Sezish, ushlab ko‘rish' },
      { ru: 'Переплёт', uz: 'Muqova' }
    ]
  },
  {
    id: 'l-med-4',
    level: 'Средний',
    titleRu: 'Воображение и эмпатия',
    titleUz: 'Tasavvur va hamdardlik',
    audioTextRu: 'Художественная литература учит эмпатии — способности сопереживать другим людям. Когда мы следим за судьбой героя, мы мысленно ставим себя на его место и глубже понимаем мотивы человеческих поступков.',
    audioTextUz: 'Badiiy adabiyot empatiyani — boshqa insonlarga hamdard bo‘lish qobiliyatini o‘rgatadi. Qahramon taqdirini kuzatar ekanmiz, o‘zimizni xayolan uning o‘rniga qo‘yamiz va insoniy qilmishlar sabablarini chuqurroq tushunamiz.',
    questionRu: 'Чему учит чтение художественной литературы согласно тексту?',
    questionUz: 'Matnga ko‘ra, badiiy adabiyot o‘qish nimani o‘rgatadi?',
    optionsRu: ['Быстро считать в уме', 'Эмпатии и сопереживанию', 'Иностранным языкам за неделю', 'Строить дома'],
    correctIndex: 1,
    explanationUz: '«Художественная литература учит эмпатии — способности сопереживать...»',
    vocabulary: [
      { ru: 'Эмпатия', uz: 'Hamdardlik qobiliyati' },
      { ru: 'Сопереживать', uz: 'Dardini his qilmoq' },
      { ru: 'Мотивы поступков', uz: 'Harakatlarning tub sabablari' }
    ]
  },
  {
    id: 'l-med-5',
    level: 'Средний',
    titleRu: 'Книжный клуб',
    titleUz: 'Kitob klubi',
    audioTextRu: 'Каждую субботу наш книжный клуб собирается в уютном кафе. Мы выбираем одну книгу в месяц, читаем её дома, а затем спорим о поступках героев и делимся личными выводами.',
    audioTextUz: 'Har shanba bizning kitob klubimiz shinam kafeda yig‘iladi. Biz oyiga bitta kitob tanlab, uni uyda o‘qiymiz, so‘ngra qahramonlarning harakatlari haqida bahslashamiz va xulosalarimiz bilan bo‘lishamiz.',
    questionRu: 'Как часто собирается книжный клуб?',
    questionUz: 'Kitob klubi qanchalik tez-tez yig‘iladi?',
    optionsRu: ['Каждый день', 'Каждую субботу', 'Раз в полгода', 'По воскресеньям'],
    correctIndex: 1,
    explanationUz: 'Matnda «Каждую субботу наш книжный клуб собирается...» deyilgan.',
    vocabulary: [
      { ru: 'Книжный клуб', uz: 'Kitobxonlar to‘garagi' },
      { ru: 'Спорить о поступках', uz: 'Harakatlar haqida bahslashmoq' },
      { ru: 'Личные выводы', uz: 'Shaxsiy xulosalar' }
    ]
  },

  // --- СЛОЖНЫЙ УРОВЕНЬ (5 упражнений) ---
  {
    id: 'l-hard-1',
    level: 'Сложный',
    titleRu: 'Нейропластичность и глубокое чтение',
    titleUz: 'Neyroplastiklik va teran mutolaa',
    audioTextRu: 'Современные когнитивные исследования доказывают явление нейропластичности мозга при глубоком линейном чтении. В отличие от поверхностного интернет-скроллинга, чтение сложного текста задействует зрительную кору, слуховые центры внутренней речи и префронтальную кору, отвечающую за принятие стратегических решений.',
    audioTextUz: 'Zamonaviy kognitiv tadqiqotlar chuqur mutolaa paytida miyaning neyroplastiklik hodisasini isbotlaydi. Internetdagi yuzaki o‘qishdan farqli o‘laroq, murakkab matnni mutolaa qilish ko‘rish po‘stlog‘ini, ichki nutq eshitish markazlarini va strategik qarorlar qabul qilishga mas’ul bo‘lgan prefrontal po‘stloqni ishga tushiradi.',
    questionRu: 'В чём главное отличие глубокого чтения от интернет-скроллинга?',
    questionUz: 'Chuqur o‘qishning internetdagi yuzaki varaqlashdan asosiy farqi nimada?',
    optionsRu: [
      'Интернет-скроллинг требует больше энергии',
      'Глубокое чтение комплексно задействует зрительную, слуховую и префронтальную зоны мозга',
      'Чтение книг замедляет реакцию человека',
      'Между ними нет никакой разницы'
    ],
    correctIndex: 1,
    explanationUz: 'Matnga ko‘ra, chuqur mutolaa ko‘rish, eshitish va prefrontal miya markazlarini yaxlit ishga tushiradi.',
    vocabulary: [
      { ru: 'Нейропластичность', uz: 'Neyroplastiklik (miya moslashuvchanligi)' },
      { ru: 'Линейное чтение', uz: 'Ketma-ket chuqur mutolaa' },
      { ru: 'Префронтальная кора', uz: 'Prefrontal miya qobig‘i' }
    ]
  },
  {
    id: 'l-hard-2',
    level: 'Сложный',
    titleRu: 'Профилактика когнитивного спада',
    titleUz: 'Aqliy zaiflashuv profilaktikasi',
    audioTextRu: 'Согласно долгосрочным наблюдениям неврологов, регулярная интеллектуальная нагрузка в виде чтения литературы на 32 процента снижает вероятность развития когнитивных нарушений в пожилом возрасте. Мозг формирует так называемый «когнитивный резерв», который компенсирует возрастные изменения.',
    audioTextUz: 'Nevrologlarning uzoq muddatli kuzatuvlariga ko‘ra, kitob o‘qish ko‘rinishidagi muntazam aqliy yuklama keksayganda kognitiv buzilishlar yuzaga kelish ehtimolini 32 foizga kamaytiradi. Miya «kognitiv zaxira»ni shakllantiradi va bu yoshga bog‘liq o‘zgarishlarning o‘rnini bosadi.',
    questionRu: 'На сколько процентов чтение снижает вероятность когнитивного спада?',
    questionUz: 'Kitob o‘qish kognitiv zaiflashuv ehtimolini necha foizga kamaytiradi?',
    optionsRu: ['На 15 процентов', 'На 32 процента', 'На 50 процентов', 'На 68 процентов'],
    correctIndex: 1,
    explanationUz: 'Matnda aniq aytildi: «на 32 процента снижает вероятность...». 32 soni 2 bilan tugagani uchun «процента» qo‘llangan!',
    vocabulary: [
      { ru: 'Когнитивный резерв', uz: 'Aqliy zaxira' },
      { ru: 'Пожилой возраст', uz: 'Keksalik yoshi' },
      { ru: 'Компенсировать', uz: 'O‘rnini to‘ldirmoq' }
    ]
  },
  {
    id: 'l-hard-3',
    level: 'Сложный',
    titleRu: 'Критическое мышление и медиаграмотность',
    titleUz: 'Tanqidiy fikrlash va media-savodxonlik',
    audioTextRu: 'В эпоху информационного перенасыщения способность отличать достоверные факты от манипуляций становится базовым навыком выживания. Человек, привыкший к вдумчивому анализу первоисточников и аргументов в книгах, менее подвержен дезинформации и импульсивным эмоциональным решениям.',
    audioTextUz: 'Axborotning haddan tashqari ko‘pligi davrida ishonchli dalillarni manipulyatsiyalardan ajrata olish yashab qolishning asosiy mahoratiga aylanadi. Kitoblardagi asl manbalar va dalillarni chuqur tahlil qilishga odatlangan inson dezinformatsiya va hissiy shoshmashosharlik qarorlariga kamroq aldanadi.',
    questionRu: 'Почему начитанный человек менее подвержен дезинформации?',
    questionUz: 'Nima uchun ko‘p kitob o‘qigan inson dezinformatsiyaga kamroq aldanadi?',
    optionsRu: [
      'Потому что он не пользуется интернетом',
      'Потому что он умеет анализировать первоисточники и проверять аргументы',
      'Потому что он никому не доверяет',
      'Потому что он читает только новости'
    ],
    correctIndex: 1,
    explanationUz: 'Chunki u birlamchi manbalarni va keltirilgan argumentlarni tahlil qilishga o‘rgangan («анализу первоисточников и аргументов»).',
    vocabulary: [
      { ru: 'Информационное перенасыщение', uz: 'Axborot to‘lib-toshishi' },
      { ru: 'Первоисточники', uz: 'Birlamchi manbalar' },
      { ru: 'Импульсивные решения', uz: 'Hissiyotga berilgan shoshqaloq qarorlar' }
    ]
  },
  {
    id: 'l-hard-4',
    level: 'Сложный',
    titleRu: 'Эволюция языка и книжная культура',
    titleUz: 'Til evolyutsiyasi va kitob madaniyati',
    audioTextRu: 'Язык — это живой развивающийся организм, однако именно классическая литература служит якорем культурной преемственности. Без опоры на богатый корпус текстов язык рискует деградировать до набора примитивных шаблонов и сокращений, утрачивая тонкие стилистические оттенки.',
    audioTextUz: 'Til — bu tirik va rivojlanuvchi organizmdir, biroq aynan mumtoz adabiyot madaniy vorisiylik langari bo‘lib xizmat qiladi. Matnlarning boy xazinasiga suyanmasdan turib, til o‘zining nozik uslubiy jilolarini yo‘qotib, ibtidoiy qoliplar va qisqartmalar darajasiga tushib qolish xavfi ostida qoladi.',
    questionRu: 'Какую главную роль выполняет классическая литература для языка?',
    questionUz: 'Mumtoz adabiyot til uchun qanday asosiy rolni bajaradi?',
    optionsRu: [
      'Запрещает появление новых слов',
      'Служит якорем культурной преемственности и сохраняет богатство стиля',
      'Упрощает грамматические правила',
      'Заменяет собой устную речь'
    ],
    correctIndex: 1,
    explanationUz: 'U madaniy uzviylik langari va uslubiy boylikni saqlab qoladi («служит якорем культурной преемственности»).',
    vocabulary: [
      { ru: 'Культурная преемственность', uz: 'Madaniy vorisiylik / uzviylik' },
      { ru: 'Стилистические оттенки', uz: 'Uslubiy jilolar / nozikliklar' },
      { ru: 'Примитивные шаблоны', uz: 'Oddiy / jo‘n qoliplar' }
    ]
  },
  {
    id: 'l-hard-5',
    level: 'Сложный',
    titleRu: 'Синтез воображения и инноваций',
    titleUz: 'Tasavvur va innovatsiyalar sintezi',
    audioTextRu: 'Многие великие изобретатели признавались, что вдохновение для создания революционных технологий они черпали не из узкоспециализированных учебников, а из смелых научно-фантастических романов. Именно литература учит наш разум задавать фундаментальный вопрос: «А что, если?..».',
    audioTextUz: 'Ko‘plab buyuk ixtirochilar inqilobiy texnologiyalarni yaratishdagi ilhomni tor mutaxassislik darsliklaridan emas, balki dadil ilmiy-fantastik romanlardan olganliklarini e’tirof etganlar. Aynan adabiyot ongimizga «Agar shunday bo‘lsachi?..» degan fundamental savolni berishni o‘rgatadi.',
    questionRu: 'Откуда многие учёные и изобретатели черпали творческое вдохновение?',
    questionUz: 'Ko‘plab olimlar va ixtirochilar ijodiy ilhomni qayerdan olganlar?',
    optionsRu: [
      'Из случайных телепередач',
      'Из смелых научно-фантастических романов',
      'Только из финансовых отчётов',
      'Из рекламы в газетах'
    ],
    correctIndex: 1,
    explanationUz: 'Matnda aniq keltirildi: «...из смелых научно-фантастических романов» (ilmiy-fantastik romanlardan).',
    vocabulary: [
      { ru: 'Черпать вдохновение', uz: 'Ilhom olmoq' },
      { ru: 'Научно-фантастический', uz: 'Ilmiy-fantastik' },
      { ru: 'Фундаментальный вопрос', uz: 'Asosiy / tub savol' }
    ]
  }
];
