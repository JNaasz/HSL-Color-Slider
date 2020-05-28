//(function () {

    /*
     reference colors: https://www.w3schools.com/colors/colors_converter.asp
     RGB : RGB -> HSL / RGB -> HEX
     HEX : Hex -> HSL / Hex -> RGB
     HSL : HSL -> RGB / HSL -> HEX
    */
  
    const regex = /(?:rgb\(|hsl\()|\)|\s|#/g;
  
    //RGB CONVERSIONS
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
  
    const rgbToHex = (values) => {
      if (values[0] > 255 || values[1] > 255 || values[2] > 255)
        throw "Invalid color component";
      return "#" + componentToHex(values[0]) + componentToHex(values[1]) + componentToHex(values[2]);
    }
  
    const rgbToHsl = (values) => {
      let r = values[0], g = values[1], b = values[2];
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
  
      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
  
      return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
    }
  
    //HEX CONVERSIONS
    const hexToRgb = (value) => {
      value = value.replace(/#/g, '');
      var r = parseInt(value.substring(0, 2), 16);
      var g = parseInt(value.substring(2, 4), 16);
      var b = parseInt(value.substring(4, 6), 16);
      return [r, g, b];
    }
  
    const hexToHsl = (value) => {
      //must first conver to rgb
      const rgb = hexToRgb(value);
      const hsl = rgbToHsl(rgb);
      return hsl;
    }
  
    //HSL CONVERSIONS
    const hueToRgb = (t1, t2, hue) => {
      if (hue < 0) hue += 6;
      if (hue >= 6) hue -= 6;
      if (hue < 1) return (t2 - t1) * hue + t1;
      else if (hue < 3) return t2;
      else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
      else return t1;
    }
  
    const hslToRgb = (values) => {
      //[hue, sat, light]
      const hue = values[0] / 60;
      const sat = values[1] / 100;
      const light = values[2] / 100;
  
      var t1, t2, r, g, b;
      if (light <= 0.5) {
        t2 = light * (sat + 1);
      } else {
        t2 = light + sat - (light * sat);
      }
      t1 = light * 2 - t2;
      r = hueToRgb(t1, t2, hue + 2) * 255;
      g = hueToRgb(t1, t2, hue) * 255;
      b = hueToRgb(t1, t2, hue - 2) * 255;
      return [Math.round(r), Math.round(g), Math.round(b)];
    }
  
    const hslToHex = (values) => {
      const rgb = hslToRgb(values);
      const hex = rgbToHex(rgb);
      return hex;
    }
  
  
    //TEST VALUE CONVERSIONS:
    //deep sky blue
    const rgbVal = 'RGB(0, 191, 255)';
    const hexVal = '#00bfff';
    const hslVal = 'hsl(195, 100%, 50%)';
  
    function testRgbConversions() {
      const rgb = rgbVal.toLowerCase().replace(regex, '').split(',').map((v) => parseInt(v));
      const hex = rgbToHex(rgb);
      const hsl = rgbToHsl(rgb);
      console.log(rgb, hex, hsl);
    }
  
    function testHexConversions() {
      const rgb = hexToRgb(hexVal);
      const hsl = hexToHsl(hexVal);
      console.log(hexVal, rgb, hsl);
    }
  
    function testHslConversions() {
      const hsl = hslVal.toLowerCase().replace(regex, '').split(',').map((v) => parseInt(v));
      const rgb = hslToRgb(hsl);
      const hex = hslToHex(hsl);
      console.log(hsl, rgb, hex);
    }
  
    /*
      testRgbConversions();
      testHexConversions();
      testHslConversions();
    */
  
    const colorConversions = {
      rgbToHex: rgbToHex,
      rgbToHsl: rgbToHsl,
      hexToRgb: hexToRgb,
      hexToHsl: hexToHsl,
      hslToRgb: hslToRgb,
      hslToHex: hslToHex
    }

  
//   })();
  