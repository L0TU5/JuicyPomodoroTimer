
//get values from squeeze-session slider
var sliderSqueeze = document.getElementById("squeeze");
var squeezeOutput = document.getElementById("squeezeSlideSet");

sliderSqueeze.oninput = function() {

	squeezeTime = this.value;
	sq = "squeeze";
	squeezeOutput.innerHTML = squeezeTime; //squeeze-slider value display is hidden in html
	
	setTime(squeezeTime, sq);

};

// get values from drink-break slider
var sliderDrink = document.getElementById("drink");
var drinkOutput = document.getElementById("drinkSlideSet");

sliderDrink.oninput = function() {

	drinkTime = this.value;
	dr = "drink";
	drinkOutput.innerHTML = drinkTime; //drink-slider value display is hidden in html

	setTime(drinkTime, dr);

};

//set values of session and drink timer display
function setTime(num, id) {

	var secs = num * 1000;
	var sec = Math.floor(secs / 1000);
	var min = Math.floor(sec / 60);

	min %= 60;
	min = min < 10 ? "0" + min : min;
	sec %= 60;
	sec = sec < 10 ? "0" + sec : sec;

	document.getElementById(id + "Min").innerHTML = min + ":";
	document.getElementById(id + "Sec").innerHTML = sec;

}


// TESTING FIELD FOR TESTING SOME BULLSHIT COUNTER SHIT TO MAKE THE FUCKING THING WORK T-T ++++++++++++++++++++++

var juiced = 0;
// begin countdowns
function startCount() {
console.log(juiced);//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	//get string values from slider set, convert to int
		var juiceVal = parseInt(squeezeOutput.innerHTML);
		var drinkVal = parseInt(drinkOutput.innerHTML);
	
	if (juiced <= 1) {
		getJuiced(juiceVal);
	} 
	if (juiced > 1) {
		if (juiceVal >=1) {
			startJuicing(juiceVal);
		} else if (juiceVal === 0 && drinkVal>0) {
			startDrinking(drinkVal);
		}
	}
}

// END BULLSHIT TEST FIELD ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// display 3-2-1 countdown before timer start
function getJuiced() {
	juiced+=1; // updates juiced count after completing function
	var count = 5; //set to 5 to allow for proper visual spacing - DO NOT CHANGE
	
	three2one = setInterval(function() {
	
		x = --count;
		
		document.getElementById("three2one").innerHTML = x - 1;

		if(count == 1) {
			document.getElementById("three2one").innerHTML = "<h3>Get Juiced!!!</h3>"; 
		}
		
		if(count <= 0) {
			document.getElementById("three2one").style.display = "none";
			clearInterval(three2one);
			startCount();
		}
		
	}, 1200);
}

//begin countdown for session timer and squeeze animation
function startJuicing(num) {
	//document.getElementById("squeeze").style.display = "none";
  //document.getElementById("drink").style.display = "none";

	squeezeTime = num;

	var juice = squeezeTime / 100; //percent of squeezeTime
	
	sqeezeTimer = setInterval(function() {
	
		squeeze = --squeezeTime;
		juicy = squeeze / juice;
		sq = "squeeze";

		setTime(squeeze, sq);

		$("#tomatoe").height(juicy.toFixed(2) + "%"); //drain animation
		document.getElementById("pomodoro").style.marginTop = juicy.toFixed(1) + "%"; //fill animation

		squeezeOutput.innerHTML = squeeze; // update squeeze output for startCount interval tracking 
		
		if (squeeze <= 0) {
			clearInterval(sqeezeTimer);
			squeezeDone();
		}
		
	}, 1000);
}

// squeeze timer complete!
function squeezeDone() {
	
	mixTime = 2;
	
	mixIt = setInterval(function(){
		
		stir = --mixTime;
		
		if(stir==1) {
			document.getElementById("drinkUp").style.display = "block";
			document.getElementById("drinkUp").innerHTML = "<h3>Nice Squeeze!</h3>";
		}
		if(stir<=0) {
			document.getElementById("drinkUp").style.display = "none";
			clearInterval(mixIt);
			startCount();
		}
		
	}, 1000);
}

//begin countdown for break timer and drink animation
function startDrinking(num) {
	document.getElementById("pomodoro").style.bottom = "0%";
	document.getElementById("drinkUp").style.display = "none";
	document.getElementById("tomatoe").style.display = "none";

	drinkTime = num;
	var gulp = drinkTime / 100; //percent of squeezeTime
	
	drinkTimer = setInterval(function() {
	
		sip = --drinkTime;
		swallow = sip / gulp;
		dr = "drink";
		
		drinkOutput.innerHTML = sip;
		
		setTime(sip, dr);
		
		$("#pomodoro").height(swallow.toFixed(2) + "%"); //drain animation

		if (sip <= 0) {
			clearInterval(drinkTimer);
			startCount();
		}
		
	}, 1000);
}

// all done! 
function cleanUp() {
	
	var dishes = 2;
	
	yum = setInterval(function(){
	
		dish = --dishes;
		
		if(dish == 2) {
			document.getElementById("pomodoro").style.display = "none";
			document.getElementById("tomatoe").style.display = "none";
			document.getElementById("yummy").style.display = "block";
			document.getElementById("yummy").innerHTML = "<h3 style='font-size:20vw'>Yummy!</h3>"; 
		}
		if(dish <= 1) {
			document.getElementById("yummy").style.display = "none";
//			resetTomatoe();
			clearInterval(yum);
		}	
	
	}, 1000);
}
// pause timer
function stopJuicing() {
			clearInterval(three2one);
	clearInterval(sqeezeTimer);
	clearInterval(drinkTimer);
				clearInterval(mixIt);
			clearInterval(yum);
}

// reset timer
function resetTomatoe() {
	stopJuicing();
				document.getElementById("squeeze").style.display = "block";
			document.getElementById("drink").style.display = "block";
}