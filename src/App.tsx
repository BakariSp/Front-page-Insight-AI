import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = React.useState(false);

  const demoSlides = [
    {
      image: '/demo/demo-1.png',
      caption: t('demo.caption1')
    },
    {
      image: '/demo/demo-2.png',
      caption: t('demo.caption2')
    }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const nextSlide = () => {
    setIsAutoPlayPaused(true);
    setCurrentSlide((prev) => (prev + 1) % demoSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlayPaused(true);
    setCurrentSlide((prev) => (prev - 1 + demoSlides.length) % demoSlides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlayPaused(true);
    setCurrentSlide(index);
  };

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Auto-play carousel
  React.useEffect(() => {
    if (isAutoPlayPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % demoSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [demoSlides.length, isAutoPlayPaused]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="logo-icon">🚀</span>
            <span className="logo-text">Insight AI</span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <a href="#product">{t('nav.product')}</a>
            <a href="#advantages">{t('nav.advantages')}</a>
            <a href="#team">{t('nav.team')}</a>
            <a href="#contact">{t('nav.contact')}</a>
            <motion.button 
              className="lang-toggle" 
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {i18n.language === 'en' ? '繁中' : 'EN'}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div 
          className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}
          initial={false}
          animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mobile-nav-content">
            <a href="#product" onClick={closeMobileMenu}>{t('nav.product')}</a>
            <a href="#advantages" onClick={closeMobileMenu}>{t('nav.advantages')}</a>
            <a href="#team" onClick={closeMobileMenu}>{t('nav.team')}</a>
            <a href="#contact" onClick={closeMobileMenu}>{t('nav.contact')}</a>
            <motion.button 
              className="lang-toggle mobile-lang" 
              onClick={() => { toggleLanguage(); closeMobileMenu(); }}
              whileTap={{ scale: 0.95 }}
            >
              {i18n.language === 'en' ? '繁中' : 'EN'}
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="mobile-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMobileMenu}
        />
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className="hero-badges"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="hero-badge">
                <span className="badge-icon">✨</span>
                <span>{t('hero.badge')}</span>
              </div>
              <div className="hero-badge partnership-badge">
                <span className="badge-icon">🤝</span>
                <span>{t('hero.partnershipBadge')}</span>
              </div>
            </motion.div>
            <motion.h1 
              className="hero-title"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('hero.title')}
            </motion.h1>
            <motion.h2 
              className="hero-subtitle"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.subtitle')}
            </motion.h2>
            <motion.div 
              className="hero-tagline"
              variants={scaleIn}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('hero.tagline')}
            </motion.div>
            <motion.p 
              className="hero-description"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>
            <motion.div 
              className="hero-cta"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.a 
                href="#contact" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.cta')}
              </motion.a>
              <motion.a 
                href="#product" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.ctaSecondary')}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('problem.title')}</h2>
            <p className="section-subtitle">{t('problem.subtitle')}</p>
          </motion.div>
          <motion.div 
            className="problem-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {['teacher', 'student', 'market'].map((type, index) => (
              <motion.div 
                key={type}
                className="problem-card"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="problem-icon">
                  {type === 'teacher' ? '👨‍🏫' : type === 'student' ? '🎓' : '🎯'}
                </div>
                <h3>{t(`problem.${type}.title`)}</h3>
                <ul>
                  <li>{t(`problem.${type}.pain1`)}</li>
                  <li>{t(`problem.${type}.pain2`)}</li>
                  <li>{t(`problem.${type}.pain3`)}</li>
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution/Product Section */}
      <section id="product" className="solution">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('solution.title')}</h2>
            <p className="section-subtitle">{t('solution.subtitle')}</p>
          </motion.div>
          <motion.div 
            className="solution-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {['module1', 'module2', 'module3', 'module4'].map((module, index) => (
              <motion.div 
                key={module}
                className="solution-card"
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="solution-icon">
                  {index === 0 ? '📚' : index === 1 ? '🎯' : index === 2 ? '🎓' : '📊'}
                </div>
                <h3>{t(`solution.${module}.title`)}</h3>
                <ul>
                  {(t(`solution.${module}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section className="demo">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('demo.title')}</h2>
            <p className="section-subtitle">{t('demo.subtitle')}</p>
          </motion.div>
          
          <motion.div 
            className="demo-carousel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            {/* Carousel Container */}
            <div className="carousel-container">
              {/* Previous Button */}
              <motion.button 
                className="carousel-button carousel-button-prev"
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous slide"
              >
                ‹
              </motion.button>

              {/* Slides */}
              <div className="carousel-slides">
                {demoSlides.map((slide, index) => (
                  <motion.div
                    key={index}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                    initial={false}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      scale: index === currentSlide ? 1 : 0.95,
                      x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="demo-image-wrapper">
                      <img 
                        src={slide.image} 
                        alt={slide.caption} 
                        className="demo-image" 
                      />
                      <p className="demo-caption">{slide.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Next Button */}
              <motion.button 
                className="carousel-button carousel-button-next"
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next slide"
              >
                ›
              </motion.button>
            </div>

            {/* Indicators */}
            <div className="carousel-indicators">
              {demoSlides.map((_, index) => (
                <motion.button
                  key={index}
                  className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Comparison Section */}
      <section className="comparison">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('comparison.title')}</h2>
            <p className="section-subtitle">{t('comparison.subtitle')}</p>
          </motion.div>
          <motion.div
            className="comparison-table-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="comparison-table">
              <div className="comparison-header">
                <div className="comparison-cell header-cell"></div>
                <div className="comparison-cell header-cell">{t('comparison.tableHeaders.mainland')}</div>
                <div className="comparison-cell header-cell">{t('comparison.tableHeaders.international')}</div>
                <div className="comparison-cell header-cell">{t('comparison.tableHeaders.traditional')}</div>
                <div className="comparison-cell header-cell featured">{t('comparison.tableHeaders.insightai')}</div>
              </div>
              {['dse', 'ai', 'price', 'localization', 'integration'].map((row, index) => (
                <motion.div 
                  key={row}
                  className="comparison-row"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="comparison-cell feature-cell">{t(`comparison.rows.${row}.feature`)}</div>
                  <div className="comparison-cell">{t(`comparison.rows.${row}.mainland`)}</div>
                  <div className="comparison-cell">{t(`comparison.rows.${row}.international`)}</div>
                  <div className="comparison-cell">{t(`comparison.rows.${row}.traditional`)}</div>
                  <div className="comparison-cell featured">{t(`comparison.rows.${row}.insightai`)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="advantages">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('advantages.title')}</h2>
            <p className="section-subtitle">{t('advantages.subtitle')}</p>
          </motion.div>
          <motion.div 
            className="advantages-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {['adv1', 'adv2', 'adv3', 'adv4', 'adv5', 'adv6'].map((adv, index) => (
              <motion.div 
                key={adv}
                className="advantage-card"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.12)" }}
              >
                <div className="advantage-number">0{index + 1}</div>
                <h3>{t(`advantages.${adv}.title`)}</h3>
                <p>{t(`advantages.${adv}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('team.title')}</h2>
            <p className="section-subtitle">{t('team.subtitle')}</p>
          </motion.div>
          <motion.div 
            className="team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {['academic', 'experience', 'collaboration', 'partnership'].map((pillar, index) => (
              <motion.div 
                key={pillar}
                className={`team-pillar-card ${pillar === 'partnership' ? 'partnership-card' : ''}`}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="team-pillar-icon">
                  {t(`team.${pillar}.icon`)}
                </div>
                <h3>{t(`team.${pillar}.title`)}</h3>
                <ul className="team-pillar-list">
                  {(t(`team.${pillar}.highlights`, { returnObjects: true }) as string[]).map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">{t('pricing.title')}</h2>
            <p className="section-subtitle">{t('pricing.subtitle')}</p>
          </motion.div>
          <motion.div 
            className="pricing-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {['standard', 'professional', 'enterprise'].map((plan, index) => (
              <motion.div 
                key={plan}
                className={`pricing-card ${plan === 'professional' ? 'featured' : ''}`}
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, scale: plan === 'professional' ? 1.08 : 1.05 }}
              >
                {plan === 'professional' && <div className="popular-badge">Popular</div>}
                <h3>{t(`pricing.${plan}.name`)}</h3>
                <div className="price">{t(`pricing.${plan}.price`)}</div>
                <p className="price-desc">{t(`pricing.${plan}.desc`)}</p>
                <ul>
                  {(t(`pricing.${plan}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <motion.a 
                  href="#contact" 
                  className={`btn ${plan === 'professional' ? 'btn-primary' : 'btn-outline'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('hero.cta')}
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="section-title"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              {t('cta.title')}
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('cta.subtitle')}
            </motion.p>
            <motion.a 
              href="mailto:info@insightaihk.com" 
              className="btn btn-primary btn-large"
              variants={scaleIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('cta.button')}
            </motion.a>
            <motion.p 
              className="contact-info"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('cta.contact')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-gradient"></div>
        <div className="container">
          <motion.div 
            className="footer-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="footer-brand"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <div className="footer-logo">
                <span className="logo-icon">🚀</span>
                <span className="logo-text">Insight AI</span>
              </div>
              <p className="footer-tagline">{t('footer.company')}</p>
              <p className="footer-location">📍 {t('footer.location')}</p>
              <div className="footer-social">
                <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="social-icon">💼</motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="social-icon">📧</motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="social-icon">🌐</motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="social-icon">📱</motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              className="footer-section"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-list">
                <li><a href="#product">Product</a></li>
                <li><a href="#advantages">Advantages</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </motion.div>

            <motion.div 
              className="footer-section"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="footer-title">Resources</h4>
              <ul className="footer-list">
                <li><a href="#privacy">{t('footer.privacy')}</a></li>
                <li><a href="#terms">{t('footer.terms')}</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#docs">Documentation</a></li>
              </ul>
            </motion.div>

            <motion.div 
              className="footer-section footer-contact"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="footer-title">Get in Touch</h4>
              <div className="footer-contact-info">
                <p>📧 info@insightaihk.com</p>
                <p>🕐 Mon - Fri, 9:00 - 18:00</p>
              </div>
              <motion.a 
                href="#contact" 
                className="footer-cta-btn"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Trial
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                <p>{t('footer.rights')}</p>
                <p className="footer-partnership">{t('footer.partnership')}</p>
              </div>
              <p className="footer-made-with">Made with ❤️ in Hong Kong</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
