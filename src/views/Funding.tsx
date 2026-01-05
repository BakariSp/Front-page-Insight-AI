import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoginBackground from '../components/LoginBackground';
import logo from '../logo.svg';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const ChipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
    </svg>
);

const TimeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const HardwareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
  </svg>
);

const PlatformIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const TeachingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.499 5.24 50.534 50.534 0 0 0-2.658.813m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

const KpiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
  </svg>
);


const Funding = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const flowSteps = [
    { num: '1', title: t('funding.flow.step1.title'), desc: t('funding.flow.step1.desc'), icon: MoneyIcon },
    { num: '2', title: t('funding.flow.step2.title'), desc: t('funding.flow.step2.desc'), icon: HardwareIcon },
    { num: '3', title: t('funding.flow.step3.title'), desc: t('funding.flow.step3.desc'), icon: PlatformIcon },
    { num: '4', title: t('funding.flow.step4.title'), desc: t('funding.flow.step4.desc'), icon: TeachingIcon },
    { num: '5', title: t('funding.flow.step5.title'), desc: t('funding.flow.step5.desc'), icon: KpiIcon },
  ];

  const architectureLayers = [
    { layer: t('funding.pipeline.layer1.name'), desc: t('funding.pipeline.layer1.desc'), color: 'bg-green-100 text-green-700' },
    { layer: t('funding.pipeline.layer2.name'), desc: t('funding.pipeline.layer2.desc'), color: 'bg-blue-100 text-blue-700' },
    { layer: t('funding.pipeline.layer3.name'), desc: t('funding.pipeline.layer3.desc'), color: 'bg-indigo-100 text-indigo-700' },
  ];

  return (
    <div className="relative min-h-screen font-sans text-slate-800 selection:bg-blue-100">
      <LoginBackground />
      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="Insight AI Logo" className="w-10 h-10" />
              <span className="text-2xl font-black tracking-tighter text-blue-600 uppercase">INSIGHT AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm tracking-wide">
                {t('nav.mission')}
              </button>
               <button onClick={() => navigate('/#platform')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm tracking-wide">
                {t('nav.platform')}
              </button>
               <button onClick={() => navigate('/funding')} className="text-blue-600 font-bold transition-colors text-sm tracking-wide">
                {t('nav.funding')}
              </button>
              <button 
                onClick={toggleLanguage}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-full hover:bg-white/50 transition-all"
              >
                {i18n.language === 'en' ? '繁中' : 'EN'}
              </button>
              <a href="mailto:contact@insightaihk.com" className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-slate-800 transition-all">
                {t('nav.contact')}
              </a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
                <span className="sr-only">{t('nav.openMenu')}</span>
                 <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-left font-medium text-slate-800 py-2">{t('nav.mission')}</button>
                <button onClick={() => { navigate('/funding'); setMobileMenuOpen(false); }} className="text-left font-medium text-blue-600 py-2">{t('nav.funding')}</button>
                <button onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }} className="text-left text-sm text-slate-500 py-2">{t('nav.switchLang')}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - EDB Scheme Official Style (White Background Version) */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background decorative elements - lighter for white theme */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 border border-blue-100 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-amber-100 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-slate-100 rotate-45"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
            {/* Official Badge */}
            <span className="inline-block px-5 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm text-blue-700 border border-blue-100 text-sm font-bold mb-8 shadow-sm">
              {t('funding.edbScheme.badge')}
            </span>
            
            {/* Main Title */}
            <div className="relative inline-block mb-6">
              <div className="absolute -left-6 top-0 text-slate-300/50 text-6xl font-serif">“</div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight px-4 tracking-tight">
                {t('funding.title')}
              </h1>
              <div className="absolute -right-6 bottom-0 text-slate-300/50 text-6xl font-serif leading-none">”</div>
            </div>
            
            {/* Subtitle */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                {t('funding.subtitle')}
              </p>
            </div>

            {/* Key Info Cards - Adapted for light theme */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
              {/* Grant Amount */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-amber-200 shadow-xl shadow-amber-100/50"
              >
                <div className="text-sm font-bold uppercase tracking-wider mb-2 text-amber-600">{t('funding.edbScheme.grantLabel')}</div>
                <div className="text-3xl md:text-4xl font-black text-slate-900">{t('funding.edbScheme.grantAmount')}</div>
              </motion.div>
              
              {/* Period */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200 shadow-lg shadow-slate-100"
              >
                <div className="text-sm font-bold uppercase tracking-wider mb-2 text-slate-500">{t('funding.edbScheme.periodLabel')}</div>
                <div className="text-lg md:text-xl font-bold text-slate-800">{t('funding.edbScheme.period')}</div>
              </motion.div>
              
              {/* Deadline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-red-100 shadow-xl shadow-red-50"
              >
                <div className="text-sm font-bold uppercase tracking-wider mb-2 text-red-500">{t('funding.edbScheme.deadlineLabel')}</div>
                <div className="text-lg md:text-xl font-bold text-slate-800">{t('funding.edbScheme.deadline')}</div>
              </motion.div>
            </div>

            {/* Consultation CTA */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full text-slate-600 text-sm shadow-sm hover:shadow-md transition-shadow cursor-default">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {t('funding.consultationDesc')}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fund Usage Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('funding.edbScheme.usageTitle')}</h2>
          </motion.div>

          {/* Usage Categories */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
            {['usage1', 'usage2', 'usage3', 'usage4', 'usage5'].map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                  {index === 0 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  {index === 1 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>}
                  {index === 2 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" /></svg>}
                  {index === 3 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
                  {index === 4 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>}
                </div>
                <span className="font-bold text-slate-800">{t(`funding.edbScheme.${key}`)}</span>
              </motion.div>
            ))}
          </div>

          {/* Requirements Flow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('funding.edbScheme.requirementsTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['req1', 'req2', 'req3', 'req4'].map((req, index) => (
              <motion.div
                key={req}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all h-full">
                  <div className="w-10 h-10 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{t(`funding.edbScheme.${req}.title`)}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{t(`funding.edbScheme.${req}.desc`)}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-blue-300 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 1: Funding Application Flow (flow.png) ========== */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
           >
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('funding.flow.title')}</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">{t('funding.flow.subtitle')}</p>
           </motion.div>

           {/* Flow Image */}
           <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden mb-12"
            >
              <img 
                src="/project_info/flow.png" 
                alt="Funding Application Process" 
                className="w-full max-w-4xl mx-auto h-auto object-contain max-h-[400px]"
              />
           </motion.div>

           {/* Flow Steps Text */}
           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
             {flowSteps.map((step, index) => (
               <motion.div
                 key={step.num}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className="relative text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50"
               >
                 <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                   <step.icon />
                 </div>
                 <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                 <p className="text-sm text-slate-500">{step.desc}</p>
                 {index < flowSteps.length - 1 && (
                   <div className="hidden md:block absolute top-5 right-0 translate-x-1/2 text-slate-300 z-20">
                     <ArrowRightIcon />
                   </div>
                 )}
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* ========== Section 2: Before/After Comparison (better_process.png) ========== */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
           >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('funding.comparison.title')}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">{t('funding.comparison.subtitle')}</p>
          </motion.div>

          {/* Comparison Image with Labels */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative rounded-3xl overflow-hidden mb-8 shadow-lg"
          >
             <img 
               src="/project_info/better_process.png" 
               alt="Before and After Comparison" 
               className="w-full h-auto object-contain bg-white/50 backdrop-blur-sm"
             />
             {/* Overlay Labels */}
             <div className="absolute inset-0 flex">
               <div className="w-1/2 flex items-end p-6">
                 <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200">
                   <span className="text-red-500 font-bold text-sm uppercase tracking-wider">{t('funding.comparison.before.tag')}</span>
                   <h4 className="font-bold text-lg mt-1 text-slate-900">{t('funding.comparison.before.title')}</h4>
                   <p className="text-slate-600 text-sm">{t('funding.comparison.before.desc')}</p>
                 </div>
               </div>
               <div className="w-1/2 flex items-end justify-end p-6">
                 <div className="bg-blue-600/90 backdrop-blur-sm rounded-xl p-4 text-white shadow-lg">
                   <span className="text-green-300 font-bold text-sm uppercase tracking-wider">{t('funding.comparison.after.tag')}</span>
                   <h4 className="font-bold text-lg mt-1">{t('funding.comparison.after.title')}</h4>
                   <p className="text-blue-100 text-sm">{t('funding.comparison.after.desc')}</p>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 shadow-xl flex items-start gap-6"
            >
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                <ChipIcon />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('funding.analysis.computing.title')}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-indigo-600">{t('funding.analysis.computing.stat')}</span>
                    <span className="text-sm font-bold text-slate-400 uppercase">{t('funding.analysis.computing.unit')}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{t('funding.analysis.computing.desc')}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 shadow-xl flex items-start gap-6"
            >
              <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                <TimeIcon />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('funding.analysis.efficiency.title')}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-blue-600">{t('funding.analysis.efficiency.stat')}</span>
                    <span className="text-sm font-bold text-slate-400 uppercase">{t('funding.analysis.efficiency.unit')}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{t('funding.analysis.efficiency.desc')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== Section 3: AI Pipeline Architecture (pepiline.png) ========== */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
           >
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('funding.pipeline.title')}</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">{t('funding.pipeline.subtitle')}</p>
           </motion.div>
           
           {/* Mobile: Image with overlaid text */}
           <div className="lg:hidden">
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src="/project_info/pepiline.png" 
                  alt="AI Core Architecture" 
                  className="w-full h-auto object-contain"
                />
                {/* Overlaid Labels for Mobile */}
                <div className="absolute top-[5%] right-2 left-auto w-[55%]">
                  <div className="bg-green-50/90 backdrop-blur-sm rounded-xl p-3 border border-green-200 shadow-lg">
                    <span className="text-green-700 font-bold text-xs">{t('funding.pipeline.layerLabel')} 1</span>
                    <h4 className="font-bold text-slate-900 text-sm">{architectureLayers[0].layer}</h4>
                  </div>
                </div>
                <div className="absolute top-[38%] right-2 left-auto w-[55%]">
                  <div className="bg-blue-50/90 backdrop-blur-sm rounded-xl p-3 border border-blue-200 shadow-lg">
                    <span className="text-blue-700 font-bold text-xs">{t('funding.pipeline.layerLabel')} 2</span>
                    <h4 className="font-bold text-slate-900 text-sm">{architectureLayers[1].layer}</h4>
                  </div>
                </div>
                <div className="absolute bottom-[8%] right-2 left-auto w-[55%]">
                  <div className="bg-indigo-50/90 backdrop-blur-sm rounded-xl p-3 border border-indigo-200 shadow-lg">
                    <span className="text-indigo-700 font-bold text-xs">{t('funding.pipeline.layerLabel')} 3</span>
                    <h4 className="font-bold text-slate-900 text-sm">{architectureLayers[2].layer}</h4>
                  </div>
                </div>
             </motion.div>
             <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
               <p className="text-sm text-amber-800">{t('funding.pipeline.flywheel')}</p>
             </div>
           </div>

           {/* Desktop: Side by side layout */}
           <div className="hidden lg:block">
             <div className="relative max-w-5xl mx-auto">
               {/* Center Image */}
               <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <img 
                    src="/project_info/pepiline.png" 
                    alt="AI Core Architecture" 
                    className="w-full max-w-md mx-auto h-auto object-contain drop-shadow-2xl"
                  />
               </motion.div>

               {/* Layer 1 - Top Right */}
               <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="absolute top-[8%] right-0 w-72"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-green-100 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        {t('funding.pipeline.layerLabel')} 1
                      </span>
                      <div className="h-px flex-1 bg-green-200"></div>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{architectureLayers[0].layer}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{architectureLayers[0].desc}</p>
                  </div>
               </motion.div>

               {/* Layer 2 - Middle Left */}
               <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="absolute top-[38%] left-0 w-72"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        {t('funding.pipeline.layerLabel')} 2
                      </span>
                      <div className="h-px flex-1 bg-blue-200"></div>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{architectureLayers[1].layer}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{architectureLayers[1].desc}</p>
                  </div>
               </motion.div>

               {/* Layer 3 - Bottom Right */}
               <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-[5%] right-0 w-72"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-indigo-100 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                        {t('funding.pipeline.layerLabel')} 3
                      </span>
                      <div className="h-px flex-1 bg-indigo-200"></div>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{architectureLayers[2].layer}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{architectureLayers[2].desc}</p>
                  </div>
               </motion.div>
             </div>

             {/* Flywheel note */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 max-w-3xl mx-auto"
              >
               <div className="p-5 bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl border border-amber-200">
                 <p className="text-amber-800 text-center">{t('funding.pipeline.flywheel')}</p>
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* ========== Solutions / Schemes Section ========== */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('pricing.title')}</h2>
            </div>
            
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Plan A */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-lg"
            >
               <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mb-4">
                  {t('funding.schemes.planA.highlight')}
               </span>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('funding.schemes.planA.name')}</h3>
               <p className="text-slate-500 text-sm font-bold mb-6">{t('funding.schemes.planA.price')}</p>
               
               <ul className="space-y-4 mb-8">
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <span className="text-sm text-slate-600">{t('funding.schemes.planA.hardware')}</span>
                   </li>
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <span className="text-sm text-slate-600">{t('funding.schemes.planA.software')}</span>
                   </li>
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <span className="text-sm text-slate-600">{t('funding.schemes.planA.training')}</span>
                   </li>
               </ul>
            </motion.div>

            {/* Plan B (Featured) */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-blue-500 shadow-2xl relative transform scale-105 z-10"
            >
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                   {t('funding.schemes.planB.tag')}
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('funding.schemes.planB.name')}</h3>
               <p className="text-blue-600 text-sm font-bold mb-6">{t('funding.schemes.planB.price')}</p>
               
               <ul className="space-y-4 mb-8">
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <span className="text-sm font-bold text-slate-800">{t('funding.schemes.planB.hardware')}</span>
                   </li>
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <div>
                            <span className="block text-sm font-bold text-slate-800">{t('funding.schemes.planB.software')}</span>
                            <span className="text-xs text-slate-500">{t('funding.schemes.planB.softwareDesc')}</span>
                       </div>
                   </li>
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <span className="text-sm font-bold text-slate-800">{t('funding.schemes.planB.training')}</span>
                   </li>
               </ul>
               
               <a href="mailto:contact@insightaihk.com" className="block w-full py-3 bg-blue-600 text-white text-center font-bold rounded-xl hover:bg-blue-700 transition-colors">
                   {t('cta.button')}
               </a>
            </motion.div>

            {/* Plan C */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="bg-slate-900/95 backdrop-blur-sm text-white rounded-3xl p-8 border border-slate-800 shadow-lg"
            >
               <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full mb-4">
                  {t('funding.schemes.planC.highlight')}
               </span>
               <h3 className="text-2xl font-bold text-white mb-2">{t('funding.schemes.planC.name')}</h3>
               <p className="text-slate-400 text-sm font-bold mb-6">{t('funding.schemes.planC.price')}</p>
               
               <ul className="space-y-4 mb-8">
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <span className="text-sm text-slate-300">{t('funding.schemes.planC.hardware')}</span>
                   </li>
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <span className="text-sm text-slate-300">{t('funding.schemes.planC.software')}</span>
                   </li>
                   <li className="flex items-start gap-3">
                       <CheckIcon />
                       <span className="text-sm text-slate-300">{t('funding.schemes.planC.training')}</span>
                   </li>
               </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KPI Support Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('funding.support.title')}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">{t('funding.support.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['kpi1', 'kpi2', 'kpi3'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <CheckIcon />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t(`funding.support.${item}.title`)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t(`funding.support.${item}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other EDB Schemes Reference */}
       <section className="py-16 border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">{i18n.language === 'zh' ? '其他相關撥款計劃' : 'Other Related Funding Schemes'}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Scheme 1 - AI for Science */}
            <div className="flex gap-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200 hover:shadow-lg transition-shadow">
               <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500">
                  100k
               </div>
               <div>
                  <h4 className="text-lg font-bold text-slate-900">{t('funding.scheme1.title')}</h4>
                  <p className="text-slate-500 text-sm mt-1 mb-2">{t('funding.scheme1.desc')}</p>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {t('funding.scheme1.deadline')}
                  </span>
               </div>
            </div>

            {/* Scheme 2 - Highlighted as main scheme */}
            <div className="flex gap-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-blue-300 shadow-md">
               <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white">
                  500k
               </div>
               <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-slate-900">{t('funding.scheme2.title')}</h4>
                    <span className="text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded">{i18n.language === 'zh' ? '本頁重點' : 'Featured'}</span>
                  </div>
                  <p className="text-slate-600 text-sm mt-1 mb-2">{t('funding.scheme2.desc')}</p>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                      {t('funding.scheme2.deadline')}
                  </span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
             {/* Background decorations for CTA */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
               <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-3xl"></div>
               <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-3xl"></div>
             </div>
             <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('cta.title')}</h2>
                <a 
                  href="mailto:contact@insightaihk.com"
                  className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-600/30"
                >
                  {t('funding.cta')}
                </a>
             </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-lg border-t border-slate-200 py-12 text-center text-slate-500 text-sm relative z-10">
        <p>{t('footer.rights')}</p>
      </footer>
    </div>
  );
};

export default Funding;
