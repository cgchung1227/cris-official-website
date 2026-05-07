import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BarChart2, HeadphonesIcon, Wrench,
  CheckCircle2, ArrowRight, Zap, Brain, Activity,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const modulesMeta = [
  {
    key: 'module_1',
    icon: BarChart2,
    accentColor: 'from-blue-500 to-indigo-600',
    glowColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    badgeIcon: Zap,
    href: '/contact',
  },
  {
    key: 'module_2',
    icon: HeadphonesIcon,
    accentColor: 'from-violet-500 to-purple-600',
    glowColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    badgeIcon: Brain,
    href: '/contact',
  },
  {
    key: 'module_3',
    icon: Wrench,
    accentColor: 'from-emerald-500 to-teal-600',
    glowColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    badgeIcon: Activity,
    href: '/contact',
  },
]

function ModuleCard({ meta, index, isInView }) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation()
  const Icon = meta.icon
  const BadgeIcon = meta.badgeIcon
  const features = t(`solutions.${meta.key}_features`, { returnObjects: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`relative bg-slate-900 border ${meta.borderColor} rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${meta.accentColor}`} />

      <div className="p-8">
        {/* Tag */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${meta.tagColor} mb-6`}>
          <BadgeIcon size={11} />
          {t(`solutions.${meta.key}_tag`)}
        </span>

        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${meta.glowColor} flex items-center justify-center flex-shrink-0`}>
            <Icon size={24} className="text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{t(`solutions.${meta.key}_title`)}</h3>
            <p className="text-sm text-slate-400 mt-0.5">{t(`solutions.${meta.key}_subtitle`)}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed">{t(`solutions.${meta.key}_desc`)}</p>

        {/* Features */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">{t('solutions.feature_label')}</p>
            <ul className="space-y-2.5">
              {Array.isArray(features) && features.map((feat, fi) => (
                <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA row */}
        <div className="mt-6 flex items-center justify-between">
          <span className={`text-xs font-medium ${expanded ? 'text-slate-500' : 'text-slate-500'}`}>
            {expanded ? '收起 ↑' : '展開功能 ↓'}
          </span>
          <Link
            to="/contact"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r ${meta.accentColor} text-white hover:opacity-90 transition-opacity`}
            onClick={e => e.stopPropagation()}
          >
            {t('solutions.cta_demo')} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function Solutions() {
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-cris-blue/[0.07] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] bg-violet-500/[0.05] rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'radial-gradient(circle, #60A5FA 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cris-blue/10 border border-cris-blue/20 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {t('solutions.tag')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              {t('solutions.title')}
            </h1>
            <p className="mt-5 text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('solutions.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cris-blue hover:bg-cris-blue-dark text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-cris-blue/20">
                {t('solutions.cta_demo')} <ArrowRight size={16} />
              </Link>
              <Link to="/products/ai-box" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-cris-blue/50 text-slate-300 hover:text-white text-sm font-semibold transition-all">
                {t('solutions.cta_learn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="pb-24">
        <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modulesMeta.map((meta, i) => (
              <ModuleCard key={meta.key} meta={meta} index={i} isInView={gridInView} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center bg-slate-900/60 border border-slate-800 rounded-2xl px-8 py-12"
          >
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Powered by Argox AI Engine</p>
            <h3 className="text-2xl font-bold text-white mb-3">所有模組均可搭載 CRIS AI 一體機</h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
              私有化部署，數據永不離開企業內網。從導入評估到上線僅需 7 天，顧問團隊全程陪伴。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cris-blue hover:bg-cris-blue-dark text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-cris-blue/20">
                預約 AI 落地顧問 <ArrowRight size={16} />
              </Link>
              <Link to="/products/ai-box" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-cris-blue/50 text-slate-300 hover:text-white text-sm font-semibold transition-all">
                了解一體機規格
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
