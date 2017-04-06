var playon=false,
	score=0,
	td=new Array(),
	countDown = 30,
	interId = null ,
	timeId = null;

function clearpipi(){
	for (var i=1; i<=9 ; i++)
	{
		document.getElementById("td["+i+"]").innerHTML='';
	}
}

function timeShow(){
	document.frm1.countdown.value = countDown;
	if(countDown<=0)
	{
		clearpipi();
		playon=false;
		document.frm1.countdown.value = "";
		document.frm1.score.value ="";
		alert("游戏结束!\n你的得分是:"+score+"!");
		score=0;
		countDown=30;
		clearInterval(interId);
		clearTimeout(timeId);
	}
	else
	{
		countDown-=1;
		timeId = setTimeout("timeShow()",1000);
	}
}

function miss(num){
	if(playon==true)
	{
		if(document.getElementById("td["+num+"]").innerHTML!='')
		{
			document.getElementById("td["+num+"]").innerHTML=' <img src="img/chacha.png"> ';
			setTimeout(" document.getElementById('td["+num+"]').innerHTML = '' " , 200); 
		}
	}
}


function show(){
	if(playon)
	{
		var rnd = Math.floor(Math.random()*9)+1;
		document.getElementById("td["+rnd+"]").innerHTML = '<img src="img/pipi.png">' ;
		setTimeout("miss("+rnd+")" , 1250); 
	}
}

function da(id){
	if(playon==true)
	{
		if(document.getElementById("td["+id+"]").innerHTML!='')
		{
			score+=1;
			document.frm1.score.value = score;
			document.getElementById("td["+id+"]").innerHTML=' <img src="img/222.png"> ';
			setTimeout(" document.getElementById('td["+id+"]').innerHTML = '' " , 200);
		}
		else
		{
			countDown-=2;
			document.getElementById("td["+id+"]").innerHTML=' <p style="font-size:42px; color: red;"> -2秒 </p>';
			setTimeout(" document.getElementById('td["+id+"]').innerHTML = '' " , 500);
			document.frm1.score.value = score;
		}
	}
}


function StartGame(){
	playon = true;
	interId = setInterval("show()",800);
	document.frm1.score.value = score;
	timeShow();
}