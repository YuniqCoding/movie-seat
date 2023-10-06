// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/components/login.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// src/components/Login.js
var Login = /*#__PURE__*/function () {
  function Login(emailInput, passwordInput) {
    _classCallCheck(this, Login);
    this.emailInput = emailInput;
    this.passwordInput = passwordInput;
    this.render();
  }
  _createClass(Login, [{
    key: "checkRequiredValueIsEnteredInField",
    value: function checkRequiredValueIsEnteredInField() {
      return [this.emailInput, this.passwordInput].every(function (input) {
        return input.value.trim() !== "";
      });
    }
  }, {
    key: "checkEmailFormat",
    value: function checkEmailFormat() {
      var re = /^[a-zA-Z0-9\.]+@[a-z0-9-_\.]+\.co$/;
      var email = this.emailInput.value;
      return re.test(email.trim());
    }
  }, {
    key: "checkPasswordInputLength",
    value: function checkPasswordInputLength(minLength, maxLength) {
      var passwordLength = this.passwordInput.value.length;
      return !(passwordLength < minLength || passwordLength > maxLength);
    }
  }, {
    key: "checkPasswordCombinationValidation",
    value: function checkPasswordCombinationValidation() {
      var re = /^(?=.*[a-zA-Z])(?=.*[!@~])(?=.*[0-9])[a-zA-Z0-9!@~]{8,20}$/;
      var password = this.passwordInput.value;
      return re.test(password);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var validations = [{
        fn: this.checkRequiredValueIsEnteredInField,
        errMsg: "아이디 혹은 비밀번호가 입력되지 않았습니다."
      }, {
        fn: this.checkEmailFormat,
        errMsg: "이메일 형식이 올바르지 않습니다."
      }, {
        fn: function fn() {
          return _this.checkPasswordInputLength(8, 20);
        },
        errMsg: "비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다."
      }, {
        fn: this.checkPasswordCombinationValidation,
        errMsg: "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다."
      }];
      for (var _i = 0, _validations = validations; _i < _validations.length; _i++) {
        var validation = _validations[_i];
        if (!validation.fn.call(this)) {
          alert(validation.errMsg);
          return;
        }
      }
      alert("로그인 성공!");
      location.reload();
    }
  }]);
  return Login;
}();
var _default = Login;
exports.default = _default;
},{}],"src/components/TheaterHandlers/initializeTheaterHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetTheater = void 0;
// src/components/TheaterHandlers/initializeTheaterHandler.js

var resetNumOfMoviegoers = function resetNumOfMoviegoers() {
  // 1
  var toggleList = document.querySelectorAll(".toggle");
  toggleList.forEach(function (elem) {
    return elem.classList.remove("toggle");
  });
  document.querySelector("#adultBtn").children[0].classList.add("toggle");
  document.querySelector("#youthBtn").children[0].classList.add("toggle");
};
var resetHandicapCheckbox = function resetHandicapCheckbox() {
  // 2
  var checkHandicap = document.querySelector("#checkHandicap");
  checkHandicap.checked = false;
  checkHandicap.disabled = true;
};
var resetTheaterSeats = function resetTheaterSeats() {
  // 3
  var theaterSeatList = document.querySelectorAll("#theaterSeat > .seat");
  theaterSeatList.forEach(function (elem) {
    if (elem.classList.contains("clicked")) elem.classList.remove("clicked");
    if (!elem.classList.contains("disabled")) elem.classList.add("disabled");
  });
};
var resetSeatBuffAndPriceInfo = function resetSeatBuffAndPriceInfo(seatBuff) {
  // 4
  if (seatBuff) {
    seatBuff.length = 0;
  }
  document.querySelector("#remainSeatCnt").innerHTML = 39;
  document.querySelector("#amount").innerHTML = 0;
};

/* 좌석 초기화 클릭 이벤트 핸들러 */
var resetTheater = function resetTheater(seatBuff) {
  // 5
  resetNumOfMoviegoers();
  resetHandicapCheckbox();
  resetTheaterSeats();
  resetSeatBuffAndPriceInfo(seatBuff);
};
exports.resetTheater = resetTheater;
},{}],"src/components/TheaterHandlers/seatsHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numOfYouth = exports.numOfAdult = exports.musseukboxHandler = exports.handicapHandler = exports.handicapCheckboxHandler = exports.generalHandler = void 0;
// src/components/TheaterHandlers/seatsHandler.js

var toggleSeats = function toggleSeats(selector, enable) {
  var seatBtns = document.querySelectorAll(selector);
  seatBtns.forEach(function (elem) {
    elem.classList.toggle("disabled", !enable);
  });
};
var numOfAdult = function numOfAdult() {
  var toggleList = document.querySelectorAll(".toggle");
  var numOfAdult = parseInt(toggleList[0].innerHTML);
  return numOfAdult;
};
exports.numOfAdult = numOfAdult;
var numOfYouth = function numOfYouth() {
  var toggleList = document.querySelectorAll(".toggle");
  var numOfYouth = parseInt(toggleList[1].innerHTML);
  return numOfYouth;
};
exports.numOfYouth = numOfYouth;
var handicapCheckboxHandler = function handicapCheckboxHandler(enable) {
  var checkHandicap = document.getElementById("checkHandicap");
  checkHandicap.disabled = !enable;
};
exports.handicapCheckboxHandler = handicapCheckboxHandler;
var handicapHandler = function handicapHandler(enable) {
  toggleSeats("button.seat.handicap", enable);
};
exports.handicapHandler = handicapHandler;
var musseukboxHandler = function musseukboxHandler(enable) {
  toggleSeats("button.seat.musseukbox", enable);
};
exports.musseukboxHandler = musseukboxHandler;
var generalHandler = function generalHandler(enable) {
  toggleSeats("button.seat:not(.handicap):not(.musseukbox)", enable);
};
exports.generalHandler = generalHandler;
},{}],"src/components/TheaterEvents/moviegoersEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numOfMoviegoersEvent = void 0;
var _initializeTheaterHandler = require("../TheaterHandlers/initializeTheaterHandler.js");
var _seatsHandler = require("../TheaterHandlers/seatsHandler.js");
// src/components/TheaterEvents/moviegoersEvent.js

var setDefaultSelection = function setDefaultSelection() {
  ["adultBtn", "youthBtn"].forEach(function (id) {
    document.querySelector("#".concat(id)).children[0].classList.add("toggle");
  });
};
var addEventListenersToElements = function addEventListenersToElements(selector, event, eventHandler) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.addEventListener(event, eventHandler);
  });
};
var alertAndToggleClass = function alertAndToggleClass(alertMessage, savedToggleData, eventTarget) {
  alert(alertMessage);
  savedToggleData.classList.add("toggle");
  eventTarget.classList.remove("toggle");
};
var checkSeatType = function checkSeatType(numOfMoviegoers, savedToggleData, eventTarget) {
  var seatType;
  var seatBtnClassname = document.getElementsByClassName("clicked")[0].classList[1];
  if (seatBtnClassname == "clicked") seatType = document.querySelectorAll("button.seat:not(.handicap):not(.musseukbox)");else seatType = document.querySelectorAll("button.seat." + seatBtnClassname);
  var clickedMusseukSeats = document.querySelectorAll("button.seat.musseukbox.clicked");
  if (checkHandicap.checked && numOfMoviegoers > 3) {
    alertAndToggleClass("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.", savedToggleData, eventTarget);
  } else if (clickedMusseukSeats.length > 0 && numOfMoviegoers % 2 !== 0) {
    alertAndToggleClass("선택하신 'MUSSEUKBOX' 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요.", savedToggleData, eventTarget);
  } else {
    seatType.forEach(function (elem) {
      if (!elem.classList.contains("clicked")) {
        elem.classList.remove("disabled");
      }
    });
  }
};
var toggleSeatHandlers = function toggleSeatHandlers(state) {
  (0, _seatsHandler.generalHandler)(state);
  (0, _seatsHandler.musseukboxHandler)(state);
  (0, _seatsHandler.handicapCheckboxHandler)(state);
  (0, _seatsHandler.handicapHandler)(state);
};
var numOfMoviegoersBtnHandle = function numOfMoviegoersBtnHandle(event, seatBuff) {
  var savedToggleData;
  if (!event.target.classList.contains("toggle")) {
    event.target.classList.add("toggle");
    document.querySelectorAll(".toggle").forEach(function (toggle) {
      if (event.target.classList[1] == toggle.classList[1] && event.target.innerHTML != toggle.innerHTML) toggle.classList.remove("toggle");
      if (!toggle.classList.contains("toggle")) {
        savedToggleData = toggle;
      }
    });
  }
  var clickedSeatLen = document.querySelectorAll(".clicked").length;
  var numOfMoviegoers = (0, _seatsHandler.numOfAdult)() + (0, _seatsHandler.numOfYouth)();
  var checkHandicap = document.querySelector("#checkHandicap");
  if (clickedSeatLen === 0) {
    if (numOfMoviegoers === 0) {
      toggleSeatHandlers(false);
    } else {
      toggleSeatHandlers(true);
      if (!checkHandicap.checked) {
        if (numOfMoviegoers > 3) {
          (0, _seatsHandler.handicapCheckboxHandler)(false);
          (0, _seatsHandler.handicapHandler)(false);
        }
      } else {
        (0, _seatsHandler.generalHandler)(false);
        (0, _seatsHandler.musseukboxHandler)(false);
        checkSeatType(numOfMoviegoers, savedToggleData, event.target);
      }
    }
  } else {
    var enableSeatsList = document.querySelectorAll("button.seat:not(.disabled)");
    if (numOfMoviegoers > clickedSeatLen) {
      checkSeatType(numOfMoviegoers, savedToggleData, event.target);
    } else if (numOfMoviegoers == clickedSeatLen) {
      enableSeatsList.forEach(function (elem) {
        if (!elem.classList.contains("clicked")) {
          elem.classList.add("disabled");
        }
      });
      checkSeatType(numOfMoviegoers, savedToggleData, event.target);
    } else {
      alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");
      (0, _initializeTheaterHandler.resetTheater)(seatBuff);
    }
  }
};
var numOfMoviegoersEvent = function numOfMoviegoersEvent(seatBuff) {
  setDefaultSelection();
  addEventListenersToElements(".btn.--general, .btn.--youth", "click", function (e) {
    return numOfMoviegoersBtnHandle(e, seatBuff);
  });
};
exports.numOfMoviegoersEvent = numOfMoviegoersEvent;
},{"../TheaterHandlers/initializeTheaterHandler.js":"src/components/TheaterHandlers/initializeTheaterHandler.js","../TheaterHandlers/seatsHandler.js":"src/components/TheaterHandlers/seatsHandler.js"}],"src/components/TheaterEvents/checkHandicapEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkHandicapEvent = void 0;
var _initializeTheaterHandler = require("../TheaterHandlers/initializeTheaterHandler.js");
// src/components/TheaterEvents/checkHandicapEvent.js

var checkHandicapEvent = function checkHandicapEvent() {
  // 1
  var handicapCheckbox = document.querySelector("#checkHandicap");
  var listOfSeats = document.querySelectorAll("button.seat:not(.handicap)");

  // 2
  var disableSeats = function disableSeats() {
    // 2 - 1
    listOfSeats.forEach(function (elem) {
      return elem.classList.add("disabled");
    });
  };
  var enableSeats = function enableSeats() {
    // 2 - 2
    listOfSeats.forEach(function (elem) {
      return elem.classList.remove("disabled");
    });
  };
  var resetSeats = function resetSeats() {
    // 3
    if (confirm("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?")) {
      (0, _initializeTheaterHandler.resetTheater)();
    } else {
      handicapCheckbox.checked = true;
    }
  };
  var handleCheckboxClick = function handleCheckboxClick(event) {
    // 4
    var clickedSeats = document.querySelectorAll(".clicked");
    if (event.target.checked) {
      // 4 - 1
      disableSeats();
    } else {
      // 4 - 2
      clickedSeats.length === 0 ? enableSeats() : resetSeats();
    }
  };
  handicapCheckbox.disabled = true; // 5
  handicapCheckbox.addEventListener("click", handleCheckboxClick); // 6
};
exports.checkHandicapEvent = checkHandicapEvent;
},{"../TheaterHandlers/initializeTheaterHandler.js":"src/components/TheaterHandlers/initializeTheaterHandler.js"}],"src/components/TheaterHandlers/seatSelectionHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectMussukboxHandler = exports.selectHandicapHandler = exports.selectGeneralHandler = exports.displayPrice = void 0;
var _seatsHandler = require("./seatsHandler.js");
// src/components/TheaterHandlers/seatSelectionHandler.js

var calculatePrice = function calculatePrice(target, seatBuff, discount) {
  // 1
  var price = 0;
  var clickedSeatLen = document.querySelectorAll(".clicked").length; // 2
  if (target.classList.contains("clicked")) {
    // 3
    if ((0, _seatsHandler.numOfAdult)() != seatBuff[0]) {
      // 3 - 1
      price = 10000 * discount;
      seatBuff[0] = seatBuff[0] + 1;
    } else if ((0, _seatsHandler.numOfYouth)() != seatBuff[1]) {
      // 3 - 2
      price = 7000 * discount;
      seatBuff[1] = seatBuff[1] + 1;
    }
  } else {
    // 4
    if (clickedSeatLen < seatBuff[0]) {
      // 4 - 1
      price = 10000 * discount;
      seatBuff[0] = seatBuff[0] - 1;
    } else if (clickedSeatLen >= seatBuff[0]) {
      // 4 - 2
      price = 7000 * discount;
      seatBuff[1] = seatBuff[1] - 1;
    }
  }
  return price; //5
};

var selectMussukboxHandler = function selectMussukboxHandler(target, seatBuff) {
  var price = 0;
  var numOfMoviegoers = (0, _seatsHandler.numOfAdult)() + (0, _seatsHandler.numOfYouth)(); // 1

  if (!parseInt(numOfMoviegoers % 2) == 0) {
    // 2 - 1
    price = 0;
    alert("선택하신 'MUSSEUKBOX' 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요.");
  } else {
    // 2 - 2
    target.classList.toggle("clicked");
    (0, _seatsHandler.generalHandler)(false); // 일반석 비활성화
    (0, _seatsHandler.handicapHandler)(false); // 장애인석 비활성화
    (0, _seatsHandler.handicapCheckboxHandler)(false); // 장애인 체크박스 비활성화
    (0, _seatsHandler.musseukboxHandler)(true); // 머쓱박스석 재선택 하기위해 좌석 선택 취소할 경우 장애인석 활성화

    price = calculatePrice(target, seatBuff, 0.8); // 3
  }

  return price;
};
exports.selectMussukboxHandler = selectMussukboxHandler;
var selectHandicapHandler = function selectHandicapHandler(target) {
  var price = 5000; // 1
  var checkHandicap = document.querySelector("#checkHandicap"); // 2

  // 3
  if (!checkHandicap.checked) {
    // 3 - 1
    price = 0;
    alert("선택하신 좌석은 장애인석으로 일반고객은 예매할 수 없는 좌석입니다.");
  } else {
    // 3 - 2
    target.classList.toggle("clicked");
    (0, _seatsHandler.handicapHandler)(true);
  }
  return price;
};
exports.selectHandicapHandler = selectHandicapHandler;
var selectGeneralHandler = function selectGeneralHandler(target, seatBuff) {
  var price = 0;
  target.classList.toggle("clicked");
  (0, _seatsHandler.musseukboxHandler)(false); // 머쓱박스석 비활성화
  (0, _seatsHandler.handicapHandler)(false); // 장애인석 비활성화
  (0, _seatsHandler.handicapCheckboxHandler)(false); // 장애인 체크박스 비활성화
  (0, _seatsHandler.generalHandler)(true); // 일반석 재선택 하기위해 좌석 선택 취소할 경우 장애인석 활성화

  price = calculatePrice(target, seatBuff, 1);
  return price;
};
exports.selectGeneralHandler = selectGeneralHandler;
var displayPrice = function displayPrice(target, price) {
  // 1
  var amount = document.querySelector("#amount").innerHTML; // 2
  if (target.classList.contains("clicked")) {
    // 3 - 1
    amount = parseInt(amount) + price;
  } else {
    // 3 - 2
    amount = parseInt(amount) - price;
  }
  document.querySelector("#amount").innerHTML = amount; // 4
};
exports.displayPrice = displayPrice;
},{"./seatsHandler.js":"src/components/TheaterHandlers/seatsHandler.js"}],"src/components/TheaterEvents/seatSelectionEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seatSelectionEvent = void 0;
var _seatSelectionHandler = require("../TheaterHandlers/seatSelectionHandler.js");
var _seatsHandler = require("../TheaterHandlers/seatsHandler.js");
// src/components/TheaterEvents/seatSeletionEvent.js

var seatSelectionEvent = function seatSelectionEvent(seatBuff, target) {
  console.log(checkHandicap);
  if (seatBuff.length <= 2) {
    seatBuff.push(0);
    seatBuff.push(0);
  }
  var tartgetList = target.classList;
  var price = 0;
  if (tartgetList.contains("handicap")) {
    price = (0, _seatSelectionHandler.selectHandicapHandler)(target);
  } else if (tartgetList.contains("musseukbox")) {
    price = (0, _seatSelectionHandler.selectMussukboxHandler)(target, seatBuff);
  } else {
    price = (0, _seatSelectionHandler.selectGeneralHandler)(target, seatBuff);
  }
  var enableSeatsList = document.querySelectorAll("button.seat:not(.disabled)");
  enableSeatsList.forEach(function (elem) {
    return elem.classList.remove("disabled");
  });
  var numOfMoviegoers = (0, _seatsHandler.numOfAdult)() + (0, _seatsHandler.numOfYouth)();
  var clickedSeatLen = document.querySelectorAll(".clicked").length;
  if (clickedSeatLen == numOfMoviegoers) {
    enableSeatsList.forEach(function (elem) {
      if (!elem.classList.contains("clicked")) elem.classList.add("disabled");
    });
  } else if (clickedSeatLen == 0) {
    // 관람 인원에 따른 장애인 체크박스 및 장애인석 활성화/비활성화
    if (numOfMoviegoers > 3) {
      (0, _seatsHandler.generalHandler)(true);
      (0, _seatsHandler.musseukboxHandler)(true);
      (0, _seatsHandler.handicapCheckboxHandler)(false);
      (0, _seatsHandler.handicapHandler)(false);
    } else {
      (0, _seatsHandler.handicapCheckboxHandler)(true);
      (0, _seatsHandler.handicapHandler)(true);
      if (!checkHandicap.checked) {
        (0, _seatsHandler.generalHandler)(true); // 일반석 활성화
        (0, _seatsHandler.musseukboxHandler)(true); // 머쓱박스석 활성화
      }
    }
  }

  // 잔여 좌석 정보
  document.querySelector("#remainSeatCnt").innerHTML = 39 - clickedSeatLen;

  // 좌석 가격 정보
  (0, _seatSelectionHandler.displayPrice)(target, price);
};
exports.seatSelectionEvent = seatSelectionEvent;
},{"../TheaterHandlers/seatSelectionHandler.js":"src/components/TheaterHandlers/seatSelectionHandler.js","../TheaterHandlers/seatsHandler.js":"src/components/TheaterHandlers/seatsHandler.js"}],"src/components/Theater.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _moviegoersEvent = require("./TheaterEvents/moviegoersEvent.js");
var _checkHandicapEvent = require("./TheaterEvents/checkHandicapEvent.js");
var _seatSelectionEvent = require("./TheaterEvents/seatSelectionEvent.js");
var _initializeTheaterHandler = require("./TheaterHandlers/initializeTheaterHandler.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // src/components/Theater.js
var Theater = /*#__PURE__*/function () {
  function Theater() {
    _classCallCheck(this, Theater);
    // 1
    this.seatBuff = [];
    this.render();
  }
  _createClass(Theater, [{
    key: "render",
    value: function render() {
      var _this = this;
      (0, _moviegoersEvent.numOfMoviegoersEvent)(this.seatBuff);
      (0, _checkHandicapEvent.checkHandicapEvent)();
      var theaterSeatEvnt = document.querySelectorAll("#theaterSeat>.seat");
      theaterSeatEvnt.forEach(function (elem) {
        elem.addEventListener("click", function (e) {
          return (0, _seatSelectionEvent.seatSelectionEvent)(_this.seatBuff, e.target);
        });
      });
      var reSelectElement = document.querySelector("#reselect"); // 1
      reSelectElement.addEventListener("click", function () {
        // 2
        if (confirm("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?")) {
          // 3
          (0, _initializeTheaterHandler.resetTheater)(_this.seatBuff);
        } else {
          // 4
          return;
        }
      });
    }
  }]);
  return Theater;
}();
var _default = Theater;
exports.default = _default;
},{"./TheaterEvents/moviegoersEvent.js":"src/components/TheaterEvents/moviegoersEvent.js","./TheaterEvents/checkHandicapEvent.js":"src/components/TheaterEvents/checkHandicapEvent.js","./TheaterEvents/seatSelectionEvent.js":"src/components/TheaterEvents/seatSelectionEvent.js","./TheaterHandlers/initializeTheaterHandler.js":"src/components/TheaterHandlers/initializeTheaterHandler.js"}],"src/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _login = _interopRequireDefault(require("./components/login.js"));
var _Theater = _interopRequireDefault(require("./components/Theater.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // src/App.js
var App = /*#__PURE__*/function () {
  function App() {
    var _this = this;
    _classCallCheck(this, App);
    _defineProperty(this, "handleLoginClick", function () {
      new _login.default(_this.emailInput, _this.passwordInput);
    });
    _defineProperty(this, "handleTheaterClick", function () {
      new _Theater.default();
    });
    // 1
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.theaterLoginBtn = document.querySelector("#theaterLoginBtn");
    this.theaterBtn = document.querySelector("#theaterBtn");
    this.render();
  }
  _createClass(App, [{
    key: "render",
    value: function render() {
      this.theaterLoginBtn.addEventListener("click", this.handleLoginClick);
      this.theaterBtn.addEventListener("click", this.handleTheaterClick);
    }
  }]);
  return App;
}();
var _default = App;
exports.default = _default;
},{"./components/login.js":"src/components/login.js","./components/Theater.js":"src/components/Theater.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _App = _interopRequireDefault(require("./src/App.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// index.js

// 1

new _App.default(document.querySelector("body")); // 2
},{"./src/App.js":"src/App.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56800" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Login.e31bb0bc.js.map