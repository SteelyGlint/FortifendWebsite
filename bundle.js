/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fonts_alagard_ttf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _fonts_monaco_ttf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _fonts_RobotoMono_Light_ttf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_alagard_ttf__WEBPACK_IMPORTED_MODULE_3__);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_monaco_ttf__WEBPACK_IMPORTED_MODULE_4__);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_RobotoMono_Light_ttf__WEBPACK_IMPORTED_MODULE_5__);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"alagard\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal;\n  font-display: swap;\n}\n@font-face {\n  font-family: \"monaco\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal;\n  font-display: swap;\n}\n@font-face {\n  font-family: \"RobotoMono\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal;\n  font-display: swap;\n}\nhtml {\n  font-size: 16px;\n  min-width: 100vw;\n  margin: 0;\n  padding: 0;\n  background-color: #2b222a;\n  text-rendering: geometricPrecision;\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  overflow-x: hidden; /* Prevent horizontal scrolling */\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-size: clamp(2rem, 5vw, 4rem);\n  line-height: 1;\n  font-family: \"VT323\", \"monaco\";\n  font-weight: normal;\n  color: #FFFFFF;\n  letter-spacing: 0rem;\n  width: 100%; /* Explicit width */\n  max-width: 100vw; /* Don't exceed viewport */\n  overflow-x: hidden; /* Hide horizontal overflow */\n  box-sizing: border-box; /* Include padding in width calculation */\n}\n\nh1, h2, h3, h4, h5, h6 {\n  line-height: 1;\n  text-rendering: geometricPrecision;\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  margin-top: 0;\n  margin-bottom: 2rem;\n  font-weight: normal;\n  color: #FFFFFF;\n  letter-spacing: 0rem;\n}\n\nh1, h2, h3 {\n  font-family: \"Press Start 2P\", monospace;\n}\n\nh4, h5, h6 {\n  font-family: \"VT323\", \"monaco\";\n}\n\n.pixel-text-16 {\n  font-size: 16px;\n  transform-origin: left top;\n  transform: scale(1);\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n.pixel-text-24 {\n  font-size: 24px;\n  transform-origin: left top;\n  transform: scale(1);\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n.pixel-text-32 {\n  font-size: 32px;\n  transform-origin: left top;\n  transform: scale(1);\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n.pixel-text-48 {\n  font-size: 48px;\n  transform-origin: left top;\n  transform: scale(1);\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n.pixel-text-64 {\n  font-size: 64px;\n  transform-origin: left top;\n  transform: scale(1);\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n.pixel-text-80 {\n  font-size: 80px;\n  transform-origin: left top;\n  transform: scale(1);\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n.pixel-text-96 {\n  font-size: 96px;\n  transform-origin: left top;\n  transform: scale(1);\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n.pixel-text-114 {\n  font-size: 114px;\n  transform-origin: left top;\n  transform: scale(1);\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n@media (min-width: 2001px) {\n  .pixel-perfect-text-large {\n    font-size: 96px;\n    transform-origin: left top;\n    transform: scale(1);\n    font-smooth: never;\n    -webkit-font-smoothing: none;\n    -moz-osx-font-smoothing: grayscale;\n    font-variant-ligatures: none;\n    text-rendering: optimizeSpeed;\n    letter-spacing: 0;\n  }\n  .pixel-perfect-text-medium {\n    font-size: 64px;\n    transform-origin: left top;\n    transform: scale(1);\n    font-smooth: never;\n    -webkit-font-smoothing: none;\n    -moz-osx-font-smoothing: grayscale;\n    font-variant-ligatures: none;\n    text-rendering: optimizeSpeed;\n    letter-spacing: 0;\n  }\n}\n@media (min-width: 1501px) and (max-width: 2000px) {\n  .pixel-perfect-text-large {\n    font-size: 64px;\n    transform-origin: left top;\n    transform: scale(1);\n    font-smooth: never;\n    -webkit-font-smoothing: none;\n    -moz-osx-font-smoothing: grayscale;\n    font-variant-ligatures: none;\n    text-rendering: optimizeSpeed;\n    letter-spacing: 0;\n  }\n  .pixel-perfect-text-medium {\n    font-size: 48px;\n    transform-origin: left top;\n    transform: scale(1);\n    font-smooth: never;\n    -webkit-font-smoothing: none;\n    -moz-osx-font-smoothing: grayscale;\n    font-variant-ligatures: none;\n    text-rendering: optimizeSpeed;\n    letter-spacing: 0;\n  }\n}\n@media (min-width: 769px) and (max-width: 1500px) {\n  .pixel-perfect-text-large {\n    font-size: 48px;\n    transform-origin: left top;\n    transform: scale(1);\n    font-smooth: never;\n    -webkit-font-smoothing: none;\n    -moz-osx-font-smoothing: grayscale;\n    font-variant-ligatures: none;\n    text-rendering: optimizeSpeed;\n    letter-spacing: 0;\n  }\n  .pixel-perfect-text-medium {\n    font-size: 32px;\n    transform-origin: left top;\n    transform: scale(1);\n    font-smooth: never;\n    -webkit-font-smoothing: none;\n    -moz-osx-font-smoothing: grayscale;\n    font-variant-ligatures: none;\n    text-rendering: optimizeSpeed;\n    letter-spacing: 0;\n  }\n}\n@media (max-width: 768px) {\n  .pixel-perfect-text-large {\n    font-size: 32px;\n    transform-origin: left top;\n    transform: scale(1);\n    font-smooth: never;\n    -webkit-font-smoothing: none;\n    -moz-osx-font-smoothing: grayscale;\n    font-variant-ligatures: none;\n    text-rendering: optimizeSpeed;\n    letter-spacing: 0;\n  }\n  .pixel-perfect-text-medium {\n    font-size: 24px;\n    transform-origin: left top;\n    transform: scale(1);\n    font-smooth: never;\n    -webkit-font-smoothing: none;\n    -moz-osx-font-smoothing: grayscale;\n    font-variant-ligatures: none;\n    text-rendering: optimizeSpeed;\n    letter-spacing: 0;\n  }\n}\n.marketing-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 25px;\n  margin-bottom: 25px;\n  border-radius: 8px;\n}\n\n.tagline {\n  margin-bottom: 20px;\n  color: #9eff4a;\n}\n\n.game-description {\n  margin: 20px 0;\n  max-width: 800px;\n}\n\n.cta-button {\n  margin-top: 20px;\n  padding: 10px 20px;\n  background-color: #9eff4a;\n  color: #000;\n  border-radius: 4px;\n  display: inline-block;\n  transition: background-color 0.3s ease;\n}\n.cta-button:hover {\n  background-color: rgb(105.3480662983, 227, 0);\n}\n\na {\n  font-weight: normal;\n  text-decoration: none;\n  color: #9eff4a;\n}\na:focus {\n  outline: thin dotted;\n  color: rgb(185.3314917127, 255, 125);\n}\n\nheader {\n  margin-bottom: 25px;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  max-width: 100vw;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n\nfooter {\n  background: rgba(0, 0, 0, 0.45);\n  padding: 25px;\n  margin-bottom: 25px;\n  border-radius: 8px;\n  width: 100%;\n  max-width: 100vw;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 2400px;\n  margin: 25px auto;\n  padding: 0 30px;\n}\n@media (min-width: 2001px) {\n  body {\n    max-width: 2400px;\n  }\n}\n@media (min-width: 1501px) and (max-width: 2000px) {\n  body {\n    max-width: 1400px;\n  }\n}\n@media (min-width: 769px) and (max-width: 1500px) {\n  body {\n    max-width: 800px;\n  }\n}\n@media (max-width: 768px) {\n  body {\n    max-width: 700px;\n    padding: 0 15px;\n  }\n}\n\n/* Keep your original CSS exactly as is */\n.cropped-image {\n  margin: 0px;\n  padding: 0px;\n  width: 100%; /* Container width */\n  height: 300px; /* Fixed height */\n  overflow: hidden; /* Hide parts outside container */\n  /* NO position: relative here */\n  /* Safari-specific orientation change fix */\n}\n@supports (-webkit-touch-callout: none) {\n  .cropped-image {\n    width: 100vw; /* Use viewport width instead of percentage */\n    margin-left: calc(-50vw + 50%); /* Center relative to the body */\n    box-sizing: border-box;\n  }\n}\n\n.cropped-image img {\n  /* Center the image horizontally */\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  /* Optional: adjust vertical position */\n  top: 0;\n  max-width: none; /* IMPORTANT: Prevents the image from resizing to fit container */\n  /* Set minimum width to ensure coverage on large screens */\n  min-width: 100vw; /* Always fill viewport width */\n  height: auto; /* Let height adjust based on aspect ratio */\n  min-height: 100%; /* Make sure it fills the container height */\n  /* Position from the top for better framing */\n  top: 0;\n  z-index: -1; /* Place behind all other content */\n  /* Add object-fit as a fallback for browsers that support it */\n  object-fit: cover;\n  object-position: center top;\n  /* Add Safari-specific orientation change fix */\n}\n@supports (-webkit-touch-callout: none) {\n  .cropped-image img {\n    /* Ensure image covers the full width during rotation */\n    min-width: 100vw;\n    object-fit: cover;\n    object-position: top center;\n  }\n}\n\n/* Add media query for extra large displays */\n@media (min-width: 2400px) {\n  .cropped-image img {\n    /* Scale up for extremely large monitors */\n    min-width: 100%; /* Use container width */\n    width: 100vw; /* Ensure viewport coverage */\n    max-width: none; /* Override max-width limitations */\n  }\n}\n/* Add only these Safari-specific fixes */\n@supports (-webkit-touch-callout: none) {\n  /* Only fix the container horizontal overflow in Safari */\n}\n.banner-container {\n  position: absolute;\n  top: 80%;\n  margin: 0px;\n  padding: 0px;\n  width: 100%;\n  margin: 0 auto;\n}\n\n/* Refactor your banner-image class in main.scss */\n.banner-image {\n  /* Keep existing pixel-perfect rendering properties */\n  image-rendering: pixelated;\n  image-rendering: -moz-crisp-edges;\n  image-rendering: crisp-edges;\n  -ms-interpolation-mode: nearest-neighbor; /* IE */\n  /* Center the image */\n  display: block;\n  margin: 0 auto;\n  /* Don't set max-width to allow for exact integer scaling */\n  /* max-width: 100%; */ /* Remove this line */\n  height: auto;\n  /* Keep transform origin */\n  transform-origin: center;\n  /* Keep your original styles */\n  border-radius: 8px 8px 0 0;\n  /* Add Safari-specific rendering */\n}\n@supports (-webkit-touch-callout: none) {\n  .banner-image {\n    transform: translateZ(0); /* Helps with Safari rendering */\n  }\n}\n\n.image-placeholder {\n  margin-bottom: 450px; /* More specific and forceful for testing */\n}\n@media (min-width: 2001px) {\n  .image-placeholder {\n    margin-bottom: 1850px;\n  }\n}\n@media (min-width: 1501px) and (max-width: 2000px) {\n  .image-placeholder {\n    margin-bottom: 1650px;\n  }\n}\n@media (min-width: 769px) and (max-width: 1500px) {\n  .image-placeholder {\n    margin-bottom: 1650px;\n  }\n}\n@media (max-width: 768px) {\n  .image-placeholder {\n    margin-bottom: 425px;\n  }\n}\n\n.content {\n  background: rgba(0, 0, 0, 0.45);\n  padding: 25px 25px 25px 25px;\n  margin-bottom: 25px;\n  border-radius: 8px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.video-background {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 50vw;\n}\n\n#fullpage {\n  display: none;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.85); /* Add overlay background */\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n}\n#fullpage .fullpage-image {\n  width: 90%; /* Reduced from 100% to create margin */\n  height: 90%; /* Reduced from 100% to create margin */\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-color: transparent;\n  image-rendering: pixelated;\n  image-rendering: crisp-edges;\n  transform-origin: center center;\n  margin: 5vh auto; /* Add vertical and horizontal margin */\n}\n\n.gallery-container {\n  width: 100%;\n  margin: 0 auto;\n}\n\n.artwork-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  justify-content: center;\n}\n@media (min-width: 2001px) {\n  .artwork-grid .artwork-item {\n    flex: 0 0 calc(25% - 15px);\n    max-width: calc(25% - 15px);\n  }\n}\n@media (min-width: 1501px) and (max-width: 2000px) {\n  .artwork-grid .artwork-item {\n    flex: 0 0 calc(33.333% - 14px);\n    max-width: calc(33.333% - 14px);\n  }\n}\n@media (min-width: 764px) and (max-width: 1500px) {\n  .artwork-grid .artwork-item {\n    flex: 0 0 calc(50% - 10px);\n    max-width: calc(50% - 10px);\n  }\n}\n\n.artwork-item {\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  overflow: hidden;\n  margin-bottom: 20px;\n  position: relative;\n  display: inline-block;\n}\n.artwork-item img {\n  object-fit: contain;\n  width: 100%;\n  image-rendering: pixelated;\n  image-rendering: crisp-edges;\n  border-radius: 8px 8px 0 0;\n  display: block;\n}\n@media (max-width: 768px) {\n  .artwork-item {\n    flex: 0 0 100%;\n    max-width: none;\n  }\n}\n.artwork-item:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);\n  background: rgba(0, 0, 0, 0.45);\n}\n\n.artwork-image-large {\n  object-fit: contain;\n  image-rendering: pixelated;\n  image-rendering: crisp-edges;\n  max-width: 100%;\n  border-radius: 8px 8px 0 0;\n}\n\n.artwork-info {\n  position: relative;\n  background-color: #3c3f41;\n  font-size: 2.4rem;\n  color: #fff;\n  padding: 10px 20px;\n  text-align: center;\n}\n.artwork-info .artwork-title {\n  margin: 0 0 15px 0;\n  color: #FFFFFF;\n  color: rgba(255, 255, 255, 0.85);\n}\n.artwork-info .artwork-description {\n  display: none;\n  color: rgba(255, 255, 255, 0.85);\n}\n\n.icon-image {\n  height: 100px;\n  width: 100%;\n  object-fit: fill;\n  border-radius: 8px 8px 0 0;\n  filter: invert(28%) sepia(79%) saturate(2476%) hue-rotate(56deg) brightness(118%) contrast(119%);\n}\n\n.icon-item .icon-info {\n  padding: 10px;\n  margin-right: 10px;\n}\n.icon-item .icon-info .icon-title {\n  font-size: 2.4rem;\n  margin: 0 0 10px 0;\n  color: #FFFFFF;\n}\n.icon-item .icon-info .icon-description {\n  font-size: 2.4rem;\n  color: rgba(255, 255, 255, 0.85);\n  line-height: 1.2;\n  text-align: center;\n}\n\nblockquote {\n  border-left: 2px solid hsl(92.1546961326, 110%, 64.5098039216%);\n  margin: 1.6em 0;\n  padding: 1.5em;\n  font-size: 1.8rem;\n  background: rgba(0, 0, 0, 0.05);\n  border-radius: 8px;\n}\nblockquote p:last-child {\n  margin-bottom: 0;\n}", "",{"version":3,"sources":["webpack://./src/styles/fonts.scss","webpack://./src/styles/main.scss"],"names":[],"mappings":"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","sourcesContent":["\n@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');\n\n// Font imports\n@font-face {\n  font-family: 'alagard';\n  src: url('../fonts/alagard.ttf') format('truetype');\n  font-weight: normal;\n  font-style: normal;\n  font-display: swap;\n}\n\n@font-face {\n  font-family: 'monaco';\n  src: url('../fonts/monaco.ttf') format('truetype');\n  font-weight: normal;\n  font-style: normal;\n  font-display: swap;\n\n}\n\n@font-face {\n  font-family: 'RobotoMono';\n  src: url('../fonts/RobotoMono-Light.ttf') format('truetype');\n  font-weight: normal;\n  font-style: normal;\n  font-display: swap;\n\n}\n\n// TODO: https://stackoverflow.com/questions/12562631/web-fonts-and-providing-fallback-fonts\n","@use \"sass:color\";\n@use 'sass:math' as math;\n@use 'fonts' as *;\n\n// Variables\n$header-font: 'Press Start 2P', monospace;\n$body-font: 'VT323', 'monaco';\n$description-font:  'VT323', 'monaco'; //'RobotoMono', monospace;\n$accent-color: #9eff4a; // Adjusted to a softer yellow-green that matches the monster\n\n$text-light: #FFFFFF;\n$card-bg: rgba(0, 0, 0, 0.45);\n$border-radius: 8px;\n$page-bg: #2b222a;\n\n// Base styles\nhtml {\n  font-size: 16px; // Base size to calculate rem from\n  min-width: 100vw;\n  margin: 0;\n  padding: 0;\n  background-color: $page-bg;\n\n  //text-rendering: optimizeSpeed;\n  text-rendering: geometricPrecision;\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  overflow-x: hidden; /* Prevent horizontal scrolling */\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-size: clamp(2rem, 5vw, 4rem);\n  line-height: 1.0;\n  font-family: $body-font;\n  font-weight: normal;\n  color: $text-light;\n\n  //max-width: 1200px;\n  //margin: 25px auto;\n  //padding: 0 20px;\n\n  letter-spacing: 0rem;\n  width: 100%; /* Explicit width */\n  max-width: 100vw; /* Don't exceed viewport */\n  overflow-x: hidden; /* Hide horizontal overflow */\n  box-sizing: border-box; /* Include padding in width calculation */\n}\n\n// Typography\nh1, h2, h3, h4, h5, h6 {\n  line-height: 1;\n  text-rendering: geometricPrecision;\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  margin-top: 0;\n  margin-bottom: 2rem;\n  font-weight: normal;\n  color: $text-light;\n  letter-spacing: 0rem;\n}\n\nh1, h2, h3 {\n  font-family: $header-font;\n}\n\nh4, h5, h6 {\n  font-family: $description-font;\n}\n\n\n//\n//h1 { font-size: 6rem; line-height: 1.0; letter-spacing: 0rem; }\n//h2 { font-size: 6rem; line-height: 1.0; letter-spacing: 0rem; }\n//h3 { font-size: 5rem; line-height: 1.0; letter-spacing: 0rem; }\n//h4 { font-size: 5rem; line-height: 1.0; letter-spacing: 0rem; }\n//h5 { font-size: 3rem; line-height: 1.0; letter-spacing: 0rem; }\n//h6 { font-size: 3rem; line-height: 1.0; letter-spacing: 0rem; }\n//\n//.pixel-perfect-text {\n//  font-size: 64px; // Base font size (usually pixel font's design size)\n//  // Use math.div() instead of / operator\n//  $base-width: 320px;\n//  $scale-factor: math.floor(math.div(100vw, $base-width));\n//  $scale-factor: math.max(1, $scale-factor);\n//\n//  transform-origin: left top;\n//  transform: scale($scale-factor);\n//}\n\n@mixin pixelated-font {\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  font-variant-ligatures: none;\n  text-rendering: optimizeSpeed;\n  letter-spacing: 0;\n}\n\n\n// Pixel-perfect text mixin\n@mixin pixel-text-base($size) {\n  font-size: $size + px;\n  $base-width: 320px;\n  $scale-factor: math.floor(math.div(100vw, $base-width));\n  $scale-factor: math.max(1, $scale-factor);\n\n  transform-origin: left top;\n  transform: scale($scale-factor);\n\n  @include pixelated-font;\n}\n\n\n// Generate pixel text classes with different sizes\n$pixel-text-sizes: 16, 24, 32, 48, 64, 80, 96, 114;\n\n@each $size in $pixel-text-sizes {\n  .pixel-text-#{$size} {\n    @include pixel-text-base($size);\n  }\n}\n//\n//// Apply to all text elements\n//h1, h2, h3, h4, h5, h6, p, div, span {\n//  @include pixelated-font;\n//}\n\n\n\n// Create a proper grid layout\n@media (min-width: 2001px) {\n  .pixel-perfect-text-large {\n    @include pixel-text-base(96);\n  }\n  .pixel-perfect-text-medium {\n    @include pixel-text-base(64);\n  }\n}\n\n@media (min-width: 1501px) and (max-width: 2000px) {\n  .pixel-perfect-text-large {\n    @include pixel-text-base(64);\n  }\n  .pixel-perfect-text-medium {\n    @include pixel-text-base(48);\n  }\n}\n\n@media (min-width: 769px) and (max-width: 1500px) {\n  .pixel-perfect-text-large {\n    @include pixel-text-base(48);\n  }\n  .pixel-perfect-text-medium {\n    @include pixel-text-base(32);\n  }\n}\n\n@media (max-width: 768px) {\n  .pixel-perfect-text-large {\n    @include pixel-text-base(32);\n\n  }\n  .pixel-perfect-text-medium {\n    @include pixel-text-base(24);\n  }\n}\n\n\n\n// Marketing section styling\n.marketing-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  //background: $card-bg;\n  padding: 25px;\n  margin-bottom: 25px;\n  border-radius: $border-radius;\n}\n\n.tagline {\n  margin-bottom: 20px;\n  color: $accent-color;\n}\n\n.game-description {\n  margin: 20px 0;\n  max-width: 800px;\n}\n\n.cta-button {\n  margin-top: 20px;\n  padding: 10px 20px;\n  background-color: $accent-color;\n  color: #000;\n  border-radius: 4px;\n  display: inline-block;\n  transition: background-color 0.3s ease;\n\n  &:hover {\n    background-color: color.adjust($accent-color, $lightness: -20%);\n  }\n}\n\n// Links\na {\n  font-weight: normal;\n  text-decoration: none;\n  color: $accent-color;\n\n  &:focus {\n    outline: thin dotted;\n    color: color.adjust($accent-color, $lightness: 10%);\n  }\n}\n\nheader {\n  margin-bottom: 25px;\n  border-radius: $border-radius;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  max-width: 100vw;\n  box-sizing: border-box;\n  overflow: hidden;\n}\nfooter {\n  background: $card-bg;\n  padding: 25px;\n  margin-bottom: 25px;\n  border-radius: $border-radius;\n  width: 100%;\n  max-width: 100vw;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n\n// Adjust content container width for larger screens\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  max-width: 2400px; // Increased to match gallery container\n  margin: 25px auto;\n  padding: 0 30px; // Increased padding for larger screens\n\n\n  // Create a proper grid layout\n  @media (min-width: 2001px) {\n    max-width: 2400px;\n  }\n\n  @media (min-width: 1501px) and (max-width: 2000px) {\n    max-width: 1400px;\n  }\n\n  @media (min-width: 769px) and (max-width: 1500px) {\n    max-width: 800px;\n  }\n\n  @media (max-width: 768px) {\n    max-width: 700px;\n    padding: 0 15px;\n  }\n}\n\n/* Keep your original CSS exactly as is */\n.cropped-image {\n  margin: 0px;\n  padding: 0px;\n  width: 100%; /* Container width */\n  height: 300px; /* Fixed height */\n  overflow: hidden; /* Hide parts outside container */\n  /* NO position: relative here */\n  //position: relative;\n\n  /* Safari-specific orientation change fix */\n  @supports (-webkit-touch-callout: none) {\n    width: 100vw; /* Use viewport width instead of percentage */\n    margin-left: calc(-50vw + 50%); /* Center relative to the body */\n    box-sizing: border-box;\n  }\n}\n\n.cropped-image img {\n  /* Center the image horizontally */\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  /* Optional: adjust vertical position */\n  top: 0;\n  max-width: none;     /* IMPORTANT: Prevents the image from resizing to fit container */\n  //height: 100%;\n  //width: auto;\n  //\n  /* Set minimum width to ensure coverage on large screens */\n  min-width: 100vw; /* Always fill viewport width */\n  height: auto; /* Let height adjust based on aspect ratio */\n  min-height: 100%; /* Make sure it fills the container height */\n\n  /* Position from the top for better framing */\n  top: 0;\n  z-index: -1; /* Place behind all other content */\n\n  /* Add object-fit as a fallback for browsers that support it */\n  object-fit: cover;\n  object-position: center top;\n\n  /* Add Safari-specific orientation change fix */\n  @supports (-webkit-touch-callout: none) {\n    /* Ensure image covers the full width during rotation */\n    min-width: 100vw;\n    object-fit: cover;\n    object-position: top center;\n  }\n}\n\n\n/* Add media query for extra large displays */\n@media (min-width: 2400px) {\n  .cropped-image img {\n    /* Scale up for extremely large monitors */\n    min-width: 100%; /* Use container width */\n    width: 100vw; /* Ensure viewport coverage */\n    max-width: none; /* Override max-width limitations */\n  }\n}\n\n/* Add only these Safari-specific fixes */\n@supports (-webkit-touch-callout: none) {\n  /* Only fix the container horizontal overflow in Safari */\n  header, #header {\n    //max-width: 100vw;\n    //overflow-x: hidden;\n  }\n}\n\n.banner-container {\n  position: absolute;\n  top: 80%;\n  margin: 0px;\n  padding: 0px;\n  //width: 100px; /* Container width */\n  width: 100%;\n  //max-width: 2400px; // Increased for large monitors\n  margin: 0 auto;\n}\n\n/* Refactor your banner-image class in main.scss */\n.banner-image {\n  /* Keep existing pixel-perfect rendering properties */\n  image-rendering: pixelated;\n  image-rendering: -moz-crisp-edges;\n  image-rendering: crisp-edges;\n  -ms-interpolation-mode: nearest-neighbor; /* IE */\n\n  /* Center the image */\n  display: block;\n  margin: 0 auto;\n\n  /* Don't set max-width to allow for exact integer scaling */\n  /* max-width: 100%; */ /* Remove this line */\n  height: auto;\n\n  /* Keep transform origin */\n  transform-origin: center;\n\n  /* Keep your original styles */\n  border-radius: $border-radius $border-radius 0 0;\n\n  /* Add Safari-specific rendering */\n  @supports (-webkit-touch-callout: none) {\n    transform: translateZ(0); /* Helps with Safari rendering */\n  }\n}\n\n.image-placeholder {\n  //margin-top: calc(100vh * 0.3552 + 47.6051px);\n  margin-bottom: 450px; /* More specific and forceful for testing */\n\n  @media (min-width: 2001px) { // 4 items per row for very large screens\n    margin-bottom: 1850px;\n  }\n\n  @media (min-width: 1501px) and (max-width: 2000px) { // 3 items per row\n    margin-bottom: 1650px;\n  }\n\n  @media (min-width: 769px) and (max-width: 1500px) { // 2 items per row\n    margin-bottom: 1650px;\n  }\n\n  @media (max-width: 768px) {\n    margin-bottom: 425px;\n  }\n\n}\n\n// Content sections\n.content {\n  background: $card-bg;\n  padding: 25px 25px 25px 25px;\n  margin-bottom: 25px;\n  border-radius: $border-radius;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.video-background {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 50vw;\n}\n\n#fullpage {\n  display: none;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.85); /* Add overlay background */\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n\n  .fullpage-image {\n    width: 90%; /* Reduced from 100% to create margin */\n    height: 90%; /* Reduced from 100% to create margin */\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-color: transparent;\n    image-rendering: pixelated;\n    image-rendering: crisp-edges;\n    //transform: scale(1); /* Integer scaling for pixel art */\n    transform-origin: center center;\n    margin: 5vh auto; /* Add vertical and horizontal margin */\n  }\n}\n\n// Gallery styles\n.gallery-container {\n  width: 100%;\n  //max-width: 2400px; // Increased for large monitors\n  margin: 0 auto;\n}\n\n.artwork-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  justify-content: center;\n\n  // Create a proper grid layout\n  @media (min-width: 2001px) { // 4 items per row for very large screens\n    .artwork-item {\n      //background: color.adjust($card-bg, $alpha: 0.9);\n      flex: 0 0 calc(25% - 15px);\n      max-width: calc(25% - 15px);\n    }\n  }\n\n  @media (min-width: 1501px) and (max-width: 2000px) { // 3 items per row\n    .artwork-item {\n      //background: color.adjust($card-bg, $alpha: 0.9);\n      flex: 0 0 calc(33.333% - 14px);\n      max-width: calc(33.333% - 14px);\n    }\n  }\n\n  @media (min-width: 764px) and (max-width: 1500px) { // 2 items per row\n    .artwork-item {\n      //background: color.adjust($card-bg, $alpha: 0.9);\n      flex: 0 0 calc(50% - 10px);\n      max-width: calc(50% - 10px);\n    }\n  }\n}\n\n.artwork-item {\n  border-radius: $border-radius;\n  box-shadow: 0 4px 12px color.adjust($card-bg, $alpha: -0.5);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  overflow: hidden;\n  margin-bottom: 20px;\n  position: relative;\n  display: inline-block;\n\n  img {\n    object-fit: contain;\n    width: 100%;\n    image-rendering: pixelated;\n    image-rendering: crisp-edges;\n    border-radius: $border-radius $border-radius 0 0;\n    display: block;\n    //@media (max-width: 768px) {\n    //  height: 300px;\n    //}\n  }\n\n  // Default (mobile) styling\n  @media (max-width: 768px) {\n    flex: 0 0 100%;\n    max-width: none;\n  }\n\n  &:hover {\n    transform: translateY(-5px);\n    box-shadow: 0 6px 16px color.adjust($card-bg, $alpha: -0.4);\n    background: color.adjust($card-bg, $alpha: 0);\n  }\n}\n\n.artwork-image-large {\n  object-fit: contain;\n  image-rendering: pixelated;\n  image-rendering: crisp-edges;\n\n  max-width: 100%;\n  border-radius: $border-radius $border-radius 0 0;\n}\n\n\n.artwork-info {\n  position: relative;\n  background-color: #3c3f41;\n  font-size: 2.4rem;\n  color: #fff;\n  padding: 10px 20px;\n  text-align: center;\n\n  .artwork-title {\n    margin: 0 0 15px 0;\n    color: $text-light;\n    color: color.adjust($text-light, $alpha: -0.15);\n  }\n\n  .artwork-description {\n    display: none;\n    color: color.adjust($text-light, $alpha: -0.15);\n  }\n}\n\n.icon-image {\n  height: 100px;\n  width: 100%;\n  object-fit: fill;\n  border-radius: $border-radius $border-radius 0 0;\n  filter: invert(28%) sepia(79%) saturate(2476%) hue-rotate(56deg) brightness(118%) contrast(119%);\n}\n\n.icon-item {\n  .icon-info {\n    padding: 10px;\n    margin-right: 10px;\n\n    .icon-title {\n      font-size: 2.4rem;\n      margin: 0 0 10px 0;\n      color: $text-light;\n    }\n\n    .icon-description {\n      font-size: 2.4rem;\n      color: color.adjust($text-light, $alpha: -0.15);\n      line-height: 1.2;\n      text-align: center;\n    }\n  }\n}\n\n\n// Blockquote styles\nblockquote {\n  border-left: 2px solid color.adjust($accent-color, $saturation: 10%);\n  margin: 1.6em 0;\n  padding: 1.5em;\n  font-size: 1.8rem;\n  background: color.adjust($card-bg, $alpha: -0.4);\n  border-radius: $border-radius;\n\n  p:last-child {\n    margin-bottom: 0;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "685ec71b2fb55a5702b0.ttf";

/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "58bfa37d62525a6844a6.ttf";

/***/ }),
/* 14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "835ca7f9aef703b479ca.ttf";

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/capsule4.png");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/capsule5.png");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/icon.png");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/boon_placeholder.png");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/title-logo.png");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/screenshot_terrain_hud.webp");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/screenshot_hud_trade.webp");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "video/trailer_combat_simple.mp4");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/mail.svg");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/mailbox.svg");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/social.svg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _images_capsule4_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _images_capsule5_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _images_icon_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _images_boon_placeholder_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _images_title_logo_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);
/* harmony import */ var _images_screenshot_terrain_hud_webp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(21);
/* harmony import */ var _images_screenshot_hud_trade_webp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(22);
/* harmony import */ var _video_trailer_combat_simple_mp4__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(23);
/* harmony import */ var _images_mail_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(24);
/* harmony import */ var _images_mailbox_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(25);
/* harmony import */ var _images_social_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(26);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

// import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)











// import './images/trailer_combat_simple.gif';






// Function for fullscreen view with integer scaling
const applyFullscreenIntegerScaling = (img, fullPageImager) => {
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    // Get viewport dimensions (with margin)
    const viewportWidth = window.innerWidth * 0.8;
    const viewportHeight = window.innerHeight * 0.8;

    // Calculate maximum integer scale that fits viewport
    const scaleX = Math.floor(viewportWidth / naturalWidth);
    const scaleY = Math.floor(viewportHeight / naturalHeight);

    // Use the smaller scale to ensure it fits both dimensions
    const scale = Math.max(1, Math.min(scaleX, scaleY));

    return scale;
};
const scalePixelArtBanner = () => {
    const banner = document.querySelector('.banner-image');
    if (!banner || !banner.complete) return;

    // Get natural dimensions
    const naturalWidth = banner.naturalWidth;
    const naturalHeight = banner.naturalHeight;

    // Get container width
    const containerWidth = banner.parentElement.clientWidth;

    // Calculate scale factor
    let scale;

    // For mobile devices, we may need to scale down
    if (window.innerWidth <= 768) {
        // For smaller screens, find the largest scale that fits but is <= 1
        // This ensures we scale down by integer divisions (1/2, 1/3, etc.)
        // which preserves pixel clarity
        const maxScale = 1;
        const rawScale = containerWidth / naturalWidth;

        if (rawScale < 1) {
            // Scale down by integer division: 1/2, 1/3, 1/4, etc.
            // Find the largest divisor that results in scale <= rawScale
            for (let divisor = 1; divisor <= 4; divisor++) {
                const candidateScale = 1 / divisor;
                if (candidateScale <= rawScale) {
                    scale = candidateScale;
                    break;
                }
            }
            // If no suitable divisor found, use raw scale with a minimum of 0.25
            if (!scale) scale = Math.max(0.25, rawScale);
        } else {
            // If it fits at original size, use scale 1
            scale = 1;
        }
    } else {
        // For larger screens, use integer upscaling as before
        // scale = Math.floor(containerWidth / naturalWidth);
        // scale = Math.max(1, scale); // Never go below 1x
    }

    // Apply precise scaling
    banner.style.width = `${Math.round(naturalWidth * scale)}px`;
    banner.style.height = `${Math.round(naturalHeight * scale)}px`;

    // Log for debugging
    console.log(`Banner scaled to ${scale}x on ${window.innerWidth}px wide screen`);
};
// Handles integer scaling with overflow protection
const applyIntegerScaling = () => {
    let callbackfn = img => {
        img.onload = function() {
            // Get natural dimensions
            const naturalWidth = this.naturalWidth;
            const naturalHeight = this.naturalHeight;

            // Calculate the container width
            const containerWidth = this.parentElement.clientWidth;

            // For thumbnail view - use container-based scaling
            let scale = Math.floor(containerWidth / naturalWidth);

            // Ensure scale is at least 1
            scale = Math.max(1, scale);

            // Set thumbnail dimensions to exact integer multiples
            this.style.width = `${naturalWidth * scale}px`;
            this.style.height = `${naturalHeight * scale}px`;
        };
    };

    const imgs = document.querySelectorAll('.artwork-item img');
    imgs.forEach(callbackfn);
};

// Detect Safari browser
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Additional Safari-specific image handling
const handleSafariImages = () => {
    if (isSafari) {
        console.log('Safari detected, applying specific image fixes');
        const headerImg = document.querySelector('.cropped-image img');

        if (headerImg) {
            // Adjust image rendering for Safari
            headerImg.style.left = '0';
            headerImg.style.right = '0';
            headerImg.style.margin = '0 auto';
            headerImg.style.transform = 'none';
            headerImg.style.objectFit = 'cover';
            headerImg.style.objectPosition = 'center';
            headerImg.style.width = '100%';
        }

        // Fix pixel art images in Safari
        document.querySelectorAll('.artwork-image, .artwork-image-large').forEach(img => {
            img.style.imageRendering = '-webkit-optimize-contrast';
            img.addEventListener('load', () => {
                // Ensure image doesn't cause scrollbars
                if (img.offsetWidth > window.innerWidth) {
                    img.style.width = '100%';
                    img.style.height = 'auto';
                }
            });
        });
    }
};


// Update window resize handler
// Add throttled resize handler to improve performance
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        scalePixelArtBanner();
        applyIntegerScaling();
        if (isSafari) {
            handleSafariImages();
        }    }, 100);
});


window.onload = ev => {
    init();
    scalePixelArtBanner();
    handleSafariImages();
}

const init = () => {
    console.log('hello I am a sample index.js');
    const imgs = document.querySelectorAll('.artwork-item img');
    const fullPage = document.querySelector('#fullpage');
    const fullPageImager = document.querySelector('#fullpage .fullpage-image');

    imgs.forEach(img => {
        img.addEventListener('click', function() {
            // Calculate integer scale for this specific image
            const scale = applyFullscreenIntegerScaling(img, fullPageImager);

            // Create a new image element to access natural dimensions
            const tempImg = new Image();
            tempImg.src = img.src;

            // Set exact pixel dimensions instead of scaling
            const exactWidth = tempImg.naturalWidth * scale;
            const exactHeight = tempImg.naturalHeight * scale;

            fullPageImager.style.backgroundImage = 'url(' + img.src + ')';
            fullPageImager.style.width = `${exactWidth}px`;
            fullPageImager.style.height = `${exactHeight}px`;
            fullPage.style.display = 'block';

            // Add small delay before adding opacity for transition effect
            setTimeout(() => {
                fullPage.style.opacity = '1';
            }, 10);
        });
    });

    // Replace the onclick attribute with an event listener
    fullPage.addEventListener('click', function() {
        this.style.opacity = '0';

        // Wait for transition to complete before hiding element
        setTimeout(() => {
            this.style.display = 'none';
        }, 300); // Match transition duration
    });

    // Apply integer scaling to thumbnails
    applyIntegerScaling();
}

window.addEventListener('load', () => {
    const banner = document.querySelector('.banner-image');
    if (banner) {
        banner.addEventListener('load', scalePixelArtBanner);
        // If image is already loaded
        if (banner.complete) {
            scalePixelArtBanner();
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map