// src/components/TheaterHandlers/initializeTheaterHandler.js

const resetNumOfMoviegoers = () => { // 1
  const toggleList = document.querySelectorAll(".toggle");
  toggleList.forEach((elem) => elem.classList.remove("toggle"));
  document.querySelector("#adultBtn").children[0].classList.add("toggle");
  document.querySelector("#youthBtn").children[0].classList.add("toggle");
};

const resetHandicapCheckbox = () => { // 2
  const checkHandicap = document.querySelector("#checkHandicap");
  checkHandicap.checked = false;
  checkHandicap.disabled = true;
};

const resetTheaterSeats = () => { // 3
  const theaterSeatList = document.querySelectorAll("#theaterSeat > .seat");
  theaterSeatList.forEach((elem) => {
    if (elem.classList.contains("clicked")) elem.classList.remove("clicked");
    if (!elem.classList.contains("disabled")) elem.classList.add("disabled");
  });
};

const resetSeatBuffAndPriceInfo = (seatBuff) => { // 4
  if (seatBuff) {
    seatBuff.length = 0;
  }
  document.querySelector("#remainSeatCnt").innerHTML = 39;
  document.querySelector("#amount").innerHTML = 0;
};

/* 좌석 초기화 클릭 이벤트 핸들러 */
export const resetTheater = (seatBuff) => { // 5
  resetNumOfMoviegoers();
  resetHandicapCheckbox();
  resetTheaterSeats();
  resetSeatBuffAndPriceInfo(seatBuff);
};
