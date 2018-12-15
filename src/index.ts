import './styles.scss';
import { videoUi } from './videoUi';
import { startAdv } from './video';

const videoFrame = document.querySelector('.video-frame');

if (videoFrame) {
  videoFrame.insertAdjacentHTML('beforeend', videoUi('https://cdn.yoc.com/ad/demo/airbnb.mp4'))
}

const video = <HTMLVideoElement>document.getElementById('video');

startAdv(video);