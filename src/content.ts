// All site copy lives here so the brand voice can be tuned in one place.

export type Flavor = {
  name: string
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
    tagline: 'The original brine bolt.',
    notes: 'Cold-cured dill, cracked mustard seed, a slap of sea salt. The one that started the riot.',
    bg: '#1f4d14',
    label: '#3f8a24',
    accent: '#d4ff3f',
    ink: '#f3efe0',
  },
  {
    name: 'Hot Garlic',
    tagline: 'Garlic heat. Zero chill.',
    notes: 'Roasted garlic and red chili steeped in brine. Bites back, then hands you a second wind.',
    bg: '#5e140b',
    label: '#c2321b',
    accent: '#ffd23f',
    ink: '#fff3e6',
  },
  {
    name: 'Sweet Heat',
    tagline: 'Bread & butter, but make it loud.',
    notes: 'Honey-crisp sweetness, jalapeño sting, a long electric finish. Dangerous at noon.',
    bg: '#7a3606',
    label: '#ef8a1c',
    accent: '#fff1a8',
    ink: '#fff8ec',
  },
  {
    name: 'Lime Zest',
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
  { id: 'flavors', label: 'Flavors' },
  { id: 'shop', label: 'Shop' },
]

export const copy = {
  brand: 'DILLD',
  heroKicker: 'Pickle-powered energy',
  heroSub: 'Real dill brine. Triple electrolytes. Zero sugar. Pure crunch in a can.',
  intro: "DILLD doesn't sip. It snaps.",
  header1: 'Every Legend Starts Salty',
  header2: 'DILLD Brine Energy',
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
  manifesto:
    'Born in a brine barrel and raised on pure stubbornness. We took the juice everyone poured down the drain and turned it into the loudest can on the shelf. Salty on purpose. Sour by design. Built for people who refuse to slow down.',
  stats: [
    { value: 3, suffix: '×', label: 'Electrolytes vs. a standard sports drink' },
    { value: 0, suffix: 'g', label: 'Sugar. Not a single crystal' },
    { value: 150, suffix: 'mg', label: 'Natural caffeine per can' },
    { value: 100, suffix: '%', label: 'Real cold-cured dill brine' },
  ],
  factsTitle: 'Brine Facts',
  outroKicker: "Don't just hydrate —",
  outro: 'Dill Up',
  cta: 'Grab a can',
}
