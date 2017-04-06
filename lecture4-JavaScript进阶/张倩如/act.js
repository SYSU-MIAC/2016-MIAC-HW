var table = new Array(new Array(), new Array(), new Array(), new Array(), new Array()),
    is_moved = false;

function left() {
//  document.getElementById("now").innerHTML = "left";
  var cur = new Array();
  for (var i = 1; i <= 4; i ++) {
    var k = 1;
    for (var j = 1; j <= 4; j ++) {
      if (table[i][j] != 0) {
        cur[k ++] = table[i][j];
      }
    }
    while (k <= 4) cur[k ++] = 0;
    for (var j = 1; j < 4; j ++) {
      if (cur[j] == cur[j + 1]) {
        cur[j] = cur[j] + cur[j + 1];
        for (var r = j + 1; r < 4; r ++) {
          cur[r] = cur[r + 1];
        }
        cur[4] = 0;
      }
    }
    for (var j = 1; j <= 4; j ++) {
      if (table[i][j] != cur[j]) is_moved = true;
      table[i][j] = cur[j];
    }
  }
}

function right() {
//    document.getElementById("now").innerHTML = "right";
  var cur = new Array();
  for (var i = 1; i <= 4; i ++) {
    var k = 4;
    for (var j = 4; j >= 1; j --) {
      if (table[i][j] != 0) {
        cur[k --] = table[i][j];
      }
    }
    while (k >= 1) cur[k --] = 0;
    for (j = 4; j > 1; j --) {
      if (cur[j] == cur[j - 1]) {
        cur[j] = cur[j] + cur[j - 1];
        for (var r = j - 1; r > 1; r --) {
          cur[r] = cur[r - 1];
        }
        cur[1]= 0
      }
    }
    for (var j = 4; j >= 1; j --) {
      if (table[i][j] != cur[j]) is_moved = true;
      table[i][j] = cur[j];
    }
  }
}

function up() {
//    document.getElementById("now").innerHTML = "up";
  var cur = new Array();
  for (var j = 1; j <= 4; j ++) {
    var k = 1;
    for (var i = 1; i <= 4; i ++) {
      if (table[i][j] != 0) {
        cur[k ++] = table[i][j];
      }
    }
    while (k <= 4) cur[k ++] = 0;
    for (var i = 1; i < 4; i ++) {
      if (cur[i] == cur[i + 1]) {
        cur[i] = cur[i] + cur[i + 1];
        for (var r = i + 1; r < 4; r ++) {
          cur[r] = cur[r + 1];
        }
        cur[4] = 0;
      }
    }
    for (var i = 1; i <= 4; i ++) {
      if (table[i][j] != cur[i]) is_moved = true;
      table[i][j] = cur[i];
    }
  }
}

function down() {
//    document.getElementById("now").innerHTML = "down";
  var cur = new Array();
  for (var j = 1; j <= 4; j ++) {
    var k = 4;
    for (var i = 4; i >= 1; i --) {
      if (table[i][j] != 0) {
        cur[k --] = table[i][j];
      }
    }
    while (k >= 1) cur[k --] = 0;
    for (var i = 4; i > 1; i --) {
      if (cur[i] == cur[i - 1]) {
        cur[i] = cur[i] + cur[i - 1];
        for (var r = i - 1; r > 1; r --) {
          cur[r] = cur[r - 1]
        }
        cur[1] = 0
      }
    }
    for (var i = 1; i <= 4; i ++) {
      if (table[i][j] != cur[i]) is_moved = 1;
      table[i][j] = cur[i];
    }
  }
}

function produce_new_number() {
  var cnt = 0, tmp = new Array();
  for (var i = 1; i <= 4; i ++) {
    for (var j = 1; j <= 4; j ++) {
      if (table[i][j] == 0) tmp[++ cnt] = i * 4 + j;
    }
  }
  var pos = Math.floor(Math.random() * cnt) + 1;
  var value = Math.random() < 0.7 ? 2 : 4;
//  alert(pos + " " + tmp[pos] + " " + value);
  var x = Math.floor((tmp[pos] - 1) / 4), y = (tmp[pos] - 1) % 4 + 1;
//  alert(x + " " + y);
//  document.getElementById("where").innerHTML = x + " " + y;
  table[x][y] = value;
}

function display() {
  for (var i = 1; i <= 4; i ++) {
    for (var j = 1; j <= 4; j ++) {
      var cur = (i - 1) * 4 + (j - 1);
      var tmp = document.getElementById("tr[" + cur + "]");
      if (table[i][j] == 0) tmp.innerHTML = "";
      else tmp.innerHTML = table[i][j];
      switch (table[i][j]) {
        case 0 : tmp.style.backgroundColor = "#cdc1b4"; break;
        case 2 : tmp.style.backgroundColor = "#eee4da"; tmp.style.color = "#776e65"; tmp.style.fontSize = "55px"; break;
        case 4 : tmp.style.backgroundColor = "#ede0c8"; tmp.style.color = "#776e65";  tmp.style.fontSize = "55px"; break;
        case 8 : tmp.style.backgroundColor = "#f2b179"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "55px"; break;
        case 16 : tmp.style.backgroundColor = "#f59563"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "55px"; break;
        case 32 : tmp.style.backgroundColor = "#f67c5f"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "55px"; break;
        case 64 : tmp.style.backgroundColor = "#f65e3b"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "55px"; break;
        case 128 : tmp.style.backgroundColor = "#edcf72"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "45px"; break;
        case 256 : tmp.style.backgroundColor = "#edcc61"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "45px"; break;
        case 512 : tmp.style.backgroundColor = "#edc850"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "45px"; break;
        case 1024 : tmp.style.backgroundColor = "#edc53f"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "35px"; break;
        case 2048 : tmp.style.backgroundColor = "#edc22e"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "35px"; break;
        default : tmp.style.backgroundColor = "#3c3a32"; tmp.style.color = "#f9f6f2"; tmp.style.fontSize = "35px"; break;
      }
    }
  }
}

function is_over() {
  for (i = 1; i <= 4; i ++) {
    for (j = 1; j <= 4; j ++) {
      if (table[i][j] == 0) return false;
      if (j < 4) {
        if (table[i][j] == table[i][j + 1]) return false;
      }
      if (i < 4) {
        if (table[i][j] == table[i + 1][j]) return false;
      }
    }
  }
  return true;
}

function game_over() {
  alert("Game Over!");
  location.reload();
}

function play_game() {
  var key = window.event.keyCode || window.event.which ;
  switch(key) {
    case 37: left(); break;
    case 38: up(); break;
    case 39: right(); break;
    case 40: down(); break;
  }
  if (is_moved) {
    produce_new_number();
    is_moved = false;
  }
  display();
  if(is_over()) game_over(); 
}

window.onload = function() {
  window.onkeyup = play_game;
  for (var i = 1; i <= 4; i ++) {
    for (var j = 1; j <= 4; j ++) {
      table[i][j] = 0;
    }
  }
  produce_new_number();
  display();
}