"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.date.now");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: lizhaji
 * @Date: 2020-10-22 19:27:49
 * @Last Modified by: lizhaji
 * @Last Modified time: 2020-10-29 22:43:52
 */

/**
 * 最终的距离应为文字的宽度，无法在css实现。所以css版弃用，改为js动画
 *
 * 防攻击
 */
var Roll = /*#__PURE__*/function () {
  // 元素容器
  // 文字容器
  // 初始距离
  // 最终距离
  // 当前距离
  // 根据speed计算每次移动的距离
  // 是否在移动
  function Roll(options) {
    _classCallCheck(this, Roll);

    _defineProperty(this, "options", {
      container: "",
      width: 100,
      content: "",
      speed: 1,
      direction: "normal"
    });

    _defineProperty(this, "containerBox", null);

    _defineProperty(this, "textBox", null);

    _defineProperty(this, "initialDistance", 0);

    _defineProperty(this, "finalDistance", 0);

    _defineProperty(this, "_curDistance", 0);

    _defineProperty(this, "_step", 0);

    _defineProperty(this, "movingFlag", false);

    _defineProperty(this, "raf", null);

    _defineProperty(this, "_keyframeMap", {
      normal: "move-normal",
      reverse: "move-reverse"
    });

    var _options$container = options.container,
        container = _options$container === void 0 ? "" : _options$container,
        _options$speed = options.speed,
        speed = _options$speed === void 0 ? 1 : _options$speed;

    if (!container) {
      throw new Error("Roll实例化出错，参数container不能为空！");
    }

    if (speed <= 0) {
      throw new Error("Roll实例化出错，参数speed应大于0！");
    } // 保存一个引用，以支持将来content和speed的修改


    this.options = Object.assign(_objectSpread({}, this.options), options, {
      options: options
    });

    this._init();
  }

  _createClass(Roll, [{
    key: "_init",
    value: function _init() {
      this._initDom();

      this._initDistance();
    }
  }, {
    key: "_initDom",
    value: function _initDom() {
      var _this$options = this.options,
          container = _this$options.container,
          width = _this$options.width,
          height = _this$options.height;
      var containerBox = document.querySelector("".concat(container)); // 添加样式

      containerBox.style.width = "".concat(width, "px");
      containerBox.style.overflow = "hidden"; // 创建文字容器

      var textBox = "<div style=\"white-space: nowrap; width: fit-content;transform: translateX(100%);\">".concat(this.options.content || containerBox.innerHTML, "</div>");
      containerBox.innerHTML = textBox;
      this.containerBox = containerBox;
      this.textBox = containerBox.firstElementChild;
      console.log("_initDom success");
    } // TODO 值未改变，不需要重新赋值的情况

  }, {
    key: "diff",
    value: function diff() {}
  }, {
    key: "_render",
    value: function _render() {
      this.textBox.innerHTML = this.options.options.content || this.containerBox.innerHTML;
      this.finalDistance = this.textBox.clientWidth;
      this._step = this.options.options.speed;
    }
  }, {
    key: "_initDistance",
    value: function _initDistance() {
      this._curDistance = this.initialDistance = this.options.width;
      this.finalDistance = this.textBox.clientWidth;
      this._step = this.options.speed;
    }
  }, {
    key: "_move",
    value: function _move() {
      var _this = this;

      var lastTime = Date.now();

      function move() {
        try {
          // 60fps
          var nextTime = Date.now();

          if (nextTime - lastTime <= 60 / 1000) {
            return;
          }

          lastTime = nextTime;

          _this._render();

          _this._curDistance -= _this._step;

          if (_this._curDistance < -_this.finalDistance) {
            _this._curDistance = _this.initialDistance;
          }

          _this.textBox.style.transform = "translateX(".concat(_this._curDistance, "px)");
        } catch (error) {
          throw new Error(error);
        } finally {
          _this.raf = requestAnimationFrame(move);
        }
      }

      this.raf = requestAnimationFrame(move);
    }
  }, {
    key: "_start",
    value: function _start() {
      if (this.movingFlag) {
        return;
      }

      this.movingFlag = true;

      this._move();
    }
  }, {
    key: "_stop",
    value: function _stop() {
      this.movingFlag = false;
      cancelAnimationFrame(this.raf);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._initDistance();
    } // 开始滚动

  }, {
    key: "start",
    value: function start() {
      this._start();
    } // 停止滚动

  }, {
    key: "stop",
    value: function stop() {
      this._stop();
    } // 复位

  }, {
    key: "reset",
    value: function reset() {
      this._reset();
    }
  }]);

  return Roll;
}();

var _default = Roll;
exports["default"] = _default;
