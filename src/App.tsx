import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type IconName =
  | "arrow"
  | "arrowUpRight"
  | "call"
  | "chevron"
  | "close"
  | "compass"
  | "menu"
  | "pin"
  | "play"
  | "star"
  | "truck"
  | "utensils";

type MenuCategory = "signature" | "classics" | "drinks";

type MenuItem = {
  name: string;
  detail: string;
  price: string;
  category: MenuCategory;
  image: string;
  tag?: string;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=85";

const menuItems: MenuItem[] = [
  {
    name: "Thiéb au poulet",
    detail: "Riz parfumé au poulet, légumes de saison mijotés",
    price: "12 €",
    category: "signature",
    tag: "Le classique",
    image:
      "https://images.pexels.com/photos/33434014/pexels-photo-33434014.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Thiéb au poisson",
    detail: "Le plat national — riz au poisson en sauce tomate, légumes fondants",
    price: "12 €",
    category: "signature",
    tag: "Tradition",
    image:
      "https://images.pexels.com/photos/20067063/pexels-photo-20067063.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Poisson braisé",
    detail: "Poisson entier grillé, attiéké et condiments frais",
    price: "16 €",
    category: "signature",
    tag: "À partager",
    image:
      "https://images.pexels.com/photos/26587855/pexels-photo-26587855.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Yassa au poulet",
    detail: "Poulet rôti, oignons confits au citron et moutarde douce",
    price: "13 €",
    category: "signature",
    image:
      "https://images.pexels.com/photos/17696671/pexels-photo-17696671.jpeg?auto=compress&cs=tinysrgb&dpr=2&fit=crop&w=1200&h=950",
  },
  {
    name: "Maffé",
    detail: "Sauce onctueuse à l'arachide, riz blanc et légumes",
    price: "13 €",
    category: "classics",
    image:
      "https://images.pexels.com/photos/998244/pexels-photo-998244.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Attiéké",
    detail: "Semoule de manioc, poisson et garniture croquante",
    price: "15 €",
    category: "classics",
    image:
      "https://images.pexels.com/photos/34520964/pexels-photo-34520964.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Saga saga",
    detail: "Feuilles de manioc en sauce, servies avec riz blanc",
    price: "13 €",
    category: "classics",
    image:
      "https://images.pexels.com/photos/36090553/pexels-photo-36090553.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Ganan",
    detail: "Plat traditionnel généreux, recette maison",
    price: "13 €",
    category: "classics",
    image:
      "https://images.pexels.com/photos/36090555/pexels-photo-36090555.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Jus de Bissap",
    detail: "Hibiscus fait maison, servi en bouteille — frais et parfumé",
    price: "4 €",
    category: "drinks",
    tag: "Fait maison",
    image:
      "https://images.pexels.com/photos/34467117/pexels-photo-34467117.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Jus de Gingembre",
    detail: "Gingembre frais pressé, mis en bouteille — tonique et épicé",
    price: "4 €",
    category: "drinks",
    tag: "Fait maison",
    image:
      "https://images.pexels.com/photos/7655906/pexels-photo-7655906.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Jus de Tamarin",
    detail: "Tamarin naturel en bouteille — doux, acidulé, rafraîchissant",
    price: "4 €",
    category: "drinks",
    tag: "Fait maison",
    image:
      "https://images.pexels.com/photos/13300732/pexels-photo-13300732.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Thé Ataya",
    detail: "Le rituel ouest-africain — trois services, à la menthe, préparé devant vous",
    price: "3 €",
    category: "drinks",
    tag: "Le rituel",
    image:
      "https://images.pexels.com/photos/37515893/pexels-photo-37515893.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
];

const sportsImage =
  "https://images.pexels.com/photos/36799150/pexels-photo-36799150.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1250";

const reviews = [
  {
    quote:
      "Vraiment... Une pépite ! Accueil chaleureux, service rapide, cuisine succulente, portions extra.",
    author: "B B",
    source: "Avis Google",
  },
  {
    quote:
      "Excellente cantine africaine traditionnelle dans un cadre tout simple et authentique. Les plats sont délicieux et les portions généreuses.",
    author: "Anne Cuyaubere",
    source: "Avis Google",
  },
  {
    quote:
      "Une des meilleures cantines de cuisine d'Afrique de l'Ouest à Paris ! Excellent rapport qualité-prix.",
    author: "Hakim HAYASHI",
    source: "Avis Google",
  },
];

const heroImage =
  "https://images.pexels.com/photos/20067063/pexels-photo-20067063.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2200&h=1450";

const atmosphereImage =
  "https://images.pexels.com/photos/33434014/pexels-photo-33434014.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1250";

const interiorImage =
  "https://images.pexels.com/photos/36127951/pexels-photo-36127951.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1250";

function Icon({ name, size = 20, strokeWidth = 1.6 }: { name: IconName; size?: number; strokeWidth?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "arrowUpRight":
      return (
        <svg {...common}>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );
    case "call":
      return (
        <svg {...common}>
          <path d="M6.6 3.6 9 3l2 5-2.2 1.6a15 15 0 0 0 5.6 5.6L16 13l5 2 .6 2.4A3 3 0 0 1 18.7 21C10 20.5 3.5 14 3 5.3A3 3 0 0 1 6.6 3.6Z" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m10 8 5 4-5 4V8Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "star":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.7l6.2-.9L12 3Z" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case "utensils":
      return (
        <svg {...common}>
          <path d="M7 3v7M4 3v4a3 3 0 0 0 6 0V3M7 10v11M17 3v18M17 3c2 2 3 5 0 8" />
        </svg>
      );
    default:
      return null;
  }
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#accueil" className={`brand ${light ? "brand-light" : ""}`} aria-label="Diambo Resto, accueil">
      <span className="brand-mark">D</span>
      <span className="brand-copy">
        <strong>DIAMBO</strong>
        <small>RESTO</small>
      </span>
    </a>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return undefined;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return undefined;

    const move = (event: MouseEvent) => {
      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;
      dot.style.transform = `translate3d(${x}, ${y}, 0)`;
      ring.style.transform = `translate3d(${x}, ${y}, 0)`;
    };
    const enter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");
      if (!cursorTarget) return;
      ring.dataset.label = cursorTarget.dataset.cursor || "";
      ring.classList.add("is-active");
    };
    const leave = () => ring.classList.remove("is-active");

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    document.body.classList.add("custom-cursor-ready");

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
      document.body.classList.remove("custom-cursor-ready");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"Tous" | "signature" | "classics" | "drinks">("Tous");
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const filteredMenu = useMemo(
    () => (activeFilter === "Tous" ? menuItems : menuItems.filter((item) => item.category === activeFilter)),
    [activeFilter],
  );

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const handleHeroPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setHeroTilt({ x: Number((y * -5).toFixed(2)), y: Number((x * 6).toFixed(2)) });
  };

  const resetHeroPointer = () => setHeroTilt({ x: 0, y: 0 });

  return (
    <div className="site-shell">
      <CustomCursor />

      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner page-width">
          <Logo light={!scrolled} />

          <nav className="desktop-nav" aria-label="Navigation principale">
            <button onClick={() => scrollTo("accueil")} data-cursor="accueil">Accueil</button>
            <button onClick={() => scrollTo("carte")} data-cursor="menu">La carte</button>
            <button onClick={() => scrollTo("ambiance")} data-cursor="ambiance">L'ambiance</button>
            <button onClick={() => scrollTo("adresse")} data-cursor="adresse">L'adresse</button>
            <button onClick={() => scrollTo("contact")} data-cursor="contact">Contact</button>
          </nav>

          <div className="nav-actions">
            <a className="nav-phone" href="tel:+33980726675" data-cursor="appeler">
              <Icon name="call" size={17} />
              <span>09 80 72 66 75</span>
            </a>
            <button className="nav-menu-button" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu" aria-expanded={menuOpen}>
              <span>Menu</span>
              <Icon name="menu" size={21} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mobile-menu-bg" style={{ backgroundImage: `url(${interiorImage})` }} />
            <div className="mobile-menu-overlay" />
            <div className="mobile-menu-content page-width">
              <div className="mobile-menu-top">
                <Logo light />
                <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Fermer le menu">
                  <Icon name="close" size={25} />
                </button>
              </div>
              <nav className="mobile-links" aria-label="Navigation mobile">
                {[
                  ["Accueil", "accueil"],
                  ["La carte", "carte"],
                  ["L'ambiance", "ambiance"],
                  ["L'adresse", "adresse"],
                  ["Contact", "contact"],
                ].map(([label, id], index) => (
                  <motion.button
                    key={id}
                    onClick={() => scrollTo(id)}
                    initial={{ opacity: 0, x: 35 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.06 }}
                  >
                    <span>0{index + 1}</span>
                    {label}
                    <Icon name="arrowUpRight" size={20} />
                  </motion.button>
                ))}
              </nav>
              <div className="mobile-menu-bottom">
                <a href="tel:+33980726675"><Icon name="call" size={17} /> Appeler le restaurant</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer"><Icon name="pin" size={17} /> Voir l'itinéraire</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section
          id="accueil"
          className="hero-section"
          onPointerMove={handleHeroPointer}
          onPointerLeave={resetHeroPointer}
        >
          <div className="hero-media" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="hero-shade" />
          <div className="hero-grain" />
          <div className="hero-lines" aria-hidden="true" />

          <div className="hero-inner page-width">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> Paris 11e <span className="eyebrow-dot" /> Rue Neuve des Boulets</div>
              <h1>
                <span className="hero-title-small">Les saveurs de</span>
                <span className="hero-title-main">l'Afrique</span>
                <span className="hero-title-script">de l'Ouest</span>
              </h1>
              <p className="hero-lead">Une table généreuse, authentique et vivante au coeur du 11e.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => scrollTo("carte")} data-cursor="découvrir">
                  <span>Découvrir la carte</span><Icon name="arrow" size={18} />
                </button>
                <a className="button button-ghost" href="https://diamboresto.fr" target="_blank" rel="noreferrer" data-cursor="commander">
                  Commander en ligne <Icon name="arrowUpRight" size={18} />
                </a>
              </div>
              <div className="hero-note"><span className="hero-note-stars">★★★★★</span> 4,4/5 sur Google <span className="hero-note-separator" /> 116 avis</div>
            </motion.div>

            <motion.div
              className="hero-object-wrap"
              style={{ transform: `perspective(1200px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)` }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.82, rotate: -8 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <motion.div className="hero-plate" animate={reduceMotion ? undefined : { y: [0, -10, 0], rotateZ: [0, 2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
                <div className="plate-rim" />
                <div className="plate-food" style={{ backgroundImage: `url(${heroImage})` }} />
                <div className="plate-shine" />
              </motion.div>
              <span className="steam steam-one" />
              <span className="steam steam-two" />
              <span className="steam steam-three" />
              <div className="object-caption"><span>DIAMBO</span><i /> <span>PARIS 11</span></div>
            </motion.div>
          </div>

          <div className="hero-bottom page-width">
            <div className="hero-location"><Icon name="pin" size={16} /> 28 Rue Neuve des Boulets, 75011 Paris</div>
            <button className="scroll-cue" onClick={() => scrollTo("adresse")} data-cursor="explorer"><span>Scroll pour explorer</span><span className="scroll-line" /></button>
            <div className="hero-status"><span className="status-pulse" /> Ouvert aujourd'hui <span>•</span> jusqu'à 02:00</div>
          </div>
        </section>

        <section className="manifesto-strip" aria-label="Services">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div className="marquee-group" key={group} aria-hidden={group === 1}>
                <span>Cuisine d'Afrique de l'Ouest</span><i />
                <span>Jus faits maison</span><i />
                <span>Thé Ataya</span><i />
                <span>Matchs en direct</span><i />
                <span>Sur place</span><i />
                <span>À emporter</span><i />
                <span>Livraison</span><i />
                <span>Paris 11e</span><i />
              </div>
            ))}
          </div>
        </section>

        <section id="adresse" className="story-section section-cream">
          <div className="page-width story-grid">
            <Reveal className="story-visual">
              <div className="visual-frame">
                <img src={atmosphereImage} alt="Plat généreux de riz épicé et de poulet servi à table" loading="lazy" onError={(event) => { event.currentTarget.src = fallbackImage; }} />
                <div className="visual-stamp"><span>01</span><span>FAMILLE</span></div>
                <div className="visual-caption">Comme à la maison</div>
              </div>
              <div className="visual-orb orb-a" />
              <div className="visual-orb orb-b" />
            </Reveal>
            <Reveal className="story-copy" delay={0.1}>
              <div className="eyebrow"><span className="eyebrow-line" /> L'adresse</div>
              <h2>Ici, on est en <em>famille.</em></h2>
              <p>Chez Diambo, on ne vient pas juste manger — on vient retrouver l'ambiance d'une grande famille. On s'installe, on discute, on partage un plat, on regarde le match ensemble sur grand écran. C'est convivial, chaleureux, vivant.</p>
              <p>Les habitués le savent : entre le thé Ataya servi dans les règles de l'art, les jus de bissap, gingembre et tamarin faits maison en bouteille, et les plats généreux qui sentent bon l'Afrique de l'Ouest, on se sent chez soi.</p>
              <div className="story-signature">Bienvenue dans la famille <span>✦</span></div>
              <div className="story-actions">
                <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer" data-cursor="itinéraire"><span>Voir l'itinéraire</span><Icon name="arrowUpRight" size={18} /></a>
                <span className="story-address"><Icon name="pin" size={16} /> 28 Rue Neuve des Boulets</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="carte" className="menu-section section-ivory">
          <div className="page-width">
            <Reveal className="section-heading menu-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> La carte</div>
                <h2>Les incontournables<br /><em>de la maison.</em></h2>
              </div>
              <div className="menu-intro"><p>Une sélection de spécialités ouest-africaines, choisies pour leur caractère et leur générosité.</p><a href="https://diamboresto.fr" target="_blank" rel="noreferrer" className="text-link" data-cursor="voir la carte">Carte complète <Icon name="arrowUpRight" size={18} /></a></div>
            </Reveal>

            <div className="menu-toolbar" role="tablist" aria-label="Filtrer la carte">
              {[['Tous', 'Tous'], ['Signatures', 'signature'], ['Classiques', 'classics'], ['Boissons', 'drinks']].map(([label, value]) => (
                <button key={value} className={activeFilter === value ? "is-active" : ""} onClick={() => setActiveFilter(value as typeof activeFilter)} role="tab" aria-selected={activeFilter === value}>{label}</button>
              ))}
              <span className="menu-count">{filteredMenu.length.toString().padStart(2, "0")} propositions</span>
            </div>

            <div className="menu-grid">
              {filteredMenu.map((item, index) => (
                <motion.article className="menu-item" key={item.name} layout initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.06 }} data-cursor="goûter">
                  <div className="menu-image-wrap">
                    <img src={item.image} alt={item.name} loading="lazy" onError={(event) => { event.currentTarget.src = fallbackImage; }} />
                    {item.tag && <span className="menu-tag">{item.tag}</span>}
                    <div className="menu-image-overlay"><span>Découvrir</span><Icon name="arrowUpRight" size={18} /></div>
                  </div>
                  <div className="menu-item-info">
                    <div><h3>{item.name}</h3><p>{item.detail}</p></div>
                    <strong>{item.price}</strong>
                  </div>
                </motion.article>
              ))}
            </div>

            <Reveal className="menu-footer">
              <p>Les tarifs et disponibilités peuvent évoluer. Consultez la carte actuelle sur notre site ou les plateformes de commande.</p>
              <div className="order-links">
                <a href="https://www.ubereats.com/fr/store/diambo-resto/vQN5B1ZFSK6dT9vy7j52Vw" target="_blank" rel="noreferrer" data-cursor="Uber Eats">Uber Eats <Icon name="arrowUpRight" size={16} /></a>
                <a href="https://deliveroo.fr/fr/menu/paris/11eme-nation/diambo-resto" target="_blank" rel="noreferrer" data-cursor="Deliveroo">Deliveroo <Icon name="arrowUpRight" size={16} /></a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="image-interlude" style={{ backgroundImage: `url(${interiorImage})` }}>
          <div className="image-interlude-shade" />
          <div className="page-width image-interlude-content">
            <Reveal>
              <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> L'expérience</div>
              <h2>Simple dans la forme.<br /><em>Profond dans le goût.</em></h2>
              <a href="tel:+33980726675" className="button button-outline-light" data-cursor="appeler"><Icon name="call" size={17} /> Appeler le restaurant</a>
            </Reveal>
          </div>
          <div className="interlude-note">Une adresse de quartier <span>✦</span> Paris 11</div>
        </section>

        <section id="ambiance" className="ambiance-section section-ivory">
          <div className="page-width">
            <Reveal className="ambiance-header">
              <div className="eyebrow"><span className="eyebrow-line" /> L'ambiance</div>
              <h2>Plus qu'un restaurant.<br /><em>Un lieu de vie.</em></h2>
            </Reveal>
            <div className="ambiance-grid">
              <Reveal className="ambiance-card ambiance-card-large" delay={0.05}>
                <div className="ambiance-card-image">
                  <img src={sportsImage} alt="Ambiance conviviale pour regarder les matchs de football" loading="lazy" onError={(event) => { event.currentTarget.src = fallbackImage; }} />
                  <div className="ambiance-card-overlay">
                    <span className="ambiance-card-icon">⚽</span>
                    <h3>Les matchs sur grand écran</h3>
                    <p>On s'installe, on commande, et on vit le match ensemble. L'écran est grand, l'ambiance est chaude, les réactions sont collectives. Ici, chaque but se fête en famille.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal className="ambiance-card" delay={0.12}>
                <div className="ambiance-card-image ambiance-card-dark">
                  <img src="https://images.pexels.com/photos/37515893/pexels-photo-37515893.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=700" alt="Thé Ataya servi à la menthe" loading="lazy" onError={(event) => { event.currentTarget.src = fallbackImage; }} />
                  <div className="ambiance-card-overlay">
                    <span className="ambiance-card-icon">🍵</span>
                    <h3>Le rituel de l'Ataya</h3>
                    <p>Trois services de thé à la menthe, préparés selon la tradition. On prend le temps, on discute, on savoure. Le thé Ataya, c'est bien plus qu'une boisson — c'est un moment.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal className="ambiance-card" delay={0.18}>
                <div className="ambiance-card-image ambiance-card-dark">
                  <img src="https://images.pexels.com/photos/34467117/pexels-photo-34467117.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=700" alt="Jus de bissap fait maison en bouteille" loading="lazy" onError={(event) => { event.currentTarget.src = fallbackImage; }} />
                  <div className="ambiance-card-overlay">
                    <span className="ambiance-card-icon">🍹</span>
                    <h3>Nos jus faits maison</h3>
                    <p>Bissap, gingembre, tamarin — tous préparés ici et mis en bouteille. Des recettes authentiques, des saveurs vraies, à emporter ou à boire sur place.</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal className="ambiance-bottom" delay={0.1}>
              <div className="ambiance-tags">
                <span>🏠 Comme à la maison</span>
                <span>⚽ Matchs en direct</span>
                <span>🍵 Thé Ataya</span>
                <span>🍹 Jus en bouteille</span>
                <span>👨‍👩‍👧‍👦 Familial</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="reviews-section section-cream">
          <div className="page-width">
            <Reveal className="reviews-topline">
              <div className="eyebrow"><span className="eyebrow-line" /> Ils en parlent</div>
              <div className="rating-lockup"><div className="rating-score">4,4</div><div><div className="stars">★★★★★</div><span>Google · 116 avis</span></div></div>
            </Reveal>
            <Reveal className="reviews-title" delay={0.08}><h2>Une cuisine qui<br /><em>laisse une trace.</em></h2><p>Les mots de celles et ceux qui sont venus partager la table.</p></Reveal>
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <Reveal key={review.author} delay={index * 0.08} className={`review-item review-${index + 1}`}>
                  <div className="quote-mark">“</div>
                  <blockquote>{review.quote}</blockquote>
                  <div className="review-author"><span>{review.author}</span><small>{review.source}</small></div>
                </Reveal>
              ))}
            </div>
            <Reveal className="reviews-cta"><a href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer" className="text-link" data-cursor="avis"><span>Voir les 116 avis Google</span><Icon name="arrowUpRight" size={18} /></a></Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section section-terracotta">
          <div className="page-width contact-grid">
            <Reveal className="contact-copy">
              <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> Venir chez nous</div>
              <h2>Le meilleur moyen de nous trouver ? <em>Venir.</em></h2>
              <p>Une adresse simple à retenir, au coeur du 11e. Prenez place, emportez votre plat ou faites-vous livrer.</p>
              <div className="contact-actions"><a className="button button-cream" href="tel:+33980726675"><Icon name="call" size={18} /> Appeler</a><a className="button button-outline-light" href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer"><Icon name="compass" size={18} /> Itinéraire</a></div>
            </Reveal>
            <Reveal className="contact-details" delay={0.12}>
              <div className="contact-detail"><span className="contact-icon"><Icon name="pin" size={20} /></span><div><small>Adresse</small><strong>28 Rue Neuve des Boulets<br />75011 Paris</strong></div></div>
              <div className="contact-detail"><span className="contact-icon"><Icon name="call" size={20} /></span><div><small>Téléphone</small><strong>09 80 72 66 75</strong></div></div>
              <div className="contact-detail"><span className="contact-icon"><Icon name="utensils" size={20} /></span><div><small>Services</small><strong>Sur place · À emporter<br />Livraison · Sport à l'écran</strong></div></div>
              <div className="contact-hours"><span className="status-pulse" /> Ouvert aujourd'hui <strong>jusqu'à 02:00</strong></div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-top">
          <div className="footer-brand"><Logo light /><p>Les saveurs de l'Afrique de l'Ouest<br />au coeur du 11e arrondissement.</p></div>
          <div className="footer-links"><div><small>Navigation</small><a href="#accueil">Accueil</a><a href="#carte">La carte</a><a href="#adresse">L'adresse</a></div><div><small>Commander</small><a href="https://diamboresto.fr" target="_blank" rel="noreferrer">Site web</a><a href="https://www.ubereats.com/fr/store/diambo-resto/vQN5B1ZFSK6dT9vy7j52Vw" target="_blank" rel="noreferrer">Uber Eats</a><a href="https://deliveroo.fr/fr/menu/paris/11eme-nation/diambo-resto" target="_blank" rel="noreferrer">Deliveroo</a></div><div><small>Contact</small><a href="tel:+33980726675">09 80 72 66 75</a><a href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer">Itinéraire</a><span>Paris 11e</span></div></div>
        </div>
        <div className="page-width footer-bottom"><span>© 2025 DIAMBO RESTO</span><span>Une table, un quartier, une histoire.</span><a href="#accueil">Retour en haut <Icon name="arrow" size={15} /></a></div>
      </footer>

      <div className="floating-actions">
        <a href="tel:+33980726675" aria-label="Appeler Diambo Resto"><Icon name="call" size={20} /></a>
        <a href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer" aria-label="Itinéraire vers Diambo Resto"><Icon name="pin" size={20} /></a>
      </div>

      <div className="mobile-bottom-bar"><a href="tel:+33980726675"><Icon name="call" size={17} /> Appeler</a><a href="https://diamboresto.fr" target="_blank" rel="noreferrer"><Icon name="utensils" size={17} /> Commander</a></div>
    </div>
  );
}

export default App;