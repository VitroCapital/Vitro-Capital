/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode, FormEvent } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  ChevronRight, 
  ExternalLink, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  Layers, 
  MessageSquare,
  MessageCircle,
  Instagram,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Coins,
  Briefcase,
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveLead } from './lib/firebase';
// @ts-ignore
import familyWealthBanner from './assets/images/family_wealth_banner_1781200836124.jpg';
// @ts-ignore
import financialPlanningPeopleBg from './assets/images/financial_planning_people_bg_1781202749220.jpg';
// @ts-ignore
import wealthPlanningImg from './assets/images/wealth_planning_1781202535343.jpg';
// --- Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="mb-10 text-center">
              <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Consultoria Private</span>
              <h3 className="text-3xl font-serif italic text-white">{title}</h3>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ContactForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Gestão de Patrimônio'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveLead(formData);
      setSubmitted(true);
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <CheckCircle2 size={64} className="text-[#C5A059] mb-6 animate-pulse" />
        <h4 className="text-2xl font-serif italic text-white mb-4">Sua solicitação foi enviada.</h4>
        <p className="text-white/40 font-light max-w-xs">
          Um de nossos assessores entrará em contato em breve para um atendimento personalizado.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Identidade</label>
        <input 
          required
          type="text" 
          placeholder="Nome Completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] transition-colors outline-none font-light text-white"
        />
      </div>
      <div className="space-y-1 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
        <div className="space-y-2">
          <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">E-mail Seguro</label>
          <input 
            required
            type="email" 
            placeholder="seu@email.com.br"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] transition-colors outline-none font-light text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Telefone</label>
          <input 
            required
            type="tel" 
            placeholder="(11) 99999-9999"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] transition-colors outline-none font-light text-white"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Qual o assunto ou serviço de interesse?</label>
        <select 
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] transition-colors outline-none font-light text-white/40 appearance-none"
        >
          <option value="Gestão de Patrimônio" className="bg-[#0a0a0a]">Gestão de Patrimônio</option>
          <option value="Planejamento Sucessório" className="bg-[#0a0a0a]">Planejamento Sucessório</option>
          <option value="Investimentos Internacionais" className="bg-[#0a0a0a]">Investimentos Internacionais</option>
          <option value="Parceria B2B" className="bg-[#0a0a0a]">Parceria B2B</option>
        </select>
      </div>
      <button 
        disabled={isSubmitting}
        className="w-full bg-[#C5A059] text-black py-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4b57a] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
        {isSubmitting ? 'Processando...' : 'Enviar Mensagem'}
      </button>
    </form>
  );
};

const Navbar = ({ onOpenForm }: { onOpenForm: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'services', 'fluxo-atendimento', 'produtos-servicos', 'contact'];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 160; // offset for the navbar height + padding
      
      // If at the very bottom, highlight the last section (Contact)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('#contact');
        return;
      }

      let currentSection = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          let top = 0;
          let tempEl: HTMLElement | null = el;
          while (tempEl) {
            top += tempEl.offsetTop;
            tempEl = tempEl.offsetParent as HTMLElement;
          }
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = `#${id}`;
          }
        }
      }
      
      // If none of them matches directly but we are below the first section
      if (!currentSection) {
        const firstSec = document.getElementById(sectionIds[0]);
        if (firstSec && window.scrollY + 160 < firstSec.offsetTop) {
          currentSection = ''; // reset to top / none
        } else {
          // Find the closest one
          let minDiff = Infinity;
          let closestId = '';
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              let top = 0;
              let tempEl: HTMLElement | null = el;
              while (tempEl) {
                top += tempEl.offsetTop;
                tempEl = tempEl.offsetParent as HTMLElement;
              }
              const diff = Math.abs(window.scrollY + 160 - top);
              if (diff < minDiff) {
                minDiff = diff;
                closestId = `#${id}`;
              }
            }
          }
          currentSection = closestId;
        }
      }

      if (currentSection === '#services') {
        currentSection = '#fluxo-atendimento';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Initial call
    setTimeout(handleScrollSpy, 150);
    
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const navLinks = [
    { name: 'Quem somos', href: '#about' },
    { name: 'Assessoria', href: '#fluxo-atendimento' },
    { name: 'Produtos e Serviços', href: '#produtos-servicos' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav 
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-5 group">
          <div className="flex flex-col items-center">
            <span className="tracking-[0.25em] text-lg font-serif text-white leading-none mb-1">VITRO</span>
            <div className="flex items-center gap-2 w-full">
              <div className="h-[0.5px] flex-grow bg-white/20" />
              <span className="tracking-[0.5em] text-[7px] font-bold uppercase text-white/40 leading-none">CAPITAL</span>
              <div className="h-[0.5px] flex-grow bg-white/20" />
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-8 w-px bg-[#C5A059]/30" />
          
          {/* XP Box */}
          <div className="bg-black w-9 h-9 flex items-center justify-center rounded-md border border-white/10 shadow-lg group-hover:border-[#C5A059]/40 transition-colors">
            <span className="text-white text-base font-black tracking-tighter">xp</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[10px] font-bold relative pb-2 transition-colors duration-300 uppercase tracking-[0.25em] ${
                  isActive ? 'text-[#C5A059]' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavBorder" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <button 
            onClick={onOpenForm}
            className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] border-b border-[#C5A059]/50 pb-1 hover:text-[#d4b57a] hover:border-[#d4b57a] transition-all cursor-pointer font-sans"
          >
            Fale com um Especialista
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a] border-t border-white/10 py-12 px-12 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`text-sm font-bold uppercase tracking-[0.3em] flex items-center justify-between transition-colors ${
                      isActive ? 'text-[#C5A059]' : 'text-white hover:text-[#C5A059]/80'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />}
                  </a>
                );
              })}
              <button 
                onClick={onOpenForm}
                className="w-full bg-[#C5A059] text-black py-5 text-[11px] font-bold uppercase tracking-[0.3em]"
              >
                Fale com um Especialista
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenForm }: { onOpenForm: () => void }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-20 md:pb-32 overflow-hidden bg-[#0a0a0a]">
      {/* Background Image with Elegant Dark Overlays and Subtle Scale-in Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={familyWealthBanner} 
          alt="Família e legado" 
          className="w-full h-full object-cover object-center select-none filter contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle cinematic overlays for high contrast content reading */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-12 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.5em] uppercase mb-10">
              PARCEIRO ESTRATÉGICO XP INVESTIMENTOS
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-10 font-light italic max-w-5xl">
              Construindo patrimônio no <br/>
              <span className="not-italic font-normal text-white">mercado financeiro.</span>
            </h1>
            <p className="text-white/40 text-xl font-light leading-relaxed max-w-2xl mb-12 text-justify">
              A Vitro Capital oferece assessoria financeira sob medida e serviços de private wealth 
              para investidores, unindo expertise local com a força da XP Investimentos.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <button 
                onClick={onOpenForm}
                className="px-12 py-5 bg-[#C5A059] text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4b57a] transition-all transform hover:-translate-y-1"
              >
                Fale com um Especialista
              </button>
              <a 
                href="#fluxo-atendimento"
                className="px-12 py-5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 flex items-center justify-center font-sans"
              >
                Conheça nossa assessoria
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decor - Minimal lines */}
      <div className="absolute inset-0 opacity-10 flex justify-center pointer-events-none z-10">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-white to-transparent mx-32" />
        <div className="h-full w-px bg-gradient-to-b from-transparent via-white to-transparent mx-32" />
        <div className="h-full w-px bg-gradient-to-b from-transparent via-white to-transparent mx-32" />
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Gestão de Patrimônio',
      desc: 'Construção de portfólios personalizados.',
      tag: '01'
    },
    {
      title: 'Parceria XP Investimentos',
      desc: 'Acesso direto à infraestrutura robusta e à diversificada prateleira de produtos da XP Investimentos.',
      tag: '02'
    },
    {
      title: 'Assessoria Private',
      desc: 'Planejamentos personalizados adaptados às necessidades específicas de liquidez e tributação de cada família.',
      tag: '03'
    },
    {
      title: 'Sucessão Patrimonial',
      desc: 'Garantindo a transferência de riqueza de geração em geração através de governança e planejamentos robustos.',
      tag: '04'
    }
  ];

  return (
    <section id="services" className="bg-[#0a0a0a] border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-16 border-white/10 group cursor-default hover:bg-white/[0.03] transition-all ${
              i !== services.length - 1 ? 'lg:border-r' : ''
            } border-b lg:border-b-0`}
          >
            <span className="text-[#C5A059] text-[10px] font-bold tracking-widest block mb-6">{service.tag}</span>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-white">{service.title}</h4>
            <p className="text-white/40 text-xs leading-relaxed font-light text-justify">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProdutosEServicos = ({ onOpenForm }: { onOpenForm: () => void }) => {
  const products = [
    {
      title: 'Renda Fixa',
      icon: <Coins size={20} className="text-[#C5A059]" />,
      desc: 'Acesso diferenciado aos mercados de títulos bancários (CDBs, LCAs/LCIs), Crédito Privado (Debêntures, CRIs, CRAs) e Títulos Públicos.',
    },
    {
      title: 'Renda Variável',
      icon: <BarChart3 size={20} className="text-[#C5A059]" />,
      desc: 'Acesso a todo o mercado de renda variável disponível no Brasil (Ações, Fundos Imobiliários, mercados de derivativos e futuros.',
    },
    {
      title: 'Fundos de Investimentos',
      icon: <Briefcase size={20} className="text-[#C5A059]" />,
      desc: 'Principais gestores do mercado fazendo a gestão de portfólios.',
    },
    {
      title: 'Investimentos Globais',
      icon: <Globe size={20} className="text-[#C5A059]" />,
      desc: 'Diversificação da carteira em ativos globais (Bonds, Reits, Mutual Funds).',
    },
    {
      title: 'Previdência',
      icon: <Shield size={20} className="text-[#C5A059]" />,
      desc: 'Planejamento sob medida para sua aposentadoria, sucessão familiar e otimização tributária.',
    },
    {
      title: 'Seguros',
      icon: <HeartHandshake size={20} className="text-[#C5A059]" />,
      desc: 'Proteções em vida para proteger você e a sua família.',
    }
  ];

  const stages = [
    {
      num: '1ª etapa',
      title: 'Análise',
      desc: 'Mapeamento do seu momento atual de vida, fontes de renda, objetivos de longo prazo, organização financeira e perfil de investidor.',
    },
    {
      num: '2ª etapa',
      title: 'Apresentação do planejamento',
      desc: 'Plano exclusivo com alocações sob medida.',
    },
    {
      num: '3ª etapa',
      title: 'Alocação dos recursos',
      desc: 'Implementação do plano de investimentos apresentado.',
    },
    {
      num: '4ª etapa',
      title: 'Acompanhamento contínuo',
      desc: 'Monitoramento detalhado e contínuo de portfólio com revisões periódicas de todo o planejamento.',
    }
  ];

  return (
    <section className="bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden py-40">
      {/* Decorative subtle ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(197,160,89,0.02),rgba(0,0,0,0))]" />
      
      <div className="max-w-7xl mx-auto px-12 relative z-10">
        
        {/* Intro Section: O que é Financial Planning */}
        <div className="relative max-w-6xl mb-32 overflow-hidden rounded-sm border border-white/5 bg-[#0a0a0a] min-h-[500px] p-8 md:p-16 lg:p-20 flex items-center group">
          {/* Background Image with Elegant Dark Overlays and Scale-in Animation */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.img 
              initial={{ scale: 1.08, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.72 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              src={financialPlanningPeopleBg} 
              alt="Planejamento Financeiro de Patrimônio" 
              className="w-full h-full object-cover object-right lg:object-center select-none filter contrast-[1.06] brightness-[0.8]"
              referrerPolicy="no-referrer"
            />
            {/* Premium progressive gradient fading from left (darker for text) to right (clear image) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 md:via-[#0a0a0a]/65 to-[#0a0a0a]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
          </div>

          {/* Text content directly in the main container, maximizing image background feel */}
          <div className="relative z-10 max-w-2xl">
            <span className="text-[#C5A059] text-[9px] font-bold tracking-[0.4em] uppercase mb-4 block">
              VISÃO INTEGRADA ©
            </span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.12] font-light">
              O que é <br />
              <span className="italic text-[#C5A059]">Financial Planning?</span>
            </h3>
            <p className="text-white/85 text-base md:text-lg font-light leading-relaxed mt-8 font-sans text-justify">
              Financial Planning é o modelo de atendimento integrado de organização financeira completa, blindagem e crescimento sustentável do seu patrimônio global. Muito além de simplesmente escolher ativos de investimento isolados, o financial planning atua como a espinha dorsal que conecta seus investimentos, estrutura jurídica, eficiência fiscal e projetos de vida.
            </p>
          </div>

          {/* Minimal brand identifier in gold */}
          <div className="absolute bottom-6 right-6 font-mono text-[8px] text-[#C5A059]/85 tracking-[0.25em] uppercase pointer-events-none hidden md:block">
            VITRO PRIVATE ADVISORY
          </div>
        </div>

        {/* Nosso processo de atendimento ao cliente / Customer Stages Flow */}
        <div id="fluxo-atendimento" className="border-t border-white/5 pt-24 mb-32">
          <div className="mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div>
              <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Nossa Metodologia</span>
              <h3 className="text-4xl font-serif text-white tracking-tight italic font-light leading-none">
                Caminho do cliente: <br />
                <span className="not-italic font-normal">jornada do atendimento.</span>
              </h3>
            </div>
            <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed max-w-sm text-justify">
              Uma jornada para transformar seus objetivos em realidade.
            </p>
          </div>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[18px] h-0.5 bg-gradient-to-r from-[#C5A059]/10 via-[#C5A059]/30 to-[#C5A059]/10" />
            
            {/* Mobile connecting line */}
            <div className="lg:hidden absolute left-[18px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#C5A059] via-[#C5A059]/20 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="relative flex flex-col pl-12 lg:pl-0 group"
                >
                  {/* Timeline node anchor */}
                  <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-0 z-20 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#0a0a0a] border border-[#C5A059] flex items-center justify-center text-xs font-mono text-[#C5A059] font-bold shadow-[0_0_15px_rgba(197,160,89,0.15)] group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-black group-hover:shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-all duration-300 cursor-default">
                      {stage.num.charAt(0)}
                    </div>
                    {/* Pulsing decoration circle */}
                    <div className="absolute w-12 h-12 rounded-full border border-[#C5A059]/20 animate-pulse -z-10 group-hover:scale-125 transition-transform duration-500" />
                  </div>

                  {/* Content Card below node */}
                  <div className="mt-12 lg:mt-16 bg-[#0f0f0f]/50 border border-white/5 group-hover:border-[#C5A059]/20 p-8 rounded-sm hover:bg-[#121212] transition-all duration-300 flex flex-col justify-between min-h-[220px] relative">
                    
                    {/* Vertical small connection stem between horizontal flow line and card */}
                    <div className="hidden lg:block absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-[#C5A059]/30 group-hover:h-6 group-hover:bg-[#C5A059] transition-all duration-300" />

                    <div>
                      <span className="font-mono text-[9px] text-[#C5A059]/50 tracking-[0.15em] block mb-3 uppercase font-semibold">{stage.num}</span>
                      <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-4 group-hover:text-[#C5A059] transition-colors duration-300">
                        {stage.title}
                      </h4>
                      <p className="text-white/40 text-xs leading-relaxed font-light font-sans group-hover:text-white/60 transition-colors duration-300 text-justify">
                        {stage.desc}
                      </p>
                    </div>
                    
                    {/* Bottom animated border line on hover */}
                    <div className="h-[2px] w-0 bg-[#C5A059]/30 group-hover:w-full transition-all duration-500 mt-6" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div id="produtos-servicos" className="border-t border-white/5 pt-24">
          <div className="mb-16">
            <h4 className="text-2xl font-serif text-white tracking-tight leading-none">
              Nossas soluções de <span className="italic">atendimento private</span>
            </h4>
            <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed mt-4 max-w-xl font-sans">
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.title}
                className="p-8 bg-[#0e0e0e]/40 border border-white/5 py-10 rounded-sm group hover:bg-[#111111]/80 hover:border-[#C5A059]/30 transition-all duration-300 flex flex-col justify-between min-h-[240px]"
              >
                <div>
                  <div className="w-10 h-10 border border-white/5 group-hover:border-[#C5A059]/20 bg-[#161616] flex items-center justify-center rounded-sm mb-6 transition-colors duration-300">
                    {product.icon}
                  </div>
                  <h5 className="text-white text-base font-serif font-medium tracking-wide mb-3 group-hover:text-[#C5A059] transition-colors duration-300">
                    {product.title}
                  </h5>
                  <p className="text-white/40 text-xs leading-relaxed font-light font-sans group-hover:text-white/60 transition-colors text-justify">
                    {product.desc}
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#C5A059] transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-32 border border-white/5 bg-white/[0.01] p-12 relative overflow-hidden rounded-sm flex flex-col md:flex-row justify-between items-center gap-8 z-10">
          <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-[#C5A059]/[0.02] to-transparent pointer-events-none" />
          <div className="text-left relative z-10 max-w-xl">
            <span className="text-[#C5A059] text-[9px] font-bold tracking-[0.4em] uppercase mb-3 block">PLANEJAMENTO INTEGRAL</span>
            <h4 className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-snug">
              Pronto para elevar a gestão do seu <span className="italic font-light">patrimônio global?</span>
            </h4>
            <p className="text-white/40 text-xs mt-3 leading-relaxed font-light font-sans text-justify">
              Consulte nossa equipe especializada para estruturar um plano sob medida de investimentos, proteção jurídica e planejamento sucessório.
            </p>
          </div>
          <button
            onClick={onOpenForm}
            className="px-10 py-5 bg-[#C5A059] text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4b57a] transition-all transform hover:-translate-y-1 relative z-10"
          >
            Fale com um assessor
          </button>
        </div>

      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-40 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="relative group">
            <div className="aspect-square bg-white/[0.02] border border-white/10 rounded-sm overflow-hidden p-8 transition-all group-hover:border-[#C5A059]/50">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
                alt="Architecture" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Frame accent */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-[#C5A059]" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-[#C5A059]" />
          </div>

          <div>
            <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-8 block">
              QUEM SOMOS
            </span>
            <h3 className="text-5xl font-serif leading-[1.2] mb-10 font-light italic">
              Transparência e Clareza na <br />
              <span className="not-italic font-normal">construção dos seus Sonhos.</span>
            </h3>
            <div className="space-y-8 text-white/40 font-light leading-relaxed text-lg text-justify">
              <p>
                A origem do nome Vitro vem do latim e remete à transparência. 
                Acreditamos fortemente que a única forma de construir legado é através de 
                trabalho sério e com total alinhamento de interesses e expectativas. 
              </p>
              <p>
                Na Vitro, não buscamos apenas fazer negócios. Construímos relações duradouras, pautadas pelo cuidado, proximidade e compromisso com o patrimônio e os objetivos de cada cliente.
              </p>
              <p>
                Nosso time reúne profissionais de alto nível, com experiência sólida no mercado e foco total no cliente. Reconhecemos que cada pessoa tem trajetória e objetivos diferentes, por isso, cada planejamento que entregamos é construído sob medida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-8 block">
              CONSULTAS
            </span>
            <h2 className="text-6xl font-serif leading-[1.1] mb-12 font-light italic">
              Inicie sua <br />
              <span className="not-italic font-normal">Transformação.</span>
            </h2>
            <div className="space-y-12">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-4">Mande um E-mail</p>
                <a href="mailto:contato@vitrocapital.com.br" className="text-3xl font-serif text-white hover:text-[#C5A059] transition-colors border-b border-[#C5A059] pb-2 inline-block">
                  contato@vitrocapital.com.br
                </a>
              </div>
              <div className="flex gap-20">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-4">Porto Alegre</p>
                  <p className="text-white/60 font-light">Avenida Carlos Gomes 111, sala 404</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] p-16 border border-white/10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] pt-32 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-24 mb-32">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-5 mb-12 group">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="tracking-[0.25em] text-sm font-serif text-white leading-none mb-1">VITRO</span>
                  <div className="flex items-center gap-1.5 w-full">
                    <div className="h-[0.5px] flex-grow bg-white/20" />
                    <span className="tracking-[0.5em] text-[5px] font-bold uppercase text-white/40 leading-none">CAPITAL</span>
                    <div className="h-[0.5px] flex-grow bg-white/20" />
                  </div>
                </div>
                
                <div className="h-6 w-px bg-[#C5A059]/30" />
                
                <div className="bg-black w-7 h-7 flex items-center justify-center rounded-sm border border-white/10">
                  <span className="text-white text-[12px] font-black tracking-tighter">xp</span>
                </div>
              </div>
            </a>
            <p className="text-white/30 font-light leading-relaxed max-w-sm mb-12 text-justify">
              A principal assessoria financeira para líderes do mercado brasileiro. 
              Em parceria com a XP Investimentos para entregar excelência em gestão de patrimônio.
            </p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/vitrocapital" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[#C5A059] transition-all flex items-center gap-2 group/social">
                <Instagram size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover/social:opacity-100 transition-all">@vitrocapital</span>
              </a>
            </div>
          </div>
          
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white mb-8">Ecossistema</p>
            <ul className="space-y-5 text-white/30 text-[11px] font-medium tracking-wide">
              <li><a href="#" className="hover:text-white transition-colors">XP Investimentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Plataforma XP</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mercado Privado</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
            </ul>
          </div>
          
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white mb-8">Escritório</p>
            <ul className="space-y-5 text-white/30 text-[11px] font-medium tracking-wide">
              <li><a href="#" className="hover:text-white transition-colors">Nossa História</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Unidades</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ouvidoria</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white mb-8">Compliance</p>
            <ul className="space-y-5 text-white/30 text-[11px] font-medium tracking-wide">
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Código de Ética</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Regulação CVM</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Governança</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 mb-12">
          <p className="text-white/20 text-[10px] leading-relaxed text-justify font-sans">
            A VITRO CAPITAL ASSESSOR DE INVESTIMENTO LTDA, inscrita sob o CNPJ nº 66.685.497/0001-37 é uma empresa de Assessoria de Investimento devidamente registrada na Comissão de Valores Mobiliários na forma da Resolução CVM 178/23 (“Sociedade”), que mantém contrato de distribuição de produtos financeiros com a XP Investimentos Corretora de Câmbio, Títulos e Valores Mobiliários S.A. (“XP”) e pode, por conta e ordem dos seus clientes, operar no mercado de capitais segundo a legislação vigente. Na forma da legislação da CVM, o Assessor de Investimento não pode administrar ou gerir o patrimônio de investidores. O investimento em ações é um investimento de risco e rentabilidade passada não é garantia de rentabilidade futura. Na realização de operações com derivativos existe a possibilidade de perdas superiores aos valores investidos, podendo resultar em significativas perdas patrimoniais. A Sociedade poderá exercer atividades complementares relacionadas aos mercados financeiro, securitário, de previdência e capitalização, desde que não conflitem com a atividade de assessoria de investimentos, podendo ser realizada por meio da pessoa jurídica acima descrita ou por meio de pessoa jurídica terceira. Todas as atividades são prestadas mantendo a devida segregação e em cumprimento ao quanto previsto nas regras da CVM ou de outros órgãos reguladores e autorreguladores. Para informações e dúvidas sobre produtos, contate seu assessor de investimentos. Para reclamações, contate a Ouvidoria da XP pelo telefone 0800 722 3730.
          </p>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/10 text-[9px] font-bold uppercase tracking-[0.3em]">
            © 2026 Vitro Capital S.A. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-12 text-white/10 text-[9px] font-bold uppercase tracking-[0.3em]">
            <span>Parceiro Estratégico XP Investimentos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="selection:bg-[#C5A059] selection:text-black bg-[#0a0a0a]">
      <Navbar onOpenForm={() => setIsFormOpen(true)} />
      <main>
        <Hero onOpenForm={() => setIsFormOpen(true)} />
        <About />
        <Services />
        <ProdutosEServicos onOpenForm={() => setIsFormOpen(true)} />
        <Contact />
      </main>
      <Footer />

      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Agende uma Consulta"
      >
        <ContactForm onSuccess={() => setIsFormOpen(false)} />
      </Modal>

      {/* Persistent WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/5551999999999"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Fale conosco no WhatsApp"
      >
        <span className="absolute right-16 bg-black/95 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-2 rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Fale Conosco
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512" 
          className="w-7 h-7 fill-white"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </motion.a>
    </div>
  );
}
