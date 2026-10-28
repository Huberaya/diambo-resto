import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type IconName =
  | "arrow"
  | "arrowUpRight"
  | "call"
  | "chevron"
  | "close"
  | "compass"
  | "facebook"
  | "globe"
  | "instagram"
  | "menu"
  | "pin"
  | "play"
  | "star"
  | "tiktok"
  | "truck"
  | "utensils"
  | "youtube";

type SocialKey = "instagram" | "facebook" | "youtube" | "tiktok";

type SocialLink = {
  name: string;
  handle: string;
  url: string;
  icon: SocialKey;
};

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
    price: "10 €",
    category: "signature",
    tag: "Le classique",
    image:
      "https://images.pexels.com/photos/33434014/pexels-photo-33434014.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Thiéb au poisson",
    detail: "Dans l'esprit du thiéboudienne — riz au poisson en sauce tomate, légumes fondants",
    price: "10 €",
    category: "signature",
    tag: "Tradition",
    image:
      "https://images.pexels.com/photos/20067063/pexels-photo-20067063.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Poisson braisé",
    detail: "Poisson entier grillé, attiéké et condiments frais",
    price: "10 €",
    category: "signature",
    tag: "À partager",
    image:
      "https://images.pexels.com/photos/26587855/pexels-photo-26587855.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Yassa au poulet",
    detail: "Poulet rôti, oignons confits au citron et moutarde douce",
    price: "9 €",
    category: "signature",
    image:
      "https://images.pexels.com/photos/17696671/pexels-photo-17696671.jpeg?auto=compress&cs=tinysrgb&dpr=2&fit=crop&w=1200&h=950",
  },
  {
    name: "Maffé",
    detail: "Sauce onctueuse à l'arachide, riz blanc et légumes",
    price: "9 €",
    category: "classics",
    image:
      "https://images.pexels.com/photos/998244/pexels-photo-998244.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Poisson braisé + attiéké + alloco",
    detail: "Poisson grillé, semoule de manioc et alloco doré",
    price: "12 €",
    category: "classics",
    image:
      "https://images.pexels.com/photos/34520964/pexels-photo-34520964.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Saga saga",
    detail: "Feuilles de manioc en sauce, servies avec riz blanc",
    price: "9 €",
    category: "classics",
    image:
      "https://images.pexels.com/photos/36090553/pexels-photo-36090553.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Ganna",
    detail: "Plat traditionnel généreux, recette maison",
    price: "9 €",
    category: "classics",
    image:
      "https://images.pexels.com/photos/36090555/pexels-photo-36090555.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Jus de Bissap",
    detail: "Hibiscus fait maison, servi en bouteille — frais et parfumé",
    price: "2,50 €",
    category: "drinks",
    tag: "Fait maison",
    image:
      "https://images.pexels.com/photos/34467117/pexels-photo-34467117.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Jus de Gingembre",
    detail: "Gingembre frais pressé, mis en bouteille — tonique et épicé",
    price: "2,50 €",
    category: "drinks",
    tag: "Fait maison",
    image:
      "https://images.pexels.com/photos/7655906/pexels-photo-7655906.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Jus de Tamarin",
    detail: "Tamarin naturel en bouteille — doux, acidulé, rafraîchissant",
    price: "2,50 €",
    category: "drinks",
    tag: "Fait maison",
    image:
      "https://images.pexels.com/photos/13300732/pexels-photo-13300732.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=950",
  },
  {
    name: "Thé Hatayé",
    detail: "Le rituel ouest-africain — trois services, à la menthe, préparé devant vous",
    price: "2,50 €",
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

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    handle: "@diamboresto",
    url: "https://www.instagram.com/diamboresto/",
    icon: "instagram",
  },
  {
    name: "Facebook",
    handle: "Diambo Resto",
    url: "https://www.facebook.com/profile.php?id=61593814721796",
    icon: "facebook",
  },
  {
    name: "YouTube",
    handle: "@diamboresto",
    url: "https://www.youtube.com/@diamboresto",
    icon: "youtube",
  },
  {
    name: "TikTok",
    handle: "@diamboresto",
    url: "https://www.tiktok.com/@diamboresto",
    icon: "tiktok",
  },
];

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
    case "instagram":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    default:
      return null;
  }
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#accueil" className={`brand ${light ? "brand-light" : ""}`} aria-label="Diambo Resto, accueil">
      <img className="brand-mark" src="/logo-mark.jpg" alt="" width={42} height={42} />
      <span className="brand-copy">
        <strong>DIAMBO</strong>
        <small>RESTO</small>
      </span>
    </a>
  );
}

function Reveal({ children, className = "", delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      id={id}
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

  // Deep-link (QR code, ancres) : scrolle vers la section demandée une fois la page rendue
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tryScroll = () => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      } else if (attempts < 30) {
        attempts += 1;
        timer = setTimeout(tryScroll, 100);
      }
    };
    const raf = requestAnimationFrame(tryScroll);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [reduceMotion]);

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
              <div className="mobile-menu-social">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noreferrer" aria-label={`Diambo Resto sur ${social.name}`}>
                    <Icon name={social.icon} size={17} />
                  </a>
                ))}
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
              <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> Paris 11e <span className="eyebrow-dot" /> Nation <span className="eyebrow-dot" /> Rue Neuve des Boulets</div>
              <h1>
                <span className="hero-title-small">Diambo Resto — saveurs de</span>
                <span className="hero-title-main">l'Afrique</span>
                <span className="hero-title-script">de l'Ouest</span>
              </h1>
              <p className="hero-lead">Cuisine d'Afrique de l'Ouest à Paris 11e, près de Nation — généreuse, authentique et vivante.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => scrollTo("carte")} data-cursor="découvrir">
                  <span>Découvrir la carte</span><Icon name="arrow" size={18} />
                </button>
                <button className="button button-ghost" onClick={() => scrollTo("commander")} data-cursor="commander">
                  Commander en ligne <Icon name="arrow" size={18} />
                </button>
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
            <div className="hero-status"><span className="status-pulse" /> Tous les jours <span>•</span> 08:00 — 02:00</div>
          </div>
        </section>

        <section className="manifesto-strip" aria-label="Services">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div className="marquee-group" key={group} aria-hidden={group === 1}>
                <span>Cuisine d'Afrique de l'Ouest</span><i />
                <span>Jus faits maison</span><i />
                <span>Thé Hatayé</span><i />
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
              <p>Chez Diambo, au 28 Rue Neuve des Boulets près de Nation, on ne vient pas juste manger — on vient retrouver l'ambiance d'une grande famille. On s'installe, on discute, on partage un plat, on regarde le match ensemble sur grand écran. C'est convivial, chaleureux, vivant.</p>
              <p>Les habitués le savent : entre le thé Hatayé servi dans les règles de l'art, les jus de bissap, gingembre et tamarin faits maison en bouteille, et les plats généreux qui sentent bon l'Afrique de l'Ouest, on se sent chez soi.</p>
              <div className="story-signature">Bienvenue dans la famille <span>✦</span></div>
              <div className="story-actions">
                <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer" data-cursor="itinéraire"><span>Voir l'itinéraire</span><Icon name="arrowUpRight" size={18} /></a>
                <span className="story-address"><Icon name="pin" size={16} /> 28 Rue Neuve des Boulets, Paris 11e</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="carte" className="menu-section section-ivory">
          <div className="page-width">
            <Reveal className="section-heading menu-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> La carte</div>
                <h2>Nos spécialités<br /><em>ouest-africaines.</em></h2>
              </div>
              <div className="menu-intro"><p>Thiéb, yassa, maffé et poisson braisé : nos spécialités ouest-africaines, généreuses comme à la maison.</p><a href="/menu.html" className="text-link" data-cursor="voir la carte">Carte complète <Icon name="arrowUpRight" size={18} /></a></div>
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
                    <img src={item.image} alt={`${item.name} — ${item.detail} (Diambo Resto, Paris 11e)`} loading="lazy" onError={(event) => { event.currentTarget.src = fallbackImage; }} />
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

            <Reveal className="menu-footer" id="commander">
              <p><strong>Commander en ligne :</strong> choisissez votre plateforme. Les tarifs et disponibilités peuvent évoluer.</p>
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
                  <img src="https://images.pexels.com/photos/37515893/pexels-photo-37515893.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=700" alt="Thé Hatayé servi à la menthe" loading="lazy" onError={(event) => { event.currentTarget.src = fallbackImage; }} />
                  <div className="ambiance-card-overlay">
                    <span className="ambiance-card-icon">🍵</span>
                    <h3>Le rituel du Hatayé</h3>
                    <p>Trois services de thé à la menthe, préparés selon la tradition. On prend le temps, on discute, on savoure. Le thé Hatayé, c'est bien plus qu'une boisson — c'est un moment.</p>
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
                <span>🍵 Thé Hatayé</span>
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
            <Reveal className="reviews-cta"><a href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer" className="text-link" data-cursor="avis"><span>Voir les 116 avis Google</span><Icon name="arrowUpRight" size={18} /></a><a href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer" className="text-link" data-cursor="avis"><span>Laisser un avis Google</span><Icon name="arrowUpRight" size={18} /></a></Reveal>
          </div>
        </section>

        <section id="reseaux" className="social-section section-cream">
          <div className="page-width">
            <Reveal className="social-header">
              <div className="eyebrow"><span className="eyebrow-line" /> Réseaux sociaux</div>
              <h2>La famille Diambo,<br /><em>partout avec vous.</em></h2>
              <p>Plats du jour, coulisses, matchs et bons moments — suivez toute l'actualité du restaurant sur nos réseaux.</p>
            </Reveal>
            <div className="social-grid">
              {socialLinks.map((social, index) => (
                <Reveal key={social.name} delay={index * 0.07} className="social-cell">
                  <a className={`social-card social-${social.icon}`} href={social.url} target="_blank" rel="noreferrer" data-cursor="suivre">
                    <span className="social-card-icon"><Icon name={social.icon} size={22} /></span>
                    <span className="social-card-copy">
                      <strong>{social.name}</strong>
                      <small>{social.handle}</small>
                    </span>
                    <Icon name="arrowUpRight" size={18} />
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal className="social-web" delay={0.26}>
              <a className="social-web-card" href="#commander" data-cursor="commander">
                <span className="social-card-icon"><Icon name="utensils" size={22} /></span>
                <span className="social-web-copy">
                  <strong>Commander en ligne</strong>
                  <small>Uber Eats ou Deliveroo — choisissez votre plateforme</small>
                </span>
                <Icon name="arrowUpRight" size={18} />
              </a>
            </Reveal>
            <Reveal className="social-note" delay={0.12}>
              <p>Un QR code est également affiché en salle : scannez-le pour rejoindre la communauté en un geste.</p>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="faq-section section-ivory">
          <div className="page-width">
            <Reveal className="faq-header">
              <div className="eyebrow"><span className="eyebrow-line" /> Questions fréquentes</div>
              <h2>Avant de venir,<br /><em>on vous dit tout.</em></h2>
              <p>Adresse, horaires, plats signatures, prix et livraison : les réponses aux questions que l'on nous pose le plus souvent.</p>
            </Reveal>
            <div className="faq-grid">
              <Reveal className="faq-item">
                <h3>Où se trouve Diambo Resto à Paris 11e ?</h3>
                <p>Diambo Resto est situé au 28 Rue Neuve des Boulets, 75011 Paris, à deux pas de la station Rue des Boulets (métro ligne 9) et à quelques minutes à pied de la place de la Nation (lignes 1, 2, 6, 9 et RER A).</p>
              </Reveal>
              <Reveal className="faq-item" delay={0.06}>
                <h3>Quels sont les horaires d'ouverture de Diambo Resto ?</h3>
                <p>Le restaurant est ouvert tous les jours de 08:00 à 02:00, du petit matin jusqu'au bout de la nuit.</p>
              </Reveal>
              <Reveal className="faq-item" delay={0.12}>
                <h3>Quels plats d'Afrique de l'Ouest peut-on déguster chez Diambo Resto ?</h3>
                <p>Thiéb au poulet ou au poisson (dans l'esprit du thiéboudienne), yassa poulet, maffé, poisson braisé avec attiéké et alloco, saga-saga et ganna — sans oublier les jus faits maison (bissap, gingembre, tamarin, baobab), les desserts au mil (sombi, fondé, dégué) et le thé Hatayé.</p>
              </Reveal>
              <Reveal className="faq-item">
                <h3>Quels sont les prix chez Diambo Resto ?</h3>
                <p>Les plats sont entre 9 € et 12 €, les entrées dès 3 € et les jus maison dès 1,50 €. Retrouvez la <a href="/menu.html">carte complète avec les prix</a> en ligne.</p>
              </Reveal>
              <Reveal className="faq-item" delay={0.06}>
                <h3>Peut-on commander à emporter ou en livraison ?</h3>
                <p>Oui : sur place, à emporter en appelant le <a href="tel:+33980726675">09 80 72 66 75</a>, et en livraison via Uber Eats et Deliveroo.</p>
              </Reveal>
              <Reveal className="faq-item" delay={0.12}>
                <h3>Peut-on regarder les matchs chez Diambo Resto ?</h3>
                <p>Oui, les matchs sont diffusés sur grand écran, dans une ambiance conviviale et familiale.</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-terracotta">
          <div className="page-width contact-grid">
            <Reveal className="contact-copy">
              <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> Venir chez nous</div>
              <h2>Le meilleur moyen de nous trouver ? <em>Venir.</em></h2>
              <p>Au 28 Rue Neuve des Boulets, à deux pas de la station Rue des Boulets (ligne 9) et à quelques minutes de Nation (lignes 1, 2, 6, 9 — RER A). Prenez place, emportez votre plat ou faites-vous livrer.</p>
              <div className="contact-actions"><a className="button button-cream" href="tel:+33980726675"><Icon name="call" size={18} /> Appeler</a><a className="button button-outline-light" href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer"><Icon name="compass" size={18} /> Itinéraire</a></div>
              <div className="contact-social">
                <small>Suivez-nous</small>
                <div className="contact-social-icons">
                  {socialLinks.map((social) => (
                    <a key={social.name} href={social.url} target="_blank" rel="noreferrer" title={social.name} aria-label={`Diambo Resto sur ${social.name}`}>
                      <Icon name={social.icon} size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal className="contact-details" delay={0.12}>
              <div className="contact-detail"><span className="contact-icon"><Icon name="pin" size={20} /></span><div><small>Adresse</small><strong>28 Rue Neuve des Boulets<br />75011 Paris</strong></div></div>
              <div className="contact-detail"><span className="contact-icon"><Icon name="call" size={20} /></span><div><small>Téléphone</small><strong>09 80 72 66 75</strong></div></div>
              <div className="contact-detail"><span className="contact-icon"><Icon name="utensils" size={20} /></span><div><small>Services</small><strong>Sur place · À emporter<br />Livraison · Sport à l'écran</strong></div></div>
              <div className="contact-hours"><span className="status-pulse" /> Horaires <strong>Tous les jours · 08:00 — 02:00</strong></div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-top">
          <div className="footer-brand">
            <a href="#accueil" className="footer-logo" aria-label="Diambo Resto, retour à l'accueil"><img src="/logo.jpg" alt="Logo Diambo Resto — Saveurs de l'Afrique de l'Ouest, restaurant africain à Paris 11e" width={1000} height={972} loading="lazy" /></a>
            <p>Les saveurs de l'Afrique de l'Ouest<br />à Paris 11e, près de Nation.</p>
            <div className="footer-social">
              <small>Suivez-nous</small>
              <div className="footer-social-icons">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noreferrer" title={social.name} aria-label={`Diambo Resto sur ${social.name}`}>
                    <Icon name={social.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-links"><div><small>Navigation</small><a href="#accueil">Accueil</a><a href="#carte">La carte</a><a href="#adresse">L'adresse</a><a href="#faq">Questions fréquentes</a><a href="#reseaux">Réseaux sociaux</a></div><div><small>Commander</small><a href="#commander">Commander en ligne</a><a href="https://www.ubereats.com/fr/store/diambo-resto/vQN5B1ZFSK6dT9vy7j52Vw" target="_blank" rel="noreferrer">Uber Eats</a><a href="https://deliveroo.fr/fr/menu/paris/11eme-nation/diambo-resto" target="_blank" rel="noreferrer">Deliveroo</a></div><div><small>Contact</small><a href="tel:+33980726675">09 80 72 66 75</a><a href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer">Itinéraire</a><span>Paris 11e</span></div></div>
        </div>
        <div className="page-width footer-bottom"><span>© 2025 DIAMBO RESTO</span><span>Une table, un quartier, une histoire.</span><a href="#accueil">Retour en haut <Icon name="arrow" size={15} /></a></div>
      </footer>

      <div className="floating-actions">
        <a href="tel:+33980726675" aria-label="Appeler Diambo Resto"><Icon name="call" size={20} /></a>
        <a href="https://www.google.com/maps/search/?api=1&query=Diambo+Resto+28+Rue+Neuve+des+Boulets+75011+Paris" target="_blank" rel="noreferrer" aria-label="Itinéraire vers Diambo Resto"><Icon name="pin" size={20} /></a>
      </div>

      <div className="mobile-bottom-bar"><a href="tel:+33980726675"><Icon name="call" size={17} /> Appeler</a><a href="#commander"><Icon name="utensils" size={17} /> Commander</a></div>
    </div>
  );
}

export default App;