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
const fadeInTime = 1000;
const delay = 800;

// animations library
const fadeIn = [
  { opacity: 0 },
  { opacity: 1 }
]

const blurFadeIn = [
  { opacity: 0, filter: 'blur(10px)'},
  { opacity: 1, offset: 0.7},
  { opacity: 1, filter: 'blur(0px)'}
]

// temporal settings
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
    anim = vid.animate(blurFadeIn, fadeInSettings);
    
  })
});


