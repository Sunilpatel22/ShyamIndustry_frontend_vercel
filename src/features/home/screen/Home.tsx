import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import your custom data configuration
import { slideData } from './slideData';

// Custom Navigation Component with Glass Effect and Visible Icons
function GlassSliderButtons() {
  const swiper = useSwiper();

  return (
    <div className="flex gap-2 mt-4 md:mt-6">
      <button
        onClick={() => swiper.slidePrev()}
        className="w-10 h-10 rounded flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95 cursor-pointer"
        aria-label="Previous slide"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="w-10 h-10 rounded flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95 cursor-pointer"
        aria-label="Next slide"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

export default function Home() {
  // Stagger Container configuration for Left Content Panel elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Fade-Up Animation preset configuration used for child rows
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center text-white font-sans overflow-hidden">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full custom-swiper-container"
      >
        {slideData.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="w-full min-h-screen flex items-center justify-center"
          >
            {/* Slide Wrapper Container with Top-to-Bottom CSS Gradient */}
            <div
              style={slide.gradientStyle}
              className="w-full min-h-screen flex items-center justify-center px-10 py-16"
            >
              <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

                {/* Left Content Column with Framer Motion Staggered Animation */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="w-full md:w-[52%] flex flex-col items-start text-left"
                >
                  {/* Header Badges */}
                  <motion.div variants={itemVariants} className="flex gap-2.5 mb-6">
                    <span className="bg-[#1b4344]/80 backdrop-blur-sm text-[#4be3c9] text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider flex items-center gap-1.5 border border-[#4be3c9]/10">
                      <span className="w-1.5 h-1.5 bg-[#4be3c9] rounded-sm"></span>
                      Shyam Industries
                    </span>
                    <span className={`border ${slide.accentBorder} ${slide.accentText} bg-white/5 backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider flex items-center gap-1.5`}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: slide.accentColor }}></span>
                      {slide.category}
                    </span>
                  </motion.div>

                  {/* Main Title */}
                  <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-[1.1] mb-4 text-white max-w-xl">
                    {slide.title}
                  </motion.h1>

                  {/* Subtitle Accent Text */}
                  <motion.h2 variants={itemVariants} className={`${slide.accentText} text-base md:text-lg font-normal mb-6 tracking-wide`}>
                    {slide.subtitle}
                  </motion.h2>

                  {/* Main Paragraph Block */}
                  <motion.p variants={itemVariants} className="text-gray-400/90 text-xs leading-relaxed mb-8 max-w-md">
                    {slide.description}
                  </motion.p>

                  {/* 3-Column Specifications Glass Layout Grid */}
                  <motion.div variants={itemVariants} className="flex gap-3 mb-6 w-full max-w-lg">
                    {slide.specs.map((spec, index) => (
                      <div key={index} className="flex-1 bg-white/[0.03] backdrop-blur-md p-4 rounded border border-white/10 shadow-lg hover:bg-white/[0.06] transition-colors duration-300">
                        <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1.5">{spec.label}</span>
                        <span className="text-sm font-semibold text-white tracking-wide">{spec.value}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Mini Decorative Inline Glass Badges */}
                  <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 mb-10">
                    {slide.tags.map((tag, index) => (
                      <span key={index} className="text-[15px] text-gray-300 bg-white/[0.02] backdrop-blur-md px-3 py-1.5 rounded border border-white/5 flex items-center gap-1.5 shadow-sm hover:border-white/20 transition-all duration-300">
                        <span className={slide.accentText}>{tag.icon}</span> {tag.text}
                      </span>
                    ))}
                  </motion.div>

                  {/* Production Statistics and Glass Buttons Alignment Box Container */}
                  <motion.div variants={itemVariants} className="flex flex-wrap flex-col items-start gap-5">
                    <div className="flex flex-wrap gap-5">
                      {slide.stats.map((stat, index) => (
                        <div key={index} className="bg-white/[0.03] backdrop-blur-md border border-white/10 px-4 py-3 rounded min-w-[110px] flex flex-col justify-between shadow-xl hover:border-white/20 transition-all duration-300">
                          <div>
                            <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">
                              {stat.label}
                            </span>
                            <span className="text-2xl font-bold text-white block leading-tight tracking-wide">
                              {stat.value}
                            </span>
                          </div>
                          <span className="text-[9px] text-gray-400 mt-0.5">{stat.subtext}</span>
                        </div>
                      ))}
                    </div>

                    {/* Integrated custom navigation controls inside the swiper context */}
                    <GlassSliderButtons />
                  </motion.div>
                </motion.div>

                {/* Right Image Framing Column Container with Framer Motion Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
                  className="w-full md:w-[44%] relative flex justify-center items-center"
                >
                  {/* Accent Borders */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 border-t border-l rounded-tl-sm" style={{ borderColor: slide.accentColor }}></div>
                  <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b border-r rounded-br-sm" style={{ borderColor: slide.accentColor }}></div>

                  {/* Main Content Box */}
                  <div className="w-full border border-white/10 rounded p-6 relative flex items-center justify-center bg-white/[0.02] backdrop-blur-md aspect-[4/3] shadow-2xl">

                    {/* Brand Watermark Overlay Layer */}
                    <div className="absolute top-3 left-4 flex items-center gap-1.5 opacity-20 pointer-events-none select-none">
                      <span className="text-sm font-black tracking-tighter text-white">SHYAM</span>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: slide.accentColor }}></div>
                    </div>

                    {/* Image Container Wrapper */}
                    <div className="bg-white p-5 rounded shadow-2xl w-full h-full flex items-center justify-center overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* ISO Certification Badge Accent */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }} // 👈 FIXED: Animates on every single slide change
                      viewport={{ once: false, amount: 0.1 }} // 👈 Re-triggers every time the slide is visible
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                      className="absolute -top-5 -right-3 bg-white text-gray-800 border font-bold rounded p-1 py-1.5 text-center text-[7px] shadow-md leading-tight w-14 h-20 flex flex-col items-center justify-center gap-0.5"
                      style={{ borderColor: slide.accentColor }}
                    >
                      <span className="text-lg" style={{ color: slide.accentColor }}>🏅</span>
                      <span className="tracking-wide font-bold text-gray-500 text-xs">ISO</span>
                      <span className="text-gray-900 font-bold text-xs">9001</span>
                    </motion.div>

                    {/* Production Status Badge Accent */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                      className="absolute -bottom-6 left-4 text-gray-900 rounded px-3 py-1.5 text-[10px] font-bold flex flex-col shadow-md leading-none"
                      // Dynamic color configuration based on slide status data
                      style={{
                        backgroundColor: slide.status === 'In Production' ? '#39bfa8' : '#e67e22'
                      }}
                    >

                   
                      <span className="text-[10px] text-teal-950 font-bold uppercase tracking-wider mb-0.5">Status</span>
                      <span className="font-bold text-sm">{slide.status}</span>
                    </motion.div>

                  </div>
                </motion.div>


              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}