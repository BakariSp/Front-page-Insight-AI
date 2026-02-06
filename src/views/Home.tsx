import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoginBackground from '../components/LoginBackground';
import logo from '../logo.svg';

// Icons
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

// Showcase images per tab
const showcaseImages: string[][] = [
  ['/demo/dashboard-home.png', '/demo/insight-tools.png'],
  ['/demo/studio-chat.png', '/demo/studio-workflow.png'],
  ['/demo/grading-app.png', '/demo/essay-grading.png'],
  ['/demo/quiz-generator.png', '/demo/quiz-detail.png'],
];

// Pillar accent colors
const pillarColors = ['#4361EE', '#7B5EBF', '#0891B2', '#10B981', '#F97316'];

// Flywheel stage colors
const stageColors = ['#4361EE', '#7B5EBF', '#0891B2', '#10B981'];

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

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
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="Insight AI Logo" className="w-10 h-10" />
              <span className="text-2xl font-black tracking-tighter text-blue-600 uppercase">
                INSIGHT AI
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['mission', 'showcase', 'platform', 'pricing', 'partners'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm tracking-wide"
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
              <button
                onClick={() => navigate('/funding')}
                className="text-blue-600 hover:text-blue-800 font-bold transition-colors text-sm tracking-wide"
              >
                 {t('nav.funding')}
              </button>
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
                {['mission', 'showcase', 'platform', 'partners', 'contact'].map((item) => (
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
                   onClick={() => { navigate('/funding'); setMobileMenuOpen(false); }}
                   className="block text-lg font-bold text-blue-600 hover:text-blue-800"
                >
                   {t('nav.funding')}
                </button>
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

      {/* ==================== HERO ==================== */}
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
                {t('hero.subtitle')}
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

            {/* Product Image */}
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
                src="/demo/dashboard-home.png"
                alt="Dashboard Preview"
                className="w-full h-auto pt-8 bg-slate-50"
                onError={(e) => {e.currentTarget.style.display='none'}}
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/20 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== PAIN POINTS ==================== */}
      <section id="mission" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('painPoints.title')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('painPoints.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left: Pain points */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/60 backdrop-blur-sm border border-red-100 rounded-2xl p-8"
            >
              <h3 className="text-lg font-bold text-red-500 mb-6">{t('painPoints.leftTitle')}</h3>
              <div className="space-y-4">
                {(t('painPoints.pains', { returnObjects: true }) as string[]).map((pain, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg mt-0.5 flex-shrink-0">✕</span>
                    <span className="text-slate-700">{pain}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/60 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8"
            >
              <h3 className="text-lg font-bold text-emerald-500 mb-6">{t('painPoints.rightTitle')}</h3>
              <div className="space-y-4">
                {(t('painPoints.solutions', { returnObjects: true }) as string[]).map((solution, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-slate-700">{solution}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 max-w-5xl mx-auto"
          >
            <div className="bg-blue-50 rounded-xl py-4 px-6 text-center">
              <span className="text-blue-700 font-semibold text-sm md:text-base">{t('painPoints.tagline')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SCHOOL-BASED SYSTEM (5 Pillars) ==================== */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('schoolSystem.title')}</h2>
            <p className="text-base text-slate-600 max-w-3xl mx-auto">{t('schoolSystem.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
            {(t('schoolSystem.pillars', { returnObjects: true }) as { title: string; desc: string }[]).map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:bg-white/90 hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: pillarColors[index] }}></div>
                <div className="text-3xl font-black mb-3" style={{ color: pillarColors[index] }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT SHOWCASE (Tabs) ==================== */}
      <section id="showcase" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('showcase.title')}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">{t('showcase.subtitle')}</p>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {(t('showcase.tabs', { returnObjects: true }) as { label: string }[]).map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === idx
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-white/60 text-slate-600 border border-slate-200 hover:bg-white hover:border-blue-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {(t('showcase.tabs', { returnObjects: true }) as { title: string; desc: string; points: string[] }[]).map((tab, idx) => (
              activeTab === idx && (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  {/* Left: Text */}
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{tab.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{tab.desc}</p>
                    <ul className="space-y-3">
                      {tab.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start gap-3 text-sm text-slate-700">
                          <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Screenshots */}
                  <div className="space-y-4">
                    {showcaseImages[idx].map((imgSrc, imgIdx) => (
                      <div key={imgIdx} className="relative rounded-xl shadow-xl border border-slate-200/50 overflow-hidden bg-white">
                        <div className="absolute top-0 left-0 right-0 h-7 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 px-3 z-10">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <img
                          src={imgSrc}
                          alt={tab.title}
                          className="w-full h-auto pt-7 bg-slate-50"
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== FLYWHEEL ==================== */}
      <section className="py-24 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('flywheel.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {(t('flywheel.stages', { returnObjects: true }) as { label: string; title: string; items: string[] }[]).map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="relative bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200 overflow-hidden"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: stageColors[index] }}></div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: stageColors[index] }}>
                  {stage.label}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-4">{stage.title}</h3>
                <ul className="space-y-2">
                  {stage.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: stageColors[index] }}></span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Arrow to next (desktop only) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-slate-300 text-2xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10"
          >
            <div className="bg-blue-50 rounded-xl py-4 px-6 text-center max-w-4xl mx-auto">
              <span className="text-blue-700 font-semibold text-sm md:text-base italic">{t('flywheel.tagline')}</span>
            </div>
            <p className="text-center mt-4 text-sm text-slate-500">{t('flywheel.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* ==================== PLATFORM ==================== */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {['teacher', 'student', 'admin'].map((role, index) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="p-6 rounded-2xl border h-full bg-white/60 backdrop-blur-sm border-white/60 shadow-lg group hover:bg-white/95 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${getRoleColor(role)}`}>
                    {getRoleIcon(role)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{t(`platform.${role}.title`)}</h3>
                </div>

                <p className="text-slate-500 text-sm font-medium mb-4">
                  {t(`platform.${role}.desc`)}
                </p>

                <ul className="space-y-2.5 flex-grow">
                  {(t(`platform.${role}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRICING CTA ==================== */}
      <section id="pricing" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('pricing.title')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">{t('pricing.subtitle')}</p>

            {/* Platform highlight card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-3xl p-10 mb-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                {t('pricing.platform.badge')}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('pricing.platform.name')}</h3>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-5xl font-black text-blue-600">HK${t('pricing.platform.price')}</span>
                <span className="text-slate-500 font-medium">/ {i18n.language === 'zh' ? '年' : 'Year'}</span>
              </div>
              <p className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-bold mb-4">
                {t('pricing.platform.trial')}
              </p>
              <p className="text-slate-600 max-w-xl mx-auto mb-6">{t('pricing.platform.desc')}</p>
              <motion.button
                onClick={() => navigate('/funding')}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {i18n.language === 'zh' ? '查看完整方案與定價' : 'View Full Plans & Pricing'}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.button>
            </motion.div>

            {/* Robot partner note */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 max-w-2xl mx-auto"
            >
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-800">{t('pricing.robotPartner.title')}:</span>{' '}
                {t('pricing.robotPartner.desc')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section id="partners" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {[
                { logo: '/tsinghua_logo.png', alt: 'Tsinghua University', key: 'tsinghua' },
                { logo: '/UCB_logo.png', alt: 'UC Berkeley', key: 'ucBerkeley' },
                { logo: '/cityU_logo.png', alt: 'CityU HK', key: 'cityuHk' },
              ].map((partner, index) => (
                <motion.div
                  key={partner.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
                  className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
                >
                  <div className="h-20 flex items-center justify-center mb-6 p-2 group-hover:scale-105 transition-transform duration-300">
                    <img src={partner.logo} alt={partner.alt} className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t(`partners.${partner.key}`)}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section id="contact" className="py-16 relative z-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-14 shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-white">{t('cta.title')}</h2>
              <p className="text-lg text-slate-300 mb-8">{t('cta.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="mailto:contact@insightaihk.com"
                  className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta.button')}
                </motion.a>
                <span className="text-slate-400 text-sm">{t('cta.contact')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
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
                <li><a href="#showcase" className="hover:text-blue-600 transition-colors block py-1">{t('nav.showcase')}</a></li>
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

export default Home;
