import { useState, useEffect, useRef } from "react";
import {
  Shield, Sprout, Users, Award, Target, HeartHandshake,
  Mail, Phone, Menu, X, CheckCircle2, Bug, Home, Building2,
  Warehouse, Send, MapPin, ArrowRight, Star, Quote, BadgeCheck,
  Search, ClipboardCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import bydImg from "./assets/photos/byd.jpg";
import parkadsImg from "./assets/photos/parkads.jpg";
import parkads2Img from "./assets/photos/parkads2.jpg";
import firstbaronImg from "./assets/photos/firstbaron.jpg";
import moanaImg from "./assets/photos/moana.jpg";
import ctaImg from "./assets/photos/cta.jpg";
import chizmozzaImg from "./assets/photos/chizmozza.jpg";
import farinasImg from "./assets/photos/farinas.jpg";
import logoImg from "./assets/photos/logo.png";

const IG_URL = "https://www.instagram.com/htpowerpestcontrol";

const btnOnDark = "bg-white hover:bg-[#eef2fe] text-[#16265e] rounded-full font-bold shadow-[0_8px_24px_rgba(0,0,0,0.2)]";
const btnGhostDark = "border border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white rounded-full font-semibold";

function Instagram({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Facebook({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-1.9 1.9-1.9H17V2.1C16.5 2 15.3 2 14.1 2 11.4 2 9.6 3.7 9.6 6.9V10H6.5v4h3.1v8H13z" />
    </svg>
  );
}

const PROJECTS = [
  { img: chizmozzaImg, name: "Chizmozza", loc: "SM North, EDSA", type: "Termite Control Treatment" },
  { img: farinasImg, name: "Fariñas Ilocos Empanada", loc: "Bagong Ilog, Pasig City", type: "General Pest Control" },
  { img: bydImg, name: "BYD – Pasong Tamo Branch", loc: "Makati City", type: "General Pest Control" },
  { img: firstbaronImg, name: "First Baron Residences", loc: "Metro Manila", type: "General Pest Control" },
  { img: parkadsImg, name: "Park Ads Inc.", loc: "Metro Manila", type: "General Pest Control" },
  { img: moanaImg, name: "Moana Cafe & Eatery", loc: "Metro Manila", type: "General Pest Control" },
  { img: parkads2Img, name: "Corporate Office", loc: "Metro Manila", type: "General Pest Control" },
  { img: ctaImg, name: "Warehouse & Storage", loc: "Metro Manila", type: "General Pest Control" },
];

const TESTIMONIALS = [
  { name: "Marc Sanque", date: "Feb 26, 2024", text: "Highly recommended! Thank you!" },
  { name: "Irish Santos", date: "Feb 26, 2024", text: "Great service! Thank you very much!" },
];

/* ---------- Reusable sprayer/drone background motif ---------- */
function SprayerMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g opacity="0.5" stroke="#0d2f5e" strokeOpacity="0.28" strokeWidth="6" strokeLinecap="round">
        <line x1="40" y1="70" x2="560" y2="70" />
        <rect x="250" y="70" width="100" height="46" rx="10" />
        <line x1="300" y1="116" x2="300" y2="200" />
        <path d="M300 200 q-30 40 -60 60" />
        <rect x="215" y="200" width="26" height="40" rx="6" />
        <rect x="360" y="200" width="26" height="40" rx="6" />
      </g>
      <g opacity="0.35" fill="#1f6bb0">
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={i} cx={210 + i * 7} cy={260 + (i % 3) * 6} r="2.4" />
        ))}
      </g>
    </svg>
  );
}

const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Why Us", id: "why" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
];

const REASONS = [
  { icon: Shield, title: "Comprehensive Solutions", text: "Tailored pest control strategies addressing a wide range of pest issues." },
  { icon: Target, title: "Prevention-Focused Approach", text: "We stop the problem before it starts and help prevent future infestations." },
  { icon: Award, title: "Expertise & Experience", text: "Skilled professionals with extensive knowledge in pest management." },
  { icon: Sprout, title: "Eco-Friendly Solutions", text: "Products crafted to effectively combat pests while staying environmentally friendly." },
  { icon: HeartHandshake, title: "Customer-Centric", text: "Your satisfaction is our top priority — start to finish." },
  { icon: Users, title: "Trusted Partners", text: "We go beyond being suppliers to become your partner in pest control excellence." },
];

const PHONE2 = "0919-585-2528";
const FB_URL = "https://fb.com/HTPOWERPestControl";

const SERVICES = [
  { icon: Bug, title: "General Pest Control", text: "Targeted control for ants, cockroaches, mosquitoes, and common pests." },
  { icon: Home, title: "Termite Control Treatment", text: "Soil and wood treatment to eliminate and prevent termite damage." },
  { icon: Shield, title: "Rodent Control Treatment", text: "Baiting, trapping, and exclusion to keep rodents out for good." },
  { icon: BadgeCheck, title: "Certificate & Service Report", text: "Sanitary permit documentation for compliance and inspections." },
];

const CATEGORIES = [
  { icon: Building2, title: "Commercial Businesses", text: "Offices, restaurants, and retail." },
  { icon: Warehouse, title: "Warehouses", text: "Storage, logistics, and facilities." },
  { icon: Home, title: "Condo & Residential", text: "Homes, condos, and estates." },
];

const PRICING_STEPS = [
  { icon: Search, title: "Free Inspection", text: "We assess your property and pest concerns at no cost, with no obligation." },
  { icon: ClipboardCheck, title: "Custom Treatment Plan", text: "We design a plan sized to your property and the pests you're dealing with." },
  { icon: BadgeCheck, title: "Transparent Quote", text: "You get a clear, upfront price before any work begins — no hidden fees." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate-fadeup")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  useEffect(() => {
    if (!m || !ref.current) return;
    const el = ref.current;
    const target = parseFloat(m[1]);
    const decimals = m[1].includes(".") ? 1 : 0;
    const suffix = m[2];
    let done = false;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || done) return;
      done = true;
      const start = performance.now();
      const dur = 1100;
      const tick = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{m ? "0" + m[2] : value}</span>;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#0d2f5e] overflow-x-hidden pb-14 md:pb-0">
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-[#0d2f5e] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">
        Skip to content
      </a>
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-[0_2px_20px_rgba(13,47,94,0.08)]" : "bg-transparent"}`}>
        <nav className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <img src={logoImg} alt="HT-Power Pest Control logo" className="h-9 w-9 rounded-full object-cover" />
            <span className={`font-extrabold tracking-tight text-lg ${scrolled ? "brand-navy" : "text-white"}`}>
              HT-POWER<span className={`block text-[10px] font-semibold tracking-[0.22em] -mt-1 ${scrolled ? "text-[#4169E1]" : "text-[#cfd9f7]"}`}>PEST CONTROL</span>
            </span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${scrolled ? "text-[#16265e]/80 hover:text-[#2952cc]" : "text-white/90 hover:text-white"}`}>
                {n.label}
              </button>
            ))}
            <a href={IG_URL} target="_blank" rel="noopener noreferrer"
              className={`ml-1 grid h-9 w-9 place-items-center rounded-full transition ${scrolled ? "text-[#16265e]/70 hover:text-[#2952cc] hover:bg-[#eef2fe]" : "text-white/80 hover:text-white hover:bg-white/10"}`} aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={FB_URL} target="_blank" rel="noopener noreferrer"
              className={`grid h-9 w-9 place-items-center rounded-full transition ${scrolled ? "text-[#16265e]/70 hover:text-[#2952cc] hover:bg-[#eef2fe]" : "text-white/80 hover:text-white hover:bg-white/10"}`} aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <Button onClick={() => scrollTo("contact")} className="ml-1 bg-brand-royal hover:brightness-95 text-white rounded-full px-5 font-semibold">
              Get a Quote
            </Button>
          </div>
          <button className={`md:hidden ${scrolled ? "text-[#16265e]" : "text-white"}`} onClick={() => setOpen((o) => !o)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden bg-white/98 backdrop-blur border-t border-[#dcecf9] px-5 py-3">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="block w-full text-left py-2.5 font-semibold text-[#0d2f5e]/80">
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo("contact")} className="mt-2 w-full bg-brand-navy text-white rounded-full font-semibold">Get a Quote</Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[620px] flex items-center overflow-hidden bg-brand-ink pt-20">
        <img src={ctaImg} alt="" aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-90" />
        <div className="absolute inset-0 bg-[#2952cc] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(22,38,94,0.92)_0%,rgba(41,82,204,0.55)_60%,rgba(41,82,204,0.2)_100%)]" />
        <div className="relative mx-auto max-w-6xl px-5 w-full">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/40 px-4 py-1.5 text-xs font-semibold text-white">
            <Star className="h-3.5 w-3.5 fill-white text-white" /> 100% GUARANTEE · TRUSTED BY BUSINESSES
          </span>
          <h1 className="mt-6 font-display text-shadow-soft">
            <span className="block text-2xl md:text-4xl text-[#a9bef0]">WHY</span>
            <span className="block text-6xl md:text-8xl text-white">HT-<span className="text-[#a9bef0]">POWER</span></span>
            <span className="block mt-3 text-lg md:text-2xl text-[#cfd9f7] font-semibold" style={{ fontFamily: "Poppins" }}>
              is your top choice for pest control services
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[#cfd9f7] md:text-lg">
            Unleash the ultimate defense against pests — general, termite, and rodent control
            for homes and businesses across Metro Manila.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button onClick={() => scrollTo("contact")}
              className={`${btnOnDark} px-7 h-12 text-base`}>
              Book an Inspection <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button onClick={() => scrollTo("services")}
              className={`${btnGhostDark} px-7 h-12 text-base`}>
              Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative gradient-soft py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal className="opacity-0">
            <p className="text-sm font-bold tracking-[0.2em] brand-royal">ABOUT HT-POWER</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black leading-[0.95] text-[#2f5fd0]">
              About Our<br />Company
            </h2>
            <p className="mt-5 max-w-[60ch] text-[#0d2f5e]/80 md:text-lg leading-relaxed">
              HT-Power Pest Control Services prides itself on a holistic approach to pest management,
              offering a wide range of services designed to address various pest infestations effectively.
              From residential properties to commercial establishments, the company provides meticulous
              inspections, strategic treatment plans, and ongoing maintenance to ensure long-term
              pest-free environments.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-4">
              {[["100%", "Guarantee"], ["Free", "Estimates"], ["Expert", "Technicians"]].map(([a, b]) => (
                <div key={b} className="rounded-2xl gradient-card p-4 text-center shadow-sm">
                  <div className="text-2xl font-black brand-navy">{a}</div>
                  <div className="text-xs font-semibold text-[#0d2f5e]/60">{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="opacity-0 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-20px_rgba(13,47,94,0.5)]">
              <img src={firstbaronImg} alt="HT-Power technician on-site" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2f5e]/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur p-4">
                <div className="flex items-center gap-2 text-[#0d2f5e] font-bold text-sm">
                  <BadgeCheck className="h-5 w-5 brand-royal" /> First Baron Residences — General Pest Control
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US — dark anchor */}
      <section id="why" className="py-20 md:py-28 gradient-band text-white relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="max-w-2xl" data-reveal>
            <p className="text-xs font-bold tracking-[0.2em] text-[#a9bef0] uppercase">Why choose us</p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">
              Six reasons clients <span className="relative text-white">trust
                <span className="absolute left-0 right-0 -bottom-1 h-[5px] bg-white rounded-full" /></span> us
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6" data-reveal>
            {[["100%", "Service Guarantee"], ["Free", "Estimates"], ["5.0", "Client Rating"], ["Eco", "Friendly Products"]].map(([a, b]) => (
              <div key={b} className="border-l-[3px] border-white/60 pl-4">
                <div className="font-display text-3xl md:text-5xl"><CountUp value={a} /></div>
                <div className="text-sm text-[#a9bef0] font-medium">{b}</div>
              </div>
            ))}
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REASONS.map((r, i) => (
              <div key={r.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 group rounded-2xl border border-white/15 bg-white/[0.06] p-7 hover:bg-white/[0.1] hover:-translate-y-1 transition-all">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#2952cc] shadow-lg group-hover:scale-110 transition-transform">
                  <r.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-white">{r.title}</h3>
                <p className="mt-2 text-sm text-[#cfd9f7] leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 gradient-soft">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto" data-reveal>
            <p className="text-sm font-bold tracking-[0.2em] brand-royal">CORE SERVICES</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Unleash the ultimate defense against pests</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 rounded-2xl p-7 flex flex-col bg-white border border-[#e2e9fb] hover:border-[#2952cc] hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-band text-white shadow">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-extrabold">{s.title}</h3>
                <p className="mt-2 text-sm text-[#16265e]/75">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center" data-reveal>
            <h3 className="text-xl md:text-2xl font-black">We provide pest management solutions for:</h3>
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {CATEGORIES.map((c, i) => (
              <div key={c.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 flex items-center gap-4 rounded-2xl gradient-card border border-[#dcecf9] p-6">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-navy text-white shadow">
                  <c.icon className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-extrabold leading-tight">{c.title}</h4>
                  <p className="text-sm text-[#0d2f5e]/75">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto" data-reveal>
            <p className="text-sm font-bold tracking-[0.2em] brand-royal">OUR WORK</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Trusted by leading establishments</h2>
            <p className="mt-4 text-[#0d2f5e]/70">Real projects, backed by our 100% service guarantee.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <button key={p.name + i} type="button" onClick={() => setLightbox(i)} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all text-left cursor-zoom-in">
                <img src={p.img} alt={p.name} loading="lazy"
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2f5e]/85 via-[#0d2f5e]/10 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="font-extrabold text-lg leading-tight">{p.name}</h3>
                  <p className="text-sm text-[#a9d0ec] font-medium">{p.type}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-white/80"><MapPin className="h-3.5 w-3.5" /> {p.loc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT IMAGE LIGHTBOX */}
      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-4xl w-[92vw] p-0 bg-transparent border-none shadow-none">
          {lightbox !== null && (
            <>
              <DialogTitle className="sr-only">{PROJECTS[lightbox].name}</DialogTitle>
              <img src={PROJECTS[lightbox].img} alt={PROJECTS[lightbox].name}
                className="w-full max-h-[80vh] object-contain rounded-2xl" />
              <div className="rounded-b-2xl bg-[#0d2f5e] px-5 py-4 text-white -mt-1">
                <h3 className="font-extrabold text-lg leading-tight">{PROJECTS[lightbox].name}</h3>
                <p className="text-sm text-[#a9d0ec] font-medium">{PROJECTS[lightbox].type}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/80"><MapPin className="h-3.5 w-3.5" /> {PROJECTS[lightbox].loc}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-20 md:py-28 gradient-band text-white relative overflow-hidden">
        <SprayerMotif className="absolute -top-6 right-0 w-[500px] opacity-15" />
        <div className="relative mx-auto max-w-5xl px-5">
          <div className="text-center max-w-2xl mx-auto" data-reveal>
            <p className="text-sm font-bold tracking-[0.2em] text-[#a9d0ec]">CLIENT REVIEWS</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">What our clients say</h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} data-reveal className="opacity-0 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-7">
                <Quote className="h-8 w-8 text-[#a9d0ec]" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#f2c200] text-[#f2c200]" />)}
                </div>
                <p className="mt-3 text-lg font-semibold">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0d2f5e] font-black">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-[#a9d0ec]">Verified client · {t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING / HOW QUOTES WORK */}
      <section className="py-20 md:py-28 gradient-soft">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto" data-reveal>
            <p className="text-sm font-bold tracking-[0.2em] brand-royal">TRANSPARENT PRICING</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Every property is different — so is your quote</h2>
            <p className="mt-4 text-[#0d2f5e]/70">
              We don't believe in one-size-fits-all pricing. After a free, no-obligation inspection,
              we recommend the right treatment plan for your space and give you a clear, upfront quote — no hidden fees, no surprises.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-3 gap-6">
            {PRICING_STEPS.map((s, i) => (
              <div key={s.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 flex items-center gap-4 rounded-2xl gradient-card border border-[#dcecf9] p-6">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-navy text-white shadow">
                  <s.icon className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-extrabold leading-tight">{s.title}</h4>
                  <p className="text-sm text-[#0d2f5e]/75">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section id="contact" className="relative py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-xl px-5">
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-ink text-white/80">
        <div className="mx-auto max-w-7xl px-5 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="HT-Power Pest Control logo" className="h-9 w-9 rounded-full object-cover" />
              <span className="font-extrabold text-white text-lg">HT-POWER</span>
            </div>
            <p className="mt-4 text-sm text-white/60 max-w-xs">Your trusted partner in pest control excellence — safe, effective, and eco-friendly.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.id}><button onClick={() => scrollTo(n.id)} className="hover:text-white">{n.label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> htpowerpestcontrol@gmail.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0992-711-8665 · {PHONE2}</li>
              <li><a href={IG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><Instagram className="h-4 w-4" /> @htpowerpestcontrol</a></li>
              <li><a href={FB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <Facebook className="h-4 w-4" /> fb.com/HTPOWERPestControl</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
          © {new Date().getFullYear()} HT-Power Pest Control Services. All rights reserved.
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 border-t border-[#dcecf9] bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(13,47,94,0.1)]">
        <a href="tel:09927118665" className="flex items-center justify-center gap-2 py-3.5 font-bold text-[#0d2f5e] border-r border-[#dcecf9]">
          <Phone className="h-5 w-5" /> Call
        </a>
        <button onClick={() => scrollTo("contact")} className="flex items-center justify-center gap-2 py-3.5 font-bold text-white bg-brand-ink">
          <Send className="h-5 w-5" /> Get a Quote
        </button>
      </div>
    </div>
  );
}

/* ---------- Contact form ---------- */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", establishmentType: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.phone.trim() && !/^0\d{9,10}$/.test(form.phone.replace(/[\s-]/g, ""))) e.phone = "Valid PH mobile number required";
    if (form.message.trim().length < 10) e.message = "Please add a few more details (min. 10 characters)";
    if (!form.establishmentType) e.establishmentType = "Please select an establishment type";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    if (honeypot) {
      setStatus("sent");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // {name, email, phone, message, establishmentType}
      });
      if (res.ok) setStatus("sent");
      else throw new Error("Failed");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-[2rem] border border-[#dcecf9] gradient-card p-8 md:p-10" data-reveal>
      <h3 className="text-2xl font-black">Request a free quote</h3>
      <p className="mt-2 text-sm text-[#0d2f5e]/80">Fill in your details and we'll get back to you shortly.</p>
      {status === "sent" ? (
        <div className="mt-8 rounded-2xl bg-white p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 brand-royal" />
          <p className="mt-3 font-semibold">Thanks, {form.name || "there"}!</p>
          <p className="text-sm text-[#0d2f5e]/80">Your message was sent — we'll reply within one business day.</p>
          <button
            onClick={() => {
              setStatus("idle");
              setForm({ name: "", email: "", phone: "", message: "", establishmentType: "" });
              setErrs({});
            }}
            className="mt-5 text-sm font-semibold brand-royal underline underline-offset-2 hover:no-underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1} autoComplete="off" aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px overflow-hidden" />
          <Field id="name" label="Full Name" value={form.name} onChange={set("name")} placeholder="Juan Dela Cruz" error={errs.name} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field id="email" label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" error={errs.email} />
            <Field id="phone" label="Phone" value={form.phone} onChange={set("phone")} placeholder="09XX-XXX-XXXX" maxLength={20} error={errs.phone} />
          </div>
          <div>
            <label htmlFor="establishmentType" className="text-sm font-semibold text-[#0d2f5e]">Establishment Type</label>
            <Select value={form.establishmentType} onValueChange={(v) => setForm((f) => ({ ...f, establishmentType: v }))}>
              <SelectTrigger id="establishmentType" aria-invalid={!!errs.establishmentType}
                className={`mt-1.5 h-auto w-full rounded-xl border bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-[#2f7ec2]/20 ${errs.establishmentType ? "border-red-400 focus:border-red-500" : "border-[#cfe4f5] focus:border-[#2f7ec2]"}`}>
                <SelectValue placeholder="Select establishment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Commercial Businesses">Commercial Businesses</SelectItem>
                <SelectItem value="Warehouses">Warehouses</SelectItem>
                <SelectItem value="Condo & Residential">Condo & Residential</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errs.establishmentType && <p className="mt-1 text-xs font-medium text-red-600">{errs.establishmentType}</p>}
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-semibold text-[#0d2f5e]">Message</label>
            <textarea id="message" value={form.message} onChange={set("message")} rows={4} maxLength={2000} placeholder="Tell us about your pest concern..."
              aria-invalid={!!errs.message}
              className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2f7ec2]/20 resize-none ${errs.message ? "border-red-400 focus:border-red-500" : "border-[#cfe4f5] focus:border-[#2f7ec2]"}`} />
            {errs.message && <p className="mt-1 text-xs font-medium text-red-600">{errs.message}</p>}
          </div>
          {status === "error" && (
            <p className="text-sm font-medium text-red-600">
              Couldn't send — email us directly at{" "}
              <a href="mailto:htpowerpestcontrol@gmail.com" className="underline">htpowerpestcontrol@gmail.com</a>.
            </p>
          )}
          <Button onClick={submit} disabled={status === "loading"}
            className="w-full h-12 bg-brand-navy hover:bg-[#12457f] text-white rounded-full font-semibold text-base disabled:opacity-60">
            {status === "loading" ? "Sending..." : <>Send Inquiry <Send className="ml-1 h-4 w-4" /></>}
          </Button>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={props.id} className="text-sm font-semibold text-[#0d2f5e]">{label}</label>
      <input {...props} aria-invalid={!!error}
        className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2f7ec2]/20 ${error ? "border-red-400 focus:border-red-500" : "border-[#cfe4f5] focus:border-[#2f7ec2]"}`} />
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
