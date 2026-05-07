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
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-cris-blue dark:text-cris-blue-light',
    tagBg: 'bg-cris-blue/10 dark:bg-cris-blue/20',
    tagColor: 'text-cris-blue dark:text-cris-blue-light',
    barColor: 'bg-gradient-to-r from-cris-blue to-blue-400',
    badgeIcon: Zap,
  },
  {
    key: 'module_2',
    icon: HeadphonesIcon,
    iconBg: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    tagBg: 'bg-violet-100 dark:bg-violet-900/30',
    tagColor: 'text-violet-700 dark:text-violet-400',
    barColor: 'bg-gradient-to-r from-violet-500 to-purple-500',
    badgeIcon: Brain,
  },
  {
    key: 'module_3',
    icon: Wrench,
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    tagBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    tagColor: 'text-emerald-700 dark:text-emerald-400',
    barColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    badgeIcon: Activity,
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
      className="card group cursor-pointer hover:-translate-y-1"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top colour bar */}
      <div className={`h-1 w-full ${meta.barColor} rounded-t-2xl -mt-px -mx-px`} />

      <div className="p-8 pt-6">
        {/* Tag */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${meta.tagBg} ${meta.tagColor} mb-5`}>
          <BadgeIcon size={11} />
          {t(`solutions.${meta.key}_tag`)}
        </span>

        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${meta.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={24} className={meta.iconColor} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t(`solutions.${meta.key}_title`)}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {t(`solutions.${meta.key}_subtitle`)}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          {t(`solutions.${meta.key}_desc`)}
        </p>

        {/* Expandable features */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              {t('solutions.feature_label')}
            </p>
            <ul className="space-y-2.5">
              {Array.isArray(features) && features.map((feat, fi) => (
                <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 size={15} className="text-cris-blue dark:text-cris-blue-light mt-0.5 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {expanded ? '收起 ↑' : '展開功能 ↓'}
          </span>
          <Link
            to="/contact"
            className="btn-primary text-xs px-4 py-2 gap-1.5"
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
  const gridRef   = useRef(null)
  const ctaRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const gridInView   = useInView(gridRef,   { once: true, margin: '-60px' })
  const ctaInView    = useInView(ctaRef,    { once: true, margin: '-60px' })
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">

      {/* Header */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-cris-blue dark:text-cris-blue-light uppercase tracking-widest">
              {t('solutions.tag')}
            </span>
            <h1 className="section-title mt-3">{t('solutions.title')}</h1>
            <p className="section-subtitle">{t('solutions.subtitle')}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary text-sm px-6 py-3">
                {t('solutions.cta_demo')} <ArrowRight size={16} />
              </Link>
              <Link to="/products/ai-box" className="btn-outline text-sm px-6 py-3">
                {t('solutions.cta_learn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16">
        <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modulesMeta.map((meta, i) => (
              <ModuleCard key={meta.key} meta={meta} index={i} isInView={gridInView} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div ref={ctaRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold text-cris-blue dark:text-cris-blue-light uppercase tracking-widest">
              Powered by Argox AI Engine
            </span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              所有模組均可搭載 CRIS AI 一體機
            </h3>
            <p className="section-subtitle mt-3 text-sm">
              私有化部署，數據永不離開企業內網。從導入評估到上線僅需 7 天，顧問團隊全程陪伴。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary text-sm px-6 py-3">
                預約 AI 落地顧問 <ArrowRight size={16} />
              </Link>
              <Link to="/products/ai-box" className="btn-outline text-sm px-6 py-3">
                了解一體機規格
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
