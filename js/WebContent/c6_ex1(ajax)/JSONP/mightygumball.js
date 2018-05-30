/* mightygumball.js */
/*
 * JSON 파일의 내용을 JSONP로 가져옴
 * 3초마다 업데이트 됨
 *
 */
var lastReportTime = 0;

window.onload = init;

function init() {
	var interval = setInterval(handleRefresh, 3000); //3초마다 handleRefresh() 호출
	handleRefresh();
}

function handleRefresh() {
	console.log("here");
	var url = "http://gumball.wickedlysmart.com" +
				"?callback=updateSales" +
				"&lastreporttime=" + lastReportTime ; //lastreporttime -> 중복 안 하기 위해 써줌, 3초마다 가져옴, 아까 준 건가 아닌가
				//+"&random=" + (new Date()).getTime(); //쿠키에서 가져오는 것을 막고, 항상 새로운 걸로 교체받기 위해 
	var newScriptElement = document.createElement("script"); //스크립트를 무한대로 가져오는 것을 막기 위해
	newScriptElement.setAttribute("src", url);
	newScriptElement.setAttribute("id", "jsonp");
	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];
	if (oldScriptElement == null) {
		head.appendChild(newScriptElement);
	}
	else {
		head.replaceChild(newScriptElement, oldScriptElement);
	}
}

function updateSales(sales) {
	var salesDiv = document.getElementById("sales");
	for (var i = 0; i < sales.length; i++) {
		var sale = sales[i];
		var div = document.createElement("div");
		div.setAttribute("class", "saleItem"); //css의 div.saleitem에 적용
		div.innerHTML = sale.name + "에서 검볼을 " + sale.sales + "개 팔았습니다";
		//salesDiv.appendChild(div);
		if (salesDiv.childElementCount == 0) { //가져온 게 없다
			salesDiv.appendChild(div); //밑으로 추가됨
		}
		else {
			salesDiv.insertBefore(div, salesDiv.firstChild); //위로 솟아남
		}
	}

	if (sales.length > 0) {
		lastReportTime = sales[sales.length-1].time;
	}
}