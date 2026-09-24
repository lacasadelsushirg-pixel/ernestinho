const { test, expect } = require('@playwright/test');
const fs = require('fs');

function observe(page) {
  const state = { consoleErrors: [], pageErrors: [], failedRequests: [], badResponses: [] };
  page.on('pageerror', e => state.pageErrors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') state.consoleErrors.push(m.text()); });
  page.on('requestfailed', r => state.failedRequests.push({ url: r.url(), failure: r.failure()?.errorText || 'unknown' }));
  page.on('response', r => { if (r.status() >= 400) state.badResponses.push({ status: r.status(), url: r.url() }); });
  return state;
}

async function snapshot(page, response, state, name) {
  const data = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    readyState: document.readyState,
    htmlLength: document.documentElement.outerHTML.length,
    bodyHtmlLength: document.body?.innerHTML.length || 0,
    bodyTextLength: document.body?.innerText.trim().length || 0,
    bodyDisplay: document.body ? getComputedStyle(document.body).display : null,
    bodyVisibility: document.body ? getComputedStyle(document.body).visibility : null,
    bodyOpacity: document.body ? getComputedStyle(document.body).opacity : null,
    bodyChildren: document.body?.children.length || 0,
    scripts: [...document.scripts].map(s => ({ src: s.src, type: s.type, async: s.async, defer: s.defer })),
    main: document.querySelector('main') ? {
      htmlLength: document.querySelector('main').innerHTML.length,
      textLength: document.querySelector('main').innerText.trim().length,
      display: getComputedStyle(document.querySelector('main')).display,
      visibility: getComputedStyle(document.querySelector('main')).visibility,
      opacity: getComputedStyle(document.querySelector('main')).opacity
    } : null
  }));
  data.response = response ? { status: response.status(), url: response.url(), contentType: response.headers()['content-type'] } : null;
  data.observed = state;
  fs.mkdirSync('test-results/diagnostics', { recursive: true });
  fs.writeFileSync('test-results/diagnostics/' + name + '.json', JSON.stringify(data, null, 2));
  return data;
}

test('home boot diagnostic', async ({ page }) => {
  const state = observe(page);
  const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const d = await snapshot(page, response, state, 'home-' + test.info().project.name);
  expect(response && response.status()).toBeLessThan(400);
  expect(d.bodyHtmlLength, JSON.stringify(d, null, 2)).toBeGreaterThan(100);
  expect(d.bodyTextLength, JSON.stringify(d, null, 2)).toBeGreaterThan(100);
  expect(d.bodyDisplay).not.toBe('none');
  expect(d.bodyVisibility).not.toBe('hidden');
  expect(d.bodyOpacity).not.toBe('0');
  expect(state.pageErrors, state.pageErrors.join('\n')).toEqual([]);
});

test('homepage has no stray ñ route', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const hrefs = await page.locator('a[href]').evaluateAll(ns => ns.map(n => n.getAttribute('href') || ''));
  expect(hrefs.filter(h => /(?:^|\/)ñ(?:\/|$|\?)/i.test(h))).toEqual([]);
});

test('homepage internal links respond', async ({ page, request }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const origin = new URL(page.url()).origin;
  const hrefs = await page.locator('a[href]').evaluateAll(ns => [...new Set(ns.map(n => n.href))]);
  const internal = hrefs.filter(h => { try { const u = new URL(h); return u.origin === origin && /^https?:$/.test(u.protocol); } catch { return false; } }).slice(0, 80);
  for (const url of internal) {
    const r = await request.get(url);
    expect(r.status(), url).toBeLessThan(400);
  }
});


test('homepage resources load without server failures', async ({ page }) => {
  const bad = [];
  page.on('response', r => {
    const u = r.url();
    if (r.status() >= 400 && !u.startsWith('data:')) bad.push({ status: r.status(), url: u });
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  expect(bad, JSON.stringify(bad, null, 2)).toEqual([]);
});

test('homepage images are not broken', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const broken = await page.locator('img').evaluateAll(imgs => imgs
    .filter(i => i.currentSrc && (!i.complete || i.naturalWidth === 0))
    .map(i => i.currentSrc));
  expect(broken, JSON.stringify(broken, null, 2)).toEqual([]);
});

test('internal homepage destinations render meaningful content', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const origin = new URL(page.url()).origin;
  const urls = await page.locator('a[href]').evaluateAll((nodes, origin) => [...new Set(nodes.map(n => n.href))]
    .filter(h => { try { const u = new URL(h); return u.origin === origin && /^https?:$/.test(u.protocol) && u.pathname !== '/'; } catch { return false; } })
    .slice(0, 15), origin);
  for (const url of urls) {
    const p = await page.context().newPage();
    const errors = [];
    p.on('pageerror', e => errors.push(e.message));
    const response = await p.goto(url, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(250);
    const state = await p.evaluate(() => ({
      text: document.body?.innerText.trim().length || 0,
      html: document.body?.innerHTML.length || 0,
      display: document.body ? getComputedStyle(document.body).display : null,
      visibility: document.body ? getComputedStyle(document.body).visibility : null
    }));
    expect(response && response.status(), url).toBeLessThan(400);
    expect(state.html, url).toBeGreaterThan(50);
    expect(state.display, url).not.toBe('none');
    expect(state.visibility, url).not.toBe('hidden');
    expect(errors, url + '\n' + errors.join('\n')).toEqual([]);
    await p.close();
  }
});


test('critical public sections render on desktop and mobile', async ({ page }) => {
  const routes = ['/guia','/transportes','/hospedaje','/compras','/barrios','/experiencias','/vida-nocturna','/gastronomia','/consejos','/quiero'];
  for (const route of routes) {
    const errors = [];
    const onError = e => errors.push(e.message);
    page.on('pageerror', onError);
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    const state = await page.evaluate(() => ({
      text: document.body?.innerText.trim().length || 0,
      html: document.body?.innerHTML.length || 0,
      root: document.querySelector('#ernestinho-carioca-root')?.innerHTML.length || 0
    }));
    expect(response && response.status(), route).toBeLessThan(400);
    expect(state.html, route).toBeGreaterThan(100);
    expect(state.text, route).toBeGreaterThan(20);
    expect(state.root, route).toBeGreaterThan(20);
    expect(errors, route + '\n' + errors.join('\n')).toEqual([]);
    page.off('pageerror', onError);
  }
});

test('representative deep content routes render', async ({ page }) => {
  const routes = [
    '/barrios/copacabana',
    '/experiencias/full-day-rio',
    '/guia/dinero-en-brasil-reales-tarjetas-y-seguridad',
    '/museos/museu-da-historia-e-da-cultura-afro-brasileira-muhcab'
  ];
  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    expect(response && response.status(), route).toBeLessThan(400);
    expect((await page.locator('body').innerText()).trim().length, route).toBeGreaterThan(50);
  }
});

test('SEO essentials exist on representative routes', async ({ page }) => {
  const routes = ['/', '/barrios/copacabana', '/experiencias/full-day-rio', '/gastronomia'];
  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response && response.status(), route).toBeLessThan(400);
    expect((await page.title()).trim().length, route).toBeGreaterThan(10);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/www\.ernestinhocarioca\.com\.br\//);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index/i);
  }
});


test('homepage category order and language controls match the production contract', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const expected = ['Guía para mi viaje','Transportes','Hospedaje','Fotografía','Compras','Barrios','Eventos','Experiencias','Playas','Vida nocturna','Gastronomía','Atracciones','Familia','Café Río','Consejos'];
  const labels = await page.locator('section button[aria-label]').evaluateAll(nodes => nodes.map(n => n.getAttribute('aria-label')).filter(Boolean));
  let cursor = -1;
  for (const label of expected) {
    const next = labels.indexOf(label, cursor + 1);
    expect(next, 'missing/out-of-order homepage card: ' + label + '\n' + labels.join(' | ')).toBeGreaterThan(cursor);
    cursor = next;
  }
  await expect(page.locator('[aria-label="Idioma / Language"]').last()).toBeVisible();
});

test('language switching changes the homepage without page errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  const lang = page.locator('[aria-label="Idioma / Language"]').last();
  await lang.getByRole('button', { name: /PT/ }).click();
  await expect(page.locator('h1')).toContainText(/Rio não se visita/i);
  await lang.getByRole('button', { name: /EN/ }).click();
  await expect(page.locator('h1')).toContainText(/Rio is not just visited/i);
  await lang.getByRole('button', { name: /ES/ }).click();
  await expect(page.locator('h1')).toContainText(/Río no se visita/i);
  expect(errors, errors.join('\n')).toEqual([]);
});

test('mobile header exposes language and menu without stray event/beach top items', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  await expect(page.locator('[aria-label="Idioma / Language"]').last()).toBeVisible();
  const menu = page.getByRole('button', { name: /Abrir Menú/i });
  await expect(menu).toBeVisible();
  await menu.click();
  const visibleMenu = page.locator('header, body').getByRole('button').filter({ hasText: /EXPERIENCIAS|TRANSPORTES|HOSPEDAJE/ });
  expect(await visibleMenu.count()).toBeGreaterThan(0);
});
