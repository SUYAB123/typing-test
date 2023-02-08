const typingText = document.querySelector(".test-data p");
let inputField = document.querySelector(" .content .input-area");
let timeTag = document.querySelector(".time span b");
let mistakeTag = document.querySelector(".mistakes span");
let wpmTag = document.querySelector(".wpm span");
let cpmTag = document.querySelector(".cpm span");
let tyrButton = document.querySelector("button");
let styTag = document.querySelector(".result-details li span");
console.log(styTag);
let timer,
  maxTime = 60;
let timeLeft = maxTime;
let charIndex = (mistakes = istyping = 0);

function randomPragraph() {
  // getting random number for acces paragraph element
  let rIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  styTag.classList.remove("finished");
  //getting random item from thje pragraphs array, splitting all characters of it adding each character inside span and them adding this span inside p
  paragraphs[rIndex].split("").forEach((span) => {
    let sTag = `<span>${span}</span>`;
    typingText.innerHTML += sTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");

  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}
function intializeTyping() {
  //   console.log(typingText);
  const characters = typingText.querySelectorAll("span");
  let typedCharacter = inputField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!istyping) {
      timer = setInterval(initialTime, 1000);
      istyping = true;
    }
    if (typedCharacter == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }

      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      //   console.log(typedCharacter);
      if (characters[charIndex].innerText === typedCharacter) {
        // if user typed character and show character matched then add the correct class else add the incorrect class
        characters[charIndex].classList.add("correct");
        // console.log("corrected");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
        // console.log("incorrected");
      }
      charIndex++;
    }

    //increment charIndex either user typed correct or incorrect character
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
    wpmTag.innerText = wpm;

    //   console.log(characters[0]);\
  } else {
    clearInterval(timer);
    inputField.value = "";
    alert("Test Completed");
    styTag.classList.add("finished");
    document
      .querySelector(".result-details .mistakes p")
      .classList.add("finished");
  }
}
function initialTime() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}
function resetTest() {
  randomPragraph();
  clearInterval(timer);
  inputField.value = "";
  timeLeft = maxTime;
  charIndex = mistakes = istyping = 0;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}
randomPragraph();
inputField.addEventListener("input", intializeTyping);
tyrButton.addEventListener("click", resetTest);
