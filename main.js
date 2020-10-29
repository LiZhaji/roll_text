"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: lizhaji
 * @Date: 2020-10-22 19:27:49
 * @Last Modified by: lizhaji
 * @Last Modified time: 2020-10-29 21:51:36
 */

/**
 * 最终的距离应为文字的宽度，无法在css实现。所以css版弃用，改为js动画
 *
 * 防攻击
 */
class Roll {
  options = {
    container: "",
    width: 100,
    content: "",
    speed: 1,
    direction: "normal"
  };
  containerBox = null; // 元素容器

  textBox = null; // 文字容器

  initialDistance = 0; // 初始距离

  finalDistance = 0; // 最终距离

  _curDistance = 0; // 当前距离

  _step = 0; // 根据speed计算每次移动的距离

  movingFlag = false; // 是否在移动

  raf = null;
  _keyframeMap = {
    normal: "move-normal",
    reverse: "move-reverse"
  };

  constructor(options) {
    const {
      container = "",
      speed = 1
    } = options;

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

  _init() {
    this._initDom();

    this._initDistance();
  }

  _initDom() {
    const {
      container,
      width,
      height
    } = this.options;
    const containerBox = document.querySelector("".concat(container)); // 添加样式

    containerBox.style.width = "".concat(width, "px");
    containerBox.style.overflow = "hidden"; // 创建文字容器

    const textBox = "<div style=\"white-space: nowrap; width: fit-content;transform: translateX(100%);\">".concat(this.options.content || containerBox.innerHTML, "</div>");
    containerBox.innerHTML = textBox;
    this.containerBox = containerBox;
    this.textBox = containerBox.firstElementChild;
    console.log("_initDom success");
  } // TODO 值未改变，不需要重新赋值的情况


  diff() {}

  _render() {
    this.textBox.innerHTML = this.options.options.content || this.containerBox.innerHTML;
    this.finalDistance = this.textBox.clientWidth;
    this._step = this.options.options.speed;
  }

  _initDistance() {
    this._curDistance = this.initialDistance = this.options.width;
    this.finalDistance = this.textBox.clientWidth;
    this._step = this.options.speed;
  }

  _move() {
    const _this = this;

    let lastTime = Date.now();

    function move() {
      try {
        // 60fps
        const nextTime = Date.now();

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

  _start() {
    if (this.movingFlag) {
      return;
    }

    this.movingFlag = true;

    this._move();
  }

  _stop() {
    this.movingFlag = false;
    cancelAnimationFrame(this.raf);
  }

  _reset() {
    this._initDistance();
  } // 开始滚动


  start() {
    this._start();
  } // 停止滚动


  stop() {
    this._stop();
  } // 复位


  reset() {
    this._reset();
  }

}

var _default = Roll;
exports.default = _default;
