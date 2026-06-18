'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Phone, ExternalLink, ArrowRight, Share2, Users, PlayCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import Image from 'next/image';

const footerServices = ['s1', 's2', 's3', 's4', 's5'] as const;
const texasCities = ['Austin', 'San Antonio', 'Houston', 'Dallas', 'Irving', 'Round Rock', 'Georgetown', 'San Marcos', 'Pflugerville'];

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #081f45 0%, #050e22 100%)' }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Top Divider */}
      <div className="relative h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo-go-logistic-web-blanco.png"
                alt="GO Logistics Express LLC"
                width={160}
                height={66}
                className="object-contain"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-[220px]">
              {t('tagline')}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                              { Icon: Share2, href: '#', label: 'Instagram' },
                { Icon: Users, href: '#', label: 'Facebook' },
                { Icon: PlayCircle, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t('services_title')}</h4>
            <ul className="space-y-2.5">
              {footerServices.map((key) => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo('#servicios')}
                    className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors group"
                  >
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {t(key)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coverage */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t('coverage_title')}</h4>
            <ul className="space-y-2.5">
              {texasCities.map((city) => (
                <li key={city}>
                  <span className="flex items-center gap-2 text-white/50 text-sm">
                    <MapPin size={11} className="text-[#D72638]" />
                    {city}, TX
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t('contact_title')}</h4>
            <div className="space-y-3">
              <a
                href="tel:+18138626936"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5">
                  <Phone size={13} />
                </div>
                <span>{t('phone')}</span>
              </a>
              <a
                href="https://wa.me/18138626936"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* CTA mini */}
            <motion.button
              onClick={() => scrollTo('#contacto')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 w-full py-3 rounded-xl text-sm font-semibold text-white text-center btn-magnetic"
              style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
            >
              {t('cta')}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {year} GO Logistics Express LLC. {t('rights')}
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1.5">
            {t('created_by')}{' '}
            <a
              href="https://ruedalarolamedia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#D72638] transition-colors font-medium flex items-center gap-1"
            >
              Rueda La Rola Media
              <ExternalLink size={10} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
