//Get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer"),
  progress = player.querySelector(".progress"),
  progress_Bar = player.querySelector(".progress__filled"),
  toggle = player.querySelector(".toggle"),
  skip_Buttons = player.querySelectorAll("[data-skip]"),
  sliders = player.querySelectorAll(".player__slider"),
  fullscreen = player.querySelector(".fullscreen");
//build out functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  // console.log(video);
  // if(video.pause){
  //   console.log(video.pause);
  //   video.play()
  // }else{
  //   video.pause();
  // }
}
function updateButton(e){
  // console.log("updateButton",e)
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon
}
function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
  video[this.name] = this.value
}
function handleProgress(){
  const percent = (video.currentTime/video.duration)*100;
  progress_Bar.style.flexBasis = `${percent}%`;
}
function scrub(e){
  const scrub_Time = (e.offsetX / this.offsetWidth)*video.duration;
  video.currentTime = scrub_Time
}

function fullScreen(e){
  console.log('click',player.webkitRequestFullscreen)
  if(clickScreen){
    console.log('true',player)
    clickScreen = false;
    player.webkitRequestFullscreen()
  }else{
    console.log('false',player);
    clickScreen = true;
    document.webkitExitFullscreen()
    // exitFullscreen()
  }
}
//hook up the event listener
video.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
video.addEventListener('timeupdate',handleProgress)
toggle.addEventListener('click',togglePlay)
skip_Buttons.forEach(button=>button.addEventListener('click',skip))
sliders.forEach(range=>range.addEventListener('change',handleRangeUpdate))
sliders.forEach(range=>range.addEventListener('mousemove',handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(e)=> ()=>mousedown && scrub(e))
progress.addEventListener('mousedown',()=>mousedown=true)
progress.addEventListener('mouseup',()=>mousedown=false)
let clickScreen = true ;
fullscreen.addEventListener('click',fullScreen)
