window.onload = function() {
    document.getElementById("score").value = 0;
    document.getElementById("time").value = 30;
    GameStart();
}

var scores;
var GameStart = function() {
    var start = document.getElementById("start");
    start.onclick = function() {
        var timeLeft = 30;
        scores = 0;
        document.getElementById("score").value = scores;
        timeShow(timeLeft);
        timeId = setInterval("play()",1000);
    }
}

var timeShow = function(times){
   if(!times||isNaN(parseInt(times)))return;
   var args = arguments;
   var self = this;
   setTimeout(function(){args.callee.call(self,--times)},1000);
   document.getElementById("time").value = times;
}

var play = function() {
    document.getElementById("score").style.color = "black";
    for(var i = 1; i < 13; i++ ) {
        var obj = document.getElementById("hole" + i);
        obj.style.background = "url(./img/hole.gif) center bottom";
        obj.mouse = 0;
    }
    var current = Math.floor(Math.random()*12) + 1;
    obj = document.getElementById("hole" + current);       
    obj.mouse = 1;
    obj.style.background = "url(./img/mouse.gif) ";
    for(var i = 1; i < 13; i++) {
      (function(m){
          var objClicked = document.getElementById("hole" + m);
          objClicked.onclick = function() {
            if( objClicked.mouse == 0) {
                scores -= 1;
                document.getElementById("score").value = scores;
            }
            else if( objClicked.mouse == 1) {
                objClicked.style.background = "url(./img/mouseClicked.gif)";
                scores += 1;
                document.getElementById("score").value = scores;
            }
        }
      })(i) 
    }
    if(document.getElementById("time").value == 1) {
        clearTimeout(timeId);
        alert("时间到，最终得分为：" + document.getElementById("score").value);
        document.getElementById("time").value = 0;
        document.getElementById("score").style.color = "white";
        for(var i = 1; i < 13; i++ ) {
        var obj = document.getElementById("hole" + i);
        obj.style.background = "url(./img/hole.gif) center bottom";
        obj.mouse = 0;
    }
    }

}

