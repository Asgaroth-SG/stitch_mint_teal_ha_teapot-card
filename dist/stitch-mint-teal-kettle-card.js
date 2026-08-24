var L = Object.defineProperty;
var S = (r, i, e) => i in r ? L(r, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[i] = e;
var c = (r, i, e) => S(r, typeof i != "symbol" ? i + "" : i, e);
const N = [
  { label: "Белый чай", value: "white_tea", icon: "mdi:tea" },
  { label: "Зелёный чай", value: "green_tea", icon: "mdi:tea" },
  { label: "Красный чай", value: "red_tea", icon: "mdi:tea" },
  { label: "Травяной чай", value: "herbal_tea", icon: "mdi:leaf" },
  { label: "Цветочный", value: "flower_tea", icon: "mdi:flower" },
  { label: "Пуэр", value: "puerh_tea", icon: "mdi:tea" },
  { label: "Улун", value: "oolong_tea", icon: "mdi:tea" },
  { label: "Чёрный чай", value: "black_tea", icon: "mdi:tea" }
], d = {
  name: "Чайник",
  location: "Кухня",
  icon: "mdi:kettle-steam",
  show_modes: !0,
  keep_warm_name: "Поддержание тепла"
}, x = `
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
.mode-icon { --mdc-icon-size: 22px; }
.info { min-width: 0; flex: 1; }
h2, h3, p { margin: 0; }
h2 { font: 600 20px/28px "Manrope", system-ui, sans-serif; color: var(--kettle-text); }
.location { margin-top: 1px; font-size: 12px; line-height: 16px; color: var(--kettle-muted); }
.status { flex: 0 0 auto; padding: 4px 12px; border-radius: 999px; background: var(--kettle-container-high); color: var(--kettle-muted); font-size: 12px; line-height: 16px; }
.status.active { background: var(--kettle-primary-container); color: var(--kettle-primary); }
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
input[type="range"]::-webkit-slider-runnable-track { height: 8px; border-radius: 999px; background: linear-gradient(to right, var(--kettle-primary) var(--progress, 100%), var(--kettle-outline) var(--progress, 100%)); }
input[type="range"]::-moz-range-track { height: 8px; border-radius: 999px; background: var(--kettle-outline); }
input[type="range"]::-moz-range-progress { height: 8px; border-radius: 999px; background: var(--kettle-primary); }
input[type="range"]::-webkit-slider-thumb { width: 24px; height: 24px; margin-top: -8px; appearance: none; border: 0; border-radius: 50%; background: var(--kettle-primary); box-shadow: 0 2px 4px rgb(0 0 0 / 20%); }
input[type="range"]::-moz-range-thumb { width: 24px; height: 24px; border: 0; border-radius: 50%; background: var(--kettle-primary); box-shadow: 0 2px 4px rgb(0 0 0 / 20%); }
.divider { width: 100%; height: 1px; background: color-mix(in srgb, var(--kettle-primary) 15%, transparent); }
.section-title { margin-bottom: 8px; color: var(--kettle-muted); font-size: 14px; line-height: 18px; font-weight: 600; }
.modes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
button { font: inherit; }
.mode, .warm-row { border: 0; cursor: pointer; }
.mode { min-height: 62px; padding: 8px 4px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; text-align: center; vertical-align: middle; border-radius: 12px; color: var(--kettle-muted); background: var(--kettle-container-high); transition: transform .15s ease, background .15s ease; }
.mode:hover { background: var(--kettle-container); }
.mode:active, .warm-row:active { transform: scale(.97); }
.mode.selected { color: var(--text-primary-color, #fff); background: var(--kettle-primary); }
.mode-label { font-size: 10px; line-height: 13px; }
.warm-row { width: 100%; padding: 12px; display: flex; align-items: center; justify-content: space-between; text-align: left; border-radius: 12px; color: var(--kettle-text); background: var(--kettle-container); }
.warm-content { min-width: 0; display: flex; align-items: center; gap: 12px; }
.warm-label { font-size: 14px; line-height: 20px; }
.toggle { width: 48px; height: 24px; padding: 4px; display: flex; align-items: center; border-radius: 999px; background: var(--kettle-outline); transition: background .15s ease; }
.toggle-thumb { width: 16px; height: 16px; border-radius: 50%; background: var(--kettle-muted); box-shadow: 0 1px 3px rgb(0 0 0 / 20%); transition: transform .15s ease, background .15s ease; }
.toggle.on { background: var(--kettle-primary); }
.toggle.on .toggle-thumb { background: #fff; transform: translateX(24px); }
button:focus-visible, input:focus-visible { outline: 2px solid var(--kettle-primary); outline-offset: 2px; }
.error { padding: 12px; border-radius: 10px; color: var(--error-color, #ba1a1a); background: var(--error-background-color, #ffdad6); font-size: 13px; }
@media (max-width: 340px) { .card { padding: 12px; gap: 16px; } .modes { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
`, T = `
:host { display: block; font-family: var(--paper-font-body1_-_font-family, sans-serif); color: var(--primary-text-color, #0f1e1c); }
* { box-sizing: border-box; }
.form { display: grid; gap: 14px; padding: 4px 0; }
label { display: grid; gap: 6px; font-size: 13px; }
input, select { width: 100%; min-height: 40px; padding: 8px 10px; color: inherit; background: var(--card-background-color, #ecfdf9); border: 1px solid var(--divider-color, #bcc9c5); border-radius: 8px; font: inherit; }
input:focus, select:focus { outline: 2px solid var(--primary-color, #00685d); outline-offset: 1px; }
.checkbox { display: flex; grid-template-columns: none; align-items: center; gap: 8px; }
.checkbox input { width: 18px; min-height: 18px; }
fieldset { display: grid; gap: 10px; padding: 12px; border: 1px solid var(--divider-color, #bcc9c5); border-radius: 10px; }
legend { padding: 0 4px; font-weight: 600; }
.mode-row { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 6px; align-items: end; }
button { min-height: 36px; padding: 6px 10px; border: 0; border-radius: 8px; cursor: pointer; color: var(--text-primary-color, white); background: var(--primary-color, #00685d); font: inherit; }
button.secondary { color: var(--primary-text-color, #0f1e1c); background: var(--secondary-background-color, #e0f2ee); }
.help { color: var(--secondary-text-color, #6d7a77); font-size: 12px; line-height: 16px; }
@media (max-width: 520px) { .mode-row { grid-template-columns: 1fr 1fr; } }
`;
function o(r) {
  return String(r ?? "").replace(/[&<>'"]/g, (i) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[i] ?? i);
}
function b(r, i) {
  const e = typeof r == "string" ? r.trim() : "";
  return /^(mdi|hass):[a-z0-9-]+$/i.test(e) ? e : i;
}
function _(r, i) {
  const e = typeof r == "number" ? r : Number(r);
  return Number.isFinite(e) ? e : i;
}
function p(r) {
  return Array.isArray(r) ? r.filter((i) => typeof i == "object" && i !== null).map((i) => ({
    label: typeof i.label == "string" && i.label.trim() ? i.label.trim() : "Режим",
    value: typeof i.value == "string" && i.value.trim() ? i.value.trim() : "",
    icon: b(i.icon, "mdi:tea")
  })).filter((i) => i.value) : N;
}
function h(r) {
  return r === null ? "—" : `${Math.round(r)}°C`;
}
function I(r) {
  return { off: "выкл", heating: "нагрев", idle: "готов", on: "вкл", unavailable: "недоступен", unknown: "нет данных" }[r] ?? (r || "нет данных");
}
function j(r, i) {
  r.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: i } }));
}
class F extends HTMLElement {
  constructor() {
    super();
    c(this, "config", null);
    c(this, "_hass");
    c(this, "root");
    c(this, "boundClick");
    c(this, "boundInput");
    this.root = this.attachShadow({ mode: "open" }), this.boundClick = (e) => this.handleClick(e), this.boundInput = (e) => this.handleInput(e);
  }
  static getStubConfig() {
    return { type: "custom:stitch-mint-teal-kettle-card", entity: "water_heater.kettle" };
  }
  static getConfigElement() {
    return document.createElement("stitch-mint-teal-kettle-card-editor");
  }
  connectedCallback() {
    this.root.addEventListener("click", this.boundClick), this.root.addEventListener("input", this.boundInput), this.render();
  }
  disconnectedCallback() {
    this.root.removeEventListener("click", this.boundClick), this.root.removeEventListener("input", this.boundInput);
  }
  setConfig(e) {
    if (!e || typeof e.entity != "string" || !e.entity.trim())
      throw new Error("stitch-mint-teal-kettle-card: требуется entity домена water_heater");
    this.config = {
      ...e,
      entity: e.entity.trim(),
      name: e.name ?? d.name,
      location: e.location ?? d.location,
      icon: b(e.icon, d.icon),
      show_modes: e.show_modes ?? d.show_modes,
      keep_warm_name: e.keep_warm_name ?? d.keep_warm_name,
      modes: p(e.modes)
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
    n && (n.textContent = h(a));
  }
  handleClick(e) {
    const a = e.target.closest("[data-action]");
    if (!a || !this.config) return;
    const n = a.dataset.action;
    if (n === "temperature") {
      const s = a;
      this.call("set_temperature", { temperature: Number(s.value) });
    } else n === "toggle" ? this.toggleKeepWarm() : n === "mode" && a.dataset.value ? this.call("set_operation_mode", { operation_mode: a.dataset.value }) : n === "power" && this.call(this.currentState() === "off" ? "turn_on" : "turn_off");
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
  render() {
    var k, y, w;
    if (!this.config) {
      this.root.innerHTML = `<style>${x}</style><div class="card"><div class="error">Настройте entity чайника в редакторе карточки.</div></div>`;
      return;
    }
    const e = (k = this._hass) == null ? void 0 : k.states[this.config.entity];
    if (!e) {
      this.root.innerHTML = `<style>${x}</style><div class="card"><div class="error">Entity <code>${o(this.config.entity)}</code> не найдена.</div></div>`;
      return;
    }
    const t = e.attributes ?? {}, a = Number.isFinite(Number(t.current_temperature)) ? Number(t.current_temperature) : null, n = Number.isFinite(Number(t.temperature)) ? Number(t.temperature) : null, s = _(t.min_temp, 30), l = _(t.max_temp, 100), m = Math.max(s, Math.min(l, n ?? l)), g = this.config.show_modes ? p(this.config.modes) : [], $ = typeof t.operation_mode == "string" ? t.operation_mode : e.state, C = this.config.keep_warm_entity ? (w = (y = this._hass) == null ? void 0 : y.states[this.config.keep_warm_entity]) == null ? void 0 : w.state : void 0, v = e.state !== "off" && e.state !== "unavailable", E = g.length ? `<section><h3 class="section-title">Режимы</h3><div class="modes">${g.map((u) => `<button class="mode ${$ === u.value ? "selected" : ""}" data-action="mode" data-value="${o(u.value)}" aria-label="${o(u.label)}"><ha-icon class="mode-icon" icon="${b(u.icon, "mdi:tea")}"></ha-icon><span class="mode-label">${o(u.label)}</span></button>`).join("")}</div></section>` : "", M = this.config.keep_warm_entity ? `<button class="warm-row" data-action="toggle" aria-label="${o(this.config.keep_warm_name)}"><span class="warm-content"><span class="warm-icon"><ha-icon class="small-icon" icon="mdi:snowflake-thermometer"></ha-icon></span><span class="warm-label">${o(this.config.keep_warm_name)}</span></span><span class="toggle ${C === "on" ? "on" : ""}" aria-hidden="true"><span class="toggle-thumb"></span></span></button>` : "", z = this.sliderProgress(m, s, l);
    this.root.innerHTML = `<style>${x}</style><article class="card"><header class="header"><span class="icon-bubble"><ha-icon class="device-icon" icon="${b(this.config.icon, d.icon)}"></ha-icon></span><div class="info"><h2>${o(this.config.name)}</h2><p class="location">${o(this.config.location)}</p></div><span class="status ${v ? "active" : ""}">${o(I(e.state))}</span></header><section class="temperatures"><div class="temperature"><span class="label">Текущая температура</span><strong class="value current">${h(a)}</strong></div><span class="temperature-divider" aria-hidden="true"></span><div class="temperature target"><span class="label">Целевая температура</span><strong class="value" data-role="target-value">${h(n)}</strong></div></section><section class="slider-section"><div class="slider-labels"><span>${h(s)}</span><span>${h(l)}</span></div><input aria-label="Целевая температура" data-action="temperature" type="range" min="${s}" max="${l}" step="1" value="${m}" style="--progress: ${z}%"></section><button class="mode ${v ? "selected" : ""}" data-action="power" aria-label="Включить или выключить чайник"><ha-icon class="mode-icon" icon="mdi:power"></ha-icon><span class="mode-label">Вкл/Выкл</span></button><div class="divider" aria-hidden="true"></div>${E}${M}</article>`;
  }
}
class H extends HTMLElement {
  constructor() {
    super();
    c(this, "config", {});
    c(this, "root");
    c(this, "boundChange");
    c(this, "boundClick");
    this.root = this.attachShadow({ mode: "open" }), this.boundChange = (e) => this.handleChange(e), this.boundClick = (e) => this.handleClick(e);
  }
  connectedCallback() {
    this.root.addEventListener("change", this.boundChange), this.root.addEventListener("click", this.boundClick), this.render();
  }
  disconnectedCallback() {
    this.root.removeEventListener("change", this.boundChange), this.root.removeEventListener("click", this.boundClick);
  }
  setConfig(e) {
    this.config = { ...e, modes: p(e.modes) }, this.render();
  }
  set hass(e) {
  }
  emit(e) {
    this.config = { ...this.config, ...e }, j(this, this.config);
  }
  handleChange(e) {
    const t = e.target, a = t.dataset.key;
    a && (t instanceof HTMLInputElement && t.type === "checkbox" ? this.emit({ [a]: t.checked }) : this.emit({ [a]: t.value }));
  }
  handleClick(e) {
    var n;
    const a = (n = e.target.closest("[data-editor-action]")) == null ? void 0 : n.dataset.editorAction;
    if (a === "add-mode") {
      const s = p(this.config.modes);
      this.emit({ modes: [...s, { label: "Новый режим", value: `mode_${s.length + 1}`, icon: "mdi:tea" }] }), this.render();
    }
    if (a != null && a.startsWith("delete-mode-")) {
      const s = Number(a.slice(12)), l = p(this.config.modes).filter((m, g) => g !== s);
      this.emit({ modes: l }), this.render();
    }
  }
  render() {
    const t = p(this.config.modes).map((a, n) => `<div class="mode-row"><label>Название<input data-mode-index="${n}" data-mode-key="label" value="${o(a.label)}"></label><label>Значение<input data-mode-index="${n}" data-mode-key="value" value="${o(a.value)}"></label><label>Иконка<input data-mode-index="${n}" data-mode-key="icon" value="${o(a.icon ?? "mdi:tea")}"></label><button class="secondary" type="button" data-editor-action="delete-mode-${n}" aria-label="Удалить режим">Удалить</button></div>`).join("");
    this.root.innerHTML = `<style>${T}</style><div class="form"><label>Entity чайника *<input data-key="entity" placeholder="water_heater.kettle" value="${o(this.config.entity ?? "")}"></label><span class="help">Укажите точный entity_id из Settings → Devices & services → Entities.</span><label>Название<input data-key="name" value="${o(this.config.name ?? d.name)}"></label><label>Расположение<input data-key="location" value="${o(this.config.location ?? d.location)}"></label><label>Иконка<input data-key="icon" value="${o(this.config.icon ?? d.icon)}"></label><label class="checkbox"><input data-key="show_modes" type="checkbox" ${this.config.show_modes !== !1 ? "checked" : ""}>Показывать режимы чая</label><label>Entity поддержания тепла<input data-key="keep_warm_entity" placeholder="switch.kettle_keep_warm" value="${o(this.config.keep_warm_entity ?? "")}"></label><label>Название поддержания тепла<input data-key="keep_warm_name" value="${o(this.config.keep_warm_name ?? d.keep_warm_name)}"></label><fieldset><legend>Режимы чая</legend>${t || '<span class="help">Режимы отключены или не заданы.</span>'}<button type="button" data-editor-action="add-mode">Добавить режим</button></fieldset></div>`, this.root.querySelectorAll("[data-mode-index]").forEach((a) => a.addEventListener("change", (n) => this.handleModeChange(n)));
  }
  handleModeChange(e) {
    const t = e.target, a = Number(t.dataset.modeIndex), n = t.dataset.modeKey, s = p(this.config.modes).map((l, m) => m === a ? { ...l, [n]: t.value } : l);
    this.emit({ modes: s });
  }
}
customElements.get("stitch-mint-teal-kettle-card") || customElements.define("stitch-mint-teal-kettle-card", F);
customElements.get("stitch-mint-teal-kettle-card-editor") || customElements.define("stitch-mint-teal-kettle-card-editor", H);
const f = window;
f.customCards = f.customCards ?? [];
f.customCards.some((r) => r.type === "custom:stitch-mint-teal-kettle-card") || f.customCards.push({
  type: "custom:stitch-mint-teal-kettle-card",
  name: "Mint Teal — Чайник",
  description: "Карточка управления чайником water_heater в стиле Mint Teal.",
  preview: !0
});
