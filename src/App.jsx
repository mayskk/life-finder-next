import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Orbit, Telescope, Sparkles, Globe2, Search,
  ChevronRight, ArrowLeft, Rocket, Star, Menu, X,
  Microscope, Database, ExternalLink, CircleHelp
} from "lucide-react";
import "./App.css";

const destinations = [
  {
    id: "solar",
    name: "Солнечная система",
    type: "Планетная система",
    distance: "Наше космическое соседство",
    description: "Система, в которой находятся Солнце, восемь планет и множество малых тел.",
    fact: "Земля — единственная планета, на которой жизнь подтверждена наблюдениями.",
    color: "#65c9ff"
  },
  {
    id: "proxima",
    name: "Proxima Centauri b",
    type: "Экзопланета",
    distance: "Около 4,24 светового года",
    description: "Экзопланета у ближайшей к Солнцу звезды. Она находится в области, где при определённых условиях может существовать жидкая вода.",
    fact: "Наличие подходящей орбиты само по себе не доказывает существование атмосферы или жизни.",
    color: "#b68aff"
  },
  {
    id: "trappist",
    name: "Система TRAPPIST-1",
    type: "Планетная система",
    distance: "Около 40 световых лет",
    description: "Система из семи известных планет земного размера, вращающихся вокруг небольшой холодной звезды.",
    fact: "Некоторые планеты системы особенно интересны для изучения атмосфер.",
    color: "#ff9dba"
  },
  {
    id: "kepler",
    name: "Kepler-186f",
    type: "Экзопланета",
    distance: "Около 500 световых лет",
    description: "Экзопланета примерно земного размера, обращающаяся вокруг красного карлика.",
    fact: "Её орбита находится в обитаемой зоне своей звезды, но условия на поверхности точно неизвестны.",
    color: "#83e6c2"
  }
];

const quizQuestions = [
  {
    question: "Что такое экзопланета?",
    options: [
      "Планета за пределами Солнечной системы",
      "Очень большая звезда",
      "Спутник Земли"
    ],
    correct: 0,
    explanation: "Экзопланетами называют планеты, обращающиеся вокруг других звёзд."
  },
  {
    question: "Что астрономы называют обитаемой зоной?",
    options: [
      "Область с большим количеством звёзд",
      "Область, где при подходящих условиях возможна жидкая вода",
      "Место, где точно есть жизнь"
    ],
    correct: 1,
    explanation: "Обитаемая зона определяется условиями освещения от звезды, допускающими существование жидкой воды на поверхности при подходящей атмосфере."
  },
  {
    question: "Какая планета является единственным подтверждённым миром с жизнью?",
    options: ["Марс", "Земля", "Венера"],
    correct: 1,
    explanation: "На данный момент жизнь подтверждена только на Земле."
  },
  {
    question: "Как обнаруживают многие экзопланеты?",
    options: [
      "По уменьшению яркости звезды при транзите планеты",
      "По цвету неба",
      "По звуку планеты"
    ],
    correct: 0,
    explanation: "Транзитный метод фиксирует небольшое снижение яркости звезды, когда планета проходит перед ней."
  },
  {
    question: "Доказывает ли нахождение в обитаемой зоне наличие жизни?",
    options: ["Да, всегда", "Нет, это только один из факторов", "Только у красных звёзд"],
    correct: 1,
    explanation: "Для жизни важны многие факторы: атмосфера, вода, химия, стабильность звезды и другие условия."
  }
];

const stars = Array.from({ length: 65 }, (_, i) => ({
  left: `${(i * 37 + 13) % 100}%`,
  top: `${(i * 61 + 7) % 100}%`,
  delay: `${(i % 8) * 0.4}s`,
  size: i % 5 === 0 ? 3 : 2
}));


function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let particles = [];
    const pointer = { x: -1000, y: -1000, active: false };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const amount = Math.min(115, Math.max(48, Math.round((width * height) / 11500)));
      particles = Array.from({ length: amount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.7 + 0.55,
        alpha: Math.random() * 0.55 + 0.2,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const movePointer = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const leavePointer = () => {
      pointer.active = false;
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;

          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 125 && distance > 0) {
              const force = (125 - distance) / 1250;
              particle.x += (dx / distance) * force * 8;
              particle.y += (dy / distance) * force * 8;
            }
          }
        }

        const pulse = reducedMotion ? 1 : 0.72 + Math.sin(time * 0.0014 + particle.phase) * 0.28;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(205, 169, 255, ${particle.alpha * pulse})`;
        context.shadowBlur = 12;
        context.shadowColor = "rgba(174, 105, 255, 0.9)";
        context.fill();
        context.shadowBlur = 0;
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 105) {
            const opacity = (1 - distance / 105) * 0.18;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(177, 126, 255, ${opacity})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", movePointer);
    canvas.addEventListener("pointerleave", leavePointer);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", movePointer);
      canvas.removeEventListener("pointerleave", leavePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState("solar");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const selected = destinations.find(item => item.id === selectedId);
  const score = answers.reduce((total, answer, index) => {
    return total + (answer === quizQuestions[index].correct ? 1 : 0);
  }, 0);

  function navigate(nextPage) {
    setPage(nextPage);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function answerQuestion(optionIndex) {
    const nextAnswers = [...answers, optionIndex];
    setAnswers(nextAnswers);

    if (questionIndex === quizQuestions.length - 1) {
      setQuizFinished(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setAnswers([]);
    setQuizFinished(false);
  }

  return (
    <div className="lf-app">
      <div className="space-background">
        <ParticleField />
        {stars.map((star, index) => (
          <span
            key={index}
            className="space-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay
            }}
          />
        ))}
        <div className="nebula nebula-one" />
        <div className="nebula nebula-two" />
      </div>

      <header className="lf-header">
        <button className="brand" onClick={() => navigate("home")}>
          <span className="brand-icon"><Orbit size={24} /></span>
          <span>LIFE<span className="brand-accent">FINDER</span></span>
        </button>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Открыть меню"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <button className={page === "home" ? "nav-active" : ""} onClick={() => navigate("home")}>Главная</button>
          <button className={page === "journey" ? "nav-active" : ""} onClick={() => navigate("journey")}>Cosmic Journey</button>
          <button className={page === "quiz" ? "nav-active" : ""} onClick={() => navigate("quiz")}>Cosmic Quiz</button>
          <button className="nav-explore" onClick={() => navigate("detector")}>Life Detector <Sparkles size={15} /></button>
        </nav>
      </header>

      <main className="lf-main">
        <AnimatePresence mode="wait">
          {page === "home" && (
            <motion.section
              key="home"
              className="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="hero-content">
                <div className="eyebrow"><span className="live-dot" /> ИССЛЕДУЙ НЕИЗВЕДАННОЕ</div>
                <h1>Is there <span>life</span><br />beyond Earth?</h1>
                <p className="hero-description">
                  Путешествуй по космосу, исследуй далёкие миры и узнай,
                  что наука знает о возможности жизни за пределами Земли.
                </p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => navigate("journey")}>
                    Начать исследование <ChevronRight size={18} />
                  </button>
                  <button className="secondary-button" onClick={() => navigate("detector")}>
                    LIFE DETECTOR <Search size={17} />
                  </button>
                </div>
                <div className="hero-caption">
                  <span><Telescope size={16} /> НАУКА И ИССЛЕДОВАНИЯ</span>
                  <span><Database size={16} /> ДАННЫЕ NASA</span>
                </div>
              </div>

              <div className="hero-visual">
                <div className="orbit orbit-large" />
                <div className="orbit orbit-small" />
                <div className="planet-glow" />
                <div className="hero-planet">
                  <div className="planet-surface" />
                  <div className="planet-shade" />
                </div>
                <div className="planet-moon" />
                <div className="visual-label label-top">
                  <span className="label-dot" /> DEEP SPACE / 001
                </div>
                <div className="visual-label label-bottom">
                  <span>EXPLORING THE UNKNOWN</span><Sparkles size={14} />
                </div>
              </div>

              <div className="hero-bottom">
                <div><strong>8+</strong><span>Планет Солнечной системы и малых миров</span></div>
                <div><strong>6 000+</strong><span>Известных экзопланет и кандидатов изучаются астрономами</span></div>
                <div><strong>1</strong><span>Известный мир с подтверждённой жизнью — Земля</span></div>
              </div>
            </motion.section>
          )}

          {page === "journey" && (
            <motion.section
              key="journey"
              className="content-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="section-heading">
                <div className="eyebrow"><Orbit size={15} /> КОСМИЧЕСКИЙ МАРШРУТ</div>
                <h2>Cosmic <span>Journey</span></h2>
                <p>Выбери объект и узнай, что известно науке о далёких мирах.</p>
              </div>

              <div className="journey-layout">
                <div className="journey-map">
                  <div className="map-nebula" />
                  <div className="map-orbit map-orbit-one" />
                  <div className="map-orbit map-orbit-two" />
                  <div className="map-sun"><span /></div>
                  {destinations.map((item, index) => (
                    <button
                      key={item.id}
                      className={`map-point map-point-${index} ${selectedId === item.id ? "point-selected" : ""}`}
                      style={{ "--planet-color": item.color }}
                      onClick={() => setSelectedId(item.id)}
                      aria-label={item.name}
                    >
                      <span className="point-core" />
                      <span className="point-name">{item.name}</span>
                    </button>
                  ))}
                  <div className="map-caption">SCHEMATIC VIEW · NOT TO SCALE</div>
                </div>

                <motion.article
                  className="destination-card"
                  key={selected.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="destination-top">
                    <span className="destination-tag">{selected.type}</span>
                    <span className="destination-number">0{destinations.findIndex(item => item.id === selected.id) + 1}</span>
                  </div>
                  <div className="destination-orb" style={{ "--planet-color": selected.color }}>
                    <div />
                  </div>
                  <h3>{selected.name}</h3>
                  <div className="destination-distance"><Orbit size={15} /> {selected.distance}</div>
                  <p>{selected.description}</p>
                  <div className="fact-panel">
                    <Sparkles size={17} />
                    <span>{selected.fact}</span>
                  </div>
                  <button className="secondary-button destination-next" onClick={() => {
                    const next = (destinations.findIndex(item => item.id === selected.id) + 1) % destinations.length;
                    setSelectedId(destinations[next].id);
                  }}>
                    Следующий объект <ChevronRight size={17} />
                  </button>
                </motion.article>
              </div>
            </motion.section>
          )}

          {page === "quiz" && (
            <motion.section
              key="quiz"
              className="content-page quiz-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="section-heading">
                <div className="eyebrow"><Sparkles size={15} /> ПРОВЕРЬ СВОИ ЗНАНИЯ</div>
                <h2>Cosmic <span>Quiz</span></h2>
                <p>Пять вопросов о космосе, экзопланетах и поиске жизни.</p>
              </div>

              <div className="quiz-card">
                {!quizFinished ? (
                  <>
                    <div className="quiz-progress-info">
                      <span>ВОПРОС {questionIndex + 1} / {quizQuestions.length}</span>
                      <span>{Math.round((questionIndex / quizQuestions.length) * 100)}%</span>
                    </div>
                    <div className="quiz-progress"><span style={{ width: `${(questionIndex / quizQuestions.length) * 100}%` }} /></div>
                    <h3>{quizQuestions[questionIndex].question}</h3>
                    <div className="quiz-options">
                      {quizQuestions[questionIndex].options.map((option, index) => (
                        <button key={index} onClick={() => answerQuestion(index)}>
                          <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                          {option}
                          <ChevronRight size={17} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="quiz-result">
                    <div className="result-icon"><Sparkles size={30} /></div>
                    <div className="eyebrow">ИССЛЕДОВАНИЕ ЗАВЕРШЕНО</div>
                    <h3>{score} из {quizQuestions.length}</h3>
                    <p>{score === 5 ? "Превосходно! Ты отлично знаешь космос." : "Отличная работа! Продолжай исследовать Вселенную."}</p>
                    <button className="primary-button" onClick={restartQuiz}>Пройти ещё раз <ChevronRight size={17} /></button>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {page === "detector" && (
            <motion.section
              key="detector"
              className="content-page detector-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="section-heading">
                <div className="eyebrow"><Microscope size={15} /> НАУЧНЫЙ ИНСТРУМЕНТ</div>
                <h2>Life <span>Detector</span></h2>
                <p>Изучи, какие факторы помогают учёным оценивать потенциальную пригодность планет для жизни.</p>
              </div>
              <div className="detector-card">
                <div className="detector-icon"><Search size={28} /></div>
                <h3>Поиск потенциально интересных миров</h3>
                <p>Это демонстрационная версия инструмента. Она объясняет научные критерии, но пока не загружает актуальный каталог экзопланет.</p>
                <div className="criteria-grid">
                  <div><Globe2 /><strong>Размер и масса</strong><span>Помогают оценить тип планеты.</span></div>
                  <div><Star /><strong>Звезда</strong><span>Её активность влияет на условия вокруг планеты.</span></div>
                  <div><Orbit /><strong>Орбита</strong><span>Помогает определить положение относительно обитаемой зоны.</span></div>
                  <div><Sparkles /><strong>Атмосфера</strong><span>Состав и давление важны для условий на поверхности.</span></div>
                </div>
                <div className="science-note">
                  <CircleHelp size={19} />
                  <p>Нахождение в обитаемой зоне не доказывает наличие жизни. Для оценки нужны дополнительные наблюдения, в том числе изучение атмосферы.</p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="lf-footer">
        <button className="footer-brand" onClick={() => navigate("home")}><Orbit size={19} /> LIFE FINDER</button>
        <span>ИССЛЕДУЯ ВСЕЛЕННУЮ · В ПОИСКАХ ОТВЕТОВ</span>
        <a href="https://science.nasa.gov/exoplanets/" target="_blank" rel="noreferrer">NASA EXOPLANETS <ExternalLink size={13} /></a>
      </footer>
    </div>
  );
}

export default App;
