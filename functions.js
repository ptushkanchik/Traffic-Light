//время работы в мигающем режиме
var blinkTime = 3;
//время работы желтого фонаря
var yellowTime = 3; 

function trafficLightStart(){
	
		if( input_red.value=="0" || input_green.value=="0" || isNaN(input_red.value) || isNaN(input_green.value) || +input_green.value<4 || +input_red.value<4 ){
			alert("Вводите данные корректно - в числовом виде и во все поля. Значения должны быть больше 3, меньше 999 и являться положительными числами.");
			input_red.value="0";
			input_green.value="0";
			return;
			}
	
	//заблокировать поля ввода 
		input_red.disabled = true;
		input_green.disabled = true;
		start.disabled = true;
		
	
	
	 setTimeout(function cicle(){
		
			green.point(+input_green.value);
			timer.runTime("green", +input_green.value);
			
			setTimeout(function(){
				green.blink("green", blinkTime);
				setTimeout(function(){
					yellow.point(yellowTime);
					setTimeout(function(){
						red.point(+input_red.value);
						timer.runTime("red", +input_red.value);
							setTimeout(function(){
								yellow.point(yellowTime);				
								},(+input_red.value - yellowTime)*1000);
								setTimeout(cicle,(+input_red.value)*1005);
						},(yellowTime)*1000);
					},( blinkTime)*1000);
				},+input_green.value*1000);
	}, 0);
}



Element.prototype.point = function(time){
	var self = this;
	self.style.backgroundColor = this.id;
	var timeId = setTimeout(function(){
		self.style.backgroundColor="";
		}, time*1000);
};

Element.prototype.runTime = function(colorText, time){
	this.style.color = colorText;
	this.style.fontSize = "60px";
	this.style.textAlign = "center";
	this.style.lineHeight = "100px";
	this.innerHTML = time;
	var self = this;
	var count = time;
	var timerId = setTimeout(function backTime(){
		if(count!=1){
			count--;
			self.innerHTML = count;
			setTimeout(backTime, 1000);
		}else{
			clearTimeout(timerId);
			self.innerHTML = "";
		}
	},1000);
}

Element.prototype.blink = function(color, count){
	var self = this;
	var count = count*2;
	var timeId = setTimeout(function elementBlink(){
		if(count!=0){
			if(self.style.backgroundColor!=color){
				self.style.backgroundColor = color;
				count--;
				setTimeout(elementBlink, 500);
			}else{
				self.style.backgroundColor = "";
				count--;
				setTimeout(elementBlink, 500);
			}
		}else{
			clearTimeout(timeId);
			}
		},500);
}