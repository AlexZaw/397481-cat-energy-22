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

sliderControl.addEventListener('mousedown', getCoords);

function getCoords(e) {
  let coords;
  let sliderBarStart = sliderBar.offsetLeft;
  sliderBarWidth = sliderBar.offsetWidth;
  let sliderBarEnd = sliderBarWidth + sliderBarStart;
  if (e.pageX >= sliderBarStart && e.pageX <= sliderBarEnd) {
    coords = Math.round((e.pageX - sliderBarStart) * 100 / sliderBarWidth);
    moveThumb(coords);
  }
}
function moveThumb(percent){
  sliderThumb.style.left = percent + '%';
  changeSlide(percent);
}
function changeSlide(percent) {
  beforeSlide.style.width = 100 - percent + "%"
  afterSlide.style.width = percent + "%"
}
