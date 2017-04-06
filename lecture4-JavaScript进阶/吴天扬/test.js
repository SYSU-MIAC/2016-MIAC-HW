var BackgroundColor="#cdc1b4";//游戏界面中的空元素背景颜色
var score=0;//分数
var map=new Array(20);
var beforer=new Array(20);//debug
var mapNum;//全局变量，表示对象个数

//在指定位置创建对象
$(document).ready(function(){
});

function construct(number,position)
{
	map[position]=number;
	
	var e=$("#note"+position);
	if(number!=0)
		e.text(number);
	switch(number)
	{
		case 0:
				e.css("backgroundColor",BackgroundColor);
				break;
		case 2:	e.css("backgroundColor","#eee4da");
				break;
		case 4:	e.css("backgroundColor","#ede0c8");
				break;
		case 8:	e.css("backgroundColor","#f2b179");
				break;	
		case 16:e.css("backgroundColor","#f59563");
				break;
		case 32:e.css("backgroundColor","#f67c5f");
				break;
		case 64:e.css("backgroundColor","#ff4500");
				break;
		case 128:e.css("backgroundColor","#ffffe0");
				break;
		case 256:e.css("backgroundColor","#edcc61");
				break;
		case 512:e.css("backgroundColor","#edc850");
				break;
		case 1024:e.css("backgroundColor","#ADFF2F");
				break;
		case 2048:	e.css("backgroundColor","#7CFC00");
				break;
		case 4096:	e.css("backgroundColor","#00FF7F");
				break;
		case 8192:	e.css("backgroundColor","#7FFFD4");
				break;			
		case 16384:	e.css("backgroundColor","#00CED1");
				break;	
		case 32768:	e.css("backgroundColor","#00BFFF");
				break;	
		case 65536:	e.css("backgroundColor","#1E90FF");
				break;					
	}
}

//删除指定位置的对象
function destruct(position)
{
	var e=$("#note"+position);
	e.text("");
	e.css("backgroundColor",BackgroundColor);
	map[position]=0;
}

//更新指定位置的数据：即在修改的时候先修改map中的值，再以map中的值为标准来更新界面。
function reconstruct(position)
{
	var number=map[position];
	var e=document.getElementById("note"+position);
	if(number!=0) 
		e.innerHTML=number;
	else if(e.innerHTML!=0&&number==0)//debug
		e.innerHTML="";
	switch(number)
	{
		//debug
		case 0:
				e.style.backgroundColor=BackgroundColor;
				break;
		case 2:	e.style.backgroundColor="#eee4da";
				break;
		case 4:	e.style.backgroundColor="#ede0c8";
				break;
		case 8:	e.style.backgroundColor="#f2b179";
				break;	
		case 16:	e.style.backgroundColor="#f59563";
				break;
		case 32:	e.style.backgroundColor="#f67c5f";
				break;
		case 64:	e.style.backgroundColor="#ff4500";
				break;
		case 128:	e.style.backgroundColor="#ffffe0";
				break;
		case 256:	e.style.backgroundColor="#edcc61";
				break;
		case 512:	e.style.backgroundColor="#edc850";
				break;
		case 1024:	e.style.backgroundColor="#ADFF2F";
				break;
		case 2048:	e.style.backgroundColor="#7CFC00";
				break;
		case 4096:	e.style.backgroundColor="#00FF7F";
				break;
		case 8192:	e.style.backgroundColor="#7FFFD4";
				break;			
		case 16384:	e.style.backgroundColor="#00CED1";
				break;	
		case 32768:	e.style.backgroundColor="#00BFFF";
				break;	
		case 65536:	e.style.backgroundColor="#1E90FF";
				break;					
	}	
}
//更改分数
function AddScore(number)
{
	var e=document.getElementById("score");
	score+=number;
	e.innerHTML=score;
}

function connect(posa,posb)//将posb与posa合并，posa保留，posb删除
{
	
	map[posa]*=2;
	AddScore(map[posb]);
	map[posb]=0;
	mapNum--;
}



//return a position based on the given x,y
//x代表列，y代表行（计算机视角）
function CountPosition(x,y)
{
	return x+(y-1)*4;
}

var test=0;
//重置
function reset()
{
	for(var i=1;i<=16;i++)
	{
		destruct(i);
		//debug
		beforer[i]=0;
	}
	
	var aim=Math.floor(16*Math.random())+1;
	var aim2;
	do
	{
		aim2=Math.floor(16*Math.random())+1;
	}while(aim2==aim);
	construct(2,aim);
	construct(4,aim2);
	mapNum=2;
	
	score=0;
	var e=document.getElementById("score");
	e.innerHTML="0";
	
}

//在id为wrapper的div中创建
function create()
{
	var body=document.getElementById("wrapper");;

	for(var i=0;i<4;i++)
	{
		var line=document.createElement("div");
		line.id="line"+(i+1);
		body.appendChild(line);
		
		for(var j=1;j<=4;j++)
		{
			var note=document.createElement("div");
			line.appendChild(note);			
			
			note.id="note"+(i*4+j);
			
			//css
			note.style.height="90px";
			note.style.width="90px";
			note.style.borderRadius="5%";
			note.style.margin="10px";
			note.style.backgroundColor=BackgroundColor;
			note.style.display="inline-block";
			note.style.border="1px solid #cdc1b4";
			note.style.verticalAlign="top";//保证不下沉
			note.style.textAlign="center";//水平居中
			note.style.lineHeight="90px";//垂直居中
			note.style.fontSize="2em";
			note.style.fontWeight="bolder";
		}
	}
	
	//clear data
	reset();
	
}

//在其中创建新的块
function CreateNew()
{
	if(mapNum==16)
	{
		return 1;//满了，无法创建新的
	}
	
	var Empty=new Array();
	var point=1;
	for(var i=1;i<=16;i++)
	{
		if(map[i]==0)
		{
			Empty[point]=i;
			point++;
		}
	}
	point--;
	//建立集合，元素为map中的空地
	var aim=Math.floor(point*Math.random())+1;	
	var which=Math.floor(2*Math.random())+1;
	if(which==1)
		which=4;
	map[Empty[aim]]=which;
	reconstruct(Empty[aim]);
	
	//animation
	var e=$("#note"+Empty[aim]);
	
	mapNum++;
}
//debug
function before()
{
	for(var i=1;i<=16;i++)
	{
		map[i]=beforer[i];
		reconstruct(i);
	}
}

//执行操作
document.onkeyup=function(event){
	var e=event.keyCode;
	var judgement=0;//判断是否为移动
	var ifconnect=0;
	var ifmove=0;
	for(var i=1;i<=16;i++)//debug
		beforer[i]=map[i];
		
	switch(e)
	{
		case 38://up
		case 87:
					judgement=1;
					for(var i=1;i<=4;i++)
					{
						//块合并
						var start=0,end=0;
						for(var j=4;j>=1;j--)
						{
							var position=CountPosition(i,j);
							var e=document.getElementById("note"+position);
							
							if(map[position]!=0)
							{
								if(start==0&&end==0)
									start=j,end=j;
								else if(start!=0&&end!=0)
									start=j;
							}
							else if(map[position]==0&&start!=0&&end!=0)
							{
								ifmove=1;
								for(var k=start;k<=end;k++)
								{
									var Pa=CountPosition(i,k),Pb=CountPosition(i,k-1);
									map[Pb]=map[Pa];
								}
								destruct(CountPosition(i,end));
								start--,end--;
							}

						}
						
						//检查合并
						for(var j=start;j<=end-1;j++)
						{				
							var Pa=CountPosition(i,j);
							var Pb=CountPosition(i,j+1);
							if(map[Pa]==map[Pb])
							{
								connect(Pa,Pb);//将Pa与Pb合并
								ifconnect=1;
								//change
								for(var k=j+1;k<=end&&k<=3;k++)//整体前移
								{
									var Pc=CountPosition(i,k);
									var Pd=CountPosition(i,k+1);
									map[Pc]=map[Pd];
								}
								map[CountPosition(i,end)]=0;
								end--;
							}
										
						}
							
						for(var j=1;j<=4;j++)
						{
							var position=CountPosition(i,j);
							reconstruct(position);
						}
						
					}
				break;
		case 40://down
		case 83:
					judgement=1;
					for(var i=1;i<=4;i++)
					{
						//块合并
						var start=0,end=0;
						for(var j=1;j<=4;j++)
						{
							var position=CountPosition(i,j);
							var e=document.getElementById("note"+position);
							
							if(map[position]!=0)
							{
								if(start==0&&end==0)
									start=j,end=j;
								else if(start!=0&&end!=0)
									end=j;
							}
							else if(map[position]==0&&start!=0&&end!=0)
							{
								ifmove=1;
								for(var k=end;k>=start;k--)
								{
									var Pa=CountPosition(i,k),Pb=CountPosition(i,k+1);
									map[Pb]=map[Pa];
								}
								destruct(CountPosition(i,start));
								start++,end++;
							}		
						}
						
						//检查合并
						for(var j=end;j>=start+1;j--)
						{
							var Pa=CountPosition(i,j);
							var Pb=CountPosition(i,j-1);
							if(map[Pa]==map[Pb])
							{
								connect(Pa,Pb);//将Pa与Pb合并
								ifconnect=1;
								for(var k=j-1;k>=start+1;k--)//整体前移
								{
									var Pc=CountPosition(i,k);
									var Pd=CountPosition(i,k-1);
									map[Pc]=map[Pd];
								}
								map[CountPosition(i,start)]=0;
								start++;
							}
						}
						
						for(var j=1;j<=4;j++)
						{
							var position=CountPosition(i,j);
							reconstruct(position);
						}
						
					}		
				break;
		case 37://left
		case 65:
					judgement=1;
					for(var j=1;j<=4;j++)
					{
						//块合并
						var start=0,end=0;
						for(var i=4;i>=1;i--)
						{
							var position=CountPosition(i,j);
							var e=document.getElementById("note"+position);
							
							if(map[position]!=0)
							{
								if(start==0&&end==0)
									start=i,end=i;
								else if(start!=0&&end!=0)
									start=i;
							}
							else if(map[position]==0&&start!=0&&end!=0)
							{
								ifmove=1;
								for(var k=start;k<=end;k++)
								{
									var Pa=CountPosition(k,j),Pb=CountPosition(k-1,j);
									map[Pb]=map[Pa];
								}
								destruct(CountPosition(end,j));
								start--,end--;
							}		
						}
						
						//检查合并
						for(var i=start;i<=end-1;i++)
						{
							var Pa=CountPosition(i,j);
							var Pb=CountPosition(i+1,j);
							if(map[Pa]==map[Pb])
							{
								connect(Pa,Pb);//将Pa与Pb合并
								ifconnect=1;
								for(var k=i+1;k<=end-1;k++)//整体前移
								{
									var Pc=CountPosition(k,j);
									var Pd=CountPosition(k+1,j);
									map[Pc]=map[Pd];
								}
								map[CountPosition(end,j)]=0;
								end--;
							}
						}
						
						for(var i=1;i<=4;i++)
						{
							var position=CountPosition(i,j);
							reconstruct(position);
						}
						
					}				
				break;
		case 39://right
		case 68:
					judgement=1;
					for(var j=1;j<=4;j++)
					{
						//块合并
						var start=0,end=0;
						for(var i=1;i<=4;i++)
						{
							var position=CountPosition(i,j);
							var e=document.getElementById("note"+position);
							
							if(map[position]!=0)
							{
								if(start==0&&end==0)
									start=i,end=i;
								else if(start!=0&&end!=0)
									end=i;
							}
							else if(map[position]==0&&start!=0&&end!=0)
							{
								ifmove=1;
								for(var k=end;k>=start;k--)
								{
									var Pa=CountPosition(k,j),Pb=CountPosition(k+1,j);
									map[Pb]=map[Pa];
								}
								destruct(CountPosition(start,j));
								start++,end++;
							}		
						}
						
						//检查合并
						for(var i=end;i>=start+1;i--)
						{
							var Pa=CountPosition(i,j);
							var Pb=CountPosition(i-1,j);
							if(map[Pa]==map[Pb])
							{
								connect(Pa,Pb);//将Pa与Pb合并
								ifconnect=1;
								for(var k=i-1;k>=start+1;k--)//整体前移
								{
									var Pc=CountPosition(k,j);
									var Pd=CountPosition(k-1,j);
									map[Pc]=map[Pd];
								}
								map[CountPosition(start,j)]=0;
								start++;
							}
						}
						
						for(var i=1;i<=4;i++)
						{
							var position=CountPosition(i,j);
							reconstruct(position);
						}
						
					}			
				break;
		case 27:reset();
				break;
	}
	if(judgement==0||(ifmove==0&&ifconnect==0))
		return;
	
	var dead=CreateNew();
	if(dead==1)//未完成，验证死亡。死亡的条件：无法合并
	{
		var ok=0;
		jump:
		for(var i=1;i<=4;i++)
		{
			for(var j=1;j<=4;j++)
			{
				var up,down,left,right,now;
				now=CountPosition(i,j);
				if(i!=1)
				{
					left=CountPosition(i-1,j);
					if(map[now]==map[left])
					{
						ok=1;
						break jump;						
					}
				}

				if(j!=1)
				{
					up=CountPosition(i,j-1);
					if(map[now]==map[up])
					{
						ok=1;
						break jump;						
					}
				}

				if(i!=4)
				{
					right=CountPosition(i+1,j);
					if(map[now]==map[right])
					{
						ok=1;
						break jump;						
					}
				}
					
				if(j!=4)
				{
					down=CountPosition(i,j+1);
					if(map[now]==map[down])
					{
						ok=1;
						break jump;						
					}			
				}
			}
		}

		if(ok==0)
		{
			alert("Game over!Your score is "+score);
		}
		
	}
}

function special()
{
	reset();
	for(var i=1;i<=16;i++)
	{
		map[i]=0,before[i]=0
		reconstruct(i);
	}
	construct(65536,16);
	construct(32768,15);
	construct(16384,14);
	construct(8192,13);
	construct(4096,9);
	construct(2048,10);
	construct(1024,11);
	construct(512,12);
	construct(256,8);
	construct(128,7);
	construct(64,6);
	construct(32,5);
	construct(16,1);
	construct(8,2);
	construct(4,3);
	construct(2,4);
}