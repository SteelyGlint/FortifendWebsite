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
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_alagard_ttf__WEBPACK_IMPORTED_MODULE_3__);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_monaco_ttf__WEBPACK_IMPORTED_MODULE_4__);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_RobotoMono_Light_ttf__WEBPACK_IMPORTED_MODULE_5__);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"alagard\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"truetype\");\n  font-weight: 600;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"monaco\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"truetype\");\n  font-weight: 600;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"RobotoMono\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"truetype\");\n  font-weight: 600;\n  font-style: normal;\n}\nhtml {\n  font-size: 16px;\n  min-width: 100vw;\n  margin: 0;\n  padding: 0;\n  background-color: rgb(37, 29, 36);\n}\n@media (max-width: 768px) {\n  html {\n    font-size: 14px;\n  }\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-size: clamp(2rem, 5vw, 4rem);\n  line-height: 1;\n  font-weight: 400;\n  font-family: \"alagard\";\n  color: #FFFFFF;\n  max-width: 1200px;\n  margin: 25px auto;\n  padding: 0 20px;\n  letter-spacing: 0rem;\n  overflow-x: hidden; /* Prevent horizontal scrolling */\n}\n\nh1, h2, h3, h4, h5, h6 {\n  line-height: 1;\n  text-rendering: optimizeSpeed;\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  margin-top: 0;\n  margin-bottom: 2rem;\n  font-weight: 300;\n  font-family: \"monaco\";\n  color: #FFFFFF;\n}\n\nh1 {\n  font-size: 6rem;\n  line-height: 1.25;\n  letter-spacing: 0rem;\n}\n\nh2 {\n  font-size: 6rem;\n  line-height: 1.3;\n  letter-spacing: 0rem;\n}\n\nh3 {\n  font-size: 5rem;\n  line-height: 1.35;\n  letter-spacing: 0rem;\n}\n\nh4 {\n  font-size: 5rem;\n  line-height: 1.5;\n  letter-spacing: 0rem;\n}\n\nh5 {\n  font-size: 3rem;\n  line-height: 1.6;\n  letter-spacing: 0rem;\n}\n\nh6 {\n  font-size: 3rem;\n  line-height: 1;\n  letter-spacing: 0rem;\n}\n\n.pixel-perfect-text {\n  font-size: 32px;\n  transform-origin: left top;\n  transform: scale(1);\n}\n\n.marketing-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  background: rgba(0, 0, 0, 0.45);\n  padding: 25px;\n  margin-bottom: 25px;\n  border-radius: 8px;\n}\n\n.tagline {\n  margin-bottom: 20px;\n  color: #5eef3d;\n}\n\n.game-description {\n  margin: 20px 0;\n  max-width: 800px;\n}\n\n.cta-button {\n  margin-top: 20px;\n  padding: 10px 20px;\n  background-color: #5eef3d;\n  color: #000;\n  border-radius: 4px;\n  display: inline-block;\n  transition: background-color 0.3s ease;\n}\n.cta-button:hover {\n  background-color: rgb(58.1, 230.0285714286, 18.9714285714);\n}\n\na {\n  font-weight: normal;\n  text-decoration: none;\n  color: #5eef3d;\n}\na:focus {\n  outline: thin dotted;\n  color: rgb(133.1, 242.8857142857, 108.1142857143);\n}\n\nheader {\n  margin-bottom: 25px;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}\n\nfooter {\n  background: rgba(0, 0, 0, 0.45);\n  padding: 25px;\n  margin-bottom: 25px;\n  border-radius: 8px;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: 2400px;\n  margin: 25px auto;\n  padding: 0 30px;\n}\n@media (min-width: 2001px) {\n  body {\n    max-width: 2400px;\n  }\n}\n@media (min-width: 1501px) and (max-width: 2000px) {\n  body {\n    max-width: 1400px;\n  }\n}\n@media (min-width: 769px) and (max-width: 1500px) {\n  body {\n    max-width: 800px;\n  }\n}\n@media (max-width: 768px) {\n  body {\n    max-width: 700px;\n    padding: 0 15px;\n  }\n}\n\n.cropped-image {\n  margin: 0px;\n  padding: 0px;\n  width: 100%; /* Container width */\n  height: 300px; /* Fixed height */\n  overflow: hidden; /* Hide parts outside container */\n  overflow: hidden;\n}\n\n.cropped-image img {\n  /* Center the image horizontally */\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  /* Optional: adjust vertical position */\n  max-width: none; /* IMPORTANT: Prevents the image from resizing to fit container */\n  /* Maintain aspect ratio */\n  height: 100%;\n  width: auto;\n  z-index: -1; /* Place behind all other content */\n}\n\n/* Update the banner image class for pixel-perfect rendering */\n.banner-image {\n  /* Pixel-perfect rendering properties */\n  image-rendering: pixelated;\n  image-rendering: -moz-crisp-edges;\n  image-rendering: crisp-edges;\n  -ms-interpolation-mode: nearest-neighbor; /* IE */\n  /* Center the image */\n  display: block;\n  margin: 0 auto;\n  /* Prevent distortion */\n  max-width: 100%;\n  height: auto;\n  /* Maintain aspect ratio and original pixel grid */\n  transform-origin: center;\n  /* Original styles */\n  border-radius: 8px 8px 0 0;\n  /* Add a container around the image with a specific width if needed */\n  /* Example - adjust based on actual image dimensions */\n}\n\n.image-placeholder {\n  margin-bottom: 450px; /* More specific and forceful for testing */\n}\n@media (min-width: 2001px) {\n  .image-placeholder {\n    margin-bottom: 650px;\n  }\n}\n@media (min-width: 1501px) and (max-width: 2000px) {\n  .image-placeholder {\n    margin-bottom: 650px;\n  }\n}\n@media (min-width: 769px) and (max-width: 1500px) {\n  .image-placeholder {\n    margin-bottom: 400px;\n  }\n}\n@media (max-width: 768px) {\n  .image-placeholder {\n    margin-bottom: 175px;\n  }\n}\n\n.content {\n  background: rgba(0, 0, 0, 0.45);\n  padding: 25px 25px 25px 25px;\n  margin-bottom: 25px;\n  border-radius: 8px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#fullpage {\n  display: none;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.85); /* Add overlay background */\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n}\n#fullpage .fullpage-image {\n  width: 90%; /* Reduced from 100% to create margin */\n  height: 90%; /* Reduced from 100% to create margin */\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-color: transparent;\n  image-rendering: pixelated;\n  image-rendering: crisp-edges;\n  transform-origin: center center;\n  margin: 5vh auto; /* Add vertical and horizontal margin */\n}\n\n.gallery-container {\n  width: 100%;\n  margin: 0 auto;\n}\n\n.artwork-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  justify-content: center;\n}\n@media (min-width: 2001px) {\n  .artwork-grid .artwork-item {\n    flex: 0 0 calc(25% - 15px);\n    max-width: calc(25% - 15px);\n  }\n}\n@media (min-width: 1501px) and (max-width: 2000px) {\n  .artwork-grid .artwork-item {\n    flex: 0 0 calc(33.333% - 14px);\n    max-width: calc(33.333% - 14px);\n  }\n}\n@media (min-width: 764px) and (max-width: 1500px) {\n  .artwork-grid .artwork-item {\n    flex: 0 0 calc(50% - 10px);\n    max-width: calc(50% - 10px);\n  }\n}\n\n.artwork-item {\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  overflow: hidden;\n  margin-bottom: 20px;\n  position: relative;\n  display: inline-block;\n}\n.artwork-item img {\n  object-fit: contain;\n  width: 100%;\n  image-rendering: pixelated;\n  image-rendering: crisp-edges;\n  border-radius: 8px 8px 0 0;\n  display: block;\n}\n@media (max-width: 768px) {\n  .artwork-item {\n    flex: 0 0 100%;\n    max-width: none;\n  }\n}\n.artwork-item:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);\n  background: rgba(0, 0, 0, 0.45);\n}\n\n.artwork-image-large {\n  object-fit: contain;\n  image-rendering: pixelated;\n  image-rendering: crisp-edges;\n  max-width: 100%;\n  border-radius: 8px 8px 0 0;\n}\n\n.artwork-info {\n  position: relative;\n  background-color: #3c3f41;\n  font-size: 2.4rem;\n  color: #fff;\n  padding: 10px 20px;\n  text-align: center;\n}\n.artwork-info .artwork-title {\n  margin: 0 0 15px 0;\n  color: #FFFFFF;\n  color: rgba(255, 255, 255, 0.85);\n}\n.artwork-info .artwork-description {\n  display: none;\n  color: rgba(255, 255, 255, 0.85);\n}\n\n.icon-image {\n  height: 100px;\n  width: 100%;\n  object-fit: fill;\n  border-radius: 8px 8px 0 0;\n  filter: invert(28%) sepia(79%) saturate(2476%) hue-rotate(56deg) brightness(118%) contrast(119%);\n}\n\n.icon-item .icon-info {\n  padding: 10px;\n  margin-right: 10px;\n}\n.icon-item .icon-info .icon-title {\n  font-size: 2.4rem;\n  margin: 0 0 10px 0;\n  color: #FFFFFF;\n}\n.icon-item .icon-info .icon-description {\n  font-size: 2.4rem;\n  color: rgba(255, 255, 255, 0.85);\n  line-height: 1.2;\n  text-align: center;\n}\n\nblockquote {\n  border-left: 2px solid rgb(87.393258427, 249.5, 50.5);\n  margin: 1.6em 0;\n  padding: 1.5em;\n  font-size: 1.8rem;\n  background: rgba(0, 0, 0, 0.05);\n  border-radius: 8px;\n}\nblockquote p:last-child {\n  margin-bottom: 0;\n}", "",{"version":3,"sources":["webpack://./src/styles/fonts.scss","webpack://./src/styles/main.scss"],"names":[],"mappings":"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","sourcesContent":["\n// Font imports\n@font-face {\n  font-family: 'alagard';\n  src: url('../fonts/alagard.ttf') format('truetype');\n  font-weight: 600;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'monaco';\n  src: url('../fonts/monaco.ttf') format('truetype');\n  font-weight: 600;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'RobotoMono';\n  src: url('../fonts/RobotoMono-Light.ttf') format('truetype');\n  font-weight: 600;\n  font-style: normal;\n}\n","@use \"sass:color\";\n@use 'sass:math' as math;\n@use 'fonts' as *;\n\n// Variables\n$header-font: 'monaco';\n$body-font: 'alagard';\n$description-font:  'monaco'; //'RobotoMono', monospace;\n$accent-color: #5eef3d;\n$text-light: #FFFFFF;\n$card-bg: rgba(0, 0, 0, 0.45);\n$border-radius: 8px;\n$page-bg: rgba(37, 29, 36, 1.0);\n\n// Base styles\nhtml {\n  font-size: 16px; // Base size to calculate rem from\n  min-width: 100vw;\n  margin: 0;\n  padding: 0;\n  background-color: $page-bg;\n\n  //background: url('../images/capsule5.png');\n  //min-height: 100vh;\n  //background-repeat: no-repeat;\n  //background-attachment: scroll;\n  //background-attachment: scroll;\n  //background-position: center 0;\n  //background-size:  100%;\n\n  //background-blend-mode: normal;\n\n  @media (max-width: 768px) {\n    font-size: 14px; // Smaller base on mobile\n  }\n  //overflow-x: hidden; /* Prevent horizontal scrolling */\n\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-size: clamp(2rem, 5vw, 4rem);\n  line-height: 1.0;\n  font-weight: 400;\n  font-family: $body-font;\n  color: $text-light;\n  max-width: 1200px;\n  margin: 25px auto;\n  padding: 0 20px;\n  letter-spacing: 0rem;\n  overflow-x: hidden; /* Prevent horizontal scrolling */\n\n}\n\n// Typography\nh1, h2, h3, h4, h5, h6 {\n  line-height: 1;\n  //text-rendering: optimizeLegibility;\n  //text-rendering: geometricPrecision;\n  text-rendering: optimizeSpeed;\n  font-smooth: never;\n  -webkit-font-smoothing: none;\n  margin-top: 0;\n  margin-bottom: 2rem;\n  font-weight: 300;\n  font-family: $header-font;\n  color: $text-light;\n}\n\nh1 { font-size: 6rem; line-height: 1.25; letter-spacing: 0rem; }\nh2 { font-size: 6rem; line-height: 1.3; letter-spacing: 0rem; }\nh3 { font-size: 5rem; line-height: 1.35; letter-spacing: 0rem; }\nh4 { font-size: 5rem; line-height: 1.5; letter-spacing: 0rem; }\nh5 { font-size: 3rem; line-height: 1.6; letter-spacing: 0rem; }\nh6 { font-size: 3rem; line-height: 1.0; letter-spacing: 0rem; }\n\n\n.pixel-perfect-text {\n  font-size: 32px; // Base font size (usually pixel font's design size)\n  // Use math.div() instead of / operator\n  $base-width: 320px;\n  $scale-factor: math.floor(math.div(100vw, $base-width));\n  $scale-factor: math.max(1, $scale-factor);\n\n  transform-origin: left top;\n  transform: scale($scale-factor);\n}\n\n\n// Marketing section styling\n.marketing-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  background: $card-bg;\n  padding: 25px;\n  margin-bottom: 25px;\n  border-radius: $border-radius;\n}\n\n.tagline {\n  margin-bottom: 20px;\n  color: $accent-color;\n}\n\n.game-description {\n  margin: 20px 0;\n  max-width: 800px;\n}\n\n.cta-button {\n  margin-top: 20px;\n  padding: 10px 20px;\n  background-color: $accent-color;\n  color: #000;\n  border-radius: 4px;\n  display: inline-block;\n  transition: background-color 0.3s ease;\n\n  &:hover {\n    background-color: color.adjust($accent-color, $lightness: -10%);\n  }\n}\n\n// Links\na {\n  font-weight: normal;\n  text-decoration: none;\n  color: $accent-color;\n\n  &:focus {\n    outline: thin dotted;\n    color: color.adjust($accent-color, $lightness: 10%);\n  }\n}\n\nheader {\n  margin-bottom: 25px;\n  border-radius: $border-radius;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}\nfooter {\n  background: $card-bg;\n  padding: 25px;\n  margin-bottom: 25px;\n  border-radius: $border-radius;\n}\n\n// Adjust content container width for larger screens\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  max-width: 2400px; // Increased to match gallery container\n  margin: 25px auto;\n  padding: 0 30px; // Increased padding for larger screens\n\n\n  // Create a proper grid layout\n  @media (min-width: 2001px) {\n    max-width: 2400px;\n  }\n\n  @media (min-width: 1501px) and (max-width: 2000px) {\n    max-width: 1400px;\n  }\n\n  @media (min-width: 769px) and (max-width: 1500px) {\n    max-width: 800px;\n  }\n\n  @media (max-width: 768px) {\n    max-width: 700px;\n    padding: 0 15px;\n  }\n}\n\n.cropped-image {\n  margin: 0px;\n  padding: 0px;\n  //margin-top: 0;       /* Ensure no top margin */\n  //padding-top: 0;      /* Ensure no top padding */\n  width: 100%; /* Container width */\n  height: 300px; /* Fixed height */\n  overflow: hidden; /* Hide parts outside container */\n  //position: relative;\n  overflow: hidden;\n\n}\n\n.cropped-image img {\n  /* Center the image horizontally */\n\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  /* Optional: adjust vertical position */\n  //top: 0;\n  max-width: none;     /* IMPORTANT: Prevents the image from resizing to fit container */\n\n  /* Maintain aspect ratio */\n  height: 100%;\n  width: auto;\n  z-index: -1; /* Place behind all other content */\n}\n\n\n/* Update the banner image class for pixel-perfect rendering */\n.banner-image {\n  /* Pixel-perfect rendering properties */\n  image-rendering: pixelated;\n  image-rendering: -moz-crisp-edges;\n  image-rendering: crisp-edges;\n  -ms-interpolation-mode: nearest-neighbor; /* IE */\n\n  /* Center the image */\n  display: block;\n  margin: 0 auto;\n\n  /* Prevent distortion */\n  max-width: 100%;\n  height: auto;\n\n  /* Maintain aspect ratio and original pixel grid */\n  transform-origin: center;\n\n  /* Original styles */\n  border-radius: $border-radius $border-radius 0 0;\n\n  /* Add a container around the image with a specific width if needed */\n  /* Example - adjust based on actual image dimensions */\n  //width: calc(min(800px, 100%));\n}\n\n.image-placeholder {\n  //margin-top: calc(100vh * 0.3552 + 47.6051px);\n  margin-bottom: 450px; /* More specific and forceful for testing */\n\n  @media (min-width: 2001px) { // 4 items per row for very large screens\n    margin-bottom: 650px;\n  }\n\n  @media (min-width: 1501px) and (max-width: 2000px) { // 3 items per row\n    margin-bottom: 650px;\n  }\n\n  @media (min-width: 769px) and (max-width: 1500px) { // 2 items per row\n    margin-bottom: 400px;\n  }\n\n  @media (max-width: 768px) {\n    margin-bottom: 175px;\n  }\n\n}\n\n// Content sections\n.content {\n  background: $card-bg;\n  padding: 25px 25px 25px 25px;\n  margin-bottom: 25px;\n  border-radius: $border-radius;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#fullpage {\n  display: none;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.85); /* Add overlay background */\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n\n  .fullpage-image {\n    width: 90%; /* Reduced from 100% to create margin */\n    height: 90%; /* Reduced from 100% to create margin */\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-color: transparent;\n    image-rendering: pixelated;\n    image-rendering: crisp-edges;\n    //transform: scale(1); /* Integer scaling for pixel art */\n    transform-origin: center center;\n    margin: 5vh auto; /* Add vertical and horizontal margin */\n  }\n}\n\n// Gallery styles\n.gallery-container {\n  width: 100%;\n  //max-width: 2400px; // Increased for large monitors\n  margin: 0 auto;\n}\n\n.artwork-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  justify-content: center;\n\n  // Create a proper grid layout\n  @media (min-width: 2001px) { // 4 items per row for very large screens\n    .artwork-item {\n      //background: color.adjust($card-bg, $alpha: 0.9);\n      flex: 0 0 calc(25% - 15px);\n      max-width: calc(25% - 15px);\n    }\n  }\n\n  @media (min-width: 1501px) and (max-width: 2000px) { // 3 items per row\n    .artwork-item {\n      //background: color.adjust($card-bg, $alpha: 0.9);\n      flex: 0 0 calc(33.333% - 14px);\n      max-width: calc(33.333% - 14px);\n    }\n  }\n\n  @media (min-width: 764px) and (max-width: 1500px) { // 2 items per row\n    .artwork-item {\n      //background: color.adjust($card-bg, $alpha: 0.9);\n      flex: 0 0 calc(50% - 10px);\n      max-width: calc(50% - 10px);\n    }\n  }\n}\n\n.artwork-item {\n  border-radius: $border-radius;\n  box-shadow: 0 4px 12px color.adjust($card-bg, $alpha: -0.5);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  overflow: hidden;\n  margin-bottom: 20px;\n  position: relative;\n  display: inline-block;\n\n  img {\n    object-fit: contain;\n    width: 100%;\n    image-rendering: pixelated;\n    image-rendering: crisp-edges;\n    border-radius: $border-radius $border-radius 0 0;\n    display: block;\n    //@media (max-width: 768px) {\n    //  height: 300px;\n    //}\n  }\n\n  // Default (mobile) styling\n  @media (max-width: 768px) {\n    flex: 0 0 100%;\n    max-width: none;\n  }\n\n  &:hover {\n    transform: translateY(-5px);\n    box-shadow: 0 6px 16px color.adjust($card-bg, $alpha: -0.4);\n    background: color.adjust($card-bg, $alpha: 0);\n  }\n}\n\n.artwork-image-large {\n  object-fit: contain;\n  image-rendering: pixelated;\n  image-rendering: crisp-edges;\n\n  max-width: 100%;\n  border-radius: $border-radius $border-radius 0 0;\n}\n\n\n.artwork-info {\n  position: relative;\n  background-color: #3c3f41;\n  font-size: 2.4rem;\n  color: #fff;\n  padding: 10px 20px;\n  text-align: center;\n\n  .artwork-title {\n    margin: 0 0 15px 0;\n    color: $text-light;\n    color: color.adjust($text-light, $alpha: -0.15);\n  }\n\n  .artwork-description {\n    display: none;\n    color: color.adjust($text-light, $alpha: -0.15);\n  }\n}\n\n.icon-image {\n  height: 100px;\n  width: 100%;\n  object-fit: fill;\n  border-radius: $border-radius $border-radius 0 0;\n  filter: invert(28%) sepia(79%) saturate(2476%) hue-rotate(56deg) brightness(118%) contrast(119%);\n}\n\n.icon-item {\n  .icon-info {\n    padding: 10px;\n    margin-right: 10px;\n\n    .icon-title {\n      font-size: 2.4rem;\n      margin: 0 0 10px 0;\n      color: $text-light;\n    }\n\n    .icon-description {\n      font-size: 2.4rem;\n      color: color.adjust($text-light, $alpha: -0.15);\n      line-height: 1.2;\n      text-align: center;\n    }\n  }\n}\n\n\n// Blockquote styles\nblockquote {\n  border-left: 2px solid color.adjust($accent-color, $saturation: 10%);\n  margin: 1.6em 0;\n  padding: 1.5em;\n  font-size: 1.8rem;\n  background: color.adjust($card-bg, $alpha: -0.4);\n  border-radius: $border-radius;\n\n  p:last-child {\n    margin-bottom: 0;\n  }\n}\n\n\n"],"sourceRoot":""}]);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/logo.jpg");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/capsule4.png");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/capsule5.png");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/icon.png");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/boon_placeholder.png");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/title-logo.png");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/screenshot1-orthogonal.jpg");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/screenshot_terrain_hud.jpg");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/screenshot_hud_trade.jpg");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/trailer_combat_simple.gif");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/mail.svg");

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/mailbox.svg");

/***/ }),
/* 28 */
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
/* harmony import */ var _images_logo_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _images_capsule4_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _images_capsule5_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _images_icon_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _images_boon_placeholder_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);
/* harmony import */ var _images_title_logo_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(21);
/* harmony import */ var _images_screenshot1_orthogonal_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(22);
/* harmony import */ var _images_screenshot_terrain_hud_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(23);
/* harmony import */ var _images_screenshot_hud_trade_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(24);
/* harmony import */ var _images_trailer_combat_simple_gif__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(25);
/* harmony import */ var _images_mail_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(26);
/* harmony import */ var _images_mailbox_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(27);
/* harmony import */ var _images_social_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(28);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

// import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)


// import './images/capsule.png';
// import './images/capsule1.png';
// import './images/capsule2.png';
// import './images/capsule3.png';


















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

// Handles integer scaling with overflow protection
const applyIntegerScaling = () => {
    const imgs = document.querySelectorAll('.artwork-item img');

    imgs.forEach(img => {
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
    });
};

window.onload = ev => {
    init();
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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map