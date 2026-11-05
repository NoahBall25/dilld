// All site copy lives here so the brand voice can be tuned in one place.

export type Flavor = {
  name: string
  price: string
  tagline: string
  notes: string
  bg: string // section background
  label: string // can label base color
  accent: string // highlight color on the label + UI
  ink: string // text color on top of bg
}

export const flavors: Flavor[] = [
  {
    name: 'OG Dill',
    price: '$3.99',
    tagline: 'The original brine bolt.',
    notes: 'Cold-cured dill, cracked mustard seed, a slap of sea salt. The one that started the riot.',
    bg: '#1f4d14',
    label: '#3f8a24',
    accent: '#d4ff3f',
    ink: '#f3efe0',
  },
  {
    name: 'Hot Garlic',
    price: '$3.99',
    tagline: 'Garlic heat. Zero chill.',
    notes: 'Roasted garlic and red chili steeped in brine. Bites back, then hands you a second wind.',
    bg: '#5e140b',
    label: '#c2321b',
    accent: '#ffd23f',
    ink: '#fff3e6',
  },
  {
    name: 'Sweet Heat',
    price: '$3.99',
    tagline: 'Bread & butter, but make it loud.',
    notes: 'Honey-crisp sweetness, jalapeño sting, a long electric finish. Dangerous at noon.',
    bg: '#7a3606',
    label: '#ef8a1c',
    accent: '#fff1a8',
    ink: '#fff8ec',
  },
  {
    name: 'Lime Zest',
    price: '$4.49',
    tagline: 'Citrus crack. Dill snap.',
    notes: 'Key lime zest over a dill-forward brine. Bright enough to wake the whole block.',
    bg: '#073f36',
    label: '#16a589',
    accent: '#e6ff7a',
    ink: '#effff9',
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
  heroSub: 'Real dill brine. Triple electrolytes. Zero sugar. Pure crunch in a can.',
  intro: "DILL'D doesn't sip. It snaps.",
  header1: 'Every Legend Starts Salty',
  header2: "DILL'D Brine Energy",
  tooltips: [
    {
      title: 'Brine Power',
      body: 'Real cold-cured dill brine loaded with sodium and potassium. Cramps quit, focus stays, you keep going.',
    },
    {
      title: 'Clean Bolt',
      body: 'Natural caffeine from green tea, zero sugar, zero crash. All the snap of a fresh spear, none of the slump.',
    },
  ],
  marquee: ['Brine Time', 'Dill With It', 'Stay Salty', 'Crunch Mode', 'Pickle Up'],
  storyTitle: 'Tastes amazing. Terrible for you. We don’t pretend otherwise.',
  manifesto:
    'Born in a brine barrel and raised on pure stubbornness. We took the juice everyone poured down the drain and turned it into the loudest can on the shelf. Salty on purpose. Sour by design. Built for people who refuse to slow down.',
  stats: [
    { value: 3, suffix: '×', label: 'Electrolytes vs. a standard sports drink' },
    { value: 0, suffix: 'g', label: 'Sugar. Not a single crystal' },
    { value: 150, suffix: 'mg', label: 'Natural caffeine per can' },
    { value: 100, suffix: '%', label: 'Real cold-cured dill brine' },
  ],
  factsTitle: 'Brine Facts',
  shopTitle: 'Pick your poison',
  dropKicker: 'Members only',
  dropTitle: 'The Monthly Mystery Can Drop',
  dropBody: 'One secret flavor. One day a month. Never restocked. Get on the list before the brine runs dry.',
  dropCta: 'Get on the list',
  dropThanks: "You're on the list. Stay salty.",
  tiktokTitle: 'As Filmed & Dared on TikTok',
  tiktokHandle: '@dilld.official',
  tiktok: [
    { caption: 'Chugged Hot Garlic at 6am. Regret nothing.', views: '2.4M', flavor: 1 },
    { caption: 'Blind taste test: pickle juice vs DILL’D', views: '1.1M', flavor: 0 },
    { caption: 'Sweet Heat made my coach cry', views: '860K', flavor: 2 },
    { caption: 'Mystery can unboxing #dilldrop', views: '3.7M', flavor: 3 },
  ],
  outroKicker: "Don't just hydrate —",
  outro: 'Dill Up',
  cta: 'Grab a can',
}
