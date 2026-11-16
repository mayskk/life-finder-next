
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Telescope,
  Search,
  Orbit,
  Database,
  Sparkles,
  Globe2,
  X,
  ArrowUpRight,
  Satellite,
  Radar,
  Brain,
  Trophy,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
  BookOpen,
  Rocket,
  Star,
  ArrowLeft
} from "lucide-react";

const originalTitle = "LIFE FINDER";

function DecryptedTitle() {
  const [title, setTitle] = useState(originalTitle);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iteration = 0;

    const interval = setInterval(() => {
      setTitle(
        originalTitle.split("").map((letter, index) => {
          if (index < iteration) return originalTitle[index];
          if (letter === " ") return " ";
          return characters[Math.floor(Math.random() * characters.length)];
        }).join("")
      );

      iteration += 0.35;

      if (iteration >= originalTitle.length) {
        clearInterval(interval);
        setTitle(originalTitle);
        setFinished(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={finished ? "hero-title finished" : "hero-title"}>
      {title}
    </h1>
  );
}

function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 220 }).map((_, index) => {
        const isLarge = index % 17 === 0;

        return (
          <span
            className={`particle ${isLarge ? "particle-bright" : ""}`}
            key={index}
            style={{
              left: `${(index * 37.17) % 100}%`,
              top: `${(index * 61.31) % 100}%`,
              animationDelay: `${(index % 13) * -0.8}s`,
              animationDuration: `${4 + (index % 9)}s`,
              "--size": `${1 + (index % 4)}px`,
              "--drift": `${((index % 7) - 3) * 20}px`
            }}
          />
        );
      })}
    </div>
  );
}

function CosmicBackground() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame;

    const handlePointer = (event) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        setPointer({
          x: (event.clientX / window.innerWidth - 0.5) * 2,
          y: (event.clientY / window.innerHeight - 0.5) * 2
        });
      });
    };

    window.addEventListener("pointermove", handlePointer, {
      passive: true
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="cosmic-deep-glow" />

      <div
        className="cosmic-nebula cosmic-nebula-one"
        style={{
          transform: `translate(${pointer.x * -25}px, ${pointer.y * -18}px)`
        }}
      />

      <div
        className="cosmic-nebula cosmic-nebula-two"
        style={{
          transform: `translate(${pointer.x * 30}px, ${pointer.y * 22}px)`
        }}
      />

      <div
        className="cosmic-nebula cosmic-nebula-three"
        style={{
          transform: `translate(${pointer.x * -18}px, ${pointer.y * 28}px)`
        }}
      />

      <div className="cosmic-nebula cosmic-nebula-four" />
      <div className="cosmic-nebula cosmic-nebula-five" />

      <div className="cosmic-light-beam" />

      <div className="cosmic-stars">
        <Particles />
      </div>

      <div className="cosmic-grid" />

      <div className="cosmic-orbit cosmic-orbit-one" />
      <div className="cosmic-orbit cosmic-orbit-two" />
      <div className="cosmic-orbit cosmic-orbit-three" />

      <div className="cosmic-dust cosmic-dust-one" />
      <div className="cosmic-dust cosmic-dust-two" />
      <div className="cosmic-dust cosmic-dust-three" />

      <div className="cosmic-flare cosmic-flare-one" />
      <div className="cosmic-flare cosmic-flare-two" />
    </div>
  );
}

function ResearchDashboard() {
  const statistics = [
    {
      icon: <Orbit />,
      value: "6 000+",
      label: "известных экзопланет",
      detail: "Открытые далёкие миры"
    },
    {
      icon: <Globe2 />,
      value: "100+",
      label: "интересных миров",
      detail: "Для дальнейшего изучения"
    },
    {
      icon: <Radar />,
      value: "4 000+",
      label: "звёздных систем",
      detail: "Области космических открытий"
    },
    {
      icon: <Satellite />,
      value: "NASA",
      label: "космические данные",
      detail: "Научные наблюдения"
    }
  ];

  return (
    <section className="research-dashboard">
      <div className="dashboard-heading">
        <div>
          <span className="dashboard-overline">
            THE UNIVERSE IN NUMBERS
          </span>
          <h2>Космос в цифрах</h2>
          <p>Немного о масштабах поиска новых миров</p>
        </div>

        <div className="dashboard-live">
          <span className="live-dot" />
          SPACE OVERVIEW
        </div>
      </div>

      <div className="dashboard-grid">
        {statistics.map((item, index) => (
          <motion.div
            className="dashboard-card"
            key={item.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ y: -6 }}
          >
            <div className="dashboard-icon">{item.icon}</div>
            <strong>{item.value}</strong>
            <span className="dashboard-label">{item.label}</span>
            <span className="dashboard-detail">{item.detail}</span>
          </motion.div>
        ))}
      </div>

      <p className="dashboard-note">
        Демонстрационные показатели · LIFE FINDER
      </p>
    </section>
  );
}

const planets = [
  {
    name: "TRAPPIST-1 e",
    type: "Каменистая экзопланета",
    distance: "Около 40 световых лет",
    description:
      "Одна из интересных планет системы TRAPPIST-1 для исследования потенциальной обитаемости.",
    color: "planet-purple",
    facts: [
      "Находится в системе звезды TRAPPIST-1.",
      "Её размер близок к размеру Земли.",
      "Расположена в обитаемой зоне своей звезды."
    ],
    note:
      "Нахождение в обитаемой зоне не означает, что на планете существует жизнь."
  },
  {
    name: "Proxima Centauri b",
    type: "Экзопланета у красного карлика",
    distance: "Около 4,2 светового года",
    description:
      "Известная экзопланета, вращающаяся вокруг ближайшей к Солнцу звезды.",
    color: "planet-blue",
    facts: [
      "Обращается вокруг звезды Проксима Центавра.",
      "Находится в нашей ближайшей звёздной системе.",
      "Получает энергию от красного карлика."
    ],
    note: "Условия на поверхности планеты пока неизвестны."
  },
  {
    name: "Kepler-186f",
    type: "Каменистая экзопланета",
    distance: "Около 500 световых лет",
    description:
      "Первая известная планета земного размера, обнаруженная в обитаемой зоне другой звезды.",
    color: "planet-pink",
    facts: [
      "Обнаружена космическим телескопом Kepler.",
      "Находится в системе красного карлика.",
      "Её радиус близок к радиусу Земли."
    ],
    note:
      "Наличие атмосферы и жидкой воды на поверхности не подтверждено."
  }
];

// Вопросы COSMIC QUIZ

const quizCategories = [
  { id: "all", name: "Все категории", icon: <Orbit /> },
  { id: "planets", name: "Планеты", icon: <Globe2 /> },
  { id: "galaxies", name: "Галактики", icon: <Star /> },
  { id: "missions", name: "Космические миссии", icon: <Rocket /> },
  { id: "exoplanets", name: "Экзопланеты", icon: <Telescope /> }
];

const quizLevels = [
  {
    id: "beginner",
    name: "BEGINNER",
    description: "Начальный уровень",
    icon: <Star />
  },
  {
    id: "explorer",
    name: "EXPLORER",
    description: "Средний уровень",
    icon: <Target />
  },
  {
    id: "scientist",
    name: "SCIENTIST",
    description: "Продвинутый уровень",
    icon: <Brain />
  }
];

const quizQuestions = [
  {
    category: "planets",
    level: "beginner",
    question: "Какая планета известна своими кольцами?",
    answers: ["Марс", "Сатурн", "Венера", "Меркурий"],
    correct: 1,
    explanation:
      "Сатурн известен своей системой колец, состоящей преимущественно из частиц льда и каменистого материала."
  },
  {
    category: "planets",
    level: "beginner",
    question: "Какая планета находится ближе всего к Солнцу?",
    answers: ["Земля", "Венера", "Меркурий", "Марс"],
    correct: 2,
    explanation:
      "Меркурий — самая близкая к Солнцу планета Солнечной системы."
  },
  {
    category: "planets",
    level: "explorer",
    question: "Какая планета известна Большим красным пятном?",
    answers: ["Юпитер", "Нептун", "Уран", "Сатурн"],
    correct: 0,
    explanation:
      "Большое красное пятно — гигантская атмосферная структура на Юпитере."
  },
  {
    category: "planets",
    level: "explorer",
    question: "Какая планета вращается почти на боку?",
    answers: ["Марс", "Уран", "Венера", "Земля"],
    correct: 1,
    explanation:
      "Ось вращения Урана сильно наклонена, поэтому планета словно вращается лёжа на боку."
  },
  {
    category: "planets",
    level: "scientist",
    question: "Как называется граница, за которой газовый гигант может удерживать кольца?",
    answers: [
      "Граница Роша",
      "Пояс Койпера",
      "Граница Хаббла",
      "Пояс астероидов"
    ],
    correct: 0,
    explanation:
      "Предел Роша — область, внутри которой приливные силы могут разрушать крупное тело, удерживаемое гравитацией планеты."
  },
  {
    category: "planets",
    level: "scientist",
    question: "Какой газ преобладает в атмосфере Венеры?",
    answers: ["Кислород", "Азот", "Углекислый газ", "Водород"],
    correct: 2,
    explanation:
      "Атмосфера Венеры состоит преимущественно из углекислого газа."
  },

  {
    category: "galaxies",
    level: "beginner",
    question: "В какой галактике находится Солнечная система?",
    answers: ["Андромеда", "Млечный Путь", "Треугольник", "Сомбреро"],
    correct: 1,
    explanation:
      "Солнечная система находится в галактике Млечный Путь."
  },
  {
    category: "galaxies",
    level: "beginner",
    question: "Что такое звезда?",
    answers: [
      "Каменный спутник",
      "Светящийся газовый шар",
      "Ледяная комета",
      "Астероид"
    ],
    correct: 1,
    explanation:
      "Звёзды — огромные горячие газовые объекты, внутри которых происходят термоядерные реакции."
  },
  {
    category: "galaxies",
    level: "explorer",
    question: "Как называется галактика, ближайшая к Млечному Пути среди крупных галактик?",
    answers: ["Андромеда", "Большое Магелланово Облако", "Сомбреро", "Водоворот"],
    correct: 0,
    explanation:
      "Галактика Андромеды — ближайшая к Млечному Пути крупная спиральная галактика."
  },
  {
    category: "galaxies",
    level: "explorer",
    question: "Что находится в центре Млечного Пути?",
    answers: [
      "Нейтронная звезда",
      "Сверхмассивная чёрная дыра",
      "Планета",
      "Белый карлик"
    ],
    correct: 1,
    explanation:
      "В центре нашей галактики находится сверхмассивная чёрная дыра Стрелец A*."
  },
  {
    category: "galaxies",
    level: "scientist",
    question: "Как называется процесс рождения новых звёзд из газа и пыли?",
    answers: [
      "Аккреция планет",
      "Звездообразование",
      "Гравитационное линзирование",
      "Сублимация"
    ],
    correct: 1,
    explanation:
      "Звездообразование происходит в плотных областях межзвёздных газопылевых облаков."
  },
  {
    category: "galaxies",
    level: "scientist",
    question: "Что изучает космология?",
    answers: [
      "Только планеты",
      "Происхождение и развитие Вселенной",
      "Только Солнце",
      "Только спутники Земли"
    ],
    correct: 1,
    explanation:
      "Космология исследует происхождение, структуру, эволюцию и крупномасштабные свойства Вселенной."
  },

  {
    category: "missions",
    level: "beginner",
    question: "Как называется первый человек, побывавший в космосе?",
    answers: [
      "Нил Армстронг",
      "Юрий Гагарин",
      "Алексей Леонов",
      "Базз Олдрин"
    ],
    correct: 1,
    explanation:
      "Юрий Гагарин совершил первый в истории полёт человека в космос 12 апреля 1961 года."
  },
  {
    category: "missions",
    level: "beginner",
    question: "Как называется аппарат, который исследует поверхность Марса?",
    answers: ["Марсоход", "Телескоп", "Орбитальная станция", "Ракета"],
    correct: 0,
    explanation:
      "Марсоход — роботизированный аппарат для исследования поверхности Марса."
  },
  {
    category: "missions",
    level: "explorer",
    question: "Как называлась программа первых высадок людей на Луну?",
    answers: ["Voyager", "Apollo", "Hubble", "Pioneer"],
    correct: 1,
    explanation:
      "Программа Apollo NASA включала первые пилотируемые высадки людей на Луну."
  },
  {
    category: "missions",
    level: "explorer",
    question: "Как называется космический телескоп, запущенный в 1990 году?",
    answers: [
      "James Webb",
      "Hubble",
      "Kepler",
      "Chandra"
    ],
    correct: 1,
    explanation:
      "Космический телескоп Hubble был запущен в 1990 году и наблюдает Вселенную с орбиты Земли."
  },
  {
    category: "missions",
    level: "scientist",
    question: "Для чего используют гравитационный манёвр космических аппаратов?",
    answers: [
      "Для получения энергии от звёзд",
      "Для изменения скорости и направления полёта",
      "Для создания кислорода",
      "Для остановки времени"
    ],
    correct: 1,
    explanation:
      "Гравитационный манёвр использует движение и гравитацию небесного тела для изменения траектории и скорости аппарата."
  },
  {
    category: "missions",
    level: "scientist",
    question: "Как называется точка, где гравитационные силы позволяют аппарату сохранять относительное положение?",
    answers: [
      "Точка Лагранжа",
      "Предел Роша",
      "Пояс Койпера",
      "Точка зенита"
    ],
    correct: 0,
    explanation:
      "Точки Лагранжа — положения в системе двух массивных тел, где небольшое тело может сохранять устойчивое относительное положение."
  },

  {
    category: "exoplanets",
    level: "beginner",
    question: "Как называют планету за пределами Солнечной системы?",
    answers: ["Карликовая планета", "Экзопланета", "Комета", "Астероид"],
    correct: 1,
    explanation:
      "Экзопланета — планета, которая обращается вокруг другой звезды или находится вне нашей Солнечной системы."
  },
  {
    category: "exoplanets",
    level: "beginner",
    question: "Как называется наша звезда?",
    answers: ["Сириус", "Полярная", "Солнце", "Проксима"],
    correct: 2,
    explanation:
      "Солнце — звезда в центре нашей планетной системы."
  },
  {
    category: "exoplanets",
    level: "explorer",
    question: "Что такое обитаемая зона звезды?",
    answers: [
      "Место, где точно есть жизнь",
      "Область, где при подходящих условиях возможна жидкая вода",
      "Область без гравитации",
      "Место рождения звёзд"
    ],
    correct: 1,
    explanation:
      "Обитаемая зона — область вокруг звезды, где при подходящих атмосферных условиях на поверхности планеты может существовать жидкая вода."
  },
  {
    category: "exoplanets",
    level: "explorer",
    question: "Какой телескоп обнаружил множество экзопланет методом транзита?",
    answers: ["Kepler", "Hubble", "Chandra", "Spitzer"],
    correct: 0,
    explanation:
      "Космический телескоп Kepler использовал транзитный метод для обнаружения тысяч кандидатов и подтверждённых экзопланет."
  },
  {
    category: "exoplanets",
    level: "scientist",
    question: "Что измеряет транзитный метод обнаружения экзопланет?",
    answers: [
      "Изменение яркости звезды",
      "Температуру ядра планеты",
      "Цвет поверхности",
      "Скорость вращения галактики"
    ],
    correct: 0,
    explanation:
      "Когда планета проходит перед звездой, яркость звезды немного уменьшается. По таким изменениям можно обнаружить планету."
  },
  {
    category: "exoplanets",
    level: "scientist",
    question: "Что можно исследовать с помощью спектроскопии атмосферы экзопланеты?",
    answers: [
      "Точный возраст каждого камня",
      "Некоторые компоненты атмосферы",
      "Количество спутников без наблюдений",
      "Внутреннюю температуру ядра напрямую"
    ],
    correct: 1,
    explanation:
      "Анализ спектра света может помочь определить некоторые газы и вещества в атмосфере экзопланеты."
  }
];

function CosmicQuiz() {
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("beginner");
  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    const filtered = quizQuestions.filter((question) => {
      const categoryMatches =
        category === "all" || question.category === category;

      return categoryMatches && question.level === level;
    });

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    setQuestions(shuffled);
    setCurrent(0);
    setSelectedAnswer(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null || checked) return;

    if (selectedAnswer === questions[current].correct) {
      setScore((previous) => previous + 1);
    }

    setChecked(true);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setCurrent((previous) => previous + 1);
    setSelectedAnswer(null);
    setChecked(false);
  };

  const restartQuiz = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setCurrent(0);
    setSelectedAnswer(null);
    setChecked(false);
    setScore(0);
  };

  const question = questions[current];

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  const categoryName =
    quizCategories.find((item) => item.id === category)?.name ||
    "Все категории";

  const levelName =
    quizLevels.find((item) => item.id === level)?.name || "BEGINNER";

  return (
    <section className="cosmic-quiz">
      <div className="quiz-hero">
        <motion.div
          className="quiz-hero-icon"
          animate={{ rotate: [0, 8, -8, 0], y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Brain size={36} />
        </motion.div>

        <span className="quiz-overline">
          LEARN · EXPLORE · DISCOVER
        </span>

        <h2>COSMIC QUIZ</h2>

        <p>
          Проверь свои знания о Вселенной.
          <br />
          Стань настоящим исследователем космоса!
        </p>

        <div className="quiz-hero-stats">
          <span><BookOpen size={15} /> 4 категории</span>
          <span><Zap size={15} /> 3 уровня</span>
          <span><Trophy size={15} /> Твои достижения</span>
        </div>
      </div>

      {!started && !finished && (
        <motion.div
          className="quiz-setup"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="quiz-section-heading">
            <span>01 / SELECT YOUR MISSION</span>
            <h3>Выбери направление исследования</h3>
            <p>Каждая категория открывает новые знания о космосе.</p>
          </div>

          <div className="quiz-category-grid">
            {quizCategories.map((item) => (
              <button
                key={item.id}
                className={`quiz-category ${
                  category === item.id ? "active" : ""
                }`}
                onClick={() => setCategory(item.id)}
              >
                <span className="quiz-category-icon">{item.icon}</span>
                <strong>{item.name}</strong>
                {category === item.id && (
                  <CheckCircle2 className="quiz-category-check" size={17} />
                )}
              </button>
            ))}
          </div>

          <div className="quiz-section-heading quiz-level-heading">
            <span>02 / CHOOSE DIFFICULTY</span>
            <h3>Выбери уровень сложности</h3>
          </div>

          <div className="quiz-level-grid">
            {quizLevels.map((item) => (
              <button
                key={item.id}
                className={`quiz-level ${
                  level === item.id ? "active" : ""
                }`}
                onClick={() => setLevel(item.id)}
              >
                <span>{item.icon}</span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </button>
            ))}
          </div>

          <div className="quiz-start-panel">
            <div>
              <span>ТВОЯ МИССИЯ</span>
              <strong>{categoryName} · {levelName}</strong>
              <small>
                {category === "all" ? "8 вопросов" : "2 вопроса"}
              </small>
            </div>

            <button className="quiz-start-button" onClick={startQuiz}>
              Начать викторину
              <ArrowUpRight size={19} />
            </button>
          </div>
        </motion.div>
      )}

      {started && !finished && question && (
        <motion.div
          className="quiz-question-panel"
          key={current}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="quiz-question-top">
            <button className="quiz-back-button" onClick={restartQuiz}>
              <ArrowLeft size={17} />
              К категориям
            </button>

            <span>
              ВОПРОС {current + 1} / {questions.length}
            </span>
          </div>

          <div className="quiz-progress">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((current + 1) / questions.length) * 100}%`
              }}
            />
          </div>

          <div className="quiz-question-meta">
            <span>{categoryName}</span>
            <span>{levelName}</span>
          </div>

          <h3 className="quiz-question-title">
            {question.question}
          </h3>

          <div className="quiz-answers">
            {question.answers.map((answer, index) => {
              const isCorrect = index === question.correct;
              const isSelected = index === selectedAnswer;

              let answerClass = "";

              if (checked && isCorrect) answerClass = "correct";
              else if (checked && isSelected && !isCorrect) {
                answerClass = "incorrect";
              } else if (isSelected) {
                answerClass = "selected";
              }

              return (
                <button
                  key={answer}
                  className={`quiz-answer ${answerClass}`}
                  onClick={() => {
                    if (!checked) setSelectedAnswer(index);
                  }}
                  disabled={checked}
                >
                  <span className="quiz-answer-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{answer}</span>

                  {checked && isCorrect && (
                    <CheckCircle2 size={19} />
                  )}

                  {checked && isSelected && !isCorrect && (
                    <XCircle size={19} />
                  )}
                </button>
              );
            })}
          </div>

          {checked && (
            <motion.div
              className="quiz-explanation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="quiz-explanation-heading">
                {selectedAnswer === question.correct ? (
                  <>
                    <CheckCircle2 size={19} />
                    Правильный ответ!
                  </>
                ) : (
                  <>
                    <BookOpen size={19} />
                    Узнаём новое
                  </>
                )}
              </div>

              <p>{question.explanation}</p>
            </motion.div>
          )}

          <div className="quiz-question-footer">
            <span>
              <Star size={16} />
              Баллы: {score}
            </span>

            {!checked ? (
              <button
                className="quiz-start-button"
                disabled={selectedAnswer === null}
                onClick={checkAnswer}
              >
                Проверить ответ
                <CheckCircle2 size={18} />
              </button>
            ) : (
              <button
                className="quiz-start-button"
                onClick={nextQuestion}
              >
                {current + 1 === questions.length
                  ? "Результаты"
                  : "Следующий вопрос"}
                <ChevronRight size={19} />
              </button>
            )}
          </div>
        </motion.div>
      )}

      {finished && (
        <motion.div
          className="quiz-result"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="quiz-result-icon">
            <Trophy size={45} />
          </div>

          <span className="quiz-overline">MISSION COMPLETED</span>
          <h3>Путешествие завершено!</h3>
          <p>Ты прошёл космическую викторину.</p>

          <div className="quiz-result-score">
            <strong>{score} / {questions.length}</strong>
            <span>правильных ответов</span>
          </div>

          <div className="quiz-result-bar">
            <div style={{ width: `${percentage}%` }} />
          </div>

          <strong className="quiz-result-percent">
            {percentage}% правильных ответов
          </strong>

          <div className="quiz-result-message">
            {percentage === 100
              ? "Невероятно! Ты настоящий Cosmic Scientist! 🌟"
              : percentage >= 60
                ? "Отличный результат! Продолжай исследовать Вселенную! 🚀"
                : "Каждое исследование начинается с любопытства. Попробуй ещё раз! ✨"}
          </div>

          <button className="quiz-start-button" onClick={restartQuiz}>
            <RotateCcw size={18} />
            Пройти ещё раз
          </button>
        </motion.div>
      )}
    </section>
  );
}

// Стили COSMIC QUIZ

const quizStyles = `
.cosmic-quiz {
  width: min(1100px, calc(100% - 40px));
  margin: 55px auto 80px;
  color: #f5f3ff;
}

.quiz-hero {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 65px 25px 55px;
  border: 1px solid rgba(167, 139, 250, .2);
  border-radius: 28px;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(117, 79, 220, .25), transparent 65%),
    linear-gradient(145deg, rgba(24, 23, 58, .88), rgba(8, 10, 30, .85));
  box-shadow: 0 25px 80px rgba(0, 0, 0, .2);
}

.quiz-hero-icon {
  width: 76px;
  height: 76px;
  margin: 0 auto 22px;
  display: grid;
  place-items: center;
  color: #c4b5fd;
  border: 1px solid rgba(196, 181, 253, .4);
  border-radius: 24px;
  background: rgba(139, 92, 246, .15);
  box-shadow: 0 0 40px rgba(139, 92, 246, .2);
}

.quiz-overline {
  display: block;
  color: #a99aff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
}

.quiz-hero h2 {
  margin: 15px 0;
  font-size: clamp(38px, 7vw, 66px);
  letter-spacing: 3px;
  font-weight: 800;
  background: linear-gradient(100deg, #fff, #b7a5ff, #7dd3fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.quiz-hero p {
  color: #b9b6d2;
  line-height: 1.8;
  font-size: 15px;
}

.quiz-hero-stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 28px;
}

.quiz-hero-stats span {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #c9c4e5;
  font-size: 12px;
}

.quiz-hero-stats svg {
  color: #a78bfa;
}

.quiz-setup,
.quiz-question-panel,
.quiz-result {
  margin-top: 25px;
  padding: clamp(22px, 4vw, 38px);
  border: 1px solid rgba(167, 139, 250, .2);
  border-radius: 24px;
  background: rgba(13, 15, 38, .78);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, .17);
}

.quiz-section-heading {
  margin-bottom: 22px;
}

.quiz-section-heading > span {
  color: #9b8bdf;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
}

.quiz-section-heading h3 {
  margin: 10px 0 7px;
  font-size: clamp(20px, 3vw, 27px);
}

.quiz-section-heading p {
  color: #aaa8c5;
  font-size: 13px;
}

.quiz-category-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.quiz-category,
.quiz-level {
  position: relative;
  min-width: 0;
  min-height: 112px;
  padding: 17px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #d9d5ef;
  border: 1px solid rgba(167, 139, 250, .15);
  border-radius: 16px;
  background: rgba(255, 255, 255, .025);
  cursor: pointer;
  transition: .25s ease;
  font: inherit;
}

.quiz-category:hover,
.quiz-level:hover {
  border-color: rgba(167, 139, 250, .55);
  background: rgba(139, 92, 246, .1);
  transform: translateY(-3px);
}

.quiz-category.active,
.quiz-level.active {
  border-color: #9b83f6;
  background: rgba(139, 92, 246, .16);
  box-shadow: inset 0 0 25px rgba(139, 92, 246, .08),
    0 0 22px rgba(139, 92, 246, .08);
}

.quiz-category-icon,
.quiz-level > span {
  color: #b9a8ff;
}

.quiz-category-icon svg,
.quiz-level > span svg {
  width: 25px;
  height: 25px;
}

.quiz-category strong {
  font-size: 12px;
  text-align: center;
}

.quiz-category-check {
  position: absolute;
  top: 9px;
  right: 9px;
  color: #a78bfa;
}

.quiz-level-heading {
  margin-top: 38px;
}

.quiz-level-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;
}

.quiz-level {
  min-height: 130px;
}

.quiz-level strong {
  font-size: 13px;
  letter-spacing: 1px;
}

.quiz-level small {
  color: #a9a5c2;
  font-size: 11px;
}

.quiz-start-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 30px;
  padding: 20px;
  border: 1px solid rgba(167, 139, 250, .16);
  border-radius: 17px;
  background: rgba(255, 255, 255, .035);
}

.quiz-start-panel > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.quiz-start-panel span {
  color: #9b8bdf;
  font-size: 10px;
  letter-spacing: 1.5px;
}

.quiz-start-panel strong {
  font-size: 14px;
}

.quiz-start-panel small {
  color: #aaa8c5;
}

.quiz-start-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 22px;
  color: white;
  border: 1px solid rgba(196, 181, 253, .45);
  border-radius: 12px;
  background: linear-gradient(110deg, #7656d9, #5143a7);
  box-shadow: 0 8px 25px rgba(107, 78, 205, .2);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  transition: .25s ease;
}

.quiz-start-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(107, 78, 205, .35);
}

.quiz-start-button:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.quiz-question-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
}

.quiz-question-top > span {
  color: #a99aff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.quiz-back-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #aaa8c5;
  border: 0;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
}

.quiz-back-button:hover {
  color: white;
}

.quiz-progress,
.quiz-result-bar {
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 20px;
  background: rgba(255, 255, 255, .08);
}

.quiz-progress > div,
.quiz-result-bar > div {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #8b5cf6, #67d7ff);
}

.quiz-question-meta {
  display: flex;
  gap: 9px;
  margin: 28px 0 14px;
}

.quiz-question-meta span {
  padding: 6px 10px;
  color: #c3b6ff;
  border: 1px solid rgba(167, 139, 250, .22);
  border-radius: 30px;
  background: rgba(139, 92, 246, .1);
  font-size: 10px;
}

.quiz-question-title {
  margin: 0 0 25px;
  font-size: clamp(21px, 3.5vw, 30px);
  line-height: 1.45;
}

.quiz-answers {
  display: grid;
  gap: 11px;
}

.quiz-answer {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-height: 62px;
  padding: 12px 16px;
  color: #e8e5f8;
  text-align: left;
  border: 1px solid rgba(167, 139, 250, .16);
  border-radius: 13px;
  background: rgba(255, 255, 255, .025);
  cursor: pointer;
  font: inherit;
  transition: .2s ease;
}

.quiz-answer:hover:not(:disabled) {
  border-color: rgba(167, 139, 250, .55);
  background: rgba(139, 92, 246, .1);
}

.quiz-answer.selected {
  border-color: #9b83f6;
  background: rgba(139, 92, 246, .15);
}

.quiz-answer.correct {
  border-color: rgba(74, 222, 128, .6);
  background: rgba(34, 197, 94, .1);
}

.quiz-answer.correct svg {
  margin-left: auto;
  color: #4ade80;
}

.quiz-answer.incorrect {
  border-color: rgba(248, 113, 113, .6);
  background: rgba(239, 68, 68, .1);
}

.quiz-answer.incorrect svg {
  margin-left: auto;
  color: #f87171;
}

.quiz-answer-letter {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  color: #b9a8ff;
  border: 1px solid rgba(167, 139, 250, .25);
  border-radius: 9px;
  font-size: 12px;
  font-weight: 700;
}

.quiz-explanation {
  margin-top: 22px;
  padding: 18px;
  border: 1px solid rgba(103, 215, 255, .2);
  border-radius: 14px;
  background: rgba(56, 189, 248, .06);
}

.quiz-explanation-heading {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #a5e5ff;
  font-size: 13px;
  font-weight: 700;
}

.quiz-explanation p {
  margin: 10px 0 0;
  color: #c4c4dc;
  font-size: 13px;
  line-height: 1.7;
}

.quiz-question-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-top: 25px;
}

.quiz-question-footer > span {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #c5b8ff;
  font-size: 13px;
}

.quiz-result {
  text-align: center;
  padding-top: 45px;
  padding-bottom: 45px;
}

.quiz-result-icon {
  width: 90px;
  height: 90px;
  margin: 0 auto 25px;
  display: grid;
  place-items: center;
  color: #f5d68b;
  border: 1px solid rgba(245, 214, 139, .35);
  border-radius: 28px;
  background: rgba(245, 214, 139, .08);
  box-shadow: 0 0 45px rgba(245, 214, 139, .1);
}

.quiz-result h3 {
  margin: 12px 0;
  font-size: clamp(24px, 4vw, 34px);
}

.quiz-result > p {
  color: #aaa8c5;
}

.quiz-result-score {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 30px 0 20px;
}

.quiz-result-score strong {
  font-size: 48px;
  color: #c4b5fd;
}

.quiz-result-score span {
  color: #aaa8c5;
  font-size: 13px;
}

.quiz-result-bar {
  max-width: 430px;
  height: 9px;
  margin: 0 auto;
}

.quiz-result-percent {
  display: block;
  margin-top: 13px;
  color: #c4b5fd;
  font-size: 13px;
}

.quiz-result-message {
  max-width: 480px;
  margin: 22px auto;
  color: #c8c4df;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .cosmic-quiz {
    width: min(100% - 24px, 1100px);
    margin-top: 30px;
  }

  .quiz-hero {
    padding: 45px 16px;
  }

  .quiz-category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quiz-category:first-child {
    grid-column: span 2;
  }

  .quiz-level-grid {
    grid-template-columns: 1fr;
  }

  .quiz-level {
    min-height: 100px;
  }

  .quiz-start-panel {
    align-items: stretch;
    flex-direction: column;
  }

  .quiz-start-button {
    width: 100%;
  }

  .quiz-question-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .quiz-question-footer .quiz-start-button {
    width: 100%;
  }

  .quiz-hero-stats {
    gap: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .quiz-category,
  .quiz-level,
  .quiz-answer,
  .quiz-start-button {
    transition: none;
  }
}
`;

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [planetName, setPlanetName] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") setSelectedPlanet(null);
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const navigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="app">
      <style>{quizStyles}</style>

      <CosmicBackground />

      <header className="navbar">
        <div className="brand" onClick={() => navigate("home")}>
          <Orbit size={27} />
          <span>LIFE FINDER</span>
        </div>

        <nav>
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => navigate("home")}
          >
            Главная
          </button>

          <button
            className={activeTab === "search" ? "active" : ""}
            onClick={() => navigate("search")}
          >
            Проверка планет
          </button>

          <button
            className={activeTab === "catalog" ? "active" : ""}
            onClick={() => navigate("catalog")}
          >
            Каталог
          </button>

          <button
            className={activeTab === "quiz" ? "active" : ""}
            onClick={() => navigate("quiz")}
          >
            COSMIC QUIZ
          </button>

          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => navigate("about")}
          >
            О проекте
          </button>
        </nav>
      </header>

      {activeTab === "home" && (
        <>
          <section className="hero hero-split-v3 hero-clean-v4">
            <div className="hero-layout-v3">
              <motion.div
                className="hero-content hero-content-v3"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="eyebrow">
                  <Sparkles size={15} />
                  EXPLORE THE UNIVERSE
                </div>

                <DecryptedTitle />

                <p className="hero-subtitle">
                  Исследуй далёкие миры.
                  <br />
                  Открой новые горизонты Вселенной.
                </p>

                <p className="hero-description">
                  Находи экзопланеты и изучай их потенциальную
                  пригодность для жизни.
                </p>

                <button
                  className="star-button"
                  onClick={() => navigate("search")}
                >
                  <Search size={19} />
                  Исследовать планеты
                </button>

                <div className="hero-stats">
                  <div><Orbit /><span>Экзопланеты</span></div>
                  <div><Database /><span>Данные NASA</span></div>
                  <div><Telescope /><span>Исследования</span></div>
                </div>
              </motion.div>
            </div>
          </section>

          <ResearchDashboard />

          <section className="universe-section">
            <div className="section-heading">
              <span>DISCOVER NEW WORLDS</span>
              <h2>Открой Вселенную</h2>
              <p>
                Познакомься с удивительными мирами за пределами
                нашей Солнечной системы.
              </p>
            </div>

            <div className="planet-cards">
              {planets.map((planet, index) => (
                <motion.article
                  className="planet-card"
                  key={planet.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPlanet(planet)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedPlanet(planet);
                    }
                  }}
                  whileHover={{ y: -7 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="planet-card-image">
                    <div className={`card-planet ${planet.color}`}>
                      <div className="card-planet-glow" />
                    </div>
                    <span className="planet-number">0{index + 1}</span>
                  </div>

                  <div className="planet-card-content">
                    <span className="planet-type">{planet.type}</span>
                    <h3>{planet.name}</h3>
                    <p>{planet.description}</p>

                    <div className="planet-distance">
                      <Globe2 size={16} />
                      {planet.distance}
                    </div>

                    <div className="planet-open">
                      Подробнее о планете
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="quiz-home-promo">
            <div className="quiz-home-promo-icon">
              <Brain size={32} />
            </div>

            <span>TEST YOUR KNOWLEDGE</span>
            <h2>Готов к космическому испытанию?</h2>
            <p>
              Проверь свои знания о планетах, галактиках,
              космических миссиях и экзопланетах.
            </p>

            <button
              className="star-button"
              onClick={() => navigate("quiz")}
            >
              <Rocket size={18} />
              Начать COSMIC QUIZ
              <ArrowUpRight size={17} />
            </button>
          </section>
        </>
      )}

      {activeTab === "search" && (
        <section className="content-section">
          <h2>Проверка экзопланеты</h2>
          <p>Введи название планеты для исследования.</p>

          <input
            value={planetName}
            onChange={(event) => setPlanetName(event.target.value)}
            placeholder="Например, TRAPPIST-1 e"
          />

          <p className="notice">
            Подключение базы NASA добавим на следующем этапе.
          </p>
        </section>
      )}

      {activeTab === "catalog" && (
        <section className="content-section">
          <h2>Каталог экзопланет</h2>
          <p>Здесь разместим каталог планет NASA.</p>
        </section>
      )}

      {activeTab === "quiz" && <CosmicQuiz />}

      {activeTab === "about" && (
        <section className="content-section">
          <h2>О LIFE FINDER</h2>
          <p>
            LIFE FINDER — проект для исследования экзопланет
            и предварительной оценки их потенциальной
            пригодности для жизни.
          </p>
        </section>
      )}

      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            className="planet-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlanet(null)}
          >
            <motion.div
              className="planet-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="planet-modal-title"
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="planet-modal-close"
                onClick={() => setSelectedPlanet(null)}
                aria-label="Закрыть окно"
              >
                <X size={22} />
              </button>

              <div className="planet-modal-visual">
                <div className={`card-planet ${selectedPlanet.color}`}>
                  <div className="card-planet-glow" />
                </div>
              </div>

              <div className="planet-modal-content">
                <span className="planet-type">{selectedPlanet.type}</span>

                <h2 id="planet-modal-title">
                  {selectedPlanet.name}
                </h2>

                <p className="planet-modal-description">
                  {selectedPlanet.description}
                </p>

                <div className="planet-modal-distance">
                  <Globe2 size={18} />
                  {selectedPlanet.distance}
                </div>

                <h3>Интересные факты</h3>

                <ul>
                  {selectedPlanet.facts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>

                <div className="planet-science-note">
                  <Sparkles size={17} />
                  <p>{selectedPlanet.note}</p>
                </div>

                <button
                  className="star-button planet-modal-button"
                  onClick={() => setSelectedPlanet(null)}
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer>
        LIFE FINDER · EXPLORE THE UNIVERSE
      </footer>
    </main>
  );
}

export default App;
