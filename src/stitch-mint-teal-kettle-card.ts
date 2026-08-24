type HassState = {
  state: string;
  attributes: Record<string, unknown>;
};

type HomeAssistant = {
  states: Record<string, HassState | undefined>;
  callService: (domain: string, service: string, data: Record<string, unknown>) => Promise<void> | void;
};

type KettleConfig = {
  type: string;
  entity: string;
  name?: string;
  location?: string;
  icon?: string;
  show_modes?: boolean;
  keep_warm_entity?: string;
  keep_warm_name?: string;
  power_on_mode?: string;
  power_off_mode?: string;
};

type EditorConfig = Partial<KettleConfig> & { entity?: string };

const DEFAULTS: Required<Pick<KettleConfig, 'name' | 'location' | 'icon' | 'show_modes' | 'keep_warm_name'>> = {
  name: 'Чайник',
  location: 'Кухня',
  icon: 'mdi:kettle',
  show_modes: true,
  keep_warm_name: 'Поддержание тепла',
};

const TEMPERATURE_STEP = 5;

// Словарь для перевода режимов на русский язык
const MODE_TRANSLATIONS: Record<string, string> = {
  'boil': 'Кипячение',
  'warm': 'Поддержание',
  'white_tea': 'Белый чай',
  'green_tea': 'Зеленый чай',
  'red_tea': 'Красный чай',
  'herbal_tea': 'Травяной чай',
  'flower_tea': 'Цветочный',
  'puerh_tea': 'Пуэр',
  'oolong_tea': 'Улун',
  'black_tea': 'Черный чай',
  'coffee': 'Кофе',
  'milk': 'Детское питание'
};

function translateMode(mode: string): string {
  const lower = String(mode).toLowerCase().trim();
  return MODE_TRANSLATIONS[lower] || mode; // Если перевода нет, вернет оригинальное название
}

const STYLE = `
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
  width: 56px; height: 56px; border-radius: 50%; 
  background: var(--mt-surface-variant); color: var(--mt-tertiary); transition: background .3s;
}
.icon-bubble ha-icon { --mdc-icon-size: 28px; }
.info { min-width: 0; flex: 1; }
h2, p { margin: 0; }
h2 { font: 600 20px/28px "Manrope", system-ui, sans-serif; color: var(--mt-on-surface); letter-spacing: -0.01em; }
.location { font-size: 12px; font-weight: 500; line-height: 16px; color: var(--mt-outline); margin-top: 2px; }
.power-badge { 
  flex: 0 0 auto; padding: 4px 12px; border: 0; border-radius: 999px; cursor: pointer;
  font: 500 12px/16px "Work Sans", sans-serif; 
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
.temp-label { font-size: 12px; font-weight: 500; color: var(--mt-outline); }
.temp-current { font: 600 24px/32px "Manrope", sans-serif; color: var(--mt-primary); letter-spacing: -0.01em; }
.temp-target { font: 600 20px/28px "Manrope", sans-serif; color: var(--mt-on-surface); }
.temp-divider { width: 1px; height: 40px; background: var(--mt-outline-variant); opacity: 0.5; }

/* Slider */
.slider-section { display: flex; flex-direction: column; gap: 8px; padding: 0 8px; }
.slider-labels { display: flex; justify-content: space-between; font-size: 12px; font-weight: 500; color: var(--mt-outline); }
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
.modes-toggle h3 { font: 600 14px/18px "Work Sans", sans-serif; margin: 0; }
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
.mode-btn span { font-size: 10px; font-weight: 500; line-height: 1.2; text-align: center; }

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
.warm-label { font: 400 14px/20px "Work Sans", sans-serif; color: var(--mt-on-surface); }
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
`;

const EDITOR_STYLE = `
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

function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);
}

function safeIcon(icon: unknown, fallback: string): string {
  const value = typeof icon === 'string' ? icon.trim() : '';
  return /^(mdi|hass):[a-z0-9-]+$/i.test(value) ? value : fallback;
}

function numberAttribute(value: unknown, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatTemperature(value: number | null): string {
  return value === null ? '—' : `${Math.round(value)}°C`;
}

function fireConfigChanged(element: HTMLElement, config: EditorConfig): void {
  element.dispatchEvent(new CustomEvent('config-changed', { bubbles: true, composed: true, detail: { config } }));
}

class StitchMintTealKettleCard extends HTMLElement {
  static getStubConfig(): KettleConfig {
    return { type: 'custom:stitch-mint-teal-kettle-card', entity: 'water_heater.kettle' };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('stitch-mint-teal-kettle-card-editor');
  }

  private config: KettleConfig | null = null;
  private _hass: HomeAssistant | undefined;
  private root: ShadowRoot;
  private _modesExpanded = false;
  private boundClick: (event: Event) => void;
  private boundInput: (event: Event) => void;
  private boundChange: (event: Event) => void;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.boundClick = (event) => this.handleClick(event);
    this.boundInput = (event) => this.handleInput(event);
    this.boundChange = (event) => this.handleChange(event);
  }

  connectedCallback(): void {
    this.root.addEventListener('click', this.boundClick);
    this.root.addEventListener('input', this.boundInput);
    this.root.addEventListener('change', this.boundChange);
    this.render();
  }

  disconnectedCallback(): void {
    this.root.removeEventListener('click', this.boundClick);
    this.root.removeEventListener('input', this.boundInput);
    this.root.removeEventListener('change', this.boundChange);
  }

  setConfig(config: KettleConfig): void {
    if (!config || typeof config.entity !== 'string' || !config.entity.trim()) {
      throw new Error('stitch-mint-teal-kettle-card: требуется entity домена water_heater');
    }
    this.config = {
      ...config,
      entity: config.entity.trim(),
      name: config.name ?? DEFAULTS.name,
      location: config.location ?? DEFAULTS.location,
      icon: safeIcon(config.icon, DEFAULTS.icon),
      show_modes: config.show_modes ?? DEFAULTS.show_modes,
      keep_warm_name: config.keep_warm_name ?? DEFAULTS.keep_warm_name,
      power_on_mode: config.power_on_mode ?? 'on',
      power_off_mode: config.power_off_mode ?? 'off',
    };
    this.render();
  }

  set hass(value: HomeAssistant) {
    this._hass = value;
    this.render();
  }

  getCardSize(): number { return 8; }

  private async call(service: string, data: Record<string, unknown> = {}): Promise<void> {
    if (!this._hass || !this.config) return;
    await this._hass.callService('water_heater', service, { entity_id: this.config.entity, ...data });
  }

  private handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.dataset.action !== 'temperature') return;
    const temperature = Number(target.value);
    if (!Number.isFinite(temperature)) return;
    target.style.setProperty('--progress', `${this.sliderProgress(temperature, Number(target.min), Number(target.max))}%`);
    const output = this.root.querySelector('[data-role="target-value"]');
    if (output) output.textContent = formatTemperature(temperature);
  }

  private handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.dataset.action === 'temperature') {
      const temperature = Number(target.value);
      if (!Number.isFinite(temperature)) return;
      void this.call('set_temperature', { temperature });
    }
  }

  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest<HTMLElement>('[data-action]');
    if (!button || !this.config) return;
    const action = button.dataset.action;

    if (action === 'toggle-warm') {
      void this.toggleKeepWarm();
    } else if (action === 'power') {
      const operationMode = this.currentState() === 'off'
        ? this.config.power_on_mode ?? 'on'
        : this.config.power_off_mode ?? 'off';
      void this.call('set_operation_mode', { operation_mode: operationMode });
    } else if (action === 'toggle-accordion') {
      this._modesExpanded = !this._modesExpanded;
      this.render();
    } else if (action === 'set-mode') {
      const mode = button.dataset.mode;
      if (mode) void this.call('set_operation_mode', { operation_mode: mode });
    }
  }

  private async toggleKeepWarm(): Promise<void> {
    if (!this._hass || !this.config?.keep_warm_entity) return;
    const state = this._hass.states[this.config.keep_warm_entity];
    if (!state) return;
    const domain = this.config.keep_warm_entity.split('.')[0];
    if (domain !== 'switch' && domain !== 'input_boolean') return;
    await this._hass.callService(domain, state.state === 'on' ? 'turn_off' : 'turn_on', { entity_id: this.config.keep_warm_entity });
  }

  private currentState(): string {
    return this.config && this._hass?.states[this.config.entity]?.state || 'unknown';
  }

  private sliderProgress(value: number, min: number, max: number): number {
    if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 100;
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  }

  private snapToStep(value: number, min: number, max: number): number {
    if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max) || max <= min) return max;
    const snapped = min + Math.round((value - min) / TEMPERATURE_STEP) * TEMPERATURE_STEP;
    return Math.max(min, Math.min(max, snapped));
  }

  private getModeIcon(mode: string): string {
    const m = mode.toLowerCase();
    if (m.includes('flower') || m.includes('цветоч')) return 'mdi:flower';
    if (m.includes('herb') || m.includes('травян') || m.includes('leaf')) return 'mdi:leaf';
    if (m.includes('coffee') || m.includes('кофе')) return 'mdi:coffee';
    if (m.includes('milk') || m.includes('детск')) return 'mdi:baby-bottle-outline';
    if (m.includes('boil') || m.includes('кипяч')) return 'mdi:pot-steam';
    return 'mdi:cup-water';
  }

  private render(): void {
    if (!this.config) {
      this.root.innerHTML = `<style>${STYLE}</style><div class="card"><div class="error">Настройте entity чайника.</div></div>`;
      return;
    }
    const state = this._hass?.states[this.config.entity];
    if (!state) {
      this.root.innerHTML = `<style>${STYLE}</style><div class="card"><div class="error">Entity <code>${escapeHtml(this.config.entity)}</code> не найдена.</div></div>`;
      return;
    }
    
    const attributes = state.attributes ?? {};
    const current = Number.isFinite(Number(attributes.current_temperature)) ? Number(attributes.current_temperature) : null;
    const target = Number.isFinite(Number(attributes.temperature)) ? Number(attributes.temperature) : null;
    const min = numberAttribute(attributes.min_temp, 30);
    const max = numberAttribute(attributes.max_temp, 100);
    const sliderValue = this.snapToStep(target ?? max, min, max);
    const warmState = this.config.keep_warm_entity ? this._hass?.states[this.config.keep_warm_entity]?.state : undefined;
    const active = state.state !== 'off' && state.state !== 'unavailable';
    const progress = this.sliderProgress(sliderValue, min, max);
    
    const operationList = Array.isArray(attributes.operation_list) ? attributes.operation_list : [];
    const currentMode = String(attributes.operation_mode || '');

    // Фильтруем режимы "on" и "off"
    const filteredModes = operationList.filter(mode => {
      const m = String(mode).toLowerCase();
      return m !== 'on' && m !== 'off';
    });

    let modesMarkup = '';
    if (this.config.show_modes !== false && filteredModes.length > 0) {
      modesMarkup = `
        <div class="divider" aria-hidden="true"></div>
        <section class="modes-section">
          <button class="modes-toggle ${this._modesExpanded ? 'open' : ''}" data-action="toggle-accordion" aria-expanded="${this._modesExpanded}">
            <h3>Режимы</h3>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <div class="modes-content ${this._modesExpanded ? 'open' : ''}">
            <div class="modes-grid">
              ${filteredModes.map(mode => {
                const modeStr = String(mode);
                const translatedMode = translateMode(modeStr);
                const isActive = currentMode === modeStr;
                return `
                  <button class="mode-btn ${isActive ? 'active' : ''}" data-action="set-mode" data-mode="${escapeHtml(modeStr)}">
                    <ha-icon icon="${this.getModeIcon(translatedMode)}"></ha-icon>
                    <span>${escapeHtml(translatedMode)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    const warmMarkup = this.config.keep_warm_entity ? `
      <div class="divider" aria-hidden="true"></div>
      <button class="warm-row ${warmState === 'on' ? 'on' : ''}" data-action="toggle-warm">
        <div class="warm-content">
          <div class="warm-icon-box"><ha-icon icon="mdi:snowflake-thermometer"></ha-icon></div>
          <span class="warm-label">${escapeHtml(this.config.keep_warm_name)}</span>
        </div>
        <div class="toggle"><div class="toggle-thumb"></div></div>
      </button>
    ` : '';

    this.root.innerHTML = `
      <style>${STYLE}</style>
      <article class="card">
        <header class="header">
          <div class="icon-bubble">
            <ha-icon icon="${safeIcon(this.config.icon, DEFAULTS.icon)}"></ha-icon>
          </div>
          <div class="info">
            <h2>${escapeHtml(this.config.name)}</h2>
            <p class="location">${escapeHtml(this.config.location)}</p>
          </div>
          <button class="power-badge ${active ? 'active' : ''}" data-action="power" role="switch" aria-checked="${active}">
            ${active ? 'ВКЛ' : 'ВЫКЛ'}
          </button>
        </header>

        <section class="temperatures">
          <div class="temperature">
            <span class="temp-label">Текущая температура</span>
            <span class="temp-current">${formatTemperature(current)}</span>
          </div>
          <div class="temp-divider" aria-hidden="true"></div>
          <div class="temperature target">
            <span class="temp-label">Целевая температура</span>
            <span class="temp-target" data-role="target-value">${formatTemperature(target)}</span>
          </div>
        </section>

        <section class="slider-section">
          <div class="slider-labels">
            <span>${formatTemperature(min)}</span>
            <span>${formatTemperature(max)}</span>
          </div>
          <input aria-label="Целевая температура" data-action="temperature" type="range" 
                 min="${min}" max="${max}" step="${TEMPERATURE_STEP}" value="${sliderValue}" 
                 style="--progress: ${progress}%">
        </section>

        ${modesMarkup}
        ${warmMarkup}
      </article>
    `;
  }
}

class StitchMintTealKettleCardEditor extends HTMLElement {
  private config: EditorConfig = {};
  private root: ShadowRoot;
  private boundChange: (event: Event) => void;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.boundChange = (event) => this.handleChange(event);
  }

  connectedCallback(): void {
    this.root.addEventListener('change', this.boundChange);
    this.render();
  }

  disconnectedCallback(): void {
    this.root.removeEventListener('change', this.boundChange);
  }

  setConfig(config: EditorConfig): void {
    this.config = { ...config };
    this.render();
  }

  set hass(_value: HomeAssistant) { }

  private emit(patch: EditorConfig): void {
    this.config = { ...this.config, ...patch };
    fireConfigChanged(this, this.config);
  }

  private handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const key = target.dataset.key as keyof EditorConfig | undefined;
    if (!key) return;
    this.emit({ [key]: target.type === 'checkbox' ? target.checked : target.value });
  }

  private render(): void {
    this.root.innerHTML = `
      <style>${EDITOR_STYLE}</style>
      <div class="form">
        <label>Entity чайника *<input data-key="entity" placeholder="water_heater.kettle" value="${escapeHtml(this.config.entity ?? '')}"></label>
        <label>Название<input data-key="name" value="${escapeHtml(this.config.name ?? DEFAULTS.name)}"></label>
        <label>Расположение<input data-key="location" value="${escapeHtml(this.config.location ?? DEFAULTS.location)}"></label>
        <label>Иконка<input data-key="icon" value="${escapeHtml(this.config.icon ?? DEFAULTS.icon)}"></label>
        <label class="checkbox">
          <input data-key="show_modes" type="checkbox" ${this.config.show_modes !== false ? 'checked' : ''}>
          Показывать сетку режимов
        </label>
        <label>Entity поддержания тепла<input data-key="keep_warm_entity" placeholder="switch.kettle_keep_warm" value="${escapeHtml(this.config.keep_warm_entity ?? '')}"></label>
        <label>Название поддержания тепла<input data-key="keep_warm_name" value="${escapeHtml(this.config.keep_warm_name ?? DEFAULTS.keep_warm_name)}"></label>
      </div>
    `;
  }
}

if (!customElements.get('stitch-mint-teal-kettle-card')) customElements.define('stitch-mint-teal-kettle-card', StitchMintTealKettleCard);
if (!customElements.get('stitch-mint-teal-kettle-card-editor')) customElements.define('stitch-mint-teal-kettle-card-editor', StitchMintTealKettleCardEditor);

const windowWithCards = window as Window & { customCards?: Array<Record<string, unknown>> };
windowWithCards.customCards = windowWithCards.customCards ?? [];
if (!windowWithCards.customCards.some((card) => card.type === 'custom:stitch-mint-teal-kettle-card')) {
  windowWithCards.customCards.push({
    type: 'custom:stitch-mint-teal-kettle-card',
    name: 'Mint Teal — Чайник',
    description: 'Карточка управления чайником water_heater в новом стиле Lumina Home.',
    preview: true,
  });
}