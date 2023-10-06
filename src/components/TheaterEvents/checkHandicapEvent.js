// src/components/TheaterEvents/checkHandicapEvent.js

import { resetTheater } from "../TheaterHandlers/initializeTheaterHandler.js";

export const checkHandicapEvent = () => { // 1
  const handicapCheckbox = document.querySelector("#checkHandicap");
  const listOfSeats = document.querySelectorAll("button.seat:not(.handicap)");

  // 2
  const disableSeats = () => { // 2 - 1
    listOfSeats.forEach((elem) => elem.classList.add("disabled"));
  };

  const enableSeats = () => { // 2 - 2
    listOfSeats.forEach((elem) => elem.classList.remove("disabled"));
  };

  const resetSeats = () => { // 3
    if (confirm("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?")) {
      resetTheater();
    } else {
      handicapCheckbox.checked = true;
    }
  };

  const handleCheckboxClick = (event) => { // 4
    const clickedSeats = document.querySelectorAll(".clicked");

    if (event.target.checked) { // 4 - 1
      disableSeats();
    } else { // 4 - 2
      clickedSeats.length === 0 ? enableSeats() : resetSeats();
    }
  };

  handicapCheckbox.disabled = true; // 5
  handicapCheckbox.addEventListener("click", handleCheckboxClick); // 6
}
