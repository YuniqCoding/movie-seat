// src/App.js
import Login from "./components/login.js";
import Theater from "./components/Theater.js";

class App {
  constructor() { // 1
      this.emailInput = document.querySelector("#email");
      this.passwordInput = document.querySelector("#password");
      this.theaterLoginBtn = document.querySelector("#theaterLoginBtn");
      this.theaterBtn = document.querySelector("#theaterBtn");

      this.render();
  }

  handleLoginClick = () => { 
    new Login(this.emailInput, this.passwordInput);
  };

  handleTheaterClick = () => { 
    new Theater();
  };

  render() {
      this.theaterLoginBtn.addEventListener("click", this.handleLoginClick);
      this.theaterBtn.addEventListener("click", this.handleTheaterClick); 
  }
}

export default App;
