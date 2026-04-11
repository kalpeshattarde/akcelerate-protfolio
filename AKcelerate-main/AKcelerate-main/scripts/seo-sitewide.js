const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITE_URL = 'https://akcelerate.in';
const OG_IMAGE = `${SITE_URL}/images/akcelerate-og.svg`;

const pageMeta = {
  '404.html': { title: 'Page Not Found | AKcelerate', description: 'The page you requested could not be found. Explore AKcelerate\'s AI, automation, analytics, and consulting solutions.', type: 'WebPage', robots: 'noindex, follow', sitemap: false },
  'about.html': { title: 'About AKcelerate | AI, Data Science & Digital Solutions', description: 'Meet Kalpesh Attarde and the AKcelerate team. We are a data-driven growth company helping businesses scale with AI, data science, and digital solutions.', type: 'AboutPage' },
  'blog.html': { title: 'AKcelerate Blog | AI, Data Science & Digital Growth Insights', description: 'Insights on AI, machine learning, analytics, automation, and digital growth from the AKcelerate team.', type: 'CollectionPage' },
  'careers.html': { title: 'Careers at AKcelerate | AI, Data Science & Digital Growth', description: 'Explore careers at AKcelerate and help businesses grow with AI, data science, analytics, and digital solutions.', type: 'WebPage' },
  'case-studies.html': { title: 'Case Studies | AKcelerate Client Growth Stories', description: 'See how AKcelerate helps businesses improve revenue, efficiency, and decision-making through AI, data science, and digital solutions.', type: 'CollectionPage' },
  'completed-projects.html': { title: 'Completed Projects | AKcelerate AI, Data & Digital Delivery', description: 'A showcase of AI, analytics, automation, web development, and digital transformation projects delivered by AKcelerate.', type: 'CollectionPage' },
  'contact.html': { title: 'Contact AKcelerate | AI, Data Science & Digital Solutions', description: 'Contact AKcelerate to discuss AI consulting, analytics, web development, automation, and growth-focused digital solutions for your business.', type: 'ContactPage' },
  'founder.html': { title: 'Kalpesh Attarde | Founder of AKcelerate', description: 'Meet Kalpesh Attarde, founder of AKcelerate, and learn how he helps businesses grow with AI, data science, analytics, and digital solutions.', type: 'ProfilePage' },
  'free-audit.html': { title: 'Free Business Audit | AKcelerate', description: 'Book a free business audit with AKcelerate to identify growth opportunities using AI, analytics, automation, and digital strategy.', type: 'WebPage' },
  'gallery.html': { title: 'Gallery | AKcelerate Projects, Dashboards & Delivery Highlights', description: 'Explore AKcelerate dashboards, delivery highlights, product visuals, and client work across AI, analytics, and digital solutions.', type: 'CollectionPage' },
  'index.html': { title: 'AKcelerate | AI, Data Science & Digital Solutions for Growth', description: 'AKcelerate helps businesses increase revenue and profit using AI, data science, and digital solutions. We turn data into measurable business results.', type: 'WebSite' },
  'industries.html': { title: 'Industries We Serve | AKcelerate', description: 'AKcelerate delivers AI, analytics, automation, and digital solutions across manufacturing, healthcare, retail, fintech, education, logistics, and more.', type: 'WebPage' },
  'insights.html': { title: 'Insights | AKcelerate Thought Leadership', description: 'Expert insights on AI, data science, analytics, automation, cloud, and business growth from AKcelerate.', type: 'CollectionPage' },
  'pricing.html': { title: 'Pricing | AKcelerate Services & Engagement Models', description: 'Explore AKcelerate pricing and engagement options for AI, analytics, web development, automation, and growth-focused digital solutions.', type: 'WebPage' },
  'privacy.html': { title: 'Privacy Policy | AKcelerate', description: 'Read AKcelerate\'s privacy policy to understand how we collect, use, and protect your information.', type: 'WebPage' },
  'resources.html': { title: 'Resources | AKcelerate Guides, Templates & Case Studies', description: 'Download AKcelerate resources, guides, playbooks, and case studies on AI, analytics, automation, and digital growth.', type: 'CollectionPage' },
  'services-new.html': { title: 'AI & Data Services | AKcelerate', description: 'Explore AKcelerate AI, analytics, consulting, and digital growth services.', type: 'WebPage', robots: 'noindex, follow', sitemap: false, canonicalRoute: '/services' },
  'services.html': { title: 'Services | AKcelerate AI, Data Science & Digital Solutions', description: 'Explore AKcelerate services across data analysis, business intelligence, machine learning, web development, and growth optimization.', type: 'CollectionPage' },
  'solutions.html': { title: 'Solutions | AKcelerate AI, Automation & Digital Growth', description: 'Explore AKcelerate solution areas across business automation, AI/ML, analytics, data visualization, SaaS, cloud, and MLOps.', type: 'CollectionPage' },
  'terms.html': { title: 'Terms of Service | AKcelerate', description: 'Review AKcelerate\'s terms of service for our AI, analytics, automation, and digital solution engagements.', type: 'WebPage' },
  'blog/ai-manufacturing-adoption.html': { title: 'AI Adoption in Manufacturing: Case Studies | AKcelerate Blog', description: 'Real-world case studies showing how manufacturers adopt AI, analytics, and automation to improve operations and growth.', type: 'Article' },
  'blog/data-driven-brand.html': { title: 'Building a Data-Driven Brand in 2026 | AKcelerate Blog', description: 'Learn how data-driven decision-making can strengthen brand performance, trust, and business growth in 2026.', type: 'Article' },
  'blog/data-to-intelligence.html': { title: 'Turning Data Into Actionable Business Intelligence | AKcelerate Blog', description: 'A practical guide to turning raw business data into insights, decisions, and measurable business results.', type: 'Article' },
  'blog/generative-ai-operations.html': { title: 'How Generative AI Is Transforming Business Operations | AKcelerate Blog', description: 'See how generative AI is reshaping reporting, workflows, and operational decision-making across modern businesses.', type: 'Article' },
  'blog/ml-deployment-guide.html': { title: 'End-to-End ML Deployment: A Practical Guide | AKcelerate Blog', description: 'A practical guide to deploying, monitoring, and improving machine learning systems in real-world business environments.', type: 'Article' },
  'blog/msme-growth-strategies.html': { title: '5 Data-Driven Strategies for MSME Growth | AKcelerate Blog', description: 'Five practical strategies MSMEs can use to unlock growth with analytics, AI, and data-driven decisions.', type: 'Article' },
  'services/energy-management.html': { title: 'Energy Management Analytics | AKcelerate', description: 'Reduce energy costs and improve operational efficiency with AKcelerate energy management analytics and optimization solutions.', type: 'Service' },
  'services/predictive-maintenance.html': { title: 'Predictive Maintenance Solutions | AKcelerate', description: 'Reduce unplanned downtime with predictive maintenance, real-time monitoring, failure prediction, and intelligent alerts from AKcelerate.', type: 'Service' },
  'services/quality-analytics.html': { title: 'Quality Analytics Solutions | AKcelerate', description: 'Improve quality performance with analytics, defect reduction, root cause visibility, and smarter quality operations from AKcelerate.', type: 'Service' },
  'services/supply-chain-analytics.html': { title: 'Supply Chain Analytics Solutions | AKcelerate', description: 'Improve forecast accuracy, inventory visibility, and supply chain performance with AKcelerate analytics solutions.', type: 'Service' },
  'solutions/ai-ml.html': { title: 'AI / ML Solutions | AKcelerate', description: 'Build machine learning models, NLP systems, generative AI tools, predictive analytics, and intelligent products with AKcelerate.', type: 'Service' },
  'solutions/automated-analytics.html': { title: 'Automated Analytics | AKcelerate', description: 'Automate reporting, KPI tracking, forecasting, and analytics workflows with AKcelerate.', type: 'Service' },
  'solutions/business-automation.html': { title: 'Business Automation | AKcelerate', description: 'Automate workflows, documents, CRM/ERP processes, and operations with AKcelerate business automation solutions.', type: 'Service' },
  'solutions/business-consulting.html': { title: 'Business Consulting | AKcelerate', description: 'Get AI strategy, growth consulting, digital transformation guidance, and performance optimization from AKcelerate.', type: 'Service' },
  'solutions/cloud-devops.html': { title: 'Cloud & DevOps | AKcelerate', description: 'Build cloud infrastructure, CI/CD pipelines, and reliable deployment workflows with AKcelerate cloud and DevOps services.', type: 'Service' },
  'solutions/data-visualization.html': { title: 'Data Visualization | AKcelerate', description: 'Create dashboards, BI systems, and executive reporting experiences that turn complex data into clear decisions.', type: 'Service' },
  'solutions/mlops.html': { title: 'MLOps | AKcelerate', description: 'Deploy, monitor, retrain, and manage machine learning systems with AKcelerate MLOps services.', type: 'Service' },
  'solutions/saas-dev.html': { title: 'Website & SaaS Development | AKcelerate', description: 'Build websites, SaaS products, MVPs, dashboards, and custom digital products with AKcelerate.', type: 'Service' }
};

const genericContentReplacements = [
  {
    test: rel => ['index.html', 'about.html', 'contact.html', 'services.html', 'solutions.html', 'careers.html', 'pricing.html', 'gallery.html', 'case-studies.html', 'founder.html', 'resources.html', 'insights.html'].includes(rel),
    find: /premium AI, Data, Automation and Business Consulting firm/gi,
    replace: 'data-driven growth company specializing in AI, machine learning, and digital solutions'
  },
  {
    test: rel => ['contact.html', 'careers.html', 'pricing.html', 'gallery.html', 'terms.html'].includes(rel),
    find: /AI manufacturing analytics platform/gi,
    replace: 'AI, data science, and digital solutions company'
  },
  {
    test: rel => rel === 'blog.html',
    find: /Get our latest insights on AI manufacturing analytics delivered monthly\./g,
    replace: 'Get our latest insights on AI, data science, and digital growth delivered monthly.'
  },
  {
    test: rel => rel === 'index.html',
    find: /AKcelerate is a premium AI, Data, Automation and Business Consulting firm\. We build custom AI systems, automate business operations, develop SaaS products and websites, create data dashboards, set up cloud infrastructure, and provide strategic advisory — all under one roof\. Think of us as your dedicated tech and AI transformation partner\./g,
    replace: 'AKcelerate is a data-driven growth company. We help businesses increase revenue and profit using AI, data science, and digital solutions, from business intelligence and machine learning to custom web development and performance optimization.'
  },
  {
    test: rel => rel === 'index.html',
    find: /Kalpesh Attarde is the founder of AKcelerate — a premium AI, Data, Automation and Business Consulting firm\./g,
    replace: 'Kalpesh Attarde is the founder of AKcelerate — a data-driven growth company specializing in AI, machine learning, and digital solutions.'
  },
  {
    test: rel => rel === 'about.html',
    find: /Kalpesh Attarde is the founder of AKcelerate — a premium AI, Data, Automation and Business Consulting firm\./g,
    replace: 'Kalpesh Attarde is the founder of AKcelerate — a data-driven growth company specializing in AI, machine learning, and digital solutions.'
  },
  {
    test: rel => ['index.html', 'about.html', 'case-studies.html'].includes(rel),
    find: /Premium AI, Data, Automation and Business Consulting firm — delivering digital transformation across 13\+ industries\./g,
    replace: 'We help businesses increase revenue and profit using AI, data science, and digital solutions.'
  }
];

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function routeFromRel(rel) {
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/\.html$/, '').replace(/\\/g, '/')}`;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSeoBlock(rel, meta) {
  const route = meta.canonicalRoute || routeFromRel(rel);
  const url = `${SITE_URL}${route}`;
  const robots = meta.robots || 'index, follow, max-image-preview:large';
  const ogType = meta.type === 'Article' ? 'article' : 'website';
  const schema = buildSchema(rel, meta, url);

  return [
    `  <title>${escapeHtml(meta.title)}</title>`,
    `  <meta name="description" content="${escapeHtml(meta.description)}" />`,
    `  <meta name="author" content="Kalpesh Attarde" />`,
    `  <meta name="robots" content="${escapeHtml(robots)}" />`,
    `  <meta name="theme-color" content="#08111F" />`,
    `  <link rel="canonical" href="${escapeHtml(url)}" />`,
    `  <meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `  <meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `  <meta property="og:type" content="${ogType}" />`,
    `  <meta property="og:url" content="${escapeHtml(url)}" />`,
    `  <meta property="og:site_name" content="AKcelerate" />`,
    `  <meta property="og:image" content="${OG_IMAGE}" />`,
    `  <meta property="og:image:alt" content="AKcelerate AI, data science, and digital solutions" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `  <meta name="twitter:image" content="${OG_IMAGE}" />`,
    '  <script type="application/ld+json">',
    JSON.stringify(schema, null, 2).split('\n').map(line => `  ${line}`).join('\n'),
    '  </script>'
  ].join('\n');
}

function buildSchema(rel, meta, url) {
  const orgRef = { '@id': `${SITE_URL}/#organization` };
  const baseOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AKcelerate',
        url: `${SITE_URL}/`,
        logo: OG_IMAGE,
        email: 'mailto:akceleratehq@gmail.com',
        telephone: '+91-8208555380',
        sameAs: [
          'https://www.linkedin.com/company/akceleratehq/',
          'https://x.com/akcelerateHQ',
          'https://www.instagram.com/akceleratehq/'
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN'
        }
      }
    ]
  };

  let pageNode;
  if (meta.type === 'Article') {
    pageNode = {
      '@type': 'BlogPosting',
      headline: meta.title,
      description: meta.description,
      mainEntityOfPage: url,
      image: OG_IMAGE,
      author: { '@type': 'Organization', name: 'AKcelerate' },
      publisher: orgRef
    };
  } else if (meta.type === 'ContactPage') {
    pageNode = { '@type': 'ContactPage', name: meta.title, description: meta.description, url, mainEntity: orgRef };
  } else if (meta.type === 'AboutPage') {
    pageNode = { '@type': 'AboutPage', name: meta.title, description: meta.description, url, mainEntity: orgRef };
  } else if (meta.type === 'ProfilePage') {
    pageNode = {
      '@type': 'ProfilePage',
      name: meta.title,
      description: meta.description,
      url,
      mainEntity: { '@type': 'Person', name: 'Kalpesh Attarde', worksFor: orgRef }
    };
  } else if (meta.type === 'Service') {
    pageNode = { '@type': 'Service', name: meta.title, description: meta.description, url, provider: orgRef };
  } else if (meta.type === 'WebSite') {
    pageNode = { '@type': 'WebSite', name: 'AKcelerate', url, publisher: orgRef, description: meta.description };
  } else {
    pageNode = { '@type': meta.type || 'WebPage', name: meta.title, description: meta.description, url, isPartOf: { '@id': `${SITE_URL}/#website` } };
  }

  if (meta.type !== 'WebSite') {
    baseOrg['@graph'].push({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'AKcelerate',
      url: `${SITE_URL}/`,
      publisher: orgRef
    });
  }
  baseOrg['@graph'].push(pageNode);
  return baseOrg;
}

function stripExistingSeo(text) {
  let out = text;
  out = out.replace(/\s*<title>[\s\S]*?<\/title>\r?\n?/gi, '\n');
  out = out.replace(/\s*<meta[^>]+name="(?:title|description|keywords|author|robots|theme-color|twitter:card|twitter:title|twitter:description|twitter:image)"[^>]*>\r?\n?/gi, '\n');
  out = out.replace(/\s*<meta[^>]+property="og:[^"]+"[^>]*>\r?\n?/gi, '\n');
  out = out.replace(/\s*<link[^>]+rel="canonical"[^>]*>\r?\n?/gi, '\n');
  out = out.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\r?\n?/gi, '\n');
  out = out.replace(/\n{3,}/g, '\n\n');
  return out;
}

function updateHtml(file) {
  const rel = path.relative(PUBLIC_DIR, file).replace(/\\/g, '/');
  const meta = pageMeta[rel] || { title: 'AKcelerate', description: 'AKcelerate helps businesses grow with AI, data science, analytics, and digital solutions.', type: 'WebPage' };
  let text = fs.readFileSync(file, 'utf8');
  text = stripExistingSeo(text);

  const seoBlock = buildSeoBlock(rel, meta);
  text = text.replace(
    /(<meta name="viewport" content="width=device-width,\s*initial-scale=1\.0"\s*\/?>)/i,
    `$1\n${seoBlock}`
  );

  for (const rule of genericContentReplacements) {
    if (rule.test(rel)) text = text.replace(rule.find, rule.replace);
  }

  fs.writeFileSync(file, text);
}

function sitemapPriority(rel) {
  if (rel === 'index.html') return ['weekly', '1.0'];
  if (rel === 'contact.html') return ['monthly', '0.9'];
  if (rel === 'services.html' || rel === 'solutions.html') return ['weekly', '0.9'];
  if (rel.startsWith('blog/')) return ['monthly', '0.7'];
  if (rel.startsWith('services/') || rel.startsWith('solutions/')) return ['monthly', '0.8'];
  if (['about.html', 'industries.html', 'pricing.html', 'free-audit.html'].includes(rel)) return ['monthly', '0.8'];
  return ['monthly', '0.7'];
}

function writeSitemap() {
  const files = walk(PUBLIC_DIR)
    .map(file => path.relative(PUBLIC_DIR, file).replace(/\\/g, '/'))
    .filter(rel => (pageMeta[rel]?.sitemap ?? true) && !(pageMeta[rel]?.robots || '').includes('noindex'));

  const urls = files
    .sort()
    .map(rel => {
      const route = pageMeta[rel]?.canonicalRoute || routeFromRel(rel);
      const [changefreq, priority] = sitemapPriority(rel);
      return `  <url><loc>${SITE_URL}${route}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
}

for (const file of walk(PUBLIC_DIR)) updateHtml(file);
writeSitemap();
console.log('Site-wide SEO optimization applied.');
