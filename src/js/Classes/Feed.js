import createElement from '../../utils/CreateElement';
import formatDate from '../../utils/formatDate';
import geoReq from '../../utils/geolocationRequest';
import CoordInput from './CoordInput';

export default class Feed {
  constructor(listEl) {
    this.listEl = listEl;
  }

  _updateLine() {
    const line = document.querySelector('.line');

    const items = this.listEl.querySelectorAll('li');
    if (!items.length) return;

    const first = items[0].getBoundingClientRect();
    const last = items[items.length - 1].getBoundingClientRect();
    const container = this.listEl.getBoundingClientRect();

    const firstCenter = first.top - container.top + 20 + 15 + 20;
    const lastCenter = last.top - container.top + 20 + 15 + 20;

    line.style.border = '2px solid gray';
    line.style.height = lastCenter - firstCenter + 'px';
  }

  async createPost(content, type) {
    try {
      const coords = await geoReq();
      this._createPostChoice(content, type, coords);
      /* eslint-disable no-unused-vars */
    } catch (err) {
      const coordsInput = new CoordInput();
      // eslint-disable-next-line no-useless-catch
      try {
        const coords = await coordsInput.getCoordsFromForm();
        this._createPostChoice(content, type, coords);
      } catch (err) {
        throw err;
      }
    }
  }

  _createPostChoice(content, type, coords) {
    switch (type) {
      case 'text':
        this.addText(content, coords);
        break;
      case 'audio':
        this.addAudio(content, coords);
        break;
      case 'video':
        this.addVideo(content, coords);
        break;
    }
  }

  /* eslint-disable no-unused-vars */
  _insertToDB(data) {
    return true;
  }

  addText(text, coords) {
    if (
      !this._insertToDB({
        type: 'text',
        data: text,
        coords: coords,
      })
    ) {
      return;
    }

    const elem = createElement('li', 'timeline');

    const circle = createElement('div', 'timeline-circle');
    elem.append(circle);

    const content = createElement('div', 'timeline-content');

    const timelineText = createElement('div', 'timeline-text hide');
    timelineText.textContent = text;
    content.append(timelineText);

    const timelineTime = createElement('div', 'timeline-time');
    timelineTime.textContent = formatDate();
    content.append(timelineTime);

    elem.append(content);

    const geoMain = createElement('div', 'timeline-geo hide');

    const geoText = createElement('div', 'timeline-geo-text');
    geoText.dataset.value = coords;
    geoText.textContent = '•'.repeat(geoText.dataset.value.length);
    geoMain.append(geoText);

    const geoHide = createElement('div', 'timeline-geo-hide');
    const eye = createElement('i', 'fa-solid fa-eye');
    const eyeSlash = createElement('i', 'fa-solid fa-eye-slash');
    geoHide.append(eye);
    geoHide.append(eyeSlash);
    geoMain.append(geoHide);

    elem.append(geoMain);
    this.listEl.prepend(elem);
    this._updateLine();
  }

  addAudio() {}

  addVideo() {}

  toggleVisibilityGeo(e) {
    const geoMain = e.target.closest('.timeline-geo');
    const geoText = geoMain.querySelector('.timeline-geo-text');

    if (geoMain.classList.contains('hide')) {
      geoText.textContent = geoText.dataset.value;
      geoMain.classList.remove('hide');
    } else {
      geoText.textContent = '•'.repeat(geoText.dataset.value.length);
      geoMain.classList.add('hide');
    }
  }
}
