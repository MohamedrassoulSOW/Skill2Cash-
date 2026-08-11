import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  PREMIUM_PRICE,
  PREMIUM_PRICE_NOTE,
  whatsappUrl,
} from './config'
import {
  CATEGORIES,
  matchOpportunities,
  OPPORTUNITIES,
  SKILLS,
  type Category,
  type Opportunity,
  type SkillId,
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

const FAQ = [
  {
    q: 'Est-ce que je peux gagner sans diplôme ?',
    a: 'Oui. On part de ce que tu sais déjà faire (même basique) et on te donne un plan + un message de vente prêt à envoyer.',
  },
  {
    q: 'Combien de temps avant le 1er client ?',
    a: 'Les pistes “hot” sont pensées pour démarrer en quelques jours si tu prospectes chaque jour. Rien n’est magique : c’est l’exécution.',
  },
  {
    q: 'C’est quoi le Pack Skill2Cash ?',
    a: 'Accès aux pistes prioritaires, scripts de prospection, checklist 7 jours, et support WhatsApp pour débloquer tes premiers clients.',
  },
  {
    q: 'Je n’ai aucune compétence, je fais quoi ?',
    a: 'Choisis “Je débute”. On te oriente vers WhatsApp Business, templates simples ou affiliation contenu — des voies accessibles.',
  },
]

function categoryLabel(cat: Category) {
  return CATEGORIES.find((c) => c.id === cat)?.label ?? cat
}

function saveLead(payload: Record<string, string>) {
  const leads = JSON.parse(localStorage.getItem('s2c_leads') ?? '[]') as Record<
    string,
    string
  >[]
  leads.push({ ...payload, at: new Date().toISOString() })
  localStorage.setItem('s2c_leads', JSON.stringify(leads))
}

export default function App() {
  const [skill, setSkill] = useState<SkillId | null>(null)
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [selected, setSelected] = useState<Opportunity | null>(null)
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<'idle' | 'ok' | 'err'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const matched = useMemo(() => matchOpportunities(skill), [skill])

  const list = useMemo(() => {
    const base = skill ? matched : OPPORTUNITIES
    if (filter === 'all') return base
    return base.filter((o) => o.category === filter)
  }, [filter, matched, skill])

  function pickSkill(id: SkillId) {
    setSkill(id)
    setFilter('all')
    requestAnimationFrame(() => {
      document.getElementById('opportunites')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  function onLeadSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!ok) {
      setFormState('err')
      return
    }
    saveLead({
      email: email.trim().toLowerCase(),
      skill: skill ?? 'none',
      source: 'plan7j',
    })
    setFormState('ok')
    setEmail('')
  }

  async function copyPitch(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
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
          <a href="#skills">Mon skill</a>
          <a href="#opportunites">Pistes</a>
          <a href="#offre">Offre</a>
          <a className="btn btn-primary btn-small" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp
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
              En 10 secondes, on te match une piste + un message prêt à envoyer
              à tes premiers clients.
            </motion.p>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              <a className="btn btn-primary" href="#skills">
                Trouver ma piste
              </a>
              <a
                className="btn btn-ghost"
                href={whatsappUrl('Salut ! Je veux mon plan Skill2Cash.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Parler sur WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="section shell">
          <div className="section-head">
            <h2>Quelle compétence tu as déjà ?</h2>
            <p>
              Pas besoin d’être expert. Clique — on te montre les pistes les plus
              réalistes pour toi.
            </p>
          </div>
          <div className="skill-grid">
            {SKILLS.map((s, i) => (
              <motion.button
                key={s.id}
                type="button"
                className={`skill-card${skill === s.id ? ' active' : ''}`}
                onClick={() => pickSkill(s.id)}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20px' }}
              >
                <strong>{s.label}</strong>
                <span>{s.hint}</span>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="comment" className="section shell section-tight">
          <div className="section-head">
            <h2>Du skill au client, en 3 étapes</h2>
            <p>Un parcours simple pour passer à l’action cette semaine.</p>
          </div>
          <div className="steps">
            {[
              {
                n: '01',
                t: 'Match ta piste',
                d: 'On filtre selon ta compétence — zéro liste interminable.',
              },
              {
                n: '02',
                t: 'Copie le script',
                d: 'Chaque piste a un message de prospection prêt à coller.',
              },
              {
                n: '03',
                t: 'Envoie & encaisse',
                d: 'Prospecte chaque jour. Besoin d’aide ? WhatsApp en 1 clic.',
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
            <h2>
              {skill
                ? `Pistes pour : ${SKILLS.find((s) => s.id === skill)?.label}`
                : 'Pistes qui convertissent'}
            </h2>
            <p>
              {skill
                ? `${list.length} opportunité${list.length > 1 ? 's' : ''} adaptée${list.length > 1 ? 's' : ''} à ton profil.`
                : 'Choisis un skill plus haut, ou parcours tout. Les badges HOT = cash plus rapide.'}
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
                    <div className="badge-row">
                      <span className="badge">{categoryLabel(op.category)}</span>
                      {op.hot && <span className="badge hot">HOT</span>}
                    </div>
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
                      onClick={() => {
                        setSelected(op)
                        setCopied(false)
                      }}
                    >
                      Plan + script
                    </button>
                    <a
                      className="btn btn-ghost btn-small"
                      href={whatsappUrl(
                        `Salut ! Je veux démarrer : ${op.title}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Aide WhatsApp
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="section shell section-tight">
          <div className="proof">
            <blockquote>
              “J’ai envoyé le script WhatsApp Business à 12 commerces. 3 réponses,
              1 client payant la même semaine.”
              <cite>— Amina, Casablanca</cite>
            </blockquote>
            <blockquote>
              “Le match skill m’a évité de perdre du temps sur YouTube. Templates
              Canva → premières ventes en 10 jours.”
              <cite>— Youssef, Dakar</cite>
            </blockquote>
          </div>
        </section>

        <section id="offre" className="section shell">
          <div className="section-head">
            <h2>Pack Skill2Cash</h2>
            <p>
              Pour ceux qui veulent des clients maintenant — pas juste des idées.
            </p>
          </div>
          <div className="offer">
            <div className="offer-main">
              <div className="offer-price">
                <span className="price">{PREMIUM_PRICE}</span>
                <span className="price-note">{PREMIUM_PRICE_NOTE}</span>
              </div>
              <ul className="offer-list">
                <li>Match personnalisé de ta meilleure piste</li>
                <li>Scripts de prospection prêts à copier</li>
                <li>Checklist 7 jours (1er client)</li>
                <li>Support WhatsApp pour débloquer</li>
                <li>Mises à jour des pistes HOT</li>
              </ul>
              <div className="offer-cta">
                <a
                  className="btn btn-primary"
                  href={whatsappUrl(
                    `Salut ! Je veux le Pack Skill2Cash (${PREMIUM_PRICE}).`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acheter via WhatsApp
                </a>
                <a className="btn btn-ghost" href="#lead">
                  D’abord le plan gratuit
                </a>
              </div>
            </div>
            <div className="offer-aside">
              <h3>Pourquoi ça marche</h3>
              <p>
                Les gens n’ont pas besoin de 50 idées. Ils ont besoin d’
                <strong>une piste</strong>, d’un <strong>message</strong>, et d’un
                push pour envoyer.
              </p>
              <p>
                Skill2Cash enlève la confusion. Tu agis le jour même.
              </p>
            </div>
          </div>
        </section>

        <section id="lead" className="section shell">
          <div className="alerts">
            <div>
              <h2>Plan gratuit 7 jours</h2>
              <p>
                Reçois la checklist “1er client” + les 3 pistes HOT de la semaine.
                Zéro spam.
              </p>
            </div>
            <form className="alert-form" onSubmit={onLeadSubmit}>
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
                Envoyer mon plan
              </button>
              {formState === 'ok' && (
                <p className="form-ok">
                  Reçu. Ouvre aussi WhatsApp si tu veux un coup de main rapide.
                </p>
              )}
              {formState === 'err' && (
                <p className="form-err">Entre un email valide.</p>
              )}
            </form>
          </div>
        </section>

        <section id="faq" className="section shell">
          <div className="section-head">
            <h2>Questions fréquentes</h2>
            <p>Les doutes qui freinent — on les coupe net.</p>
          </div>
          <div className="faq">
            {FAQ.map((item, i) => {
              const open = openFaq === i
              return (
                <div key={item.q} className={`faq-item${open ? ' open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    {item.q}
                    <span aria-hidden>{open ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <div>
          <strong style={{ color: 'var(--ink)' }}>Skill2Cash</strong>
          <div>© {new Date().getFullYear()} — compétences → revenus</div>
        </div>
        <p className="disclaimer">
          Aucune garantie de revenus. Les montants sont indicatifs. Remplace le
          numéro WhatsApp dans <code>src/config.ts</code> avant de publier.
        </p>
      </footer>

      <AnimatePresence>
        {showSticky && (
          <motion.div
            className="sticky-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
          >
            <span>Prêt à monétiser ton skill ?</span>
            <a
              className="btn btn-primary btn-small"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <div className="badge-row">
                    <span className="badge">{categoryLabel(selected.category)}</span>
                    {selected.hot && <span className="badge hot">HOT</span>}
                  </div>
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

              <h4 className="detail-label">Script à copier</h4>
              <div className="pitch-box">
                <p>{selected.pitch}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-small"
                  onClick={() => copyPitch(selected.pitch)}
                >
                  {copied ? 'Copié ✓' : 'Copier le message'}
                </button>
              </div>

              <h4 className="detail-label">Plan d’attaque</h4>
              <ol>
                {selected.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <div className="detail-actions">
                <a
                  className="btn btn-primary"
                  href={whatsappUrl(
                    `Salut ! J’ai choisi : ${selected.title}. Aide-moi à démarrer.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Coaching WhatsApp
                </a>
                <a
                  className="btn btn-ghost"
                  href={selected.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selected.affiliateLabel}
                </a>
              </div>
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
