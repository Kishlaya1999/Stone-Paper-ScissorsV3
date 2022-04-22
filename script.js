const selections = ["./images/img1.png", "./images/img2.png", "./images/img3.png"]; //Images source that would be later inserted in computer selection

// elements selected to menupulate it
let userSelection = document.querySelectorAll(".user-selection");
let computerSelection = document.getElementById("clicked-img-computer");
let userImage = document.getElementById("clicked-img-player");
// let submitBtn = document.getElementById("submit");
let roundGoingOnElement = document.getElementById("round");
let playerScoreElement = document.getElementById("player-score");
let computerScoreElement = document.getElementById("computer-score");
let roundStatus = document.getElementById("status");

let rockElement = document.getElementById("rock");
let paperElement = document.getElementById("paper");
let scissorElement = document.getElementById("scissor");

//variables for score section
var playerScore = 0;
var roundGoingOn = 0;
var computerScore = 0;

rockElement.addEventListener("click", submit);
paperElement.addEventListener("click", submit);
scissorElement.addEventListener("click", submit);

//displaying clicked image by the user and displaying it in user section image
userSelection.forEach(function (selected) {
     selected.addEventListener("mousedown", function () {
          // console.log(this.getAttribute("src"));
          userImage.setAttribute("src", this.getAttribute("src"));
          // console.log("executed");
     })
});

function submit() {
     // pauseAudio();
     // console.log("submitted");
     roundGoingOn++;
     roundGoingOnElement.innerHTML = roundGoingOn;
     let userSelectedImage = userImage.getAttribute("src");

     let randomImage = Math.floor(Math.random() * selections.length);
     computerSelection.src = selections[randomImage];
     let computerSelectedImage = computerSelection.getAttribute("src");

     if (userSelectedImage == computerSelectedImage) {
          roundGoingOn--;
          submit();
          // roundStatus.innerHTML = "It's a Draw";
     }

     let rock = "./images/img1.png";
     let paper = "./images/img2.png";
     let scissor = "./images/img3.png";

     if (roundGoingOn <= 5) {
          if (userSelectedImage == rock) {
               if (computerSelectedImage == paper) {
                    computerScore++;
                    computerScoreElement.innerHTML = computerScore;
                    roundStatus.innerHTML = "You Lost ☹ this round";
               } else if (computerSelectedImage == scissor) {
                    playerScore++;
                    playerScoreElement.innerHTML = playerScore;
                    roundStatus.innerHTML = "You Won 🎉 this round";
               }
          } else if (userSelectedImage == paper) {
               if (computerSelectedImage == rock) {
                    playerScore++;
                    playerScoreElement.innerHTML = playerScore;
                    roundStatus.innerHTML = "You Won 🎉 this round";
               } else if (computerSelectedImage == scissor) {
                    computerScore++;
                    computerScoreElement.innerHTML = computerScore;
                    roundStatus.innerHTML = "You Lost ☹ this round";
               }
          } else if (userSelectedImage == scissor) {
               if (computerSelectedImage == rock) {
                    computerScore++;
                    computerScoreElement.innerHTML = computerScore;
               } else if (computerSelectedImage == paper) {
                    playerScore++;
                    playerScoreElement.innerHTML = playerScore;
                    roundStatus.innerHTML = "You Won 🎉 this round";
               }
          }
     } else {
          if (playerScore > computerScore) {
               reset();
               celebrate();
               playVictorySong();
          } else if (playerScore < computerScore) {
               playFailSong();
               reset();
          } else {
               reset();
               playTryAgainSong();
               alert("Match Draw");
          }
     }
}

function reset() {
     playerScore = 0;
     computerScore = 0;
     roundGoingOn = 0;
     playerScoreElement.innerHTML = 0;
     computerScoreElement.innerHTML = 0;
     roundGoingOnElement.innerHTML = 0;
     roundStatus.innerHTML = "Select a symbol";
     computerSelection.setAttribute("src", "./images/laptop-solid.svg");
     userImage.setAttribute("src", "./images/user-circle-regular.svg");
}

function celebrate() {
     var count = 1000;
     var defaults = {
          origin: {
               y: 0.7
          }
     };

     function fire(particleRatio, opts) {
          confetti(Object.assign({}, defaults, opts, {
               particleCount: Math.floor(count * particleRatio)
          }));
     }

     fire(0.25, {
          spread: 26,
          startVelocity: 55,
     });
     fire(0.2, {
          spread: 60,
     });
     fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
     });
     fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
     });
     fire(0.1, {
          spread: 120,
          startVelocity: 45,
     });
}

function playVictorySong() {
     var victory = document.getElementById("victory");
     victory.play();
     disableGame();

}

function playFailSong() {
     var lost = document.getElementById("lost");
     lost.play();
     disableGame();
}
function playTryAgainSong() {
     var tryAgain = document.getElementById("try-again");
     tryAgain.play();
     disableGame();
}

function pauseAudio() {
     victory.pause();
     lost.pause();
     tryAgain.pause();
     victory.currentTime = 0;
     lost.currentTime = 0;
     tryAgain.currentTime = 0;
}

var userChoice = document.querySelectorAll('.user-selection');

function disableGame() {
     rockElement.style.pointerEvents = "none";
     paperElement.style.pointerEvents = "none";
     scissorElement.style.pointerEvents = "none";
     setInterval(function () {
          rockElement.style.pointerEvents = "auto";
          paperElement.style.pointerEvents = "auto";
          scissorElement.style.pointerEvents = "auto";
     }, 5000);
     // myTimeout();
}