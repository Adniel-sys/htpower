import { useState, useEffect } from "react";
import {
  Shield, Sprout, Users, Award, Target, HeartHandshake,
  Mail, Phone, Menu, X, CheckCircle2, Bug, Home, Building2,
  Send, MapPin, ArrowRight, Star, Quote, BadgeCheck,
  ClipboardCheck, ChevronLeft,
  ChevronRight, CalendarClock, Droplets, Shovel, Images, Factory
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import bydImg from "./assets/photos/byd.jpg";
import bydBgcImg from "./assets/photos/byd-bgc.jpg";
import bydPt1Img from "./assets/photos/byd-pasongtamo-1.jpg";
import bydPt2Img from "./assets/photos/byd-pasongtamo-2.jpg";
import bydPt3Img from "./assets/photos/byd-pasongtamo-3.jpg";
import denza1Img from "./assets/photos/denza-1.jpg";
import denza2Img from "./assets/photos/denza-2.jpg";
import denza3Img from "./assets/photos/denza-3.jpg";
import topRealty1Img from "./assets/photos/toprealty-1.jpg";
import topRealty2Img from "./assets/photos/toprealty-2.jpg";
import parkadsImg from "./assets/photos/parkads.jpg";
import parkads2Img from "./assets/photos/parkads2.jpg";
import firstbaronImg from "./assets/photos/firstbaron.jpg";
import moanaImg from "./assets/photos/moana.jpg";
import ctaImg from "./assets/photos/cta.jpg";
import chizmozzaImg from "./assets/photos/chizmozza.jpg";
import farinasImg from "./assets/photos/farinas.jpg";
import logoImg from "./assets/photos/logo.png";
// Images taken from the client's 2026 company profile PDF
import missionImg from "./assets/pdf/mission.jpg";
import ownersImg from "./assets/pdf/owners.png";
import weServeImg from "./assets/pdf/we-serve.jpg";
import weDoImg from "./assets/pdf/we-do.jpg";
import schedulesImg from "./assets/pdf/schedules.jpg";
import birLogo from "./assets/pdf/bir.png";
import dtiLogo from "./assets/pdf/dti.png";
import pcapLogo from "./assets/pdf/pcap.png";
import fdaLogo from "./assets/pdf/fda.jpg";

const IG_URL = "https://www.instagram.com/htpowerpestcontrol";

const btnOnDark = "bg-white hover:bg-[#e9ecf1] text-[#162b57] rounded-full font-bold shadow-[0_8px_24px_rgba(0,0,0,0.2)]";
const btnGhostDark = "border border-white/40 bg-white/90 text-[#162b57] hover:bg-white/95 rounded-full font-semibold";

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
  { imgs: [bydBgcImg], name: "BYD – Taguig", loc: "BGC, Taguig City", type: "General Pest Control" },
  { imgs: [bydPt1Img, bydPt2Img, bydPt3Img, bydImg], name: "BYD – Pasong Tamo Branch", loc: "Makati City", type: "General Pest Control" },
  { imgs: [denza1Img, denza2Img, denza3Img], name: "DENZA – Makati Branch", loc: "Makati City", type: "General Pest Control" },
  { imgs: [topRealty1Img, topRealty2Img], name: "Top Realty88 Corporation", loc: "Metro Manila", type: "General Pest Control" },
  { imgs: [chizmozzaImg], name: "Chizmozza", loc: "SM North, EDSA", type: "Termite Control Treatment" },
  { imgs: [farinasImg], name: "Fariñas Ilocos Empanada", loc: "Bagong Ilog, Pasig City", type: "General Pest Control" },
  { imgs: [firstbaronImg], name: "First Baron Residences", loc: "Metro Manila", type: "General Pest Control" },
  { imgs: [parkadsImg, parkads2Img], name: "Park Ads Inc.", loc: "Metro Manila", type: "General Pest Control" },
  { imgs: [moanaImg], name: "Moana Cafe & Eatery", loc: "Metro Manila", type: "General Pest Control" },
];

// Wording below is taken verbatim from the client's 2026 company profile PDF and FAQ document.
// Residential clients are private individuals, so they're not listed by name.
const CLIENTS = [
  { group: "Commercial", names: [
    "Guallar Water Refilling Station", "Auntie's Empanada", "E-Prints", "Purecryst Water Refilling Station",
    "Unsang Business Support Services", "BYD - Taguig", "BYD - Pasong Tamo", "DENZA - Makati Branch",
    "Harmonic System Inc.", "Park Ads Inc.", "Philippine Spring Water Resources, Inc. (Nature's Spring)",
    "Top Realty88 Corporation", "Steven Realty and Trade Dev't Corp", "Joint Endeavor Group Corp.",
    "Cloud Ecommerce Corporation", "Dreamskin Aesthetic Depot Company", "Dreamscapade Travel & Tours Co.",
    "Xitrix Computer Corporation", "Camerahaus",
  ] },
  { group: "Restaurant", names: ["Farinas Ilocos Empanada", "Chizmozza PH (SM North Branch)", "Moana Café and Eatery", "Why Chicken Pasig Branch"] },
  { group: "Condominium", names: ["First Baron Tower Residences", "The Baron's Place"] },
  { group: "Industrial", names: ["Ian Spices Trading"] },
];

const CREDENTIALS = [
  { logo: birLogo, title: "BIR Registered", text: "HT-Power operates as a legally recognized business under the Bureau of Internal Revenue, ensuring compliance with all tax regulations and government requirements." },
  { logo: dtiLogo, title: "DTI Registered", text: "We are officially registered with the Department of Trade and Industry, affirming our legitimacy as a business and our commitment to ethical operations." },
  { logo: pcapLogo, title: "PCAP", text: "HT-POWER proudly stands as a member of Pest Control Association of the Philippines (PCAP)." },
  { logo: fdaLogo, title: "FDA-Approved Materials", text: "Our application with the Food and Drug Administration is currently underway. Even as we await final FDA registration, we ensure that all materials we use are already FDA-approved, prioritizing the safety, quality, and reliability of our offerings." },
];

const FAQS = [
  { q: "How long does a pest control treatment take?",
    a: <p>Typically, pest control treatment lasts for a minimum of ninety minutes, although the duration may vary depending on the size of the house or property.</p> },
  { q: "What to prepare prior to pest control treatment?",
    a: <p>Food items can be shielded by covering them or storing them in a large bag, such as a trash bag. Water containers do not require covering since the chemicals used cannot penetrate them, but for added caution, they can be covered with plastic. Similarly, dispenser nozzles can be enclosed with plastic. Clothing does not necessarily need to be packed in plastic unless flies to be controlled are hiding within them. Sofa covers, linens, and pillowcases should be washed before reuse. During spraying or misting procedures, no one except the individual assisting in the process should remain inside the treated area.</p> },
  { q: "When is it safe to enter a treated area?",
    a: <p>For optimal safety, it is advisable to wait for 2-3 hours after the completion of the pest control treatment before entering the treated area.</p> },
  { q: "How does Pest Control Inspection work?",
    a: <p>Our skilled pest control specialists will reach out to the client to delve deeper into their pest-related concerns. Subsequently, they will coordinate with the client to establish a convenient time and date for a site visit, during which they will thoroughly assess the extent of the pest infestation by inspecting all relevant areas of the premises. Our experienced surveyor will then discuss the findings with the client, proposing the most suitable and effective treatment to address the pest problem. A precise quote for the recommended treatment will be provided to the customer. Additionally, our experts will share preventive advice, including measures for proofing and maintaining hygiene. It's important to note that our professional pest control inspection and quote are complimentary, offered free of charge.</p> },
  { q: "How Much Does Pest Control Cost?",
    a: <>
      <p>Several factors contribute to the total expense associated with addressing a pest infestation concern:</p>
      <ul className="mt-2 space-y-1.5 list-disc pl-5">
        <li><strong>Pest Type</strong> - The specific pest inhabiting a business premise or property influences the overall cost of treatment. For instance, eliminating flies differs in cost from addressing a rodent issue due to the unique solutions required for each pest.</li>
        <li><strong>Infestation Severity</strong> - The degree and scope of infestation within the business impact the pricing of pest control services. For example, controlling a heavily infested area with flies demands more frequent treatment and monitoring to ensure the effectiveness of the customized program, tailored to the business's needs, compared to a lightly infested area.</li>
        <li><strong>Treatment Method</strong> - The chosen treatment method to eliminate a pest problem correlates with the total costs of the pest control service. Pricing for preventive pest control differs from that of corrective, reactive treatments.</li>
        <li><strong>Property/Area Size</strong> - The dimensions of a property significantly influence the calculation of pest control service costs. Larger properties require more time for successful implementation of solutions and pest treatment.</li>
        <li><strong>Number of Treatments</strong> - Certain pests may necessitate multiple treatments for effective control, which also impacts the pricing structure of the pest control service.</li>
      </ul>
    </> },
];

const TESTIMONIALS = [
  { name: "Marc Sanque", date: "Feb 26, 2024", text: "Highly recommended! Thank you!" },
  { name: "Irish Santos", date: "Feb 26, 2024", text: "Great service! Thank you very much!" },
];

/* ---------- Reusable sprayer/drone background motif ---------- */
function SprayerMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g opacity="0.5" stroke="#162b57" strokeOpacity="0.28" strokeWidth="6" strokeLinecap="round">
        <line x1="40" y1="70" x2="560" y2="70" />
        <rect x="250" y="70" width="100" height="46" rx="10" />
        <line x1="300" y1="116" x2="300" y2="200" />
        <path d="M300 200 q-30 40 -60 60" />
        <rect x="215" y="200" width="26" height="40" rx="6" />
        <rect x="360" y="200" width="26" height="40" rx="6" />
      </g>
      <g opacity="0.35" fill="#3365a2">
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
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const CORE_VALUES = [
  { icon: Target, title: "Precision", text: "Meticulously analyzing pest infestations and applying targeted treatments, we ensure efficient and effective pest control outcomes for our clients to deliver results with accuracy and attention to detail." },
  { icon: Award, title: "Excellence", text: "Upholding the highest ethical standards, we prioritize honesty, transparency, and accountability in all our interactions. Our commitment to integrity builds trust with clients, team members, and the communities we serve." },
  { icon: Shield, title: "Safety First", text: "The safety of our clients, team members, and the environment is our top priority. We adhere to stringent safety protocols, ensuring that our pest control methods are effective while minimizing any potential risks to health and well-being." },
  { icon: Users, title: "Team Collaboration", text: "We value and respect the contributions of every team member. By fostering a collaborative and inclusive work environment, we leverage the diverse skills and experiences of our team to achieve collective success." },
];

const WE_PROVIDE = [
  { icon: HeartHandshake, title: "Preservation of Life", text: "By controlling pests that carry harmful diseases, we help protect the well-being of you and your loved ones." },
  { icon: Home, title: "Protection of Health and Properties", text: "Our methods are designed to safeguard both human health and the structural integrity of your space." },
  { icon: ClipboardCheck, title: "Personalized Treatment", text: "We don't believe in one-size-fits-all solutions. Every service is tailored to your specific pest problem." },
  { icon: Sprout, title: "Peace of Mind", text: "With HT-Power on the job, you can rest easy knowing your environment is in capable hands." },
];

const PHONE2 = "0919-585-2528";
const FB_URL = "https://fb.com/HTPOWERPestControl";

const SERVICES = [
  { icon: Bug, title: "General Pest Control", text: "Our General Pest Control service is designed to address a wide range of common pests, including ants, cockroaches, spiders, and more. Our trained technicians use state-of-the-art equipment and environmentally friendly products to ensure effective pest eradication while maintaining the safety of your home or business." },
  { icon: Home, title: "Termite Control", text: "HT-Power specializes in advanced Termite Control Treatment to protect your property from the destructive impact of termites. Our experts conduct thorough inspections to identify termite activity and implement targeted treatment strategies, such as soil treatment, baiting systems, and wood protection." },
  { icon: Shield, title: "Rodent Control", text: "Our Rodent Control Treatment offers effective solutions to eliminate mice, rats, and other rodents from your premises. We employ a combination of exclusion techniques, trapping, and rodenticides, tailored to the severity of the infestation and specific environmental conditions." },
  { icon: Droplets, title: "Reticulation System", text: "Our reticulation system delivers pest control treatments through a network of pipes or tubing, ensuring even and precise coverage across your property. This method improves effectiveness, reduces chemical waste, saves time, and provides consistent, long-lasting protection for both indoor and outdoor areas." },
];

const WE_DO = [
  { icon: Shovel, title: "Soil Poisoning", text: "Pre- and post-construction soil treatment to prevent termite infestations at the root level." },
  { icon: Bug, title: "Pest Extermination", text: "Fast and effective elimination of existing pest populations in homes or businesses." },
  { icon: Shield, title: "Pest Control and Prevention", text: "Long-term, proactive solutions to keep infestations from returning." },
  { icon: Sprout, title: "Termite Baiting System", text: "Environmentally responsible termite control using advanced baiting technology." },
  { icon: ClipboardCheck, title: "Pest Management", text: "Integrated Pest Management (IPM) programs tailored to your environment and industry needs." },
];

const PESTS = [
  { name: "Termites", text: "Silent destroyers of wood and structures; we stop them before they cause major damage." },
  { name: "Roaches", text: "Common carriers of bacteria; we eliminate them efficiently." },
  { name: "Rats", text: "Known for spreading diseases and property damage; we offer complete rodent control solutions." },
  { name: "Mosquitoes & Flies", text: "Vectors of dangerous diseases like dengue and malaria; we help reduce and prevent outbreaks." },
  { name: "Ants and Bugs", text: "From nuisance ants to creeping bugs, we handle them all." },
];

const SCHEDULES = ["One-Time", "Monthly", "Bi-Monthly", "Quarterly"];

const CATEGORIES = [
  { icon: Home, title: "Residential", text: "Safeguarding homes and families from unwanted pests and health risks." },
  { icon: Building2, title: "Commercial", text: "Supporting businesses by maintaining clean and pest-free environments that meet safety standards." },
  { icon: Factory, title: "Industrial", text: "Providing large-scale pest control solutions for factories, warehouses, and production sites with precision and compliance." },
];

const WHAT_TO_EXPECT = [
  "Free site inspection within serviceable areas",
  "Customized and transparent quotation after inspection",
  "Professional assessment for power and pest control needs",
  "Safe and effective methods using FDA-approved products",
  "No hidden charges — just honest, reliable service",
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


export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<{ p: number; i: number } | null>(null);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lbProject = lightbox && PROJECTS[lightbox.p];
  const stepPhoto = (d: number) =>
    setLightbox((lb) => lb && { ...lb, i: (lb.i + d + PROJECTS[lb.p].imgs.length) % PROJECTS[lb.p].imgs.length });

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#162b57] overflow-x-hidden pb-14 md:pb-0">
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-[#162b57] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">
        Skip to content
      </a>
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-[0_2px_20px_rgba(22,43,87,0.08)]" : "bg-transparent"}`}>
        <nav className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <img src={logoImg} alt="HT-Power Pest Control logo" className="h-9 w-9 rounded-full object-cover" />
            <span className={`font-extrabold tracking-tight text-lg ${scrolled ? "brand-navy" : "text-white"}`}>
              HT-POWER<span className={`block text-[10px] font-semibold tracking-[0.22em] -mt-1 ${scrolled ? "text-[#18488f]" : "text-[#cfe7f1]"}`}>PEST CONTROL</span>
            </span>
          </button>
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${scrolled ? "text-[#162b57]/80 hover:text-[#18488f]" : "text-white/90 hover:text-white"}`}>
                {n.label}
              </button>
            ))}
            <a href={IG_URL} target="_blank" rel="noopener noreferrer"
              className={`ml-1 grid h-9 w-9 place-items-center rounded-full transition ${scrolled ? "text-[#162b57]/70 hover:text-[#18488f] hover:bg-[#e9ecf1]" : "text-white/80 hover:text-white hover:bg-white/10"}`} aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={FB_URL} target="_blank" rel="noopener noreferrer"
              className={`grid h-9 w-9 place-items-center rounded-full transition ${scrolled ? "text-[#162b57]/70 hover:text-[#18488f] hover:bg-[#e9ecf1]" : "text-white/80 hover:text-white hover:bg-white/10"}`} aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <Button onClick={() => scrollTo("contact")} className="ml-1 bg-brand-royal hover:brightness-95 text-white rounded-full px-5 font-semibold">
              Get a Quote
            </Button>
          </div>
          <button className={`lg:hidden ${scrolled ? "text-[#162b57]" : "text-white"}`} onClick={() => setOpen((o) => !o)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="lg:hidden bg-white border-t border-[#d5dbe5] px-5 py-3">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="block w-full text-left py-2.5 font-semibold text-[#162b57]/80">
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
        <div className="absolute inset-0 bg-[#18488f] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(22,43,87,0.92)_0%,rgba(24,72,143,0.55)_60%,rgba(24,72,143,0.2)_100%)]" />
        <div className="relative mx-auto max-w-6xl px-5 w-full">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/40 px-4 py-1.5 text-xs font-semibold text-white">
            <Star className="h-3.5 w-3.5 fill-white text-white" /> BIR & DTI REGISTERED · PCAP MEMBER
          </span>
          <h1 className="mt-6 font-display text-shadow-soft">
            <span className="block text-2xl md:text-4xl text-[#8ecce2]">WHY</span>
            <span className="block text-6xl md:text-8xl text-white">HT-<span className="text-[#8ecce2]">POWER</span></span>
            <span className="block mt-3 text-lg md:text-2xl text-[#cfe7f1] font-semibold" style={{ fontFamily: "Poppins" }}>
              is your top choice for pest control services
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[#cfe7f1] md:text-lg">
            We believe great service doesn't have to come with a big price tag — just real people,
            real work, and real results.
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
            <h2 className="mt-3 text-4xl md:text-5xl font-black leading-[0.95] text-[#18488f]">
              About Our<br />Company
            </h2>
            <p className="mt-5 max-w-[60ch] text-[#162b57]/80 md:text-lg leading-relaxed">
              Founded in 2024, HT-Power Pest Control Services is a proudly Filipino-owned company born
              from a legacy of dedication, discipline, and excellence in pest management. Established by
              Mr. John Paul Hapa and his wife, the company is a tribute to his late father, Mr. Robert Hapa,
              the founder of Robert General Pest Control Services, which began serving homes and businesses in 1990.
            </p>
            <p className="mt-4 max-w-[60ch] text-[#162b57]/80 leading-relaxed">
              Built on decades of experience, HT-Power inherits the traditional values of quality service,
              honesty, and customer care, while embracing modern innovations in pest control technology.
              Mr. John Paul Hapa, having trained and worked extensively under his father's leadership,
              carries with him the technical know-how, professionalism, and customer-centric approach that
              made the Hapa name respected in the industry.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-4">
              {[["Since 1990", "Family Legacy"], ["Free", "Inspection"], ["FDA", "Approved Products"]].map(([a, b]) => (
                <div key={b} className="rounded-2xl gradient-card p-4 text-center shadow-sm">
                  <div className="text-2xl font-black brand-navy">{a}</div>
                  <div className="text-xs font-semibold text-[#162b57]/60">{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="opacity-0 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-20px_rgba(22,43,87,0.5)]">
              <img src={bydBgcImg} alt="HT-Power technician treating the BYD Taguig showroom" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162b57]/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4">
                <div className="flex items-center gap-2 brand-navy font-bold text-sm">
                  <BadgeCheck className="h-5 w-5 brand-royal" /> BYD – Taguig — General Pest Control
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* MISSION AND VISION — layout follows the PDF page: photo with a navy text panel */}
      <section className="pdf-corners py-20 md:py-28 bg-[#e9ecf1]">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center font-display text-4xl md:text-5xl brand-navy" data-reveal>Mission and Vision</h2>
          <div className="mt-12 grid lg:grid-cols-[1fr_1.15fr] items-stretch" data-reveal>
            <img src={missionImg} alt="HT-Power technician fogging with a thermal fogger"
              className="w-full h-64 lg:h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" />
            <div className="bg-brand-ink text-white p-8 md:p-10 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none space-y-6 text-justify leading-relaxed">
              <div>
                <h3 className="font-display text-2xl brand-sky text-left">Mission</h3>
                <p className="mt-3">HT-POWER PEST CONTROL SERVICES is committed to providing top-notch pest control services, utilizing innovative and sustainable methods to create safe and healthy environments for our residential and commercial clients. Our goal is to be the premier pest control company in the Philippines through exceptional service and environmental responsibility.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl brand-sky text-left">Vision</h3>
                <p className="mt-3">Striving to be the trusted partner in pest management, our vision is to set the standard for excellence in the industry. With unwavering commitment to efficiency, safety, and environmental responsibility. Through continuous innovation and a dedication to customer satisfaction, we envision a future where every space is free from pest intrusion, fostering health, comfort, and peace of mind for all.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OWNER'S MESSAGE — with the founders' photo from the PDF */}
      <section className="pdf-corners pt-20 md:pt-28 bg-[#f4f4f4]">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div data-reveal className="opacity-0 pb-20 md:pb-28">
            <h2 className="font-display text-4xl md:text-5xl brand-navy">Owner's Message</h2>
            <blockquote className="mt-6 space-y-4 brand-navy leading-relaxed text-justify">
              <p>At <strong>HT-Power Pest Control Services</strong>, this business is more than just a livelihood — it's a legacy built with passion, perseverance, and a genuine desire to serve.</p>
              <p>As husband and wife, we — <strong>John Paul Hapa and Sweet Telic-Hapa</strong> — founded HT-Power to honor a family tradition while creating a brand that reflects our own values: trust, excellence, and commitment.</p>
              <p>With John Paul's roots in the industry — shaped by years of working under his late father's well-respected pest control company — and Sweet's expertise in finance and client service management, we've built HT-Power as a fusion of legacy and innovation.</p>
              <p>We know how important it is to feel safe and secure in your own home or workplace. That's why we assure to treat every client with care, every property with respect, and every pest concern with urgency and expertise.</p>
              <p>At HT-Power, we don't just aim to eliminate pests — we aim to protect your peace of mind.</p>
              <p>It will be our honor to serve you with the utmost care and dedication. We look forward to the opportunity to serve you soon.</p>
            </blockquote>
            <p className="mt-6 brand-navy">
              <strong className="block">Warmly,</strong>
              John Paul Hapa &amp; Sweet Telic-Hapa<br />Founders, HT-Power Pest Control Services
            </p>
          </div>
          <img src={ownersImg} alt="John Paul Hapa and Sweet Telic-Hapa, founders of HT-Power" loading="lazy"
            className="mx-auto w-full max-w-sm md:max-w-none self-end" />
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="pdf-corners py-20 md:py-28 bg-[#e9ecf1]">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-center font-display text-4xl md:text-5xl brand-navy" data-reveal>Trust HT-POWER<br />with confidence</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {CREDENTIALS.map((c, i) => (
              <div key={c.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden bg-brand-ink text-white shadow-lg">
                <div className="sm:w-40 shrink-0 flex flex-col items-center justify-center gap-3 p-5 bg-[#11264d]">
                  <div className="grid h-24 w-24 place-items-center rounded-xl bg-white p-2">
                    <img src={c.logo} alt={`${c.title} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-center">{c.title}</h3>
                </div>
                <p className="p-6 text-sm leading-relaxed self-center text-justify">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center font-display text-2xl md:text-3xl brand-navy" data-reveal>
            HT-Power — Powered by Trust. Driven by Quality. Committed to Protection.
          </p>
        </div>
      </section>

      {/* WHY US — dark anchor */}
      <section id="why" className="pdf-corners py-20 md:py-28 bg-[#f4f4f4]">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-center font-display text-4xl md:text-5xl brand-navy" data-reveal>HT-POWER'S CORE VALUES</h2>
          <div className="mt-12 space-y-8">
            {CORE_VALUES.map((r, i) => (
              <div key={r.title} data-reveal style={{ animationDelay: `${i * 60}ms` }} className="opacity-0">
                <div className="flex items-end gap-1 pl-16 md:pl-20 brand-navy">
                  <span className="font-display text-5xl md:text-6xl leading-none">{r.title[0]}</span>
                  <span className="pb-1 text-sm md:text-base font-extrabold uppercase tracking-wide">{r.title.slice(1)}</span>
                </div>
                <div className="relative mt-1 flex items-center">
                  <div className="absolute left-0 z-10 grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-full bg-brand-ink text-white ring-4 ring-white shadow-lg">
                    <r.icon className="h-7 w-7" />
                  </div>
                  <p className="ml-7 md:ml-8 w-full rounded-2xl gradient-pdf py-5 pl-12 pr-6 md:pl-14 text-sm md:text-[15px] text-white leading-relaxed text-shadow-soft shadow-md">
                    {r.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 mt-20">
          <h3 className="font-display text-3xl md:text-4xl brand-navy" data-reveal>At <span className="bg-brand-ink text-white px-3 py-1">HT-POWER</span> … we provide</h3>
          <p className="mt-4 max-w-3xl brand-navy" data-reveal>Our services go beyond just pest elimination. We're committed to delivering value through protection, care, and peace of mind.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WE_PROVIDE.map((r, i) => (
              <div key={r.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 rounded-2xl bg-white border border-border p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-ink text-white">
                  <r.icon className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-extrabold brand-navy">{r.title}</h4>
                <p className="mt-2 text-sm brand-navy opacity-80 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="pdf-corners py-20 md:py-28 bg-[#f4f4f4]">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto" data-reveal>
            <p className="text-sm font-bold tracking-[0.2em] brand-royal">OUR SERVICES</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Unleash the ultimate defense against pests</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 rounded-2xl p-7 flex flex-col bg-white border border-[#d5dbe5] hover:border-[#18488f] hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-band text-white shadow">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-extrabold">{s.title}</h3>
                <p className="mt-2 text-sm text-[#162b57]/75">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
            <img src={weDoImg} alt="HT-Power technician treating a floor drain" loading="lazy" data-reveal
              className="opacity-0 w-full h-80 lg:h-[34rem] object-cover rounded-2xl shadow-lg" />
            <div>
              <h3 className="font-display text-3xl md:text-4xl brand-navy" data-reveal>At <span className="bg-brand-ink text-white px-3 py-1">HT-POWER</span> … we do</h3>
              <p className="mt-4 brand-navy" data-reveal>We offer a wide range of professional pest control services using science-based methods and modern equipment.</p>
              <ul className="mt-6 space-y-3">
                {WE_DO.map((w, i) => (
                  <li key={w.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                    className="opacity-0 flex gap-4 rounded-2xl bg-white border border-border p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-ink text-white">
                      <w.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm brand-navy leading-relaxed"><strong>{w.title}</strong> – {w.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20" data-reveal>
            <h3 className="font-display text-3xl md:text-4xl brand-navy">We deal</h3>
            <p className="mt-4 brand-navy">We are equipped to address a wide variety of pests with expertise and care.</p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PESTS.map((p, i) => (
              <div key={p.name} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 rounded-2xl gradient-pdf p-5 text-white shadow-md">
                <h4 className="font-extrabold leading-tight text-shadow-soft">{p.name}</h4>
                <p className="mt-1 text-sm leading-relaxed text-shadow-soft">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 relative rounded-2xl overflow-hidden" data-reveal>
            <img src={weServeImg} alt="HT-Power technician fogging the BYD showroom lounge" loading="lazy"
              className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4f4f4] to-transparent" />
          </div>
          <div className="mt-6" data-reveal>
            <h3 className="font-display text-3xl md:text-4xl brand-navy">At <span className="bg-brand-ink text-white px-3 py-1">HT-POWER</span> … we serve</h3>
            <p className="mt-4 brand-navy">We cater to a diverse range of clients, ensuring that every property — big or small — gets the protection it deserves.</p>
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {CATEGORIES.map((c, i) => (
              <div key={c.title} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 flex items-start gap-4 rounded-2xl gradient-card border border-[#d5dbe5] p-6">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-navy text-white shadow">
                  <c.icon className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-extrabold leading-tight">{c.title}</h4>
                  <p className="text-sm text-[#162b57]/75">{c.text}</p>
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
            <p className="mt-4 text-[#162b57]/70">Real projects, done with FDA-approved products and no hidden charges.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <button key={p.name} type="button" onClick={() => setLightbox({ p: i, i: 0 })} data-reveal style={{ animationDelay: `${i * 60}ms` }}
                className="opacity-0 group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all text-left cursor-zoom-in">
                <img src={p.imgs[0]} alt={p.name} loading="lazy"
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162b57]/85 via-[#162b57]/10 to-transparent" />
                {p.imgs.length > 1 && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold brand-navy">
                    <Images className="h-3.5 w-3.5" /> {p.imgs.length} photos
                  </span>
                )}
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="font-extrabold text-lg leading-tight">{p.name}</h3>
                  <p className="text-sm text-[#8ecce2] font-medium">{p.type}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-white/80"><MapPin className="h-3.5 w-3.5" /> {p.loc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* CLIENT LIST */}
          {/* Client list styled like the PDF's navy CLIENTS panels */}
          <div className="mt-20" data-reveal>
            <h3 className="font-display text-4xl md:text-5xl text-center brand-navy">CLIENTS</h3>
            <div className="mt-8 grid md:grid-cols-[1.6fr_1fr] gap-6">
              {[CLIENTS.slice(0, 1), CLIENTS.slice(1)].map((col, ci) => (
                <div key={ci} className="space-y-6">
                  {col.map((c) => (
                    <div key={c.group} className="rounded-xl bg-brand-ink text-white p-6 ring-4 ring-white shadow-lg">
                      <p className="font-extrabold uppercase">{c.group}</p>
                      <ul className="mt-3 list-disc pl-5 space-y-1 text-sm uppercase">
                        {c.names.map((n) => <li key={n}>{n}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm brand-navy opacity-70">Plus homeowners across Quezon City, Manila, Mandaluyong, Pasig, and BGC Taguig.</p>
          </div>
        </div>
      </section>

      {/* PROJECT IMAGE LIGHTBOX */}
      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent
          className="max-w-4xl w-[92vw] p-0 bg-transparent border-none shadow-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") stepPhoto(1);
            if (e.key === "ArrowLeft") stepPhoto(-1);
          }}>
          {lightbox && lbProject && (
            <>
              <DialogTitle className="sr-only">{lbProject.name}</DialogTitle>
              <div className="relative">
                <img src={lbProject.imgs[lightbox.i]} alt={`${lbProject.name} — photo ${lightbox.i + 1} of ${lbProject.imgs.length}`}
                  className="w-full max-h-[80vh] object-contain rounded-2xl" />
                {lbProject.imgs.length > 1 && (
                  <>
                    <button type="button" onClick={() => stepPhoto(-1)} aria-label="Previous photo"
                      className="absolute left-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/90 brand-navy shadow-lg hover:bg-white">
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button type="button" onClick={() => stepPhoto(1)} aria-label="Next photo"
                      className="absolute right-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/90 brand-navy shadow-lg hover:bg-white">
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              <div className="rounded-b-2xl bg-brand-ink px-5 py-4 text-white -mt-1 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-lg leading-tight">{lbProject.name}</h3>
                  <p className="text-sm text-[#8ecce2] font-medium">{lbProject.type}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-white/80"><MapPin className="h-3.5 w-3.5" /> {lbProject.loc}</p>
                </div>
                {lbProject.imgs.length > 1 && (
                  <span className="text-xs font-semibold text-white/80 shrink-0">{lightbox.i + 1} / {lbProject.imgs.length}</span>
                )}
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
            <p className="text-sm font-bold tracking-[0.2em] text-[#8ecce2]">CLIENT REVIEWS</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">What our clients say</h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} data-reveal className="opacity-0 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-7">
                <Quote className="h-8 w-8 text-[#8ecce2]" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#f2c200] text-[#f2c200]" />)}
                </div>
                <p className="mt-3 text-lg font-semibold">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#162b57] font-black">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-[#8ecce2]">Verified client · {t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING / HOW QUOTES WORK */}
      <section id="pricing" className="pdf-corners py-20 md:py-28 bg-[#e9ecf1]">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <h2 className="font-display text-3xl md:text-4xl brand-navy">HT-Power Pest Control helps you select the most effective treatment tailored to your unique needs and budget.</h2>
            <p className="mt-4 text-[#162b57]/70">
              Recognizing that every situation is unique, we implement the most effective treatment methods
              and management strategies for each condition.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-8 items-start">
            <div data-reveal className="opacity-0 rounded-2xl gradient-card border border-border p-7">
              <h3 className="font-extrabold text-lg brand-navy">What to expect</h3>
              <p className="mt-2 text-sm brand-navy opacity-75 leading-relaxed">
                To ensure we meet your needs precisely, we require an on-site inspection before providing a final
                quotation. This allows us to assess the area, understand your specific requirements, and offer the
                most accurate, cost-effective solution for your project.
              </p>
              <ul className="mt-5 space-y-3">
                {WHAT_TO_EXPECT.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm font-semibold brand-navy">
                    <CheckCircle2 className="h-5 w-5 shrink-0 brand-royal" /> {w}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className="opacity-0 rounded-2xl bg-white border border-border p-7">
              <h3 className="flex items-center gap-2 font-extrabold text-lg brand-navy">
                <CalendarClock className="h-5 w-5 brand-royal" /> Treatment schedules
              </h3>
              <p className="mt-2 text-sm brand-navy opacity-75 leading-relaxed">
                Our treatments are designed to address your unique requirements and can be scheduled as:
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {SCHEDULES.map((s) => (
                  <span key={s} className="rounded-xl gradient-card px-4 py-3 text-center text-sm font-bold brand-royal">{s}</span>
                ))}
              </div>
              {/* Navy offset frame like the PDF: same size as the photo, shifted up-left, so it never overflows */}
              <div className="relative mt-9 ml-3">
                <div className="absolute inset-0 -translate-x-3 -translate-y-3 bg-brand-ink rounded-lg" aria-hidden="true" />
                <img src={schedulesImg} alt="HT-Power technician setting up a rodent bait station" loading="lazy"
                  className="relative block w-full aspect-[4/3] object-cover object-center rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center max-w-2xl mx-auto" data-reveal>
            <p className="text-sm font-bold tracking-[0.2em] brand-royal">FAQ</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-12" data-reveal>
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="py-5 text-base font-bold brand-navy hover:no-underline hover:text-[#18488f]">{f.q}</AccordionTrigger>
                <AccordionContent className="brand-navy opacity-80 leading-relaxed text-[15px]">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section id="contact" className="relative py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-xl px-5">
          <h2 className="mb-10 text-center font-display text-4xl md:text-5xl" data-reveal>Time to Reclaim Your Space — Pest-Free!</h2>
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
            <p className="mt-4 text-sm text-white/60 max-w-xs">HT-Power — Powered by Trust. Driven by Quality. Committed to Protection.</p>
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
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 border-t border-[#d5dbe5] bg-white/95 shadow-[0_-4px_20px_rgba(22,43,87,0.1)]">
        <a href="tel:09927118665" className="flex items-center justify-center gap-2 py-3.5 font-bold text-[#162b57] border-r border-[#d5dbe5]">
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
    else if (!/^[A-Za-zÀ-ſ .'-]+$/.test(form.name.trim())) e.name = "Name can only contain letters";
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
    <div className="rounded-[2rem] border border-[#d5dbe5] gradient-card p-8 md:p-10" data-reveal>
      <h3 className="text-2xl font-black">Request a free quote</h3>
      <p className="mt-2 text-sm text-[#162b57]/80">Fill in your details and we'll get back to you shortly.</p>
      {status === "sent" ? (
        <div className="mt-8 rounded-2xl bg-white p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 brand-royal" />
          <p className="mt-3 font-semibold">Thanks, {form.name || "there"}!</p>
          <p className="text-sm text-[#162b57]/80">Your message was sent — we'll reply within one business day.</p>
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
            <label htmlFor="establishmentType" className="text-sm font-semibold text-[#162b57]">Establishment Type</label>
            <Select value={form.establishmentType} onValueChange={(v) => setForm((f) => ({ ...f, establishmentType: v }))}>
              <SelectTrigger id="establishmentType" aria-invalid={!!errs.establishmentType}
                className={`mt-1.5 h-auto w-full rounded-xl border bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-[#3365a2]/20 ${errs.establishmentType ? "border-red-400 focus:border-red-500" : "border-[#d5dbe5] focus:border-[#3365a2]"}`}>
                <SelectValue placeholder="Select establishment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Commercial Businesses">Commercial Businesses</SelectItem>
                <SelectItem value="Industrial & Warehouses">Industrial & Warehouses</SelectItem>
                <SelectItem value="Condo & Residential">Condo & Residential</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errs.establishmentType && <p className="mt-1 text-xs font-medium text-red-600">{errs.establishmentType}</p>}
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-semibold text-[#162b57]">Message</label>
            <textarea id="message" value={form.message} onChange={set("message")} rows={4} maxLength={2000} placeholder="Tell us about your pest concern..."
              aria-invalid={!!errs.message}
              className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#3365a2]/20 resize-none ${errs.message ? "border-red-400 focus:border-red-500" : "border-[#d5dbe5] focus:border-[#3365a2]"}`} />
            {errs.message && <p className="mt-1 text-xs font-medium text-red-600">{errs.message}</p>}
          </div>
          {status === "error" && (
            <p className="text-sm font-medium text-red-600">
              Couldn't send — email us directly at{" "}
              <a href="mailto:htpowerpestcontrol@gmail.com" className="underline">htpowerpestcontrol@gmail.com</a>.
            </p>
          )}
          <Button onClick={submit} disabled={status === "loading"}
            className="w-full h-12 bg-brand-navy hover:bg-[#11408a] text-white rounded-full font-semibold text-base disabled:opacity-60">
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
      <label htmlFor={props.id} className="text-sm font-semibold text-[#162b57]">{label}</label>
      <input {...props} aria-invalid={!!error}
        className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#3365a2]/20 ${error ? "border-red-400 focus:border-red-500" : "border-[#d5dbe5] focus:border-[#3365a2]"}`} />
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
