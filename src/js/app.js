import Feed from './Classes/Feed';

document.addEventListener('DOMContentLoaded', () => {
  const mainBody = document.querySelector('.main-body');

  const timelineList = mainBody.querySelector('.timeline-list');
  const inputContainer = mainBody.querySelector('.input-container');
  const inputField = inputContainer.querySelector('.input-field');

  const feed = new Feed(timelineList);

  mainBody.addEventListener('click', (e) => {
    if (!e.target.closest('.timeline-list')) return;

    if (e.target.closest('.timeline-geo-hide')) {
      feed.toggleVisibilityGeo(e);
    }
  });

  inputField.addEventListener('input', (e) => {
    if (e.target.innerText.trim()) {
      inputContainer.classList.remove('bad-status');
    }
  });

  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (!e.target.innerText.trim()) {
        inputContainer.classList.add('bad-status');
      } else {
        feed
          .createPost(e.target.innerText.trim(), 'text')
          .then(() => {
            e.target.innerText = '';
          })
          .catch(() => {
            return;
          });
      }
    }
  });
});
