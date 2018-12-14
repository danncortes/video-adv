import { isEnoughVisible, playVideo } from './video';
import { videoUi } from './videoUi';

it('should isEnoughVisible function return TRUE when the video is visible more than 50% in the viewPort', () => {
  const videoPosY = {
    top: 399
  };
  const windowHeight = 600;
  const videoHeight = 400;
  const isVisible = isEnoughVisible(videoPosY, windowHeight, videoHeight);

  expect(isVisible).toBe(true);
});

it('should isEnoughVisible function return FALSE when the video is visible less than 50% in the viewPort', () => {
  const videoPosY = {
    top: 401
  };
  const windowHeight = 600;
  const videoHeight = 400;
  const isVisible = isEnoughVisible(videoPosY, windowHeight, videoHeight);

  expect(isVisible).toBe(false);
});

it('Should playVideo function call the video.play() method', () => {
  const video = {
    play: () => { }
  }
  const spy = jest.spyOn(video, 'play').mockImplementation(() => null);
  const isPlaying = playVideo(video);

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);
})