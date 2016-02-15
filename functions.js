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