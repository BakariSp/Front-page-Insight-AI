import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Helper function for asset paths
const getAssetPath = (path: string) => process.env.PUBLIC_URL + path;

function App() {
  const { t, i18n } = useTranslation();
  const [currentDemoSlide, setCurrentDemoSlide] = useState(0);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Demo slides configuration
  const demoSlides = [
    { image: '/demo/prd-insight-tools.png', alt: 'Insight Tools' },
    { image: '/demo/prd-quiz-builder.png', alt: 'Quiz Builder' },
    { image: '/demo/demo-1.png', alt: 'Dashboard Demo' },
    { image: '/demo/demo-2.png', alt: 'Analysis Demo' }
  ];

  // Auto-play demo carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDemoSlide((prev) => (prev + 1) % demoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [demoSlides.length]);

  const nextSlide = () => {
    setCurrentDemoSlide((prev) => (prev + 1) % demoSlides.length);
  };

  const prevSlide = () => {
    setCurrentDemoSlide((prev) => (prev - 1 + demoSlides.length) % demoSlides.length);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <img 
              src={getAssetPath('/logo.svg')} 
              alt="Insight AI Logo" 
              style={{ height: '36px', width: 'auto' }} 
            />
            <span>Insight AI</span>
          </a>
          
          <div className="nav-links">
            <a href="#features">{t('nav.advantages')}</a>
            <a href="#demo">{t('demo.title')}</a>
            <a href="#contact">{t('nav.contact')}</a>
            <button className="lang-toggle" onClick={toggleLanguage}>
              {i18n.language === 'en' ? '繁中' : 'EN'}
            </button>
            <a href="#contact" className="nav-btn">{t('hero.cta')}</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="hero-badge" variants={fadeInUp}>
              {t('hero.badge')}
            </motion.span>
            <motion.h1 className="hero-title" variants={fadeInUp}>
              {t('hero.title')} <br />
              <span style={{ color: 'var(--primary-500)', fontSize: '0.6em', display: 'block', marginTop: '0.2em' }}>
                {t('hero.subtitle')}
              </span>
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp}>
              {t('hero.description')}
            </motion.p>
            <motion.div className="hero-cta-group" variants={fadeInUp}>
              <a href="#contact" className="btn btn-primary">{t('hero.cta')}</a>
              <a href="#features" className="btn btn-secondary">{t('hero.ctaSecondary')}</a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={getAssetPath('/images/Hero.jpeg')} 
              alt="Insight AI Hero" 
              className="hero-image"
            />
          </motion.div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="section-roles" id="roles">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="section-title">{t('roles.title')}</h2>
          <p className="section-desc">{t('roles.subtitle')}</p>
        </motion.div>

        <motion.div 
          className="roles-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            { 
              key: 'teacher',
              icon: '👨‍🏫',
              color: 'var(--primary-500)'
            },
            { 
              key: 'student',
              icon: '🎓',
              color: 'var(--secondary-500)'
            },
            { 
              key: 'admin',
              icon: '📊',
              color: 'var(--accent-green)'
            }
          ].map((role, index) => (
            <motion.div 
              key={index} 
              className="role-card"
              variants={fadeInUp}
            >
              <div className="role-icon" style={{ color: role.color }}>{role.icon}</div>
              <h3 className="role-title">{t(`roles.${role.key}.title`)}</h3>
              <p className="role-desc">{t(`roles.${role.key}.desc`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Teacher Features */}
      <section className="feature-section" id="features">
        <div className="feature-container">
          <motion.div 
            className="feature-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src={getAssetPath('/images/Teacher-Grading.jpeg')} 
              alt="AI Grading" 
              className="feature-image"
            />
          </motion.div>
          <motion.div 
            className="feature-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="feature-label">{t('features.teacher.label')}</span>
            <h2 className="feature-title">{t('features.teacher.title')}</h2>
            <p style={{ color: 'var(--dark-700)', fontSize: '1.1rem' }}>
              {t('features.teacher.desc')}
            </p>
            <ul className="feature-list">
              {(t('features.teacher.list', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}><span className="feature-check">✓</span> {item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-container">
          <motion.div 
            className="feature-content reversed"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="feature-label">{t('features.data.label')}</span>
            <h2 className="feature-title">{t('features.data.title')}</h2>
            <p style={{ color: 'var(--dark-700)', fontSize: '1.1rem' }}>
              {t('features.data.desc')}
            </p>
            <ul className="feature-list">
              {(t('features.data.list', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}><span className="feature-check">✓</span> {item}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            className="feature-image-wrapper reversed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src={getAssetPath('/images/Data-Insights.jpeg')} 
              alt="Class Reports" 
              className="feature-image"
            />
          </motion.div>
        </div>
      </section>

      {/* Student Features */}
      <section className="feature-section">
        <div className="feature-container">
          <motion.div 
            className="feature-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <img 
              src={getAssetPath('/images/Insight-Toolkit.jpeg')} 
              alt="Magic Toolkit" 
              className="feature-image"
            />
          </motion.div>
          <motion.div 
            className="feature-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="feature-label">{t('features.student.label')}</span>
            <h2 className="feature-title">{t('features.student.title')}</h2>
            <p style={{ color: 'var(--dark-700)', fontSize: '1.1rem' }}>
              {t('features.student.desc')}
            </p>
            <ul className="feature-list">
               {(t('features.student.list', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}><span className="feature-check">✓</span> {item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Demo Carousel Section */}
      <section className="slider-section" id="demo">
        <div className="slider-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="section-title">{t('demo.title')}</h2>
            <p className="section-desc">{t('demo.subtitle')}</p>
          </motion.div>

          <div className="demo-carousel-wrapper">
            {/* Left Arrow */}
            <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
              ‹
            </button>

            {/* Slide Container */}
            <div className="demo-slide-container">
              <AnimatePresence mode="wait">
                <motion.div 
                  className="demo-slide-display"
                  key={currentDemoSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={getAssetPath(demoSlides[currentDemoSlide].image)} 
                    alt={demoSlides[currentDemoSlide].alt} 
                    className="demo-slide-img"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
              ›
            </button>
          </div>

          {/* Indicators */}
          <div className="demo-indicators">
            {demoSlides.map((_, index) => (
              <button 
                key={index}
                className={`demo-indicator ${index === currentDemoSlide ? 'active' : ''}`}
                onClick={() => setCurrentDemoSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '3rem', color: 'var(--dark-700)', fontSize: '1.8rem' }}>{t('partners.title')}</h3>
          <div className="partners-grid">
            <div className="partner-item">
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🎓</span>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Tsinghua Zhipu AI</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>GLM-4 Partnership</div>
            </div>
            <div className="partner-item">
               <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🎓</span>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>UC Berkeley</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>CS & Data Science</div>
            </div>
            <div className="partner-item">
               <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🏫</span>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>CityU HK</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Localized AI Research</div>
            </div>
             <div className="partner-item">
               <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🏢</span>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>North AI Limited</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Channel Partner</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title">{t('cta.title')}</h2>
          <p className="cta-desc">{t('cta.subtitle')}</p>
          <div style={{ marginBottom: '2rem', fontSize: '1.2rem', fontWeight: '500' }}>
            {t('cta.email')}
          </div>
          <a href="mailto:contact@insightaihk.com" className="btn btn-white">{t('cta.button')}</a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">{t('footer.company')}</div>
            <p>{t('hero.description')}</p>
          </div>
          <div>
            <h4>{t('nav.product')}</h4>
            <ul>
              <li><a href="#features">{t('roles.teacher.title')}</a></li>
              <li><a href="#features">{t('roles.student.title')}</a></li>
              <li><a href="#features">{t('roles.admin.title')}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t('nav.advantages')}</h4>
            <ul>
              <li><a href="#roles">DSE Support</a></li>
              <li><a href="#roles">AI Grading</a></li>
              <li><a href="#roles">Data Insights</a></li>
            </ul>
          </div>
          <div>
            <h4>{t('nav.contact')}</h4>
            <ul>
              <li><a href="mailto:contact@insightaihk.com">contact@insightaihk.com</a></li>
              <li><a href="#contact">{t('cta.button')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footer.rights')} {t('footer.made_in')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
