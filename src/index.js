import GUI from '/node_modules/lil-gui/dist/lil-gui.esm.js';

// localStorage Initial Setting
localStorage.setItem("formSettings-reset", "false")
if (localStorage.getItem("formSettings") == null || localStorage.getItem("formSettings-reset") == "true") {
    localStorage.setItem("formSettings", JSON.stringify({
      formColor: "#5d495f",
      formShadowColor: "#a5b625",
      formShadowDepth: 10,
      formTextColor: "#cbce03",
      backgroundColor: "#667f6f"
    }))
}
const formSettings = JSON.parse(localStorage.getItem("formSettings"))
let root = document.documentElement;

// on load
window.addEventListener( 'load', function() {
    root.style.setProperty('--background-color', formSettings.backgroundColor);
    document.querySelector("#survey-form").style.backgroundColor = formSettings.formColor;
    document.querySelector("#survey-form").style["boxShadow"] = `-${formSettings.formShadowDepth}px ${formSettings.formShadowDepth}px ${formSettings.formShadowColor}`;
    root.style.setProperty('--form-text-color', formSettings.formTextColor);
});

// the options menu
const gui = new GUI();

const obj = {
  "Form Color": formSettings["formColor"],
  "Form Shadow Color": formSettings["formShadowColor"],
  "Form Shadow Depth": formSettings["formShadowDepth"],
  "Form Text Color": formSettings["formTextColor"],
  "Background Color": formSettings["backgroundColor"]
}

gui.addColor( obj, 'Form Color' ).onChange( value => {
  formSettings.formColor = value;
  localStorage.setItem("formSettings", JSON.stringify(formSettings))
  document.querySelector("#survey-form").style.backgroundColor = value;
});

gui.addColor( obj, 'Form Shadow Color' ).onChange( value => {
  formSettings.formShadowColor = value;
  localStorage.setItem("formSettings", JSON.stringify(formSettings))
  document.querySelector("#survey-form").style["boxShadow"] = `-${formSettings.formShadowDepth}px ${formSettings.formShadowDepth}px ${formSettings.formShadowColor}`;
});

gui.add( obj, 'Form Shadow Depth', 0, 100 ).onChange( value => {
  formSettings.formShadowDepth = Math.floor(value * 0.5);
  localStorage.setItem("formSettings", JSON.stringify(formSettings));
  document.querySelector("#survey-form").style["boxShadow"] = `-${formSettings.formShadowDepth}px ${formSettings.formShadowDepth}px ${formSettings.formShadowColor}`;
});

gui.addColor( obj, 'Form Text Color' ).onChange( value => {
  formSettings.formTextColor = value;
  localStorage.setItem("formSettings", JSON.stringify(formSettings))
  root.style.setProperty('--form-text-color', value);
});

gui.addColor( obj, 'Background Color' ).onChange( value => {
  formSettings.backgroundColor = value;
  localStorage.setItem("formSettings", JSON.stringify(formSettings))
  root.style.setProperty('--background-color', value);
});
