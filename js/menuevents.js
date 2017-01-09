//this file creates the master menu and calls the geme engine when
//the new game option is selected
//few global variables that store the characters,audio background and
// some flags used to avoid overlapping the submenues
var gameCharSet = ['images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
var indexCharSet = 0;
var track_game_pause = 'default';
var flagMenuInstructions = 'default';
var flagChangeCharacter = 'default';
var myAudio = new Audio('sounds/background.mp3');
var gameStarted = "off"; //this ensures that "esc" button is disabled during main menu


function MenuInstructionsClick() {

    if ((flagMenuInstructions == 'default') && (flagChangeCharacter == 'default')) {
        flagMenuInstructions = 'active';
        var menu_image = document.getElementById('placeholder');
        menu_image.style.display = "none";
        var messageDiv = document.getElementById('char_image');
        messageDiv.style.borderLeft = "thin solid #260321";
        var instructions = document.createElement("p");
        instructions.innerHTML = "Collect all items to get points.<br> Avoid the water.<br> Avoid bugs at all costs.<br>(They are evil bastards!)"
        instructions.style.textAlign = "left";
        instructions.style.color = "rgb(89, 1, 15)";
        instructions.style.fontFamily = "Comic Sans MS";
        instructions.style.fontSize = "14px";
        messageDiv.appendChild(instructions);
        instructions.style.verticalAlign = "text-top";
        var ok_button = document.createElement("BUTTON");
        ok_button.innerHTML = 'okidoki';
        messageDiv.appendChild(ok_button);

        ok_button.onclick = function() {
            messageDiv.removeChild(instructions);
            messageDiv.removeChild(ok_button);
            messageDiv.style.borderLeft = "thin solid #FFFFFF";
            menu_image.style.display = "initial";
            flagMenuInstructions = 'default';
        };
    };
};
//StartGame launches the game engine,background music and hides the main menu
//also relaunches the game with reseted player, stats, gems and enemies

function StartGame() {
    gameStarted = "on";
    if ((flagMenuInstructions == 'default') && (flagChangeCharacter == 'default')) {
        var game_intro_menu = document.getElementById('main_div');
        game_intro_menu.style.display = "none";
        myAudio.play();
        myAudio.loop = true;

        if (track_game_pause == 'default') {
            track_game_pause = 'active';
            gameStats = document.getElementById('game_stats');
            gameStats.style.display = "";
            gameStatsScore = document.getElementById('score');
            gameStatsLives = document.getElementById('lives');
            gameStatsScore.innerHTML = "SCORE:&nbsp0";
            gameStatsLives.innerHTML = "LIVES:&nbsp" + player.lives;
            SuperEngine();
        } else {
            gameCanvas = document.getElementById('game_board');
            gameCanvas.style.display = "initial";
            player.resetPlayerAndStatsDisplay();
            resetEnemiesPositions();
            reset_Gems();
        }
    };
};

//this function changes the character image and sets it to the player
function ChangeCharacter() {
    if ((flagMenuInstructions == 'default') && (flagChangeCharacter == 'default')) {
        var menu_image = document.getElementById('placeholder');
        menu_image.height = 80;
        menu_image.width = 80;
        menu_image.src = gameCharSet[0];
        menu_image.display = "block";
        menu_image.display = "left";
        var messageDiv = document.getElementById('char_image');
        messageDiv.style.borderLeft = "thin solid #260321";

        var backward_btn = document.createElement("BUTTON");
        backward_btn.innerHTML = "<<";
        backward_btn.onclick = function() {
            indexCharSet--;
            if (indexCharSet < 0) indexCharSet = 0;
            menu_image.src = gameCharSet[indexCharSet];
            player.sprite = gameCharSet[indexCharSet];
        };

        var forward_btn = document.createElement("BUTTON");
        forward_btn.innerHTML = ">>";
        forward_btn.onclick = function() {
            indexCharSet++;
            if (indexCharSet > gameCharSet.length - 1) indexCharSet = gameCharSet.length - 1;
            menu_image.src = gameCharSet[indexCharSet];
            player.sprite = gameCharSet[indexCharSet];
        };

        var para = document.createElement("p");
        messageDiv.appendChild(para);
        messageDiv.appendChild(backward_btn);
        messageDiv.appendChild(forward_btn);
        flagChangeCharacter = 'active';

        var ok_char = document.createElement("BUTTON");
        ok_char.innerHTML = "oki-doki";
        ok_char.style.display = "block";
        messageDiv.appendChild(ok_char);
        ok_char.onclick = function() {
            messageDiv.removeChild(para);
            messageDiv.removeChild(backward_btn);
            messageDiv.removeChild(forward_btn);
            messageDiv.removeChild(ok_char);
            menu_image.height = 152;
            menu_image.width = 120;
            menu_image.src = "images/menubug.jpg";
            flagChangeCharacter = 'default';
        }
    }
};

//this function launches google page and abandons the game
function ExitGame() {

    if ((flagMenuInstructions == 'default') && (flagChangeCharacter == 'default'))
        window.location.href = "http://www.google.com";
}
