export type Category = 'freelance' | 'affiliation' | 'digital' | 'local'

export type Opportunity = {
  id: string
  title: string
  category: Category
  payout: string
  timeToStart: string
  difficulty: 'facile' | 'moyen' | 'avancé'
  summary: string
  steps: string[]
  affiliateUrl: string
  affiliateLabel: string
  tags: string[]
}

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
    summary:
      'Vends des sites vitrine, landing pages ou automatisations no-code à des commerces locaux et startups.',
    steps: [
      'Crée un profil Upwork / Malt avec 3 exemples (même fictifs bien présentés)',
      'Propose un pack fixe : site 1 page + SEO local + WhatsApp',
      'Contacte 10 commerces / jour via Instagram ou Google Maps',
    ],
    affiliateUrl: 'https://www.upwork.com',
    affiliateLabel: 'Créer mon profil Upwork',
    tags: ['remote', 'compétences', 'récurrent'],
  },
  {
    id: 'amazon-aff',
    title: 'Affiliation e-commerce',
    category: 'affiliation',
    payout: '5–15 % / vente',
    timeToStart: '1–2 jours',
    difficulty: 'facile',
    summary:
      'Recommande des produits via un blog, TikTok ou Instagram et touche une commission à chaque vente.',
    steps: [
      'Choisis une niche (beauté, tech, sport, maison)',
      'Inscris-toi à un programme d’affiliation (Amazon, Awin, Impact)',
      'Publie 1 contenu utile / jour avec lien tracké',
    ],
    affiliateUrl: 'https://affiliate-program.amazon.com',
    affiliateLabel: 'Rejoindre Amazon Associates',
    tags: ['passif', 'contenu', 'scalable'],
  },
  {
    id: 'templates-gumroad',
    title: 'Vends des templates digitaux',
    category: 'digital',
    payout: '50–500 MAD / vente',
    timeToStart: '2–5 jours',
    difficulty: 'facile',
    summary:
      'Crée une fois (Notion, Canva, Excel, prompts IA) et vends à l’infini sur Gumroad ou Lemon Squeezy.',
    steps: [
      'Identifie un problème précis (budget perso, CV, planning content)',
      'Produit un template propre + guide PDF de 3 pages',
      'Publie à 49–149 MAD et pousse via Reels / LinkedIn',
    ],
    affiliateUrl: 'https://gumroad.com',
    affiliateLabel: 'Ouvrir une boutique Gumroad',
    tags: ['passif', 'créatif', 'scalable'],
  },
  {
    id: 'whatsapp-agency',
    title: 'Mini-agence WhatsApp Business',
    category: 'local',
    payout: '1 500–6 000 MAD / mois',
    timeToStart: '1 semaine',
    difficulty: 'moyen',
    summary:
      'Aide les commerces à gérer commandes, catalogues et réponses auto sur WhatsApp Business.',
    steps: [
      'Maîtrise catalogues + messages rapides WhatsApp Business',
      'Offre un forfait mensuel (setup + 4 posts + support)',
      'Démontre le ROI avec 2 clients gratuits / test',
    ],
    affiliateUrl: 'https://www.whatsapp.com/business',
    affiliateLabel: 'WhatsApp Business',
    tags: ['local', 'récurrent', 'B2B'],
  },
  {
    id: 'youtube-faceless',
    title: 'Chaîne YouTube faceless',
    category: 'digital',
    payout: 'AdSense + affiliation',
    timeToStart: '1–2 semaines',
    difficulty: 'avancé',
    summary:
      'Vidéos narrées (finance, histoires, tips) sans montrer ton visage. Revenus via pubs + liens.',
    steps: [
      'Choisis un format qui marche déjà (compilations, explications, listes)',
      'Pipeline : script IA → voix → montage CapCut → miniature',
      'Publie 3× / semaine pendant 90 jours minimum',
    ],
    affiliateUrl: 'https://www.youtube.com/creators',
    affiliateLabel: 'YouTube Creators',
    tags: ['passif', 'contenu', 'long terme'],
  },
  {
    id: 'print-on-demand',
    title: 'Print-on-demand (tees & stickers)',
    category: 'digital',
    payout: '30–120 MAD / article',
    timeToStart: '2–4 jours',
    difficulty: 'facile',
    summary:
      'Designs humoristiques / niche vendus sans stock via Printful, Gelato ou Redbubble.',
    steps: [
      'Trouve une niche (métiers, régions, memes locaux)',
      'Crée 20 designs Canva et connecte une boutique',
      'Ads Meta à petit budget ou organique TikTok',
    ],
    affiliateUrl: 'https://www.printful.com',
    affiliateLabel: 'Lancer avec Printful',
    tags: ['passif', 'créatif', 'e-com'],
  },
  {
    id: 'lead-gen-immo',
    title: 'Leads immo / services locaux',
    category: 'local',
    payout: '200–1 000 MAD / lead',
    timeToStart: '3–7 jours',
    difficulty: 'moyen',
    summary:
      'Génère des demandes (devis, visites) pour agents ou artisans et revend les leads qualifiés.',
    steps: [
      'Landing page + formulaire (ville + besoin)',
      'Trafic : Google Ads / Facebook ciblé local',
      'Vends les leads à 3–5 pros de la zone',
    ],
    affiliateUrl: 'https://carrd.co',
    affiliateLabel: 'Créer une landing rapide',
    tags: ['local', 'B2B', 'cash rapide'],
  },
  {
    id: 'newsletter-niche',
    title: 'Newsletter payante de niche',
    category: 'affiliation',
    payout: 'Abonnements + sponsors',
    timeToStart: '1 semaine',
    difficulty: 'moyen',
    summary:
      'Une lettre hebdo ultra-spécifique (ex. deals remote Afrique, tips e-com) puis monétise.',
    steps: [
      'Choisis une audience qui a de l’argent à dépenser',
      'Offre 4 numéros gratuits, puis abonnement',
      'Ajoute 1–2 liens affiliation par édition',
    ],
    affiliateUrl: 'https://beehiiv.com',
    affiliateLabel: 'Lancer sur Beehiiv',
    tags: ['récurrent', 'contenu', 'autorité'],
  },
]
