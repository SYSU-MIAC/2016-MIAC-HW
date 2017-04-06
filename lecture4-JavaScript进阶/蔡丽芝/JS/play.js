$(document).ready(function () {
    game.start();
    $(document).keydown(function(){
        var event = window.event||arguments[0];
        if(game.state==game.RUNNING){
            switch (event.keyCode) {
                case 37:                         //move left
                    game.moveLeft();
                    break;
                case 39:                         //move right
                    game.moveRight();
                    break;
                case 38:                         //move up
                    game.moveUp();
                    break;
                case 40:                         //move down
                    game.moveDown();
                    break;
            }

        }else if(event.keyCode==13){
            game.start();
        }
    })
})


var game = {
    data: [],
    score: 0,
    state: 1,
    RUNNING: 1,
    GameOver: 0,
    isWin: 0,
    PLAYING:2,

    start: function () {                              
        this.state = this.RUNNING;
        this.score = 0;
        this.data=[ [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0] ];
        $("#gameOver").css("display","none");
        $("#hasWin").css("display","none");
        this.GenerateRandomNun();
        this.GenerateRandomNun();
        this.updateView();
    },
    
    isFull: function () {
        console.log("isFull");
        for(var row = 0; row < 4; row++){
            for(var col = 0; col < 4; col++){
                if(this.data[row][col] == 0){
                    return false;
                }
            }
        }
        return true;
    },

    GenerateRandomNun: function () {
        console.log("random");
        if(this.isFull()) { return;}
        while(true) {
            var row = Math.floor(Math.random()*(3-0+1)+0);
            var col = Math.floor(Math.random()*(3-0+1)+0);
            if(this.data[row][col] == 0) {
                this.data[row][col] = Math.random()<0.5?2:4;
                break;
            }
        }
    },


    canLeft: function () {
        console.log("canleft");
        for(var row = 0; row < 4; row++) {
            for(var col = 1; col < 4; col++) {
                if(this.data[row][col] != 0) {
                    if(this.data[row][col-1] == 0 || this.data[row][col] == this.data[row][col-1]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    moveLeft: function () {
        console.log("moveLeft");
        if(this.canLeft()) {
            for(var row = 0; row < 4; row++) {
                this.moveLeftInRow(row);
            }
            this.state = this.PLAYING;
            animation.start();
            setTimeout(function() {
                game.state = game.RUNNING;
                game.GenerateRandomNun();
                game.updateView();
            }, animation.steps*animation.interval);
            
        }
    },

    moveLeftInRow: function (row) {
        for(var col = 0; col <= 2; col++){
            var nextCol = this.getNextRight(row,col);
            if(nextCol == -1) {break;}
            else {
                if(this.data[row][col] == 0) {
                    this.data[row][col] = this.data[row][nextCol];
                    this.data[row][nextCol] = 0;
                    animation.addTask(""+row+nextCol,""+row+col);
                    col--;
                }
                else if(this.data[row][col] == this.data[row][nextCol]) {
                    this.data[row][col]*=2;
                    this.data[row][nextCol]=0;
                    this.score+=this.data[row][col];
                    animation.addTask(""+row+nextCol,""+row+col);
                }
            }
        }
    },

    getNextRight:function(row,col) {
        for(var i = col+1; i < 4; i++) {
            if(this.data[row][i] != 0) {
                return i;
            }
        }
        return -1;
    },

    canRight:function() {
        for(var row = 0 ; row < 4; row++) {
            for(var col = 0; col < 3; col++) {
                if(this.data[row][col] != 0) {
                    if(this.data[row][col+1] == 0 || this.data[row][col] == this.data[row][col+1]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    moveRight:function() {
        if(this.canRight()) {
            for(var row = 0; row < 4; row++) {
                this.moveRightInRow(row);
            }
            this.state = this.PLAYING;
            animation.start();
            setTimeout(function() {
                game.state = game.RUNNING;
                game.GenerateRandomNun();
                game.updateView();
            }, animation.steps*animation.interval);
             
        }
    },

    moveRightInRow:function(row) {
        for(var col = 3; col > 0; col--) {
            var nextCol = this.getNextLeft(row,col);
            if(nextCol == -1) {break;}
            else {
                if(this.data[row][col]==0){
					this.data[row][col]=this.data[row][nextCol];
					this.data[row][nextCol]=0;
                    animation.addTask(""+row+nextCol,""+row+col);
					col++;
				}else if(this.data[row][col]==this.data[row][nextCol]){
					this.data[row][col]*=2;
					this.score+=this.data[row][col];
					this.data[row][nextCol]=0;
                   animation.addTask(""+row+nextCol,""+row+col);
				}
            }
        }
    },

    getNextLeft:function(row,col){
		for(var i=col-1;i>=0;i--){
			if(this.data[row][i]!=0){
				return i;	
			}	
		}		
		return -1;	
	},

    canUp:function(){
		for(var row=1;row<4;row++){
			for(var col=0;col<4;col++){
				if(this.data[row][col]!=0){
					if(this.data[row-1][col]==0||this.data[row][col]==this.data[row-1][col]){
						return true;
					}
				}
			}
		}
		return false;
	},
	moveUp:function(){
		if(this.canUp()){
		for(var col=0;col<4;col++){
				this.moveUpInCol(col);
			}
            this.state = this.PLAYING;
            animation.start();
            setTimeout(function() {
                game.state = game.RUNNING;
                game.GenerateRandomNun();
                game.updateView();
            }, animation.steps*animation.interval);
            
		}
	},
	moveUpInCol:function(col){
		for(var row=0;row<3;row++){
			var nextRow=this.getNextDown(row,col);
			if(nextRow==-1){
				break;
			}else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[nextRow][col];
					this.data[nextRow][col]=0;
                    animation.addTask(""+nextRow+col,""+row+col);
					row--;
				}else if(this.data[row][col]==this.data[nextRow][col]){
					this.data[row][col]*=2;
					this.score+=this.data[row][col];
					this.data[nextRow][col]=0;
                    animation.addTask(""+nextRow+col,""+row+col);
				}
			}
		}
	},
	getNextDown:function(row,col){
		for(var i=row+1;i<4;i++){
			if(this.data[i][col]!=0){
					return i;
			}
		}
		return -1;
	},



	canDown:function(){
		for(var row=0;row<3;row++){
			for(var col=0;col<4;col++){
				if(this.data[row][col]!=0){
					if(this.data[row+1][col]==0||this.data[row][col]==this.data[row+1][col]){
						return true;
					}
				}
			}
		}
		return false;
	},
	moveDown:function(){
		if(this.canDown()){
			for(var col=0;col<4;col++){
				this.moveDownInCol(col);
			}
            this.state = this.PLAYING;
            animation.start();
            setTimeout(function() {
                game.state = game.RUNNING;
                game.GenerateRandomNun();
                game.updateView();
            }, animation.steps*animation.interval);
            
		}
	},


	moveDownInCol:function(col){
		for(var row=3;row>0;row--){
			var nextRow=this.getNextUp(row,col);
			if(nextRow==-1){
				break;
			}else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[nextRow][col];
					this.data[nextRow][col]=0;
                    animation.addTask(""+nextRow+col,""+row+col);
					row++;
				}else if(this.data[row][col]==this.data[nextRow][col]){
					this.data[row][col]*=2;
					this.score+=this.data[row][col];
					this.data[nextRow][col]=0;
                    animation.addTask(""+nextRow+col,""+row+col);
				}
			}
		}
	},

	getNextUp:function(row,col){
		for(var i=row-1;i>=0;i--){
			if(this.data[i][col]!=0){
				return i;	
			}	
		}		
		return -1;	
	},


    updateView:function() {
        $("#score").val(this.score);
        for(var row = 0; row < 4; row++) {
            for(var col = 0; col < 4; col++) {
                if(this.data[row][col] == 0) {
                    $("#c"+row+col).removeClass().addClass("cell");
                    $("#c"+row+col).html("");
                }else {
                    $("#c"+row+col).removeClass().addClass("cell n"+this.data[row][col]);
                    $("#c"+row+col).html(this.data[row][col]);
                }
                if(this.data[row][col] == 2048) {
                    $("#hasWin").css('display','block');
                }
            }
        }
        if(this.isGameOver()) {
            this.state = this.GameOver;
            $("#gameOver").css('display','block');
            $("#finalScore").text(this.score);
            
        }
    },


    isGameOver:function() {
        if(!this.isFull()) {return false;}
        for(var row = 0; row < 4; row++) {
            for(var col = 0; col < 4; col++) {
                if(col < 3) {
                    if(this.data[row][col] == this.data[row][col+1]) {
                        return false;
                    }
                }
                if(row < 3) {
                    if(this.data[row][col] == this.data[row+1][col]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

}


function Task(obj,topStep,leftStep)
{
    this.obj = obj;
    this.topStep = topStep;
    this.leftStep = leftStep;
}

Task.prototype.moveStep = function() {
    var position = this.obj.position();
    var top = parseInt(position.top);
    var left = parseInt(position.left);
    this.obj.css('top',top + this.topStep + "px");
    this.obj.css('left',left + this.leftStep + "px");
}

Task.prototype.clear = function() {
    this.obj.css('top','');
    this.obj.css('left','');
}

var animation = {
    steps: 10,
    interval: 10,
    timer: null,
    tasks: [],
    addTask:function(source,target) {
        var sourcePosition = $("#c"+source).position();
        var targetPosition = $("#c"+target).position();
        var topStep = (parseInt(targetPosition.top) - parseInt(sourcePosition.top))/this.steps;
        var leftStep = (parseInt(targetPosition.left) - parseInt(sourcePosition.left))/this.steps;
        var task = new Task($("#c"+source),topStep,leftStep);
        this.tasks.push(task);
    },
    start:function() {
        this.timer = setInterval(function() {
            for(var j = 0; j < animation.tasks.length; j++) {
                animation.tasks[j].moveStep();
            }
            animation.steps--;
            if(animation.steps == 0) {
                for(var i = 0; i < animation.tasks.length; i++) {
                    animation.tasks[i].clear();
                }
                clearInterval(animation.timer);
                animation.timer = null;
                animation.tasks = [];
                animation.steps = 10;
            }

        },this.interval)
    }
}