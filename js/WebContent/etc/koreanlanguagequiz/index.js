window.onload = init;

var inputAnswer = null;
var comAnswer = null;
var comAnswer2 = null;
var stage=0;
var sum=0;
var saveSomething="";
var chVer=1;
var setClickAgain=0;
//var KoreanVideo = document.getElementById("video1");

function init() {
	var nickname=prompt("닉네임을 입력해주세요 : ", "닉네임");
	document.getElementById("nickname").value=nickname;
	handleRefresh();
	handleRefresh2();
}

function openQuiz(){
	var correct=0;
	var radioAnswer = document.getElementsByName("bogi_radio");
	for(var i=0; i<4; i++){
		if(radioAnswer[i].checked){
			inputAnswer=i;
		}
	}//for


	//정답 비교
	if(inputAnswer==null){
		alert("정답을 체크해 주십시오.");
	}
	else if (inputAnswer == comAnswer) {
		correct++;
		//alert("정답입니다! 축하드립니다~");
		if(correct==1){//여러번 다시 푸는 것 방지
			sum=sum+10;
		}

		switch (inputAnswer) {
		case 0:
			document.getElementById("bogi_l").style.color="green";
			break;
		case 1:
			document.getElementById("bogi1_l").style.color="green";
			break;
		case 2:
			document.getElementById("bogi2_l").style.color="green";
			break;
		case 3:
			document.getElementById("bogi3_l").style.color="green";
			break;
		default:
			break;
		}
		delay(2000);

	} else {
		correct++;
		//alert("틀렸습니다! 분발하세요~");
		switch (comAnswer) {
		case 0:
			document.getElementById("bogi_l").style.color="red";
			break;
		case 1:
			document.getElementById("bogi1_l").style.color="red";
			break;
		case 2:
			document.getElementById("bogi2_l").style.color="red";
			break;
		case 3:
			document.getElementById("bogi3_l").style.color="red";
			break;
		default:
			break;
		}
		delay(2000);
	}

	switch (chVer) {
	case 1:
		if( (sum!=0)&&(sum/10)>=(stage-3) ){
			document.getElementById("image").setAttribute("src", "image/muzi_high.png");
		}
		else if(sum >=((stage*10) -60)){
			document.getElementById("image").setAttribute("src", "image/muzi_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/muzi_low.png");
		}
		break;
	case 2:
		if(sum >= ((stage*10) -10)){
			document.getElementById("image").setAttribute("src", "image/apeach_high.png");
		}
		else if(sum >=((stage*10) -60)){
			document.getElementById("image").setAttribute("src", "image/apeach_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/apeach_low.png");
		}
		break;

	case 3:
		if(sum >= ((stage*10) -10)){
			document.getElementById("image").setAttribute("src", "image/frodo_high.png");
		}
		else if(sum >=((stage*10) -60)){
			document.getElementById("image").setAttribute("src", "image/frodo_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/frodo_low.png");
		}
		break;

	case 4:
		if(sum >= ((stage*10) -10)){
			document.getElementById("image").setAttribute("src", "image/jayz_high.png");
		}
		else if(sum >=((stage*10) -60)){
			document.getElementById("image").setAttribute("src", "image/jayz_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/jayz_low.png");
		}
		break;

	case 5:
		if(sum >= ((stage*10) -10)){
			document.getElementById("image").setAttribute("src", "image/neo_high.png");
		}
		else if(sum >=((stage*10) -60)){
			document.getElementById("image").setAttribute("src", "image/neo_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/neo_low.png");
		}
		break;

	case 6:
		if(sum >= ((stage*10) -10)){
			document.getElementById("image").setAttribute("src", "image/tube_high.png");
		}
		else if(sum >=((stage*10) -60)){
			document.getElementById("image").setAttribute("src", "image/tube_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/tube_low.png");
		}
		break;

	default:
		break;
	}

	if(stage<10){
		handleRefresh();
	}

	if(stage==10){//한 스테이지를 다 끝냈고, 점수를 보여준다.
		alert(document.getElementById("nickname").value+"님! 100점 만점에 "+sum+"점 입니다!");
		inputAnswer = null;
		comAnswer = null;
		comAnswer2 = null;
		stage=0;
		sum=0;
		quizDiv.innerHTML="";
	};
}

function updateQuiz(lotQuiz) {
	var quizDiv = document.getElementById("lotQuiz");
	lotQuiz = lotQuiz.KoreanAnswerInfo.row;
	quizDiv.innerHTML="";
	var bogi=0;

	var i=-1;

	do {
		i = (Math.floor(Math.random() * 1000));
		console.log(i);
	}while (i%4!=0);
	console.log(i);

	var quiz = lotQuiz[i];
	bogi=quiz.A_SEQ%4;
	var div = document.createElement("div");		
	div.setAttribute("class", "quiz");

	if(bogi==0){
		bogi=4;
	}

	//정답 번호 추출 (0~3)
	for (var k=i; k<i+4; k++) {
		if (lotQuiz[k].A_CORRECT != "") {
			comAnswer = (lotQuiz[k].A_SEQ)%4;
		}
	}

	if(stage!=10){
		stage++;
		document.getElementById("numText").value=stage+"/10";
	}

	//출력
	div.innerHTML ="출제일자:"+quiz.Q_OPEN+"<br><br>"+quiz.Q_SEQ+"번 문제 : "+quiz.Q_NAME+"<br><br>"
	+""+
	"<input type=\"radio\" name=\"bogi_radio\" id=\"bogi\" />"+"<label id=\"bogi_l\" for=\"bogi\" onmouseover=\"mouseOverText(\"bogi_l\")\" onmouseout=\"mouseOutText(\"bogi_l\")\" >"+bogi+") "+quiz.A_NAME+"</label><br>"+
	"<input type=\"radio\" name=\"bogi_radio\" id=\"bogi1\"/>"+"<label id=\"bogi1_l\" for=\"bogi1\" onmouseover=\"mouseOverText(\"bogi1_l\")\" onmouseout=\"mouseOutText(\"bogi1_l\")\">"+(bogi+1)+") "+lotQuiz[i+1].A_NAME+"</label><br>"+
	"<input type=\"radio\" name=\"bogi_radio\" id=\"bogi2\"/>"+"<label id=\"bogi2_l\" for=\"bogi2\" onmouseover=\"mouseOverText(\"bogi2_l\")\" onmouseout=\"mouseOutText(\"bogi2_l\")\">"+(bogi+2)+") "+lotQuiz[i+2].A_NAME+"</label><br>"+
	"<input type=\"radio\" name=\"bogi_radio\" id=\"bogi3\"/>"+"<label id=\"bogi3_l\" for=\"bogi3\" onmouseover=\"mouseOverText(\"bogi3_l\")\" onmouseout=\"mouseOutText(\"bogi3_l\")\">"+(bogi+3)+") "+lotQuiz[i+3].A_NAME+"</label>";
	if (quizDiv.childElementCount == 0) {
		quizDiv.appendChild(div);
	}
	else {
		quizDiv.insertBefore(div, quizDiv.firstChild);
	}


}

if (lotQuiz.length > 0) {
	lastReportTime = lotQuiz[lotQuiz.length-1].time;
}

function handleRefresh() {

	 var url = "http://openapi.seoul.go.kr:8088/인증키/json/KoreanAnswerInfo/1001/2000/";
	//	+"?callback=updateQuiz";
	$.getJSON(url, updateQuiz);




	$.getJSON(url, updateQuiz);	
	var newScriptElement = document.createElement("script");
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

function hidden() {
	document.getElementById("myP").style.visibility = "hidden";
}

function settings(){
	if(setClickAgain==0){
		var setDiv = document.getElementById("set");
		var img1 = document.createElement("img");
		img1.setAttribute("id", "muzi");
		img1.setAttribute("src", "image/muzi_midium.png");
		img1.setAttribute("width", "170");
		img1.setAttribute("height", "170");
		img1.setAttribute("onmouseover", "mouseOver(\"muzi\")");
		img1.setAttribute("onmouseout", "mouseOut(\"muzi\")");
		img1.setAttribute("onclick", "changeImg(\"muzi\")");

		var img2 = document.createElement("img");
		img2.setAttribute("id", "apeach");
		img2.setAttribute("src", "image/apeach_midium.png");
		img2.setAttribute("width", "170");
		img2.setAttribute("height", "170");
		img2.setAttribute("onmouseover", "mouseOver(\"apeach\")");
		img2.setAttribute("onmouseout", "mouseOut(\"apeach\")");
		img2.setAttribute("onclick", "changeImg(\"apeach\")");

		var img3 = document.createElement("img");
		img3.setAttribute("id", "frodo");
		img3.setAttribute("src", "image/frodo_midium.png");
		img3.setAttribute("width", "170");
		img3.setAttribute("height", "170");
		img3.setAttribute("onmouseover", "mouseOver(\"frodo\")");
		img3.setAttribute("onmouseout", "mouseOut(\"frodo\")");
		img3.setAttribute("onclick", "changeImg(\"frodo\")");

		var img4 = document.createElement("img");
		img4.setAttribute("id", "jayz");
		img4.setAttribute("src", "image/jayz_midium.png");
		img4.setAttribute("width", "170");
		img4.setAttribute("height", "170");
		img4.setAttribute("onmouseover", "mouseOver(\"jayz\")");
		img4.setAttribute("onmouseout", "mouseOut(\"jayz\")");
		img4.setAttribute("onclick", "changeImg(\"jayz\")");

		var img5 = document.createElement("img");
		img5.setAttribute("id", "neo");
		img5.setAttribute("src", "image/neo_midium.png");
		img5.setAttribute("width", "170");
		img5.setAttribute("height", "170");
		img5.setAttribute("onmouseover", "mouseOver(\"neo\")");
		img5.setAttribute("onmouseout", "mouseOut(\"neo\")");
		img5.setAttribute("onclick", "changeImg(\"neo\")");

		var img6 = document.createElement("img");
		img6.setAttribute("id", "tube");
		img6.setAttribute("src", "image/tube_midium.png");
		img6.setAttribute("width", "170");
		img6.setAttribute("height", "170");
		img6.setAttribute("onmouseover", "mouseOver(\"tube\")");
		img6.setAttribute("onmouseout", "mouseOut(\"tube\")");
		img6.setAttribute("onclick", "changeImg(\"tube\")");

		if (setDiv.childElementCount == 0) {
			setDiv.appendChild(img1);
		}
		else {
			setDiv.insertBefore(img1, setDiv.firstChild);
		}
		if (setDiv.childElementCount == 0) {
			setDiv.appendChild(img2);
		}
		else {
			setDiv.insertBefore(img2, setDiv.firstChild);
		}
		if (setDiv.childElementCount == 0) {
			setDiv.appendChild(img3);
		}
		else {
			setDiv.insertBefore(img3, setDiv.firstChild);
		}
		if (setDiv.childElementCount == 0) {
			setDiv.appendChild(img4);
		}
		else {
			setDiv.insertBefore(img4, setDiv.firstChild);
		}
		if (setDiv.childElementCount == 0) {
			setDiv.appendChild(img5);
		}
		else {
			setDiv.insertBefore(img5, setDiv.firstChild);
		}
		if (setDiv.childElementCount == 0) {
			setDiv.appendChild(img6);
		}
		else {
			setDiv.insertBefore(img6, setDiv.firstChild);
		}
		setClickAgain++;
	}//if
	else{
		//setDiv.innerHTML="";
		while(setDiv.firstChild) {
			setDiv.removeChild(setDiv.firstChild);
		}
		setClickAgain=0;
	}
}

function mouseOver(s) {
	document.getElementById(s).style.opacity=0.5;
}

function mouseOut(s) {
	document.getElementById(s).style.opacity=1;
}

function changeImg(s) {
	var imgAdd = document.getElementById("image").getAttribute("src");
	/*
	imgAdd.replace('muzi', s);
	imgAdd.replace('apeach', s);
	imgAdd.replace('frodo', s);
	imgAdd.replace('jayz', s);
	imgAdd.replace('neo', s);
	imgAdd.replace('tube', s);

	document.getElementById("image").setAttribute("src", imgAdd);*/

	/*if(imgAdd.match("muzi")){
		chVer=1;
	}else if(imgAdd.match("apeach")){
		chVer=2;
	}else if(imgAdd.match("frodo")){
		chVer=3;
	}else if(imgAdd.match("jayz")){
		chVer=4;
	}else if(imgAdd.match("neo")){
		chVer=5;
	}else if(imgAdd.match("tube")){
		chVer=6;
	}*/

	if(s.match("muzi")){
		chVer=1;
	}else if(s.match("apeach")){
		chVer=2;
	}else if(s.match("frodo")){
		chVer=3;
	}else if(s.match("jayz")){
		chVer=4;
	}else if(s.match("neo")){
		chVer=5;
	}else if(s.match("tube")){
		chVer=6;
	}

	/*switch (chVer) {
	case 1:
		imgAdd.replace('muzi', s);
		document.getElementById("image").setAttribute("src", imgAdd);
		break;
	case 2:
		imgAdd.replace('apeach', s);
		document.getElementById("image").setAttribute("src", imgAdd);
		break;
	case 3:
		imgAdd.replace('frodo', s);
		document.getElementById("image").setAttribute("src", imgAdd);
		break;
	case 4:
		imgAdd.replace('jayz', s);
		document.getElementById("image").setAttribute("src", imgAdd);
		break;
	case 5:
		imgAdd.replace('neo', s);
		document.getElementById("image").setAttribute("src", imgAdd);
		break;
	case 6:
		imgAdd.replace('tube', s);
		document.getElementById("image").setAttribute("src", imgAdd);
		break;
	default:
		break;

	}*/

	switch (chVer) {
	case 1:
		if(imgAdd.match("high")){
			document.getElementById("image").setAttribute("src", "image/muzi_high.png");
		}
		else if(imgAdd.match("midium")){
			document.getElementById("image").setAttribute("src", "image/muzi_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/muzi_low.png");
		}
		document.getElementById("lotQuiz").style.backgroundColor="#ffff66";
		break;
	case 2:
		if(imgAdd.match("high")){
			document.getElementById("image").setAttribute("src", "image/apeach_high.png");
		}
		else if(imgAdd.match("midium")){
			document.getElementById("image").setAttribute("src", "image/apeach_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/apeach_low.png");
		}
		document.getElementById("lotQuiz").style.backgroundColor="#ffd1d1";
		break;
	case 3:
		if(imgAdd.match("high")){
			document.getElementById("image").setAttribute("src", "image/frodo_high.png");
		}
		else if(imgAdd.match("midium")){
			document.getElementById("image").setAttribute("src", "image/frodo_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/frodo_low.png");
		}
		document.getElementById("lotQuiz").style.backgroundColor="#efb146";
		break;
	case 4:
		if(imgAdd.match("high")){
			document.getElementById("image").setAttribute("src", "image/jayz_high.png");
		}
		else if(imgAdd.match("midium")){
			document.getElementById("image").setAttribute("src", "image/jayz_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/jayz_low.png");
		}
		document.getElementById("lotQuiz").style.backgroundColor="#d2c99a";
		break;
	case 5:
		if(imgAdd.match("high")){
			document.getElementById("image").setAttribute("src", "image/neo_high.png");
		}
		else if(imgAdd.match("midium")){
			document.getElementById("image").setAttribute("src", "image/neo_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/neo_low.png");
		}
		document.getElementById("lotQuiz").style.backgroundColor="#a8b3d4";
		break;
	case 6:
		if(imgAdd.match("high")){
			document.getElementById("image").setAttribute("src", "image/tube_high.png");
		}
		else if(imgAdd.match("midium")){
			document.getElementById("image").setAttribute("src", "image/tube_midium.png");
		}
		else{
			document.getElementById("image").setAttribute("src", "image/tube_low.png");
		}
		document.getElementById("lotQuiz").style.backgroundColor="#fdfdf3";
		break;
	default:
		break;
	}
}

function mouseOverText(s){
	document.getElementById(s).style.color = "blue";
}

function mouseOutText(s) {
	document.getElementById(s).style.color = "black";
}

function delay(gap){
	var then,now;
	then = new Date().getTime();
	now=then;
	while((now-then)<gap){
		now=new Date().getTime();
	}
}

function goFirst(){
	inputAnswer = null;
	comAnswer = null;
	comAnswer2 = null;
	stage=0;
	sum=0;
	saveSomething="";
	chVer=1;
	setClickAgain=0;


	var nickname=prompt("닉네임을 입력해주세요 : ", "닉네임");
	document.getElementById("nickname").value=nickname;
	handleRefresh();
	handleRefresh2();


}

/*
function playPause(){
	if(KoreanVideo.paused)
		KoreanVideo.play();
	else
		KoreanVideo.pause();
}*/