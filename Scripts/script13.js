
document.getElementById('generate_variant').addEventListener('click', generateTasks_13ex);

const taskDescriptions = [
            {
                topic: 'Озера',
                description: "Создайте презентацию из трех слайдов на тему «Озера». Включите информацию о крупнейших озерах мира, их глубине и значении для экосистемы.",
                text: "Озера — это водоемы с пресной или соленой водой, важные для экосистемы и туризма.",
                longDescription: `Озера играют ключевую роль в экосистемах, поскольку служат источником воды для миллионов людей, флоры и фауны. Например, озеро Байкал содержит более 20% мирового запаса пресной воды, а его уникальная экосистема включает множество эндемичных видов, таких как байкальская нерпа. Помимо экологической ценности, озера также являются важными экономическими и культурными ресурсами. Они обеспечивают водой население и сельское хозяйство, являются источником рыбы и служат центром туризма.
                Озера имеют большое культурное значение для местных народов и являются важным элементом в истории и мифологии. Великие озера Северной Америки и озеро Виктория в Африке вдохновляют художников, поэтов и писателей, которые воспевают их красоту и значение для природы и человечества.
                Международные усилия, направленные на сохранение озер, включают борьбу с изменением климата, поскольку повышение температуры напрямую влияет на уровень воды и биоразнообразие в озерах.`,
                table: {
                    header: ['Озеро', 'Особенности'],
                    rows: [
                        ['Байкал', 'Самое глубокое озеро в мире'],
                        ['Виктория', 'Крупнейшее озеро Африки'],
                        ['Ладожское', 'Крупнейшее озеро Европы']
                    ]
                }
            },
            {
                topic: 'Тигры',
                description: "Создайте презентацию на тему «Тигры». Включите места обитания, повадки и угрозы для популяции тигров.",
                text: "Тигры — крупнейшие представители семейства кошачьих, находящиеся под угрозой исчезновения.",
                longDescription: `Тигры символизируют силу и выносливость в разных культурах. Эти полосатые хищники встречаются в странах Азии и России, где играют решающую роль в поддержании баланса в экосистемах. Они контролируют популяции травоядных и тем самым способствуют сохранению лесов.
                Из-за утраты среды обитания и браконьерства численность тигров резко сократилась. Многие страны, такие как Индия и Россия, работают над увеличением популяции тигров, усиливая охрану и поддерживая местные сообщества.`,
                table: {
                    header: ['Фактор', 'Детали'],
                    rows: [
                        ['Ареал', 'Южная Азия, Дальний Восток'],
                        ['Пища', 'Млекопитающие, рыба'],
                        ['Популяция', 'Менее 4000 особей']
                    ]
                }
            },
            {
                topic: 'Вулканы',
                description: "Создайте презентацию на тему «Вулканы». Опишите их происхождение и влияние на окружающую среду.",
                text: "Вулканы — геологические образования, из которых изливается магма.",
                longDescription: `Вулканы — это геологические образования, которые служат ярким напоминанием о мощи природы. Они возникают в результате движения тектонических плит, при котором магма поднимается к поверхности и извергается в виде лавы и вулканических газов.
                Извержения вулканов оказывают как положительное, так и отрицательное воздействие на природу и людей. Вулканы также играют важную роль в формировании новых земель и в обновлении почвы. Современные технологии, такие как спутниковые системы и дроны, помогают ученым мониторить активность вулканов и предсказывать возможные извержения, что позволяет своевременно эвакуировать людей и минимизировать ущерб.`,
                table: {
                    header: ['Тип вулкана', 'Описание'],
                    rows: [
                        ['Стратовулкан', 'Слоистая структура'],
                        ['Щитовой', 'Пологие склоны'],
                        ['Купол', 'Вязкая лава']
                    ]
                }
            },
            {
                topic: 'Пустыни',
                description: "Создайте презентацию на тему «Пустыни». Включите климат, флору и фауну пустынь.",
                text: "Пустыни — засушливые регионы с высокой температурой днем и холодом ночью.",
                longDescription: `Пустыни — это суровые экосистемы, где жизнь адаптировалась к экстремальным условиям. Эти регионы отличаются высокой температурой днем и резким падением температуры ночью. В пустынях обитает множество уникальных растений и животных, таких как кактусы и верблюды.
                В последнее время площадь пустынь увеличивается из-за изменения климата и антропогенных факторов. Сегодня изучение пустынь и их сохранение становятся актуальными, так как они являются не только природными зонами, но и важными источниками полезных ископаемых и местом обитания редких видов.`,
                table: {
                    header: ['Фактор', 'Описание'],
                    rows: [
                        ['Температура', 'До 50°C днем, до -5°C ночью'],
                        ['Осадки', 'Меньше 250 мм в год'],
                        ['Растительность', 'Кактусы, суккуленты']
                    ]
                }
            },
            {
                topic: 'Космос',
                description: "Создайте презентацию на тему «Космос». Описание планет, звезд и галактик.",
                text: "Космос — пространство, в котором находятся звезды и планеты.",
                longDescription: `Космос — это бескрайнее пространство, содержащее миллиарды звезд, планет и галактик. Исследования космоса направлены на изучение космических явлений, таких как сверхновые и черные дыры, а также на понимание происхождения Вселенной.
                С каждым новым открытием человечество получает все больше вопросов, таких как природа темной материи и энергии. Космос остается для нас великим источником вдохновения, побуждая людей стремиться к новым открытиям.`,
                table: {
                    header: ['Объект', 'Характеристика'],
                    rows: [
                        ['Звезды', 'Выделяют свет и тепло'],
                        ['Планеты', 'Обращаются вокруг звезд'],
                        ['Галактики', 'Скопления звезд и планет']
                    ]
                }
            },
            {
                topic: 'Океаны',
                description: "Создайте презентацию на тему «Океаны». Описать значение океанов и экологические проблемы.",
                text: "Океаны покрывают более 70% поверхности Земли.",
                longDescription: `Океаны — это огромные водные массивы, которые покрывают более 70% поверхности Земли. Они играют критическую роль в поддержании климата, круговороте воды и биоразнообразии, являясь домом для миллионов видов.
                В последние десятилетия загрязнение, изменение климата и чрезмерный вылов рыбы оказывают негативное воздействие на морскую экосистему. Сегодня ведутся активные работы по восстановлению океанических экосистем и сохранению морских ресурсов.`,
                table: {
                    header: ['Океан', 'Особенность'],
                    rows: [
                        ['Тихий', 'Самый большой по площади'],
                        ['Атлантический', 'Наиболее изучен'],
                        ['Индийский', 'Обильные коралловые рифы']
                    ]
                }
            },
            {
                topic: 'Саванны',
                description: "Создайте презентацию на тему «Саванны». Опишите климат, флору и фауну.",
                text: "Саванны — ландшафты с высокой травой и редкими деревьями.",
                longDescription: `Саванны представляют собой экосистемы, в которых преобладает высокая трава и редкие деревья. Эти ландшафты распространены в Африке, Южной Америке и Австралии. Саванны служат местом обитания для многих уникальных видов, таких как слоны и львы.
                В последние годы саванны сталкиваются с угрозами, включая вырубку лесов и изменение климата. Сегодня усилия по сохранению саванн включают создание заповедников и защиту природных ресурсов.`,
                table: {
                    header: ['Фактор', 'Описание'],
                    rows: [
                        ['Климат', 'Сухой сезон и сезон дождей'],
                        ['Растительность', 'Трава, редкие деревья'],
                        ['Животные', 'Слоны, львы, жирафы']
                    ]
                }
            },
            {
                topic: 'Леса',
                description: "Создайте презентацию на тему «Леса». Описать типы лесов и их значение.",
                text: "Леса — экосистемы с деревьями и растениями, поддерживающие климат.",
                longDescription: `Леса покрывают около трети поверхности Земли и играют решающую роль в поддержании баланса кислорода и углекислого газа. Леса также являются домом для огромного разнообразия флоры и фауны, включая уникальные виды, такие как тропические деревья и крупные млекопитающие.
                Сохранение лесов — важный аспект для предотвращения климатических изменений и утраты биоразнообразия. Сегодня предпринимаются значительные усилия для защиты лесов от вырубки и создания природных заповедников.`,
                table: {
                    header: ['Тип леса', 'Особенности'],
                    rows: [
                        ['Тропический', 'Высокая влажность'],
                        ['Хвойный', 'Сосны и ели'],
                        ['Лиственный', 'Сезонное изменение листвы']
                    ]
                }
            },
            {
                topic: 'Горы',
                description: "Создайте презентацию на тему «Горы». Описать климат и флору гор.",
                text: "Горы — возвышенности, сформированные движением земной коры.",
                longDescription: `Горы — это естественные возвышенности, создаваемые тектоническими процессами и вулканической деятельностью. Горы играют важную роль в климате, регулируя потоки воздуха и являясь источником рек.
                В горах обитают уникальные виды, такие как снежные барсы и альпийские растения, адаптированные к суровым условиям. Горные районы также являются важными источниками пресной воды для низменных территорий.`,
                table: {
                    header: ['Фактор', 'Описание'],
                    rows: [
                        ['Климат', 'Холодный'],
                        ['Флора и фауна', 'Сосны, орлы'],
                        ['Высота', 'Эверест - 8848 м']
                    ]
                }
            },
            {
                topic: 'Реки',
                description: "Создайте презентацию на тему «Реки». Включите виды рек и их значение.",
                text: "Реки — потоки воды, текущие по суше от истока до устья.",
                longDescription: `Реки — это важные водные пути, которые поддерживают экосистемы и играют важную роль в жизни человека. Реки служат источниками воды для населения, сельского хозяйства и промышленности. Они также поддерживают биоразнообразие, создавая среды обитания для множества видов.
                В последние годы загрязнение и изменение климата оказывают давление на речные системы, что ведет к снижению их экосистемных функций. Сегодня меры по охране рек и восстановлению их естественных потоков играют важную роль в обеспечении устойчивого использования ресурсов.`,
                table: {
                    header: ['Река', 'Описание'],
                    rows: [
                        ['Амазонка', 'Самая полноводная'],
                        ['Нил', 'Длиннейшая'],
                        ['Волга', 'Самая длинная в Европе']
                    ]
                }
            },
            {
                topic: 'Птицы',
                description: "Создайте презентацию на тему «Птицы». Опишите адаптации к полету и роль в экосистемах.",
                text: "Птицы — теплокровные животные, способные летать с помощью крыльев.",
                longDescription: `Птицы представляют собой одну из самых адаптированных к полету групп животных. Их тела покрыты перьями, которые помогают удерживать тепло и облегчают полет. Полые кости и мощные грудные мышцы позволяют им подниматься в небо, а форма крыла варьируется в зависимости от образа жизни и среды обитания.
                В экосистемах птицы выполняют важные функции, такие как распространение семян растений и контроль популяций насекомых и мелких животных. Однако в последние годы популяции многих видов птиц сократились из-за разрушения мест обитания и изменения климата. Охрана птиц и их местообитаний становится приоритетом для экологов по всему миру.`,
                table: {
                    header: ['Адаптация', 'Описание'],
                    rows: [
                        ['Перья', 'Помогают в полете и удержании тепла'],
                        ['Полые кости', 'Снижают вес тела'],
                        ['Клюв', 'Видоизменен для различных типов пищи']
                    ]
                }
            },
            {
                topic: 'Коралловые рифы',
                description: "Создайте презентацию на тему «Коралловые рифы». Включите значение рифов и угрозы для них.",
                text: "Коралловые рифы — биологически активные системы, богатые биоразнообразием.",
                longDescription: `Коралловые рифы представляют собой экосистемы, где обитают тысячи видов рыб, моллюсков и других морских организмов. Рифы являются источником пищи и дохода для местного населения, а также защищают берега от эрозии, снижая силу волн.
                Угрозы для рифов включают потепление океанов, кислотность и загрязнение. Кораллы умирают от "отбеливания", вызванного стрессом от температуры, что разрушает экосистему. Сегодня многие страны ведут работу по восстановлению рифов и защите их от разрушения.`,
                table: {
                    header: ['Фактор', 'Угрозы'],
                    rows: [
                        ['Потепление океанов', 'Приводит к отбеливанию кораллов'],
                        ['Кислотность воды', 'Повреждает карбонатные структуры'],
                        ['Загрязнение', 'Уменьшает биологическую активность']
                    ]
                }
            },
            {
                topic: 'Леса Амазонии',
                description: "Создайте презентацию на тему «Леса Амазонии». Опишите их значение и угрозы.",
                text: "Амазонские леса — крупнейший в мире тропический лесной массив.",
                longDescription: `Амазонские леса играют ключевую роль в регулировании климата Земли, поглощая углекислый газ и вырабатывая кислород. Они являются домом для тысяч видов растений и животных, многие из которых эндемичны.
                Однако сегодня Амазония страдает от вырубки, пожаров и изменения климата. Потеря лесов ведет к утрате биоразнообразия и оказывает влияние на местные общины, живущие в этих районах. Сохранение Амазонии требует глобальных усилий по уменьшению выбросов и защите лесных экосистем.`,
                table: {
                    header: ['Фактор', 'Угроза'],
                    rows: [
                        ['Вырубка', 'Леса вырубаются под сельское хозяйство'],
                        ['Пожары', 'Увеличивают деградацию лесов'],
                        ['Изменение климата', 'Меняет структуру лесов']
                    ]
                }
            },
            {
                topic: 'Ледники',
                description: "Создайте презентацию на тему «Ледники». Описать процесс формирования и их роль.",
                text: "Ледники — массивные образования льда, движущиеся под силой гравитации.",
                longDescription: `Ледники образуются при длительном накоплении снега и его уплотнении в лед. Эти ледяные массивы играют важную роль в круговороте воды, питая реки и обеспечивая пресной водой миллионы людей.
                Потепление климата приводит к сокращению ледников, что увеличивает уровень моря и угрожает прибрежным регионам. Ледники также являются важными источниками информации о климате прошлого, так как содержат слои льда, накопленные за тысячи лет.`,
                table: {
                    header: ['Тип ледника', 'Описание'],
                    rows: [
                        ['Континентальный', 'Охватывает огромные площади'],
                        ['Альпийский', 'Образуется в горах'],
                        ['Подвижный', 'Способен двигаться по склону']
                    ]
                }
            },
            {
                topic: 'Мед',
                description: "Создайте презентацию на тему «Мед». Описание свойств, пользы и применения в питании.",
                text: "Мед — натуральный продукт, производимый пчелами, известный своими целебными свойствами.",
                longDescription: `Мед — один из самых древних и ценных продуктов питания, используемых человеком. Он богат антиоксидантами, витаминами и минералами, которые благоприятно влияют на здоровье. Мед обладает антибактериальными свойствами и часто используется в медицине для лечения ран и простудных заболеваний.
                В кулинарии мед применяется как натуральный подсластитель, а также в производстве косметики благодаря своим увлажняющим свойствам. Однако важно помнить, что при нагревании мед теряет часть своих полезных свойств. В последние годы спрос на мед увеличился, и на рынках появляется все больше видов меда, каждый из которых обладает уникальными вкусовыми качествами и свойствами.`,
                table: {
                    header: ['Тип меда', 'Особенность'],
                    rows: [
                        ['Липовый', 'Обладает успокаивающими свойствами'],
                        ['Гречишный', 'Богат железом'],
                        ['Цветочный', 'Сладкий и ароматный']
                    ]
                }
            },
            {
                topic: 'Национальные парки',
                description: "Создайте презентацию на тему «Национальные парки». Описать значение и цели создания парков.",
                text: "Национальные парки — охраняемые природные территории для сохранения экосистем.",
                longDescription: `Национальные парки создаются для защиты уникальных природных ландшафтов и экосистем от разрушения. Эти территории являются местом обитания множества видов животных и растений, а также сохраняют важные природные ресурсы.
                Посещение национальных парков помогает людям лучше понять и ценить природу. Однако в последние годы на парки возросла нагрузка из-за туристического потока. Поэтому работа по защите природных парков включает в себя разработку устойчивых методов управления.`,
                table: {
                    header: ['Национальный парк', 'Особенность'],
                    rows: [
                        ['Йеллоустоун', 'Первый национальный парк в мире'],
                        ['Серенгети', 'Известен миграцией животных'],
                        ['Куршская коса', 'Уникальные дюны и сосновые леса']
                    ]
                }
            },
            {
                topic: 'Звезды',
                description: "Создайте презентацию на тему «Звезды». Описание типов звезд и их эволюции.",
                text: "Звезды — массивные светила, излучающие свет и тепло.",
                longDescription: `Звезды — это массивные светящиеся тела, состоящие в основном из водорода и гелия, которые поддерживают термоядерные реакции в своих ядрах. Их жизнь начинается из газовых и пылевых облаков и проходит через этапы, такие как протозвезда, главная последовательность, и может завершиться как белый карлик, нейтронная звезда или черная дыра. Различные типы звезд — от малых красных карликов до массивных сверхновых — играют ключевую роль в эволюции галактик.
                Звезды также являются важным источником элементов, из которых состоит наша Солнечная система и всё живое на Земле.`,
                table: {
                    header: ['Тип звезды', 'Описание'],
                    rows: [
                        ['Красный карлик', 'Малая масса и низкая температура'],
                        ['Желтый карлик', 'Тип звезды, к которому относится Солнце'],
                        ['Сверхгигант', 'Самые массивные и яркие звезды']
                    ]
                }
            },
            {
                topic: 'Фауна Австралии',
                description: "Создайте презентацию на тему «Фауна Австралии». Описать уникальные виды и их особенности.",
                text: "Фауна Австралии уникальна, включающая множество эндемичных видов.",
                longDescription: `Австралия известна своей уникальной фауной, поскольку этот континент долгое время был изолирован от остальных частей света. Здесь обитают животные, не встречающиеся больше нигде, такие как кенгуру, коалы, утконосы и ехидны. Австралийские животные хорошо адаптировались к местным климатическим условиям и особенностям ландшафта.
                Австралия также является домом для некоторых из самых опасных змей и пауков в мире, что делает ее фауну как восхитительной, так и потенциально опасной.`,
                table: {
                    header: ['Животное', 'Особенность'],
                    rows: [
                        ['Кенгуру', 'Передвигается прыжками'],
                        ['Коала', 'Питается листьями эвкалипта'],
                        ['Утконос', 'Откладывает яйца']
                    ]
                }
            },
            {
                topic: 'Римская империя',
                description: "Создайте презентацию на тему «Римская империя». Описать её вклад в развитие цивилизации.",
                text: "Римская империя — одно из величайших государств античности.",
                longDescription: `Римская империя сыграла ключевую роль в развитии западной цивилизации, внеся огромный вклад в области права, инженерии, архитектуры и искусства. Империя, простиравшаяся на три континента, объединила множество культур и народов под одной властью.
                Наследие Рима до сих пор влияет на наше законодательство, язык, городское планирование и культуру. Акведуки, дороги и термы, построенные римлянами, до сих пор удивляют своей инженерной продвинутостью и функциональностью.`,
                table: {
                    header: ['Достижение', 'Описание'],
                    rows: [
                        ['Акведуки', 'Подача воды в города'],
                        ['Римское право', 'Основы современного права'],
                        ['Римские дороги', 'Система дорог, связывающих империю']
                    ]
                }
            },
            {
                topic: 'Пирамиды Египта',
                description: "Создайте презентацию на тему «Пирамиды Египта». Описать их историю и значение.",
                text: "Пирамиды — величайшие памятники Древнего Египта.",
                longDescription: `Пирамиды Египта — одно из семи чудес света, представляющее собой уникальные погребальные сооружения фараонов. Наиболее известные — пирамиды Хеопса, Хефрена и Микерина в Гизе, построенные около 2500 лет до нашей эры. Они демонстрируют мастерство древнеегипетских инженеров и строителей.
                Пирамиды символизируют стремление египтян к вечной жизни и выражают их веру в загробную жизнь. Сегодня эти сооружения привлекают миллионы туристов со всего мира и остаются объектом археологических исследований.`,
                table: {
                    header: ['Пирамида', 'Особенность'],
                    rows: [
                        ['Хеопса', 'Самая высокая пирамида'],
                        ['Хефрена', 'Сохранилась с вершиной из известняка'],
                        ['Микерина', 'Самая маленькая из трех великих пирамид']
                    ]
                }
            },
            {
                topic: 'Климатические зоны',
                description: "Создайте презентацию на тему «Климатические зоны». Описать основные типы климата.",
                text: "Климатические зоны характеризуются температурой и осадками.",
                longDescription: `На Земле существует несколько климатических зон, каждая из которых отличается характерными температурными и осадочными условиями. Экваториальный климат, например, теплый и влажный, с густыми лесами. Пустынный климат, напротив, характеризуется высокими температурами и низкими осадками.
                Климат влияет на растительность, фауну и условия жизни людей. Понимание климатических зон важно для сельского хозяйства, экологии и городского планирования.`,
                table: {
                    header: ['Климатическая зона', 'Характеристика'],
                    rows: [
                        ['Тропическая', 'Теплая и влажная'],
                        ['Пустынная', 'Жаркая и сухая'],
                        ['Полярная', 'Холодная и сухая']
                    ]
                }
            },
            {
                topic: 'Чудеса природы',
                description: "Создайте презентацию на тему «Чудеса природы». Опишите уникальные природные явления.",
                text: "Чудеса природы — удивительные и уникальные природные явления.",
                longDescription: `На планете существует множество уникальных природных чудес, таких как Великий каньон, северное сияние, водопад Виктория и Большой Барьерный риф. Эти природные объекты впечатляют своими масштабами, красотой и геологическими особенностями.
                Сохранение природных чудес важно для будущих поколений, так как они представляют собой уникальное наследие и поддерживают экосистемы. Ученые и туристы со всего мира продолжают исследовать и восхищаться этими природными чудесами.`,
                table: {
                    header: ['Чудо природы', 'Описание'],
                    rows: [
                        ['Великий каньон', 'Глубокий и красочный каньон'],
                        ['Северное сияние', 'Световые полосы на небе в полярных регионах'],
                        ['Большой Барьерный риф', 'Крупнейший коралловый риф в мире']
                    ]
                }
            },
            {
                topic: 'Антарктида',
                description: "Создайте презентацию на тему «Антарктида». Опишите её климат, фауну и научные исследования.",
                text: "Антарктида — самый холодный и засушливый континент на Земле.",
                longDescription: `Антарктида является уникальным континентом, покрытым льдом и окруженным суровым климатом. Это один из самых засушливых и холодных регионов на Земле, где температуры могут опускаться ниже -80°C. Несмотря на суровые условия, Антарктида является домом для множества видов, таких как пингвины и морские котики.
                Научные исследования, проводимые на этом континенте, играют важную роль в изучении изменений климата и атмосферы. Ледники Антарктиды содержат ценные данные о климате прошлого и помогают ученым предсказывать будущее.`,
                table: {
                    header: ['Фактор', 'Описание'],
                    rows: [
                        ['Температура', 'До -80°C'],
                        ['Животные', 'Пингвины, морские котики'],
                        ['Научные исследования', 'Изучение климата и экосистемы']
                    ]
                }
            },
            {
                topic: 'Мировые океаны',
                description: "Создайте презентацию на тему «Мировые океаны». Опишите их значение и основные экосистемы.",
                text: "Океаны покрывают более 70% поверхности Земли и содержат разнообразные экосистемы.",
                longDescription: `Мировые океаны играют решающую роль в поддержании климата и круговорота воды на Земле. Они регулируют температуру планеты и поддерживают богатые экосистемы, такие как коралловые рифы, мангровые леса и глубоководные каньоны. Океаны являются домом для миллиарда видов, включая рыб, моллюсков и млекопитающих, таких как дельфины и киты.
                Однако океаны сталкиваются с серьезными проблемами, включая загрязнение пластиком, повышение кислотности и чрезмерный вылов рыбы. Сохранение океанов является приоритетом для международного сообщества, так как океаны поддерживают биоразнообразие и жизнь на планете.`,
                table: {
                    header: ['Экосистема', 'Описание'],
                    rows: [
                        ['Коралловые рифы', 'Место обитания многих видов'],
                        ['Мангровые леса', 'Защищают берега от эрозии'],
                        ['Глубоководные зоны', 'Темные и холодные слои океана']
                    ]
                }
            },
            {
                topic: 'Древние цивилизации',
                description: "Создайте презентацию на тему «Древние цивилизации». Опишите их вклад в историю и культуру.",
                text: "Древние цивилизации — ключевые этапы развития человечества.",
                longDescription: `Древние цивилизации, такие как Месопотамия, Египет, Индия и Китай, сыграли важную роль в развитии культуры, науки и технологий. Они создали письменность, начали строить города и оставили обширные знания по медицине, астрономии и математике.
                Эти культуры заложили основы современной цивилизации, от письменности до правовых систем и инженерных достижений. Наследие древних цивилизаций до сих пор оказывает влияние на нашу культуру, а археологические исследования продолжают открывать новые аспекты их жизни.`,
                table: {
                    header: ['Цивилизация', 'Достижение'],
                    rows: [
                        ['Месопотамия', 'Первая письменность'],
                        ['Египет', 'Пирамиды'],
                        ['Китай', 'Изобретение бумаги']
                    ]
                }
            },
            {
                topic: 'Великая китайская стена',
                description: "Создайте презентацию на тему «Великая китайская стена». Опишите её историю и значение.",
                text: "Великая китайская стена — одна из самых известных архитектурных сооружений мира.",
                longDescription: `Великая китайская стена — это массивное оборонительное сооружение, простирающееся более чем на 21 000 километров. Построенная в течение нескольких столетий, начиная с III века до н. э., стена защищала китайские территории от набегов кочевников и служила символом силы империи.
                В настоящее время Великая китайская стена является объектом Всемирного наследия ЮНЕСКО и одной из самых популярных туристических достопримечательностей Китая. Она также символизирует мощь и культурное единство Китая на протяжении веков.`,
                table: {
                    header: ['Секция стены', 'Описание'],
                    rows: [
                        ['Бадалин', 'Самая посещаемая часть стены'],
                        ['Мутяньюй', 'Известна своими живописными видами'],
                        ['Цзиньшаньлин', 'Одна из наиболее хорошо сохранившихся секций']
                    ]
                }
            }
        ];


        let selectedTask = null;

        function generateTasks_13ex() {
            selectedTask = taskDescriptions[Math.floor(Math.random() * taskDescriptions.length)];
            document.getElementById("task1_13ex").textContent = selectedTask.description;

            const tableHtml = `
                <p>${selectedTask.text}</p>
                <table class="table">
                    <tr><th>${selectedTask.table.header[0]}</th><th>${selectedTask.table.header[1]}</th></tr>
                    ${selectedTask.table.rows.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('')}
                </table>
            `;
            document.getElementById("generatedText13_2_13ex").innerHTML = tableHtml;
        }

        function createImageCanvas(text) {
            const canvas = document.createElement("canvas");
            canvas.width = 300;
            canvas.height = 200;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#D3D3D3";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText(text, 20, 100);
            return canvas.toDataURL("image/jpeg");
        }

        function generateArchive_13ex() {
            if (!selectedTask) {
                alert("Сначала сгенерируйте задание, нажав 'Сгенерировать задание'");
                return;
            }

            const zip = new JSZip();
            const descriptionText = `${selectedTask.longDescription}`;
            
            zip.file("Описание_темы.txt", descriptionText);

            for (let i = 1; i <= 9; i++) {
                const imgData = createImageCanvas(`${selectedTask.topic} - Изображение ${i}`);
                const imgBlob = dataURItoBlob(imgData);
                zip.file(`image${i}.jpg`, imgBlob, { binary: true });
            }

            zip.generateAsync({ type: "blob" }).then((content) => {
                saveAs(content, "presentation_materials.zip");
            }).catch((error) => {
                console.error("Ошибка при создании архива:", error);
                alert("Ошибка при создании архива. Пожалуйста, попробуйте снова.");
            });
        }

        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }