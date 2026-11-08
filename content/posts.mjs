// Brine Blog articles. Each post becomes a static page at /blog/<slug>/
// (see scripts/generate-pages.mjs). `title` stays under 65 characters and
// `description` under 160 so Google shows them in full.

export const posts = [
  {
    slug: 'how-much-caffeine-in-dilld',
    title: "How Much Caffeine Is in DILL'D? 180mg, Explained",
    h1: "How much caffeine is in a can of DILL'D?",
    description:
      "Every 355ml can of DILL'D pickle energy drink has 180mg of caffeine, the maximum Health Canada allows per can. Here's what that means for you.",
    category: 'Science',
    keywords: ['caffeine in DILLD', 'pickle energy drink caffeine', '180mg caffeine', 'Health Canada caffeine limit'],
    date: '2026-11-04',
    readMinutes: 5,
    cover: '/images/hero-can.jpg',
    coverAlt: "DILL'D Classic Dill can on a stone pedestal surrounded by pickle slices and dill",
    flavor: 0,
    body: `
<p class="lede">Short answer: <strong>180mg per 355ml can.</strong> That's a big number on purpose, and it's also the most caffeine a single can of energy drink is allowed to carry in Canada. Here's how that stacks up, and how to enjoy it without regretting it.</p>

<h2 id="the-number">The number: 180mg per can</h2>
<p>Every DILL'D flavour, from <a href="/#shop">Classic Dill to Dill Candy</a>, contains 180mg of caffeine in a 12 fl oz (355ml) can. We don't do "light" versions and we don't hide the number in tiny print. It's on the front of the can and on our <a href="/#facts">Brine Specs</a> panel.</p>
<p>For context, a regular brewed coffee usually sits somewhere between 80mg and 140mg per cup depending on the beans and the brew, and a shot of espresso is roughly 60–75mg. One DILL'D lands a little above a strong mug of coffee.</p>

<h2 id="canada-limit">Why exactly 180mg?</h2>
<p>Health Canada regulates caffeinated energy drinks as food and caps them at <strong>180mg of caffeine per single-serve container</strong>. We formulated right at that line: the most energy a can can legally carry here, with nothing sneaky on top.</p>
<p>Because of that, every can also has to carry a caution statement. Ours reads: not recommended for children, pregnant or breastfeeding women, or people sensitive to caffeine. You'll find the same notice at the bottom of every page on this site.</p>

<h2 id="daily-limits">How many cans is too many?</h2>
<p>Health Canada's general guidance for healthy adults is a maximum of about <strong>400mg of caffeine a day</strong> from all sources, which includes coffee, tea, chocolate and pre-workout. For people who are pregnant, planning to be, or breastfeeding, the guidance drops to 300mg a day. Teens and kids have much lower limits based on body weight.</p>
<ul>
  <li><strong>One can</strong> = 180mg, roughly 45% of an adult's daily max.</li>
  <li><strong>Two cans</strong> = 360mg, which leaves almost no room for that morning coffee.</li>
  <li><strong>Our rule:</strong> one DILL'D, enjoyed, is the move. It's a treat, not a hydration plan.</li>
</ul>

<h2 id="brine">Does the pickle brine change anything?</h2>
<p>The brine brings the flavour and about 460mg of sodium per can. That salty hit is the whole personality of the drink, but it doesn't change how caffeine works in your body. If you're watching your sodium, count a DILL'D the way you'd count a bag of chips.</p>

<h2 id="tips">How to drink it like a pro</h2>
<ol>
  <li>Drink it cold. Brine tastes sharper and cleaner below 4°C.</li>
  <li>Sip it. 180mg hits faster than you'd think, especially on an empty stomach.</li>
  <li>Skip it after mid-afternoon if you'd like to sleep tonight.</li>
  <li>Never mix it with alcohol.</li>
</ol>

<p class="callout">⚡ <strong>Bottom line:</strong> 180mg per can, the legal max in Canada, built for one-can moments. Respect the dill.</p>
`,
  },
  {
    slug: 'pickle-energy-drink-flavour-guide',
    title: "Pickle Energy Drink Flavours, Ranked Mild to Unhinged",
    h1: "Every DILL'D flavour, ranked from mild to unhinged",
    description:
      "Classic Dill, Sweet Heat, Sour Blast and Dill Candy: a no-nonsense guide to every DILL'D pickle energy drink flavour and which one to try first.",
    category: 'Flavours',
    keywords: ['pickle energy drink', 'DILLD flavours', 'Sweet Heat', 'Sour Blast', 'Dill Candy'],
    date: '2026-10-28',
    readMinutes: 6,
    cover: '/images/covers/sour-blast.jpg',
    coverAlt: "DILL'D Sour Blast neon green pickle energy drink can with lightning graphics",
    flavor: 2,
    body: `
<p class="lede">A pickle energy drink sounds like a dare, and honestly, it kind of is. But every DILL'D flavour is built around the same thing: real fermented dill brine, 180mg of caffeine and a lot of carbonation. Here's the lineup from "easy first sip" to "why did I do this".</p>

<h2 id="dill-candy">4. Dill Candy: the gateway can</h2>
<p><strong>Badge:</strong> Sweet Fizz · <strong>Price:</strong> $3.99</p>
<p>Candied pickle syrup with a fizzy rush. It tastes like a carnival pickle-on-a-stick turned into soda: sweet first, tart second, with the dill sitting quietly in the background. If you're scared of the whole concept, start here.</p>

<h2 id="classic-dill">3. Classic Dill: the original shock</h2>
<p><strong>Badge:</strong> Original · <strong>Price:</strong> $3.99</p>
<p>The one that started it all. Crisp cucumber, a salty-sweet brine punch and a clean finish. This is the flavour most people mean when they say "the pickle energy drink". It's balanced, it's loud, and it's the best match for salty snacks.</p>

<h2 id="sweet-heat">2. Sweet Heat: honey, habanero, garlic</h2>
<p><strong>Badge:</strong> Habanero · <strong>Price:</strong> $3.99</p>
<p>Habanero honey and garlic brine in a black can with flames on it, which should tell you everything. The first half of the sip is sweet. The habanero shows up at the very end and stays for a while. Fans of hot honey, this is yours.</p>

<h2 id="sour-blast">1. Sour Blast: maximum pucker</h2>
<p><strong>Badge:</strong> Pucker x3 · <strong>Price:</strong> $3.99</p>
<p>Triple-fermented sour pickle with electric lime. It's the flavour behind most of the faces you've seen in <a href="/blog/dilldchallenge-tiktok/">#DillDChallenge</a> videos. Try to finish a can without making the face. You won't.</p>

<h2 id="mystery">Bonus: the Mystery Can</h2>
<p>Every month we drop one limited flavour that's gone for good once it sells out. Right now it's <strong>Wasabi Brine Fizz</strong> at $4.50, only 5,000 cases. Read <a href="/blog/monthly-mystery-can-drop-explained/">how the Mystery Can Drop works</a> or jump straight to the <a href="/#drop">drop countdown</a>.</p>

<h2 id="which-first">Which one should you try first?</h2>
<ul>
  <li><strong>Never had pickle juice?</strong> Dill Candy.</li>
  <li><strong>Love pickles already?</strong> Classic Dill.</li>
  <li><strong>Put hot sauce on everything?</strong> Sweet Heat.</li>
  <li><strong>Want a story for your group chat?</strong> Sour Blast.</li>
</ul>
<p>Can't decide? Build a mixed 12-pack in the <a href="/#shop">shop</a>: mix and match any flavours, and every pack ships with a free sticker sheet.</p>
`,
  },
  {
    slug: 'monthly-mystery-can-drop-explained',
    title: 'How the DILL\'D Monthly Mystery Can Drop Works',
    h1: 'How the Monthly Mystery Can Drop works (and how to never miss one)',
    description:
      "One secret DILL'D flavour every 30 days, limited cases, never restocked. Here's how the Mystery Can Drop works and how VIPs get in first.",
    category: 'Drops',
    keywords: ['DILLD mystery can', 'limited edition energy drink', 'monthly drop', 'Wasabi Brine Fizz'],
    date: '2026-10-21',
    readMinutes: 4,
    cover: '/images/covers/dill-candy.jpg',
    coverAlt: "DILL'D Dill Candy can glowing on a lit pedestal",
    flavor: 3,
    body: `
<p class="lede">Once a month, we brew one flavour that's too weird for the core lineup. We make a fixed number of cases. When they're gone, the flavour goes into the vault and never comes back. That's the Mystery Can Drop.</p>

<h2 id="how-it-works">How it works</h2>
<ol>
  <li><strong>The countdown starts.</strong> The timer on the <a href="/#drop">homepage drop section</a> shows exactly when the current drop closes.</li>
  <li><strong>VIPs get the link first.</strong> People on the drop list get a private purchase link two hours before we post anywhere else.</li>
  <li><strong>Public sale.</strong> Everyone else gets access when we post on TikTok and Instagram.</li>
  <li><strong>The vault.</strong> When the last case sells, the flavour is retired. No re-runs.</li>
</ol>

<h2 id="this-month">This month's drop: Wasabi Brine Fizz</h2>
<p>Drop 04 is <strong>Wasabi Brine Fizz</strong>: a sharp horseradish heat over our Classic Dill base. It's $4.50 a can and limited to 5,000 cases worldwide.</p>

<h2 id="get-in-first">How to get in first</h2>
<p>Join the drop list from the <a href="/#drop">Mystery Can section</a> or the newsletter box in the footer of any page. You'll get:</p>
<ul>
  <li>The secret purchase link two hours early</li>
  <li>An optional SMS alert the second a drop opens</li>
  <li>Restock alerts for the core flavours</li>
</ul>
<p>We don't spam. One message when a drop opens, one when it's about to close.</p>

<h2 id="faq">Quick FAQ</h2>
<h3>Can I order more than one case?</h3>
<p>Each customer can order up to two 12-packs per drop so more people get a shot.</p>
<h3>Where do drops ship?</h3>
<p>Canada, the US, the UK, the EU, Australia and Japan, the same as our core flavours.</p>
<h3>Will a vaulted flavour ever come back?</h3>
<p>No. That's the deal. If one gets enough noise it might inspire a new flavour, but the original stays in the vault.</p>
`,
  },
  {
    slug: 'dilldchallenge-tiktok',
    title: "The #DillDChallenge: Inside TikTok's Sourest Dare",
    h1: "The #DillDChallenge: inside TikTok's sourest dare",
    description:
      "Try to finish a can of DILL'D Sour Blast without making a face. Here's where the #DillDChallenge came from, the best reactions and how to do it safely.",
    category: 'Culture',
    keywords: ['DillDChallenge', 'pickle energy drink TikTok', 'Sour Blast challenge', 'viral energy drink'],
    date: '2026-10-14',
    readMinutes: 4,
    cover: '/images/tiktok/brineboyz.jpg',
    coverAlt: 'Two friends laughing while trying the DILL\'D Sour Blast challenge in a kitchen',
    flavor: 2,
    body: `
<p class="lede">The rules are simple: crack a cold can of <a href="/blog/pickle-energy-drink-flavour-guide/">Sour Blast</a>, film yourself, and try to get through it without making the face. Almost nobody makes it.</p>

<h2 id="origin">Where it started</h2>
<p>The first videos were just people reacting to the idea of a pickle energy drink. Then the Sour Blast clips took over: the squint, the jaw tighten, the slow "wait… that's actually good". The tag <strong>#DillDChallenge</strong> stuck, and fans started tagging friends to try it next.</p>

<h2 id="favourites">Our favourite reactions</h2>
<ul>
  <li><strong>@picklequeen</strong> went in expecting a joke and came out "hooked" on Classic Dill.</li>
  <li><strong>@streamer_kai</strong> cracked a can before ranked games, live on stream.</li>
  <li><strong>@snackhunting</strong> took Sweet Heat to the streets and felt the habanero at the very end.</li>
  <li><strong>@brineboyz</strong> failed the Sour Blast no-face challenge in under two seconds.</li>
</ul>
<p>See them all in the <a href="/#tiktok">TikTok section</a> on the homepage, and follow <a href="https://www.tiktok.com/@drinkdilld" rel="noopener" target="_blank">@drinkdilld</a> for new ones every week.</p>

<h2 id="how-to">How to do it (the right way)</h2>
<ol>
  <li>Grab one cold can of Sour Blast.</li>
  <li>Set up your camera so we can see your whole face. The face is the point.</li>
  <li><strong>Sip, don't chug.</strong> The challenge is about your reaction, not speed.</li>
  <li>Post it with <strong>#DillDChallenge</strong> and tag <strong>@drinkdilld</strong>.</li>
</ol>

<h2 id="safety">Keep it safe</h2>
<p>Each can has 180mg of caffeine. That's one can per challenge, full stop. Don't stack cans for views, don't mix with alcohol, and if you're under 18, pregnant or sensitive to caffeine, this one isn't for you. Read <a href="/blog/how-much-caffeine-in-dilld/">how much caffeine is in DILL'D</a> for the full breakdown.</p>
`,
  },
  {
    slug: 'does-pickle-juice-help-cramps',
    title: 'Does Pickle Juice Help Muscle Cramps? What the Science Says',
    h1: 'Does pickle juice help muscle cramps? What the science actually says',
    description:
      "Athletes swear by pickle juice for cramps. We looked at the research on why it might work, how fast, and what that means for a pickle energy drink.",
    category: 'Science',
    keywords: ['pickle juice cramps', 'pickle brine benefits', 'electrolytes', 'pickle juice science'],
    date: '2026-10-07',
    readMinutes: 6,
    cover: '/images/classic-dill-photo.jpg',
    coverAlt: "DILL'D Classic Dill can on a white pedestal beside pickle slices and fresh dill",
    flavor: 0,
    body: `
<p class="lede">Long before pickle energy drinks existed, athletes were taking shots of pickle juice on the sidelines to stop cramps. Is there anything to it? There's some interesting research, but the reason it seems to work isn't the one most people assume.</p>

<h2 id="study">The study everyone cites</h2>
<p>In 2010, researchers published a small study in <em>Medicine &amp; Science in Sports &amp; Exercise</em> on mildly dehydrated men who had cramps triggered in a lab. When they drank a small amount of pickle juice, their cramps ended noticeably faster than when they drank nothing or plain water: on average, roughly a minute and a half versus a little over two minutes.</p>

<h2 id="why">Why it probably works (it's not the salt)</h2>
<p>The effect showed up within about a minute and a half, which is far too fast for the sodium in the brine to be absorbed from the stomach into the blood. The leading idea is a <strong>reflex</strong>: the sharp, sour taste of vinegar triggers receptors in the mouth and throat, which may calm the misfiring nerves that keep a muscle cramped.</p>
<p>In other words, the "shock" of the taste might be doing the work, not electrolyte replacement.</p>

<h2 id="limits">What the research doesn't say</h2>
<ul>
  <li>It was a small study on electrically induced cramps, not cramps during a real game.</li>
  <li>It doesn't show pickle juice <em>prevents</em> cramps.</li>
  <li>It doesn't mean salty drinks are a good way to rehydrate after hard exercise.</li>
</ul>

<h2 id="dilld">So what does this mean for DILL'D?</h2>
<p>We'll be honest, because it's on <a href="/#story">our whole brand</a>: DILL'D is a treat, not a sports drink or a medical product. It does have the sour, salty hit of real fermented dill brine and about 460mg of sodium per can, but it also has 180mg of caffeine, which is not what you want for recovery.</p>
<p>If you get cramps during sport, talk to a coach or a health professional. If you just love the taste of brine and want a can that wakes you up, that's exactly what we made. Start with <a href="/blog/pickle-energy-drink-flavour-guide/">our flavour guide</a>.</p>

<p class="callout">🥒 <strong>TL;DR:</strong> a small study found pickle juice ended lab-induced cramps faster than water, probably through a taste reflex. Cool science, but DILL'D is for fun, not first aid.</p>
`,
  },
]

// Static info pages linked from the footer.
export const legalPages = [
  {
    slug: 'privacy',
    title: "Privacy Policy | DILL'D",
    h1: 'Privacy Policy',
    description: "How DILL'D Beverages collects, uses and protects your personal information when you shop, join the drop list or read the Brine Blog.",
    body: `
<p>Last updated: November 2026.</p>
<h2>What we collect</h2>
<p>When you join the drop list or newsletter, we collect the email address or phone number you give us. When you order, we collect what's needed to ship and bill your order. Our site uses basic, anonymous analytics to understand which pages people visit.</p>
<h2>How we use it</h2>
<p>We use your contact details only to send drop alerts, order updates and the newsletter you signed up for. We never sell your information.</p>
<h2>Your choices</h2>
<p>Every email has an unsubscribe link, and you can reply STOP to any SMS. To access or delete your data, contact us at privacy@dilld.ca.</p>
<h2>Canada</h2>
<p>We handle personal information in line with Canada's PIPEDA and Quebec's Law 25.</p>
`,
  },
  {
    slug: 'terms',
    title: "Terms of Service | DILL'D",
    h1: 'Terms of Service',
    description: "The terms that apply when you shop DILL'D pickle energy drinks, enter Mystery Can Drops or use dilld.ca.",
    body: `
<p>Last updated: November 2026.</p>
<h2>Orders</h2>
<p>All prices are in Canadian dollars unless shown otherwise. Mystery Can Drops are limited to two 12-packs per customer and are final sale once shipped.</p>
<h2>Age and caffeine</h2>
<p>DILL'D contains 180mg of caffeine per can. By ordering you confirm you are of legal age in your region and understand the caution statement on every can.</p>
<h2>Shipping</h2>
<p>We ship to Canada, the US, the UK, the EU, Australia and Japan. Delivery times vary by region and are shown at checkout.</p>
<h2>Contact</h2>
<p>Questions? Email hello@dilld.ca.</p>
`,
  },
  {
    slug: 'accessibility',
    title: "Accessibility | DILL'D",
    h1: 'Accessibility',
    description: "DILL'D is committed to a website everyone can use. Here's what we support and how to tell us if something doesn't work for you.",
    body: `
<p>We want dilld.ca to work for everyone, including people using screen readers, keyboard navigation or reduced-motion settings.</p>
<h2>What we do</h2>
<ul>
  <li>Text alternatives for every product image</li>
  <li>Keyboard-reachable navigation and forms</li>
  <li>Heavy animations are toned down when your device asks for reduced motion</li>
  <li>High-contrast colours for body text</li>
</ul>
<h2>Tell us</h2>
<p>If something doesn't work for you, email accessibility@dilld.ca and we'll fix it.</p>
`,
  },
]
