import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, ChevronRight,
  Compass, ExternalLink, Globe2, HelpCircle, Home, Info, Orbit, RotateCcw,
  Sparkles, Star, Telescope, X
} from "lucide-react";

const destinations = [
  {
    id: "solar",
    name: "Солнечная система",
    category: "НАШ ДОМ",
    distance: "0 световых лет",
    distanceNote: "Мы находимся внутри Солнечной системы",
    type: "Планетная система",
    facts: [
      "В центре системы находится звезда — Солнце.",
      "Восемь планет обращаются вокруг Солнца по эллиптическим орбитам.",
      "Солнечная система находится в рукаве Ориона галактики Млечный Путь."
    ],
    description: "Солнечная система — гравитационно связанная система Солнца и объектов, обращающихся вокруг него: планет, карликовых планет, спутников, астероидов и комет.",
    source: "NASA Solar System Exploration",
    url: "https://science.nasa.gov/solar-system/"
  },
  {
    id: "proxima",
    name: "Proxima Centauri b",
    category: "ЭКЗОПЛАНЕТА",
    distance: "около 4,24 светового года",
    distanceNote: "Расстояние от Земли до системы Проксимы Центавра",
    type: "Экзопланета у красного карлика",
    facts: [
      "Обращается вокруг звезды Proxima Centauri — ближайшей к Солнцу звезды.",
      "Орбитальный период составляет примерно 11,2 земных суток.",
      "Находится в так называемой обитаемой зоне, но это само по себе не доказывает наличие жидкой воды или жизни."
    ],
    description: "Proxima Centauri b — ближайшая к Земле известная экзопланета. Условия на её поверхности пока не установлены: важные вопросы связаны с атмосферой и воздействием активности звезды.",
    source: "NASA — Proxima b 3D Model",
    url: "https://science.nasa.gov/resource/proxima-b-3d-model/"
  },
  {
    id: "trappist",
    name: "Система TRAPPIST-1",
    category: "ПЛАНЕТНАЯ СИСТЕМА",
    distance: "около 40 световых лет",
    distanceNote: "От Земли до звезды TRAPPIST-1",
    type: "Ультрахолодный красный карлик и семь известных планет",
    facts: [
      "В системе обнаружено семь планет размером примерно с Землю.",
      "Планеты обращаются очень близко к своей звезде; их орбиты компактнее орбиты Меркурия вокруг Солнца.",
      "Некоторые планеты находятся в обитаемой зоне, но наличие жизни не обнаружено."
    ],
    description: "TRAPPIST-1 — одна из наиболее подробно изучаемых компактных планетных систем за пределами Солнечной системы. Телескоп James Webb исследует атмосферы её планет.",
    source: "NASA — TRAPPIST-1",
    url: "https://science.nasa.gov/exoplanets/trappist1/"
  },
  {
    id: "kepler",
    name: "Kepler-186f",
    category: "ЭКЗОПЛАНЕТА",
    distance: "около 500 световых лет",
    distanceNote: "Расстояние от Земли, указанное NASA",
    type: "Экзопланета у красного карлика",
    facts: [
      "Открытие было объявлено в 2014 году.",
      "Радиус планеты оценивается примерно в 1,17 радиуса Земли.",
      "Планета обращается вокруг своей звезды примерно за 129,9 земных суток."
    ],
    description: "Kepler-186f стала первой обнаруженной планетой земного размера в обитаемой зоне другой звезды. «Обитаемая зона» означает лишь возможность подходящего температурного диапазона при определённых условиях, а не подтверждённую обитаемость.",
    source: "NASA Exoplanet Catalog — Kepler-186 f",
    url: "https://science.nasa.gov/exoplanet-catalog/kepler-186-f/"
  },
  {
    id: "galactic",
    name: "Центр Млечного Пути",
    category: "ЦЕНТР ГАЛАКТИКИ",
    distance: "около 26 000 световых лет",
    distanceNote: "От Солнечной системы; оценка NASA",
    type: "Галактический центр",
    facts: [
      "В центральной области находится сверхмассивная чёрная дыра Sagittarius A*.",
      "Солнечная система расположена далеко от центра, в рукаве Ориона.",
      "Солнцу требуется примерно 230–250 миллионов лет, чтобы совершить один оборот вокруг центра галактики."
    ],
    description: "Центр Млечного Пути расположен в направлении созвездия Стрельца. Его изучают в радиодиапазоне, инфракрасном и рентгеновском излучении, поскольку плотные облака пыли закрывают видимый свет.",
    source: "NASA — Center of the Milky Way",
    url: "https://science.nasa.gov/asset/hubble/compassscale-annotated-image-of-the-center-of-the-milky-way/"
  }
];

const quizQuestions = [
  {
    question: "Какая звезда является ближайшей к Солнцу?",
    answers: ["Сириус", "Проксима Центавра", "Бетельгейзе"],
    correct: 1,
    explanation: "Проксима Центавра находится примерно в 4,24 светового года от Солнца."
  },
  {
    question: "Сколько известных планет обращается вокруг TRAPPIST-1?",
    answers: ["Три", "Пять", "Семь"],
    correct: 2,
    explanation: "У звезды TRAPPIST-1 известно семь планет примерно земного размера."
  },
  {
    question: "Что означает термин «экзопланета»?",
    answers: ["Планета за пределами Солнечной системы", "Очень большая звезда", "Спутник Юпитера"],
    correct: 0,
    explanation: "Экзопланета — планета, обращающаяся вокруг звезды за пределами нашей Солнечной системы."
  },
  {
    question: "Доказывает ли нахождение планеты в обитаемой зоне наличие жизни?",
    answers: ["Да, всегда", "Нет, это только один из факторов", "Только если планета большая"],
    correct: 1,
    explanation: "Нужны дополнительные условия: например, подходящая атмосфера, вода и стабильная среда."
  },
  {
    question: "Как далеко от нас находится центр Млечного Пути?",
    answers: ["Около 26 световых лет", "Около 2 600 световых лет", "Около 26 000 световых лет"],
    correct: 2,
    explanation: "Оценка расстояния от Солнечной системы до центра галактики — около 26 тысяч световых лет."
  }
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800&display=swap');
:root{font-family:'DM Sans',sans-serif;color:#f5f4ff;background:#070914;font-synthesis:none;text-rendering:optimizeLegibility}
*{box-sizing:border-box}
body{margin:0;min-width:320px;background:#070914}
button{font:inherit}
.lf-app{min-height:100vh;overflow:hidden;background:radial-gradient(ellipse at 50% -15%,#252052 0%,#101329 38%,#070914 75%);color:#f5f4ff}
.lf-shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
.lf-header{height:82px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ffffff14;gap:18px}
.lf-brand{display:flex;align-items:center;gap:12px;font-family:Orbitron,sans-serif;font-weight:700;letter-spacing:.13em;font-size:15px}
.lf-brand-mark{width:37px;height:37px;border:1px solid #9b8cff80;border-radius:12px;display:grid;place-items:center;color:#b9aaff;background:#a18bff16;box-shadow:0 0 25px #8870ff30}
.lf-nav{display:flex;gap:7px;align-items:center}
.lf-nav button,.lf-ghost{border:1px solid transparent;background:transparent;color:#b9bdd4;padding:10px 13px;border-radius:11px;cursor:pointer;transition:.2s}
.lf-nav button:hover,.lf-nav button.active{color:#fff;background:#ffffff0d;border-color:#ffffff1b}
.lf-hero{padding:72px 0 46px;position:relative}
.lf-eyebrow{font-family:Orbitron,sans-serif;font-size:10px;letter-spacing:.24em;color:#a99cff;text-transform:uppercase}
.lf-hero h1{font:600 clamp(38px,7vw,76px)/1.04 Orbitron,sans-serif;letter-spacing:-.055em;margin:20px 0 18px;max-width:850px}
.lf-gradient{background:linear-gradient(100deg,#fff 10%,#b9a8ff 48%,#72d9f6 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.lf-lead{font-size:17px;line-height:1.7;color:#aeb3ca;max-width:690px}
.lf-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.lf-btn{border:1px solid #a797ff75;background:linear-gradient(110deg,#8067ee,#5d78e9);color:#fff;padding:13px 18px;border-radius:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:9px;box-shadow:0 10px 35px #6755d933;transition:transform .2s,filter .2s}
.lf-btn:hover{transform:translateY(-2px);filter:brightness(1.1)}
.lf-btn.secondary{background:#ffffff09;border-color:#ffffff25;box-shadow:none;color:#e8e5ff}
.lf-section-title{font:600 24px Orbitron,sans-serif;letter-spacing:-.03em;margin:0 0 10px}
.lf-muted{color:#aab0c7;line-height:1.65}
.lf-feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:24px 0 70px}
.lf-feature{padding:23px;border:1px solid #ffffff17;background:linear-gradient(145deg,#ffffff0d,#ffffff04);border-radius:18px;min-height:165px}
.lf-feature-icon{color:#b6a8ff;margin-bottom:17px}
.lf-feature h3{margin:0 0 8px;font-size:16px}
.lf-feature p{margin:0;color:#aab0c7;font-size:14px;line-height:1.6}
.lf-journey{padding:38px 0 70px}
.lf-topline{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:24px}
.lf-map-layout{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.8fr);gap:18px;align-items:stretch}
.lf-map{min-height:510px;border:1px solid #ffffff18;border-radius:22px;position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 50%,#28235b 0%,#11152e 43%,#090d1b 78%);isolation:isolate}
.lf-map:before,.lf-map:after{content:"";position:absolute;inset:10%;border:1px solid #b6aaff22;border-radius:50%;transform:rotate(-24deg) scaleY(.48);pointer-events:none}
.lf-map:after{inset:22% 5%;transform:rotate(28deg) scaleY(.36);border-color:#74d9ef1c}
.lf-map-label{position:absolute;left:22px;top:20px;color:#8f97b6;font:10px Orbitron,sans-serif;letter-spacing:.18em}
.lf-map-note{position:absolute;left:22px;bottom:18px;right:22px;color:#8f97b6;font-size:11px;line-height:1.5}
.lf-starfield{position:absolute;inset:0;background-image:radial-gradient(1px 1px at 12% 22%,#fff 98%,transparent),radial-gradient(1px 1px at 28% 72%,#aebdff 98%,transparent),radial-gradient(1.5px 1.5px at 76% 21%,#fff 98%,transparent),radial-gradient(1px 1px at 88% 68%,#fff 98%,transparent),radial-gradient(1px 1px at 57% 83%,#aebdff 98%,transparent),radial-gradient(1px 1px at 43% 13%,#fff 98%,transparent);opacity:.7}
.lf-galaxy{position:absolute;width:62%;height:31%;left:19%;top:34%;border-radius:50%;transform:rotate(-22deg);background:radial-gradient(ellipse at center,#fff8 0%,#b3a3ff70 5%,#7969d655 20%,#423a8a33 42%,transparent 72%);filter:blur(2px)}
.lf-galaxy:after{content:"";position:absolute;inset:25% -8%;border:2px solid #a99cff35;border-radius:50%;filter:blur(5px)}
.lf-map-point{position:absolute;z-index:2;transform:translate(-50%,-50%);border:0;background:transparent;color:#fff;cursor:pointer;text-align:center;display:flex;flex-direction:column;align-items:center;gap:7px}
.lf-point-core{width:13px;height:13px;border-radius:50%;background:#c8c0ff;box-shadow:0 0 0 5px #9e8bff22,0 0 22px 7px #a48eff99;transition:.2s}
.lf-map-point:hover .lf-point-core,.lf-map-point.selected .lf-point-core{transform:scale(1.35);background:#fff;box-shadow:0 0 0 7px #a48eff30,0 0 28px 10px #a48eff}
.lf-point-name{font-size:10px;white-space:nowrap;color:#d9d8ee;text-shadow:0 1px 8px #000}
.lf-detail{border:1px solid #ffffff1b;background:linear-gradient(150deg,#1a1d3b,#101426);border-radius:22px;padding:25px;display:flex;flex-direction:column}
.lf-tag{font:10px Orbitron,sans-serif;letter-spacing:.17em;color:#a99cff}
.lf-detail h2{font:600 24px Orbitron,sans-serif;margin:12px 0}
.lf-distance{font:600 22px Orbitron,sans-serif;color:#bdb2ff;margin:5px 0}
.lf-distance-note{font-size:12px;color:#8f96b4;line-height:1.5}
.lf-rule{height:1px;background:#ffffff18;margin:19px 0}
.lf-detail p{color:#b8bdd1;line-height:1.65;font-size:14px}
.lf-facts{padding-left:18px;color:#c9cce0;font-size:13px;line-height:1.65}
.lf-facts li{margin:8px 0}
.lf-source{display:inline-flex;align-items:center;gap:7px;color:#b8aaff;text-decoration:none;font-size:12px;margin-top:auto;padding-top:18px}
.lf-source:hover{color:#fff}
.lf-quiz-wrap{max-width:760px;margin:50px auto 80px}
.lf-quiz-card{border:1px solid #ffffff1b;background:linear-gradient(145deg,#1a1d3b,#0e1325);border-radius:22px;padding:clamp(22px,5vw,42px)}
.lf-progress{height:5px;background:#ffffff16;border-radius:9px;overflow:hidden;margin:22px 0 28px}
.lf-progress span{display:block;height:100%;background:linear-gradient(90deg,#9b83ff,#6ad9f0);transition:width .3s}
.lf-question{font-size:23px;line-height:1.35;margin:0 0 22px}
.lf-answer{width:100%;text-align:left;padding:15px 16px;margin:7px 0;border:1px solid #ffffff20;border-radius:12px;background:#ffffff08;color:#e9e9f7;cursor:pointer;transition:.2s}
.lf-answer:hover:not(:disabled){border-color:#a99cff;background:#a99cff16}
.lf-answer.correct{border-color:#62d6ad;background:#62d6ad16}
.lf-answer.wrong{border-color:#ff8e9b;background:#ff8e9b16}
.lf-explain{padding:14px;border-radius:12px;background:#ffffff0a;color:#bfc4d8;font-size:14px;line-height:1.6;margin-top:16px}
.lf-footer{border-top:1px solid #ffffff15;padding:24px 0 35px;color:#7f87a6;font-size:12px;display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap}
@media(max-width:800px){.lf-map-layout{grid-template-columns:1fr}.lf-map{min-height:430px}.lf-feature-grid{grid-template-columns:1fr}.lf-hero{padding-top:55px}.lf-topline{align-items:flex-start;flex-direction:column}}
@media(max-width:560px){.lf-shell{width:min(100% - 28px,1180px)}.lf-header{height:auto;min-height:75px;align-items:flex-start;padding:18px 0;flex-direction:column}.lf-nav{width:100%;overflow:auto}.lf-nav button{white-space:nowrap;padding:9px 10px;font-size:12px}.lf-map{min-height:390px}.lf-point-name{font-size:9px}.lf-map-label{font-size:9px}.lf-detail{padding:21px}}
`;

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState("proxima");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const selected = useMemo(
    () => destinations.find((item) => item.id === selectedId) || destinations[0],
    [selectedId]
  );

  const chooseAnswer = (answerIndex) => {
    if (answers[questionIndex] !== undefined) return;
    setAnswers((current) => ({ ...current, [questionIndex]: answerIndex }));
  };

  const score = quizQuestions.reduce(
    (total, question, index) => total + (answers[index] === question.correct ? 1 : 0),
    0
  );

  const restartQuiz = () => {
    setQuestionIndex(0);
    setAnswers({});
    setQuizFinished(false);
  };

  const nextQuestion = () => {
    if (questionIndex === quizQuestions.length - 1) setQuizFinished(true);
    else setQuestionIndex((current) => current + 1);
  };

  return (
    <div className="lf-app">
      <style>{css}</style>
      <div className="lf-shell">
        <header className="lf-header">
          <div className="lf-brand">
            <span className="lf-brand-mark"><Orbit size={21} /></span>
            <span>LIFE FINDER <span style={{ color: "#a99cff" }}>NEXT</span></span>
          </div>
          <nav className="lf-nav" aria-label="Основная навигация">
            <button className={page === "home" ? "active" : ""} onClick={() => setPage("home")}><Home size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />Главная</button>
            <button className={page === "journey" ? "active" : ""} onClick={() => setPage("journey")}><Compass size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />COSMIC JOURNEY</button>
            <button className={page === "quiz" ? "active" : ""} onClick={() => setPage("quiz")}><HelpCircle size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />COSMIC QUIZ</button>
          </nav>
        </header>

        <AnimatePresence mode="wait">
          {page === "home" && (
            <motion.main key="home" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <section className="lf-hero">
                <div className="lf-eyebrow"><Sparkles size={13} style={{ verticalAlign: "middle", marginRight: 8 }} />Исследуй космос. Проверяй факты.</div>
                <h1>ОТКРОЙ <span className="lf-gradient">НЕИЗВЕДАННОЕ</span></h1>
                <p className="lf-lead">LIFE FINDER — интерактивное путешествие по звёздным системам, экзопланетам и нашей галактике. Научные сведения сопровождаются ссылками на источники NASA.</p>
                <div className="lf-actions">
                  <button className="lf-btn" onClick={() => setPage("journey")}>Начать путешествие <ArrowRight size={17} /></button>
                  <button className="lf-btn secondary" onClick={() => setPage("quiz")}>Проверить знания <HelpCircle size={17} /></button>
                </div>
              </section>
              <section>
                <h2 className="lf-section-title">ИССЛЕДУЙ ВСЕЛЕННУЮ</h2>
                <p className="lf-muted">Три способа познакомиться с космосом — от объектов рядом с нами до далёких миров.</p>
                <div className="lf-feature-grid">
                  <article className="lf-feature"><div className="lf-feature-icon"><Telescope size={24} /></div><h3>Научные факты</h3><p>Расстояния, типы объектов и характеристики с указанием первоисточников.</p></article>
                  <article className="lf-feature"><div className="lf-feature-icon"><Orbit size={24} /></div><h3>Cosmic Journey</h3><p>Выбирай космические объекты на интерактивной схеме и изучай их особенности.</p></article>
                  <article className="lf-feature"><div className="lf-feature-icon"><BookOpen size={24} /></div><h3>Cosmic Quiz</h3><p>Проверь, что запомнилось, и узнай объяснения к правильным ответам.</p></article>
                </div>
              </section>
            </motion.main>
          )}

          {page === "journey" && (
            <motion.main className="lf-journey" key="journey" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="lf-topline">
                <div><div className="lf-eyebrow">МАРШРУТ ПО МЛЕЧНОМУ ПУТИ</div><h1 className="lf-section-title" style={{ fontSize: "clamp(26px,4vw,38px)", marginTop: 12 }}>COSMIC JOURNEY</h1><p className="lf-muted" style={{ maxWidth: 650, marginBottom: 0 }}>Выбери точку на схеме, чтобы открыть научную справку. Все положения на карте условные и не передают реальные координаты или масштаб.</p></div>
                <button className="lf-btn secondary" onClick={() => setPage("home")}><ArrowLeft size={16} /> На главную</button>
              </div>
              <div className="lf-map-layout">
                <div className="lf-map" aria-label="Условная карта космических объектов">
                  <div className="lf-starfield" /><div className="lf-galaxy" />
                  <div className="lf-map-label">MILKY WAY · SCHEMATIC VIEW</div>
                  {[
                    { id: "solar", x: "52%", y: "49%", label: "Солнечная система" },
                    { id: "proxima", x: "40%", y: "60%", label: "Proxima b" },
                    { id: "trappist", x: "70%", y: "35%", label: "TRAPPIST-1" },
                    { id: "kepler", x: "24%", y: "36%", label: "Kepler-186f" },
                    { id: "galactic", x: "79%", y: "70%", label: "Центр галактики" }
                  ].map((point) => (
                    <button key={point.id} className={`lf-map-point ${selectedId === point.id ? "selected" : ""}`} style={{ left: point.x, top: point.y }} onClick={() => setSelectedId(point.id)} aria-label={`Выбрать ${point.label}`}>
                      <span className="lf-point-core" /><span className="lf-point-name">{point.label}</span>
                    </button>
                  ))}
                  <div className="lf-map-note">СХЕМА НЕ В МАСШТАБЕ · Позиции точек иллюстративные. Расстояния приведены в карточках по данным NASA.</div>
                </div>
                <aside className="lf-detail">
                  <div className="lf-tag">{selected.category}</div>
                  <h2>{selected.name}</h2>
                  <div className="lf-distance">{selected.distance}</div>
                  <div className="lf-distance-note">{selected.distanceNote}</div>
                  <div className="lf-rule" />
                  <div className="lf-tag">КЛАСС ОБЪЕКТА</div>
                  <p style={{ marginTop: 7 }}>{selected.type}</p>
                  <div className="lf-tag">ОБЪЕКТ В ФОКУСЕ</div>
                  <p style={{ marginTop: 7 }}>{selected.description}</p>
                  <div className="lf-tag">НАУЧНЫЕ ФАКТЫ</div>
                  <ul className="lf-facts">{selected.facts.map((fact, index) => <li key={index}>{fact}</li>)}</ul>
                  <a className="lf-source" href={selected.url} target="_blank" rel="noreferrer">{selected.source} <ExternalLink size={13} /></a>
                </aside>
              </div>
            </motion.main>
          )}

          {page === "quiz" && (
            <motion.main className="lf-quiz-wrap" key="quiz" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="lf-eyebrow">ПРОВЕРЬ СВОИ ЗНАНИЯ</div>
              <h1 className="lf-section-title" style={{ fontSize: "clamp(28px,5vw,42px)", marginTop: 12 }}>COSMIC QUIZ</h1>
              <p className="lf-muted">Пять вопросов о звёздах, экзопланетах и нашей галактике.</p>
              <div className="lf-quiz-card">
                {!quizFinished ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#9da4c1", fontSize: 12 }}><span>ВОПРОС {questionIndex + 1} ИЗ {quizQuestions.length}</span><span>{Object.keys(answers).length} / {quizQuestions.length} отвечено</span></div>
                    <div className="lf-progress"><span style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }} /></div>
                    <h2 className="lf-question">{quizQuestions[questionIndex].question}</h2>
                    {quizQuestions[questionIndex].answers.map((answer, index) => {
                      const selectedAnswer = answers[questionIndex];
                      const correct = quizQuestions[questionIndex].correct === index;
                      let className = "lf-answer";
                      if (selectedAnswer !== undefined && correct) className += " correct";
                      else if (selectedAnswer === index && !correct) className += " wrong";
                      return <button key={answer} className={className} disabled={selectedAnswer !== undefined} onClick={() => chooseAnswer(index)}>{answer}</button>;
                    })}
                    {answers[questionIndex] !== undefined && (
                      <>
                        <div className="lf-explain"><strong>{answers[questionIndex] === quizQuestions[questionIndex].correct ? "Верно!" : "Почти!"}</strong> {quizQuestions[questionIndex].explanation}</div>
                        <button className="lf-btn" style={{ marginTop: 18 }} onClick={nextQuestion}>{questionIndex === quizQuestions.length - 1 ? "Результат" : "Следующий вопрос"} <ChevronRight size={17} /></button>
                      </>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "18px 0" }}>
                    <CheckCircle2 size={42} color="#8fdfc2" />
                    <div className="lf-eyebrow" style={{ marginTop: 18 }}>ТЕСТ ЗАВЕРШЁН</div>
                    <h2 style={{ font: "600 34px Orbitron,sans-serif", margin: "12px 0" }}>{score} / {quizQuestions.length}</h2>
                    <p className="lf-muted">Правильных ответов: {score} из {quizQuestions.length}. Продолжай исследовать космос!</p>
                    <button className="lf-btn" onClick={restartQuiz}><RotateCcw size={16} /> Пройти ещё раз</button>
                  </div>
                )}
              </div>
              <button className="lf-ghost" style={{ marginTop: 15 }} onClick={() => setPage("home")}><ArrowLeft size={15} style={{ verticalAlign: "middle", marginRight: 6 }} />На главную</button>
            </motion.main>
          )}
        </AnimatePresence>

        <footer className="lf-footer">
          <span>© LIFE FINDER NEXT · EDUCATIONAL SPACE PROJECT</span>
          <span>Научные сведения: NASA / NASA Exoplanet Catalog</span>
        </footer>
      </div>
    </div>
  );
}
