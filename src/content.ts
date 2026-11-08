// All site copy lives here so the brand voice can be tuned in one place.

export type Flavor = {
  name: string
  price: string
  badge: string
  image: string
  tagline: string
  notes: string
  bg: string // section background
  label: string // can label base color
  accent: string // highlight color on the label + UI
  ink: string // text color on top of bg
}

export const flavors: Flavor[] = [
  {
    name: 'Classic Dill',
    price: '$3.99',
    badge: 'Original',
    image: '/images/flavours/classic-dill.jpg',
    tagline: 'The baseline shock.',
    notes: 'Crisp, salty-sweet cucumber dill punch. Real fermented brine, 180mg caffeine, zero apologies.',
    bg: '#18330f',
    label: '#a8cf3a',
    accent: '#c2e05a',
    ink: '#faf9f5',
  },
  {
    name: 'Sweet Heat',
    price: '$3.99',
    badge: 'Habanero',
    image: '/images/flavours/sweet-heat.jpg',
    tagline: 'Spicy sting. Sour crunch.',
    notes: 'Habanero honey and garlic brine. The heat lands right at the end, then the pickle snaps back.',
    bg: '#3a1408',
    label: '#2a1d16',
    accent: '#ff7a2f',
    ink: '#fff3e6',
  },
  {
    name: 'Sour Blast',
    price: '$3.99',
    badge: 'Pucker x3',
    image: '/images/flavours/sour-blast.jpg',
    tagline: 'Severe jaw-tightening tartness.',
    notes: 'Triple-fermented sour pickle surge with electric lime. Nobody finishes it without making the face.',
    bg: '#0d2a08',
    label: '#6fcf1f',
    accent: '#e6ff4a',
    ink: '#f4ffe6',
  },
  {
    name: 'Dill Candy',
    price: '$3.99',
    badge: 'Sweet Fizz',
    image: '/images/flavours/dill-candy.jpg',
    tagline: 'Nostalgic carnival sweet bite.',
    notes: 'Candied pickle syrup with a fizzy rush. Tart, sweet and dangerously easy to drink.',
    bg: '#1f3a2a',
    label: '#b9dcae',
    accent: '#f2d14b',
    ink: '#faf9f5',
  },
]

// The menu order matches the section order on the page, top to bottom.
export const menu = [
  { id: 'home', label: 'Home' },
  { id: 'science', label: 'Science' },
  { id: 'story', label: 'Story' },
  { id: 'facts', label: 'Facts' },
  { id: 'shop', label: 'Shop' },
  { id: 'drop', label: 'Drop' },
  { id: 'tiktok', label: 'TikTok' },
]

// Section number + label for the tag shown at the top of each section.
export const tag = (id: string) => {
  const i = menu.findIndex((m) => m.id === id)
  return { num: String(i + 1).padStart(2, '0'), label: menu[i].label }
}

export const copy = {
  brand: "DILL'D",
  heroKicker: 'May cause extreme dill-ness',
  heroSub: "The internet's favourite pickle energy drink. 180mg caffeine, sweet brine punch and zero excuses. It's a treat, not a health drink, and we're proud of it.",
  heroBadges: ['180mg Caffeine', 'Real Pickle Brine', 'Carbonated Savage', 'Quebec Born'],
  intro: "DILL'D doesn't sip. It snaps.",
  header1: 'Every Legend Starts Salty',
  header2: "DILL'D Pickle Energy",
  tooltips: [
    {
      title: 'Brine Power',
      body: '460mg of sodium from real fermented dill brine. The salty hit that makes people say "wait, what?" and reach for a second sip.',
    },
    {
      title: '180mg Bolt',
      body: 'A full 180mg of caffeine per 355ml can, with carbonation that burns the back of your throat. Not for kids, not for the faint of heart.',
    },
  ],
  marquee: ['Sweet • Salty • Sour', '180mg Caffeine', 'May Cause Extreme Dill-ness', 'Tastes Amazing, Terrible For You', 'Drop 04 Live Now'],
  storyTitle: 'Tastes amazing. Terrible for you. We don’t pretend otherwise.',
  manifesto:
    "Energy drinks spent twenty years selling wellness buzzwords, fake berry sweeteners and pastel gym cans. DILL'D was cooked up at 2 AM in a Montreal food lab with one goal: turn real fermented pickle brine into unapologetic high-voltage rocket fuel. Sweet, salty, sour, and loud on purpose.",
  stats: [
    { value: 180, suffix: 'mg', label: 'Caffeine blast per 355ml can' },
    { value: 460, suffix: 'mg', label: 'Sodium from real dill brine' },
    { value: 0, suffix: '%', label: 'Fake berry flavourings' },
    { value: 355, suffix: 'ml', label: '12 fl oz of pure dill-ness' },
  ],
  factsTitle: 'Brine Specs',
  shopTitle: 'Pick your poison',
  dropKicker: 'Limited quantity • Vault rotation',
  dropTitle: 'The Monthly Mystery Can Drop',
  dropBody: 'A brand-new chaotic flavour every 30 days. This month: Wasabi Brine Fizz, $4.50, only 5,000 cases. Once it sells out it enters the vault forever.',
  dropCta: 'Get VIP drop access',
  dropThanks: "You're on the drop list. Stay salty.",
  tiktokTitle: 'As Filmed & Dared on TikTok',
  tiktokHandle: '#DillDChallenge',
  tiktok: [
    { handle: '@picklequeen', caption: 'I thought this was a joke until I took a sip... I AM HOOKED. The salt hits perfectly.', tag: 'Classic Dill review', views: '4.2M', image: '/images/tiktok/picklequeen.jpg', flavor: 0 },
    { handle: '@streamer_kai', caption: '180mg of pickle caffeine before ranked games hits DIFFERENT. My aim is vibrating.', tag: 'Ranked energy test', views: '11.8M', image: '/images/tiktok/streamer-kai.jpg', flavor: 2 },
    { handle: '@snackhunting', caption: 'Reviewing the Sweet Heat can! Is it actually good?! Habanero kicks right at the end.', tag: 'Sweet Heat review', views: '8.5M', image: '/images/tiktok/snackhunting.jpg', flavor: 1 },
    { handle: '@brineboyz', caption: 'Chugging Sour Blast without making a face challenge (FAILED INSTANTLY).', tag: 'Sour Blast challenge', views: '3.1M', image: '/images/tiktok/brineboyz.jpg', flavor: 2 },
  ],
  outroKicker: "Don't just hydrate —",
  outro: 'Dill Up',
  cta: 'Grab a can',
  healthNotice:
    '180 mg caffeine per 355ml can. High caffeine content. Not recommended for children, pregnant or breastfeeding women, or caffeine-sensitive persons.',
  shipping: 'Shipping to Canada, US, UK, EU, Australia & Japan.',
}

// Footer back links, matching the Stitch footer.
export const footerLinks = {
  quick: [
    { label: 'Flavours', href: '/#shop' },
    { label: 'Mystery Can', href: '/#drop' },
    { label: 'Shop Packs', href: '/#shop' },
    { label: "About DILL'D", href: '/#story' },
    { label: 'Brine Specs & Lab Reports', href: '/#facts' },
    { label: 'The Brine Blog', href: '/blog/' },
  ],
  social: [
    { label: 'TikTok @drinkdilld', href: 'https://www.tiktok.com/@drinkdilld' },
    { label: 'Instagram', href: 'https://www.instagram.com/drinkdilld' },
    { label: 'YouTube', href: 'https://www.youtube.com/@drinkdilld' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Service', href: '/terms/' },
    { label: 'Accessibility', href: '/accessibility/' },
  ],
}
