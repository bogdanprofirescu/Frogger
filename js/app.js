var Enemy = function() {
    var x, y;
    var speed; //movement speed in pixels for the bugs
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) this.x = this.x - 505;
    this.checkCollisions();
};

//checkCollisions checks if the the players is within bug's damage range
//if it is it calls a function that resets the player's position & decreases its lives
Enemy.prototype.checkCollisions=function(){
  var xAxis, yAxis;
  var horizontalSensitivityLeft = 80,
  horizontalSensitivityRight = 60;
  var verticalSensitivityUp = 140;
  verticalSensitivityDown = 0;

  xAxis = ((this.x > (player.x - horizontalSensitivityLeft)) && (this.x < (player.x + horizontalSensitivityRight)));
  yAxis = ((this.y > (player.y - verticalSensitivityUp)) && (this.y < (player.y + verticalSensitivityDown)));

  if (xAxis && yAxis) {
    player.reset_position();
    var audio = new Audio('sounds/beep.wav');
    audio.play();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this function is setting the starting positions and speeds of the bugs
//in the begining of the game
function resetEnemiesPositions() {
    enemy1.x = -50;
    enemy1.y = 35;
    enemy1.speed = 55;

    enemy2.x = 190;
    enemy2.y = 120;
    enemy2.speed = 45;

    enemy3.x = 30;
    enemy3.y = 200;
    enemy3.speed = 35;
}


//The player has a starting position, lives, score and speed
//reset_position function is used during the game when the player lost a live
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.speed = 10;
    this.score = 0;
    this.lives = 5;
    var updatedlives = "";
};
//reset position takes a life after player hits a bug, and if there are no
//more lives calls the EndExitGame funciton with the parameter of score achieved
Player.prototype.reset_position=function()
{
    this.lives = this.lives - 1;
    if (this.lives === 0) this.EndExitGame(this.score);
    if (this.lives > -1) {
      updatedlives = "LIVES:&nbsp" + this.lives;
      gameStatsLives.innerHTML = updatedlives;
    }
    this.x = 200;
    this.y = 400;
}

//resetPlayerAndStatsDisplay is used from second game onward
//it resets the lives, score and position of player
Player.prototype.resetPlayerAndStatsDisplay=function() {
    this.x = 200;
    this.y = 400;
    this.speed = 10;
    this.score = 0;
    this.lives = 5;
    updatedlives = "LIVES:&nbsp" + this.lives;
    gameStatsLives.innerHTML = updatedlives;
    updatedscore = "SCORE:&nbsp" + this.score;
    gameStatsScore.innerHTML = updatedscore;
    gameStats = document.getElementById('game_stats');
    gameStats.style.display = "";
};

//this function is called when pressing "ESC" during the game or when character lives=0
//the function calls returnToMainMenu which hides the canvas and displays the mainmenu
//the function input is the score achieved
Player.prototype.EndExitGame=function(score_achieved) {
    var exit;
    if (this.lives === 0) setTimeout(function() {
          alert("Game Over! Your score was: " + score_achieved);
        returnToMainMenu();
    }, 1000);
    else exit = confirm("Game is paused.\n \n Press CANCEL to continue this game.\n Press OK to EXIT in Main Menu");
    if (exit === true) returnToMainMenu();
};

function returnToMainMenu() {
        gameStarted = "off";
        gameCanvas = document.getElementById('game_board');
        gameMenu = document.getElementById('main_div');
        track_game_pause = 'active';
        gameCanvas.style.display = "none";
        gameMenu.style.display = "";
        gameStats = document.getElementById('game_stats');
        gameStats.style.display = "none";
        myAudio.pause();
    }

Player.prototype.update = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//besides the redering of the player also a check if water was reached is made
//if water area is touched than the player resets its position and wastes 1 live
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y <= 20) {
      var splash_sound = new Audio('sounds/splash.wav');
      splash_sound.play();
      this.reset_position();}
};

//handle input keeps the player on canvas limits  and moves it with its speed
//it also allows exist or pause with Escape
Player.prototype.handleInput = function(keypressed) {
    var xLeftLimit = -10,
        xRightLimit = 435,
        yTopLimit = 10,
        yBottomLimit = 480;
    switch (keypressed) {
        case 'left':
            if ((this.x - this.speed) > xLeftLimit) this.x = this.x - this.speed;
            break;
        case 'right':
            if ((this.x + this.speed) < xRightLimit) this.x = this.x + this.speed;
            break;
        case 'up':
            if ((this.y - this.speed) > yTopLimit) this.y = this.y - this.speed;
            break;
        case 'down':
            if (this.y + this.speed < yBottomLimit) this.y = this.y + this.speed;
            break;
        case 'esc':
            if (gameStarted == "on") this.EndExitGame(this.score);
            break;
    }
};


// Gem object has 2 coordinates, a sprite and a value
var Gem = function() {
        var sprite, x, y, value;
        this.value = 100;
    };
    //the gem update checks if the player able to collect gems based on axis proximity
    //it also updates the score and displays it
    //if a gem was collected then it is erased from the array
Gem.prototype.update = function(dt) {
    var xgemAxis, ygemAxis;
    var horizontalgemSensitivityLeft = 10,
        horizontalgemSensitivityRight = 65;
    var verticalgemSensitivityUp = 30;
    verticalgemSensitivityDown = 80;
    var updatedscore = "SCORE:&nbsp";
    xgemAxis = ((this.x > (player.x - horizontalgemSensitivityLeft)) && (this.x < (player.x + horizontalgemSensitivityRight)));
    ygemAxis = ((this.y > (player.y - verticalgemSensitivityUp)) && (this.y < (player.y + verticalgemSensitivityDown)));

    if (xgemAxis && ygemAxis) {
        player.score = player.score + this.value;
        console.log(player.score);
        updatedscore = updatedscore + player.score;
        gameStatsScore.innerHTML = updatedscore;
        var gemIndex = allGems.indexOf(this);
        allGems.splice(gemIndex, 1);
        var prize_sound = new Audio('sounds/prize.wav');
        prize_sound.play();
        if (player.score >= 200) {
            enemy1.speed = enemy1.speed + 10;
            enemy2.speed = enemy2.speed + 10;
            enemy3.speed = enemy3.speed + 10;
        }
        if (player.score >= 500) {
            enemy1.speed = enemy1.speed + 10;
            enemy2.speed = enemy2.speed + 10;
            enemy3.speed = enemy3.speed + 10;
        }
        if (player.score == maxScorePossible) {
            setTimeout(function() {
                alert("Amazing!!!You achieved the highest score possible! Your score was:" + maxScorePossible);
                returnToMainMenu();
            }, 1000);
        }
    }
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var maxScorePossible = 0;
var allGems = [];

//Objects instantiation

function reset_Gems() {
    allGems[0] = new Gem();
    allGems[0].x = 220;
    allGems[0].y = 245;
    allGems[0].sprite = 'images/Gem-Blue-small.png';
    allGems[1] = new Gem();
    allGems[1].x = 190;
    allGems[1].y = 85;
    allGems[1].sprite = 'images/Gem-Orange-small.png';
    allGems[2] = new Gem();
    allGems[2].x = 450;
    allGems[2].y = 160;
    allGems[2].sprite = 'images/Gem-Green-small.png';
    allGems[3] = new Gem();
    allGems[3].x = 400;
    allGems[3].y = 85;
    allGems[3].sprite = 'images/Heart-small.png';
    allGems[3].value = 200;
    allGems[4] = new Gem();
    allGems[4].x = 30;
    allGems[4].y = 85;
    allGems[4].sprite = 'images/Key-small.png';
    allGems[4].value = 200;
    allGems[5] = new Gem();
    allGems[5].x = 300;
    allGems[5].y = 160;
    allGems[5].sprite = 'images/Key-small.png';
    allGems[4].value = 200;
    allGems[6] = new Gem();
    allGems[6].x = 90;
    allGems[6].y = 160;
    allGems[6].sprite = 'images/Heart-small.png';
    allGems[3].value = 200;
    allGems[7] = new Gem();
    allGems[7].x = 30;
    allGems[7].y = 240;
    allGems[7].sprite = 'images/Gem-Green-small.png';
    maxScorePossible = 0;
    for (var i = 0; i < allGems.length; i++) maxScorePossible = maxScorePossible + allGems[i].value;
}

reset_Gems();

var player = new Player();
console.log(player.score);

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
resetEnemiesPositions();
var allEnemies = [];
allEnemies[0] = enemy1;
allEnemies[1] = enemy2;
allEnemies[2] = enemy3;


// The event listener was modified with keydown instead of keyup
//also monitoring of ESC press was added

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        27: 'esc'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
