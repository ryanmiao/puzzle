var context = document.getElementById('puzzle').getContext('2d');

var img = new Image();
var ran = Math.floor(Math.random() * 11)
img.src = 'https://git.oschina.net/lsryan/maidou/raw/master/' + ran + '.jpg';
img.addEventListener('load', drawTiles, false);

var imgV = new Image()
imgV.src = 'http://d.hiphotos.baidu.com/zhidao/pic/item/562c11dfa9ec8a13e028c4c0f603918fa0ecc0e4.jpg'

var gamemode = document.getElementById('gamemode');
var boardSize = document.getElementById('puzzle').width;
var scalers = document.getElementsByName('scale');
var tileCount;
for(var i=0;i<scalers.length;i++) {
    scalers[i].onchange = scaler;
    if (scalers[i].checked)
        tileCount = scalers[i].value;
}

var tileSize = boardSize / tileCount;

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var solved = false;
var gameover = false;

var boardParts = new Object;
setBoard();

function scaler() {
    tileCount = this.value;
    tileSize = boardSize / tileCount;
    setBoard();
    drawTiles();
}

document.getElementById('puzzle').onmousemove = function(e) {
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
};

document.getElementById('puzzle').onclick = function() {
    if (!gameover) {
        if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
            slideTile(emptyLoc, clickLoc);
            drawTiles();
        }
        if (solved) {
            gameover = true;
            //img.removeEventListener('load', drawTiles, false);

            setTimeout(function () {
                alert("You solved it!");
                context.drawImage(imgV, 0, 0, boardSize, boardSize);
            }, 500);
        }
    }
};

function setBoard() {
    boardParts = new Array(tileCount);
    for (var i = 0; i < tileCount; ++i) {
        boardParts[i] = new Array(tileCount);
        for (var j = 0; j < tileCount; ++j) {
            boardParts[i][j] = new Object;
            boardParts[i][j].x = (tileCount - 1) - i;
            boardParts[i][j].y = (tileCount - 1) - j;
        }
    }
    emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
    emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
    solved = false;
    gameover = false;
    for(var i=0;i<scalers.length;i++) {
        if (scalers[i].checked) {
            if (scalers[i].value == 3)
                gamemode.innerHTML = "简单";
            else if (scalers[i].value == 4)
                gamemode.innerHTML = "中等";
            else if (scalers[i].value == 5)
                gamemode.innerHTML = "困难";
        }
    }

}

function drawTiles() {
    context.clearRect(0, 0, boardSize, boardSize);
    for (var i = 0; i < tileCount; ++i) {
        for (var j = 0; j < tileCount; ++j) {
            var x = boardParts[i][j].x;
            var y = boardParts[i][j].y;
            if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
                context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
                    i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }
}

function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
    if (!solved) {
        boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
        boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
        boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
        boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
        toLoc.x = fromLoc.x;
        toLoc.y = fromLoc.y;
        checkSolved();
    }
}

function checkSolved() {
    var flag = true;
    for (var i = 0; i < tileCount; ++i) {
        for (var j = 0; j < tileCount; ++j) {
            if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
                flag = false;
            }
        }
    }
    solved = flag;
}
