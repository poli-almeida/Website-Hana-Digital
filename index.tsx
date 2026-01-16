
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowRight, Sparkles, Loader2, Search, GraduationCap, Cpu,
  Plus, Minus, Shield, Instagram, Linkedin, Twitter,
  Activity, Globe, Zap, Mail, Phone
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// CONFIGURAÇÃO BITRIX24 (Placeholder - Insira sua URL de Webhook aqui)
const BITRIX_WEBHOOK_URL = ''; 

type Language = 'pt' | 'en' | 'es';

const clientList = [
  "PW Inteligência de Mercado",
  "Allomni E-commerce Partner",
  "Flare Digital",
  "Red Rock Solutions",
  "Grupo LKX",
  "Gazeta do Povo",
  "Vizantu"
];

const BrainCircuit = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 .94 4.92 2.5 2.5 0 0 0 0 5.08 2.5 2.5 0 0 0-.94 4.92 2.5 2.5 0 0 0 1.98 3 2.5 2.5 0 0 0 4.96-.46" />
    <path d="M12 4.5a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1-.94 4.92 2.5 2.5 0 0 1 0 5.08 2.5 2.5 0 0 1 .94 4.92 2.5 2.5 0 0 1-1.98 3 2.5 2.5 0 0 1-4.96-.46" />
    <path d="M9 12h6" /><path d="M12 9v6" />
  </svg>
);

const content = {
  pt: {
    nav: { contact: "Consultoria", solutions: "Soluções", method: "Método", faq: "FAQ" },
    hero: {
      tag: "THE AI INTELLIGENCE UNIT",
      title: "Faremos seus Agentes de IA",
      accent: "Trabalharem por você",
      desc: "Transformamos operações tradicionais em ecossistemas AI-First. Recupere o tempo estratégico da sua equipe com automação de elite.",
      cta: "Contratar Consulta de IA"
    },
    trust: "LIDERANDO A TRANSFORMAÇÃO EM",
    problem: {
      tag: "ESTRATEGIA",
      title: "Equipe sobrecarregada?",
      desc: "IA não é apenas automação — é inteligência estratégica integrada. Estruturamos sua empresa com mentalidade AI First para eliminar gargalos e maximizar o ROI."
    },
    solutions: {
      title: "Soluções de Elite",
      items: [
        { t: "Análise Estratégica", d: "Mapeamos onde sua operação perde tempo e montamos seu plano de IA em 7 dias.", icon: <Search size={24} /> },
        { t: "Letramento em IA", d: "Treinamos sua liderança para que usem IA com confiança, ética e segurança total.", icon: <GraduationCap size={24} /> },
        { t: "Consultoria Gen IA", d: "Curadoria técnica das melhores ferramentas para o seu negócio.", icon: <BrainCircuit size={24} /> },
        { t: "Agentes e Sistemas", d: "Desenvolvimento de agentes autônomos para vendas e logística.", icon: <Cpu size={24} /> }
      ]
    },
    method: {
      title: "Método Hana",
      steps: [
        { n: "01", t: "Cadastro", d: "Preencha o formulário de consulta rápida." },
        { n: "02", t: "Contato", d: "Analisamos seu modelo de negócio e dores." },
        { n: "03", t: "Consulta", d: "Diagnóstico profundo com um especialista IA." },
        { n: "04", t: "Proposta", d: "Apresentamos a arquitetura de escala ideal." }
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "A IA vai substituir minha equipe?", a: "Pelo contrário. Nosso foco é 'Human-in-the-loop'. A IA assume as tarefas repetitivas, permitindo que seu time foque em inovação." },
        { q: "Meus dados estarão seguros?", a: "Sim. Trabalhamos com modelos privados e infraestrutura enterprise." },
        { q: "Quanto tempo para os primeiros resultados?", a: "Implementamos os primeiros processos em 15 dias." }
      ]
    },
    tool: {
      title: "Diagnóstico Imediato",
      desc: "Qual processo trava sua escala hoje? Receba um parecer técnico da nossa IA e agende com a CEO Poliana Almeida.",
      placeholder: "Descreva seu maior gargalo operacional...",
      button: "Gerar Parecer Estratégico",
      loading: "Analisando..."
    },
    bitrix_cta: "Agendar Diagnóstico com Poliana Almeida",
    langName: "Português"
  },
  en: {
    nav: { contact: "Consulting", solutions: "Solutions", method: "Method", faq: "FAQ" },
    hero: {
      tag: "THE AI INTELLIGENCE UNIT",
      title: "We Make AI Agents",
      accent: "Work for you",
      desc: "Transforming traditional operations into AI-First ecosystems. Regain your team's strategic time with elite automation.",
      cta: "Hire AI Consultation"
    },
    trust: "LEADING TRANSFORMATION ACROSS",
    problem: {
      tag: "STRATEGY",
      title: "Team overwhelmed?",
      desc: "AI isn't just automation—it's integrated strategy. We structure your business with an AI First mindset to eliminate bottlenecks and maximize ROI."
    },
    solutions: {
      title: "Elite Solutions",
      items: [
        { t: "Strategic Analysis", d: "We map where your operation loses time and build your AI plan in 7 days.", icon: <Search size={24} /> },
        { t: "AI Literacy", d: "We train your leadership to use AI with absolute confidence, ethics, and safety.", icon: <GraduationCap size={24} /> },
        { t: "Gen AI Consulting", d: "Technical curation and setup of the best tools for your business.", icon: <BrainCircuit size={24} /> },
        { t: "Agents & Systems", d: "Development of autonomous agents for sales and logistics.", icon: <Cpu size={24} /> }
      ]
    },
    method: {
      title: "Hana Method",
      steps: [
        { n: "01", t: "Signup", d: "Fill out the quick consultation form." },
        { n: "02", t: "Contact", d: "We analyze your business model and pains." },
        { n: "03", t: "Consultation", d: "Deep diagnosis with an AI specialist." },
        { n: "04", t: "Proposal", d: "We present the ideal scaling architecture." }
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "Will AI replace my team?", a: "No. Our focus is 'Human-in-the-loop'. AI handles repetitive tasks." },
        { q: "Is my data secure?", a: "Yes. We work with private models and enterprise infrastructure." },
        { q: "How long for initial results?", a: "We implement initial processes within 15 days." }
      ]
    },
    tool: {
      title: "Immediate Diagnosis",
      desc: "Which process slows your scale today? Get a technical opinion and book a meeting with Poliana Almeida.",
      placeholder: "Describe your operational bottleneck...",
      button: "Generate Strategic Opinion",
      loading: "Processing..."
    },
    bitrix_cta: "Book Diagnosis with Poliana Almeida",
    langName: "English"
  },
  es: {
    nav: { contact: "Consultoría", solutions: "Soluciones", method: "Método", faq: "FAQ" },
    hero: {
      tag: "THE AI INTELLIGENCE UNIT",
      title: "Haremos que Agentes IA",
      accent: "Trabajen por ti",
      desc: "Transformamos operaciones tradicionales en ecosistemas AI-First. Recupere tiempo estratégico con automatización de élite.",
      cta: "Contratar Consulta de IA"
    },
    trust: "LIDERANDO LA TRANSFORMACIÓN EN",
    problem: {
      tag: "ESTRATEGIA",
      title: "¿Equipo sobrecargado?",
      desc: "La IA no es solo automatización—es estrategia integrada. Estructuramos su empresa con mentalidad AI First para maximizar el ROI."
    },
    solutions: {
      title: "Soluciones de Élite",
      items: [
        { t: "Análisis Estratégico", d: "Mapeamos dónde pierde tiempo su operação e armamos seu plano de IA em 7 dias.", icon: <Search size={24} /> },
        { t: "Alfabetización IA", d: "Entrenamos a su equipo para usar la IA con total confianza y seguridad.", icon: <GraduationCap size={24} /> },
        { t: "Consultoría Gen IA", d: "Curaduría técnica de las mejores herramientas.", icon: <BrainCircuit size={24} /> },
        { t: "Agentes y Sistemas", d: "Desarrollo de agentes autónomos para ventas y logística.", icon: <Cpu size={24} /> }
      ]
    },
    method: {
      title: "Método Hana",
      steps: [
        { n: "01", t: "Registro", d: "Complete el formulario de consulta rápida." },
        { n: "02", t: "Contacto", d: "Analizamos su modelo de negocio y dolores." },
        { n: "03", t: "Consulta", d: "Diagnóstico profundo con un especialista IA." },
        { n: "04", t: "Propuesta", d: "Presentamos la arquitectura de escala ideal." }
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "¿La IA reemplazará a mi equipo?", a: "No. Nuestro enfoque es 'Human-in-the-loop'." },
        { q: "¿Mis datos estarán seguros?", a: "Sí. Utilizamos infraestructuras empresariales con encriptación avanzada." }
      ]
    },
    tool: {
      title: "Diagnóstico Inmediato",
      desc: "¿Qué proceso frena tu escala hoy? Recibe una opinión técnica y agenda con Poliana Almeida.",
      placeholder: "Describe tu cuello de botella...",
      button: "Generar Parecer Estratégico",
      loading: "Analizando..."
    },
    bitrix_cta: "Agendar Diagnóstico con Poliana Almeida",
    langName: "Español"
  }
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .glass, .interactive')) setIsHovering(true);
      else setIsHovering(false);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[999] hidden md:block"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 122, 0, 0.15)' : 'rgba(255, 122, 0, 0.5)',
        border: isHovering ? '1px solid rgba(255, 122, 0, 0.5)' : 'none',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
      style={{ borderRadius: '50%' }}
    />
  );
};

const LogoIcon = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <g className="star-animate">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect
          key={deg}
          x="44"
          y="15"
          width="12"
          height="30"
          rx="6"
          fill="currentColor"
          transform={`rotate(${deg} 50 50)`}
          style={{ transformOrigin: 'center' }}
        />
      ))}
    </g>
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group interactive">
    <LogoIcon className="text-brand-orange group-hover:scale-110 transition-transform duration-500" />
    <span className="text-xl md:text-2xl font-bold tracking-tight text-white">Hana</span>
  </div>
);

const FAQItem: React.FC<{ item: { q: string, a: string } }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-6 md:py-8 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group interactive"
      >
        <h4 className="text-base md:text-xl font-bold text-white group-hover:text-brand-orange transition-colors pr-8">{item.q}</h4>
        {isOpen ? <Minus size={18} className="text-brand-orange shrink-0" /> : <Plus size={18} className="text-zinc-600 shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-zinc-500 text-sm md:text-lg leading-relaxed max-w-3xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RevealOnScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = content[lang];
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleCTAClick = async (origin: string, additionalData: any = {}) => {
    console.log(`Lead from: ${origin}`, additionalData);
    if (BITRIX_WEBHOOK_URL) {
      try {
        await fetch(BITRIX_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              TITLE: `Lead Site - ${origin}`,
              NAME: additionalData.name || 'Anonymous',
              COMMENTS: additionalData.comments || `Origin: ${origin} (Lang: ${lang})`,
              SOURCE_ID: 'WEB',
            }
          })
        });
      } catch (e) { console.error("Bitrix Error:", e); }
    }
    window.open('https://wa.me/5541996120258', '_blank');
  };

  const handleAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const currentT = content[lang];
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are Hana, the core intelligence of Hana Digital. 
          
          MANDATORY RULES:
          1. RESPOND STRICTLY IN: ${currentT.langName}.
          2. BE EXTREMELY CONCISE (max 100 words).
          3. STRUCTURE:
             - **Quick Diagnosis**: Point out the main flaw.
             - **AI Action**: How our agents solve it in 15 days.
             - **Next Step**: End with an invitation for a strategic diagnostic with Poliana Almeida, CEO of Hana Digital.`,
          temperature: 0.4
        }
      });
      setResult(response.text);
      handleCTAClick('AI_GENERATED', { comments: `Prompt: ${prompt}` });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black cursor-default md:cursor-none selection:bg-brand-orange/30 overflow-x-hidden">
      <CustomCursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-orange z-[200] origin-left" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-[150] px-6 md:px-20 py-4 md:py-8 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4 md:gap-12 glass px-6 md:px-10 py-3 md:py-4 rounded-full border-white/5">
          <div className="hidden lg:flex gap-8">
            <a href="#solucoes" className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors interactive">{t.nav.solutions}</a>
            <a href="#metodo" className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors interactive">{t.nav.method}</a>
            <a href="#faq" className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors interactive">{t.nav.faq}</a>
            <div className="w-px h-3 bg-white/10 self-center mx-2"></div>
          </div>
          <div className="flex gap-4">
            {(['pt', 'en', 'es'] as Language[]).map(l => (
              <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-bold tracking-widest uppercase transition-all interactive ${lang === l ? 'text-brand-orange' : 'text-zinc-600'}`}>{l}</button>
            ))}
          </div>
          <button onClick={() => handleCTAClick('NAV_CTA')} className="hidden sm:block btn-luxury px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[10px] interactive">{t.nav.contact}</button>
        </div>
      </nav>

      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 md:px-20 max-w-[100rem] mx-auto min-h-screen flex items-center overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center w-full">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="lg:col-span-7 z-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <span className="h-px w-6 md:w-8 bg-brand-orange/50"></span>
              <span className="text-brand-orange font-bold text-[9px] md:text-[10px] tracking-[0.4em] uppercase">{t.hero.tag}</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[8.5rem] font-bold text-white mb-8 md:mb-10 leading-[0.9] tracking-tighter">
              {t.hero.title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-gold">{t.hero.accent}</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-2xl leading-relaxed max-w-2xl mb-12 md:mb-14 font-medium mx-auto lg:mx-0">{t.hero.desc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 md:gap-10">
              <button onClick={() => handleCTAClick('HERO_CTA')} className="w-full sm:w-auto btn-luxury px-12 md:px-14 py-6 md:py-7 rounded-full flex items-center justify-center gap-5 text-xs group interactive relative overflow-hidden">
                <span className="relative z-10 uppercase tracking-widest">{t.hero.cta}</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="lg:col-span-5 relative hidden lg:flex justify-end">
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
               <div className="absolute inset-0 bg-brand-orange/5 rounded-full blur-[140px] animate-pulse"></div>
               <div className="relative z-10 w-80 h-80 glass rounded-[5rem] flex items-center justify-center border-white/5 shadow-2xl">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-0 p-8 opacity-10"><LogoIcon className="w-full h-full text-brand-orange" /></motion.div>
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-20 flex flex-col items-center">
                     <div className="w-20 h-20 bg-brand-orange rounded-3xl shadow-[0_0_40px_rgba(255,122,0,0.3)] flex items-center justify-center mb-6"><Zap className="text-black" size={32} /></div>
                     <div className="text-white font-bold text-[8px] tracking-[0.5em] uppercase opacity-30">Hana Engine Ready</div>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y border-white/5 bg-black overflow-hidden relative">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div initial={{ x: 0 }} animate={{ x: "-50%" }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32">
            {[...clientList, ...clientList].map((client, idx) => (
              <span key={idx} className="text-xl md:text-3xl font-bold tracking-tighter text-zinc-800 hover:text-white transition-colors cursor-default select-none uppercase">{client}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="solucoes" className="py-32 md:py-48 px-6 max-w-[100rem] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 md:mb-32 text-center lg:text-left">
           <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">{t.solutions.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {t.solutions.items.map((item, i) => (
            <motion.div whileHover={{ y: -10 }} key={i} className="glass p-10 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/5 hover:border-brand-orange/40 transition-all duration-500 group interactive">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center text-brand-orange mb-8 md:mb-12 group-hover:bg-brand-orange group-hover:text-black transition-all duration-500">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white tracking-tight uppercase">{item.t}</h3>
              <p className="text-zinc-500 text-sm md:text-lg leading-relaxed">{item.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-48 px-6">
        <div className="max-w-[100rem] mx-auto glass p-8 md:p-32 rounded-[3.5rem] md:rounded-[6rem] grid lg:grid-cols-2 gap-16 md:gap-32 items-center border-white/5">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-8xl font-bold mb-8 md:mb-12 text-white tracking-tighter">{t.tool.title}</h2>
            <p className="text-zinc-500 text-lg md:text-2xl mb-12 md:mb-16 leading-relaxed max-w-xl mx-auto lg:mx-0">{t.tool.desc}</p>
          </div>
          <div className="relative">
            <div className="bg-white/[0.02] rounded-[2.5rem] md:rounded-[4rem] p-3 border border-white/5 focus-within:border-brand-orange/30 transition-all duration-500">
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={t.tool.placeholder} className="w-full h-64 md:h-80 bg-transparent rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 outline-none text-base md:text-xl font-medium text-white resize-none placeholder:text-zinc-700" />
            </div>
            <button onClick={handleAI} disabled={loading || !prompt.trim()} className="mt-8 md:mt-10 w-full btn-luxury py-8 md:py-10 rounded-full flex items-center justify-center gap-5 text-[10px] group interactive">
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
              <span className="font-bold tracking-[0.3em] uppercase">{loading ? t.tool.loading : t.tool.button}</span>
            </button>
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-10 p-8 md:p-12 bg-brand-orange/[0.03] border border-brand-orange/20 rounded-[2.5rem] md:rounded-[4rem] backdrop-blur-3xl overflow-hidden">
                  <div className="prose prose-invert max-w-none text-zinc-300 text-base md:text-xl leading-relaxed font-medium prose-strong:text-brand-orange">{result}</div>
                  <div className="mt-8 pt-8 border-t border-brand-orange/10">
                    <button onClick={() => handleCTAClick('AI_RESULT_ACTION')} className="flex items-center gap-3 text-brand-orange text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors interactive">
                      <ArrowRight size={16} /> {t.bitrix_cta}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="py-20 md:py-32 px-6 md:px-20 border-t border-white/5 bg-black">
        <div className="max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="mt-8 md:mt-12 text-zinc-600 text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase leading-relaxed max-w-xs">Arquitetura de performance e soberania digital.</p>
          </div>
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-10">
            <span className="text-brand-orange font-bold text-[9px] md:text-[10px] tracking-widest uppercase">Contact</span>
            <div className="flex flex-col gap-6">
              <button onClick={() => handleCTAClick('FOOTER_MAIL')} className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors interactive">
                <Mail size={16} className="text-brand-orange shrink-0" />
                <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-widest">contato@polianaalmeida.com</span>
              </button>
              <button onClick={() => handleCTAClick('FOOTER_PHONE')} className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors interactive">
                <Phone size={16} className="text-brand-orange shrink-0" />
                <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-widest">+55 41 9 9612-0258</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
