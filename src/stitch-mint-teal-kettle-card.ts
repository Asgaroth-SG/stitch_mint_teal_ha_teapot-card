type HassState = {
  state: string;
  attributes: Record<string, unknown>;
};

type HomeAssistant = {
  states: Record<string, HassState | undefined>;
  callService: (domain: string, service: string, data: Record<string, unknown>) => Promise<void> | void;
};

type KettleMode = {
  label: string;
  value: string;
  icon?: string;
};

type KettleConfig = {
  type: string;
  entity: string;
  name?: string;
  location?: string;
  icon?: string;
  show_modes?: boolean;
  modes?: KettleMode[];
  keep_warm_entity?: string;
  keep_warm_name?: string;
  power_on_mode?: string;
  power_off_mode?: string;
};

type EditorConfig = Partial<KettleConfig> & { entity?: string };

const DEFAULT_MODES: KettleMode[] = [
  { label: 'Белый чай', value: 'white_tea', icon: 'mdi:tea' },
  { label: 'Зелёный чай', value: 'green_tea', icon: 'mdi:tea' },
  { label: 'Красный чай', value: 'red_tea', icon: 'mdi:tea' },
  { label: 'Травяной чай', value: 'herbal_tea', icon: 'mdi:leaf' },
  { label: 'Цветочный', value: 'flower_tea', icon: 'mdi:flower' },
  { label: 'Пуэр', value: 'puerh_tea', icon: 'mdi:tea' },
  { label: 'Улун', value: 'oolong_tea', icon: 'mdi:tea' },
  { label: 'Чёрный чай', value: 'black_tea', icon: 'mdi:tea' },
];

const DEFAULTS: Required<Pick<KettleConfig, 'name' | 'location' | 'icon' | 'show_modes' | 'keep_warm_name'>> = {
  name: 'Чайник',
  location: 'Кухня',
  icon: 'mdi:kettle-steam',
  show_modes: true,
  keep_warm_name: 'Поддержание тепла',
};

const STYLE = `
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
fieldset { display: grid; gap: 10px; padding: 12px; border: 1px solid var(--divider-color, #bcc9c5); border-radius: 10px; }
legend { padding: 0 4px; font-weight: 600; }
.mode-row { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 6px; align-items: end; }
button { min-height: 36px; padding: 6px 10px; border: 0; border-radius: 8px; cursor: pointer; color: var(--text-primary-color, white); background: var(--primary-color, #00685d); font: inherit; }
button.secondary { color: var(--primary-text-color, #0f1e1c); background: var(--secondary-background-color, #e0f2ee); }
.help { color: var(--secondary-text-color, #6d7a77); font-size: 12px; line-height: 16px; }
@media (max-width: 520px) { .mode-row { grid-template-columns: 1fr 1fr; } }
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

function normalizeModes(value: unknown): KettleMode[] {
  if (!Array.isArray(value)) return DEFAULT_MODES;
  return value
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .map((item) => ({
      label: typeof item.label === 'string' && item.label.trim() ? item.label.trim() : 'Режим',
      value: typeof item.value === 'string' && item.value.trim() ? item.value.trim() : '',
      icon: safeIcon(item.icon, 'mdi:tea'),
    }))
    .filter((item) => item.value);
}

function formatTemperature(value: number | null): string {
  return value === null ? '—' : `${Math.round(value)}°C`;
}

function stateLabel(state: string): string {
  const labels: Record<string, string> = { off: 'выкл', heating: 'нагрев', idle: 'готов', on: 'вкл', unavailable: 'недоступен', unknown: 'нет данных' };
  return labels[state] ?? (state || 'нет данных');
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
  private boundClick: (event: Event) => void;
  private boundInput: (event: Event) => void;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.boundClick = (event) => this.handleClick(event);
    this.boundInput = (event) => this.handleInput(event);
  }

  connectedCallback(): void {
    this.root.addEventListener('click', this.boundClick);
    this.root.addEventListener('input', this.boundInput);
    this.render();
  }

  disconnectedCallback(): void {
    this.root.removeEventListener('click', this.boundClick);
    this.root.removeEventListener('input', this.boundInput);
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
      modes: normalizeModes(config.modes),
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

  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest<HTMLElement>('[data-action]');
    if (!button || !this.config) return;
    const action = button.dataset.action;
    if (action === 'temperature') {
      const slider = button as HTMLInputElement;
      void this.call('set_temperature', { temperature: Number(slider.value) });
    } else if (action === 'toggle') {
      void this.toggleKeepWarm();
    } else if (action === 'mode' && button.dataset.value) {
      void this.call('set_operation_mode', { operation_mode: button.dataset.value });
    } else if (action === 'power') {
      const operationMode = this.currentState() === 'off'
        ? this.config.power_on_mode ?? 'on'
        : this.config.power_off_mode ?? 'off';
      void this.call('set_operation_mode', { operation_mode: operationMode });
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

  private render(): void {
    if (!this.config) {
      this.root.innerHTML = `<style>${STYLE}</style><div class="card"><div class="error">Настройте entity чайника в редакторе карточки.</div></div>`;
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
    const sliderValue = Math.max(min, Math.min(max, target ?? max));
    const modes = this.config.show_modes ? normalizeModes(this.config.modes) : [];
    const operationMode = typeof attributes.operation_mode === 'string' ? attributes.operation_mode : state.state;
    const warmState = this.config.keep_warm_entity ? this._hass?.states[this.config.keep_warm_entity]?.state : undefined;
    const active = state.state !== 'off' && state.state !== 'unavailable';
    const modesMarkup = modes.length ? `<section><h3 class="section-title">Режимы</h3><div class="modes">${modes.map((mode) => `<button class="mode ${operationMode === mode.value ? 'selected' : ''}" data-action="mode" data-value="${escapeHtml(mode.value)}" aria-label="${escapeHtml(mode.label)}"><ha-icon class="mode-icon" icon="${safeIcon(mode.icon, 'mdi:tea')}"></ha-icon><span class="mode-label">${escapeHtml(mode.label)}</span></button>`).join('')}</div></section>` : '';
    const warmMarkup = this.config.keep_warm_entity ? `<button class="warm-row" data-action="toggle" aria-label="${escapeHtml(this.config.keep_warm_name)}"><span class="warm-content"><span class="warm-icon"><ha-icon class="small-icon" icon="mdi:snowflake-thermometer"></ha-icon></span><span class="warm-label">${escapeHtml(this.config.keep_warm_name)}</span></span><span class="toggle ${warmState === 'on' ? 'on' : ''}" aria-hidden="true"><span class="toggle-thumb"></span></span></button>` : '';
    const progress = this.sliderProgress(sliderValue, min, max);
    this.root.innerHTML = `<style>${STYLE}</style><article class="card"><header class="header"><span class="icon-bubble"><ha-icon class="device-icon" icon="${safeIcon(this.config.icon, DEFAULTS.icon)}"></ha-icon></span><div class="info"><h2>${escapeHtml(this.config.name)}</h2><p class="location">${escapeHtml(this.config.location)}</p></div><span class="status ${active ? 'active' : ''}">${escapeHtml(stateLabel(state.state))}</span></header><section class="temperatures"><div class="temperature"><span class="label">Текущая температура</span><strong class="value current">${formatTemperature(current)}</strong></div><span class="temperature-divider" aria-hidden="true"></span><div class="temperature target"><span class="label">Целевая температура</span><strong class="value" data-role="target-value">${formatTemperature(target)}</strong></div></section><section class="slider-section"><div class="slider-labels"><span>${formatTemperature(min)}</span><span>${formatTemperature(max)}</span></div><input aria-label="Целевая температура" data-action="temperature" type="range" min="${min}" max="${max}" step="1" value="${sliderValue}" style="--progress: ${progress}%"></section><button class="mode ${active ? 'selected' : ''}" data-action="power" aria-label="Включить или выключить чайник"><ha-icon class="mode-icon" icon="mdi:power"></ha-icon><span class="mode-label">Вкл/Выкл</span></button><div class="divider" aria-hidden="true"></div>${modesMarkup}${warmMarkup}</article>`;
  }
}

class StitchMintTealKettleCardEditor extends HTMLElement {
  private config: EditorConfig = {};
  private root: ShadowRoot;
  private boundChange: (event: Event) => void;
  private boundClick: (event: Event) => void;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.boundChange = (event) => this.handleChange(event);
    this.boundClick = (event) => this.handleClick(event);
  }

  connectedCallback(): void {
    this.root.addEventListener('change', this.boundChange);
    this.root.addEventListener('click', this.boundClick);
    this.render();
  }

  disconnectedCallback(): void {
    this.root.removeEventListener('change', this.boundChange);
    this.root.removeEventListener('click', this.boundClick);
  }

  setConfig(config: EditorConfig): void {
    this.config = { ...config, modes: normalizeModes(config.modes) };
    this.render();
  }

  set hass(_value: HomeAssistant) { /* редактор не зависит от состояния устройства */ }

  private emit(patch: EditorConfig): void {
    this.config = { ...this.config, ...patch };
    fireConfigChanged(this, this.config);
  }

  private handleChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const key = target.dataset.key as keyof EditorConfig | undefined;
    if (!key) return;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      this.emit({ [key]: target.checked });
    } else {
      this.emit({ [key]: target.value });
    }
  }

  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const action = target.closest<HTMLElement>('[data-editor-action]')?.dataset.editorAction;
    if (action === 'add-mode') {
      const modes = normalizeModes(this.config.modes);
      this.emit({ modes: [...modes, { label: 'Новый режим', value: `mode_${modes.length + 1}`, icon: 'mdi:tea' }] });
      this.render();
    }
    if (action?.startsWith('delete-mode-')) {
      const index = Number(action.slice('delete-mode-'.length));
      const modes = normalizeModes(this.config.modes).filter((_mode, modeIndex) => modeIndex !== index);
      this.emit({ modes });
      this.render();
    }
  }

  private render(): void {
    const modes = normalizeModes(this.config.modes);
    const modeRows = modes.map((mode, index) => `<div class="mode-row"><label>Название<input data-mode-index="${index}" data-mode-key="label" value="${escapeHtml(mode.label)}"></label><label>Значение<input data-mode-index="${index}" data-mode-key="value" value="${escapeHtml(mode.value)}"></label><label>Иконка<input data-mode-index="${index}" data-mode-key="icon" value="${escapeHtml(mode.icon ?? 'mdi:tea')}"></label><button class="secondary" type="button" data-editor-action="delete-mode-${index}" aria-label="Удалить режим">Удалить</button></div>`).join('');
    this.root.innerHTML = `<style>${EDITOR_STYLE}</style><div class="form"><label>Entity чайника *<input data-key="entity" placeholder="water_heater.kettle" value="${escapeHtml(this.config.entity ?? '')}"></label><span class="help">Укажите точный entity_id из Settings → Devices & services → Entities.</span><label>Название<input data-key="name" value="${escapeHtml(this.config.name ?? DEFAULTS.name)}"></label><label>Расположение<input data-key="location" value="${escapeHtml(this.config.location ?? DEFAULTS.location)}"></label><label>Иконка<input data-key="icon" value="${escapeHtml(this.config.icon ?? DEFAULTS.icon)}"></label><label class="checkbox"><input data-key="show_modes" type="checkbox" ${this.config.show_modes !== false ? 'checked' : ''}>Показывать режимы чая</label><label>Режим включения<input data-key="power_on_mode" value="${escapeHtml(this.config.power_on_mode ?? 'on')}"></label><label>Режим выключения<input data-key="power_off_mode" value="${escapeHtml(this.config.power_off_mode ?? 'off')}"></label><span class="help">Значения должны входить в attributes.operation_list у water_heater entity.</span><label>Entity поддержания тепла<input data-key="keep_warm_entity" placeholder="switch.kettle_keep_warm" value="${escapeHtml(this.config.keep_warm_entity ?? '')}"></label><label>Название поддержания тепла<input data-key="keep_warm_name" value="${escapeHtml(this.config.keep_warm_name ?? DEFAULTS.keep_warm_name)}"></label><fieldset><legend>Режимы чая</legend>${modeRows || '<span class="help">Режимы отключены или не заданы.</span>'}<button type="button" data-editor-action="add-mode">Добавить режим</button></fieldset></div>`;
    this.root.querySelectorAll<HTMLInputElement>('[data-mode-index]').forEach((input) => input.addEventListener('change', (event) => this.handleModeChange(event)));
  }

  private handleModeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const index = Number(input.dataset.modeIndex);
    const key = input.dataset.modeKey as keyof KettleMode;
    const modes = normalizeModes(this.config.modes).map((mode, modeIndex) => modeIndex === index ? { ...mode, [key]: input.value } : mode);
    this.emit({ modes });
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
    description: 'Карточка управления чайником water_heater в стиле Mint Teal.',
    preview: true,
  });
}
