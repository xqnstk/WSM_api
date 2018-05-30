var url="";	//주소
var subCode="";	//장르코드
var tmpHtml="";	//html 태그문장
var today=getTimeStamp();

window.onload=init;

function init() {
	handleRefresh();
}

function SearchConcert(concerts) {
	
	var concertDiv = document.getElementById("concertDiv");	//아이디값 찾기

	concerts = concerts.SearchPerformanceBySubjectService.row;	//줄 별로 값 불러오기

	concertDiv.innerHTML = "";

	for(var i = 0; i<concerts.length; i++) {
		var concert = concerts[i];
		var div = document.createElement("div");	//div 동적 생성


		var getDiff=getDateDiff(concert.END_DATE,today);

		if(getDiff>0) {


			tmpHtml+='<div class="concert">';
			tmpHtml+='<img src="'+concert.MAIN_IMG+'" style="width:255px; height:360px;"><br>';
			tmpHtml+='<div id="title">'+concert.TITLE+'</div><br>';
			tmpHtml+='['+concert.STRTDATE+' ~ '+concert.END_DATE+']<br>';
			tmpHtml+='<a href="https://www.google.co.kr/maps/search/'+concert.PLACE+
			'" target="_blank">'+concert.PLACE+'</a><br></div><br><br>';//div 생성후 이미지와 글 추가 

			div.innerHTML=tmpHtml;	//div에 html태그문장 출력
		}
		if(concertDiv.childElementCount == 0) {
			concertDiv.appendChild(div);
		} else {
			concertDiv.insertBefore(div, concertDiv.firstChild);
		}
		tmpHtml="";	//문장 초기화
	}

	if(concerts.length > 0) {
		lastReportTime = concerts[concerts.length-1].time;
	}

}

function getTimeStamp() {
	var d = new Date();
	var s =
		leadingZeros(d.getFullYear(), 4) + '-' +
		leadingZeros(d.getMonth() + 1, 2) + '-' +
		leadingZeros(d.getDate(), 2);

	return s;
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}
function getDateDiff(date1,date2)
{
	var arrDate1 = date1.split("-");
	var getDate1 = new Date(parseInt(arrDate1[0]),parseInt(arrDate1[1])-1,parseInt(arrDate1[2]));
	var arrDate2 = date2.split("-");
	var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));

	var getDiffTime = getDate1.getTime() - getDate2.getTime();

	return Math.floor(getDiffTime / (1000 * 60 * 60 * 24));
}

function go_top(orix,oriy,desx,desy) {	//맨위 버튼 함수
	var Timer;
	if (document.body.scrollTop == 0) {	//밑에 있지 않을 때
		var winHeight = document.documentElement.scrollTop;
	} else {
		var winHeight = document.body.scrollTop;
	}
	if(Timer) clearTimeout(Timer);	//타이머 초기화
	startx = 0;
	starty = winHeight;
	if(!orix || orix < 0) orix = 0;	//맨위가 아닐때 x좌표 0
	if(!oriy || oriy < 0) oriy = 0;	//맨위가 아닐때 y좌표 0
	var speed = 7;	//올라가는 속도
	if(!desx) desx = 0 + startx;
	if(!desy) desy = 0 + starty;
	desx += (orix - startx) / speed;	//스피드 적용
	if (desx < 0) desx = 0;
	desy += (oriy - starty) / speed;	//스피드 적용
	if (desy < 0) desy = 0;
	var posX = Math.ceil(desx);	var posY = Math.ceil(desy);	//올림값 반환
	window.scrollTo(posX, posY);	//올라가기
	if((Math.floor(Math.abs(startx - orix)) < 1) && (Math.floor(Math.abs(starty - oriy)) < 1)){
		clearTimeout(Timer);//타이머 해제
		window.scroll(orix,oriy);	//올라가기
	}else if(posX != orix || posY != oriy){
		Timer = setTimeout("go_top("+orix+","+oriy+","+desx+","+desy+")",15);	//타이머설정
	}else{
		clearTimeout(Timer);	//타이머 해제
	}
}


function getSelectValue() {
	var selectvalues = document.getElementsByName("genre");	//name으로 값 찾기
	for(var i = 0; i<selectvalues.length; i++) {
		if(selectvalues[i].selected == true) {	//선택된 옵션찾기
			subCode = selectvalues[i].value;	//선택된 옵션의 value값 가져오기
			//alert(subCode);
			console.log("alert");	//확인 콘솔
		}
	}
	handleRefresh();
	SearchConcert();
}


function updateURL() {
	url="http://openAPI.seoul.go.kr:8088/인증키/json/SearchPerformanceBySubjectService/1/500"
		+"/"+
		subCode
		//+"/?callback=SearchConcert"; //장르코드를 받아온대로 주소 업데이트
	$.getJSON(url, SearchConcert);
}

function handleRefresh() {
	updateURL();	//주소 업데이트
	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src",url);
	newScriptElement.setAttribute("id","jsonp");
	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];
	if(oldScriptElement ==null){
		head.appendChild(newScriptElement);
	}
	else {
		head.replaceChild(newScriptElement, oldScriptElement);
	}
}