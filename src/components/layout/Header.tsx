'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { key: 'inicio', href: '#inicio' },
  { key: 'servicios', href: '#servicios' },
  { key: 'promocion', href: '#promocion' },
  { key: 'cobertura', href: '#cobertura' },
  { key: 'nosotros', href: '#nosotros' },
  { key: 'contacto', href: '#contacto' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') || '/');
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveLink(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-light shadow-lg shadow-blue-950/5 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <motion.a
              href="#inicio"
              onClick={(e) => { e.preventDefault(); scrollTo('#inicio'); }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 flex-shrink-0"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-go-logistic-web.png"
                  alt="GO Logistics Express LLC"
                  width={scrolled ? 120 : 130}
                  height={scrolled ? 50 : 55}
                  className="object-contain transition-all duration-300"
                  priority
                />
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    scrolled
                      ? 'text-gray-700 hover:text-[#0B2E63] hover:bg-blue-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {t(link.key)}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Phone */}
              <a
                href="tel:+18138626936"
                className={cn(
                  'hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors',
                  scrolled ? 'text-gray-600 hover:text-[#0B2E63]' : 'text-white/70 hover:text-white'
                )}
              >
                <Phone size={14} />
                <span className="hidden xl:block">(813) 862-6936</span>
              </a>

              {/* Lang Toggle */}
              <button
                onClick={switchLocale}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all',
                  scrolled
                    ? 'text-gray-600 hover:text-[#0B2E63] hover:bg-blue-50 border border-gray-200'
                    : 'text-white/70 hover:text-white hover:bg-white/10 border border-white/20'
                )}
              >
                <Globe size={12} />
                {locale.toUpperCase()}
              </button>

              {/* CTA Button */}
              <motion.button
                onClick={() => scrollTo('#contacto')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex btn-magnetic items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
              >
                <span>{t('cta')}</span>
              </motion.button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors',
                  scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                )}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <Image
                  src="/logo-go-logistic-web.png"
                  alt="GO Logistics Express LLC"
                  width={110}
                  height={45}
                  className="object-contain"
                />
                <button onClick={() => setMobileOpen(false)} className="p-1 text-gray-500">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(link.href)}
                    className="text-left px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-[#0B2E63] transition-colors"
                  >
                    {t(link.key)}
                  </motion.button>
                ))}
              </nav>
              <div className="p-5 border-t border-gray-100 flex flex-col gap-3">
                <button
                  onClick={() => { scrollTo('#contacto'); }}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white text-center"
                  style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
                >
                  {t('cta')}
                </button>
                <div className="flex items-center justify-between">
                  <a href="tel:+18138626936" className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} />
                    (813) 862-6936
                  </a>
                  <button
                    onClick={switchLocale}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600"
                  >
                    <Globe size={12} />
                    {locale === 'es' ? 'EN' : 'ES'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
