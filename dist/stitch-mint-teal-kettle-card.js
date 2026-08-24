var z = Object.defineProperty;
var N = (a, i, e) => i in a ? z(a, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[i] = e;
var s = (a, i, e) => N(a, typeof i != "symbol" ? i + "" : i, e);
const l = {
  name: "Чайник",
  location: "Кухня",
  icon: "mdi:kettle-steam",
  show_modes: !0,
  keep_warm_name: "Поддержание тепла"
}, g = 5, b = `
:host {
  display: block;
  color: var(--primary-text-color, #0f1e1c);
  font-family: var(--paper-font-body1_-_font-family, "Work Sans", system-ui, sans-serif);
  --kettle-bg: var(--ha-card-background, var(--card-background-color, #ecfdf9));
  --kettle-surface: var(--primary-background-color, #ecfdf9);
  --kettle-container: var(--secondary-background-color, #e0f2ee);
  --kettle-container-high: var(--ha-card-border-color, #dbece8);
  --kettle-text: var(--primary-text-color, #0f1e1c);
  --kettle-muted: var(--secondary-text-color, #6d7a77);
  --kettle-primary: var(--primary-color, #00685d);
  --kettle-primary-container: var(--light-primary-color, #81f3e5);
  --kettle-outline: var(--divider-color, #bcc9c5);
}
* { box-sizing: border-box; }
.card {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid color-mix(in srgb, var(--kettle-primary) 15%, transparent);
  border-radius: 16px;
  background: var(--kettle-bg);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--kettle-primary) 8%, transparent);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.header { display: flex; align-items: center; gap: 12px; min-width: 0; }
.icon-bubble, .warm-icon { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; border-radius: 50%; color: var(--kettle-muted); background: var(--kettle-container-high); }
.icon-bubble { width: 56px; height: 56px; }
.warm-icon { width: 32px; height: 32px; }
ha-icon { display: inline-flex; align-items: center; justify-content: center; line-height: 0; }
.device-icon { --mdc-icon-size: 30px; }
.small-icon { --mdc-icon-size: 17px; }
.info { min-width: 0; flex: 1; }
h2, h3, p { margin: 0; }
h2 { font: 600 20px/28px "Manrope", system-ui, sans-serif; color: var(--kettle-text); }
.location { margin-top: 1px; font-size: 12px; line-height: 16px; color: var(--kettle-muted); }
.power-toggle { flex: 0 0 auto; min-width: 92px; padding: 5px 8px 5px 10px; display: inline-flex; align-items: center; justify-content: space-between; gap: 7px; border: 0; border-radius: 999px; color: var(--kettle-muted); background: var(--kettle-container-high); cursor: pointer; font-size: 12px; line-height: 16px; text-align: left; vertical-align: middle; }
.power-toggle.on { color: var(--kettle-primary); background: var(--kettle-primary-container); }
.power-toggle-label { white-space: nowrap; }
.power-track { width: 34px; height: 20px; padding: 3px; display: inline-flex; align-items: center; flex: 0 0 auto; border-radius: 999px; background: var(--kettle-outline); transition: background .15s ease; }
.power-thumb { width: 14px; height: 14px; border-radius: 50%; background: var(--kettle-muted); box-shadow: 0 1px 3px rgb(0 0 0 / 20%); transition: transform .15s ease, background .15s ease; }
.power-toggle.on .power-track { background: var(--kettle-primary); }
.power-toggle.on .power-thumb { background: #fff; transform: translateX(14px); }
.temperatures { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 16px; border-radius: 8px; background: var(--kettle-container); }
.temperature { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.temperature.target { align-items: flex-end; text-align: right; }
.label { color: var(--kettle-muted); font-size: 12px; line-height: 16px; }
.value { color: var(--kettle-text); font: 600 20px/28px "Manrope", system-ui, sans-serif; }
.value.current { color: var(--kettle-primary); }
.temperature-divider { width: 1px; height: 40px; background: var(--kettle-outline); opacity: .55; }
.slider-section { display: flex; flex-direction: column; gap: 8px; padding: 0 8px; }
.slider-labels { display: flex; justify-content: space-between; color: var(--kettle-muted); font-size: 12px; line-height: 16px; }
input[type="range"] { width: 100%; height: 24px; margin: 0; appearance: none; background: transparent; cursor: pointer; }
input[type="range"]::-webkit-slider-runnable-track { height: 8px; border-radius: 999px; background: linear-gradient(to right, var(--kettle-primary) var(--progress, 100%), var(--kettle-outline) var(--progress, 100%)); transition: background .12s ease; }
input[type="range"]::-moz-range-track { height: 8px; border-radius: 999px; background: var(--kettle-outline); }
input[type="range"]::-moz-range-progress { height: 8px; border-radius: 999px; background: var(--kettle-primary); }
input[type="range"]::-webkit-slider-thumb { width: 24px; height: 24px; margin-top: -8px; appearance: none; border: 0; border-radius: 50%; background: var(--kettle-primary); box-shadow: 0 2px 4px rgb(0 0 0 / 20%); }
input[type="range"]::-moz-range-thumb { width: 24px; height: 24px; border: 0; border-radius: 50%; background: var(--kettle-primary); box-shadow: 0 2px 4px rgb(0 0 0 / 20%); }
.divider { width: 100%; height: 1px; background: color-mix(in srgb, var(--kettle-primary) 15%, transparent); }

/* Новые стили для классического выпадающего списка */
.mode-selector-wrapper { position: relative; width: 100%; }
.mode-selector { width: 100%; padding: 12px 36px 12px 12px; border: 0; border-radius: 12px; color: var(--kettle-text); background: var(--kettle-container); font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; appearance: none; transition: background .15s ease; }
.mode-selector:hover { background: color-mix(in srgb, var(--kettle-container) 80%, var(--kettle-primary) 20%); }
.mode-selector:focus-visible { outline: 2px solid var(--kettle-primary); outline-offset: 2px; }
.mode-selector-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--kettle-muted); --mdc-icon-size: 24px; }

button { font: inherit; }
.warm-row { border: 0; cursor: pointer; }
.warm-row:active { transform: scale(.97); }
.warm-row { width: 100%; padding: 12px; display: flex; align-items: center; justify-content: space-between; text-align: left; border-radius: 12px; color: var(--kettle-text); background: var(--kettle-container); }
.warm-content { min-width: 0; display: flex; align-items: center; gap: 12px; }
.warm-label { font-size: 14px; line-height: 20px; }
.toggle { width: 48px; height: 24px; padding: 4px; display: flex; align-items: center; border-radius: 999px; background: var(--kettle-outline); transition: background .15s ease; }
.toggle-thumb { width: 16px; height: 16px; border-radius: 50%; background: var(--kettle-muted); box-shadow: 0 1px 3px rgb(0 0 0 / 20%); transition: transform .15s ease, background .15s ease; }
.toggle.on { background: var(--kettle-primary); }
.toggle.on .toggle-thumb { background: #fff; transform: translateX(24px); }
button:focus-visible, input:focus-visible { outline: 2px solid var(--kettle-primary); outline-offset: 2px; }
.error { padding: 12px; border-radius: 10px; color: var(--error-color, #ba1a1a); background: var(--error-background-color, #ffdad6); font-size: 13px; }
@media (max-width: 340px) { .card { padding: 12px; gap: 16px; } }
`, F = `
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
function n(a) {
  return String(a ?? "").replace(/[&<>'"]/g, (i) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[i] ?? i);
}
function $(a, i) {
  const e = typeof a == "string" ? a.trim() : "";
  return /^(mdi|hass):[a-z0-9-]+$/i.test(e) ? e : i;
}
function C(a, i) {
  const e = typeof a == "number" ? a : Number(a);
  return Number.isFinite(e) ? e : i;
}
function p(a) {
  return a === null ? "—" : `${Math.round(a)}°C`;
}
function I(a, i) {
  a.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: i } }));
}
class H extends HTMLElement {
  constructor() {
    super();
    s(this, "config", null);
    s(this, "_hass");
    s(this, "root");
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
      name: e.name ?? l.name,
      location: e.location ?? l.location,
      icon: $(e.icon, l.icon),
      show_modes: e.show_modes ?? l.show_modes,
      keep_warm_name: e.keep_warm_name ?? l.keep_warm_name,
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
    const r = Number(t.value);
    if (!Number.isFinite(r)) return;
    t.style.setProperty("--progress", `${this.sliderProgress(r, Number(t.min), Number(t.max))}%`);
    const o = this.root.querySelector('[data-role="target-value"]');
    o && (o.textContent = p(r));
  }
  handleChange(e) {
    const t = e.target;
    if (t.dataset.action === "temperature") {
      const r = Number(t.value);
      if (!Number.isFinite(r)) return;
      this.call("set_temperature", { temperature: r });
    } else if (t.dataset.action === "select-mode") {
      const r = t.value;
      r && this.call("set_operation_mode", { operation_mode: r });
    }
  }
  handleClick(e) {
    const r = e.target.closest("[data-action]");
    if (!r || !this.config) return;
    const o = r.dataset.action;
    if (o === "toggle")
      this.toggleKeepWarm();
    else if (o === "power") {
      const c = this.currentState() === "off" ? this.config.power_on_mode ?? "on" : this.config.power_off_mode ?? "off";
      this.call("set_operation_mode", { operation_mode: c });
    }
  }
  async toggleKeepWarm() {
    var r;
    if (!this._hass || !((r = this.config) != null && r.keep_warm_entity)) return;
    const e = this._hass.states[this.config.keep_warm_entity];
    if (!e) return;
    const t = this.config.keep_warm_entity.split(".")[0];
    t !== "switch" && t !== "input_boolean" || await this._hass.callService(t, e.state === "on" ? "turn_off" : "turn_on", { entity_id: this.config.keep_warm_entity });
  }
  currentState() {
    var e, t;
    return this.config && ((t = (e = this._hass) == null ? void 0 : e.states[this.config.entity]) == null ? void 0 : t.state) || "unknown";
  }
  sliderProgress(e, t, r) {
    return !Number.isFinite(t) || !Number.isFinite(r) || r <= t ? 100 : Math.max(0, Math.min(100, (e - t) / (r - t) * 100));
  }
  snapToStep(e, t, r) {
    if (!Number.isFinite(e) || !Number.isFinite(t) || !Number.isFinite(r) || r <= t) return r;
    const o = t + Math.round((e - t) / g) * g;
    return Math.max(t, Math.min(r, o));
  }
  render() {
    var w, y, _;
    if (!this.config) {
      this.root.innerHTML = `<style>${b}</style><div class="card"><div class="error">Настройте entity чайника в редакторе карточки.</div></div>`;
      return;
    }
    const e = (w = this._hass) == null ? void 0 : w.states[this.config.entity];
    if (!e) {
      this.root.innerHTML = `<style>${b}</style><div class="card"><div class="error">Entity <code>${n(this.config.entity)}</code> не найдена.</div></div>`;
      return;
    }
    const t = e.attributes ?? {}, r = Number.isFinite(Number(t.current_temperature)) ? Number(t.current_temperature) : null, o = Number.isFinite(Number(t.temperature)) ? Number(t.temperature) : null, c = C(t.min_temp, 30), d = C(t.max_temp, 100), f = this.snapToStep(o ?? d, c, d), E = this.config.keep_warm_entity ? (_ = (y = this._hass) == null ? void 0 : y.states[this.config.keep_warm_entity]) == null ? void 0 : _.state : void 0, h = e.state !== "off" && e.state !== "unavailable", M = h ? "Включен" : "Выключен", S = this.config.keep_warm_entity ? `<button class="warm-row" data-action="toggle" aria-label="${n(this.config.keep_warm_name)}"><span class="warm-content"><span class="warm-icon"><ha-icon class="small-icon" icon="mdi:snowflake-thermometer"></ha-icon></span><span class="warm-label">${n(this.config.keep_warm_name)}</span></span><span class="toggle ${E === "on" ? "on" : ""}" aria-hidden="true"><span class="toggle-thumb"></span></span></button>` : "", T = this.sliderProgress(f, c, d), x = Array.isArray(t.operation_list) ? t.operation_list : [], k = String(t.operation_mode || "");
    let v = "";
    this.config.show_modes !== !1 && x.length > 0 && (v = `
        <div class="divider" aria-hidden="true"></div>
        <div class="mode-selector-wrapper">
          <select class="mode-selector" data-action="select-mode" aria-label="Режим нагрева">
            <option value="" disabled ${k ? "" : "selected"}>Выберите режим...</option>
            ${x.map((L) => {
      const m = String(L);
      return `<option value="${n(m)}" ${k === m ? "selected" : ""}>${n(m)}</option>`;
    }).join("")}
          </select>
          <ha-icon class="mode-selector-icon" icon="mdi:chevron-down"></ha-icon>
        </div>
      `), this.root.innerHTML = `<style>${b}</style><article class="card"><header class="header"><span class="icon-bubble"><ha-icon class="device-icon" icon="${$(this.config.icon, l.icon)}"></ha-icon></span><div class="info"><h2>${n(this.config.name)}</h2><p class="location">${n(this.config.location)}</p></div><button class="power-toggle ${h ? "on" : ""}" data-action="power" role="switch" aria-checked="${h}" aria-label="${h ? "Выключить" : "Включить"} чайник"><span class="power-toggle-label">${M}</span><span class="power-track" aria-hidden="true"><span class="power-thumb"></span></span></button></header><section class="temperatures"><div class="temperature"><span class="label">Текущая температура</span><strong class="value current">${p(r)}</strong></div><span class="temperature-divider" aria-hidden="true"></span><div class="temperature target"><span class="label">Целевая температура</span><strong class="value" data-role="target-value">${p(o)}</strong></div></section><section class="slider-section"><div class="slider-labels"><span>${p(c)}</span><span>${p(d)}</span></div><input aria-label="Целевая температура" data-action="temperature" type="range" min="${c}" max="${d}" step="${g}" value="${f}" style="--progress: ${T}%"></section>${v}${this.config.keep_warm_entity ? `<div class="divider" aria-hidden="true"></div>${S}` : ""}</article>`;
  }
}
class j extends HTMLElement {
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
    this.config = { ...this.config, ...e }, I(this, this.config);
  }
  handleChange(e) {
    const t = e.target, r = t.dataset.key;
    r && (t instanceof HTMLInputElement && t.type === "checkbox" ? this.emit({ [r]: t.checked }) : this.emit({ [r]: t.value }));
  }
  render() {
    this.root.innerHTML = `<style>${F}</style><div class="form"><label>Entity чайника *<input data-key="entity" placeholder="water_heater.kettle" value="${n(this.config.entity ?? "")}"></label><span class="help">Укажите точный entity_id из Settings → Devices & services → Entities.</span><label>Название<input data-key="name" value="${n(this.config.name ?? l.name)}"></label><label>Расположение<input data-key="location" value="${n(this.config.location ?? l.location)}"></label><label>Иконка<input data-key="icon" value="${n(this.config.icon ?? l.icon)}"></label><label class="checkbox"><input data-key="show_modes" type="checkbox" ${this.config.show_modes !== !1 ? "checked" : ""}>Показывать выпадающий список режимов</label><span class="help">Режимы загружаются автоматически из атрибута operation_list.</span><label>Режим включения<input data-key="power_on_mode" value="${n(this.config.power_on_mode ?? "on")}"></label><label>Режим выключения<input data-key="power_off_mode" value="${n(this.config.power_off_mode ?? "off")}"></label><span class="help">Значения должны входить в attributes.operation_list у water_heater entity.</span><label>Entity поддержания тепла<input data-key="keep_warm_entity" placeholder="switch.kettle_keep_warm" value="${n(this.config.keep_warm_entity ?? "")}"></label><label>Название поддержания тепла<input data-key="keep_warm_name" value="${n(this.config.keep_warm_name ?? l.keep_warm_name)}"></label></div>`;
  }
}
customElements.get("stitch-mint-teal-kettle-card") || customElements.define("stitch-mint-teal-kettle-card", H);
customElements.get("stitch-mint-teal-kettle-card-editor") || customElements.define("stitch-mint-teal-kettle-card-editor", j);
const u = window;
u.customCards = u.customCards ?? [];
u.customCards.some((a) => a.type === "custom:stitch-mint-teal-kettle-card") || u.customCards.push({
  type: "custom:stitch-mint-teal-kettle-card",
  name: "Mint Teal — Чайник",
  description: "Карточка управления чайником water_heater в стиле Mint Teal.",
  preview: !0
});
