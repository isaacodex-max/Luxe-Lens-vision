import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Camera, Heart, Sparkles, Building2, Package, Plane, Video,
  Instagram, Facebook, Youtube, Mail, MapPin, Phone, Star, Check,
  ChevronLeft, ChevronRight, Search, X, Menu, ArrowUpRight, Sun, Moon, MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

import hero from "@/assets/hero.jpg";
import p1 from "@/assets/p1-wedding.jpg";
import p2 from "@/assets/p2-portrait.jpg";
import p3 from "@/assets/p3-fashion.jpg";
import p4 from "@/assets/p4-event.jpg";
import p5 from "@/assets/p5-commercial.jpg";
import p6 from "@/assets/p6-lifestyle.jpg";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum Lens — Cinematic Luxury Photography | Lagos" },
      { name: "description", content: "Aurum Lens crafts cinematic luxury photography in Lagos — weddings, fashion, portraits, brand stories and beyond." },
      { property: "og:title", content: "Aurum Lens — Cinematic Luxury Photography" },
      { property: "og:description", content: "Capturing stories beyond the lens. Lagos-based luxury photography." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

// ---------- Data ----------
const NAV = [
  ["Home", "home"], ["Portfolio", "portfolio"], ["Services", "services"],
  ["About", "about"], ["Testimonials", "testimonials"], ["Gallery", "gallery"],
  ["Pricing", "pricing"], ["Blog", "blog"], ["Contact", "contact"],
] as const;

const PORTFOLIO = [
  { src: p1, category: "Weddings", title: "The Adeyemi Vows", h: "tall" },
  { src: p2, category: "Portraits", title: "Gold Standard", h: "tall" },
  { src: p3, category: "Fashion", title: "Smoke & Silk", h: "med" },
  { src: p4, category: "Events", title: "Federal Palace Gala", h: "short" },
  { src: p5, category: "Commercial", title: "Maison Lauchen", h: "tall" },
  { src: p6, category: "Lifestyle", title: "Ikoyi After Dark", h: "med" },
  { src: p1, category: "Weddings", title: "Lekki Sunset", h: "med" },
  { src: p3, category: "Fashion", title: "Editorial 04", h: "tall" },
  { src: p2, category: "Portraits", title: "Studio Noir", h: "short" },
];
const CATEGORIES = ["All", "Weddings", "Portraits", "Fashion", "Events", "Commercial", "Lifestyle"];

const SERVICES = [
  { icon: Heart, title: "Wedding Photography", desc: "Heirloom-grade storytelling for the most cinematic day of your life." },
  { icon: Sparkles, title: "Fashion Editorial", desc: "Vogue-calibre campaigns, lookbooks and runway coverage." },
  { icon: Camera, title: "Portrait Sessions", desc: "Signature lighting that reveals character with quiet authority." },
  { icon: Building2, title: "Corporate & Brand", desc: "Executive portraits, brand films and prestige interiors." },
  { icon: Package, title: "Product Photography", desc: "Tabletop mastery for luxury goods, beauty and fragrance." },
  { icon: Plane, title: "Drone & Aerial", desc: "Sweeping aerial frames across Lagos and West Africa." },
  { icon: Video, title: "Video Production", desc: "Short films, brand stories and wedding cinema in 6K." },
];

const TESTIMONIALS = [
  { name: "Adaeze Okeke", role: "Bride · Banana Island", quote: "Every frame feels like a film still. Aurum Lens didn't document our wedding — they preserved its soul.", img: p2 },
  { name: "Tunde Bakare", role: "Creative Director · Maison Lauchen", quote: "The campaign elevated our brand to a new tier. Precise, restrained, unforgettable.", img: p6 },
  { name: "Nneka Igwe", role: "Editor · LUX Africa", quote: "Their portraits live in the space between editorial and intimate. A rare gift.", img: p3 },
];

const PRICING = [
  { name: "Starter", price: "₦450k", tag: "Half-day session", featured: false,
    features: ["Up to 3 hours coverage", "60 retouched images", "Online private gallery", "One photographer"] },
  { name: "Premium", price: "₦1.2M", tag: "The signature experience", featured: true,
    features: ["Full-day coverage", "200 retouched images", "Two photographers + assistant", "Cinematic 60s reel", "Heirloom print box"] },
  { name: "Luxury", price: "₦3.5M", tag: "Bespoke production", featured: false,
    features: ["Multi-day production", "Unlimited final images", "Lead + 3 photographers", "8-min documentary film", "Concierge + travel included", "Album in Italian leather"] },
];

const POSTS = [
  { title: "The Art of Light: Crafting Portraits at Golden Hour", cat: "Craft", date: "Jun 02, 2026", img: p2 },
  { title: "Inside a Lagos Society Wedding", cat: "Weddings", date: "May 18, 2026", img: p1 },
  { title: "Why Restraint is the New Luxury in Brand Photography", cat: "Brand", date: "Apr 27, 2026", img: p5 },
];

// ---------- Helpers ----------
function useReveal() {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] },
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-primary">
      <span className="h-px w-10 bg-primary/60" />
      {children}
    </div>
  );
}

// ---------- Page ----------
function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1400); return () => clearTimeout(t); }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <Spotlight />
      <Nav />
      <Hero />
      <Stats />
      <Portfolio />
      <Services />
      <About />
      <Testimonials />
      <Gallery />
      <Pricing />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

// ---------- Loading ----------
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="text-3xl md:text-5xl font-display tracking-[0.3em] text-gradient-gold">AURUM</div>
      <div className="mt-6 h-px w-56 overflow-hidden bg-white/10">
        <div className="h-full w-full animate-shimmer" />
      </div>
      <div className="mt-4 text-[10px] tracking-[0.5em] text-muted-foreground">LOADING THE FRAME</div>
    </motion.div>
  );
}

// ---------- Spotlight cursor ----------
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, oklch(0.78 0.13 85 / 0.08), transparent 60%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-[1] hidden md:block" />;
}

// ---------- Nav ----------
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all ${scrolled ? "glass rounded-full mx-4 md:mx-8 px-6" : ""}`}>
        <a href="#home" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-[0.3em] text-gradient-gold">AURUM</span>
          <span className="hidden text-[10px] tracking-[0.4em] text-muted-foreground sm:inline">· LENS</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="group relative text-sm text-foreground/70 transition hover:text-foreground">
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setDark(d => !d)} aria-label="Toggle theme" className="rounded-full p-2 text-foreground/70 hover:text-primary">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#contact" className="hidden rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs tracking-widest uppercase text-primary transition hover:bg-primary hover:text-primary-foreground md:inline-flex">
            Book Session
          </a>
          <button onClick={() => setOpen(true)} className="lg:hidden" aria-label="Menu"><Menu className="h-6 w-6" /></button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <button onClick={() => setOpen(false)} className="absolute right-6 top-6" aria-label="Close"><X className="h-6 w-6" /></button>
            <nav className="flex h-full flex-col items-center justify-center gap-6">
              {NAV.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="font-display text-3xl text-foreground/90 hover:text-primary">{label}</a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={hero} alt="Cinematic editorial portrait" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial-spot)" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }}>
          <SectionLabel>Lagos · Est. 2014</SectionLabel>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 1.2 }}
          className="mt-8 max-w-5xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-[7.5rem]"
        >
          Capturing Stories<br />
          <span className="italic font-light text-gradient-gold">Beyond</span> the Lens
        </motion.h1>
        {/* mirror reflection */}
        <div className="mirror-reflect pointer-events-none -mt-2 hidden max-w-5xl scale-y-[-1] font-display text-5xl leading-[1.02] tracking-tight opacity-20 blur-[1px] md:block md:text-7xl lg:text-[7.5rem]" aria-hidden>
          Capturing Stories<br /><span className="italic font-light">Beyond</span> the Lens
        </div>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 1 }}
          className="mt-8 max-w-xl text-base text-foreground/70 md:text-lg"
        >
          A Lagos-born luxury photography house crafting cinematic frames for weddings, fashion, and modern brand legacies.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 1 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href="#portfolio" className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:shadow-[0_0_40px] hover:shadow-primary/50">
            View Portfolio <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 glass px-8 py-3.5 text-sm uppercase tracking-widest hover:border-primary/60 hover:text-primary transition">
            Book a Session
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.5em] text-foreground/40"
      >
        SCROLL TO DISCOVER ↓
      </motion.div>
    </section>
  );
}

// ---------- Stats ----------
function Stats() {
  const reveal = useReveal();
  const items = [["12+", "Years Behind the Lens"], ["480", "Weddings Documented"], ["27", "International Awards"], ["1.2K", "Clients Across 14 Countries"]];
  return (
    <motion.section {...reveal} className="border-y border-border/40 bg-card/30 py-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {items.map(([n, l]) => (
          <div key={l} className="text-center">
            <div className="font-display text-4xl text-gradient-gold md:text-5xl">{n}</div>
            <div className="mt-2 text-xs tracking-[0.3em] uppercase text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ---------- Portfolio ----------
function Portfolio() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = PORTFOLIO.filter(p => cat === "All" || p.category === cat);
  const reveal = useReveal();

  return (
    <section id="portfolio" className="relative py-32">
      <motion.div {...reveal} className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">The <span className="italic text-gradient-gold">Portfolio</span></h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">A curated archive of cinematic moments — from sacred vows to magazine covers.</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-widest transition ${cat === c ? "bg-primary text-primary-foreground" : "border border-border text-foreground/60 hover:border-primary/60 hover:text-primary"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {filtered.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 6) * 0.07 }}
              onClick={() => setLightbox(i)}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-sm bg-card hover-lift"
            >
              <div className="relative overflow-hidden">
                <img src={p.src} alt={p.title} loading="lazy"
                  className={`w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ${p.h === "tall" ? "aspect-[3/4]" : p.h === "short" ? "aspect-[4/3]" : "aspect-square"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-primary">{p.category}</div>
                  <div className="mt-1 font-display text-xl">{p.title}</div>
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-black/60 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Search className="h-4 w-4 text-primary" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute right-6 top-6 text-foreground/70 hover:text-primary" aria-label="Close"><X className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 hover:text-primary" aria-label="Previous"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 hover:text-primary" aria-label="Next"><ChevronRight /></button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              src={filtered[lightbox].src} alt={filtered[lightbox].title}
              className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <div className="text-[10px] tracking-[0.4em] uppercase text-primary">{filtered[lightbox].category}</div>
              <div className="mt-1 font-display text-2xl">{filtered[lightbox].title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ---------- Services ----------
function Services() {
  const reveal = useReveal();
  return (
    <section id="services" className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96" style={{ background: "var(--gradient-radial-spot)" }} />
      <motion.div {...reveal} className="mx-auto max-w-[1400px] px-6">
        <div className="max-w-2xl">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">A studio without <span className="italic text-gradient-gold">compromise.</span></h2>
          <p className="mt-6 text-foreground/60">From candlelit ceremonies to global ad campaigns, every assignment is treated as a piece of cinema.</p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="group relative bg-card p-10 transition hover:bg-secondary"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              <s.icon className="h-8 w-8 text-primary transition group-hover:scale-110" strokeWidth={1.2} />
              <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary opacity-0 transition group-hover:opacity-100">
                Discover <ArrowUpRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ---------- About ----------
function About() {
  const reveal = useReveal();
  return (
    <section id="about" className="relative bg-card/40 py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div {...reveal} className="relative">
          <div className="relative overflow-hidden rounded-sm">
            <img src={about} alt="Founder portrait" loading="lazy" className="w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-primary/10" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass rounded-sm p-6 hidden md:block">
            <div className="font-display text-3xl text-gradient-gold">12<span className="text-base">+</span></div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Years of craft</div>
          </div>
        </motion.div>

        <motion.div {...reveal}>
          <SectionLabel>The Photographer</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            I don't shoot moments.<br /><span className="italic text-gradient-gold">I author memory.</span>
          </h2>
          <div className="mt-6 space-y-5 text-foreground/70">
            <p>I'm Obi Adesanya — founder of Aurum Lens. For more than a decade I've worked with brides, runway houses, and global brands to translate ephemeral moments into objects worth keeping.</p>
            <p>Based between Lagos and Lisbon, my work has been featured in <em className="text-foreground">Vogue Africa</em>, <em className="text-foreground">Condé Nast Traveler</em>, and <em className="text-foreground">Brides UK</em>.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-4">
            {[["12+", "Years"], ["480", "Projects"], ["27", "Awards"], ["1.2K", "Clients"]].map(([n, l]) => (
              <div key={l} className="bg-card p-5 text-center">
                <div className="font-display text-2xl text-primary">{n}</div>
                <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Testimonials ----------
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % TESTIMONIALS.length), 6000); return () => clearInterval(t); }, []);
  const t = TESTIMONIALS[i];
  return (
    <section id="testimonials" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionLabel>In Their Words</SectionLabel>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">Loved by those we <span className="italic text-gradient-gold">photograph.</span></h2>

        <div className="mt-16 glass rounded-sm p-10 md:p-16">
          <AnimatePresence mode="wait">
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="mt-8 font-display text-2xl leading-snug md:text-3xl italic text-foreground/90">"{t.quote}"</p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <img src={t.img} alt={t.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/40" />
                <div className="text-left">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k+1}`}
                className={`h-1 transition-all ${k === i ? "w-10 bg-primary" : "w-5 bg-border"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Gallery (parallax strip) ----------
function Gallery() {
  const reveal = useReveal();
  return (
    <section id="gallery" className="relative overflow-hidden py-32">
      <motion.div {...reveal} className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">Moments, <span className="italic text-gradient-gold">framed.</span></h2>
          </div>
        </div>
      </motion.div>
      <div className="mt-16 flex gap-5 overflow-x-auto px-6 pb-6 snap-x snap-mandatory">
        {[p3, p1, p5, p2, p6, p4, p3].map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            className="relative shrink-0 snap-start overflow-hidden rounded-sm"
            style={{ width: "min(75vw, 420px)" }}
          >
            <img src={src} alt="" loading="lazy" className="h-[60vh] w-full object-cover transition-transform duration-[2s] hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-4 left-4 font-display text-lg">No. {String(i + 1).padStart(2, "0")}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------- Pricing ----------
function Pricing() {
  const reveal = useReveal();
  return (
    <section id="pricing" className="relative bg-card/30 py-32">
      <motion.div {...reveal} className="mx-auto max-w-[1400px] px-6">
        <div className="text-center">
          <SectionLabel>Investment</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">Choose your <span className="italic text-gradient-gold">experience.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-foreground/60">Three signature tiers. Every package can be tailored — bespoke is our default.</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {PRICING.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-sm border p-10 transition ${p.featured ? "border-primary/60 bg-gradient-to-b from-primary/10 to-transparent shadow-[var(--shadow-gold)]" : "border-border bg-card hover:border-primary/30"}`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] tracking-[0.3em] uppercase text-primary-foreground">Most Loved</div>
              )}
              <div className="text-xs tracking-[0.3em] uppercase text-primary">{p.tag}</div>
              <div className="mt-3 font-display text-3xl">{p.name}</div>
              <div className="mt-6 font-display text-5xl text-gradient-gold">{p.price}</div>
              <div className="mt-2 text-xs text-muted-foreground">starting at</div>
              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
                ))}
              </ul>
              <a href="#contact" className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-widest transition ${p.featured ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:border-primary hover:text-primary"}`}>
                Enquire
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ---------- Blog ----------
function Blog() {
  const [q, setQ] = useState("");
  const reveal = useReveal();
  const filtered = POSTS.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <section id="blog" className="relative py-32">
      <motion.div {...reveal} className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Journal</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">Notes from <span className="italic text-gradient-gold">the studio.</span></h2>
          </div>
          <div className="flex w-full items-center gap-3 glass rounded-full px-5 py-2 md:w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search articles" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group cursor-pointer overflow-hidden rounded-sm bg-card hover-lift"
            >
              <div className="overflow-hidden">
                <img src={post.img} alt={post.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-primary">
                  <span>{post.cat}</span><span className="h-px w-6 bg-primary/40" /><span className="text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-snug group-hover:text-primary transition">{post.title}</h3>
                <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">Read story <ArrowUpRight className="h-3 w-3" /></div>
              </div>
            </motion.article>
          ))}
          {filtered.length === 0 && <p className="col-span-full text-center text-muted-foreground">No articles found.</p>}
        </div>
      </motion.div>
    </section>
  );
}

// ---------- Contact ----------
function Contact() {
  const reveal = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please complete every field."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email."); return;
    }
    if (form.message.length > 1000) { toast.error("Message too long."); return; }
    toast.success("Enquiry received. We'll respond within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-2">
        <motion.div {...reveal}>
          <SectionLabel>Begin a Project</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">Let's compose<br /><span className="italic text-gradient-gold">your story.</span></h2>
          <p className="mt-6 max-w-md text-foreground/60">Tell us about your vision. We accept a limited number of commissions each season.</p>

          <div className="mt-12 space-y-5">
            <div className="flex items-start gap-4"><MapPin className="mt-1 h-5 w-5 text-primary" /><div><div className="text-sm font-medium">Studio Address</div><div className="text-sm text-muted-foreground">14 Bourdillon Road, Ikoyi, Lagos, Nigeria</div></div></div>
            <div className="flex items-start gap-4"><Phone className="mt-1 h-5 w-5 text-primary" /><div><div className="text-sm font-medium">Concierge</div><div className="text-sm text-muted-foreground">+234 (0) 803 412 7788</div></div></div>
            <div className="flex items-start gap-4"><Mail className="mt-1 h-5 w-5 text-primary" /><div><div className="text-sm font-medium">Bookings</div><div className="text-sm text-muted-foreground">studio@aurumlens.co</div></div></div>
          </div>

          <div className="mt-10 overflow-hidden rounded-sm border border-border">
            <iframe
              title="Map of Lagos studio"
              src="https://www.google.com/maps?q=Bourdillon+Road,+Ikoyi,+Lagos&output=embed"
              className="h-64 w-full grayscale contrast-125 invert-[0.85] hue-rotate-180"
              loading="lazy"
            />
          </div>

          <div className="mt-8 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground/70 transition hover:border-primary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a href="#" aria-label="TikTok" className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground/70 transition hover:border-primary hover:text-primary font-bold text-sm">T</a>
            <a href="#" aria-label="X" className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground/70 transition hover:border-primary hover:text-primary font-bold text-sm">𝕏</a>
          </div>
        </motion.div>

        <motion.form {...reveal} onSubmit={onSubmit} className="glass rounded-sm p-8 md:p-12">
          <div className="space-y-6">
            <Field label="Your Name" value={form.name} onChange={v => setForm({ ...form, name: v })} maxLength={100} />
            <Field label="Email Address" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} maxLength={255} />
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Date (optional)</label>
              <input type="date" className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none focus:border-primary transition" />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Tell us about your project</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={5}
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none focus:border-primary transition resize-none" />
            </div>
            <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-xs uppercase tracking-widest text-primary-foreground transition hover:shadow-[0_0_40px] hover:shadow-primary/50">
              Send Enquiry <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", maxLength }: { label: string; value: string; onChange: (v: string) => void; type?: string; maxLength?: number; }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{label}</label>
      <input type={type} value={value} maxLength={maxLength} onChange={e => onChange(e.target.value)}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground outline-none focus:border-primary transition" />
    </div>
  );
}

// ---------- Footer ----------
function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Enter a valid email."); return; }
    toast.success("Subscribed to the journal."); setEmail("");
  };
  return (
    <footer className="border-t border-border bg-card/30 pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-2xl tracking-[0.3em] text-gradient-gold">AURUM</div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">Cinematic luxury photography from Lagos to the world.</p>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary">Studio</div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              {["About", "Services", "Pricing", "Journal"].map(l => <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-primary">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary">Connect</div>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li>14 Bourdillon Road</li>
              <li>Ikoyi, Lagos, Nigeria</li>
              <li>studio@aurumlens.co</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary">The Journal</div>
            <p className="mt-4 text-sm text-muted-foreground">Quiet dispatches. Once a month.</p>
            <form onSubmit={subscribe} className="mt-4 flex items-center gap-2 glass rounded-full pl-4 pr-1 py-1">
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              <button className="rounded-full bg-primary px-4 py-2 text-[10px] uppercase tracking-widest text-primary-foreground">Join</button>
            </form>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Aurum Lens. Crafted in Lagos.</div>
          <div className="flex gap-6"><a href="#" className="hover:text-primary">Privacy</a><a href="#" className="hover:text-primary">Terms</a></div>
        </div>
      </div>
    </footer>
  );
}

// ---------- WhatsApp ----------
function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/2348034127788"
      target="_blank" rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)] animate-float hover:scale-110 transition"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-xl animate-spotlight" />
    </a>
  );
}
