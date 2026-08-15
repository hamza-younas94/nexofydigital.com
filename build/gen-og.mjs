// Generate per-page Open Graph images (1200x630 PNG) for the service pages + hub.
// Renders a branded HTML card via headless Chrome (CDP) using the self-hosted fonts.
// Usage: node build/gen-og.mjs   (Chrome must be running with --remote-debugging-port=9222)
import { writeFileSync, mkdtempSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = resolve(ROOT, 'fonts');

const CARDS = [
  ['og-web-application-development', 'Custom Web Application Development', 'Dashboards, portals & internal tools — built to scale'],
  ['og-android-app-development', 'Android App Development', 'Native Kotlin & cross-platform apps that ship'],
  ['og-crm-cms-development', 'CRM & CMS Development', 'Sales, customers & content, shaped around your team'],
  ['og-epos-system', 'ePOS & Point of Sale System', 'Live inventory, split payments, real reporting'],
  ['og-restaurant-management-system', 'Restaurant Management System', 'Table → kitchen, menus, staff — one system'],
  ['og-inventory-management-software', 'Inventory Management Software', 'Real-time stock, barcodes, low-stock alerts'],
  ['og-services', 'Everything We Build', 'Web · Android · CRM/CMS · ePOS · Inventory'],
];

const card = (title, sub) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  @font-face { font-family:'Space Grotesk'; font-weight:400 700; src:url('file://${FONTS}/space-grotesk.woff2') format('woff2'); }
  @font-face { font-family:'JetBrains Mono'; font-weight:400 500; src:url('file://${FONTS}/jetbrains-mono.woff2') format('woff2'); }
  * { margin:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; }
  .c { width:1200px; height:630px; background:#0a0b0d; position:relative; overflow:hidden;
       padding:84px 80px; display:flex; flex-direction:column; justify-content:space-between; }
  .grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px); background-size:48px 48px; }
  .glow { position:absolute; top:-160px; left:50%; transform:translateX(-50%); width:900px; height:520px; background:radial-gradient(50% 50% at 50% 50%, rgba(198,242,78,.22), transparent 70%); filter:blur(10px); }
  .row { position:relative; display:flex; align-items:center; gap:16px; }
  .mark { width:52px; height:52px; border-radius:13px; background:#c6f24e; color:#0c0f07; display:grid; place-items:center; font-family:'Space Grotesk'; font-weight:700; font-size:30px; }
  .wm { font-family:'Space Grotesk'; font-weight:700; font-size:27px; color:#e9ebef; }
  .wm span { color:#666e79; font-weight:500; }
  .label { position:relative; font-family:'JetBrains Mono'; font-size:22px; color:#c6f24e; margin-bottom:18px; }
  .title { position:relative; font-family:'Space Grotesk'; font-weight:600; font-size:76px; line-height:1.02; letter-spacing:-2px; color:#e9ebef; max-width:1000px; }
  .sub { position:relative; font-family:'JetBrains Mono'; font-size:25px; color:#9aa2ad; margin-top:24px; }
  .foot { position:relative; font-family:'JetBrains Mono'; font-size:21px; color:#666e79; }
</style></head><body><div class="c">
  <div class="grid"></div><div class="glow"></div>
  <div class="row"><div class="mark">N</div><div class="wm">Nexofy<span>Digital</span></div></div>
  <div>
    <div class="label">Service</div>
    <div class="title">${title}</div>
    <div class="sub">${sub}</div>
  </div>
  <div class="foot">nexofydigital.com</div>
</div></body></html>`;

// --- CDP plumbing ---
const list = await (await fetch('http://127.0.0.1:9222/json')).json();
const ws = new WebSocket(list.find((p) => p.type === 'page').webSocketDebuggerUrl);
let id = 0; const pend = {}; const evt = {};
const send = (m, p) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const once = (m) => new Promise((r) => (evt[m] = r));
ws.onmessage = (e) => { const d = JSON.parse(e.data); if (d.id && pend[d.id]) { pend[d.id](d.result); delete pend[d.id]; } else if (d.method && evt[d.method]) { evt[d.method](d.params); delete evt[d.method]; } };
await new Promise((r) => (ws.onopen = r));
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });

const dir = mkdtempSync(resolve(tmpdir(), 'og-'));
for (const [name, title, sub] of CARDS) {
  const html = card(title, sub);
  const tmp = resolve(dir, name + '.html');
  writeFileSync(tmp, html);
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url: 'file://' + tmp });
  await loaded;
  await new Promise((r) => setTimeout(r, 400)); // let fonts paint
  const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
  writeFileSync(resolve(ROOT, name + '.png'), Buffer.from(shot.data, 'base64'));
  console.log('wrote', name + '.png');
}
ws.close();
