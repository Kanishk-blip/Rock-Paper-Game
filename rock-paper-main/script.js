
// chose a random item from {rock, paper, scissor} for computer
function getComputerChoice(){
    a = Math.floor(Math.random() * 3);
    let compChoice = (a == 0)? "rock":(a == 1)? "paper": "scissor";
    
    // highlight the Selection of computer
    compBtnChoice  = document.querySelector(`.${compChoice}`);
    compBtnChoice.classList.add("highlighted");
    setTimeout(() => {
        compBtnChoice.classList.remove("highlighted");
    }, 500)

    return compChoice;
}

function reload(){
    location.reload();
}



// convert result into message
function convertToMessage(result, userChoice, compChoice){
    let message = (result == "won")? `You won ! ${userChoice} beats ${compChoice}`:
                  (result =="lost")? `You lost ! ${compChoice} beats ${userChoice}`: `its a tie between ${compChoice} and ${userChoice}`;
    return message;
}


// check who beats whom
function getResult(compChoice, userChoice){
    let result;
    if (userChoice == "rock"){
        result = (compChoice == "paper") ? "lost":(compChoice == "scissor")? "won":"tie";
    }
    else if (userChoice == "paper"){
        result = (compChoice == "scissor") ? "lost":(compChoice == "rock")? "won":"tie";
    }
    else if (userChoice == "scissor"){
        result = (compChoice == "rock") ? "lost":(compChoice == "paper")? "won":"tie";
    }
    return result;
}


function finalResult(){
    let tempMessage ;
    if (userLives === 0 ){
        tempMessage = 'You Lost. Please try again';
    }
    else if (compLives===0){
        tempMessage = 'You Won. Please play again';
    }
    resultDisplay.textContent = tempMessage;
    resultDisplay.style.opacity = "100";
    logsDisplay.innerHTML = '<button class="play-again" onclick="reload()" >Play Again</button>' + logsDisplay.innerHTML;

    // removes EventListener from buttons
    arr = [rock, paper, scissor];
    let temp;
    arr.forEach(element => {
        temp = element.cloneNode(true);
        element.parentNode.replaceChild(temp, element);
        temp.classList.remove("highlighted"); 
    });
}


let compLives = 5;
let userLives = 5; 


// Plays a single game
function play(userChoice){

    // for highlighting user selection
    userBtnChoice = document.querySelector(`#${userChoice}`);
    userBtnChoice.classList.add("highlighted");
    setTimeout(() => {
        userBtnChoice.classList.remove("highlighted");
    }, 500)

    // check result of a single game
    let compChoice = getComputerChoice()
    let result = getResult(compChoice, userChoice);
    // update remaining Lives accordingly
    if (result == "lost") userLives--
    else if (result =="won") compLives--
    
    // change the result of a single game on page
    resultDisplay.style.opacity = "0";
    setTimeout(function(){
        if (userLives <= 0 || compLives <= 0) return;
        resultDisplay.textContent = result;
        resultDisplay.style.opacity = "100";
    }, 200)
    
    // create the message of and logs in page
    message = convertToMessage(result, userChoice, compChoice)
    logsDisplay.innerHTML = `<p>${message}</p>`+ logsDisplay.innerHTML;
    // update lives on page
    compLivesDisplay.textContent = `${compLives}`;
    userLivesDisplay.textContent = `${userLives}`;


    if (userLives <= 0 || compLives <= 0) finalResult();
}


let message, compBtnChoice, userBtnChoice;
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");

const resultDisplay = document.querySelector(".last-result");
const logsDisplay = document.querySelector(".logs");
const compLivesDisplay = document.querySelector(".comp-lives");
const userLivesDisplay = document.querySelector(".user-lives");

rock.addEventListener("click", () => play("rock"));
paper.addEventListener("click", () => play("paper"));
scissor.addEventListener("click", () => play("scissor"));