window.onload=init;
function init() {
	var button = document.getElementBuId("amilucky");
	button.onclick=getLuck;
}

function getLuck() {
	var url = "luckyornot.txt";
	var request = new XMLHttpRequest();
	
	request.onload=function() {
		if(request.status == 200) {
			displayLuck(responseText);
		}
	};
	
	request.open("GET", url);
	request.send(null);
}

function dispalyLuck(luck) {
	var p = document.getElementById("luck");
	p.innerHTML = "당신은 오늘  "+luck+"합니다.";
}