
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


// Данные интерактивного путешествия по Млечному Пути
const journeyDestinations = [
  {
    id: "solar",
    name: "Солнечная система",
    subtitle: "НАШ КОСМИЧЕСКИЙ ДОМ",
    distance: "0 световых лет",
    kind: "Звёздная система",
    description: "Наша звезда — Солнце — и восемь планет, которые обращаются вокруг неё. Отсюда начинается наше путешествие по галактике.",
    facts: [
      "Солнечная система находится в рукаве Ориона Млечного Пути.",
      "Солнце — звезда примерно среднего размера.",
      "Солнечная система обращается вокруг центра галактики."
    ],
    color: "journey-sun",
    position: { left: "49%", top: "52%" },
    tag: "СТАРТ"
  },
  {
    id: "proxima",
    name: "Proxima Centauri",
    subtitle: "БЛИЖАЙШАЯ ЗВЕЗДА",
    distance: "Около 4,24 светового года",
    kind: "Звезда и её планетная система",
    description: "Проксима Центавра — ближайшая к Солнцу известная звезда. В её системе обнаружена планета Proxima Centauri b.",
    facts: [
      "Проксима Центавра — красный карлик.",
      "Proxima Centauri b обращается вокруг своей звезды примерно за 11 земных суток.",
      "Реальные условия на поверхности этой планеты пока неизвестны."
    ],
    color: "journey-red",
    position: { left: "32%", top: "35%" },
    tag: "4,24 СВ. ГОДА"
  },
  {
    id: "barnard",
    name: "Звезда Барнарда",
    subtitle: "БЫСТРО ДВИЖУЩАЯСЯ ЗВЕЗДА",
    distance: "Около 6 световых лет",
    kind: "Красный карлик",
    description: "Звезда Барнарда — одна из ближайших к Солнцу одиночных звёзд. Она известна своим быстрым видимым движением по небу.",
    facts: [
      "Это красный карлик значительно меньше Солнца.",
      "Звезда Барнарда находится примерно в шести световых годах от нас.",
      "У неё обнаружены планеты-кандидаты и подтверждённые планетные объекты."
    ],
    color: "journey-orange",
    position: { left: "65%", top: "29%" },
    tag: "≈ 6 СВ. ЛЕТ"
  },
  {
    id: "trappist",
    name: "TRAPPIST-1",
    subtitle: "СИСТЕМА СЕМЬИ ПЛАНЕТ",
    distance: "Около 40 световых лет",
    kind: "Планетная система",
    description: "Ультрахолодный красный карлик TRAPPIST-1 окружён семью известными планетами примерно земного размера.",
    facts: [
      "Все семь известных планет системы обращаются очень близко к своей звезде.",
      "Некоторые планеты системы изучают как интересные объекты для исследований атмосфер.",
      "Потенциальная обитаемость не подтверждена обнаружением жизни."
    ],
    color: "journey-purple",
    position: { left: "24%", top: "67%" },
    tag: "≈ 40 СВ. ЛЕТ"
  },
  {
    id: "kepler",
    name: "Kepler-186",
    subtitle: "ДАЛЁКАЯ ПЛАНЕТНАЯ СИСТЕМА",
    distance: "Около 500 световых лет",
    kind: "Планетная система",
    description: "В этой системе находится Kepler-186f — первая обнаруженная планета земного размера в обитаемой зоне другой звезды.",
    facts: [
      "Звезда Kepler-186 — красный карлик.",
      "Kepler-186f совершает один оборот вокруг звезды примерно за 130 земных суток.",
      "Наличие подходящей атмосферы и жизни на планете не установлено."
    ],
    color: "journey-blue",
    position: { left: "75%", top: "70%" },
    tag: "≈ 500 СВ. ЛЕТ"
  },
  {
    id: "center",
    name: "Центр Млечного Пути",
    subtitle: "СЕРДЦЕ НАШЕЙ ГАЛАКТИКИ",
    distance: "Около 26 000 световых лет",
    kind: "Галактический центр",
    description: "В центральной области Млечного Пути находится Стрелец A* — сверхмассивная чёрная дыра, окружённая плотной областью звёзд и газа.",
    facts: [
      "Стрелец A* находится в направлении созвездия Стрельца.",
      "Её масса составляет около четырёх миллионов масс Солнца.",
      "Наблюдения звёзд рядом с центром помогли подтвердить существование сверхмассивного компактного объекта."
    ],
    color: "journey-gold",
    position: { left: "52%", top: "16%" },
    tag: "≈ 26 000 СВ. ЛЕТ"
  }
];

function CosmicJourney() {
  const [selectedId, setSelectedId] = useState("solar");
  const [showAll, setShowAll] = useState(false);
  const selected = journeyDestinations.find((place) => place.id === selectedId) || journeyDestinations[0];

  return (
    <section className="cosmic-journey">
      <div className="journey-hero">
        <div className="journey-hero-orb" aria-hidden="true" />
        <span className="journey-overline">INTERACTIVE GALACTIC EXPLORATION</span>
        <h1>COSMIC JOURNEY</h1>
        <p>
          Начни путешествие из Солнечной системы и открывай удивительные
          объекты нашей галактики.
        </p>
        <div className="journey-hero-meta">
          <span><Orbit size={15} /> МЛЕЧНЫЙ ПУТЬ</span>
          <span><Telescope size={15} /> 6 ТОЧЕК ИССЛЕДОВАНИЯ</span>
          <span><Sparkles size={15} /> ВЫБИРАЙ И ИЗУЧАЙ</span>
        </div>
      </div>

      <div className="journey-layout">
        <div className="journey-map-panel">
          <div className="journey-panel-heading">
            <div>
              <span>GALACTIC NAVIGATION / 01</span>
              <h2>Карта путешествия</h2>
            </div>
            <span className="journey-map-status"><i /> SYSTEM ONLINE</span>
          </div>

          <div className="journey-map" aria-label="Схематическая карта объектов Млечного Пути">
            <div className="journey-map-stars" />
            <div className="journey-galaxy-arm journey-arm-one" />
            <div className="journey-galaxy-arm journey-arm-two" />
            <div className="journey-galaxy-arm journey-arm-three" />
            <div className="journey-galaxy-core" />
            <div className="journey-map-ring journey-ring-one" />
            <div className="journey-map-ring journey-ring-two" />
            <span className="journey-map-label journey-label-core">GALACTIC CORE</span>
            <span className="journey-map-label journey-label-sun">ORION ARM</span>

            {journeyDestinations.map((place, index) => (
              <button
                key={place.id}
                className={`journey-map-point ${selectedId === place.id ? "active" : ""} ${place.color}`}
                style={{ left: place.position.left, top: place.position.top }}
                onClick={() => setSelectedId(place.id)}
                aria-label={`Открыть: ${place.name}`}
                aria-pressed={selectedId === place.id}
              >
                <span className="journey-point-pulse" />
                <span className="journey-point-core" />
                <span className="journey-point-label">{place.name}</span>
              </button>
            ))}
            <div className="journey-map-legend">
              <span><i className="legend-star" /> Выбери объект на карте</span>
              <span>СХЕМА · НЕ В МАСШТАБЕ</span>
            </div>
          </div>

          <div className="journey-destination-strip">
            {journeyDestinations.map((place, index) => (
              <button
                key={place.id}
                className={`journey-destination-chip ${selectedId === place.id ? "active" : ""}`}
                onClick={() => setSelectedId(place.id)}
              >
                <span>0{index + 1}</span>
                {place.name}
              </button>
            ))}
          </div>
        </div>

        <motion.aside
          className="journey-detail-panel"
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`journey-planet-art ${selected.color}`}>
            <div className="journey-planet-halo" />
            <div className="journey-planet-sphere" />
            <span className="journey-art-coordinate">LF / {selected.id.toUpperCase()}</span>
          </div>
          <div className="journey-detail-content">
            <span className="journey-detail-overline">{selected.subtitle}</span>
            <h2>{selected.name}</h2>
            <span className="journey-detail-kind">{selected.kind}</span>

            <div className="journey-distance">
              <Orbit size={18} />
              <div>
                <small>РАССТОЯНИЕ ОТ СОЛНЦА</small>
                <strong>{selected.distance}</strong>
              </div>
            </div>

            <p className="journey-description">{selected.description}</p>
            <h3><Sparkles size={17} /> ИНТЕРЕСНЫЕ ФАКТЫ</h3>
            <ul className="journey-facts">
              {selected.facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>

            <div className="journey-science-note">
              <BookOpen size={17} />
              <p>Космическая карта схематическая: расположение точек не показывает реальные расстояния и направления.</p>
            </div>

            <div className="journey-detail-actions">
              <button
                className="journey-next-button"
                onClick={() => {
                  const currentIndex = journeyDestinations.findIndex((place) => place.id === selectedId);
                  setSelectedId(journeyDestinations[(currentIndex + 1) % journeyDestinations.length].id);
                }}
              >
                Следующая точка <ChevronRight size={18} />
              </button>
              <button className="journey-list-button" onClick={() => setShowAll((value) => !value)}>
                {showAll ? "Скрыть список" : "Все объекты"}
              </button>
            </div>
          </div>
        </motion.aside>
      </div>

      {showAll && (
        <motion.div
          className="journey-all-destinations"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <div className="journey-all-heading">
            <span>YOUR DISCOVERY LOG</span>
            <h2>Все точки маршрута</h2>
          </div>
          <div className="journey-all-grid">
            {journeyDestinations.map((place, index) => (
              <button
                key={place.id}
                className={`journey-all-card ${selectedId === place.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedId(place.id);
                  setShowAll(false);
                }}
              >
                <span className="journey-card-number">0{index + 1}</span>
                <strong>{place.name}</strong>
                <small>{place.distance}</small>
                <span className="journey-card-open">ИССЛЕДОВАТЬ <ArrowUpRight size={14} /></span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}

// Стили COSMIC JOURNEY
const journeyStyles = `
.cosmic-journey {
  width: min(1240px, calc(100% - 40px));
  margin: 42px auto 85px;
  color: #f5f3ff;
}
.journey-hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(42px, 7vw, 78px) 24px;
  text-align: center;
  border: 1px solid rgba(167,139,250,.22);
  border-radius: 30px;
  background: radial-gradient(ellipse at 50% 0%, rgba(117,79,220,.28), transparent 62%), linear-gradient(145deg, rgba(24,23,58,.92), rgba(8,10,30,.9));
  box-shadow: 0 25px 80px rgba(0,0,0,.2);
}
.journey-hero-orb {
  position: absolute;
  z-index: -1;
  width: 260px;
  height: 260px;
  left: calc(50% - 130px);
  top: -205px;
  border-radius: 50%;
  background: #8b5cf6;
  filter: blur(85px);
  opacity: .35;
}
.journey-overline, .journey-panel-heading > div > span, .journey-all-heading > span {
  color: #a99aff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.6px;
}
.journey-hero h1 {
  margin: 15px 0 12px;
  font-size: clamp(36px, 7vw, 68px);
  line-height: 1.05;
  letter-spacing: 2px;
  font-weight: 900;
  background: linear-gradient(100deg, #fff, #b7a5ff, #7dd3fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.journey-hero > p {
  max-width: 620px;
  margin: 0 auto;
  color: #b9b6d2;
  font-size: 14px;
  line-height: 1.8;
}
.journey-hero-meta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 27px;
}
.journey-hero-meta span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #c9c4e5;
  font-size: 10px;
  letter-spacing: 1px;
}
.journey-hero-meta svg { color: #a78bfa; }
.journey-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(310px, .8fr);
  gap: 18px;
  margin-top: 20px;
  align-items: stretch;
}
.journey-map-panel, .journey-detail-panel, .journey-all-destinations {
  min-width: 0;
  border: 1px solid rgba(167,139,250,.19);
  border-radius: 23px;
  background: rgba(13,15,38,.78);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 20px 60px rgba(0,0,0,.17);
}
.journey-map-panel { padding: 22px; }
.journey-panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}
.journey-panel-heading h2, .journey-all-heading h2 {
  margin: 7px 0 0;
  font-size: 21px;
}
.journey-map-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #a8a4c1;
  font-size: 9px;
  letter-spacing: 1px;
  white-space: nowrap;
}
.journey-map-status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6ee7b7;
  box-shadow: 0 0 12px #6ee7b7;
}
.journey-map {
  position: relative;
  min-height: 480px;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid rgba(167,139,250,.13);
  border-radius: 18px;
  background: radial-gradient(ellipse at 50% 50%, rgba(74,52,145,.26), transparent 45%), radial-gradient(ellipse at 20% 80%, rgba(28,88,145,.15), transparent 38%), #080b20;
}
.journey-map-stars {
  position: absolute;
  inset: 0;
  opacity: .72;
  background-image: radial-gradient(1px 1px at 12% 18%, #fff 99%, transparent), radial-gradient(1px 1px at 83% 22%, #fff 99%, transparent), radial-gradient(2px 2px at 65% 83%, #c4b5fd 99%, transparent), radial-gradient(1px 1px at 28% 72%, #fff 99%, transparent), radial-gradient(1px 1px at 92% 61%, #fff 99%, transparent), radial-gradient(1px 1px at 48% 13%, #fff 99%, transparent), radial-gradient(1px 1px at 8% 53%, #fff 99%, transparent), radial-gradient(1px 1px at 74% 48%, #fff 99%, transparent);
  background-size: 170px 150px, 190px 170px, 210px 190px, 160px 180px, 200px 160px, 180px 190px, 190px 180px, 220px 200px;
}
.journey-galaxy-arm {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 82%;
  height: 27%;
  border: 1px solid rgba(171,145,255,.2);
  border-radius: 50%;
  transform: translate(-50%,-50%) rotate(-28deg);
  box-shadow: 0 0 28px rgba(130,100,240,.12), inset 0 0 30px rgba(130,100,240,.08);
}
.journey-arm-two { width: 76%; height: 21%; transform: translate(-50%,-50%) rotate(34deg); border-color: rgba(99,190,255,.17); }
.journey-arm-three { width: 62%; height: 17%; transform: translate(-50%,-50%) rotate(76deg); border-color: rgba(210,165,255,.12); }
.journey-galaxy-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  transform: translate(-50%,-50%);
  background: radial-gradient(circle, #fff 0%, #d7c8ff 8%, rgba(151,113,255,.5) 28%, rgba(126,91,230,.08) 70%, transparent 72%);
  filter: drop-shadow(0 0 24px rgba(174,143,255,.8));
}
.journey-map-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 44%;
  height: 44%;
  border: 1px dashed rgba(178,160,255,.2);
  border-radius: 50%;
  transform: translate(-50%,-50%) rotate(-25deg);
}
.journey-ring-two { width: 68%; height: 68%; transform: translate(-50%,-50%) rotate(24deg); border-color: rgba(104,194,255,.14); }
.journey-map-label {
  position: absolute;
  color: rgba(198,185,255,.55);
  font-size: 8px;
  letter-spacing: 2px;
  pointer-events: none;
}
.journey-label-core { left: 54%; top: 47%; }
.journey-label-sun { left: 9%; top: 88%; }
.journey-map-point {
  position: absolute;
  z-index: 2;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transform: translate(-50%,-50%);
}
.journey-point-core {
  position: absolute;
  inset: 6px;
  border: 2px solid #d9d0ff;
  border-radius: 50%;
  background: #9b83f6;
  box-shadow: 0 0 12px currentColor;
}
.journey-point-pulse {
  position: absolute;
  inset: 0;
  border: 1px solid currentColor;
  border-radius: 50%;
  opacity: .55;
  animation: journey-pulse 2.4s ease-out infinite;
}
.journey-map-point.active .journey-point-core { inset: 4px; background: #fff; box-shadow: 0 0 20px #c4b5fd, 0 0 35px currentColor; }
.journey-point-label {
  position: absolute;
  left: 18px;
  top: 50%;
  width: max-content;
  max-width: 145px;
  padding: 5px 8px;
  color: #e9e5ff;
  border: 1px solid rgba(167,139,250,.22);
  border-radius: 7px;
  background: rgba(9,11,30,.82);
  font-size: 9px;
  text-align: left;
  transform: translateY(-50%);
  pointer-events: none;
}
.journey-map-point:nth-of-type(odd) .journey-point-label { left: auto; right: 18px; }
.journey-map-point.active .journey-point-label { color: #fff; border-color: rgba(196,181,253,.7); background: rgba(89,65,160,.78); }
.journey-sun .journey-point-core { background: #ffe6a1; border-color: #fff0c4; }
.journey-red .journey-point-core { background: #ff9b91; border-color: #ffd0c9; }
.journey-orange .journey-point-core { background: #ffbd82; border-color: #ffe0bf; }
.journey-purple .journey-point-core { background: #bd9bff; border-color: #e0d1ff; }
.journey-blue .journey-point-core { background: #83d7ff; border-color: #d0f1ff; }
.journey-gold .journey-point-core { background: #ffe08a; border-color: #fff2c4; }
.journey-map-legend {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #9e9bb9;
  font-size: 8px;
  letter-spacing: 1px;
}
.journey-map-legend span:first-child { display: flex; align-items: center; gap: 7px; }
.legend-star { width: 7px; height: 7px; border-radius: 50%; background: #c4b5fd; box-shadow: 0 0 8px #c4b5fd; }
.journey-destination-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 14px;
}
.journey-destination-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 10px;
  color: #bdb8d6;
  border: 1px solid rgba(167,139,250,.14);
  border-radius: 9px;
  background: rgba(255,255,255,.025);
  cursor: pointer;
  font: inherit;
  font-size: 10px;
  transition: .2s ease;
}
.journey-destination-chip > span { color: #8e80c8; font-size: 9px; }
.journey-destination-chip:hover, .journey-destination-chip.active { color: #fff; border-color: rgba(167,139,250,.55); background: rgba(139,92,246,.13); }
.journey-detail-panel { overflow: hidden; }
.journey-planet-art {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 205px;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 110%, rgba(112,79,210,.28), transparent 65%), linear-gradient(145deg, rgba(35,31,75,.7), rgba(9,12,32,.8));
}
.journey-planet-halo {
  position: absolute;
  width: 180px;
  height: 180px;
  border: 1px solid rgba(196,181,253,.13);
  border-radius: 50%;
  box-shadow: 0 0 45px rgba(139,92,246,.12), inset 0 0 35px rgba(139,92,246,.08);
}
.journey-planet-sphere {
  position: relative;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #fff2c4, #e9a85b 28%, #9251a7 58%, #28214e 82%);
  box-shadow: inset -18px -12px 28px rgba(0,0,0,.55), 0 0 45px rgba(173,139,255,.35);
}
.journey-planet-art.journey-red .journey-planet-sphere { background: radial-gradient(circle at 32% 28%, #ffd2b8, #e36e65 32%, #792f61 68%, #211c49 88%); }
.journey-planet-art.journey-orange .journey-planet-sphere { background: radial-gradient(circle at 32% 28%, #ffe3b9, #e99a58 32%, #8d4b45 68%, #211c49 88%); }
.journey-planet-art.journey-purple .journey-planet-sphere { background: radial-gradient(circle at 32% 28%, #f4d7ff, #b58af1 32%, #5a4e9c 68%, #1c2049 88%); }
.journey-planet-art.journey-blue .journey-planet-sphere { background: radial-gradient(circle at 32% 28%, #d8f8ff, #69b9df 32%, #3b558e 68%, #171d42 88%); }
.journey-planet-art.journey-gold .journey-planet-sphere { background: radial-gradient(circle at 32% 28%, #fff4c8, #e5bc69 32%, #93623f 68%, #211c49 88%); }
.journey-planet-art.journey-sun .journey-planet-sphere { background: radial-gradient(circle at 32% 28%, #fff9ce, #ffd36a 36%, #e98735 68%, #8f3d46 90%); box-shadow: 0 0 65px rgba(255,177,76,.45), inset -18px -12px 28px rgba(0,0,0,.35); }
.journey-art-coordinate { position: absolute; right: 14px; bottom: 12px; color: rgba(211,202,255,.55); font-size: 8px; letter-spacing: 1.5px; }
.journey-detail-content { padding: 22px; }
.journey-detail-overline { color: #a99aff; font-size: 9px; font-weight: 800; letter-spacing: 1.7px; }
.journey-detail-content h2 { margin: 8px 0 5px; font-size: clamp(22px, 3vw, 29px); }
.journey-detail-kind { color: #aaa8c5; font-size: 11px; }
.journey-distance {
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 19px 0;
  padding: 12px;
  border: 1px solid rgba(167,139,250,.16);
  border-radius: 12px;
  background: rgba(139,92,246,.07);
  color: #b9a8ff;
}
.journey-distance div { display: flex; flex-direction: column; gap: 4px; }
.journey-distance small { color: #9994b7; font-size: 8px; letter-spacing: 1px; }
.journey-distance strong { color: #eeeaff; font-size: 12px; }
.journey-description { color: #c1bdd7; font-size: 12px; line-height: 1.7; }
.journey-detail-content h3 { display: flex; align-items: center; gap: 8px; margin: 21px 0 10px; color: #b9a8ff; font-size: 10px; letter-spacing: 1.4px; }
.journey-facts { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
.journey-facts li { position: relative; padding-left: 15px; color: #bdb9d3; font-size: 11px; line-height: 1.6; }
.journey-facts li::before { content: ""; position: absolute; left: 0; top: 7px; width: 5px; height: 5px; border-radius: 50%; background: #a78bfa; box-shadow: 0 0 8px #a78bfa; }
.journey-science-note { display: flex; align-items: flex-start; gap: 9px; margin-top: 17px; padding: 11px; border: 1px solid rgba(103,215,255,.15); border-radius: 11px; background: rgba(56,189,248,.045); color: #8bdcff; }
.journey-science-note svg { flex: 0 0 auto; margin-top: 2px; }
.journey-science-note p { margin: 0; color: #aebed0; font-size: 10px; line-height: 1.6; }
.journey-detail-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.journey-next-button, .journey-list-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 40px;
  padding: 0 13px;
  border: 1px solid rgba(196,181,253,.32);
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(110deg, #7656d9, #5143a7);
  cursor: pointer;
  font: inherit;
  font-size: 10px;
  font-weight: 700;
}
.journey-list-button { color: #c9c4e5; border-color: rgba(167,139,250,.2); background: rgba(255,255,255,.035); }
.journey-all-destinations { margin-top: 18px; padding: 24px; }
.journey-all-heading { margin-bottom: 17px; }
.journey-all-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; }
.journey-all-card { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; min-width: 0; padding: 16px; color: #eeeaff; text-align: left; border: 1px solid rgba(167,139,250,.16); border-radius: 13px; background: rgba(255,255,255,.025); cursor: pointer; transition: .2s ease; }
.journey-all-card:hover, .journey-all-card.active { border-color: rgba(167,139,250,.55); background: rgba(139,92,246,.1); transform: translateY(-2px); }
.journey-card-number { color: #9b8bdf; font-size: 9px; letter-spacing: 1px; }
.journey-all-card strong { font-size: 13px; }
.journey-all-card small { color: #aaa8c5; font-size: 10px; }
.journey-card-open { display: inline-flex; align-items: center; gap: 5px; margin-top: 5px; color: #b9a8ff; font-size: 8px; letter-spacing: 1px; }
@keyframes journey-pulse { 0% { transform: scale(.65); opacity: .65; } 100% { transform: scale(1.8); opacity: 0; } }
@media (max-width: 900px) {
  .journey-layout { grid-template-columns: 1fr; }
  .journey-detail-panel { display: grid; grid-template-columns: minmax(180px,.65fr) minmax(0,1fr); }
  .journey-planet-art { min-height: 100%; }
}
@media (max-width: 620px) {
  .cosmic-journey { width: min(100% - 22px, 1240px); margin-top: 25px; }
  .journey-hero { padding: 42px 16px; border-radius: 22px; }
  .journey-hero-meta { gap: 10px 14px; }
  .journey-map-panel { padding: 13px; }
  .journey-map { min-height: 390px; }
  .journey-point-label { max-width: 105px; font-size: 8px; }
  .journey-map-legend { font-size: 7px; }
  .journey-detail-panel { display: block; }
  .journey-planet-art { min-height: 190px; }
  .journey-all-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .journey-point-pulse { animation: none; }
  .journey-destination-chip, .journey-all-card { transition: none; }
}
.journey-home-promo {
  position: relative;
  display: grid;
  grid-template-columns: minmax(190px,.72fr) minmax(0,1.3fr);
  align-items: center;
  gap: clamp(20px,5vw,55px);
  width: min(1100px,calc(100% - 40px));
  margin: 30px auto 35px;
  padding: clamp(22px,4vw,38px);
  overflow: hidden;
  border: 1px solid rgba(167,139,250,.22);
  border-radius: 24px;
  background: radial-gradient(ellipse at 15% 50%,rgba(116,78,220,.22),transparent 55%),rgba(13,15,38,.78);
  box-shadow: 0 20px 60px rgba(0,0,0,.16);
}
.journey-home-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 190px;
  overflow: hidden;
  border-radius: 18px;
  background: radial-gradient(ellipse at center,rgba(94,68,176,.2),transparent 68%),#090c22;
}
.journey-home-galaxy {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 50% 50%,#fff 0%,#c8b4ff 3%,rgba(160,125,255,.65) 10%,rgba(115,87,210,.16) 28%,transparent 65%);
  box-shadow: 0 0 55px rgba(151,119,255,.35);
}
.journey-home-orbit {
  position: absolute;
  width: 175px;
  height: 65px;
  border: 1px solid rgba(185,160,255,.35);
  border-radius: 50%;
  transform: rotate(-28deg);
}
.journey-home-orbit-two { width: 190px; height: 85px; transform: rotate(38deg); border-color: rgba(103,215,255,.25); }
.journey-home-copy > span { color: #a99aff; font-size: 10px; font-weight: 800; letter-spacing: 2px; }
.journey-home-copy h2 { margin: 10px 0; color: #f5f3ff; font-size: clamp(22px,3vw,32px); line-height: 1.25; }
.journey-home-copy p { max-width: 570px; margin: 0 0 20px; color: #b9b6d2; font-size: 13px; line-height: 1.7; }
@media(max-width:650px) {
  .journey-home-promo { grid-template-columns: 1fr; width: min(100% - 24px,1100px); }
  .journey-home-visual { min-height: 150px; }
}
`;

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
      <style>{quizStyles + journeyStyles}</style>

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
            className={activeTab === "journey" ? "active" : ""}
            onClick={() => navigate("journey")}
          >
            COSMIC JOURNEY
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

          <section className="journey-home-promo">
            <div className="journey-home-visual">
              <div className="journey-home-galaxy" />
              <span className="journey-home-orbit journey-home-orbit-one" />
              <span className="journey-home-orbit journey-home-orbit-two" />
            </div>
            <div className="journey-home-copy">
              <span>YOUR GALACTIC ADVENTURE</span>
              <h2>Готов отправиться за пределы Солнечной системы?</h2>
              <p>
                Исследуй звёздные системы, открывай далёкие миры
                и узнавай удивительные факты о Млечном Пути.
              </p>
              <button className="star-button" onClick={() => navigate("journey")}>
                <Orbit size={18} />
                Начать COSMIC JOURNEY
                <ArrowUpRight size={17} />
              </button>
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

      {activeTab === "journey" && <CosmicJourney />}

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
