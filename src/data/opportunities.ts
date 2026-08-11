export type Category = 'freelance' | 'affiliation' | 'digital' | 'local'

export type SkillId =
  | 'ecriture'
  | 'design'
  | 'tech'
  | 'vente'
  | 'video'
  | 'aucun'

export type Opportunity = {
  id: string
  title: string
  category: Category
  payout: string
  timeToStart: string
  difficulty: 'facile' | 'moyen' | 'avancé'
  summary: string
  steps: string[]
  pitch: string
  skills: SkillId[]
  affiliateUrl: string
  affiliateLabel: string
  tags: string[]
  hot?: boolean
}

export const SKILLS: { id: SkillId; label: string; hint: string }[] = [
  { id: 'ecriture', label: 'Écriture / contenu', hint: 'posts, scripts, copy' },
  { id: 'design', label: 'Design / Canva', hint: 'visuels, brand, templates' },
  { id: 'tech', label: 'Tech / no-code', hint: 'sites, automatisations' },
  { id: 'vente', label: 'Vente / relation', hint: 'prospection, closing' },
  { id: 'video', label: 'Vidéo / montage', hint: 'Reels, YouTube, CapCut' },
  { id: 'aucun', label: 'Je débute', hint: 'on te guide pas à pas' },
]

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'affiliation', label: 'Affiliation' },
  { id: 'digital', label: 'Produits digitaux' },
  { id: 'local', label: 'Local' },
]

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'upwork-dev',
    title: 'Freelance web / no-code',
    category: 'freelance',
    payout: '800–4 000 MAD / projet',
    timeToStart: '3–7 jours',
    difficulty: 'moyen',
    hot: true,
    summary:
      'Vends des sites vitrine et landings à des commerces qui perdent des clients faute de présence en ligne.',
    steps: [
      'Prépare 3 exemples (Carrd / Framer / WordPress) avec avant/après',
      'Pack fixe : site 1 page + WhatsApp + Google Maps — prix clair',
      'Contacte 15 commerces / jour (Instagram + Google Maps)',
    ],
    pitch:
      'Salut ! Je crée des sites simples qui ramènent des clients WhatsApp. Je te fais une démo gratuite de 10 min sur ton business — tu veux voir ?',
    skills: ['tech', 'design', 'vente'],
    affiliateUrl: 'https://www.upwork.com',
    affiliateLabel: 'Créer mon profil Upwork',
    tags: ['clients rapides', 'B2B', 'récurrent'],
  },
  {
    id: 'whatsapp-agency',
    title: 'Setup WhatsApp Business',
    category: 'local',
    payout: '1 500–6 000 MAD / mois',
    timeToStart: '2–5 jours',
    difficulty: 'facile',
    hot: true,
    summary:
      'Les commerces veulent des commandes sur WhatsApp. Tu configures catalogue, réponses auto et process — forfait mensuel.',
    steps: [
      'Maîtrise catalogue + messages rapides + étiquettes',
      'Offre setup (unique) + suivi mensuel (posts + réponses)',
      'Livre 1 client gratuit → demande 3 recommandations',
    ],
    pitch:
      'Je peux te mettre un WhatsApp Business pro (catalogue + réponses auto) cette semaine. Tu gagnes du temps et tu rates moins de commandes. On en parle 5 min ?',
    skills: ['vente', 'aucun', 'design'],
    affiliateUrl: 'https://www.whatsapp.com/business',
    affiliateLabel: 'WhatsApp Business',
    tags: ['cash rapide', 'local', 'récurrent'],
  },
  {
    id: 'templates-gumroad',
    title: 'Templates digitaux (Notion / Canva)',
    category: 'digital',
    payout: '50–500 MAD / vente',
    timeToStart: '2–5 jours',
    difficulty: 'facile',
    hot: true,
    summary:
      'Crée une fois, vends à l’infini. Budget, planning content, CV, prompts IA — problèmes précis = ventes.',
    steps: [
      'Choisis 1 problème précis (ex. budget étudiant MAD)',
      'Template + guide PDF 3 pages + miniature accrocheuse',
      'Publie à 49–149 MAD et pousse 1 Reel / jour pendant 14 jours',
    ],
    pitch:
      'J’ai sorti un template qui m’aurait fait gagner 10h. Lien ici si ça peut t’aider 👇',
    skills: ['design', 'ecriture', 'aucun'],
    affiliateUrl: 'https://gumroad.com',
    affiliateLabel: 'Ouvrir une boutique Gumroad',
    tags: ['passif', 'scalable', 'créatif'],
  },
  {
    id: 'content-ghost',
    title: 'Ghostwriting LinkedIn / Instagram',
    category: 'freelance',
    payout: '1 000–5 000 MAD / mois',
    timeToStart: '3–7 jours',
    difficulty: 'moyen',
    summary:
      'Écris les posts de coaches, fondateurs et freelances qui n’ont pas le temps. Récurrent et remote.',
    steps: [
      'Offre : 12 posts / mois + 4 stories + calendrier',
      'Montre 5 posts exemples dans le style de la cible',
      'Prospecte 20 profils LinkedIn / jour avec message court',
    ],
    pitch:
      'Je gère tes posts LinkedIn (idées + textes) pour que tu restes visible sans y passer des heures. Tu veux un premier post gratuit cette semaine ?',
    skills: ['ecriture', 'vente'],
    affiliateUrl: 'https://www.linkedin.com',
    affiliateLabel: 'Prospecter sur LinkedIn',
    tags: ['récurrent', 'remote', 'écriture'],
  },
  {
    id: 'amazon-aff',
    title: 'Affiliation + contenu court',
    category: 'affiliation',
    payout: '5–15 % / vente',
    timeToStart: '1–2 jours',
    difficulty: 'facile',
    summary:
      'Recommande des produits via TikTok / Reels. Commission à chaque vente. Idéal si tu crées déjà du contenu.',
    steps: [
      'Niche claire (beauté, tech, sport, maison)',
      'Compte affiliation + 10 liens prêts',
      '1 vidéo utile / jour pendant 30 jours (hooks + preuve)',
    ],
    pitch:
      'J’ai testé ce produit 7 jours — voilà mon avis honnête (lien en bio).',
    skills: ['video', 'ecriture', 'aucun'],
    affiliateUrl: 'https://affiliate-program.amazon.com',
    affiliateLabel: 'Rejoindre Amazon Associates',
    tags: ['passif', 'contenu', 'scalable'],
  },
  {
    id: 'video-reels',
    title: 'Monteur Reels / Shorts pour marques',
    category: 'freelance',
    payout: '500–2 500 MAD / lot',
    timeToStart: '2–4 jours',
    difficulty: 'moyen',
    summary:
      'Les marques ont du rush brut et zéro temps. Tu livres 8–12 Reels montés / semaine.',
    steps: [
      'Portfolio de 6 Reels (même avec ton propre contenu)',
      'Pack : 8 Reels + hooks + sous-titres — prix fixe',
      'DM 20 comptes locaux / jour avec 1 exemple personnalisé',
    ],
    pitch:
      'Je monte des Reels qui retiennent l’attention (hooks + sous-titres). Je te fais 1 gratuit sur ton dernier rush pour te montrer le niveau.',
    skills: ['video', 'design'],
    affiliateUrl: 'https://www.capcut.com',
    affiliateLabel: 'Monter avec CapCut',
    tags: ['créatif', 'clients rapides', 'récurrent'],
  },
  {
    id: 'lead-gen-immo',
    title: 'Leads locaux (artisans / immo)',
    category: 'local',
    payout: '200–1 000 MAD / lead',
    timeToStart: '3–7 jours',
    difficulty: 'moyen',
    summary:
      'Tu génères des demandes de devis et tu les revends à des pros qui cherchent des clients.',
    steps: [
      'Landing + formulaire (ville + besoin + téléphone)',
      'Trafic local (Meta Ads petit budget ou organique)',
      'Accord avec 3–5 pros : paiement à lead qualifié',
    ],
    pitch:
      'Je t’envoie des demandes clients déjà intéressées dans ta ville. Tu ne paies que les leads utiles. On teste 5 leads ?',
    skills: ['tech', 'vente'],
    affiliateUrl: 'https://carrd.co',
    affiliateLabel: 'Créer une landing rapide',
    tags: ['B2B', 'cash rapide', 'local'],
  },
  {
    id: 'newsletter-niche',
    title: 'Newsletter de niche monétisée',
    category: 'affiliation',
    payout: 'Abonnements + sponsors',
    timeToStart: '1 semaine',
    difficulty: 'avancé',
    summary:
      'Une lettre hebdo ultra-spécifique. Autorité → affiliation → sponsors → abonnement.',
    steps: [
      'Audience qui dépense (remote, e-com, freelances)',
      '4 numéros gratuits, puis offre payante',
      '1–2 liens affiliation + 1 offre sponsor / mois',
    ],
    pitch:
      'Chaque lundi je partage les meilleures pistes pour monétiser [niche]. Tu veux recevoir le prochain numéro ?',
    skills: ['ecriture'],
    affiliateUrl: 'https://beehiiv.com',
    affiliateLabel: 'Lancer sur Beehiiv',
    tags: ['autorité', 'récurrent', 'long terme'],
  },
]

export function matchOpportunities(skill: SkillId | null): Opportunity[] {
  if (!skill) return OPPORTUNITIES
  const matched = OPPORTUNITIES.filter((o) => o.skills.includes(skill))
  return matched.length ? matched : OPPORTUNITIES
}
