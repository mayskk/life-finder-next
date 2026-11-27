
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Orbit, Telescope, Sparkles, Globe2, Search, ChevronRight, ArrowLeft,
  Rocket, Star, Menu, X, Microscope, Database, ExternalLink, CircleHelp,
  Waves, ShieldCheck, Radio, Activity, RotateCcw, Thermometer,
  Ruler, Scale, Clock, MapPin, AlertCircle
} from "lucide-react";
import "./App.css";

const CSV_FILE = "PSCompPars_2026.11.13_09.22.26.csv";

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

const stars = Array.from({ length: 145 }, (_, i) => ({
  left: `${(i * 37 + 13) % 100}%`,
  top: `${(i * 61 + 7) % 100}%`,
  delay: `${(i % 8) * 0.45}s`,
  size: i % 7 === 0 ? 3 : 2
}));

// Разбор CSV: учитываем кавычки, BOM, служебные строки NASA и разные разделители.
function parseCSV(text) {
  if (!text || typeof text !== "string") return [];

  const source = text.replace(/^\uFEFF/, "");

  function parseRows(delimiter) {
    const rows = [];
    let row = [];
    let value = "";
    let quoted = false;

    for (let i = 0; i < source.length; i++) {
      const char = source[i];

      if (char === '"') {
        if (quoted && source[i + 1] === '"') {
          value += '"';
          i++;
        } else {
          quoted = !quoted;
        }
      } else if (char === delimiter && !quoted) {
        row.push(value);
        value = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && source[i + 1] === "\n") i++;
        row.push(value);
        if (row.some((cell) => cell.trim() !== "")) rows.push(row);
        row = [];
        value = "";
      } else {
        value += char;
      }
    }

    row.push(value);
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
    return rows;
  }

  const normalizeHeader = (cell) =>
    String(cell ?? "")
      .replace(/^\uFEFF/, "")
      .trim()
      .replace(/^#\s*/, "")
      .trim()
      .toLowerCase();

  // NASA может добавлять перед заголовками служебные строки.
  // Проверяем распространённые разделители и ищем строку с pl_name.
  const candidates = [",", "\t", ";"].map((delimiter) => {
    const rows = parseRows(delimiter);
    const headerIndex = rows.findIndex((row) =>
      row.some((cell) => normalizeHeader(cell) === "pl_name")
    );
    return { rows, headerIndex };
  });

  const matching = candidates
    .filter((candidate) => candidate.headerIndex !== -1)
    .sort((a, b) => b.rows[a.headerIndex].length - a.rows[b.headerIndex].length);

  if (!matching.length) return [];

  const { rows, headerIndex } = matching[0];
  const headers = rows[headerIndex].map(normalizeHeader);

  return rows.slice(headerIndex + 1)
    .filter((cells) => cells.some((cell) => String(cell).trim() !== ""))
    .map((cells) => {
      const result = {};
      headers.forEach((header, index) => {
        if (header) result[header] = String(cells[index] ?? "").trim();
      });
      return result;
    });
}

function getValue(planet, key) {
  const value = planet?.[key];
  if (value === undefined || value === null || value === "" || value === "—") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function formatValue(value, digits = 2) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Нет данных";
  return value.toLocaleString("ru-RU", {
    maximumFractionDigits: digits
  });
}

function analyzePlanet(planet) {
  const radius = getValue(planet, "pl_rade");
  const mass = getValue(planet, "pl_bmasse");
  const temperature = getValue(planet, "pl_eqt");
  const flux = getValue(planet, "pl_insol");

  const reasons = [];
  let supportive = 0;
  let concerning = 0;

  if (radius !== null) {
    if (radius >= 0.5 && radius <= 1.8) {
      supportive++;
      reasons.push("Радиус находится в диапазоне, совместимом с некоторыми каменистыми планетами.");
    } else if (radius > 2.5) {
      concerning++;
      reasons.push("Большой радиус может указывать на газовую или богатую летучими веществами планету.");
    } else {
      reasons.push("Радиус сам по себе не позволяет уверенно определить состав планеты.");
    }
  } else {
    reasons.push("Радиус планеты не указан в таблице.");
  }

  if (temperature !== null) {
    if (temperature >= 180 && temperature <= 330) {
      supportive++;
      reasons.push("Равновесная температура попадает в широкий ориентировочный диапазон для дальнейшего изучения.");
    } else if (temperature > 400 || temperature < 100) {
      concerning++;
      reasons.push("Равновесная температура указывает на условия, которые могут быть неблагоприятными для жидкой воды на поверхности.");
    } else {
      reasons.push("Температурные данные требуют дополнительного изучения.");
    }
  } else {
    reasons.push("Равновесная температура не указана.");
  }

  if (flux !== null) {
    if (flux >= 0.25 && flux <= 1.5) {
      supportive++;
      reasons.push("Получаемый от звезды поток энергии находится в интересном для исследования диапазоне.");
    } else if (flux > 3 || flux < 0.1) {
      concerning++;
      reasons.push("Поток энергии заметно отличается от земного.");
    } else {
      reasons.push("Поток энергии требует дополнительной оценки.");
    }
  } else {
    reasons.push("Данные о потоке энергии от звезды отсутствуют.");
  }

  let status = "Недостаточно данных";
  let explanation = "Доступных характеристик пока недостаточно для предварительной оценки.";

  if (supportive >= 2 && concerning === 0) {
    status = "Потенциальный кандидат для изучения";
    explanation = "Некоторые известные параметры выглядят интересными для дальнейшего исследования. Это не подтверждает пригодность планеты для жизни.";
  } else if (concerning >= 2) {
    status = "Маловероятно пригодна";
    explanation = "Несколько доступных характеристик указывают на возможные неблагоприятные условия. Для окончательного вывода нужны дополнительные наблюдения.";
  } else if (supportive >= 1) {
    status = "Есть интересные характеристики";
    explanation = "Обнаружены отдельные параметры, заслуживающие изучения, но данных недостаточно для уверенной оценки.";
  }

  return { status, explanation, reasons };
}

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

  const [planets, setPlanets] = useState([]);
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvAttempted, setCsvAttempted] = useState(false);
  const [csvError, setCsvError] = useState("");
  const [visiblePlanetCount, setVisiblePlanetCount] = useState(80);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const selected = destinations.find((item) => item.id === selectedId) || destinations[0];
  const score = answers.reduce((total, answer, index) => total + (answer === quizQuestions[index].correct ? 1 : 0), 0);

  useEffect(() => {
    if (page !== "detector" || planets.length > 0 || csvAttempted) return;

    async function loadPlanets() {
      setCsvAttempted(true);
      setCsvLoading(true);
      setCsvError("");

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}${CSV_FILE}`);
        if (!response.ok) {
          throw new Error(`Не удалось загрузить CSV: ${response.status}`);
        }

        const csvText = await response.text();
        const parsed = parseCSV(csvText);

        if (!parsed.length || !parsed.some((planet) => planet.pl_name)) {
          throw new Error(
            "Не найдена строка заголовков с колонкой pl_name. Проверь CSV-файл NASA и его формат."
          );
        }

        const validPlanets = parsed
          .filter((planet) => planet.pl_name)
          .sort((a, b) => a.pl_name.localeCompare(b.pl_name));

        if (!validPlanets.length) {
          throw new Error("В CSV-файле не найдено ни одной записи об экзопланете.");
        }

        setPlanets(validPlanets);
      } catch (error) {
        setCsvError(error.message || "Не удалось прочитать таблицу NASA.");
      } finally {
        setCsvLoading(false);
      }
    }

    loadPlanets();
  }, [page, planets.length, csvAttempted]);

  useEffect(() => {
    if (!selectedPlanet) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedPlanet(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPlanet]);

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

  const visiblePlanets = planets.slice(0, visiblePlanetCount);

  const modalAnalysis = selectedPlanet ? analyzePlanet(selectedPlanet) : null;

  const modalStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    background: "rgba(5, 3, 14, .88)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    overflowY: "auto"
  };

  const modalPanelStyle = {
    width: "100%",
    maxWidth: "760px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "linear-gradient(145deg, #171027, #0c0918)",
    border: "1px solid rgba(190, 155, 255, .28)",
    borderRadius: "22px",
    padding: "clamp(20px, 4vw, 34px)",
    color: "#f7f1ff",
    boxShadow: "0 25px 100px rgba(0,0,0,.5)"
  };

  const metricStyle = {
    background: "rgba(255,255,255,.045)",
    border: "1px solid rgba(190,155,255,.13)",
    borderRadius: "13px",
    padding: "15px",
    minWidth: 0
  };

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
                <p>Выбери экзопланету из каталога NASA и изучи её реальные характеристики.</p>
              </div>

              <div className="detector-card">
                <div className="detector-intro">
                  <div className="detector-icon"><Orbit size={28} /></div>
                  <div>
                    <span className="detector-kicker">NASA EXOPLANET ARCHIVE</span>
                    <h3>Каталог экзопланет</h3>
                    <p>Выбери планету из каталога NASA, чтобы посмотреть её характеристики и предварительную оценку условий для жизни.</p>
                  </div>
                </div>

                {csvLoading && (
                  <div style={{ padding: "35px 15px", textAlign: "center" }}>
                    <div className="detector-kicker">ЗАГРУЗКА ДАННЫХ NASA</div>
                    <p>Читаем каталог экзопланет...</p>
                  </div>
                )}

                {csvError && (
                  <div style={{ padding: "20px", borderRadius: "12px", background: "rgba(255,90,110,.09)", border: "1px solid rgba(255,90,110,.25)" }}>
                    <AlertCircle size={22} />
                    <strong style={{ display: "block", margin: "10px 0" }}>Не удалось загрузить каталог</strong>
                    <p>{csvError}</p>
                    <p>Проверь, что CSV-файл находится непосредственно в папке public и называется точно так же, как указано в коде.</p>
                    <button className="secondary-button" onClick={() => { setPlanets([]); setCsvError(""); setCsvAttempted(false); }}>Повторить загрузку <RotateCcw size={15} /></button>
                  </div>
                )}

                {!csvLoading && !csvError && planets.length > 0 && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 15 }}>
                      <span className="detector-kicker">ПЛАНЕТ В КАТАЛОГЕ: {planets.length.toLocaleString("ru-RU")}</span>
                      <span style={{ fontSize: 12, opacity: .6 }}>Источник: NASA Exoplanet Archive</span>
                    </div>

                    <div style={{ display: "grid", gap: 9 }}>
                      {visiblePlanets.map((planet, index) => (
                        <button
                          key={`${planet.pl_name}-${index}`}
                          onClick={() => setSelectedPlanet(planet)}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            gap: 12, width: "100%", textAlign: "left", padding: "14px 16px",
                            borderRadius: 12, cursor: "pointer", color: "#f7f1ff",
                            background: "rgba(255,255,255,.045)",
                            border: "1px solid rgba(190,155,255,.14)"
                          }}
                        >
                          <span style={{ minWidth: 0 }}>
                            <strong style={{ display: "block", overflowWrap: "anywhere" }}>{planet.pl_name}</strong>
                            <small style={{ opacity: .6, display: "block", marginTop: 4 }}>
                              Звезда: {planet.hostname || "Нет данных"}
                              {getValue(planet, "pl_rade") !== null ? ` · Радиус: ${formatValue(getValue(planet, "pl_rade"))} R⊕` : ""}
                            </small>
                          </span>
                          <ChevronRight size={19} style={{ flexShrink: 0, opacity: .7 }} />
                        </button>
                      ))}
                    </div>

                    {visiblePlanetCount < planets.length && (
                      <div style={{ textAlign: "center", marginTop: 18 }}>
                        <p style={{ opacity: .65, fontSize: 13, marginBottom: 12 }}>
                          Показано {visiblePlanets.length.toLocaleString("ru-RU")} из {planets.length.toLocaleString("ru-RU")} планет
                        </p>
                        <button
                          className="secondary-button"
                          onClick={() => setVisiblePlanetCount((count) => Math.min(count + 80, planets.length))}
                        >
                          Показать ещё 80 планет <ChevronRight size={15} />
                        </button>
                      </div>
                    )}
                  </>
                )}

                <div className="science-note" style={{ marginTop: 24 }}>
                  <CircleHelp size={19} />
                  <p><strong>Важно:</strong> данные взяты из каталога NASA. Не у каждой планеты измерены все характеристики. Отсутствующие значения не заменяются предположениями.</p>
                </div>

                <div className="detector-sources">
                  <span>НАУЧНЫЙ ИСТОЧНИК</span>
                  <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer">NASA Exoplanet Archive <ExternalLink size={13} /></a>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            style={modalStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedPlanet(null);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="planet-modal-title"
              style={modalPanelStyle}
              initial={{ opacity: 0, y: 25, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 15, alignItems: "flex-start" }}>
                <div>
                  <span className="detector-kicker">РЕЗУЛЬТАТ АНАЛИЗА NASA</span>
                  <h2 id="planet-modal-title" style={{ fontSize: "clamp(23px, 4vw, 32px)", margin: "9px 0" }}>{selectedPlanet.pl_name}</h2>
                  <p style={{ opacity: .65, margin: 0 }}>Звёздная система: {selectedPlanet.hostname || "Нет данных"}</p>
                </div>
                <button onClick={() => setSelectedPlanet(null)} aria-label="Закрыть окно" style={{ background: "rgba(255,255,255,.08)", border: 0, borderRadius: 10, color: "white", padding: 10, cursor: "pointer" }}>
                  <X size={21} />
                </button>
              </div>

              <div style={{ marginTop: 24 }}>
                <div className="detector-kicker" style={{ marginBottom: 12 }}>ХАРАКТЕРИСТИКИ ПЛАНЕТЫ</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
                  <div style={metricStyle}>
                    <Ruler size={18} />
                    <small style={{ display: "block", opacity: .6, marginTop: 8 }}>Радиус</small>
                    <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>{formatValue(getValue(selectedPlanet, "pl_rade"))}</strong>
                    <small style={{ opacity: .6 }}>радиусов Земли (R⊕)</small>
                  </div>
                  <div style={metricStyle}>
                    <Scale size={18} />
                    <small style={{ display: "block", opacity: .6, marginTop: 8 }}>Масса</small>
                    <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>{formatValue(getValue(selectedPlanet, "pl_bmasse"))}</strong>
                    <small style={{ opacity: .6 }}>масс Земли (M⊕)</small>
                  </div>
                  <div style={metricStyle}>
                    <Thermometer size={18} />
                    <small style={{ display: "block", opacity: .6, marginTop: 8 }}>Равновесная температура</small>
                    <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>{formatValue(getValue(selectedPlanet, "pl_eqt"), 1)}</strong>
                    <small style={{ opacity: .6 }}>кельвинов (K)</small>
                  </div>
                  <div style={metricStyle}>
                    <Clock size={18} />
                    <small style={{ display: "block", opacity: .6, marginTop: 8 }}>Орбитальный период</small>
                    <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>{formatValue(getValue(selectedPlanet, "pl_orbper"))}</strong>
                    <small style={{ opacity: .6 }}>земных суток</small>
                  </div>
                  <div style={metricStyle}>
                    <MapPin size={18} />
                    <small style={{ display: "block", opacity: .6, marginTop: 8 }}>Расстояние от Земли</small>
                    <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>
                      {getValue(selectedPlanet, "sy_dist") !== null
                        ? formatValue(getValue(selectedPlanet, "sy_dist") * 3.26156, 1)
                        : "Нет данных"}
                    </strong>
                    <small style={{ opacity: .6 }}>световых лет</small>
                  </div>
                  <div style={metricStyle}>
                    <Orbit size={18} />
                    <small style={{ display: "block", opacity: .6, marginTop: 8 }}>Поток энергии от звезды</small>
                    <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>{formatValue(getValue(selectedPlanet, "pl_insol"))}</strong>
                    <small style={{ opacity: .6 }}>относительно земного потока</small>
                  </div>
                  <div style={metricStyle}>
                    <Star size={18} />
                    <small style={{ display: "block", opacity: .6, marginTop: 8 }}>Температура звезды</small>
                    <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>{formatValue(getValue(selectedPlanet, "st_teff"), 0)}</strong>
                    <small style={{ opacity: .6 }}>кельвинов (K)</small>
                  </div>
                  <div style={metricStyle}>
                    <Database size={18} />
                    <small style={{ display: "block", opacity: .6, marginTop: 8 }}>Год открытия</small>
                    <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>{formatValue(getValue(selectedPlanet, "disc_year"), 0)}</strong>
                    <small style={{ opacity: .6 }}>год обнаружения</small>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24, padding: 19, borderRadius: 15, background: "rgba(177,135,255,.09)", border: "1px solid rgba(190,155,255,.25)" }}>
                <span className="detector-kicker">ПРЕДВАРИТЕЛЬНАЯ ОЦЕНКА</span>
                <h3 style={{ fontSize: 22, margin: "10px 0" }}>{modalAnalysis.status}</h3>
                <p style={{ lineHeight: 1.6, opacity: .85 }}>{modalAnalysis.explanation}</p>
                <div style={{ marginTop: 18 }}>
                  <strong style={{ fontSize: 13 }}>ПОЧЕМУ ПОЛУЧЕН ТАКОЙ РЕЗУЛЬТАТ</strong>
                  {modalAnalysis.reasons.map((reason, index) => (
                    <p key={index} style={{ fontSize: 13, lineHeight: 1.55, opacity: .78, margin: "9px 0" }}>• {reason}</p>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 18, padding: 15, borderRadius: 12, background: "rgba(255,255,255,.045)" }}>
                <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, opacity: .8 }}>
                  <strong>Научное ограничение:</strong> равновесная температура не равна реальной температуре поверхности. Эта оценка не подтверждает наличие воды, атмосферы или жизни. Для этого нужны дополнительные наблюдения.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
                <a className="text-link" href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer">Открыть NASA Archive <ExternalLink size={14} /></a>
                <button className="primary-button" onClick={() => setSelectedPlanet(null)}>Закрыть анализ <X size={16} /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="lf-footer">
        <button className="footer-brand" onClick={() => navigate("home")}><Orbit size={19} /> LIFE FINDER</button>
        <span>ИССЛЕДУЯ ВСЕЛЕННУЮ · В ПОИСКАХ ОТВЕТОВ</span>
        <a href="https://science.nasa.gov/exoplanets/" target="_blank" rel="noreferrer">NASA EXOPLANETS <ExternalLink size={13} /></a>
      </footer>
    </div>
  );
}

export default App;
