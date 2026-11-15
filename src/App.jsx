
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Telescope,
  Search,
  Orbit,
  Database,
  Sparkles,
  Globe2
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
          return characters[
            Math.floor(Math.random() * characters.length)
          ];
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

function Planet() {
  return (
    <div className="planet-scene" aria-hidden="true">
      <div className="planet-ring" />
      <div className="planet-body">
        <div className="planet-light" />
        <div className="planet-shadow" />
      </div>
    </div>
  );
}

const planets = [
  {
    name: "TRAPPIST-1 e",
    type: "Каменистая экзопланета",
    distance: "Около 40 световых лет",
    description:
      "Одна из интересных планет системы TRAPPIST-1 для исследования потенциальной обитаемости.",
    color: "planet-purple"
  },
  {
    name: "Proxima Centauri b",
    type: "Экзопланета у красного карлика",
    distance: "Около 4,2 светового года",
    description:
      "Известная экзопланета, вращающаяся вокруг ближайшей к Солнцу звезды.",
    color: "planet-blue"
  },
  {
    name: "Kepler-186f",
    type: "Каменистая экзопланета",
    distance: "Около 500 световых лет",
    description:
      "Первая известная планета земного размера, обнаруженная в обитаемой зоне другой звезды.",
    color: "planet-pink"
  }
];

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [planetName, setPlanetName] = useState("");

  return (
    <main className="app">
      <Particles />

      <header className="navbar">
        <div className="brand">
          <Orbit size={27} />
          <span>LIFE FINDER</span>
        </div>

        <nav>
          <button onClick={() => setActiveTab("home")}>
            Главная
          </button>
          <button onClick={() => setActiveTab("search")}>
            Проверка планет
          </button>
          <button onClick={() => setActiveTab("catalog")}>
            Каталог
          </button>
          <button onClick={() => setActiveTab("about")}>
            О проекте
          </button>
        </nav>
      </header>

      {activeTab === "home" && (
        <>
          <section className="hero">
            <Planet />

            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 30 }}
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
          </section>

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
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="planet-card-image">
                    <div className={`card-planet ${planet.color}`}>
                      <div className="card-planet-glow" />
                    </div>
                    <span className="planet-number">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="planet-card-content">
                    <span className="planet-type">
                      {planet.type}
                    </span>

                    <h3>{planet.name}</h3>

                    <p>{planet.description}</p>

                    <div className="planet-distance">
                      <Globe2 size={16} />
                      {planet.distance}
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

      <footer>
        LIFE FINDER · EXPLORE THE UNIVERSE
      </footer>
    </main>
  );
}

export default App;
