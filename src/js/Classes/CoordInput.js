import createElement from '../../utils/CreateElement';
import Tooltip from './Tooltip';
import coordsValidate from '../../utils/coordsValidate';

export default class CoordInput {
  constructor() {
    this._onClick = this._onClick.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onInput = this._onInput.bind(this);
    this._removeEl = this._removeEl.bind(this);
    this.tooltip = new Tooltip();
  }

  getCoordsFromForm() {
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      this._init();
    });
  }

  _init() {
    const back = createElement('div', 'geo-err-back');
    const container = createElement('div', 'geo-err-container');

    const header = createElement('header', 'geo-err-header', 'Что-то пошло не так');
    container.append(header);

    const message = createElement(
      'div',
      'geo-err-message',
      'К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.',
    );
    container.append(message);

    const label = createElement('div', 'geo-err-label', 'Широта и долгота через запятую');
    container.append(label);

    const form = createElement('form', 'geo-err-form');

    const input = createElement('input', 'geo-err-textarea');
    input.name = 'Coordinates input field';
    input.setAttribute('aria-label', 'Coordinates input field');
    form.append(input);

    const actions = createElement('div', 'geo-err-actions');
    const okBtn = createElement('button', 'geo-err-ok btn', 'ОК');
    okBtn.type = 'submit';
    actions.append(okBtn);

    const cancelBtn = createElement('button', 'geo-err-cancel btn', 'Отмена');
    cancelBtn.type = 'button';
    actions.append(cancelBtn);

    form.append(actions);
    container.append(form);
    back.append(container);
    this.form = form;
    this.input = input;
    this.el = back;
    this._eventListeners();
    document.body.append(back);
    this.input.focus();
  }

  _onSubmit(e) {
    e.preventDefault();

    if (!this.input.value.trim()) {
      this.input.classList.add('bad-status');
      return;
    }

    const value = this.input.value.trim();

    try {
      const { latitude, longitude } = coordsValidate(value);
      this._resolve(`[${latitude}, ${longitude}]`);
      this._removeEl();
    } catch (err) {
      this.tooltip.show(this.form, err.message);
      this.input.classList.add('bad-status');
      return;
    }
  }

  _onClick(e) {
    if (!e.target.closest('.geo-err-container') || e.target.closest('.geo-err-cancel')) {
      this._reject(new Error('Canceled by User'));
      this._removeEl();
      return;
    }
  }

  _onInput(e) {
    if (e.target.value.trim()) {
      e.target.classList.remove('bad-status');
      this.tooltip.hide();
    }
  }

  _eventListeners() {
    this.form.addEventListener('submit', this._onSubmit);
    this.input.addEventListener('input', this._onInput);
    this.el.addEventListener('click', this._onClick);
  }

  _removeEl() {
    this.form.removeEventListener('submit', this._onSubmit);
    this.input.removeEventListener('input', this._onInput);
    this.el.removeEventListener('click', this._onClick);
    this.el.remove();
  }
}
