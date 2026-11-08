// Generates the static, crawlable pages (Brine Blog, articles, legal pages)
// plus sitemap.xml, robots.txt and the web manifest.
// Run with `npm run pages` (also runs automatically before dev and build).

import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL, site } from '../site.config.mjs'
import { posts, legalPages } from '../content/posts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const products = [
  { name: 'Classic Dill', badge: 'Original', image: '/images/flavours/classic-dill.jpg', blurb: 'Crisp, salty-sweet cucumber dill punch.' },
  { name: 'Sweet Heat', badge: 'Habanero', image: '/images/flavours/sweet-heat.jpg', blurb: 'Habanero honey and garlic brine.' },
  { name: 'Sour Blast', badge: 'Pucker x3', image: '/images/flavours/sour-blast.jpg', blurb: 'Triple-fermented sour pickle surge.' },
  { name: 'Dill Candy', badge: 'Sweet Fizz', image: '/images/flavours/dill-candy.jpg', blurb: 'Candied pickle syrup with a fizzy rush.' },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const abs = (p) => SITE_URL + p
const fmtDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })

const organization = {
  '@type': 'Organization',
  '@id': abs('/#organization'),
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  logo: abs(site.logo),
  sameAs: Object.values(site.social),
}

function head({ title, description, path, image = site.ogImage, type = 'website', jsonld = [], extra = '' }) {
  const url = abs(path)
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${url}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="theme-color" content="#0d170a" />
<meta property="og:site_name" content="${esc(site.name)}" />
<meta property="og:locale" content="${site.locale}" />
<meta property="og:type" content="${type}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${abs(image)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${abs(image)}" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="alternate" type="application/rss+xml" title="The Brine Blog" href="/blog/rss.xml" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
${extra}
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization, ...jsonld] })}</script>
</head>`
}

const header = (active) => `
<div class="progress" aria-hidden="true"><span></span></div>
<header class="p-nav">
  <a class="p-logo" href="/" aria-label="DILL'D home"><img src="/brand/logo.png" alt="DILL'D logo" width="96" height="66" /></a>
  <nav class="p-links" aria-label="Main">
    <a href="/#shop">Flavours</a>
    <a href="/#drop">Mystery Can</a>
    <a href="/#story">About</a>
    <a href="/blog/"${active === 'blog' ? ' aria-current="page"' : ''}>Blog</a>
  </nav>
  <a class="p-btn" href="/#shop" data-magnetic>Grab a can — $3.99</a>
</header>`

const footer = `
<footer class="p-footer">
  <div class="p-marquee" aria-hidden="true"><div>SWEET • SALTY • SOUR ✦ 180MG CAFFEINE ✦ MAY CAUSE EXTREME DILL-NESS ✦ TASTES AMAZING, TERRIBLE FOR YOU ✦ SWEET • SALTY • SOUR ✦ 180MG CAFFEINE ✦ MAY CAUSE EXTREME DILL-NESS ✦ TASTES AMAZING, TERRIBLE FOR YOU ✦</div></div>
  <div class="p-foot-grid">
    <div class="p-foot-brand">
      <img src="/brand/logo-mascot.png" alt="DILL'D mascot logo" width="170" height="170" loading="lazy" />
      <p>Electrolytes, sour bite and 180mg of pure brine bravado. Quebec born, worldwide shocked.</p>
    </div>
    <nav aria-label="Quick links">
      <h2>Quick links</h2>
      <a href="/#shop">Flavours</a>
      <a href="/#drop">Mystery Can</a>
      <a href="/#shop">Shop Packs</a>
      <a href="/#story">About DILL'D</a>
      <a href="/#facts">Brine Specs &amp; Lab Reports</a>
      <a href="/blog/">The Brine Blog</a>
    </nav>
    <nav aria-label="Social">
      <h2>Drop dispatch</h2>
      <a href="${site.social.tiktok}" target="_blank" rel="noopener">TikTok @drinkdilld ↗</a>
      <a href="${site.social.instagram}" target="_blank" rel="noopener">Instagram ↗</a>
      <a href="${site.social.youtube}" target="_blank" rel="noopener">YouTube ↗</a>
    </nav>
    <form class="p-news" onsubmit="event.preventDefault();this.classList.add('is-done')">
      <h2>Global dispatch newsletter</h2>
      <p>VIP drop alerts, secret codes and sour restock notifications before anyone else.</p>
      <div><input type="email" required placeholder="brine_addict@email.com" aria-label="Email for newsletter" /><button class="p-btn" type="submit">Join</button></div>
      <p class="p-news-ok">You're on the list. Stay salty.</p>
    </form>
  </div>
  <p class="p-notice"><strong>Caution / health notice:</strong> 180 mg caffeine per 355ml can. High caffeine content. Not recommended for children, pregnant or breastfeeding women, or caffeine-sensitive persons. <span>Shipping to Canada, US, UK, EU, Australia &amp; Japan.</span></p>
  <div class="p-legal">
    <span>© ${new Date().getFullYear()} ${site.legalName} All rights reserved.</span>
    <span><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Service</a><a href="/accessibility/">Accessibility</a></span>
  </div>
</footer>
<script type="module" src="/src/pages/main.ts"></script>
</body>
</html>`

function card(p, i) {
  return `<a class="b-card reveal" href="/blog/${p.slug}/" data-cat="${p.category}" style="--i:${i}">
  <div class="b-card-img"><img src="${p.cover}" alt="${esc(p.coverAlt)}" loading="lazy" /></div>
  <div class="b-card-body">
    <span class="chip">${p.category}</span>
    <h3>${esc(p.h1)}</h3>
    <p>${esc(p.description)}</p>
    <span class="b-meta"><time datetime="${p.date}">${fmtDate(p.date)}</time> · ${p.readMinutes} min read</span>
  </div>
</a>`
}

function writePage(rel, html) {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

/* ───────── blog index ───────── */
const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))
const [featured, ...rest] = sorted
const cats = [...new Set(posts.map((p) => p.category))]

writePage(
  'blog/index.html',
  head({
    title: "The Brine Blog: Pickle Energy Drink News | DILL'D",
    description: "Science, flavour guides, Mystery Can Drops and TikTok culture from DILL'D, the pickle energy drink with 180mg caffeine and real dill brine.",
    path: '/blog/',
    jsonld: [
      {
        '@type': 'Blog',
        '@id': abs('/blog/#blog'),
        name: 'The Brine Blog',
        url: abs('/blog/'),
        publisher: { '@id': abs('/#organization') },
        blogPost: sorted.map((p) => ({ '@type': 'BlogPosting', headline: p.h1, url: abs(`/blog/${p.slug}/`), datePublished: p.date })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: abs('/blog/') },
        ],
      },
    ],
  }) +
    `<body class="page-blog">${header('blog')}
<main>
  <section class="b-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Blog</span></nav>
    <p class="eyebrow"><span class="dot"></span> Dispatches from the brine lab</p>
    <h1 class="split">The Brine Blog</h1>
    <p class="b-sub">Science, flavour guides, drop news and TikTok chaos from the people who put pickles in a can.</p>
    <img class="b-hero-mascot float" src="/brand/logo-mascot.png" alt="" width="260" height="260" />
  </section>

  <section class="b-featured reveal">
    <a href="/blog/${featured.slug}/" class="b-feat-card">
      <div class="b-feat-img"><img src="${featured.cover}" alt="${esc(featured.coverAlt)}" /></div>
      <div class="b-feat-body">
        <span class="chip chip-yellow">Latest · ${featured.category}</span>
        <h2>${esc(featured.h1)}</h2>
        <p>${esc(featured.description)}</p>
        <span class="b-meta"><time datetime="${featured.date}">${fmtDate(featured.date)}</time> · ${featured.readMinutes} min read</span>
        <span class="p-btn">Read the article →</span>
      </div>
    </a>
  </section>

  <section class="b-list">
    <div class="b-filters" role="toolbar" aria-label="Filter by category">
      <button class="is-on" data-filter="all">All</button>
      ${cats.map((c) => `<button data-filter="${c}">${c}</button>`).join('')}
    </div>
    <div class="b-grid">
      ${rest.map(card).join('\n')}
    </div>
  </section>

  <section class="b-cta reveal">
    <h2>Never miss a Mystery Can.</h2>
    <p>One secret flavour every 30 days. VIPs get the link two hours early.</p>
    <a class="p-btn p-btn-yellow" href="/#drop" data-magnetic>Get VIP drop access ⚡</a>
  </section>
</main>
${footer}`,
)

/* ───────── articles ───────── */
for (const p of posts) {
  const path = `/blog/${p.slug}/`
  const prod = products[p.flavor]
  const related = sorted.filter((r) => r.slug !== p.slug).slice(0, 3)
  const toc = [...p.body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map((m) => ({ id: m[1], text: m[2] }))
  const words = p.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length

  writePage(
    `blog/${p.slug}/index.html`,
    head({
      title: p.title,
      description: p.description,
      path,
      image: p.cover,
      type: 'article',
      extra: `<meta property="article:published_time" content="${p.date}" />\n<meta property="article:section" content="${p.category}" />\n<meta name="keywords" content="${esc(p.keywords.join(', '))}" />`,
      jsonld: [
        {
          '@type': 'BlogPosting',
          '@id': abs(path + '#article'),
          headline: p.h1,
          description: p.description,
          image: abs(p.cover),
          datePublished: p.date,
          dateModified: p.date,
          wordCount: words,
          articleSection: p.category,
          keywords: p.keywords.join(', '),
          author: { '@type': 'Organization', name: "The DILL'D Lab", url: SITE_URL },
          publisher: { '@id': abs('/#organization') },
          mainEntityOfPage: abs(path),
          isPartOf: { '@id': abs('/blog/#blog') },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: abs('/blog/') },
            { '@type': 'ListItem', position: 3, name: p.h1, item: abs(path) },
          ],
        },
      ],
    }) +
      `<body class="page-article">${header('blog')}
<main>
  <article>
    <header class="a-hero">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog/">Blog</a> / <span>${p.category}</span></nav>
      <span class="chip">${p.category}</span>
      <h1 class="split">${esc(p.h1)}</h1>
      <p class="a-meta">By The DILL'D Lab · <time datetime="${p.date}">${fmtDate(p.date)}</time> · ${p.readMinutes} min read</p>
      <figure class="a-cover"><img src="${p.cover}" alt="${esc(p.coverAlt)}" width="1024" height="560" /></figure>
    </header>
    <div class="a-layout">
      <aside class="a-toc" aria-label="On this page">
        <p>On this page</p>
        ${toc.map((t) => `<a href="#${t.id}">${esc(t.text)}</a>`).join('\n        ')}
      </aside>
      <div class="a-body">
        ${p.body}
        <div class="a-share">
          <span>Share the dill-ness:</span>
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(abs(path))}&text=${encodeURIComponent(p.h1)}" target="_blank" rel="noopener">X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(abs(path))}" target="_blank" rel="noopener">Facebook</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(abs(path))}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
      <aside class="a-product reveal" aria-label="Featured flavour">
        <span class="chip chip-yellow">${prod.badge}</span>
        <img src="${prod.image}" alt="DILL'D ${prod.name} can" loading="lazy" />
        <h2>${prod.name}</h2>
        <p>${prod.blurb}</p>
        <div class="a-price"><strong>$3.99</strong><span>355ml / 12 fl oz</span></div>
        <a class="p-btn" href="/#shop" data-magnetic>Add to box ⚡</a>
      </aside>
    </div>
  </article>

  <section class="a-related">
    <h2>Keep reading</h2>
    <div class="b-grid">${related.map(card).join('\n')}</div>
  </section>
</main>
${footer}`,
  )
}

/* ───────── legal pages ───────── */
for (const l of legalPages) {
  writePage(
    `${l.slug}/index.html`,
    head({ title: l.title, description: l.description, path: `/${l.slug}/` }) +
      `<body class="page-legal">${header()}
<main class="l-main">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span>${l.h1}</span></nav>
  <h1 class="split">${l.h1}</h1>
  <div class="a-body">${l.body}</div>
</main>
${footer}`,
  )
}

/* ───────── sitemap, robots, rss, manifest ───────── */
const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: '/', pri: '1.0', freq: 'weekly', mod: today },
  { loc: '/blog/', pri: '0.8', freq: 'weekly', mod: sorted[0].date },
  ...sorted.map((p) => ({ loc: `/blog/${p.slug}/`, pri: '0.7', freq: 'monthly', mod: p.date, img: p.cover })),
  ...legalPages.map((l) => ({ loc: `/${l.slug}/`, pri: '0.3', freq: 'yearly', mod: today })),
]
writeFileSync(
  join(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${abs(u.loc)}</loc>
    <lastmod>${u.mod}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pri}</priority>${u.img ? `\n    <image:image><image:loc>${abs(u.img)}</image:loc></image:image>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>
`,
)

writeFileSync(join(root, 'public/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`)

mkdirSync(join(root, 'public/blog'), { recursive: true })
writeFileSync(
  join(root, 'public/blog/rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>The Brine Blog | DILL'D</title><link>${abs('/blog/')}</link>
<description>Science, flavour guides and drop news from DILL'D pickle energy drink.</description>
${sorted.map((p) => `<item><title>${esc(p.h1)}</title><link>${abs(`/blog/${p.slug}/`)}</link><pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`).join('\n')}
</channel></rss>
`,
)

writeFileSync(
  join(root, 'public/site.webmanifest'),
  JSON.stringify(
    {
      name: "DILL'D Pickle Energy Drink",
      short_name: "DILL'D",
      start_url: '/',
      display: 'standalone',
      background_color: '#0d170a',
      theme_color: '#c2e05a',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ),
)

console.log(`Generated blog index, ${posts.length} articles, ${legalPages.length} legal pages, sitemap (${urls.length} URLs), robots, RSS, manifest.`)
if (!existsSync(join(root, 'public/brand/logo.png'))) console.warn('Missing public/brand/logo.png')
