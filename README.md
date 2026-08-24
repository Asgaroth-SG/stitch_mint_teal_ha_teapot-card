# Mint Teal — карточка чайника для Home Assistant

Custom Lovelace/HACS card по макету `reference/screen.png`: температура, целевая температура, режимы чая и поддержание тепла.

## Поддерживаемые сущности

- Основная: `water_heater.*`.
- Поддержание тепла: опционально `switch.*` или `input_boolean.*`.
- Используются стандартные действия Home Assistant: `water_heater.set_temperature`, `water_heater.set_operation_mode`, `water_heater.turn_on`, `water_heater.turn_off`, а для companion entity — `turn_on`/`turn_off`.

Карточка не выводит и не угадывает entity ID по названию устройства.

Для HACS dashboard/plugin репозиторий должен содержать JS-файл `dist/stitch-mint-teal-kettle-card.js`, совпадающий с именем из `hacs.json`. Имя репозитория намеренно оставлено как `stitch_mint_teal_ha_teapot-card`.

## Установка вручную

1. Скопируйте `dist/stitch-mint-teal-kettle-card.js` в `/config/www/`.
2. Добавьте ресурс в Lovelace:

```yaml
lovelace:
  resources:
    - url: /local/stitch-mint-teal-kettle-card.js
      type: module
```

3. Выполните hard refresh браузера (`Ctrl+F5`).

Для HACS используйте этот репозиторий как Lovelace plugin; файл в `dist/` должен называться `stitch_mint_teal_ha_teapot-card.js`.

## Пример YAML

```yaml
type: custom:stitch-mint-teal-kettle-card
entity: water_heater.REPLACE_WITH_EXACT_ENTITY_ID
name: Чайник
location: Кухня
icon: mdi:kettle-steam
show_modes: true
keep_warm_entity: switch.REPLACE_WITH_KEEP_WARM_ENTITY
keep_warm_name: Поддержание тепла
modes:
  - label: Белый чай
    value: white_tea
    icon: mdi:tea
  - label: Зелёный чай
    value: green_tea
    icon: mdi:tea
  - label: Красный чай
    value: red_tea
    icon: mdi:tea
  - label: Травяной чай
    value: herbal_tea
    icon: mdi:leaf
  - label: Цветочный
    value: flower_tea
    icon: mdi:flower
  - label: Пуэр
    value: puerh_tea
    icon: mdi:tea
  - label: Улун
    value: oolong_tea
    icon: mdi:tea
  - label: Чёрный чай
    value: black_tea
    icon: mdi:tea
```

Замените оба placeholder на entity ID из **Настройки → Устройства и службы → Сущности**. Если у устройства нет отдельной сущности поддержания тепла, удалите `keep_warm_entity` и `keep_warm_name`.

## Визуальный редактор

После добавления карточки через UI доступны `entity`, название, расположение, MDI-иконка, видимость режимов, entity поддержания тепла и редактирование списка чайных режимов.

Значения `modes[].value` должны совпадать с фактическими значениями `operation_list` основной `water_heater` entity. Русские подписи меняют только отображение.

## Сборка

```bash
npm install
npm run typecheck
npm run build
```

Готовый bundle создаётся в `dist/stitch-mint-teal-kettle-card.js`.

## Проверка

`test/mock-browser.html` — disposable mock-проверка рендера и payload стандартных действий. Она не является ресурсом Home Assistant.

Локальная сборка и mock не подтверждают поддержку конкретной модели чайника. Перед использованием проверьте `state`, `current_temperature`, `temperature`, `operation_mode` и `operation_list` в Developer Tools → States.
