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

function App() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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

  const floatingAnimation: any = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

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
              {['mission', 'platform', 'partners'].map((item) => (
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

            {/* Product Image with Floating Animation */}
            <motion.div
              variants={fadeInUp}
              animate={floatingAnimation}
              className="relative mx-auto w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden bg-white"
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

            <motion.div
               variants={fadeInUp}
               className="mt-16 pt-8 border-t border-slate-200/60"
            >
              <p className="text-sm text-slate-500 font-medium mb-6 uppercase tracking-wider">{t('hero.trustedBy')}</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                 <span className="font-bold text-xl text-slate-800 flex items-center gap-2">
                   <span className="text-2xl">🤖</span> {t('hero.partnerZhipu')}
                 </span>
                 <span className="font-bold text-xl text-slate-800 flex items-center gap-2">
                   <span className="text-2xl">🏛️</span> {t('hero.partnerBerkeley')}
                 </span>
                 <span className="font-bold text-xl text-slate-800 flex items-center gap-2">
                   <span className="text-2xl">🔬</span> {t('hero.partnerCityu')}
                 </span>
              </div>
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
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 hidden md:block"
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
              </motion.div>
            </motion.div>

            {/* Right Column: Features List */}
            <div className="space-y-6">
              {['direction1', 'direction2', 'direction3'].map((direction, index) => (
                <motion.div
                  key={direction}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300 flex gap-6"
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
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-3xl border transition-all duration-300 h-full bg-white/60 backdrop-blur-md border-white/60 shadow-lg group hover:bg-white/90 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10 hover:ring-1 hover:ring-blue-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-slate-100 group-hover:bg-blue-100 transition-colors duration-300">
                    {role === 'teacher' ? '👨‍🏫' : role === 'student' ? '🎓' : '📊'}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t(`platform.${role}.title`)}</h3>
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed min-h-[3rem]">
                  {t(`platform.${role}.desc`)}
                </p>
                
                <ul className="space-y-4">
                  {(t(`platform.${role}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="text-lg leading-none text-slate-400 group-hover:text-blue-500 transition-colors duration-300">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 transition-transform duration-300 hover:rotate-12">
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
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white transition-all duration-300 group flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
              >
                <div className="h-20 flex items-center justify-center mb-6 p-2 group-hover:scale-105 transition-transform">
                   <img src="/tsinghua_logo.png" alt="Tsinghua University" className="h-full w-auto object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('partners.tsinghua')}</h3>
              </motion.div>

               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white transition-all duration-300 group flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
              >
                <div className="h-20 flex items-center justify-center mb-6 p-2 group-hover:scale-105 transition-transform">
                   <img src="/UCB_logo.png" alt="UC Berkeley" className="h-full w-auto object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('partners.ucBerkeley')}</h3>
              </motion.div>

               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white transition-all duration-300 group flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
              >
                <div className="h-20 flex items-center justify-center mb-6 p-2 group-hover:scale-105 transition-transform">
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
