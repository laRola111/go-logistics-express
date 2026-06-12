'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Truck, Package, Send, CheckCircle2 } from 'lucide-react';
import { fadeInUp, viewportConfig } from '@/lib/animations';

const steps = [
  { key: 'step1', icon: MessageSquare, color: '#0B2E63', number: '01' },
  { key: 'step2', icon: Truck, color: '#163F86', number: '02' },
  { key: 'step3', icon: Package, color: '#D72638', number: '03' },
  { key: 'step4', icon: Send, color: '#163F86', number: '04' },
  { key: 'step5', icon: CheckCircle2, color: '#16A34A', number: '05' },
] as const;

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="nosotros"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5F7FA 0%, #ffffff 100%)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
            style={{ background: 'rgba(11,46,99,0.08)', color: '#0B2E63', border: '1px solid rgba(11,46,99,0.1)' }}
          >
            <CheckCircle2 size={14} />
            Proceso Simple
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4 text-balance">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gray-100 md:-translate-x-px" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-[28px] md:left-1/2 top-0 w-px origin-top md:-translate-x-px"
            style={{ background: 'linear-gradient(180deg, #0B2E63, #D72638, #16A34A)' }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start md:items-center gap-6 mb-10 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 md:max-w-[calc(50%-40px)] ${isEven ? 'pl-16 md:pl-0' : 'pl-16 md:pr-0 md:text-right'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    style={{ boxShadow: '0 4px 24px rgba(11,46,99,0.06)' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${step.color}12` }}
                      >
                        <Icon size={16} style={{ color: step.color }} />
                      </div>
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: step.color }}
                      >
                        Paso {step.number}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#111827] text-lg mb-1">
                      {t(`${step.key}_title` as never)}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {t(`${step.key}_desc` as never)}
                    </p>
                  </motion.div>
                </div>

                {/* Center Pin — desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 300 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* Mobile Pin */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 300 }}
                  className="md:hidden absolute left-0 top-5 w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                >
                  {step.number}
                </motion.div>

                {/* Spacer for even items */}
                {isEven && <div className="hidden md:block flex-1" />}
                {!isEven && <div className="hidden md:block flex-1 order-first" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
