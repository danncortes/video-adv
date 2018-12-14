import { isEnoughVisible } from './index';

it('my test', () => {
  document.body.innerHTML =
    `<div class="video-frame">
      <span > Advertising </span>
      <section>
        <figure class="icon muted"></figure>
        <video id="video" loop muted>
          <source src="https://cdn.yoc.com/ad/demo/airbnb.mp4" type = "video/mp4">
        </video>
      </section>
    </div>`

  const video = <HTMLVideoElement>document.querySelector('#video')
  const spy = jest.spyOn(video, 'play').mockImplementation(() => null)
  const isPlaying = video.play();

  console.log(spy)
  expect(spy).toHaveBeenCalled();
})