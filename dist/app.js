/* ============
ANIMATIONS 
=============== */

// Classes definition

class Settings {
  constructor(duration, iterations, delay, fill, easing) {
    this.duration = duration;
    this.iterations = iterations;
    this.delay = delay;
    this.fill = fill;
    this.easing = easing;
  }
}

// globals
let anim; // will progressively by assigned each anim step
// customize parameters here:
const fadeInTime = 200; //1000
const delay = 100; //800

/* animations library */
const fadeIn = [
  { opacity: 0 },
  { opacity: 1 }
]

// hero key words
const blurFadeIn = [
  { opacity: 0, filter: 'blur(10px)'},
  { opacity: 1, offset: 0.7},
  { opacity: 1, filter: 'blur(0px)'}
]

// video
const blurSepiaFadeIn = [
  { opacity: 0, filter: 'blur(10px) sepia(150%)'},
  { opacity: 1, offset: 0.7},
  { opacity: 1, filter: 'blur(0px) sepia(0%)'}
]

// navbar
const slideDown = [
  { transform: 'translateY(-10rem)'},
  { transform: 'translateY(0rem)'}
]

// footer
const slideUp = [
  { transform: 'translateY(4rem)'},
  { transform: 'translateY(0rem)'}
]

const fadeOut = [
  { opacity: 1 },
  { opacity: 0 }
]

// default temporal settings
let fadeInSettings = new Settings(fadeInTime, 1, 0, 'forwards', 'ease-in');

// hero key text fade in
// get elements 
const heroKeywords = document.querySelectorAll('#hero-text .hero-keywords');
// launch anim on each element
heroKeywords.forEach(function (text) {
  anim = text.animate(blurFadeIn, fadeInSettings);
  fadeInSettings.delay += delay;
});

// hero 'white' text fade in after above is complete
// waiting for above anim to finish 1st:
anim.finished.then(() => {
  console.log('animation1 finished');
  const heroText = document.querySelectorAll('.hero-text__white');
  heroText.forEach(function (text) {
    fadeInSettings.delay = 0; // resetting the offset (all text must appear immediately after previous anim)
    anim = text.animate(fadeIn, fadeInSettings); // re-assigning anim so that next animation awaits this one
  });
  // nesting within the promise the next animation. !!you have to nest the next then inside the previous then !!
  // cta btn fade in
  anim.finished.then(() => {
  console.log('animation2 finished');
  const ctaBtn = document.getElementById('cta');
  ctaBtn.animate(fadeIn, fadeInSettings);
  });
  // at the same time, bg vid fades in
  anim.finished.then(() => {
    const vid = document.querySelector('video');
    fadeInSettings = new Settings(fadeInTime*2, 1, 0, 'forwards', 'ease-in');
    anim = vid.animate(blurSepiaFadeIn, fadeInSettings);
    
  })
});

// EVENT HANDLER

// clicking cta btn (sliding in navbar & bottom overlay)
const ctaBtn = document.getElementById('cta');
ctaBtn.addEventListener('click', function(e) {
  // sliding in nav & footer
  const slideInTime = new Settings(700, 1, 0, 'forwards', 'ease-in-out');
  document.querySelector('header').animate(slideDown, slideInTime);
  document.querySelector('#slanted-header').animate(slideDown, slideInTime);
  document.querySelector('footer').animate(slideUp, slideInTime);
  // fading out cta btn
  let anim2 = ctaBtn.animate(fadeOut, slideInTime);
  anim2.finished.then(() => ctaBtn.style.visibility = 'hidden');
  console.log(e.target);
  e.preventDefault;
})

