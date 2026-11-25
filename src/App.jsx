import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Orbit, Telescope, Sparkles, Globe2, Search, ChevronRight, ArrowLeft,
  Rocket, Star, Menu, X, Microscope, Database, ExternalLink, CircleHelp,
  Waves, ShieldCheck, Radio, Activity, RotateCcw
} from "lucide-react";
import "./App.css";

const destinations = [
  {
    id: "earth",
    name: "Земля",
    type: "Планета Солнечной системы",
    distance: "Наша родная планета",
    description: "Единственный известный науке мир, где жизнь подтверждена наблюдениями. Земля помогает учёным понять, какие условия могут поддерживать жизнь.",
    fact: "Жидкая вода на поверхности, атмосфера и стабильный источник энергии — важные части земной системы.",
    color: "#75d9ff",
    source: "https://science.nasa.gov/earth/"
  },
  {
    id: "proxima",
    name: "Proxima Centauri b",
    type: "Экзопланета",
    distance: "Около 4,24 светового года",
    description: "Планета у ближайшей к Солнцу звезды. Её орбита находится в области, где при подходящих условиях могла бы существовать жидкая вода.",
    fact: "Свойства атмосферы и условия на поверхности пока недостаточно известны. Наличие подходящей орбиты не доказывает обитаемость.",
    color: "#b99aff",
    source: "https://science.nasa.gov/exoplanet-catalog/proxima-centauri-b/"
  },
  {
    id: "trappist",
    name: "TRAPPIST-1e",
    type: "Экзопланета",
    distance: "Около 40 световых лет",
    description: "Одна из семи известных планет земного размера в системе TRAPPIST-1. Система особенно интересна для исследований атмосфер.",
    fact: "Наблюдения помогают проверять, есть ли у планеты атмосфера. Пока нет подтверждения существования жизни.",
    color: "#ff9dc9",
    source: "https://science.nasa.gov/exoplanet-catalog/trappist-1-e/"
  },
  {
    id: "kepler",
    name: "Kepler-186f",
    type: "Экзопланета",
    distance: "Около 500 световых лет",
    description: "Первая обнаруженная планета примерно земного размера в обитаемой зоне другой звезды.",
    fact: "Обитаемая зона — это не гарантия жизни: важны также атмосфера, вода, геология и активность звезды.",
    color: "#8ce3c4",
    source: "https://science.nasa.gov/exoplanet-catalog/kepler-186-f/"
  }
];

const quizQuestions = [
  {
    question: "Что такое экзопланета?",
    options: ["Планета за пределами Солнечной системы", "Очень большая звезда", "Спутник Земли"],
    correct: 0,
    explanation: "Экзопланетами называют планеты, обращающиеся вокруг других звёзд."
  },
  {
    question: "Что астрономы называют обитаемой зоной?",
    options: ["Область с большим количеством звёзд", "Область, где при подходящей атмосфере возможна жидкая вода", "Место, где точно есть жизнь"],
    correct: 1,
    explanation: "Обитаемая зона — диапазон расстояний от звезды, где при подходящей атмосфере на поверхности планеты может существовать жидкая вода."
  },
  {
    question: "На какой планете жизнь подтверждена наблюдениями?",
    options: ["Марс", "Земля", "Венера"],
    correct: 1,
    explanation: "На данный момент Земля — единственный известный мир с подтверждённой жизнью."
  },
  {
    question: "Как работает транзитный метод поиска экзопланет?",
    options: ["Измеряет уменьшение яркости звезды", "Записывает звук планеты", "Изучает цвет космической пыли"],
    correct: 0,
    explanation: "Когда планета проходит перед своей звездой, яркость звезды немного уменьшается. Телескопы могут измерить это изменение."
  },
  {
    question: "Доказывает ли нахождение в обитаемой зоне наличие жизни?",
    options: ["Да, всегда", "Нет, это только один из факторов", "Только у красных звёзд"],
    correct: 1,
    explanation: "Нужно изучать множество факторов: атмосферу, воду, химический состав, геологию и активность звезды."
  }
];

const detectorFactors = [
  { id: "rocky", title: "Каменистый состав", detail: "Может указывать на твёрдую поверхность.", icon: Globe2 },
  { id: "zone", title: "Положение в обитаемой зоне", detail: "Орбита допускает жидкую воду при подходящей атмосфере.", icon: Orbit },
  { id: "water", title: "Возможность жидкой воды", detail: "Вода важна для жизни в известной нам форме.", icon: Waves },
  { id: "atmosphere", title: "Атмосфера", detail: "Состав и давление влияют на условия на поверхности.", icon: Activity },
  { id: "star", title: "Стабильность звезды", detail: "Излучение и вспышки звезды могут влиять на планету.", icon: Star },
  { id: "magnetic", title: "Защита от излучения", detail: "Магнитное поле и атмосфера могут влиять на сохранение среды.", icon: ShieldCheck }
];

const stars = Array.from({ length: 145 }, (_, i) => ({
  left: `${(i * 37 + 13) % 100}%`,
  top: `${(i * 61 + 7) % 100}%`,
  delay: `${(i % 8) * 0.45}s`,
  size: i % 7 === 0 ? 3 : 2
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(76, Math.max(34, Math.round((width * height) / 19000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.2 + 0.35,
        alpha: Math.random() * 0.34 + 0.2,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -8) particle.x = width + 8;
          if (particle.x > width + 8) particle.x = -8;
          if (particle.y < -8) particle.y = height + 8;
          if (particle.y > height + 8) particle.y = -8;
        }
        const pulse = reducedMotion ? 1 : 0.72 + Math.sin(time * 0.0012 + particle.phase) * 0.28;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(207, 174, 255, ${particle.alpha * pulse})`;
        context.shadowBlur = 7;
        context.shadowColor = "rgba(174, 126, 255, .7)";
        context.fill();
        context.shadowBlur = 0;
      });
      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

function HologramPlanet() {
  return (
    <div className="holo-stage" aria-label="Анимированная голографическая модель планеты">
      <div className="holo-aura" />
      <div className="holo-orbit holo-orbit-one"><i /></div>
      <div className="holo-orbit holo-orbit-two"><i /></div>
      <div className="holo-orbit holo-orbit-three" />
      <div className="holo-sphere">
        <div className="holo-sphere-core" />
        <div className="holo-grid" />
        <div className="holo-latitudes" />
        <div className="holo-scanline" />
        <div className="holo-highlight" />
      </div>
      <div className="holo-crosshair crosshair-one" />
      <div className="holo-crosshair crosshair-two" />
      <div className="holo-node node-one" />
      <div className="holo-node node-two" />
      <div className="holo-node node-three" />
      <div className="holo-data data-left"><span>PLANETARY SCAN</span><strong>ACTIVE</strong></div>
      <div className="holo-data data-right"><span>DEEP SPACE</span><strong>SECTOR 001</strong></div>
      <div className="holo-base"><span /></div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState("proxima");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedFactors, setSelectedFactors] = useState([]);

  const selected = destinations.find((item) => item.id === selectedId) || destinations[0];
  const score = answers.reduce((total, answer, index) => total + (answer === quizQuestions[index].correct ? 1 : 0), 0);

  function navigate(nextPage) {
    setPage(nextPage);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseAnswer(optionIndex) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    setAnswers((current) => [...current, optionIndex]);
  }

  function nextQuestion() {
    if (questionIndex === quizQuestions.length - 1) {
      setQuizFinished(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setQuizFinished(false);
  }

  function toggleFactor(id) {
    setSelectedFactors((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  }

  return (
    <div className="lf-app">
      <div className="space-background">
        <ParticleField />
        {stars.map((star, index) => (
          <span key={index} className="space-star" style={{
            left: star.left, top: star.top, width: star.size, height: star.size,
            animationDelay: star.delay
          }} />
        ))}
        <div className="nebula nebula-one" />
        <div className="nebula nebula-two" />
        <div className="background-grid" />
      </div>

      <header className="lf-header">
        <button className="brand" onClick={() => navigate("home")} aria-label="LIFE FINDER — главная">
          <span className="brand-icon"><Orbit size={23} /></span>
          <span>LIFE<span className="brand-accent">FINDER</span></span>
        </button>
        <button className="mobile-menu-button" onClick={() => setMobileMenu((open) => !open)} aria-label="Открыть меню">
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"} aria-label="Главная навигация">
          <button className={page === "home" ? "nav-active" : ""} onClick={() => navigate("home")}>Главная</button>
          <button className={page === "journey" ? "nav-active" : ""} onClick={() => navigate("journey")}>Cosmic Journey</button>
          <button className={page === "quiz" ? "nav-active" : ""} onClick={() => navigate("quiz")}>Cosmic Quiz</button>
          <button className={`nav-explore ${page === "detector" ? "nav-active" : ""}`} onClick={() => navigate("detector")}>Life Detector <Sparkles size={15} /></button>
        </nav>
      </header>

      <main className="lf-main">
        <AnimatePresence mode="wait">
          {page === "home" && (
            <motion.section key="home" className="hero" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="hero-content">
                <div className="eyebrow"><span className="live-dot" /> ИССЛЕДУЙ НЕИЗВЕДАННОЕ</div>
                <h1>Is there <span>life</span><br />beyond Earth?</h1>
                <p className="hero-description">
                  Путешествуй по космосу, изучай далёкие миры и узнай, как учёные ищут условия,
                  которые могут быть подходящими для жизни за пределами Земли.
                </p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => navigate("journey")}>Начать исследование <ChevronRight size={18} /></button>
                  <button className="secondary-button" onClick={() => navigate("detector")}>LIFE DETECTOR <Search size={17} /></button>
                </div>
                <div className="hero-caption">
                  <span><Telescope size={16} /> НАУКА И ИССЛЕДОВАНИЯ</span>
                  <span><Database size={16} /> NASA EXOPLANET ARCHIVE</span>
                </div>
              </div>

              <div className="hero-visual">
                <HologramPlanet />
                <div className="visual-label label-top"><span className="label-dot" /> HOLOGRAPHIC INTERFACE / 001</div>
                <div className="visual-label label-bottom"><span>SEARCHING FOR OTHER WORLDS</span><Sparkles size={14} /></div>
              </div>

              <div className="hero-bottom">
                <div><strong>8</strong><span>Планет в Солнечной системе</span></div>
                <div><strong>6 400+</strong><span>Подтверждённых экзопланет в каталоге NASA</span></div>
                <div><strong>1</strong><span>Мир с подтверждённой жизнью — Земля</span></div>
              </div>
            </motion.section>
          )}

          {page === "journey" && (
            <motion.section key="journey" className="content-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
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
                  <div className="map-orbit map-orbit-three" />
                  <div className="map-sun"><span /></div>
                  {destinations.map((item, index) => (
                    <button key={item.id} className={`map-point map-point-${index} ${selectedId === item.id ? "point-selected" : ""}`}
                      style={{ "--planet-color": item.color }} onClick={() => setSelectedId(item.id)} aria-pressed={selectedId === item.id}>
                      <span className="point-core" /><span className="point-name">{item.name}</span>
                    </button>
                  ))}
                  <div className="map-caption">SCHEMATIC VIEW · NOT TO SCALE</div>
                </div>
                <motion.article className="destination-card" key={selected.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="destination-top">
                    <span className="destination-tag">{selected.type}</span>
                    <span className="destination-number">0{destinations.findIndex((item) => item.id === selected.id) + 1}</span>
                  </div>
                  <div className="destination-orb" style={{ "--planet-color": selected.color }}><div /></div>
                  <h3>{selected.name}</h3>
                  <div className="destination-distance"><Orbit size={15} /> {selected.distance}</div>
                  <p>{selected.description}</p>
                  <div className="fact-panel"><Sparkles size={17} /><span>{selected.fact}</span></div>
                  <div className="destination-actions">
                    <a className="text-link" href={selected.source} target="_blank" rel="noreferrer">Источник NASA <ExternalLink size={14} /></a>
                    <button className="secondary-button destination-next" onClick={() => {
                      const next = (destinations.findIndex((item) => item.id === selected.id) + 1) % destinations.length;
                      setSelectedId(destinations[next].id);
                    }}>Следующий объект <ChevronRight size={17} /></button>
                  </div>
                </motion.article>
              </div>
              <p className="map-disclaimer">Космическая схема условная и не показывает реальные масштабы и взаимное расположение объектов.</p>
            </motion.section>
          )}

          {page === "quiz" && (
            <motion.section key="quiz" className="content-page quiz-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
              <div className="section-heading">
                <div className="eyebrow"><Sparkles size={15} /> ПРОВЕРЬ СВОИ ЗНАНИЯ</div>
                <h2>Cosmic <span>Quiz</span></h2>
                <p>Пять вопросов о космосе, экзопланетах и поиске жизни.</p>
              </div>
              <div className="quiz-card">
                {!quizFinished ? (
                  <>
                    <div className="quiz-progress-info"><span>ВОПРОС {questionIndex + 1} / {quizQuestions.length}</span><span>{Math.round(((questionIndex + (selectedAnswer !== null ? 1 : 0)) / quizQuestions.length) * 100)}%</span></div>
                    <div className="quiz-progress"><span style={{ width: `${((questionIndex + (selectedAnswer !== null ? 1 : 0)) / quizQuestions.length) * 100}%` }} /></div>
                    <h3>{quizQuestions[questionIndex].question}</h3>
                    <div className="quiz-options">
                      {quizQuestions[questionIndex].options.map((option, index) => {
                        const isChosen = selectedAnswer === index;
                        const isCorrect = quizQuestions[questionIndex].correct === index;
                        const stateClass = selectedAnswer === null ? "" : isCorrect ? "option-correct" : isChosen ? "option-wrong" : "option-muted";
                        return (
                          <button key={option} className={stateClass} onClick={() => chooseAnswer(index)} disabled={selectedAnswer !== null}>
                            <span className="option-letter">{String.fromCharCode(65 + index)}</span>{option}
                            {selectedAnswer !== null && isCorrect ? <ShieldCheck size={17} /> : <ChevronRight size={17} />}
                          </button>
                        );
                      })}
                    </div>
                    {selectedAnswer !== null && (
                      <div className="quiz-feedback">
                        <strong>{selectedAnswer === quizQuestions[questionIndex].correct ? "Верно!" : "Разберём ответ"}</strong>
                        <p>{quizQuestions[questionIndex].explanation}</p>
                        <button className="primary-button" onClick={nextQuestion}>{questionIndex === quizQuestions.length - 1 ? "Посмотреть результат" : "Следующий вопрос"} <ChevronRight size={17} /></button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="quiz-result">
                    <div className="result-icon"><Sparkles size={30} /></div>
                    <div className="eyebrow">ИССЛЕДОВАНИЕ ЗАВЕРШЕНО</div>
                    <h3>{score} из {quizQuestions.length}</h3>
                    <p>{score === 5 ? "Превосходно! Ты отлично знаешь космос." : "Отличная работа! Продолжай исследовать Вселенную."}</p>
                    <button className="primary-button" onClick={restartQuiz}><RotateCcw size={16} /> Пройти ещё раз</button>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {page === "detector" && (
            <motion.section key="detector" className="content-page detector-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
              <div className="section-heading">
                <div className="eyebrow"><Microscope size={15} /> НАУЧНЫЙ ИНСТРУМЕНТ</div>
                <h2>Life <span>Detector</span></h2>
                <p>Изучи факторы, которые помогают учёным оценивать потенциальную пригодность планет для жизни.</p>
              </div>
              <div className="detector-card">
                <div className="detector-intro">
                  <div className="detector-icon"><Search size={28} /></div>
                  <div><span className="detector-kicker">INTERACTIVE RESEARCH MODEL</span><h3>Какие условия есть у этого мира?</h3>
                    <p>Отметь факторы, которые, по твоему предположению, могут быть характерны для выбранной планеты.</p></div>
                </div>
                <div className="criteria-grid">
                  {detectorFactors.map((factor) => {
                    const Icon = factor.icon;
                    const active = selectedFactors.includes(factor.id);
                    return (
                      <button key={factor.id} className={`criterion ${active ? "criterion-active" : ""}`} onClick={() => toggleFactor(factor.id)} aria-pressed={active}>
                        <span className="criterion-icon"><Icon size={20} /></span>
                        <span className="criterion-copy"><strong>{factor.title}</strong><small>{factor.detail}</small></span>
                        <span className="criterion-check">{active ? "✓" : "+"}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="detector-result">
                  <div className="result-orbit"><Radio size={21} /></div>
                  <div className="result-copy">
                    <span className="detector-kicker">ВЫБРАНО ФАКТОРОВ: {selectedFactors.length} / {detectorFactors.length}</span>
                    <strong>{selectedFactors.length === 0 ? "Начни исследование" : selectedFactors.length < 3 ? "Есть параметры для дальнейшего изучения" : "Много факторов требуют проверки"}</strong>
                    <p>{selectedFactors.length === 0
                      ? "Отметь факторы, чтобы увидеть краткий исследовательский вывод."
                      : "Это учебная модель: отметки показывают только выбранные тобой пункты и не являются измерениями реальной планеты."}</p>
                  </div>
                  <button className="reset-button" onClick={() => setSelectedFactors([])} aria-label="Сбросить выбор"><RotateCcw size={17} /></button>
                </div>
                <div className="science-note"><CircleHelp size={19} /><p><strong>Важно:</strong> Life Detector не обнаруживает жизнь и не вычисляет вероятность её существования. Обитаемая зона не гарантирует жидкую воду или жизнь: нужны реальные наблюдения атмосферы, поверхности и звезды.</p></div>
                <div className="detector-sources">
                  <span>НАУЧНЫЕ ИСТОЧНИКИ</span>
                  <a href="https://science.nasa.gov/exoplanets/" target="_blank" rel="noreferrer">NASA Exoplanets <ExternalLink size={13} /></a>
                  <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer">NASA Exoplanet Archive <ExternalLink size={13} /></a>
                  <a href="https://science.nasa.gov/resource/what-is-the-habitable-zone/" target="_blank" rel="noreferrer">Habitable Zone <ExternalLink size={13} /></a>
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
