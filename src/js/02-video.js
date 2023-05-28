import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('#vimeo-player');

const player = new Player(iframeEl);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.setCurrentTime(Number(localStorage.getItem(LOCALSTORAGE_KEY)));

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  localStorage.setItem(LOCALSTORAGE_KEY, `${data.seconds}`);
}
