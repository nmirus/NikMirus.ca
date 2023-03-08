"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: poster image
// TODO: gatsby-image poster
var isClient = typeof window !== "undefined"; // props sources format :
//
// const sources = {
//   1920: "",
//   1280: "",
//   960: "",
//   640: "",
// }

var InlineVideo =
/*#__PURE__*/
function (_Component) {
  _inherits(InlineVideo, _Component);

  function InlineVideo(props) {
    var _this;

    _classCallCheck(this, InlineVideo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InlineVideo).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      playing: true
    });

    _defineProperty(_assertThisInitialized(_this), "touchStart", function () {
      _this.setState({
        playing: false
      });

      _this.video.current.addEventListener("playing", _this.playing);

      _this.video.current.addEventListener("play", _this.playing);

      _this.video.current.addEventListener("stop", _this.stop);

      _this.video.current.addEventListener("pause", _this.stop);

      _this.video.current.addEventListener("click", _this.videoOnClick);
    });

    _defineProperty(_assertThisInitialized(_this), "playing", function (e) {
      _this.setState({
        playing: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function (e) {
      _this.setState({
        playing: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isPlaying", function () {
      return _this.video.current.currentTime > 0 && !_this.video.current.paused && !_this.video.current.ended && _this.video.current.readyState > 2;
    });

    _defineProperty(_assertThisInitialized(_this), "buttonOnClick", function (e) {
      e.stopPropagation();

      _this.video.current.play();
    });

    _defineProperty(_assertThisInitialized(_this), "videoOnClick", function (e) {
      e.stopPropagation();

      if (_this.isPlaying()) {
        _this.video.current.pause();
      } else {
        _this.video.current.play();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "determineVideoSrc", function () {
      if (typeof _this.props.sources === "string") {
        return _this.props.sources;
      }

      var wIW = isClient ? window.innerWidth : 0;
      var keys = Object.keys(_this.props.sources).sort(function (a, b) {
        return b - a;
      });
      var src = _this.props.sources[keys[keys.length - 1]];
      keys.map(function (key) {
        if (wIW <= key) {
          src = _this.props.sources[key];
        }
      });
      return src;
    });

    _this.video = _react["default"].createRef();
    _this.removeEventsOnUnmount = false;
    return _this;
  }

  _createClass(InlineVideo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (isClient && !this.isPlaying()) {
        window.addEventListener("touchstart", this.touchStart);
        this.removeEventsOnUnmount = true;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.removeEventsOnUnmount) {
        window.removeEventListener("touchstart", this.touchStart);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autoplay = _this$props.autoplay,
          videoStyle = _this$props.videoStyle,
          button = _this$props.button;
      return _react["default"].createElement("div", {
        className: "InlineVideo"
      }, _react["default"].createElement("video", {
        className: "InlineVideo-Video",
        ref: this.video,
        playsInline: true,
        autoPlay: autoplay,
        loop: true,
        muted: true,
        style: videoStyle
      }, _react["default"].createElement("source", {
        src: this.determineVideoSrc(),
        type: "video/mp4"
      })), !this.state.playing && button && _react["default"].createElement("button", {
        className: "InlineVideo-Button",
        onClick: this.buttonOnClick
      }, "Play"));
    }
  }]);

  return InlineVideo;
}(_react.Component);

InlineVideo.defaultProps = {
  autoplay: true,
  button: true,
  videoStyle: {}
};
InlineVideo.propTypes = {
  autoplay: _propTypes["default"].bool // sources: PropTypes.object.isRequired,

};
var _default = InlineVideo;
exports["default"] = _default;
