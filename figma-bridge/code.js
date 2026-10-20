// York Foundation Canvas Bridge (1440px Native Auto Layout Generator)
figma.showUI(__html__, { width: 340, height: 490, title: "York Foundation Bridge" });

function postLog(message, level = 'info') {
  figma.ui.postMessage({ type: 'LOG', message, level });
}

// Color Palette
const COLORS = {
  bgBase: { r: 11/255, g: 15/255, b: 25/255 },       // #0B0F19 Dark base
  bgSurface: { r: 18/255, g: 24/255, b: 40/255 },    // #121828 Card surface
  bgCardHover: { r: 25/255, g: 34/255, b: 56/255 },  // #192238
  bgLight: { r: 248/255, g: 250/255, b: 252/255 },   // #F8FAFC
  white: { r: 1, g: 1, b: 1 },
  textMain: { r: 248/255, g: 250/255, b: 252/255 },
  textMuted: { r: 148/255, g: 163/255, b: 184/255 }, // #94A3B8
  textSubtle: { r: 100/255, g: 116/255, b: 139/255 },// #64748B
  primary: { r: 37/255, g: 99/255, b: 235/255 },     // #2563EB Blue
  primaryLight: { r: 96/255, g: 165/255, b: 250/255 },
  emerald: { r: 16/255, g: 185/255, b: 129/255 },    // #10B981 Green
  border: { r: 255/255, g: 255/255, b: 255/255 },    // opacity 0.08
  borderLight: { r: 226/255, g: 232/255, b: 240/255 }
};

let activeFont = { family: "Inter", style: "Regular" };
let activeBoldFont = { family: "Inter", style: "Bold" };
let activeSemiBoldFont = { family: "Inter", style: "Medium" };

async function loadFonts() {
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    activeFont = { family: "Inter", style: "Regular" };
  } catch (e) {
    try {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
      activeFont = { family: "Roboto", style: "Regular" };
    } catch(e2) {
      console.warn("Could not load default font, using fallback");
    }
  }

  try {
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    activeBoldFont = { family: "Inter", style: "Bold" };
  } catch (e) {
    activeBoldFont = activeFont;
  }

  try {
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    activeSemiBoldFont = { family: "Inter", style: "Semi Bold" };
  } catch (e) {
    try {
      await figma.loadFontAsync({ family: "Inter", style: "SemiBold" });
      activeSemiBoldFont = { family: "Inter", style: "SemiBold" };
    } catch (e2) {
      try {
        await figma.loadFontAsync({ family: "Inter", style: "Medium" });
        activeSemiBoldFont = { family: "Inter", style: "Medium" };
      } catch(e3) {
        activeSemiBoldFont = activeBoldFont;
      }
    }
  }
}

function solidFill(color, opacity = 1) {
  return [{ type: 'SOLID', color, opacity }];
}

function createText(characters, size = 14, weight = 'Regular', color = COLORS.textMain, opts = {}) {
  const text = figma.createText();
  let f = activeFont;
  if (weight === 'Bold') f = activeBoldFont;
  else if (weight === 'Semi Bold' || weight === 'Medium') f = activeSemiBoldFont;
  
  text.fontName = f;
  text.characters = String(characters !== undefined ? characters : '');
  text.fontSize = size;
  text.fills = solidFill(color);
  if (opts.lineHeight) text.lineHeight = { value: opts.lineHeight, unit: 'PIXELS' };
  if (opts.letterSpacing) text.letterSpacing = { value: opts.letterSpacing, unit: 'PIXELS' };
  return text;
}

function createBadge(label, color = COLORS.primaryLight, bg = COLORS.primary) {
  const badge = figma.createFrame();
  badge.name = `Badge: ${label}`;
  badge.layoutMode = 'HORIZONTAL';
  badge.primaryAxisSizingMode = 'AUTO';
  badge.counterAxisSizingMode = 'AUTO';
  badge.paddingLeft = 8;
  badge.paddingRight = 8;
  badge.paddingTop = 3;
  badge.paddingBottom = 3;
  badge.cornerRadius = 4;
  badge.fills = solidFill(bg, 0.2);
  badge.strokes = solidFill(color, 0.4);
  badge.strokeWeight = 1;

  const t = createText(label, 11, 'Semi Bold', color);
  badge.appendChild(t);
  return badge;
}

function createButton(label, isPrimary = true) {
  const btn = figma.createFrame();
  btn.name = `Button: ${label}`;
  btn.layoutMode = 'HORIZONTAL';
  btn.primaryAxisSizingMode = 'AUTO';
  btn.counterAxisSizingMode = 'AUTO';
  btn.paddingLeft = 18;
  btn.paddingRight = 18;
  btn.paddingTop = 10;
  btn.paddingBottom = 10;
  btn.cornerRadius = 6;

  if (isPrimary) {
    btn.fills = solidFill(COLORS.primary);
    const t = createText(label, 13, 'Semi Bold', COLORS.white);
    btn.appendChild(t);
  } else {
    btn.fills = solidFill(COLORS.white, 0.05);
    btn.strokes = solidFill(COLORS.white, 0.15);
    btn.strokeWeight = 1;
    const t = createText(label, 13, 'Medium', COLORS.textMain);
    btn.appendChild(t);
  }
  return btn;
}

function createTableCell(contentNode, width) {
  const cell = figma.createFrame();
  cell.name = "Table Cell";
  cell.layoutMode = 'HORIZONTAL';
  cell.primaryAxisSizingMode = 'FIXED';
  cell.counterAxisSizingMode = 'AUTO';
  cell.resize(width, 24);
  cell.counterAxisAlignItems = 'CENTER';
  cell.fills = [];
  cell.appendChild(contentNode);
  return cell;
}

// ─── SCREEN 1: LANDING PAGE (1440px) ─────────────────────────────────────────
async function generateLandingPage(startX, startY) {
  const screen = figma.createFrame();
  screen.name = "York Landing Page (1440px Auto Layout)";
  screen.x = startX;
  screen.y = startY;
  screen.resize(1440, 100);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'AUTO';
  screen.counterAxisSizingMode = 'FIXED';
  screen.itemSpacing = 64;
  screen.paddingTop = 0;
  screen.paddingBottom = 80;
  screen.paddingLeft = 0;
  screen.paddingRight = 0;
  screen.fills = solidFill(COLORS.bgBase);

  // 1. Navbar
  const nav = figma.createFrame();
  nav.name = "Navigation Bar (1440px)";
  nav.layoutMode = 'HORIZONTAL';
  nav.primaryAxisSizingMode = 'FIXED';
  nav.counterAxisSizingMode = 'AUTO';
  nav.resize(1440, 72);
  nav.primaryAxisAlignItems = 'SPACE_BETWEEN';
  nav.counterAxisAlignItems = 'CENTER';
  nav.paddingLeft = 60;
  nav.paddingRight = 60;
  nav.fills = solidFill(COLORS.bgBase);
  nav.strokes = solidFill(COLORS.white, 0.08);
  nav.strokeWeight = 1;

  const logoWrap = figma.createFrame();
  logoWrap.layoutMode = 'HORIZONTAL';
  logoWrap.itemSpacing = 8;
  logoWrap.counterAxisAlignItems = 'CENTER';
  logoWrap.fills = [];
  logoWrap.appendChild(createText("York.ie", 18, 'Bold', COLORS.white));
  logoWrap.appendChild(createBadge("FOUNDATION", COLORS.primaryLight, COLORS.primary));
  nav.appendChild(logoWrap);

  const navLinks = figma.createFrame();
  navLinks.layoutMode = 'HORIZONTAL';
  navLinks.itemSpacing = 28;
  navLinks.counterAxisAlignItems = 'CENTER';
  navLinks.fills = [];
  navLinks.appendChild(createText("Overview", 13, 'Medium', COLORS.textMuted));
  navLinks.appendChild(createText("22 Services", 13, 'Medium', COLORS.textMuted));
  navLinks.appendChild(createText("LMS Platform", 13, 'Medium', COLORS.textMuted));
  navLinks.appendChild(createText("Capital & Fuel", 13, 'Medium', COLORS.textMuted));
  nav.appendChild(navLinks);

  const navActions = figma.createFrame();
  navActions.layoutMode = 'HORIZONTAL';
  navActions.itemSpacing = 12;
  navActions.counterAxisAlignItems = 'CENTER';
  navActions.fills = [];
  navActions.appendChild(createButton("Sign In", false));
  navActions.appendChild(createButton("Launch Console", true));
  nav.appendChild(navActions);
  screen.appendChild(nav);

  // 2. Hero Section
  const hero = figma.createFrame();
  hero.name = "Hero Section";
  hero.layoutMode = 'VERTICAL';
  hero.primaryAxisSizingMode = 'AUTO';
  hero.counterAxisSizingMode = 'FIXED';
  hero.resize(1440, 200);
  hero.counterAxisAlignItems = 'CENTER';
  hero.itemSpacing = 20;
  hero.paddingLeft = 120;
  hero.paddingRight = 120;
  hero.paddingTop = 40;
  hero.fills = [];

  hero.appendChild(createBadge("ENTERPRISE OPERATING SYSTEM", COLORS.emerald, COLORS.emerald));

  const h1 = createText("One Console. Twenty-Two Services.\nComplete Operational Control.", 44, 'Bold', COLORS.white);
  h1.textAlignHorizontal = 'CENTER';
  hero.appendChild(h1);

  const sub = createText("York Foundation unifies R&D, Quality Assurance, Go-to-Market, Finance, and Capital\ninto an integrated real-time management console for executive leadership.", 16, 'Regular', COLORS.textMuted);
  sub.textAlignHorizontal = 'CENTER';
  hero.appendChild(sub);

  const ctaRow = figma.createFrame();
  ctaRow.layoutMode = 'HORIZONTAL';
  ctaRow.itemSpacing = 16;
  ctaRow.counterAxisAlignItems = 'CENTER';
  ctaRow.fills = [];
  ctaRow.appendChild(createButton("⚡ Launch Live Console", true));
  ctaRow.appendChild(createButton("Explore All 22 Services", false));
  hero.appendChild(ctaRow);
  screen.appendChild(hero);

  // 3. Flagship 3 Cards Showcase
  const showcase = figma.createFrame();
  showcase.name = "Flagship Showcase (3 Equal Cards)";
  showcase.layoutMode = 'VERTICAL';
  showcase.primaryAxisSizingMode = 'AUTO';
  showcase.counterAxisSizingMode = 'FIXED';
  showcase.resize(1440, 300);
  showcase.paddingLeft = 60;
  showcase.paddingRight = 60;
  showcase.itemSpacing = 24;
  showcase.fills = [];

  const showcaseTitleRow = figma.createFrame();
  showcaseTitleRow.layoutMode = 'HORIZONTAL';
  showcaseTitleRow.primaryAxisSizingMode = 'FIXED';
  showcaseTitleRow.counterAxisSizingMode = 'AUTO';
  showcaseTitleRow.resize(1320, 40);
  showcaseTitleRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
  showcaseTitleRow.fills = [];
  showcaseTitleRow.appendChild(createText("Flagship Integrated Engines", 20, 'Bold', COLORS.white));
  showcaseTitleRow.appendChild(createBadge("VERSION 2.0 ACTIVE", COLORS.primaryLight, COLORS.primary));
  showcase.appendChild(showcaseTitleRow);

  const cardsRow = figma.createFrame();
  cardsRow.name = "Cards Row (1440px Auto Layout)";
  cardsRow.layoutMode = 'HORIZONTAL';
  cardsRow.primaryAxisSizingMode = 'FIXED';
  cardsRow.counterAxisSizingMode = 'AUTO';
  cardsRow.resize(1320, 240);
  cardsRow.itemSpacing = 24;
  cardsRow.fills = [];

  const cardData = [
    { title: "York.IE LMS Platform", badge: "TRAINING & LEADERSHIP", desc: "Interactive company onboarding, competency ladders, and trackable milestones for fast growth." },
    { title: "Operations Hub", badge: "CORE ENGINE", desc: "Cross-functional command dashboard aligning R&D sprints, team leaders, and strategic deliverables." },
    { title: "Capital & Fuel", badge: "STRATEGY & RUNWAY", desc: "Automated burn analytics, runway modeling, headcount budgets, and investment portfolio governance." }
  ];

  cardData.forEach(c => {
    const card = figma.createFrame();
    card.name = `Card: ${c.title}`;
    card.layoutMode = 'VERTICAL';
    card.layoutGrow = 1;
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.paddingTop = 24;
    card.paddingBottom = 24;
    card.paddingLeft = 24;
    card.paddingRight = 24;
    card.itemSpacing = 16;
    card.cornerRadius = 12;
    card.fills = solidFill(COLORS.bgSurface);
    card.strokes = solidFill(COLORS.white, 0.09);
    card.strokeWeight = 1;

    card.appendChild(createBadge(c.badge, COLORS.primaryLight, COLORS.primary));
    card.appendChild(createText(c.title, 18, 'Semi Bold', COLORS.white));
    card.appendChild(createText(c.desc, 13, 'Regular', COLORS.textMuted));

    const cardAction = figma.createFrame();
    cardAction.layoutMode = 'HORIZONTAL';
    cardAction.counterAxisAlignItems = 'CENTER';
    cardAction.itemSpacing = 8;
    cardAction.fills = [];
    cardAction.appendChild(createText("Open Console Module →", 12, 'Semi Bold', COLORS.primaryLight));
    card.appendChild(cardAction);

    cardsRow.appendChild(card);
  });
  showcase.appendChild(cardsRow);
  screen.appendChild(showcase);

  return screen;
}

// ─── SCREEN 2: EXECUTIVE PRO CONSOLE (1440px) ────────────────────────────────
async function generateConsolePage(startX, startY) {
  const screen = figma.createFrame();
  screen.name = "Executive Pro Console (1440px Auto Layout)";
  screen.x = startX;
  screen.y = startY;
  screen.resize(1440, 100);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'AUTO';
  screen.counterAxisSizingMode = 'FIXED';
  screen.itemSpacing = 32;
  screen.paddingTop = 0;
  screen.paddingBottom = 60;
  screen.paddingLeft = 0;
  screen.paddingRight = 0;
  screen.fills = solidFill(COLORS.bgBase);

  // Top Bar
  const topBar = figma.createFrame();
  topBar.name = "Top Executive Bar (1440px)";
  topBar.layoutMode = 'HORIZONTAL';
  topBar.primaryAxisSizingMode = 'FIXED';
  topBar.counterAxisSizingMode = 'AUTO';
  topBar.resize(1440, 64);
  topBar.primaryAxisAlignItems = 'SPACE_BETWEEN';
  topBar.counterAxisAlignItems = 'CENTER';
  topBar.paddingLeft = 40;
  topBar.paddingRight = 40;
  topBar.fills = solidFill(COLORS.bgSurface);
  topBar.strokes = solidFill(COLORS.white, 0.08);
  topBar.strokeWeight = 1;

  const left = figma.createFrame();
  left.layoutMode = 'HORIZONTAL';
  left.itemSpacing = 16;
  left.counterAxisAlignItems = 'CENTER';
  left.fills = [];
  left.appendChild(createText("York Console", 16, 'Bold', COLORS.white));
  left.appendChild(createBadge("EXECUTIVE PRO", COLORS.emerald, COLORS.emerald));
  topBar.appendChild(left);

  const right = figma.createFrame();
  right.layoutMode = 'HORIZONTAL';
  right.itemSpacing = 16;
  right.counterAxisAlignItems = 'CENTER';
  right.fills = [];
  right.appendChild(createText("🟢 Live Telemetry Connected", 12, 'Medium', COLORS.emerald));
  right.appendChild(createButton("Export Report", false));
  topBar.appendChild(right);
  screen.appendChild(topBar);

  // Metrics KPI Row
  const kpiSection = figma.createFrame();
  kpiSection.name = "KPI Row (4 Auto Layout Cards)";
  kpiSection.layoutMode = 'HORIZONTAL';
  kpiSection.primaryAxisSizingMode = 'FIXED';
  kpiSection.counterAxisSizingMode = 'AUTO';
  kpiSection.resize(1360, 120);
  kpiSection.paddingLeft = 40;
  kpiSection.paddingRight = 40;
  kpiSection.itemSpacing = 20;
  kpiSection.fills = [];

  const kpis = [
    { label: "Active Initiatives", val: "18 / 22", change: "+3 this month", color: COLORS.emerald },
    { label: "Monthly Burn Rate", val: "$142,500", change: "-4.2% vs budget", color: COLORS.primaryLight },
    { label: "Team Velocity", val: "94.2%", change: "+6.8% sprint-over-sprint", color: COLORS.emerald },
    { label: "Runway Projection", val: "28.4 Mos", change: "Safe Horizon (Series A)", color: COLORS.primaryLight }
  ];

  kpis.forEach(k => {
    const card = figma.createFrame();
    card.layoutMode = 'VERTICAL';
    card.layoutGrow = 1;
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.paddingTop = 18;
    card.paddingBottom = 18;
    card.paddingLeft = 20;
    card.paddingRight = 20;
    card.itemSpacing = 8;
    card.cornerRadius = 8;
    card.fills = solidFill(COLORS.bgSurface);
    card.strokes = solidFill(COLORS.white, 0.08);
    card.strokeWeight = 1;

    card.appendChild(createText(k.label, 11, 'Medium', COLORS.textMuted));
    card.appendChild(createText(k.val, 24, 'Bold', COLORS.white));
    card.appendChild(createText(k.change, 11, 'Medium', k.color));
    kpiSection.appendChild(card);
  });
  screen.appendChild(kpiSection);

  return screen;
}

// ─── SCREEN 3: CONSOLE TEAM HIERARCHY TABLE (1440px) ─────────────────────────
async function generateHierarchyPage(startX, startY) {
  const screen = figma.createFrame();
  screen.name = "Team Hierarchy Table (1440px Auto Layout)";
  screen.x = startX;
  screen.y = startY;
  screen.resize(1440, 100);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'AUTO';
  screen.counterAxisSizingMode = 'FIXED';
  screen.itemSpacing = 24;
  screen.paddingTop = 32;
  screen.paddingBottom = 60;
  screen.paddingLeft = 40;
  screen.paddingRight = 40;
  screen.fills = solidFill(COLORS.bgBase);

  // Title Row
  const header = figma.createFrame();
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'AUTO';
  header.resize(1360, 48);
  header.primaryAxisAlignItems = 'SPACE_BETWEEN';
  header.counterAxisAlignItems = 'CENTER';
  header.fills = [];
  header.appendChild(createText("Organization Directory — Layer 3 By Manager Hierarchy", 20, 'Bold', COLORS.white));
  header.appendChild(createBadge("INTERACTIVE EXPANDABLE", COLORS.primaryLight, COLORS.primary));
  screen.appendChild(header);

  // Table Container
  const table = figma.createFrame();
  table.name = "Hierarchy Table Container";
  table.layoutMode = 'VERTICAL';
  table.primaryAxisSizingMode = 'AUTO';
  table.counterAxisSizingMode = 'FIXED';
  table.resize(1360, 200);
  table.cornerRadius = 8;
  table.fills = solidFill(COLORS.bgSurface);
  table.strokes = solidFill(COLORS.white, 0.09);
  table.strokeWeight = 1;

  // Header Row
  const th = figma.createFrame();
  th.layoutMode = 'HORIZONTAL';
  th.primaryAxisSizingMode = 'FIXED';
  th.resize(1360, 44);
  th.paddingLeft = 24;
  th.paddingRight = 24;
  th.counterAxisAlignItems = 'CENTER';
  th.fills = solidFill(COLORS.bgBase, 0.5);
  th.strokes = solidFill(COLORS.white, 0.08);
  th.strokeWeight = 1;

  th.appendChild(createTableCell(createText("EMPLOYEE / POSITION", 11, 'Semi Bold', COLORS.textMuted), 400));
  th.appendChild(createTableCell(createText("ROLE & SPRINT CAPACITY", 11, 'Semi Bold', COLORS.textMuted), 300));
  th.appendChild(createTableCell(createText("DEPARTMENT", 11, 'Semi Bold', COLORS.textMuted), 200));
  th.appendChild(createTableCell(createText("STATUS & DIRECT REPORTS", 11, 'Semi Bold', COLORS.textMuted), 300));
  table.appendChild(th);

  // Hierarchy Rows
  const rows = [
    { level: 1, name: "Alex Vance", role: "Engineering Director", dept: "R&D Operations", sub: "3 Team Leads / 14 ICs", status: "Active" },
    { level: 2, name: "↳ Marcus Brody", role: "Frontend Platform Lead", dept: "Frontend Core", sub: "5 Developers", status: "Active" },
    { level: 3, name: "  ↳ Sarah Chen", role: "Senior Design Technologist", dept: "Frontend Core", sub: "UI System & Tokens", status: "Active" },
    { level: 3, name: "  ↳ David Patel", role: "Senior Frontend Engineer", dept: "Frontend Core", sub: "Consoles & Analytics", status: "Active" },
    { level: 2, name: "↳ Elena Rostova", role: "Cloud & Backend Lead", dept: "Infrastructure", sub: "6 Developers", status: "Active" },
    { level: 1, name: "Claire Dupont", role: "VP of Quality Assurance", dept: "QA & Compliance", sub: "2 Team Leads / 8 ICs", status: "Active" }
  ];

  rows.forEach((r, idx) => {
    const tr = figma.createFrame();
    tr.layoutMode = 'HORIZONTAL';
    tr.primaryAxisSizingMode = 'FIXED';
    tr.resize(1360, 48);
    tr.paddingLeft = 24 + (r.level - 1) * 20;
    tr.paddingRight = 24;
    tr.counterAxisAlignItems = 'CENTER';
    tr.fills = idx % 2 === 0 ? solidFill(COLORS.white, 0.015) : solidFill(COLORS.white, 0.035);
    tr.strokes = solidFill(COLORS.white, 0.04);
    tr.strokeWeight = 1;

    const tName = createText(r.name, 13, r.level === 1 ? 'Bold' : (r.level === 2 ? 'Semi Bold' : 'Regular'), r.level === 1 ? COLORS.white : COLORS.textMain);
    const tRole = createText(r.role, 12, 'Regular', COLORS.textMuted);
    const tDept = createText(r.dept, 12, 'Regular', COLORS.textMuted);
    const tSub = createBadge(r.sub, r.level === 1 ? COLORS.emerald : COLORS.primaryLight, r.level === 1 ? COLORS.emerald : COLORS.primary);

    tr.appendChild(createTableCell(tName, 400 - (r.level - 1) * 20));
    tr.appendChild(createTableCell(tRole, 300));
    tr.appendChild(createTableCell(tDept, 200));
    tr.appendChild(createTableCell(tSub, 300));
    table.appendChild(tr);
  });

  screen.appendChild(table);
  return screen;
}

// ─── SCREEN 4: YORK.IE LMS PLATFORM (1440px) ─────────────────────────────────
async function generateLMSPage(startX, startY) {
  const screen = figma.createFrame();
  screen.name = "York.IE LMS Platform (1440px Auto Layout)";
  screen.x = startX;
  screen.y = startY;
  screen.resize(1440, 100);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'AUTO';
  screen.counterAxisSizingMode = 'FIXED';
  screen.itemSpacing = 36;
  screen.paddingTop = 0;
  screen.paddingBottom = 80;
  screen.paddingLeft = 0;
  screen.paddingRight = 0;
  screen.fills = solidFill(COLORS.bgBase);

  // Top Bar
  const nav = figma.createFrame();
  nav.name = "LMS Top Bar (1440px)";
  nav.layoutMode = 'HORIZONTAL';
  nav.primaryAxisSizingMode = 'FIXED';
  nav.counterAxisSizingMode = 'AUTO';
  nav.resize(1440, 68);
  nav.primaryAxisAlignItems = 'SPACE_BETWEEN';
  nav.counterAxisAlignItems = 'CENTER';
  nav.paddingLeft = 60;
  nav.paddingRight = 60;
  nav.fills = solidFill(COLORS.bgSurface);
  nav.strokes = solidFill(COLORS.white, 0.08);
  nav.strokeWeight = 1;

  const brand = figma.createFrame();
  brand.layoutMode = 'HORIZONTAL';
  brand.itemSpacing = 10;
  brand.counterAxisAlignItems = 'CENTER';
  brand.fills = [];
  brand.appendChild(createText("York.IE Academy", 18, 'Bold', COLORS.white));
  brand.appendChild(createBadge("LMS PLATFORM", COLORS.primaryLight, COLORS.primary));
  nav.appendChild(brand);

  const right = figma.createFrame();
  right.layoutMode = 'HORIZONTAL';
  right.itemSpacing = 16;
  right.counterAxisAlignItems = 'CENTER';
  right.fills = [];
  right.appendChild(createText("My Progress: 82%", 12, 'Semi Bold', COLORS.emerald));
  right.appendChild(createButton("Course Catalog", true));
  nav.appendChild(right);
  screen.appendChild(nav);

  // Hero
  const hero = figma.createFrame();
  hero.layoutMode = 'VERTICAL';
  hero.primaryAxisSizingMode = 'AUTO';
  hero.counterAxisSizingMode = 'FIXED';
  hero.resize(1440, 140);
  hero.paddingLeft = 60;
  hero.paddingRight = 60;
  hero.itemSpacing = 12;
  hero.fills = [];
  hero.appendChild(createText("Executive & Technical Learning Pathways", 28, 'Bold', COLORS.white));
  hero.appendChild(createText("Continuous education tracks configured for high-growth portfolio companies.", 14, 'Regular', COLORS.textMuted));
  screen.appendChild(hero);

  // 3 LMS Course Cards
  const grid = figma.createFrame();
  grid.layoutMode = 'HORIZONTAL';
  grid.primaryAxisSizingMode = 'FIXED';
  grid.counterAxisSizingMode = 'AUTO';
  grid.resize(1320, 220);
  grid.paddingLeft = 60;
  grid.paddingRight = 60;
  grid.itemSpacing = 24;
  grid.fills = [];

  const courses = [
    { title: "Leadership & Scaling for Series A", mod: "6 Modules • 18 Lessons", progress: "85% Done", color: COLORS.emerald },
    { title: "Enterprise Microservices Architecture", mod: "12 Modules • 34 Lessons", progress: "62% Done", color: COLORS.primaryLight },
    { title: "Capital Allocation & SaaS Metrics", mod: "8 Modules • 22 Lessons", progress: "40% Done", color: COLORS.primaryLight }
  ];

  courses.forEach(c => {
    const card = figma.createFrame();
    card.layoutMode = 'VERTICAL';
    card.layoutGrow = 1;
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.paddingTop = 24;
    card.paddingBottom = 24;
    card.paddingLeft = 24;
    card.paddingRight = 24;
    card.itemSpacing = 14;
    card.cornerRadius = 10;
    card.fills = solidFill(COLORS.bgSurface);
    card.strokes = solidFill(COLORS.white, 0.08);
    card.strokeWeight = 1;

    card.appendChild(createText(c.title, 16, 'Semi Bold', COLORS.white));
    card.appendChild(createText(c.mod, 12, 'Regular', COLORS.textMuted));
    card.appendChild(createBadge(c.progress, c.color, c.color));
    card.appendChild(createButton("Resume Track", false));
    grid.appendChild(card);
  });
  screen.appendChild(grid);

  return screen;
}

// ─── PLUGIN MESSAGE LISTENER ─────────────────────────────────────────────────
figma.ui.onmessage = async (msg) => {
  try {
    postLog("Loading typography fonts (Inter)...");
    await loadFonts();

    let createdNodes = [];
    const spacingX = 1600; // 1440px width + 160px gap

    if (msg.action === 'GENERATE_ALL') {
      postLog("Creating Landing Page (1440px)...", 'info');
      const s1 = await generateLandingPage(0, 0);
      createdNodes.push(s1);

      postLog("Creating Executive Pro Console (1440px)...", 'info');
      const s2 = await generateConsolePage(spacingX, 0);
      createdNodes.push(s2);

      postLog("Creating Team Hierarchy Table (1440px)...", 'info');
      const s3 = await generateHierarchyPage(spacingX * 2, 0);
      createdNodes.push(s3);

      postLog("Creating York.IE LMS Platform (1440px)...", 'info');
      const s4 = await generateLMSPage(spacingX * 3, 0);
      createdNodes.push(s4);

      figma.viewport.scrollAndZoomIntoView(createdNodes);
      postLog("🎉 All 4 screens generated successfully with Auto Layout!", 'success');
      figma.notify("✅ Pushed all 4 screens (1440px Auto Layout) to canvas!");

    } else if (msg.action === 'GENERATE_LANDING') {
      const s = await generateLandingPage(figma.viewport.center.x - 720, figma.viewport.center.y);
      figma.viewport.scrollAndZoomIntoView([s]);
      postLog("Landing page created!", 'success');
      figma.notify("✅ Landing Page created!");

    } else if (msg.action === 'GENERATE_CONSOLE') {
      const s = await generateConsolePage(figma.viewport.center.x - 720, figma.viewport.center.y);
      figma.viewport.scrollAndZoomIntoView([s]);
      postLog("Executive Console created!", 'success');
      figma.notify("✅ Executive Console created!");

    } else if (msg.action === 'GENERATE_HIERARCHY') {
      const s = await generateHierarchyPage(figma.viewport.center.x - 720, figma.viewport.center.y);
      figma.viewport.scrollAndZoomIntoView([s]);
      postLog("Team Hierarchy Table created!", 'success');
      figma.notify("✅ Hierarchy Table created!");

    } else if (msg.action === 'GENERATE_LMS') {
      const s = await generateLMSPage(figma.viewport.center.x - 720, figma.viewport.center.y);
      figma.viewport.scrollAndZoomIntoView([s]);
      postLog("York LMS Platform created!", 'success');
      figma.notify("✅ York LMS Platform created!");
    }

  } catch (err) {
    postLog("Error: " + err.message, 'error');
    figma.notify("⚠️ Error: " + err.message, { error: true });
    console.error(err);
  }
};
