'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, X, Images } from 'lucide-react';
import { staggerContainer, scaleIn, fadeInUp, viewportConfig } from '@/lib/animations';

const galleryItems = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Logística y envíos',
    className: 'col-span-2 row-span-2',
    large: true,
  },
  {
    id: 2,
    type: 'image',
    src: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Transporte de carga',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Recolección de paquetes',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    type: 'image',
    src: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Centro de distribución',
    className: 'col-span-1 row-span-2',
  },
  {
    id: 5,
    type: 'image',
    src: 'https://images.pexels.com/photos/2860753/pexels-photo-2860753.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Paquetes y cajas',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 6,
    type: 'image',
    src: 'https://images.pexels.com/photos/7464218/pexels-photo-7464218.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Clasificación de carga',
    className: 'col-span-1 row-span-1',
  },
] as const;

function LightboxModal({ item, onClose }: { item: typeof galleryItems[number]; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover max-h-[80vh]"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const t = useTranslations('gallery');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[number] | null>(null);

  return (
    <section ref={ref} className="section-padding bg-[#F5F7FA] relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
            style={{ background: 'rgba(11,46,99,0.08)', color: '#0B2E63', border: '1px solid rgba(11,46,99,0.1)' }}
          >
            <Images size={14} />
            Galería
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4">{t('title')}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              onClick={() => setSelectedItem(item)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.className}`}
              whileHover={{ scale: 1.01 }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0B2E63]/0 group-hover:bg-[#0B2E63]/50 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"
                >
                  <Play size={18} className="text-[#0B2E63] ml-0.5" fill="#0B2E63" />
                </motion.div>
              </div>
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium">{item.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}
