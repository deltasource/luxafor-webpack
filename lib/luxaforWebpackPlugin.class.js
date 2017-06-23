"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function off(e){try{e.off()}catch(e){}}function setColor(e,t){try{e.setColor(t,255)}catch(e){}}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),Luxafor=require("luxafor-api"),DEFAULTS=Object.freeze({WARNING_COLOR:"#ff6f00",BUILDING_COLOR:"#4a148c",ERROR_COLOR:"#b71c1c",SUCCESS_COLOR:"#1b5e20",LED_AUTO_OFF_TIMEOUT:5e3}),LuxaforWebpackPlugin=function(){function e(){_classCallCheck(this,e),this._timeOut=null,this._device=new Luxafor({}),off(this._device)}return _createClass(e,[{key:"apply",value:function(e){var t=this;e.plugin("run",function(){t._timeOut&&clearTimeout(t._timeOut),setColor(t._device,DEFAULTS.BUILDING_COLOR)}),e.plugin("done",function(e){t._onCompilationDone(e)})}},{key:"_onCompilationDone",value:function(e){var t=this;e.hasErrors()?setColor(this._device,DEFAULTS.ERROR_COLOR):e.hasWarnings()?setColor(this._device,DEFAULTS.WARNING_COLOR):setColor(this._device,DEFAULTS.SUCCESS_COLOR),this._timeOut=setTimeout(function(){off(t._device)},DEFAULTS.LED_AUTO_OFF_TIMEOUT)}}]),e}();exports.default=LuxaforWebpackPlugin;