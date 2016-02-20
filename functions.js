//время работы в мигающем режиме
var blinkTime ;
//время работы желтого фонаря
var yellowTime; 
//переменная-переключатель состояния светофора "рабочее/нерабочее"
var work ;
function trafficLightStart(){
	
		if( input_red.value=="0" || input_green.value=="0" || isNaN(input_red.value) || isNaN(input_green.value) || +input_green.value<4 || +input_red.value<4 ){//если введенные данные равны нулю, не числа или меньше 4
			alert("Вводите данные корректно - в числовом виде и во все поля. Значения должны быть больше 3, меньше 999 и являться положительными числами.");
			input_red.value="0";//обнулить поле ввода
			input_green.value="0";//обнулить поле ввода
			return;//прекратить выполнение функции
			}
	
	//заблокировать поля ввода 
		input_red.disabled = true;
		input_green.disabled = true;
	//заблокировать кнопку старт
		start.disabled = true;
		
	work = true;//переключатель установить в рабочее состояние	
	blinkTime = 3;//установить время мигания светофора
	yellowTime = 3;//установить время работы желтого фонаря

//все запускаемые функции проверяют значение переменной-переключателя на true	
	 var x = setTimeout(function cicle(){
		if(work==true){
			green.point(+input_green.value);
			timer.runTime("green", +input_green.value);
		}
			
			setTimeout(function(){
				if(work==true){
					green.blink("green", blinkTime);
				}
				setTimeout(function(){
					if(work==true){
						yellow.point(yellowTime);
					}
					setTimeout(function(){
						if(work==true){
							red.point(+input_red.value);
							timer.runTime("red", +input_red.value);
						}
							setTimeout(function(){
								if(work==true){
								     yellow.point(yellowTime);
								}									 
								},(+input_red.value - yellowTime)*1000);
								if(work==true){
								     setTimeout(cicle,(+input_red.value)*1005);
								}
						},(yellowTime)*1000);
					},( blinkTime)*1000);
				},+input_green.value*1000);
		
	}, 0);
}

function trafficLightStop(){
	work=false;//поставить переключатель в положение "не работает"
	blinkTime = 0;//обнулить время мигания
	yellowTime = 0;//обнулить время работы желтого фонаря
	input_green.value = 0;//обнулить поле ввода работы зеленого фонаря
	input_red.value = 0;//обнулить поле ввода работы красного фонаря
	input_red.disabled = false;//разблокировать поле ввода для красного фонаря 
	input_green.disabled = false;//обнулить поле ввода для зеленого фонаря
	start.disabled = false;//разблокировать кнопку "СТАРТ"
//снять закрашивание всех фонарей и убрать тайиер из поля отсчета времени
	setTimeout(function(){
		timer.innerHTML = "";
		timer.style.backgroundColor = "";
		red.style.backgroundColor = "";
		yellow.style.backgroundColor = "";
		green.style.backgroundColor = "";
	},1000);
	
	
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
			if(work==true){
				setTimeout(backTime, 1000);
			}
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
				if(work==true){
					setTimeout(elementBlink, 500);
				}
			}else{
				self.style.backgroundColor = "";
				count--;
				if(work==true){
					setTimeout(elementBlink, 500);
				}
			}
		}else{
			clearTimeout(timeId);
			}
		},500);
}