import {
  isEnoughVisible,
  playVideo,
  pauseVideo,
  listenProgress
} from './video';

const progressBar = { style: { opacity: 0 } };

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
    play: () => {}
  };
  let isPlaying = false;
  const spy = jest.spyOn(video, 'play').mockImplementation(() => null);
  isPlaying = playVideo(video, progressBar);
  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);
});

it('Should pauseVideo function call the video.pause() method', () => {
  const video = {
    pause: () => {}
  };
  let isPlaying = true;
  const spy = jest.spyOn(video, 'pause').mockImplementation(() => null);
  isPlaying = pauseVideo(video, progressBar);
  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(false);
});

describe('Console.log tests', () => {
  const video = {
    duration: 100,
    currentTime: 0
  };

  it('Should call console.log when the video is played 1%', () => {
    video.currentTime = 1;
    const customConsole = console;
    const spy = jest.spyOn(customConsole, 'log').mockImplementation(() => null);
    listenProgress(video);
    expect(spy).toHaveBeenCalled();
  });

  it('Should call console.log when the video is played 25%', () => {
    video.currentTime = 25;
    const customConsole = console;
    const spy = jest.spyOn(customConsole, 'log').mockImplementation(() => null);
    listenProgress(video);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('Should call console.log when the video is played 50%', () => {
    video.currentTime = 50;
    const customConsole = console;
    const spy = jest.spyOn(customConsole, 'log').mockImplementation(() => null);
    listenProgress(video);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('Should call console.log when the video is played 75%', () => {
    video.currentTime = 75;
    const customConsole = console;
    const spy = jest.spyOn(customConsole, 'log').mockImplementation(() => null);
    listenProgress(video);
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('Should call console.log when the video is played 100%', () => {
    video.currentTime = 100;
    const customConsole = console;
    const spy = jest.spyOn(customConsole, 'log').mockImplementation(() => null);
    listenProgress(video);
    expect(spy).toHaveBeenCalledTimes(5);
  });
});
