document.querySelector('.slider__control').classList.remove('slider__control--hide');

const beforeBtn = document.getElementById('before-button');
const afterBtn = document.getElementById('after-button');
const beforeSlide = document.querySelector('.slider__item--before');
const afterSlide = document.querySelector('.slider__item--after');
const sliderControl = document.querySelector('.slider__control');
const sliderBar = document.querySelector('.slider__bar');
const sliderThumb = document.querySelector('.slider__thumb');
beforeBtn.addEventListener('click', function () {
  if (window.innerWidth < 768) {
    afterSlide.classList.remove('slider__item--current');
    beforeSlide.classList.add('slider__item--current');
    sliderThumb.style.marginLeft = '0';
  }
  else {
    sliderThumb.style.left = 0;
    changeSlide(0);
  }
});
afterBtn.addEventListener('click', function () {
  if (window.innerWidth < 768) {
    beforeSlide.classList.remove('slider__item--current');
    afterSlide.classList.add('slider__item--current');
    sliderThumb.style.marginLeft = 'auto';
  } else {
    sliderThumb.style.left = '100%';
    changeSlide(100);
  }
});

function checkCoords(coords) {
  let percents;
  let sliderBarStart = sliderBar.offsetLeft;
  let sliderBarWidth = sliderBar.offsetWidth;
  let sliderBarEnd = sliderBarWidth + sliderBarStart;
  if (coords >= sliderBarStart && coords <= sliderBarEnd) {
    percents = Math.round((coords - sliderBarStart) * 100 / sliderBarWidth);
  moveThumb(percents);

  }
}
function moveThumb(percents) {
  sliderThumb.style.left = percents + '%';
  changeSlide(percents);
}
function changeSlide(percents) {
  beforeSlide.style.width = 100 - percents + "%"
  afterSlide.style.width = percents + "%"
}

sliderControl.addEventListener('pointerdown', function() {
  checkCoords(event.pageX);
  sliderControl.addEventListener('pointermove',trackThumb)
}, false);

window.addEventListener('pointerup', function(){
  sliderControl.removeEventListener('pointermove', trackThumb)
})

function trackThumb(e){
    checkCoords(e.pageX)
}
