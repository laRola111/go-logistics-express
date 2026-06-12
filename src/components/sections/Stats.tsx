'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Package, Users, Shield, Headphones } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

interface StatData {
  value: number;
  suffix: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  labelKey: string;
  color: string;
}

const stats: StatData[] = [
  { value: 5000, suffix: '+', icon: Package, labelKey: 'packages', color: '#D72638' },
  { value: 98, suffix: '%', icon: Users, labelKey: 'satisfaction', color: '#16A34A' },
  { value: 100, suffix: '%', icon: Shield, labelKey: 'security', color: '#FFFFFF' },
  { value: 24, suffix: '/7', icon: Headphones, labelKey: 'support', color: '#F59E0B' },
];

function CountUp({ target, suffix, trigger }: { target: number; suffix: string; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const t = useTranslations('stats');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B2E63 0%, #163F86 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(215,38,56,0.15) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.labelKey}
                variants={fadeInUp}
                className="relative text-center group"
              >
                <div
                  className="relative rounded-2xl p-6 md:p-8 card-hover"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}30` }}
                  >
                    <span style={{ color: stat.color }}>
                      <Icon size={22} />
                    </span>
                  </div>

                  {/* Counter */}
                  <div
                    className="text-4xl md:text-5xl font-black mb-2 tabular-nums"
                    style={{ color: stat.color }}
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} trigger={inView} />
                  </div>

                  {/* Label */}
                  <p className="text-white/60 text-sm font-medium leading-snug">
                    {t(stat.labelKey as 'packages' | 'satisfaction' | 'security' | 'support')}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full opacity-50"
                    style={{ background: stat.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
