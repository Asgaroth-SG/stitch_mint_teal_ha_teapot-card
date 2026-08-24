var z = Object.defineProperty;
var F = (r, i, e) => i in r ? z(r, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[i] = e;
var s = (r, i, e) => F(r, typeof i != "symbol" ? i + "" : i, e);
const c = {
  name: "Чайник",
  location: "Кухня",
  icon: "mdi:kettle",
  show_modes: !0,
  keep_warm_name: "Поддержание тепла"
}, f = 5, I = {
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
function A(r) {
  const i = String(r).toLowerCase().trim();
  return I[i] || r;
}
const b = `
:host {
  display: block;
  /* Mint Teal System Colors */
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
  border: 1px solid rgba(0, 137, 123, 0.15);
  box-shadow: 0px 2px 8px rgba(0, 137, 123, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: box-shadow 0.3s ease;
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
input[type="range"]::-webkit-slider-thumb { width: 24px; height: 24px; margin-top: -8px; appearance: none; border: 0; border-radius: 50%; background: var(--mt-primary); box-shadow: 0 2px 4px rgb(0 0 0 / 20%); }
input[type="range"]::-moz-range-track { height: 8px; border-radius: 4px; background: var(--mt-surface-dim); }
input[type="range"]::-moz-range-progress { height: 8px; border-radius: 4px; background: var(--mt-primary); }
input[type="range"]::-moz-range-thumb { width: 24px; height: 24px; border: 0; border-radius: 50%; background: var(--mt-primary); box-shadow: 0 2px 4px rgb(0 0 0 / 20%); }

.divider { width: 100%; height: 1px; background: rgba(0, 137, 123, 0.15); }

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
`, H = `
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
function o(r) {
  return String(r ?? "").replace(/[&<>'"]/g, (i) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[i] ?? i);
}
function $(r, i) {
  const e = typeof r == "string" ? r.trim() : "";
  return /^(mdi|hass):[a-z0-9-]+$/i.test(e) ? e : i;
}
function E(r, i) {
  const e = typeof r == "number" ? r : Number(r);
  return Number.isFinite(e) ? e : i;
}
function m(r) {
  return r === null ? "—" : `${Math.round(r)}°C`;
}
function j(r, i) {
  r.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: i } }));
}
class W extends HTMLElement {
  constructor() {
    super();
    s(this, "config", null);
    s(this, "_hass");
    s(this, "root");
    s(this, "_modesExpanded", !1);
    s(this, "boundClick");
    s(this, "boundInput");
    s(this, "boundChange");
    this.root = this.attachShadow({ mode: "open" }), this.boundClick = (e) => this.handleClick(e), this.boundInput = (e) => this.handleInput(e), this.boundChange = (e) => this.handleChange(e);
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
  setConfig(e) {
    if (!e || typeof e.entity != "string" || !e.entity.trim())
      throw new Error("stitch-mint-teal-kettle-card: требуется entity домена water_heater");
    this.config = {
      ...e,
      entity: e.entity.trim(),
      name: e.name ?? c.name,
      location: e.location ?? c.location,
      icon: $(e.icon, c.icon),
      show_modes: e.show_modes ?? c.show_modes,
      keep_warm_name: e.keep_warm_name ?? c.keep_warm_name,
      power_on_mode: e.power_on_mode ?? "on",
      power_off_mode: e.power_off_mode ?? "off"
    }, this.render();
  }
  set hass(e) {
    this._hass = e, this.render();
  }
  getCardSize() {
    return 8;
  }
  async call(e, t = {}) {
    !this._hass || !this.config || await this._hass.callService("water_heater", e, { entity_id: this.config.entity, ...t });
  }
  handleInput(e) {
    const t = e.target;
    if (t.dataset.action !== "temperature") return;
    const a = Number(t.value);
    if (!Number.isFinite(a)) return;
    t.style.setProperty("--progress", `${this.sliderProgress(a, Number(t.min), Number(t.max))}%`);
    const n = this.root.querySelector('[data-role="target-value"]');
    n && (n.textContent = m(a));
  }
  handleChange(e) {
    const t = e.target;
    if (t.dataset.action === "temperature") {
      const a = Number(t.value);
      if (!Number.isFinite(a)) return;
      this.call("set_temperature", { temperature: a });
    }
  }
  handleClick(e) {
    const a = e.target.closest("[data-action]");
    if (!a || !this.config) return;
    const n = a.dataset.action;
    if (n === "toggle-warm")
      this.toggleKeepWarm();
    else if (n === "power") {
      const d = this.currentState() === "off" ? this.config.power_on_mode ?? "on" : this.config.power_off_mode ?? "off";
      this.call("set_operation_mode", { operation_mode: d });
    } else if (n === "toggle-accordion")
      this._modesExpanded = !this._modesExpanded, this.render();
    else if (n === "set-mode") {
      const d = a.dataset.mode;
      d && this.call("set_operation_mode", { operation_mode: d });
    }
  }
  async toggleKeepWarm() {
    var a;
    if (!this._hass || !((a = this.config) != null && a.keep_warm_entity)) return;
    const e = this._hass.states[this.config.keep_warm_entity];
    if (!e) return;
    const t = this.config.keep_warm_entity.split(".")[0];
    t !== "switch" && t !== "input_boolean" || await this._hass.callService(t, e.state === "on" ? "turn_off" : "turn_on", { entity_id: this.config.keep_warm_entity });
  }
  currentState() {
    var e, t;
    return this.config && ((t = (e = this._hass) == null ? void 0 : e.states[this.config.entity]) == null ? void 0 : t.state) || "unknown";
  }
  sliderProgress(e, t, a) {
    return !Number.isFinite(t) || !Number.isFinite(a) || a <= t ? 100 : Math.max(0, Math.min(100, (e - t) / (a - t) * 100));
  }
  snapToStep(e, t, a) {
    if (!Number.isFinite(e) || !Number.isFinite(t) || !Number.isFinite(a) || a <= t) return a;
    const n = t + Math.round((e - t) / f) * f;
    return Math.max(t, Math.min(a, n));
  }
  getModeIcon(e) {
    const t = e.toLowerCase();
    return t.includes("flower") || t.includes("цветоч") ? "mdi:flower" : t.includes("herb") || t.includes("травян") || t.includes("leaf") ? "mdi:leaf" : t.includes("coffee") || t.includes("кофе") ? "mdi:coffee" : t.includes("milk") || t.includes("детск") ? "mdi:baby-bottle-outline" : t.includes("boil") || t.includes("кипяч") ? "mdi:pot-steam" : "mdi:cup-water";
  }
  render() {
    var y, k, _;
    if (!this.config) {
      this.root.innerHTML = `<style>${b}</style><div class="card"><div class="error">Настройте entity чайника.</div></div>`;
      return;
    }
    const e = (y = this._hass) == null ? void 0 : y.states[this.config.entity];
    if (!e) {
      this.root.innerHTML = `<style>${b}</style><div class="card"><div class="error">Entity <code>${o(this.config.entity)}</code> не найдена.</div></div>`;
      return;
    }
    const t = e.attributes ?? {}, a = Number.isFinite(Number(t.current_temperature)) ? Number(t.current_temperature) : null, n = Number.isFinite(Number(t.temperature)) ? Number(t.temperature) : null, d = E(t.min_temp, 30), p = E(t.max_temp, 100), x = this.snapToStep(n ?? p, d, p), S = this.config.keep_warm_entity ? (_ = (k = this._hass) == null ? void 0 : k.states[this.config.keep_warm_entity]) == null ? void 0 : _.state : void 0, h = e.state !== "off" && e.state !== "unavailable", M = this.sliderProgress(x, d, p), L = Array.isArray(t.operation_list) ? t.operation_list : [], T = String(t.operation_mode || ""), v = L.filter((g) => {
      const l = String(g).toLowerCase();
      return l !== "on" && l !== "off";
    });
    let w = "";
    this.config.show_modes !== !1 && v.length > 0 && (w = `
        <div class="divider" aria-hidden="true"></div>
        <section class="modes-section">
          <button class="modes-toggle ${this._modesExpanded ? "open" : ""}" data-action="toggle-accordion" aria-expanded="${this._modesExpanded}">
            <h3>Режимы</h3>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <div class="modes-content ${this._modesExpanded ? "open" : ""}">
            <div class="modes-grid">
              ${v.map((g) => {
      const l = String(g), C = A(l);
      return `
                  <button class="mode-btn ${T === l ? "active" : ""}" data-action="set-mode" data-mode="${o(l)}">
                    <ha-icon icon="${this.getModeIcon(C)}"></ha-icon>
                    <span>${o(C)}</span>
                  </button>
                `;
    }).join("")}
            </div>
          </div>
        </section>
      `);
    const N = this.config.keep_warm_entity ? `
      <div class="divider" aria-hidden="true"></div>
      <button class="warm-row ${S === "on" ? "on" : ""}" data-action="toggle-warm">
        <div class="warm-content">
          <div class="warm-icon-box"><ha-icon icon="mdi:snowflake-thermometer"></ha-icon></div>
          <span class="warm-label">${o(this.config.keep_warm_name)}</span>
        </div>
        <div class="toggle"><div class="toggle-thumb"></div></div>
      </button>
    ` : "";
    this.root.innerHTML = `
      <style>${b}</style>
      <article class="card">
        <header class="header">
          <div class="icon-bubble">
            <ha-icon icon="${$(this.config.icon, c.icon)}"></ha-icon>
          </div>
          <div class="info">
            <h2>${o(this.config.name)}</h2>
            <p class="location">${o(this.config.location)}</p>
          </div>
          <button class="power-badge ${h ? "active" : ""}" data-action="power" role="switch" aria-checked="${h}">
            ${h ? "ВКЛ" : "ВЫКЛ"}
          </button>
        </header>

        <section class="temperatures">
          <div class="temperature">
            <span class="temp-label">Текущая температура</span>
            <span class="temp-current">${m(a)}</span>
          </div>
          <div class="temp-divider" aria-hidden="true"></div>
          <div class="temperature target">
            <span class="temp-label">Целевая температура</span>
            <span class="temp-target" data-role="target-value">${m(n)}</span>
          </div>
        </section>

        <section class="slider-section">
          <div class="slider-labels">
            <span>${m(d)}</span>
            <span>${m(p)}</span>
          </div>
          <input aria-label="Целевая температура" data-action="temperature" type="range" 
                 min="${d}" max="${p}" step="${f}" value="${x}" 
                 style="--progress: ${M}%">
        </section>

        ${w}
        ${N}
      </article>
    `;
  }
}
class P extends HTMLElement {
  constructor() {
    super();
    s(this, "config", {});
    s(this, "root");
    s(this, "boundChange");
    this.root = this.attachShadow({ mode: "open" }), this.boundChange = (e) => this.handleChange(e);
  }
  connectedCallback() {
    this.root.addEventListener("change", this.boundChange), this.render();
  }
  disconnectedCallback() {
    this.root.removeEventListener("change", this.boundChange);
  }
  setConfig(e) {
    this.config = { ...e }, this.render();
  }
  set hass(e) {
  }
  emit(e) {
    this.config = { ...this.config, ...e }, j(this, this.config);
  }
  handleChange(e) {
    const t = e.target, a = t.dataset.key;
    a && this.emit({ [a]: t.type === "checkbox" ? t.checked : t.value });
  }
  render() {
    this.root.innerHTML = `
      <style>${H}</style>
      <div class="form">
        <label>Entity чайника *<input data-key="entity" placeholder="water_heater.kettle" value="${o(this.config.entity ?? "")}"></label>
        <label>Название<input data-key="name" value="${o(this.config.name ?? c.name)}"></label>
        <label>Расположение<input data-key="location" value="${o(this.config.location ?? c.location)}"></label>
        <label>Иконка<input data-key="icon" value="${o(this.config.icon ?? c.icon)}"></label>
        <label class="checkbox">
          <input data-key="show_modes" type="checkbox" ${this.config.show_modes !== !1 ? "checked" : ""}>
          Показывать сетку режимов
        </label>
        <label>Entity поддержания тепла<input data-key="keep_warm_entity" placeholder="switch.kettle_keep_warm" value="${o(this.config.keep_warm_entity ?? "")}"></label>
        <label>Название поддержания тепла<input data-key="keep_warm_name" value="${o(this.config.keep_warm_name ?? c.keep_warm_name)}"></label>
      </div>
    `;
  }
}
customElements.get("stitch-mint-teal-kettle-card") || customElements.define("stitch-mint-teal-kettle-card", W);
customElements.get("stitch-mint-teal-kettle-card-editor") || customElements.define("stitch-mint-teal-kettle-card-editor", P);
const u = window;
u.customCards = u.customCards ?? [];
u.customCards.some((r) => r.type === "custom:stitch-mint-teal-kettle-card") || u.customCards.push({
  type: "custom:stitch-mint-teal-kettle-card",
  name: "Mint Teal — Чайник",
  description: "Карточка управления чайником water_heater в новом стиле Lumina Home.",
  preview: !0
});