
//source: https://www.cssscript.com/demo/minimal-hsla-color-picker-pure-javascript/
//og source: https://github.com/lizthrilla/color-picker

let hue = 130;
let sat = 100;
let light = 55;
let alpha = 1;

//styles for slider thumbs
let hueS = document.createElement("style");
let satS = document.createElement("style");
let lightS = document.createElement("style");
document.head.appendChild(hueS);
document.head.appendChild(satS);
document.head.appendChild(lightS);

const setHueThumb = () => {
    hueS.textContent = `.hue-slider .slider::-webkit-slider-thumb{background: hsla(${hue}, 100%, 55%, 1) }
        .hue-slider .slider::-webkit-slider-thumb{background: hsla(hsla(${hue}, 100%, 55%, 1) }`
}

const setLightThumb = () => {
    lightS.textContent = `.light-slider .slider::-webkit-slider-thumb{background: hsla(0, 0%, ${light}%, 1) }
    .light-slider .slider::-webkit-slider-thumb{background: hsla(0, 0%, ${light}%, 1) }`
}

const setSatThumb = () => {
    satS.textContent = `.saturation-slider .slider::-webkit-slider-thumb{background: ${getHSL()} }
    .saturation-slider .slider::-webkit-slider-thumb{background: ${getHSL()} }`
}

const colorChange = () => {
  //document.querySelector('.colorname').textContent = getHSL()
  const swatch = document.querySelector('#color-result div');
  swatch.style.backgroundColor = getHSL();
  document.querySelector('.saturation-slider').style.backgroundColor = `hsla(${hue}, 100%, 55%, 1)`
}

//hsl (128,100 %, 50 %)
const getHSL = () => {
  return `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`
}

const main = () => {
  const hueInput = document.querySelector('input[name=hue]')
  hueInput.addEventListener('input', () => {
    hue = hueInput.value
    //console.log(getHSL())
    colorChange()
    setHueThumb()
    setSatThumb()
  })

  const satInput = document.querySelector('input[name=sat]')
  satInput.addEventListener('input', () => {
    sat = satInput.value
    //console.log(getHSL())
    colorChange()
    setSatThumb()
  })

  const lightInput = document.querySelector('input[name=light]')
  lightInput.addEventListener('input', () => {
    light = lightInput.value
    //console.log(getHSL())
    colorChange()
    setLightThumb()
  });

/*
  const alphaInput = document.querySelector('input[name=alpha]')
  alphaInput.addEventListener('input', () => {
    alpha = alphaInput.value
    console.log(getHSL())
    colorChange()
  });
*/

  colorChange()
  setHueThumb()
  setLightThumb()
  setSatThumb()
}

document.addEventListener('DOMContentLoaded', main)
