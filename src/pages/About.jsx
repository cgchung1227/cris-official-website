import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Award, Star, ArrowRight, Target, Heart, Zap, Leaf } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Non-translatable metadata (icons, tiers, layout flags)
const milestonesMeta = [
  { year: '2016', featured: false, geoIcon: MapPin, awardTier: null },
  { year: '2017', featured: false, geoIcon: null,   awardTier: 'gold' },
  { year: '2018', featured: false, geoIcon: MapPin, awardTier: null },
  { year: '2019', featured: false, geoIcon: null,   awardTier: 'gold' },
  { year: '2020', featured: false, geoIcon: null,   awardTier: 'silver' },
  { year: '2022', featured: false, geoIcon: null,   awardTier: null },
  { year: '2024', featured: true,  geoIcon: null,   awardTier: null },
]

const valuesMeta = [Target, Heart, Leaf]

// ─── Sub-components ──────────────────────────────────────────────────────────

function AwardBadge({ label, tier }) {
  const isGold = tier === 'gold'
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
      isGold
        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/50'
        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
    }`}>
      {isGold ? <Star size={12} className="fill-amber-500 text-amber-500" /> : <Award size={12} />}
      {label}
    </span>
  )
}

function TimelineItem({ meta, data, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = index % 2 === 0

  if (meta.featured) {
    return (
      <div ref={ref} className="relative flex justify-center mb-8">
        <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cris-blue border-4 border-white dark:border-slate-950 shadow-lg z-10 top-8" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl mx-auto mt-2 px-8"
        >
          <div className="relative bg-gradient-to-br from-cris-blue to-cris-blue-dark dark:from-cris-blue-dark dark:to-slate-800 rounded-2xl p-8 shadow-xl shadow-cris-blue/20 border border-cris-blue/30 text-white overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl font-extrabold text-white/90">{meta.year}</span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                  <Leaf size={12} /> {data.featured_badge}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{data.title}</h3>
              <p className="text-blue-100 leading-relaxed mb-6">{data.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Array.isArray(data.ceo_features) && data.ceo_features.map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white">
                    <Zap size={14} className="text-blue-200 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const GeoIcon = meta.geoIcon

  return (
    <div ref={ref} className="relative flex items-start gap-0 mb-6">
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-[3px] border-cris-blue z-10 top-6" />

      {/* Left column */}
      <div className={`w-1/2 pr-10 ${isLeft ? '' : 'invisible'}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 text-right"
          >
            <span className="text-3xl font-extrabold text-cris-blue dark:text-cris-blue-light">{meta.year}</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-2">{data.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{data.desc}</p>
            <div className="mt-3 flex flex-col items-end gap-2">
              {data.award_label && <AwardBadge label={data.award_label} tier={meta.awardTier} />}
              {data.geo_label && GeoIcon && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <GeoIcon size={12} />
                  {data.geo_label}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Right column */}
      <div className={`w-1/2 pl-10 ${isLeft ? 'invisible' : ''}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
          >
            <span className="text-3xl font-extrabold text-cris-blue dark:text-cris-blue-light">{meta.year}</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-2">{data.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{data.desc}</p>
            <div className="mt-3 flex flex-col items-start gap-2">
              {data.award_label && <AwardBadge label={data.award_label} tier={meta.awardTier} />}
              {data.geo_label && GeoIcon && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <GeoIcon size={12} />
                  {data.geo_label}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  const { t } = useTranslation()
  const visionRef = useRef(null)
  const visionInView = useInView(visionRef, { once: true, margin: '-80px' })
  const valuesRef = useRef(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' })

  const values = t('about.values', { returnObjects: true })
  const milestones = t('about.milestones', { returnObjects: true })

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, #4C86E3 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cris-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/[0.06] rounded-full blur-[80px] pointer-events-none" />

        {/* Tech accent lines */}
        <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none overflow-hidden opacity-[0.15]">
          <svg viewBox="0 0 288 288" fill="none" className="w-full h-full">
            <line x1="288" y1="0"   x2="0"   y2="288" stroke="#4C86E3" strokeWidth="0.8" />
            <line x1="288" y1="56"  x2="56"  y2="288" stroke="#4C86E3" strokeWidth="0.5" />
            <line x1="288" y1="112" x2="112" y2="288" stroke="#4C86E3" strokeWidth="0.5" />
            <circle cx="248" cy="40" r="2.5" fill="#4C86E3" opacity="0.8" />
            <circle cx="200" cy="88" r="1.8" fill="#4C86E3" opacity="0.55" />
          </svg>
        </div>

        {/* Micro-icons */}
        {[
          { kind: 'gear', left: '5%',  top: '20%', size: 20, delay: 0,   dur: 13, rot: 1  },
          { kind: 'leaf', left: '90%', top: '25%', size: 17, delay: 1.3, dur: 10, rot: -1 },
          { kind: 'gear', left: '88%', top: '72%', size: 14, delay: 0.8, dur: 15, rot: 1  },
          { kind: 'leaf', left: '4%',  top: '78%', size: 19, delay: 2.0, dur: 11, rot: 1  },
        ].map((ic, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none opacity-[0.20]"
            style={{ left: ic.left, top: ic.top }}
            animate={
              ic.kind === 'gear'
                ? { rotate: [0, 360] }
                : { y: [0, -10, 0], rotate: [0, ic.rot * 16, 0] }
            }
            transition={{ duration: ic.dur, delay: ic.delay, repeat: Infinity, ease: ic.kind === 'gear' ? 'linear' : 'easeInOut' }}
          >
            {ic.kind === 'gear' ? (
              <svg width={ic.size} height={ic.size} viewBox="0 0 24 24" fill="none" stroke="#4C86E3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            ) : (
              <svg width={ic.size} height={ic.size} viewBox="0 0 24 24" fill="none" stroke="#4C86E3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            )}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cris-blue/20 border border-cris-blue/30 text-cris-blue-light text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-cris-blue-light animate-pulse" />
              {t('about.hero_badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {t('about.hero_title')} <span className="text-cris-blue-light">CRIS</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            {t('about.hero_subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── Vision & Values ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={visionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-cris-blue dark:text-cris-blue-light uppercase tracking-widest">{t('about.vision_tag')}</span>
            <h2 className="section-title mt-3">Vision & Mission</h2>
            <p className="section-subtitle">
              {t('about.vision_sub1')}
              <br />
              {t('about.vision_sub2')}
            </p>
          </motion.div>

          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(values) && values.map((v, i) => {
              const Icon = valuesMeta[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card text-center"
                >
                  <div className="inline-flex p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 mb-4">
                    <Icon size={26} className="text-cris-blue dark:text-cris-blue-light" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{v.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-cris-blue dark:text-cris-blue-light uppercase tracking-widest">{t('about.timeline_tag')}</span>
            <h2 className="section-title mt-3">Our Journey</h2>
            <p className="section-subtitle">{t('about.timeline_sub')}</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cris-blue/30 via-cris-blue/60 to-cris-blue/10" />
            {Array.isArray(milestones) && milestones.map((data, i) => (
              <TimelineItem key={milestonesMeta[i].year} meta={milestonesMeta[i]} data={data} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team & Culture ── */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-cris-blue dark:text-cris-blue-light uppercase tracking-widest">
              {t('about.team_tag')}
            </span>
            <h2 className="section-title mt-3">{t('about.team_title')}</h2>
            <p className="section-subtitle">{t('about.team_sub')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl shadow-xl mb-10 group"
          >
            <img
              src={import.meta.env.BASE_URL + 'company-01.png'}
              alt={t('about.team_img1')}
              className="w-full h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[import.meta.env.BASE_URL + 'company-02.png', import.meta.env.BASE_URL + 'company-03.png'].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="overflow-hidden rounded-2xl shadow-lg group"
              >
                <img
                  src={src}
                  alt={`${t('about.team_img2')} ${i + 2}`}
                  className="w-full h-60 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">{t('about.cta_title')}</h2>
            <p className="section-subtitle mt-4">{t('about.cta_sub')}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products/aps" className="btn-primary px-8 py-4 text-base">
                {t('about.cta_aps')} <ArrowRight size={18} />
              </Link>
              <Link to="/#contact" className="btn-outline px-8 py-4 text-base">
                {t('about.cta_contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
