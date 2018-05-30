window.onload = function() {
    var interval = setInterval(handleRefresh, 3000);
    handleRefresh();
}
function handleRefresh() {
	console.log("here");
	var url = "http://openapi.seoul.go.kr:8088/534c426f7778716e32367341617971/json/"+
	"GwanakClassLectureList/1/30/";
	$.getJSON(url, updatelecture);
}	


function updatelecture(lectures) {
	var lecturesDiv = document.getElementById("lectures");
	lectures = lectures.GwanakClassLectureList.row;

	
	for (var i = 0; i < lectures.length; i++) {
		var lecture = lectures[i];
		var div = document.createElement("div");
		div.setAttribute("class", "lecture");
/*		1   TITLE	강좌명
		2	EDU_PERIOD	교육기간
		3	EDU_PLACE	교육장소
		4	EDU_TARGET	교육대상
		5	APPLY_WAY	접수방법
		6	EDU_PAY	수강료
		7	APPLY_PERIOD	접수기간*/
		
		//추가2
		div.innerHTML = "강좌명:" +lecture.TITLE + "은 " +" 교육기간:"+lecture.EDU_PERIOD + " " +" 교육장소:"+lecture.EDU_PLACE + " " +" 교육대상:"+lecture.EDU_TARGET + " " +" 접수방법:"+lecture.APPLY_WAY + " " +" 수강료:"+lecture.EDU_PAY + "원입니다 ";
		
		if (lecturesDiv.childElementCount == 0) {
			lecturesDiv.appendChild(div);
		}
		else {
			lecturesDiv.insertBefore(div, lecturesDiv.firstChild);
		}
	}

}

