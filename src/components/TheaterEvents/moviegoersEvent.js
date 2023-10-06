// src/components/TheaterEvents/moviegoersEvent.js

import { resetTheater } from "../TheaterHandlers/initializeTheaterHandler.js";
import {
  generalHandler,
  handicapCheckboxHandler,
  handicapHandler,
  musseukboxHandler,
  numOfAdult,
  numOfYouth,
} from "../TheaterHandlers/seatsHandler.js";

const setDefaultSelection = () => {
  ["adultBtn", "youthBtn"].forEach((id) => {
    document.querySelector(`#${id}`).children[0].classList.add("toggle");
  });
};

const addEventListenersToElements = (selector, event, eventHandler) => {
  let elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.addEventListener(event, eventHandler);
  });
};

const alertAndToggleClass = (alertMessage, savedToggleData, eventTarget) => {
  alert(alertMessage);
  savedToggleData.classList.add("toggle");
  eventTarget.classList.remove("toggle");
};

const checkSeatType = (numOfMoviegoers, savedToggleData, eventTarget) => {
  let seatType;
  let seatBtnClassname =
    document.getElementsByClassName("clicked")[0].classList[1];

  if (seatBtnClassname == "clicked")
    seatType = document.querySelectorAll(
      "button.seat:not(.handicap):not(.musseukbox)"
    );
  else seatType = document.querySelectorAll("button.seat." + seatBtnClassname);

  const clickedMusseukSeats = document.querySelectorAll(
    "button.seat.musseukbox.clicked"
  );

  if (checkHandicap.checked && numOfMoviegoers > 3) {
    alertAndToggleClass(
      "머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.",
      savedToggleData,
      eventTarget
    );
  } else if (clickedMusseukSeats.length > 0 && numOfMoviegoers % 2 !== 0) {
    alertAndToggleClass(
      "선택하신 'MUSSEUKBOX' 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요.",
      savedToggleData,
      eventTarget
    );
  } else {
    seatType.forEach((elem) => {
      if (!elem.classList.contains("clicked")) {
        elem.classList.remove("disabled");
      }
    });
  }
};

const toggleSeatHandlers = (state) => {
  generalHandler(state);
  musseukboxHandler(state);
  handicapCheckboxHandler(state);
  handicapHandler(state);
};

const numOfMoviegoersBtnHandle = (event, seatBuff) => {
  let savedToggleData;

  if (!event.target.classList.contains("toggle")) {
    event.target.classList.add("toggle");

    document.querySelectorAll(".toggle").forEach((toggle) => {
      if (
        event.target.classList[1] == toggle.classList[1] &&
        event.target.innerHTML != toggle.innerHTML
      )
        toggle.classList.remove("toggle");

      if (!toggle.classList.contains("toggle")) {
        savedToggleData = toggle;
      }
    });
  }

  let clickedSeatLen = document.querySelectorAll(".clicked").length;
  let numOfMoviegoers = numOfAdult() + numOfYouth();
  let checkHandicap = document.querySelector("#checkHandicap");

  if (clickedSeatLen === 0) {
    if (numOfMoviegoers === 0) {
      toggleSeatHandlers(false);
    } else {
      toggleSeatHandlers(true);

      if (!checkHandicap.checked) {
        if (numOfMoviegoers > 3) {
          handicapCheckboxHandler(false);
          handicapHandler(false);
        }
      } else {
        generalHandler(false);
        musseukboxHandler(false);

        checkSeatType(numOfMoviegoers, savedToggleData, event.target);
      }
    }
  } else {
    const enableSeatsList = document.querySelectorAll(
      "button.seat:not(.disabled)"
    );

    if (numOfMoviegoers > clickedSeatLen) {
      checkSeatType(numOfMoviegoers, savedToggleData, event.target);
    } else if (numOfMoviegoers == clickedSeatLen) {
      enableSeatsList.forEach((elem) => {
        if (!elem.classList.contains("clicked")) {
          elem.classList.add("disabled");
        }
      });

      checkSeatType(numOfMoviegoers, savedToggleData, event.target);
    } else {
      alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");
      resetTheater(seatBuff);
    }
  }
};

export const numOfMoviegoersEvent = (seatBuff) => {
  setDefaultSelection();
  addEventListenersToElements(".btn.--general, .btn.--youth", "click", (e) =>
    numOfMoviegoersBtnHandle(e, seatBuff)
  );
};
