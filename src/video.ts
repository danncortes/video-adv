let isPlaying: boolean = false;
let setIntervalVideo: any;
let setIntervalProgress: any;
let viewTimeout: number;
let justStarted: boolean = false;
let isInTheViewport: boolean = false;
let startedTrack: boolean = false;
let muted: boolean = true;
const windowHeight: number = document.documentElement.clientHeight;

/**
 * @function playVideo
 * Play the video and checking percentage progress
 * @returns {boolean}
 */
export function playVideo(video, progressBar): boolean {
  // The interval is how long could it take reproduce 1% --> video.duration * 1000 / 100
  const intervalDuration: number = video.duration * 10;
  // We check the global variable 'isPLaying' to avoid call video.play() more than once
  if (!isPlaying) {
    video.play();
    isPlaying = true;
    // Everytime the video es playing we are checking the percentage progress
    setIntervalVideo = setInterval(() => {
      listenProgress(video);
    }, intervalDuration);

    progressBar.style.opacity = '0.3';
    setIntervalProgress = setInterval(() => {
      const videoWidth = video.offsetWidth;
      const percentageBar = (video.currentTime * 100) / video.duration;
      progressBar.style.width = `${percentageBar}%`;
    }, 1);
  }
  return isPlaying;
}

/**
 * @function pauseVideo
 * Pause the video and stop checking percentage progress
 * @returns {boolean}
 */
export function pauseVideo(video, progressBar): boolean {
  // We check the global variable 'isPlaying' to avoid call video.pause() more than once
  if (isPlaying) {
    video.pause();
    isPlaying = false;
    // We clear the setInterval to stop checking the percentage progress
    clearInterval(setIntervalVideo);
    progressBar.style.opacity = '0';
    clearInterval(setIntervalProgress);
  }
  return isPlaying;
}

/**
 * @function startAdv
 * Main method for listening the user's scroll event
 */
export function startAdv(video): void {
  const progressBar = document.querySelector('.progressBar');
  document.addEventListener('scroll', () => {
    const videoPosY: object = video.getBoundingClientRect();
    const videoHeight = video.offsetHeight;
    // Everytime the user scroll, we check wheter the video is enough visible, more than 50%
    const videoIsVisible: boolean = isEnoughVisible(
      videoPosY,
      windowHeight,
      videoHeight,
    );
    if (videoIsVisible) {
      playVideo(video, progressBar);
    } else {
      pauseVideo(video, progressBar);
    }
  });

  video.addEventListener('click', onClickVideo);
}

/**
 * @function onClickVideo
 * Toggle event for mute and unmute video
 */
export function onClickVideo(ev) {
  const muteIcon = document.querySelector('.icon');
  muted = !muted;
  const eventElement = <HTMLAudioElement>ev.target;
  eventElement.muted = muted;

  // Toggle class in order to show the proper icon sound
  if (!muted) {
    muteIcon.classList.remove('muted');
    muteIcon.className += ' ' + 'unmuted';
  } else {
    muteIcon.classList.remove('unmuted');
    muteIcon.className += ' ' + 'muted';
  }
}

/**
 * @function listenProgress
 * Catch the percentage and show a console message depends on the percentages
 * @param video
 */
export function listenProgress(video): void {
  const currentPercentage = Math.round(
    (video.currentTime * 100) / video.duration,
  );

  if (
    currentPercentage === 25
    || currentPercentage === 50
    || currentPercentage === 75
  ) {
    console.log(`${currentPercentage}% Played`);
  }
  if (currentPercentage >= 99) {
    console.log('100% Played');
    // Uncomment this if we want to run the percentage played log just one round
    // clearInterval(setIntervalVideo)
  }
  // If the video at least is played 1 second we show a message only once
  if (Math.round(video.currentTime) === 1 && justStarted === false) {
    console.log('Video Started');
    justStarted = true;
  }
}

/**
 * @function isEnoughVisible
 * Detect when the video in at least more than 50% of its height visible in the viewport area
 * @param {object} videoPosY
 * @param {number} windowHeight
 * @returns {boolean}
 */
export function isEnoughVisible(
  videoPosY,
  windowHeight: number,
  videoHeight: number,
): boolean {
  let isVisible = false;
  if (videoPosY.top > 0) {
    isVisible = windowHeight - videoPosY.top > videoHeight / 2;
  } else {
    isVisible = Math.abs(videoPosY.top) < videoHeight / 2;
  }
  checkViewability(isVisible);
  return isVisible;
}

/**
 * @function checkViewability
 * Check if the video is visible in the viewport area for 2 continuos seconds
 * @param {boolean} isVisible
 */
export function checkViewability(isVisible: boolean): void {
  if (isVisible) {
    if (!isInTheViewport && !startedTrack) {
      startedTrack = true;
      viewTimeout = setTimeout(() => {
        console.log('Visible in the ViewPort area');
        clearTimeout(viewTimeout);
        isInTheViewport = true;
      }, 2000);
    }
  } else {
    startedTrack = false;
    clearTimeout(viewTimeout);
  }
}
