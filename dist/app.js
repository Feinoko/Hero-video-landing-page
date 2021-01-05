/* ============
ANIMATIONS 
=============== */

// Classes definition

class Settings {
  constructor(duration, iterations, delay, fill) {
    this.duration = duration;
    this.iterations = iterations;
    this.delay = delay;
    this.fill = fill;
  }
}

// globals
let anim; // will progressively by assigned each anim step
let anim2;
// customize parameters here:
const fadeInTime = 1500;
const delay = 800;

// animations library
const fadeIn = [
  { opacity: 0 },
  { opacity: 1 }
]

// temporal settings
let fadeInSettings = new Settings(fadeInTime, 1, 0, 'forwards');

// hero key text fade in
// get elements 
const heroKeywords = document.querySelectorAll('#hero-text .hero-keywords');
// launch anim on each element
heroKeywords.forEach(function (text) {
  anim = text.animate(fadeIn, fadeInSettings);
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
  // nesting within the promise the next animation !! you have to nest the next then inside the previous then !!
  // cta btn fade in
  anim.finished.then(() => {
  console.log('animation2 finished');
  const ctaBtn = document.getElementById('cta');
  anim = ctaBtn.animate(fadeIn, fadeInSettings);
  });
});

// cta btn fade in

