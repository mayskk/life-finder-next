
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
  Stars,
  Radar
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
      {Array.from({ length: 65 }).map((_, index) => (
        <span
          className="particle"
          key={index}
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 61) % 100}%`,
            animationDelay: `${(index % 8) * -0.7}s`,
            animationDuration: `${5 + (index % 6)}s`,
            "--size": `${2 + (index % 3)}px`
          }}
        />
      ))}
    </div>
  );
}

function CosmicMeteors() {
  return (
    <div className="cosmic-meteors" aria-hidden="true">
      <span className="cosmic-meteor meteor-one" />
      <span className="cosmic-meteor meteor-two" />
      <span className="cosmic-meteor meteor-three" />
    </div>
  );
}

function Planet() {
  return (
    <div className="planet-scene-v3" aria-hidden="true">
      <div className="planet-orbit-v3 orbit-outer-v3" />
      <div className="planet-orbit-v3 orbit-inner-v3" />

      <div className="planet-ring-v3 planet-ring-back-v3" />

      <div className="planet-body-v3">
        <div className="planet-atmosphere-v3" />
        <div className="planet-clouds-v3" />
        <div className="planet-surface-v3" />
        <div className="planet-light-v3" />
        <div className="planet-shadow-v3" />
      </div>

      <div className="planet-ring-v3 planet-ring-front-v3" />

      <div className="planet-orbit-dot-v3 orbit-dot-one-v3" />
      <div className="planet-orbit-dot-v3 orbit-dot-two-v3" />
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
          <span className="dashboard-overline">THE UNIVERSE IN NUMBERS</span>
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
    note:
      "Условия на поверхности планеты пока неизвестны."
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

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [planetName, setPlanetName] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setSelectedPlanet(null);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <main className="app">
      <Particles />
      <CosmicMeteors />

      <header className="navbar">
        <div className="brand">
          <Orbit size={27} />
          <span>LIFE FINDER</span>
        </div>

        <nav>
          <button onClick={() => setActiveTab("home")}>Главная</button>
          <button onClick={() => setActiveTab("search")}>Проверка планет</button>
          <button onClick={() => setActiveTab("catalog")}>Каталог</button>
          <button onClick={() => setActiveTab("about")}>О проекте</button>
        </nav>
      </header>

      {activeTab === "home" && (
        <>
          <section className="hero hero-split-v3">
            <div className="hero-layout-v3">
              <div className="hero-planet-side-v3">
                <Planet />
              </div>

              <motion.div
                className="hero-content hero-content-v3"
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
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
                  onClick={() => setActiveTab("search")}
                >
                  <Search size={19} />
                  Исследовать планеты
                </button>

                <div className="hero-stats">
                  <div>
                    <Orbit />
                    <span>Экзопланеты</span>
                  </div>
                  <div>
                    <Database />
                    <span>Данные NASA</span>
                  </div>
                  <div>
                    <Telescope />
                    <span>Исследования</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="hero-decoration hero-decoration-two hero-new-worlds-v3">
              <Satellite size={20} />
              <span>NEW WORLDS</span>
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
                <h2 id="planet-modal-title">{selectedPlanet.name}</h2>

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
