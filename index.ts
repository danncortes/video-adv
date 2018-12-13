import './styles.scss';

let isPlaying: boolean = false;
const video = <HTMLVideoElement>document.getElementById('video');
let setIntervalVideo: any;
let viewTimeout: number;
let justStarted: boolean = false;
let isInTheViewport: boolean = false;
let startedTrack: boolean = false;
let muted: boolean = true;
const windowHeight: number = document.documentElement.clientHeight;
const muteIcon = document.querySelector('.icon');

function playVideo(): void {
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
  }
}

function pauseVideo(): void {
  // We check the global variable 'isPlaying' to avoid call video.pause() more than once
  if (isPlaying) {
    video.pause();
    isPlaying = false;
    // We clear the setInterval to stop checking the percentage progress
    clearInterval(setIntervalVideo);
  }
}

function startAdv(): void {
  document.addEventListener('scroll', () => {
    const videoPosY: object = video.getBoundingClientRect();
    // Everytime the user scroll, we check wheter the video is enough visible, more than 50%
    const videoIsVisible: boolean = isEnoughVisible(videoPosY, windowHeight);
    if (videoIsVisible) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  // Toggle event for mute and unmute
  video.addEventListener('click', (ev) => {
    muted = !muted;
    const eventElement = <HTMLAudioElement>ev.target;
    eventElement.muted = muted;

    //Toggle class in order to show the proper icon sound
    if (!muted) {
      muteIcon.classList.remove('muted');
      muteIcon.className += ' ' + 'unmuted';
    } else {
      muteIcon.classList.remove('unmuted');
      muteIcon.className += ' ' + 'muted';
    }
  })
}

function listenProgress(video): void {
  let currentPercentage = Math.round(video.currentTime * 100 / video.duration);
  if (currentPercentage === 25 || currentPercentage === 50 || currentPercentage === 75) {
    console.log(`${currentPercentage}% Played`);
  }
  if (currentPercentage >= 99) {
    console.log(`100% Played`);
    // Uncomment this if we want to run the percentage played log just one round
    // clearInterval(setIntervalVideo)
  }
  if (Math.round(video.currentTime) === 1 && justStarted === false) {
    console.log('Video Started');
    justStarted = true;
  }
};

function isEnoughVisible(videoPosY, windowHeight: number): boolean {
  let isVisible = false;
  if (videoPosY.top > 0) {
    isVisible = (windowHeight - videoPosY.top) > (video.offsetHeight / 2);
  } else {
    isVisible = Math.abs(videoPosY.top) < (video.offsetHeight / 2);
  }
  checkViewability(isVisible);
  return isVisible;
}

function checkViewability(isVisible): void {
  if (isVisible) {
    if (!isInTheViewport && !startedTrack) {
      startedTrack = true;
      viewTimeout = setTimeout(() => {
        console.log('Visible on the ViewPort');
        clearTimeout(viewTimeout);
        isInTheViewport = true;
        startedTrack = true;
      }, 2000)
    }
  } else {
    startedTrack = false;
    clearTimeout(viewTimeout);
  }
}

startAdv()