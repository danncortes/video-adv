import { isEnoughVisible } from './index';
import { videoUi } from './videoUi';

it('my test', () => {
  document.body.innerHTML =
    `<div class="video-frame">
      <span>Advertising</span>
      ${videoUi('https://cdn.yoc.com/ad/demo/airbnb.mp4')}
    </div>`

  const video = <HTMLVideoElement>document.querySelector('#video')
  const spy = jest.spyOn(video, 'play').mockImplementation(() => null)
  const isPlaying = video.play();

  console.log(spy)
  expect(spy).toHaveBeenCalled();
})