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
