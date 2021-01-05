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

// get elements
const heroKeyWords = document.querySelectorAll('#hero-text span');
let anim; // placeholder animation

// animations library
const fadeIn = [
  { opacity: 0 },
  { opacity: 1 }
]

// temporal settings
let fadeInSettings = new Settings(1500, 1, 0, 'forwards');

// hero highlight text fade in
heroKeyWords.forEach(function (text) {
  anim = text.animate(fadeIn, fadeInSettings);
  fadeInSettings.delay += 800;
});

// hero 'white' text fade in after above is complete
// waiting for above anim to finish 1st:
anim.finished.then(() => {
  // console.log('completed 1st anim');
  const heroText = document.querySelector('#hero-text :not(span)');
  heroText.remove();

})
