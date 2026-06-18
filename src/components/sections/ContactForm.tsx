'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, CheckCircle, User, Phone, MapPin, Package, MessageSquare } from 'lucide-react';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportConfig } from '@/lib/animations';

interface FormData {
  name: string;
  phone: string;
  city: string;
  type: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  city?: string;
  type?: string;
}

const texasCities = ['Austin', 'San Marcos', 'San Antonio', 'Irving', 'Georgetown', 'Pflugerville', 'Round Rock', 'Houston', 'Dallas'];

export default function ContactForm() {
  const t = useTranslations('contact');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', city: '', type: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t('required');
    if (!formData.phone.trim() || !/^\+?[\d\s\-\(\)]{7,}$/.test(formData.phone)) newErrors.phone = t('phone_invalid');
    if (!formData.city) newErrors.city = t('required');
    if (!formData.type) newErrors.type = t('required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm transition-all outline-none font-medium placeholder-gray-400 ${errors[field]
      ? 'border-[#D72638] bg-red-50 focus:border-[#D72638] focus:ring-2 focus:ring-[#D72638]/20'
      : 'border-gray-200 bg-gray-50 focus:border-[#0B2E63] focus:ring-2 focus:ring-[#0B2E63]/10 focus:bg-white'
    }`;

  return (
    <section
      id="contacto"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5F7FA 0%, #ffffff 60%, #F5F7FA 100%)' }}
    >
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
              style={{ background: 'rgba(11,46,99,0.08)', color: '#0B2E63', border: '1px solid rgba(11,46,99,0.1)' }}
            >
              <Send size={14} />
              {t('badge')}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4 leading-tight">
              {t('title')}
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  title: t('phone_label'),
                  value: '(813) 862-6936',
                  href: 'tel:+18138626936',
                  color: '#0B2E63',
                },
                {
                  icon: () => (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#16A34A">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                  title: t('whatsapp_label'),
                  value: t('whatsapp_cta'),
                  href: 'https://wa.me/18138626936',
                  color: '#16A34A',
                },
              ].map(({ icon: Icon, title, value, href, color }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#0B2E63]/20 hover:shadow-md transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}10` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{title}</div>
                    <div className="font-bold text-[#111827] group-hover:text-[#0B2E63] transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Promo reminder */}
            <motion.div
              className="mt-6 p-5 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
              animate={{ boxShadow: ['0 4px 20px rgba(215,38,56,0.2)', '0 8px 40px rgba(215,38,56,0.4)', '0 4px 20px rgba(215,38,56,0.2)'] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="font-bold text-sm">{t('promo_reminder_title')}</div>
                  <div className="text-white/80 text-xs mt-1">{t('promo_reminder_body')}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div
              className="bg-white rounded-3xl p-8 md:p-10"
              style={{ boxShadow: '0 20px 60px rgba(11,46,99,0.08)', border: '1px solid rgba(11,46,99,0.06)' }}
            >
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle size={36} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-[#111827] mb-2">{t('success_title')}</h3>
                  <p className="text-gray-500">{t('success_msg')}</p>
                  <button
                    onClick={() => { setSuccess(false); setFormData({ name: '', phone: '', city: '', type: '', message: '' }); }}
                    className="mt-6 px-6 py-3 rounded-xl text-sm font-semibold text-[#0B2E63] border border-[#0B2E63]/20 hover:bg-[#0B2E63] hover:text-white transition-all"
                  >
                    {t('new_request')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('name')} *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        className={`${inputClass('name')} pl-11`}
                        placeholder="Juan García"
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    {errors.name && <p className="text-[#D72638] text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone + City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('phone')} *</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          className={`${inputClass('phone')} pl-11`}
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        />
                      </div>
                      {errors.phone && <p className="text-[#D72638] text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('city')} *</label>
                      <div className="relative">
                        <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          className={`${inputClass('city')} pl-11 appearance-none`}
                          value={formData.city}
                          onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                        >
                          <option value="">{t('city_placeholder')}</option>
                          {texasCities.map(c => <option key={c} value={c}>{c}, TX</option>)}
                        </select>
                      </div>
                      {errors.city && <p className="text-[#D72638] text-xs mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('type')} *</label>
                    <div className="relative">
                      <Package size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select
                        className={`${inputClass('type')} pl-11 appearance-none`}
                        value={formData.type}
                        onChange={(e) => setFormData(p => ({ ...p, type: e.target.value }))}
                      >
                        <option value="">{t('type_placeholder')}</option>
                        <option value="small">{t('type_small')} — $60</option>
                        <option value="medium">{t('type_medium')} — $120</option>
                        <option value="large">{t('type_large')} — $170</option>
                        <option value="xlarge">{t('type_xlarge')} — $240</option>
                        <option value="cargo">{t('type_cargo')}</option>
                      </select>
                    </div>
                    {errors.type && <p className="text-[#D72638] text-xs mt-1">{errors.type}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('message')}</label>
                    <div className="relative">
                      <MessageSquare size={15} className="absolute left-4 top-4 text-gray-400" />
                      <textarea
                        rows={4}
                        className="w-full pl-11 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all outline-none font-medium placeholder-gray-400 focus:border-[#0B2E63] focus:ring-2 focus:ring-[#0B2E63]/10 focus:bg-white resize-none"
                        placeholder={t('message_placeholder')}
                        value={formData.message}
                        onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, boxShadow: '0 20px 40px rgba(215,38,56,0.3)' } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center gap-2.5 btn-magnetic disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #D72638, #b01e2d)' }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        {t('submitting')}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t('submit')}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
