const playboard = document.querySelector(".playboard");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let foodX, foodY;
let gameOver = false; 
let snakeX =5,snakeY=10;
let snakeBody =[];
let velocitX = 0,velocityY =0;
let setIntervalID;
let score = 0;
let highscore = localStorage.getItem("high-score" ) || 0;
highScoreElement.innerText = `High Score: ${highscore}`;

const handleGameOver = () => {
    clearInterval(setIntervalID);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeFopdPosition = () =>
{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocitX = 0;
        velocityY = -1;
    }else if(e.key ==="ArrowDown" && velocityY != -1){
        velocitX = 0;
        velocityY = 1;
    }
    else if(e.key ==="ArrowLeft" && velocitX != 1){
        velocitX = -1;
        velocityY = 0;
    }
    else if(e.key ==="ArrowRight" && velocitX != -1){
        velocitX = 1;
        velocityY = 0;
    }   
}


const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY === foodY){
        changeFopdPosition();
        snakeBody.push([foodX,foodY]);
        score++;

        highscore = score >= highscore ? score : highscore;
        highScoreElement.innerText = `High Score: ${highscore}`;
        localStorage.setItem("high-score" , highscore);
        scoreElement.innerText = `Score: ${score}`;
    }

    snakeX += velocitX;
    snakeY += velocityY;

    if(snakeX <=0 || snakeX >30 || snakeY <= 0 ||snakeY >30){
        gameOver = true;
    }
    
    for(let i = snakeBody.length - 1; i > 0 ;i--){
        snakeBody[i] = snakeBody[i-1];
    }
    
    snakeBody[0] = [snakeX,snakeY];
    for(let i =0;i < snakeBody.length;i++){
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true;
    }
    }
    playboard.innerHTML = htmlMarkup;
}
changeFopdPosition();
setIntervalID = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);