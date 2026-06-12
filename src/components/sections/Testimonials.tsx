'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

const testimonialKeys = ['t1', 't2', 't3', 't4', 't5'] as const;
const avatarColors = ['#0B2E63', '#D72638', '#16A34A', '#163F86', '#F59E0B'];

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonialKeys.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + testimonialKeys.length) % testimonialKeys.length);
  const next = () => setCurrent((c) => (c + 1) % testimonialKeys.length);

  const visibleIndices = [
    (current - 1 + testimonialKeys.length) % testimonialKeys.length,
    current,
    (current + 1) % testimonialKeys.length,
  ];

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5F7FA 0%, #ffffff 100%)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
            style={{ background: 'rgba(11,46,99,0.08)', color: '#0B2E63', border: '1px solid rgba(11,46,99,0.1)' }}
          >
            <Star size={14} fill="#0B2E63" />
            Testimonios
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4 text-balance">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop: 3 cards */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {visibleIndices.map((idx, position) => {
              const key = testimonialKeys[idx];
              const isCenter = position === 1;
              return (
                <motion.div
                  key={`${idx}-${position}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`relative rounded-2xl p-7 transition-all duration-500 ${isCenter
                    ? 'bg-[#0B2E63] shadow-2xl scale-105'
                    : 'bg-white border border-gray-100'
                    }`}
                  style={isCenter ? {
                    boxShadow: '0 40px 80px rgba(11,46,99,0.25)',
                  } : {
                    boxShadow: '0 4px 24px rgba(11,46,99,0.06)',
                  }}
                >
                  <Quote size={24} className={`mb-4 ${isCenter ? 'text-white/20' : 'text-gray-200'}`} />

                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill="#F59E0B"
                        className="text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className={`text-sm leading-relaxed mb-5 ${isCenter ? 'text-white/80' : 'text-gray-600'}`}>
                    "{t(`${key}_text` as never)}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: isCenter ? 'rgba(255,255,255,0.2)' : avatarColors[idx] }}
                    >
                      {(t(`${key}_name` as never) as string).charAt(0)}
                    </div>
                    <div>
                      <div className={`font-semibold text-sm ${isCenter ? 'text-white' : 'text-[#111827]'}`}>
                        {t(`${key}_name` as never)}
                      </div>
                      <div className={`text-xs ${isCenter ? 'text-white/50' : 'text-gray-400'}`}>
                        {t(`${key}_city` as never)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              {testimonialKeys.map((key, idx) =>
                idx === current ? (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#0B2E63] rounded-2xl p-7"
                    style={{ boxShadow: '0 20px 60px rgba(11,46,99,0.3)' }}
                  >
                    <Quote size={24} className="text-white/20 mb-4" />
                    <div className="flex mb-3">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#F59E0B" className="text-yellow-400" />)}
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mb-5">
                      "{t(`${key}_text` as never)}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                        {(t(`${key}_name` as never) as string).charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white">{t(`${key}_name` as never)}</div>
                        <div className="text-xs text-white/50">{t(`${key}_city` as never)}</div>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0B2E63] hover:border-[#0B2E63] transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {/* Dots */}
            <div className="flex gap-2">
              {testimonialKeys.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    background: i === current ? '#0B2E63' : '#D1D5DB',
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0B2E63] hover:border-[#0B2E63] transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
