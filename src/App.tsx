import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import LoginBackground from './components/LoginBackground';
import logo from './logo.svg';
import './App.css';

// Icons for Core Values
const EfficientClosedLoopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const DataDrivenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-indigo-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const LocallyOptimizedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-cyan-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

// SVG Icons for Platform roles (replacing emoji for better visual)
const TeacherIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

const StudentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const AdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'teacher': return <TeacherIcon />;
    case 'student': return <StudentIcon />;
    case 'admin': return <AdminIcon />;
    default: return null;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'teacher': return 'text-blue-600 bg-blue-50 group-hover:bg-blue-100';
    case 'student': return 'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-100';
    case 'admin': return 'text-violet-600 bg-violet-50 group-hover:bg-violet-100';
    default: return 'text-slate-600 bg-slate-50';
  }
};

function App() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar with throttle for performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Helper function for comparison table icons
  const renderComparisonIcon = (val: string) => {
    if (val === 'check') {
      return (
        <svg className="w-5 h-5 text-green-500 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      );
    }
    if (val === 'cross') {
      return (
        <svg className="w-5 h-5 text-slate-200 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      );
    }
    if (val === 'minus') {
      return (
        <svg className="w-5 h-5 text-slate-300 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      );
    }
    return <span className="text-xs font-bold text-slate-700">{val}</span>;
  };

  // Animation variants
  const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Removed JS floating animation - now using CSS animation for better performance

  return (
    <div className="relative min-h-screen font-sans text-slate-800 selection:bg-blue-100">
      <LoginBackground />

      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img src={logo} alt="Insight AI Logo" className="w-10 h-10" />
              <span className="text-2xl font-black tracking-tighter text-blue-600 uppercase">
                INSIGHT AI
              </span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['mission', 'platform', 'pricing', 'partners'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm tracking-wide"
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
              <motion.button 
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-full hover:bg-white/50 transition-all"
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {i18n.language === 'en' ? '繁中' : 'EN'}
              </motion.button>
              <motion.a
                href="#contact"
                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full shadow-lg shadow-slate-900/20 hover:shadow-xl hover:bg-slate-800 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('nav.contact')}
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 text-slate-600 hover:text-slate-900"
              >
                <span className="sr-only">{t('nav.openMenu')}</span>
                <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 bg-current transform transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transform transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-lg"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {['mission', 'platform', 'partners', 'contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg font-medium text-slate-800 hover:text-blue-600"
                  >
                    {t(`nav.${item}`)}
                  </a>
                ))}
                <button 
                  onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                  className="mt-4 text-sm font-medium text-slate-500"
                >
                  {t('nav.switchLang')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-blue-100 text-blue-800 text-sm font-medium mb-8 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              {t('hero.badge')}
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t('hero.subtitle').split(' ').slice(0, 3).join(' ')}
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero.mission')}
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.a 
                href="#contact" 
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.cta')}
              </motion.a>
              <motion.a 
                href="#mission" 
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 rounded-full font-semibold text-lg hover:bg-white transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.ctaSecondary')}
              </motion.a>
            </motion.div>

            {/* Product Image with CSS Floating Animation for GPU acceleration */}
            <motion.div
              variants={fadeInUp}
              className="relative mx-auto w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden bg-white animate-float will-change-transform"
            >
              <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 border-b border-slate-200 flex items-center gap-2 px-4">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <img 
                src="/demo/demo-1.png" 
                alt="Dashboard Preview" 
                className="w-full h-auto pt-8 bg-slate-50"
                onError={(e) => {e.currentTarget.style.display='none'}} // Hide if image missing
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/20 to-transparent"></div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Mission Section (Split Layout) */}
      <section id="mission" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('mission.title')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('mission.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl transform rotate-3 scale-105 blur-2xl"></div>
              <img 
                src="/demo/demo-2.png" 
                alt="Platform Features" 
                className="relative rounded-3xl shadow-2xl border border-white/50 bg-white/50 backdrop-blur-sm z-10"
                onError={(e) => {e.currentTarget.style.display='none'}}
              />
              {/* Floating Badge - CSS animation for performance */}
              <div 
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 hidden md:block animate-float will-change-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">{t('hero.efficiency')}</p>
                    <p className="text-lg font-bold text-slate-900">+40%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Features List */}
            <div className="space-y-6">
              {['direction1', 'direction2', 'direction3'].map((direction, index) => (
                <motion.div
                  key={direction}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/80 transition-shadow duration-300 flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xl">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t(`mission.${direction}.title`)}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{t(`mission.${direction}.desc`)}</p>
                    <div className="flex flex-wrap gap-2">
                      {(t(`mission.${direction}.points`, { returnObjects: true }) as string[]).map((point, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-16 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('platform.title')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl">{t('platform.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {['teacher', 'student', 'admin'].map((role, index) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="p-8 rounded-3xl border h-full bg-white/60 backdrop-blur-sm border-white/60 shadow-lg group hover:bg-white/95 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-200 ease-out"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-200 ${getRoleColor(role)}`}>
                    {getRoleIcon(role)}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t(`platform.${role}.title`)}</h3>
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed min-h-[3rem]">
                  {t(`platform.${role}.desc`)}
                </p>
                
                <ul className="space-y-4">
                  {(t(`platform.${role}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="text-lg leading-none text-slate-400 group-hover:text-blue-500 transition-colors duration-200">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('pricing.title')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
            {(['essential', 'professional', 'enterprise'] as const).map((planKey, index) => {
              const isPopular = planKey === 'professional';
              const isEnterprise = planKey === 'enterprise';
              const highlightColors: Record<string, string> = {
                essential: 'bg-slate-700 hover:bg-slate-600',
                professional: 'bg-blue-600 hover:bg-blue-500',
                enterprise: 'bg-indigo-900 hover:bg-indigo-800'
              };
              const hoverBorderColors: Record<string, string> = {
                essential: 'hover:border-slate-400 hover:shadow-slate-200/50',
                professional: 'hover:border-blue-400 hover:shadow-blue-200/50',
                enterprise: 'hover:border-indigo-400 hover:shadow-indigo-200/50'
              };
              
              return (
                <motion.div
                  key={planKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`group relative flex flex-col bg-white/80 backdrop-blur-sm rounded-3xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:bg-white hover:z-20 border ${
                    isPopular 
                      ? 'border-blue-500 shadow-2xl shadow-blue-500/20 ring-4 ring-blue-50 md:scale-105 z-10' 
                      : `border-slate-200 shadow-lg ${hoverBorderColors[planKey]}`
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="p-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{t(`pricing.plans.${planKey}.name`)}</h3>
                        <p className="text-blue-600 font-semibold text-sm">{t(`pricing.plans.${planKey}.subtitle`)}</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-black tracking-tight text-slate-900">{t(`pricing.plans.${planKey}.price`)}</span>
                        <span className="ml-1 text-slate-500 text-sm">{t(`pricing.plans.${planKey}.period`)}</span>
                      </div>
                      {isEnterprise && (
                        <p className="text-xs text-indigo-600 font-medium mt-1">
                          {t('pricing.plans.enterprise.annualized')}
                        </p>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                      {t(`pricing.plans.${planKey}.description`)}
                    </p>
                    <motion.a 
                      href="#contact"
                      className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 ${highlightColors[planKey]} shadow-lg group-hover:shadow-xl`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t(`pricing.plans.${planKey}.button`)}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('pricing.comparison.title')}</h3>
              <p className="text-slate-500 max-w-2xl mx-auto">{t('pricing.comparison.subtitle')}</p>
            </div>
            
            <div className="overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200 max-w-5xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200">
                      <th className="px-6 py-6 text-left text-xs font-bold text-slate-400 uppercase tracking-widest w-2/5">{t('pricing.comparison.featureDetails')}</th>
                      <th className="px-4 py-6 text-xs font-bold text-slate-900 border-l border-slate-100">Essential</th>
                      <th className="px-4 py-6 text-xs font-bold text-blue-600 bg-blue-50/40 border-l border-slate-100">Professional</th>
                      <th className="px-4 py-6 text-xs font-bold text-indigo-900 border-l border-slate-100">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* Teaching Management */}
                    <tr className="bg-slate-50/40">
                      <td colSpan={4} className="px-6 py-3 text-left">
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{t('pricing.comparison.categories.teaching')}</span>
                      </td>
                    </tr>
                    {[
                      { key: 'classManagement', e: 'check', p: 'check', t: 'check' },
                      { key: 'ocr', e: 'check', p: 'check', t: 'check' },
                      { key: 'basicReports', e: 'check', p: 'check', t: 'check' },
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-4 text-left">
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{t(`pricing.comparison.features.${item.key}`)}</span>
                        </td>
                        <td className="px-4 py-4 border-l border-slate-100/50">{renderComparisonIcon(item.e)}</td>
                        <td className="px-4 py-4 bg-blue-50/10 border-l border-slate-100/50">{renderComparisonIcon(item.p)}</td>
                        <td className="px-4 py-4 border-l border-slate-100/50">{renderComparisonIcon(item.t)}</td>
                      </tr>
                    ))}
                    
                    {/* AI Native */}
                    <tr className="bg-slate-50/40">
                      <td colSpan={4} className="px-6 py-3 text-left">
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{t('pricing.comparison.categories.ai')}</span>
                      </td>
                    </tr>
                    {[
                      { key: 'zhipuAi', e: 'minus', p: 'check', t: 'check' },
                      { key: 'quizBuilder', e: 'cross', p: 'check', t: 'check' },
                      { key: 'aiGrading', e: 'cross', p: 'check', t: 'check' },
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-4 text-left">
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{t(`pricing.comparison.features.${item.key}`)}</span>
                        </td>
                        <td className="px-4 py-4 border-l border-slate-100/50">{renderComparisonIcon(item.e)}</td>
                        <td className="px-4 py-4 bg-blue-50/10 border-l border-slate-100/50">{renderComparisonIcon(item.p)}</td>
                        <td className="px-4 py-4 border-l border-slate-100/50">{renderComparisonIcon(item.t)}</td>
                      </tr>
                    ))}
                    
                    {/* Guided Learning */}
                    <tr className="bg-slate-50/40">
                      <td colSpan={4} className="px-6 py-3 text-left">
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{t('pricing.comparison.categories.learning')}</span>
                      </td>
                    </tr>
                    {[
                      { key: 'socratic', e: 'cross', p: 'check', t: 'check' },
                      { key: 'personalizedAnalysis', e: 'cross', p: 'check', t: 'check' },
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-4 text-left">
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{t(`pricing.comparison.features.${item.key}`)}</span>
                        </td>
                        <td className="px-4 py-4 border-l border-slate-100/50">{renderComparisonIcon(item.e)}</td>
                        <td className="px-4 py-4 bg-blue-50/10 border-l border-slate-100/50">{renderComparisonIcon(item.p)}</td>
                        <td className="px-4 py-4 border-l border-slate-100/50">{renderComparisonIcon(item.t)}</td>
                      </tr>
                    ))}
                    
                    {/* Architecture & Security */}
                    <tr className="bg-slate-50/40">
                      <td colSpan={4} className="px-6 py-3 text-left">
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{t('pricing.comparison.categories.architecture')}</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-4 text-left">
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{t('pricing.comparison.features.dataStorage')}</span>
                      </td>
                      <td className="px-4 py-4 border-l border-slate-100/50"><span className="text-xs font-bold text-slate-700">{t('pricing.comparison.values.cloud')}</span></td>
                      <td className="px-4 py-4 bg-blue-50/10 border-l border-slate-100/50"><span className="text-xs font-bold text-slate-700">{t('pricing.comparison.values.cloudDedicated')}</span></td>
                      <td className="px-4 py-4 border-l border-slate-100/50"><span className="text-xs font-bold text-slate-700">{t('pricing.comparison.values.private')}</span></td>
                    </tr>
                    {[
                      { key: 'gpuCluster', e: 'cross', p: 'cross', t: 'check' },
                      { key: 'offlineMode', e: 'cross', p: 'cross', t: 'check' },
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-4 text-left">
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">{t(`pricing.comparison.features.${item.key}`)}</span>
                        </td>
                        <td className="px-4 py-4 border-l border-slate-100/50">{renderComparisonIcon(item.e)}</td>
                        <td className="px-4 py-4 bg-blue-50/10 border-l border-slate-100/50">{renderComparisonIcon(item.p)}</td>
                        <td className="px-4 py-4 border-l border-slate-100/50">{renderComparisonIcon(item.t)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Suitability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(['essential', 'professional', 'enterprise'] as const).map((planKey, index) => {
              const cardStyles: Record<string, string> = {
                essential: 'bg-slate-100/60 border-slate-200/50',
                professional: 'bg-blue-50 border-blue-100 shadow-lg',
                enterprise: 'bg-indigo-50 border-indigo-100'
              };
              const titleStyles: Record<string, string> = {
                essential: 'text-slate-800',
                professional: 'text-blue-800',
                enterprise: 'text-indigo-800'
              };
              const descStyles: Record<string, string> = {
                essential: 'text-slate-600',
                professional: 'text-blue-700',
                enterprise: 'text-indigo-700'
              };
              const dotStyles: Record<string, string> = {
                essential: 'bg-slate-400',
                professional: 'bg-blue-600 animate-pulse',
                enterprise: 'bg-indigo-600'
              };
              
              return (
                <motion.div
                  key={planKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`p-8 rounded-3xl border ${cardStyles[planKey]}`}
                >
                  <h5 className={`font-bold mb-3 flex items-center ${titleStyles[planKey]}`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${dotStyles[planKey]}`}></div>
                    {t(`pricing.suitability.${planKey}.title`)}
                  </h5>
                  <p className={`text-sm leading-relaxed ${descStyles[planKey]}`}>
                    {t(`pricing.suitability.${planKey}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('value.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {['item1', 'item2', 'item3'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                   {index === 0 && <EfficientClosedLoopIcon />}
                   {index === 1 && <DataDrivenIcon />}
                   {index === 2 && <LocallyOptimizedIcon />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t(`value.${item}.title`)}</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs">{t(`value.${item}.desc`)}</p>
              </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Team & Partners Section */}
      <section id="partners" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Strategic Partner */}
          <div className="mb-24">
             <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{t('partners.strategicPartner')}</h2>
              <p className="text-slate-500">{t('partners.strategicPartnerDesc')}</p>
            </motion.div>
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-3xl p-12 max-w-3xl mx-auto hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="h-24 flex items-center justify-center mb-6">
                   <img src="/zhipu_logo.png" alt="Zhipu AI" className="h-full w-auto object-contain invert" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('partners.zhipu.name')}</h3>
                <p className="text-slate-600 leading-relaxed max-w-lg">{t('partners.zhipu.desc')}</p>
              </motion.div>
          </div>

          {/* Research Team */}
          <div className="relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('partners.researchTeam')}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">{t('partners.researchTeamDesc')}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="h-20 flex items-center justify-center mb-6 p-2 group-hover:scale-105 transition-transform duration-300">
                   <img src="/tsinghua_logo.png" alt="Tsinghua University" className="h-full w-auto object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('partners.tsinghua')}</h3>
              </motion.div>

               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="h-20 flex items-center justify-center mb-6 p-2 group-hover:scale-105 transition-transform duration-300">
                   <img src="/UCB_logo.png" alt="UC Berkeley" className="h-full w-auto object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('partners.ucBerkeley')}</h3>
              </motion.div>

               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="h-20 flex items-center justify-center mb-6 p-2 group-hover:scale-105 transition-transform duration-300">
                   <img src="/cityU_logo.png" alt="CityU HK" className="h-full w-auto object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('partners.cityuHk')}</h3>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-[3rem] p-12 md:p-20 shadow-2xl overflow-hidden relative"
          >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] bg-blue-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[80%] bg-purple-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-slate-900">{t('cta.title')}</h2>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
              <motion.a 
                href="mailto:contact@insightaihk.com" 
                className="inline-block px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('cta.button')}
              </motion.a>
              <p className="mt-8 text-slate-500 text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">{t('cta.contact')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-lg border-t border-slate-200 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="Insight AI Logo" className="w-8 h-8" />
                <span className="font-black text-xl text-blue-600 uppercase tracking-tight">INSIGHT AI</span>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">{t('footer.company')}</p>
              <p className="text-slate-500 text-sm flex items-center gap-2">
                <span className="text-lg">📍</span> {t('footer.location')}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">{t('footer.quickLinks')}</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#mission" className="hover:text-blue-600 transition-colors block py-1">{t('nav.mission')}</a></li>
                <li><a href="#platform" className="hover:text-blue-600 transition-colors block py-1">{t('nav.platform')}</a></li>
                <li><a href="#pricing" className="hover:text-blue-600 transition-colors block py-1">{t('nav.pricing')}</a></li>
                <li><a href="#partners" className="hover:text-blue-600 transition-colors block py-1">{t('nav.partners')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">{t('footer.legal')}</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#privacy" className="hover:text-blue-600 transition-colors block py-1">{t('footer.privacy')}</a></li>
                <li><a href="#terms" className="hover:text-blue-600 transition-colors block py-1">{t('footer.terms')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">{t('footer.contactTitle')}</h4>
              <a href="mailto:contact@insightaihk.com" className="text-sm text-slate-600 mb-4 hover:text-blue-600 transition-colors flex items-center gap-2">
                <span>✉️</span> contact@insightaihk.com
              </a>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">{t('footer.rights')}</p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              {t('footer.madeWith')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
