// ANIMATIONS

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
const heroText = document.querySelectorAll('#hero-text span');

// animations library
const fadeIn = [
  { opacity: 0 },
  { opacity: 1 }
]

// temporal settings
let fadeInSettings = new Settings(1500, 1, 0, 'forwards');


  //   duration: 1500,
//   iterations: 1,
//   delay: Math.random() * 500,
//   fill: 'forwards'
// }

// function randomizeStartFadeInSettings() {
//   fadeInSettings = {
//     duration: 2000,
//     iterations: 1,
//     delay: Math.random() * 800,
//     fill: 'forwards'
//   }
// }

// // hero text fadein
// const heroTextAnim = heroText.animate(fadeIn, fadeInSettings);


heroText.forEach(function (text) {
  // randomizeStartFadeInSettings();
  text.animate(fadeIn, fadeInSettings);
  fadeInSettings.delay += 800;
});

