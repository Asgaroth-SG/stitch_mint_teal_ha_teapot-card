var I = Object.defineProperty;
var A = (a, n, t) => n in a ? I(a, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[n] = t;
var s = (a, n, t) => A(a, typeof n != "symbol" ? n + "" : n, t);
const c = {
  name: "Чайник",
  location: "Кухня",
  icon: "mdi:kettle",
  show_modes: !0,
  keep_warm_name: "Поддержание тепла"
}, b = 5, H = {
  boil: "Кипячение",
  warm: "Поддержание",
  white_tea: "Белый чай",
  green_tea: "Зеленый чай",
  red_tea: "Красный чай",
  herbal_tea: "Травяной чай",
  flower_tea: "Цветочный",
  puerh_tea: "Пуэр",
  oolong_tea: "Улун",
  black_tea: "Черный чай",
  coffee: "Кофе",
  milk: "Детское питание"
};
function j(a) {
  const n = String(a).toLowerCase().trim();
  return H[n] || a;
}
const x = `
:host {
  display: block;
  /* Mint Teal System Colors Default */
  --mt-surface: #ecfdf9;
  --mt-surface-dim: #ccdeda;
  --mt-surface-container: #e0f2ee;
  --mt-surface-container-high: #dbece8;
  --mt-surface-container-low: #e6f7f4;
  --mt-surface-variant: #d5e6e3;
  --mt-on-surface: #0f1e1c;
  --mt-on-surface-variant: #3d4946;
  --mt-outline: #6d7a77;
  --mt-outline-variant: #bcc9c5;
  --mt-primary: #00685d;
  --mt-on-primary: #ffffff;
  --mt-tertiary: #4f5f5f;
  --mt-border: rgba(0, 137, 123, 0.15);
  --mt-shadow: 0px 2px 8px rgba(0, 137, 123, 0.08);
  
  font-family: "Work Sans", system-ui, sans-serif;
  color: var(--mt-on-surface);
}
* { box-sizing: border-box; }
.card {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  padding: 16px;
  background: var(--mt-surface);
  border-radius: 16px;
  border: 1px solid var(--mt-border);
  box-shadow: var(--mt-shadow);
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: box-shadow 0.3s ease;
  backdrop-filter: blur(8px);
}
.card:hover {
  box-shadow: 0px 8px 16px rgba(0, 137, 123, 0.12);
}

/* Header Row */
.header { display: flex; align-items: center; gap: 16px; min-width: 0; }
.icon-bubble { 
  display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; 
  width: 48px; height: 48px; border-radius: 50%; 
  background: var(--mt-surface-variant); color: var(--mt-primary); transition: background .3s;
}
.icon-bubble ha-icon { --mdc-icon-size: 24px; }
.info { min-width: 0; flex: 1; }
h2, p { margin: 0; }
h2 { font: 600 16px/24px "Manrope", system-ui, sans-serif; color: var(--mt-on-surface); letter-spacing: -0.01em; }
.location { font-size: 11px; font-weight: 500; line-height: 14px; color: var(--mt-outline); margin-top: 2px; }
.power-badge { 
  flex: 0 0 auto; padding: 4px 12px; border: 0; border-radius: 999px; cursor: pointer;
  font: 500 11px/16px "Work Sans", sans-serif; 
  color: var(--mt-on-surface-variant); background: var(--mt-surface-container-high); 
  transition: all 0.2s ease;
}
.power-badge.active { color: var(--mt-on-primary); background: var(--mt-primary); }
.power-badge:active { transform: scale(0.95); }

/* Temperatures */
.temperatures { 
  display: flex; justify-content: space-between; align-items: center; 
  padding: 8px 16px; border-radius: 8px; background: var(--mt-surface-container); 
}
.temperature { display: flex; flex-direction: column; gap: 2px; }
.temperature.target { align-items: flex-end; text-align: right; }
.temp-label { font-size: 11px; font-weight: 500; color: var(--mt-outline); }
.temp-current { font: 600 20px/28px "Manrope", sans-serif; color: var(--mt-primary); letter-spacing: -0.01em; }
.temp-target { font: 600 16px/24px "Manrope", sans-serif; color: var(--mt-on-surface); }
.temp-divider { width: 1px; height: 40px; background: var(--mt-outline-variant); opacity: 0.5; }

/* Slider */
.slider-section { display: flex; flex-direction: column; gap: 8px; padding: 0 8px; }
.slider-labels { display: flex; justify-content: space-between; font-size: 11px; font-weight: 500; color: var(--mt-outline); }
input[type="range"] { width: 100%; height: 24px; margin: 0; appearance: none; background: transparent; cursor: pointer; }
input[type="range"]::-webkit-slider-runnable-track { height: 8px; border-radius: 4px; background: linear-gradient(to right, var(--mt-primary) var(--progress, 100%), var(--mt-surface-dim) var(--progress, 100%)); }
input[type="range"]::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; margin-top: -4px; border-radius: 50%; background: var(--mt-primary); box-shadow: 0 2px 4px rgb(0 0 0 / 20%); border: 0; cursor: pointer; }
input[type="range"]::-moz-range-track { height: 8px; border-radius: 4px; background: var(--mt-surface-dim); }
input[type="range"]::-moz-range-progress { height: 8px; border-radius: 4px; background: var(--mt-primary); }
input[type="range"]::-moz-range-thumb { appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--mt-primary); box-shadow: 0 2px 4px rgb(0 0 0 / 20%); border: 0; cursor: pointer; }

.divider { width: 100%; height: 1px; background: var(--mt-border); }

/* Modes Accordion */
.modes-section { display: flex; flex-direction: column; }
.modes-toggle {
  width: 100%; padding: 8px 0; border: 0; background: transparent; color: var(--mt-on-surface-variant);
  display: flex; justify-content: space-between; align-items: center; cursor: pointer; border-radius: 8px;
  transition: background 0.2s;
}
.modes-toggle:hover { background: var(--mt-surface-container-low); padding: 8px; margin: 0 -8px; width: calc(100% + 16px); }
.modes-toggle h3 { font: 600 13px/18px "Work Sans", sans-serif; margin: 0; }
.modes-toggle ha-icon { transition: transform 0.3s ease; }
.modes-toggle.open ha-icon { transform: rotate(180deg); }
.modes-content { overflow: hidden; max-height: 0; transition: max-height 0.3s ease-in-out; }
.modes-content.open { max-height: 500px; }
.modes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding-top: 8px; }
.mode-btn {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  padding: 8px 4px; border: 0; border-radius: 12px; cursor: pointer;
  background: var(--mt-surface-variant); color: var(--mt-on-surface-variant);
  transition: all 0.2s ease;
}
.mode-btn:hover { background: var(--mt-surface-container-high); }
.mode-btn:active { transform: scale(0.95); }
.mode-btn.active { background: var(--mt-primary); color: var(--mt-on-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.mode-btn ha-icon { --mdc-icon-size: 20px; }
.mode-btn span { font-size: 9px; font-weight: 500; line-height: 1.2; text-align: center; }

/* Keep Warm */
.warm-row { 
  width: 100%; padding: 12px; display: flex; align-items: center; justify-content: space-between; 
  border: 0; border-radius: 12px; cursor: pointer; background: var(--mt-surface-container); 
  transition: background 0.2s ease;
}
.warm-row:hover { background: var(--mt-surface-container-high); }
.warm-row:active { transform: scale(0.98); }
.warm-content { display: flex; align-items: center; gap: 12px; }
.warm-icon-box { 
  width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  background: var(--mt-surface-variant); color: var(--mt-on-surface-variant);
}
.warm-icon-box ha-icon { --mdc-icon-size: 16px; }
.warm-label { font: 400 13px/20px "Work Sans", sans-serif; color: var(--mt-on-surface); }
.toggle { 
  width: 48px; height: 24px; padding: 4px; display: flex; align-items: center; 
  border-radius: 999px; background: var(--mt-surface-dim); transition: background .2s ease; 
}
.toggle-thumb { 
  width: 16px; height: 16px; border-radius: 50%; background: var(--mt-outline); 
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%); transition: transform .2s ease, background .2s ease; 
}
.warm-row.on .toggle { background: var(--mt-primary); }
.warm-row.on .toggle-thumb { background: var(--mt-on-primary); transform: translateX(24px); }

button:focus-visible, input:focus-visible { outline: 2px solid var(--mt-primary); outline-offset: 2px; }
.error { padding: 12px; border-radius: 10px; color: #ba1a1a; background: #ffdad6; font-size: 13px; }
`, W = `
:host { display: block; font-family: var(--paper-font-body1_-_font-family, sans-serif); color: var(--primary-text-color, #0f1e1c); }
* { box-sizing: border-box; }
.form { display: grid; gap: 14px; padding: 4px 0; }
label { display: grid; gap: 6px; font-size: 13px; }
input, select { width: 100%; min-height: 40px; padding: 8px 10px; color: inherit; background: var(--card-background-color, #ecfdf9); border: 1px solid var(--divider-color, #bcc9c5); border-radius: 8px; font: inherit; }
input:focus, select:focus { outline: 2px solid var(--primary-color, #00685d); outline-offset: 1px; }
.checkbox { display: flex; grid-template-columns: none; align-items: center; gap: 8px; }
.checkbox input { width: 18px; min-height: 18px; }
.help { color: var(--secondary-text-color, #6d7a77); font-size: 12px; line-height: 16px; }
`;
function i(a) {
  return String(a ?? "").replace(/[&<>'"]/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[n] ?? n);
}
function S(a, n) {
  const t = typeof a == "string" ? a.trim() : "";
  return /^(mdi|hass):[a-z0-9-]+$/i.test(t) ? t : n;
}
function M(a, n) {
  const t = typeof a == "number" ? a : Number(a);
  return Number.isFinite(t) ? t : n;
}
function m(a) {
  return a === null ? "—" : `${Math.round(a)}°C`;
}
function P(a, n) {
  a.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: n } }));
}
class K extends HTMLElement {
  constructor() {
    super();
    s(this, "config", null);
    s(this, "_hass");
    s(this, "root");
    s(this, "_modesExpanded", !1);
    s(this, "boundClick");
    s(this, "boundInput");
    s(this, "boundChange");
    this.root = this.attachShadow({ mode: "open" }), this.boundClick = (t) => this.handleClick(t), this.boundInput = (t) => this.handleInput(t), this.boundChange = (t) => this.handleChange(t);
  }
  static getStubConfig() {
    return { type: "custom:stitch-mint-teal-kettle-card", entity: "water_heater.kettle" };
  }
  static getConfigElement() {
    return document.createElement("stitch-mint-teal-kettle-card-editor");
  }
  connectedCallback() {
    this.root.addEventListener("click", this.boundClick), this.root.addEventListener("input", this.boundInput), this.root.addEventListener("change", this.boundChange), this.render();
  }
  disconnectedCallback() {
    this.root.removeEventListener("click", this.boundClick), this.root.removeEventListener("input", this.boundInput), this.root.removeEventListener("change", this.boundChange);
  }
  setConfig(t) {
    if (!t || typeof t.entity != "string" || !t.entity.trim())
      throw new Error("stitch-mint-teal-kettle-card: требуется entity домена water_heater");
    this.config = {
      ...t,
      entity: t.entity.trim(),
      name: t.name ?? c.name,
      location: t.location ?? c.location,
      icon: S(t.icon, c.icon),
      show_modes: t.show_modes ?? c.show_modes,
      keep_warm_name: t.keep_warm_name ?? c.keep_warm_name,
      power_on_mode: t.power_on_mode ?? "on",
      power_off_mode: t.power_off_mode ?? "off",
      theme: t.theme || {}
    }, this.render();
  }
  set hass(t) {
    this._hass = t, this.render();
  }
  getCardSize() {
    return 8;
  }
  async call(t, e = {}) {
    !this._hass || !this.config || await this._hass.callService("water_heater", t, { entity_id: this.config.entity, ...e });
  }
  handleInput(t) {
    const e = t.target;
    if (e.dataset.action !== "temperature") return;
    const r = Number(e.value);
    if (!Number.isFinite(r)) return;
    e.style.setProperty("--progress", `${this.sliderProgress(r, Number(e.min), Number(e.max))}%`);
    const o = this.root.querySelector('[data-role="target-value"]');
    o && (o.textContent = m(r));
  }
  handleChange(t) {
    const e = t.target;
    if (e.dataset.action === "temperature") {
      const r = Number(e.value);
      if (!Number.isFinite(r)) return;
      this.call("set_temperature", { temperature: r });
    }
  }
  handleClick(t) {
    const r = t.target.closest("[data-action]");
    if (!r || !this.config) return;
    const o = r.dataset.action;
    if (o === "toggle-warm")
      this.toggleKeepWarm();
    else if (o === "power") {
      const d = this.currentState() === "off" ? this.config.power_on_mode ?? "on" : this.config.power_off_mode ?? "off";
      this.call("set_operation_mode", { operation_mode: d });
    } else if (o === "toggle-accordion")
      this._modesExpanded = !this._modesExpanded, this.render();
    else if (o === "set-mode") {
      const d = r.dataset.mode;
      d && this.call("set_operation_mode", { operation_mode: d });
    }
  }
  async toggleKeepWarm() {
    var r;
    if (!this._hass || !((r = this.config) != null && r.keep_warm_entity)) return;
    const t = this._hass.states[this.config.keep_warm_entity];
    if (!t) return;
    const e = this.config.keep_warm_entity.split(".")[0];
    e !== "switch" && e !== "input_boolean" || await this._hass.callService(e, t.state === "on" ? "turn_off" : "turn_on", { entity_id: this.config.keep_warm_entity });
  }
  currentState() {
    var t, e;
    return this.config && ((e = (t = this._hass) == null ? void 0 : t.states[this.config.entity]) == null ? void 0 : e.state) || "unknown";
  }
  sliderProgress(t, e, r) {
    return !Number.isFinite(e) || !Number.isFinite(r) || r <= e ? 100 : Math.max(0, Math.min(100, (t - e) / (r - e) * 100));
  }
  snapToStep(t, e, r) {
    if (!Number.isFinite(t) || !Number.isFinite(e) || !Number.isFinite(r) || r <= e) return r;
    const o = e + Math.round((t - e) / b) * b;
    return Math.max(e, Math.min(r, o));
  }
  getModeIcon(t) {
    const e = t.toLowerCase();
    return e.includes("flower") || e.includes("цветоч") ? "mdi:flower" : e.includes("herb") || e.includes("травян") || e.includes("leaf") ? "mdi:leaf" : e.includes("coffee") || e.includes("кофе") ? "mdi:coffee" : e.includes("milk") || e.includes("детск") ? "mdi:baby-bottle-outline" : e.includes("boil") || e.includes("кипяч") ? "mdi:pot-steam" : "mdi:cup-water";
  }
  render() {
    var _, $, C;
    if (!this.config) {
      this.root.innerHTML = `<style>${x}</style><div class="card"><div class="error">Настройте entity чайника.</div></div>`;
      return;
    }
    const t = (_ = this._hass) == null ? void 0 : _.states[this.config.entity];
    if (!t) {
      this.root.innerHTML = `<style>${x}</style><div class="card"><div class="error">Entity <code>${i(this.config.entity)}</code> не найдена.</div></div>`;
      return;
    }
    const e = this.config.theme || {};
    let r = "";
    e.background && (r += `--mt-surface: ${i(e.background)}; `), e.surface && (r += `--mt-surface-container: ${i(e.surface)}; --mt-surface-variant: ${i(e.surface)}; --mt-surface-dim: ${i(e.surface)}; --mt-surface-container-high: ${i(e.surface)}; `), e.primary && (r += `--mt-primary: ${i(e.primary)}; `), e.text && (r += `--mt-on-surface: ${i(e.text)}; `), e.secondary && (r += `--mt-on-surface-variant: ${i(e.secondary)}; --mt-outline: ${i(e.secondary)}; --mt-tertiary: ${i(e.secondary)}; `), e.on_primary && (r += `--mt-on-primary: ${i(e.on_primary)}; `), e.border && (r += `--mt-border: ${i(e.border)}; `), e.shadow && (r += `--mt-shadow: ${i(e.shadow)}; `);
    const o = t.attributes ?? {}, d = Number.isFinite(Number(o.current_temperature)) ? Number(o.current_temperature) : null, v = Number.isFinite(Number(o.temperature)) ? Number(o.temperature) : null, u = M(o.min_temp, 30), p = M(o.max_temp, 100), w = this.snapToStep(v ?? p, u, p), L = this.config.keep_warm_entity ? (C = ($ = this._hass) == null ? void 0 : $.states[this.config.keep_warm_entity]) == null ? void 0 : C.state : void 0, g = t.state !== "off" && t.state !== "unavailable", T = this.sliderProgress(w, u, p), N = Array.isArray(o.operation_list) ? o.operation_list : [], z = String(o.operation_mode || ""), y = N.filter((f) => {
      const l = String(f).toLowerCase();
      return l !== "on" && l !== "off";
    });
    let k = "";
    this.config.show_modes !== !1 && y.length > 0 && (k = `
        <div class="divider" aria-hidden="true"></div>
        <section class="modes-section">
          <button class="modes-toggle ${this._modesExpanded ? "open" : ""}" data-action="toggle-accordion" aria-expanded="${this._modesExpanded}">
            <h3>Режимы</h3>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <div class="modes-content ${this._modesExpanded ? "open" : ""}">
            <div class="modes-grid">
              ${y.map((f) => {
      const l = String(f), E = j(l);
      return `
                  <button class="mode-btn ${z === l ? "active" : ""}" data-action="set-mode" data-mode="${i(l)}">
                    <ha-icon icon="${this.getModeIcon(E)}"></ha-icon>
                    <span>${i(E)}</span>
                  </button>
                `;
    }).join("")}
            </div>
          </div>
        </section>
      `);
    const F = this.config.keep_warm_entity ? `
      <div class="divider" aria-hidden="true"></div>
      <button class="warm-row ${L === "on" ? "on" : ""}" data-action="toggle-warm">
        <div class="warm-content">
          <div class="warm-icon-box"><ha-icon icon="mdi:snowflake-thermometer"></ha-icon></div>
          <span class="warm-label">${i(this.config.keep_warm_name)}</span>
        </div>
        <div class="toggle"><div class="toggle-thumb"></div></div>
      </button>
    ` : "";
    this.root.innerHTML = `
      <style>${x}</style>
      <article class="card" style="${r}">
        <header class="header">
          <div class="icon-bubble">
            <ha-icon icon="${S(this.config.icon, c.icon)}"></ha-icon>
          </div>
          <div class="info">
            <h2>${i(this.config.name)}</h2>
            <p class="location">${i(this.config.location)}</p>
          </div>
          <button class="power-badge ${g ? "active" : ""}" data-action="power" role="switch" aria-checked="${g}">
            ${g ? "ВКЛ" : "ВЫКЛ"}
          </button>
        </header>

        <section class="temperatures">
          <div class="temperature">
            <span class="temp-label">Текущая температура</span>
            <span class="temp-current">${m(d)}</span>
          </div>
          <div class="temp-divider" aria-hidden="true"></div>
          <div class="temperature target">
            <span class="temp-label">Целевая температура</span>
            <span class="temp-target" data-role="target-value">${m(v)}</span>
          </div>
        </section>

        <section class="slider-section">
          <div class="slider-labels">
            <span>${m(u)}</span>
            <span>${m(p)}</span>
          </div>
          <input aria-label="Целевая температура" data-action="temperature" type="range" 
                 min="${u}" max="${p}" step="${b}" value="${w}" 
                 style="--progress: ${T}%">
        </section>

        ${k}
        ${F}
      </article>
    `;
  }
}
class R extends HTMLElement {
  constructor() {
    super();
    s(this, "config", {});
    s(this, "root");
    s(this, "boundChange");
    this.root = this.attachShadow({ mode: "open" }), this.boundChange = (t) => this.handleChange(t);
  }
  connectedCallback() {
    this.root.addEventListener("change", this.boundChange), this.render();
  }
  disconnectedCallback() {
    this.root.removeEventListener("change", this.boundChange);
  }
  setConfig(t) {
    this.config = { ...t }, this.render();
  }
  set hass(t) {
  }
  emit(t) {
    this.config = { ...this.config, ...t }, P(this, this.config);
  }
  handleChange(t) {
    const e = t.target, r = e.dataset.key;
    r && this.emit({ [r]: e.type === "checkbox" ? e.checked : e.value });
  }
  render() {
    this.root.innerHTML = `
      <style>${W}</style>
      <div class="form">
        <label>Entity чайника *<input data-key="entity" placeholder="water_heater.kettle" value="${i(this.config.entity ?? "")}"></label>
        <label>Название<input data-key="name" value="${i(this.config.name ?? c.name)}"></label>
        <label>Расположение<input data-key="location" value="${i(this.config.location ?? c.location)}"></label>
        <label>Иконка<input data-key="icon" value="${i(this.config.icon ?? c.icon)}"></label>
        <label class="checkbox">
          <input data-key="show_modes" type="checkbox" ${this.config.show_modes !== !1 ? "checked" : ""}>
          Показывать сетку режимов
        </label>
        <label>Entity поддержания тепла<input data-key="keep_warm_entity" placeholder="switch.kettle_keep_warm" value="${i(this.config.keep_warm_entity ?? "")}"></label>
        <label>Название поддержания тепла<input data-key="keep_warm_name" value="${i(this.config.keep_warm_name ?? c.keep_warm_name)}"></label>
      </div>
    `;
  }
}
customElements.get("stitch-mint-teal-kettle-card") || customElements.define("stitch-mint-teal-kettle-card", K);
customElements.get("stitch-mint-teal-kettle-card-editor") || customElements.define("stitch-mint-teal-kettle-card-editor", R);
const h = window;
h.customCards = h.customCards ?? [];
h.customCards.some((a) => a.type === "custom:stitch-mint-teal-kettle-card") || h.customCards.push({
  type: "custom:stitch-mint-teal-kettle-card",
  name: "Mint Teal — Чайник",
  description: "Карточка управления чайником water_heater в новом стиле Lumina Home.",
  preview: !0
});
