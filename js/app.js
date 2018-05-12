var score = 0;
var lives = 3;

//a random function to make changes in speed
var random = function (min_speed, max_speed) {
    return Math.floor(Math.random() * (max_speed - min_speed)) + min_speed;
}

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.max = 300;
    this.min = 150;
    this.speed = random(this.min, this.max);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 600) {
        this.x = -150;
        this.speed = random(this.min, this.max);
        if (lives <= 0) {
            document.getElementById('score').innerHTML = "Your Score :" + score;
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.resetPlayer = function () {
    this.x = 205;
    this.y = 380;
};

Player.prototype.update = function () {
    if (this.y < 40) {
        this.resetPlayer();
        score = score + 1;
    }

    document.getElementById('score').innerHTML = "score : " + score +" / " + "lives left : " + lives;
    for (var i = 0; i < 3; i++) {

        if ((this.x + 38 > allEnemies[i].x) && (this.x < allEnemies[i].x + 38) && (this.y + 38 > allEnemies[i].y) && (this.y < allEnemies[i].y + 38)) {
            lives = lives - 1;
            this.resetPlayer();
            
        }
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 100) {
        this.x -= 101;
    }
    if (key == 'right' && this.x < 400) {
        this.x += 101;
    }
    if (key == 'up' && this.y > 3) {
        this.y -= 83;
    }
    if (key == 'down' && this.y < 380) {
        this.y += 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-10, 65);
var enemy2 = new Enemy(-10, 140);
var enemy3 = new Enemy(-10, 225);

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(205, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});