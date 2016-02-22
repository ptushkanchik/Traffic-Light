//время работы в мигающем режиме
var blinkTime = 3 ;
//время работы желтого фонаря
var yellowTime = 3; 
//переменные для присвоения таймаутов
var ctrl1, ctrl2, ctrl3, ctrl4, ctrl5, ctrl6, ctrl7, ctrl8, ctrl9, ctrl10;


function trafficLightStart(){
	
		if( input_red.value=="0" || input_green.value=="0" || isNaN(input_red.value) || isNaN(input_green.value) || +input_green.value<4 || +input_red.value<4 ){//если введенные данные равны нулю, не числа или меньше 4
			alert("Вводите данные корректно - в числовом виде и во все поля. Значения должны быть больше 3, меньше 999 и являться положительными числами.");
			$(".set_time").val("0");//обнулить поля ввода
			return;//прекратить выполнение функции
			}
	
	//заблокировать поля ввода 
		$(".set_time").prop("disabled", true);
	//заблокировать кнопку старт
		$("#start").prop("disabled", true);
		
//все запускаемые в хронологическом порядке функции записывают идентификаторы таймеров в переменные ctrl1...ctrl10	
	ctrl1 = setTimeout(function cicle(){
		
			green.point(+input_green.value);
			timer.runTime("green", +input_green.value);
			
			ctrl2 =	setTimeout(function(){
				green.blink("green", blinkTime);
				
				ctrl3 = setTimeout(function(){
					yellow.point(yellowTime);
					
					ctrl4 =	setTimeout(function(){
						red.point(+input_red.value);
						timer.runTime("red", +input_red.value);
						
						ctrl5 =	setTimeout(function(){
							yellow.point(yellowTime);
							},(+input_red.value - yellowTime)*1000);
								
							ctrl6 =  setTimeout(cicle,(+input_red.value)*1005);
								
					},(yellowTime)*1000);
				},( blinkTime)*1000);
			},+input_green.value*1000);
		
	}, 0);
}

function trafficLightStop(){
	$(".set_time").val("0");//обнулить поля ввода
	$(".set_time").prop('disabled', false);//разблокировать поля ввода
	$("#start").prop('disabled', false);//разблокировать кнопку "СТАРТ"
//остановить все запланированные таймауты
	clearTimeout(ctrl1);
	clearTimeout(ctrl2);
	clearTimeout(ctrl3);
	clearTimeout(ctrl4);
	clearTimeout(ctrl5);
	clearTimeout(ctrl6);
	clearTimeout(ctrl7);
	clearTimeout(ctrl8);
	clearTimeout(ctrl9);
	clearTimeout(ctrl10);
//снять закрашивание всех фонарей и убрать таймер из поля отсчета времени
	$(".lamp").css("backgroundColor","");
	timer.innerHTML = "";
}


Element.prototype.point = function(time){
	var self = this;
	self.style.backgroundColor = this.id;
	ctrl7 = setTimeout(function(){
		self.style.backgroundColor="";
		}, time*1000);
};

Element.prototype.runTime = function(colorText, time){
	this.style.color = colorText;
	$(this).css({fontSize:"60px", textAlign:"center", lineHeight:"100px"});
	this.innerHTML = time;
	var self = this;
	var count = time;
	ctrl8 = setTimeout(function backTime(){
		if(count!=1){
			count--;
			self.innerHTML = count;
			ctrl9 =	setTimeout(backTime, 1000);
		}else{
			clearTimeout(ctrl8);
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
				ctrl10 = setTimeout(elementBlink, 500);
			}else{
				self.style.backgroundColor = "";
				count--;
				ctrl10 =	setTimeout(elementBlink, 500);
			}	
		}else{
			clearTimeout(timeId);
			}
		},500);
}