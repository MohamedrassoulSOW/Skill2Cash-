import { useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CATEGORIES,
  OPPORTUNITIES,
  type Category,
  type Opportunity,
} from './data/opportunities'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

function categoryLabel(cat: Category) {
  return CATEGORIES.find((c) => c.id === cat)?.label ?? cat
}

export default function App() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [selected, setSelected] = useState<Opportunity | null>(null)
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<'idle' | 'ok' | 'err'>('idle')

  const list = useMemo(() => {
    if (filter === 'all') return OPPORTUNITIES
    return OPPORTUNITIES.filter((o) => o.category === filter)
  }, [filter])

  function onAlertSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!ok) {
      setFormState('err')
      return
    }
    const leads = JSON.parse(localStorage.getItem('s2c_leads') ?? '[]') as string[]
    if (!leads.includes(email.trim().toLowerCase())) {
      leads.push(email.trim().toLowerCase())
      localStorage.setItem('s2c_leads', JSON.stringify(leads))
    }
    setFormState('ok')
    setEmail('')
  }

  return (
    <>
      <div className="grain" aria-hidden />

      <header className="shell nav">
        <a className="brand" href="#top">
          <span className="brand-mark">S2</span>
          Skill2Cash
        </a>
        <nav className="nav-links">
          <a href="#opportunites">Opportunités</a>
          <a href="#monetiser">Monétiser</a>
          <a className="btn btn-primary btn-small" href="#alertes">
            Alertes Premium
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero shell">
          <div className="hero-bg" aria-hidden />
          <div className="hero-visual" aria-hidden>
            <div className="coin-orbit" />
            <div className="hero-ring" />
          </div>

          <div className="hero-content">
            <motion.h1
              className="brand-hero"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Skill<span>2</span>Cash
            </motion.h1>
            <motion.p
              className="hero-headline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
            >
              Transforme clairement les compétences en revenus
            </motion.p>
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Choisis une piste alignée avec ce que tu sais déjà faire, suis le
              plan, et convertis ton skill en cash.
            </motion.p>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              <a className="btn btn-primary" href="#opportunites">
                Voir les opportunités
              </a>
              <a className="btn btn-ghost" href="#comment">
                Comment ça marche
              </a>
            </motion.div>
          </div>
        </section>

        <section id="comment" className="section shell">
          <div className="section-head">
            <h2>Trois pas, zéro blabla</h2>
            <p>
              Tu monétises plus vite quand tu vendes une compétence que le marché
              demande déjà — pas une idée au hasard.
            </p>
          </div>
          <div className="steps">
            {[
              {
                n: '01',
                t: 'Choisis une piste',
                d: 'Filtre par type : freelance, affiliation, digital ou local.',
              },
              {
                n: '02',
                t: 'Exécute le plan',
                d: 'Chaque carte a des étapes claires pour démarrer cette semaine.',
              },
              {
                n: '03',
                t: 'Encaisse & scale',
                d: 'Utilise les outils affiliés, puis passe en premium pour les alertes.',
              },
            ].map((s, i) => (
              <motion.article
                key={s.n}
                className="step"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                <div className="step-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="opportunites" className="section shell">
          <div className="section-head">
            <h2>Opportunités du moment</h2>
            <p>
              Sélection orientée cash flow. Remplace les liens par tes propres
              liens d’affiliation pour gagner sur chaque clic.
            </p>
          </div>

          <div className="filters" role="tablist" aria-label="Filtres">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={filter === c.id}
                className={`filter-chip${filter === c.id ? ' active' : ''}`}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid">
            <AnimatePresence mode="popLayout">
              {list.map((op, i) => (
                <motion.article
                  layout
                  key={op.id}
                  className="card"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.96 }}
                >
                  <div className="card-top">
                    <span className="badge">{categoryLabel(op.category)}</span>
                    <span className="difficulty">{op.difficulty}</span>
                  </div>
                  <h3>{op.title}</h3>
                  <div className="card-meta">
                    <div>
                      Potentiel : <strong>{op.payout}</strong>
                    </div>
                    <div>
                      Démarrage : <strong>{op.timeToStart}</strong>
                    </div>
                  </div>
                  <p>{op.summary}</p>
                  <div className="tags">
                    {op.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions">
                    <button
                      type="button"
                      className="btn btn-primary btn-small"
                      onClick={() => setSelected(op)}
                    >
                      Voir le plan
                    </button>
                    <a
                      className="btn btn-ghost btn-small"
                      href={op.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {op.affiliateLabel}
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section id="monetiser" className="section shell">
          <div className="section-head">
            <h2>Comment tu gagnes avec cette app</h2>
            <p>
              Le produit est déjà un business : tu peux le lancer aujourd’hui et
              empiler les revenus.
            </p>
          </div>
          <div className="model">
            {[
              {
                t: 'Affiliation',
                d: 'Remplace chaque URL par ton lien tracké. Tu touches une commission quand quelqu’un s’inscrit.',
              },
              {
                t: 'Alertes Premium',
                d: '29–99 MAD/mois : nouvelles pistes, deals, scripts de vente. La liste email est déjà capturée.',
              },
              {
                t: 'Leads B2B',
                d: 'Vends l’accès aux inscrits (coachs, formations, outils) ou monétise via sponsors newsletter.',
              },
            ].map((m, i) => (
              <motion.div
                key={m.t}
                className="model-item"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="alertes" className="section shell">
          <div className="alerts">
            <div>
              <h2>Alertes Skill2Cash — early access</h2>
              <p>
                Reçois les meilleures pistes avant tout le monde. Gratuit pour
                l’instant : tu construis ta liste, tu factures plus tard.
              </p>
            </div>
            <form className="alert-form" onSubmit={onAlertSubmit}>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setFormState('idle')
                }}
                autoComplete="email"
                required
              />
              <button className="btn btn-primary" type="submit">
                Rejoindre la liste
              </button>
              {formState === 'ok' && (
                <p className="form-ok">C’est noté. Surveille ta boîte mail.</p>
              )}
              {formState === 'err' && (
                <p className="form-err">Entre un email valide.</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <div>
          <strong style={{ color: 'var(--ink)' }}>Skill2Cash</strong>
          <div>© {new Date().getFullYear()} — skills → cash</div>
        </div>
        <p className="disclaimer">
          Aucune garantie de revenus. Les montants sont indicatifs. Remplace les
          liens par tes affiliations et vérifie les conditions de chaque
          plateforme.
        </p>
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="detail"
              role="dialog"
              aria-modal="true"
              aria-labelledby="detail-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="detail-head">
                <div>
                  <span className="badge">{categoryLabel(selected.category)}</span>
                  <h3 id="detail-title">{selected.title}</h3>
                </div>
                <button
                  type="button"
                  className="close-btn"
                  aria-label="Fermer"
                  onClick={() => setSelected(null)}
                >
                  ×
                </button>
              </div>
              <div className="card-meta" style={{ marginBottom: '1rem' }}>
                <div>
                  Potentiel : <strong>{selected.payout}</strong>
                </div>
                <div>
                  Démarrage : <strong>{selected.timeToStart}</strong> ·{' '}
                  {selected.difficulty}
                </div>
              </div>
              <p style={{ color: 'var(--ink-muted)', marginTop: 0 }}>
                {selected.summary}
              </p>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  margin: '1.25rem 0 0.5rem',
                }}
              >
                Plan d’attaque
              </h4>
              <ol>
                {selected.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <a
                className="btn btn-primary"
                href={selected.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '100%' }}
              >
                {selected.affiliateLabel} →
              </a>
              <p className="detail-note">
                Astuce cash : remplace ce lien par ton URL d’affiliation dans{' '}
                <code>src/data/opportunities.ts</code>.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>
    </>
  )
}
