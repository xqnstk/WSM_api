var map;//map 전역변수 선언.
var gus="";//gus 전역변수 선언
var marker;
var mapContainer;
var lat, lon;
window.onload = function () {//처음 실행시 handRefresh함수 실행
	
	mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new daum.maps.LatLng(37.5835755,127.0505528), // 지도의 중심좌표
        level: 8 // 지도의 확대 레벨 
    }; 

	map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	find();
	
};

function find(){//find 버튼을 눌렀을 때(onClick)
	gus = Math.floor((Math.random() * 14) + 1);
	switch(gus){//선택된 인덱스 번호

	case 0: //강북구 
		lat=37.6482131;
		lon=127.0164069;
		break;
	case 1: //광진구 
		lat=37.5388;
		lon=127.083445;
		break;
	case 2: //노원구  
		lat=37.6541956;
		lon=127.0769692;
		break;
	case 3: //도봉구  
		lat=37.6662325;
		lon=127.0298724;
		break;
	case 4: //동대문구  
		lat=37.5835755;
		lon=127.0505528;
		break;
	case 5: //마포구  
		lat=37.5615964;
		lon=126.9086431;
		break;
	case 6: //서대문구  
		lat=37.583312;
		lon=126.9356601;
		break;
	case 7: //성동구  
		lat=37.5508768;
		lon=127.0408952;
		break;
	case 8: //성북구  
		lat=37.6023295;
		lon=127.025236;
		break;
	case 9: //양천구 
		lat=37.527432;
		lon=126.8558783;
		break;
	case 10: //용산구 
		lat=37.5305208;
		lon=126.9809672;
		break;
	case 11: //은평구 
		lat=37.6175107;
		lon=126.9249166;
		break;
	case 12: //종로구 
		lat=37.6009106;
		lon=126.9835817;
		break;
	case 13: //중구 
		lat=37.5576747;
		lon=126.9941653;
		break;
	case 14: //중랑구 
		lat=37.5950497;
		lon=127.0957062;
		break;
		
	}//switch

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
    
    mapOption = { 
        center: new daum.maps.LatLng(lat, lon), // 지도의 중심좌표
        level: 8 // 지도의 확대 레벨 
    }; 

	map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	daum.maps.event.addListener(map, 'dragend', function() {
		handleRefresh();//지도의 중심이 이동될때도 마커를 다시 표시
	});
	handleRefresh();
	
}//find



function handleRefresh() {
	var url="http://openapi.seoul.go.kr:8088/4a6a63497978716e36365544455967/json/octastatapi419/"+gus+"/"+gus;
	var url2="http://openapi.seoul.go.kr:8088/4c4b71576578716e363065654a414b/json/octastatapi10164/"+gus+"/"+gus;
	var url3="http://openapi.seoul.go.kr:8088/796144645878716e3530664c4d5563/json/octastatapi10057/"+gus+"/"+gus;
	var url4="http://openapi.seoul.go.kr:8088/794673545878716e3637635a516868/json/octastatapi37/"+gus+"/"+gus;

	$.getJSON(url, updateLibrary);
	$.getJSON(url2, draw);
	$.getJSON(url3, trafficAcc);
	$.getJSON(url4, diseaseAcc);
	
	//리스트 부분
    var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src", url);
	var SCElement = document.createElement("script");
	SCElement.setAttribute("src", url2);
	var Element = document.createElement("script");
	Element.setAttribute("src", url3);
	var element = document.createElement("script");
	element.setAttribute("src", url4);
	
	/*jsonp를 사용하여 스크립트 정보를 갱신*/
	newScriptElement.setAttribute("id", "jsonp");
	SCElement.setAttribute("id", "jsonp");
	Element.setAttribute("id", "jsonp");
	element.setAttribute("id", "jsonp");

	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];

	if(oldScriptElement == null){
		head.appendChild(newScriptElement);
		head.appendChild(SCElement);
		head.appendChild(Element);
		head.appendChild(element);
	}
	else{
		head.replaceChild(newScriptElement, oldScriptElement);
		head.replaceChild(SCElement, oldScriptElement);
		head.replaceChild(Element, oldScriptElement);
		head.replaceChild(element, oldScriptElement);
	}

}//handleRefresh

function updateLibrary(librarys) {
   var librarys = librarys.octastatapi419.row;
   var addr = "";
   var center = map.getCenter(); // 중심 가져오기 
   var position = {
          latitude : center.getLat(),
		  longitude: center.getLng()
      };
   
   for (var i = 0; i < librarys.length; i++) {
      var lib = librarys[i];
      var imageSrc = "marker1.png",
		imageSize = new daum.maps.Size(27, 40), //마커의 크기(daummap에서 size 검색, 크기정보를 가지고 있는 사이즈 객체 생성)
		imageOption = {offset: new daum.maps.Point(14, 28)};//point 검색, 화면 좌표 정보를 담고 있는 포인터 객체 생성
	  
      var loc = {//open API의 값들 위도와 경도
            latitude : lib.XCNTS,
			longitude: lib.YDNTS
      };
   }
   
   //밑에 리스트 추가하는 부분
   var librarysDiv = document.getElementById("librarys");
	librarysDiv.innerHTML="";
	
	for(var i=0; i<librarys.length; i++){
		var lib = librarys[i];
		var div = document.createElement("div");
		div.setAttribute("class", "librarys");
		var aaa;
		if(gus == 2)	aaa= 2;
		else if(gus == 3) 	aaa=3;
		else if(gus == 4) 	aaa=4;
		else if(gus == 5) 	aaa=5;
		else if(gus == 6) 	aaa=6;
		else if(gus == 7) 	aaa=7;
		else if(gus == 8) 	aaa=8;
		else if(gus == 9) 	aaa=9;
		else if(gus == 10) 	aaa=10;
		else if(gus == 11) 	aaa=11;
		else if(gus == 12) 	aaa=12;
		else if(gus == 13) 	aaa=13;
		else if(gus == 14) 	aaa=14;
		else if(gus == 15) 	aaa=15;
		else if(gus == 16) 	aaa=16;
		
		
		if (aaa == gus) {
			div.innerHTML = "------------------------인구밀도--------------------------";
			div.innerHTML += "<input type=button value=구글맵으로" + " onclick=\"window.open('http://www.google.co.kr/maps/search/" + lib.JACHIGU + " ')\"/>"; 

			if (lib.GYE_2 != "") {
				div.innerHTML += "<br>" + "한국인 거주자 : " + lib.GYE_2 + "명";
			}
			
			if (lib.GYE_3 != "") {
				div.innerHTML += "<br>" + "외국인 거주자 : " + lib.GYE_3 + "명";
			}
			div.innerHTML += "<br>" + parseInt(lib.GYE_2)/(parseInt(lib.GYE_2)+parseInt(lib.GYE_3))*100 + "% : " +parseInt(lib.GYE_3)/(parseInt(lib.GYE_2)+parseInt(lib.GYE_3))*100 + "%";

			if(librarysDiv.childElementCount==0){
				librarysDiv.appendChild(div);
			}
			else{
				librarysDiv.insertBefore(div, librarysDiv.firstChild);
			}
		} //if
	}//for
	if(librarys.length > 0){
		lastReportTime = librarys[librarys.length-1].time;
	}
}//handleRefresh()


function draw(cfires) {
	   var cfires = cfires.octastatapi10164.row;
	   var addr = "";
	   var center = map.getCenter(); // 중심 가져오기 
	   var position = {
	          latitude : center.getLat(),
			  longitude: center.getLng()
	      };
	   var average;
	   
	   for (var i = 0; i < cfires.length; i++) {
	      var lib = cfires[i];
	      var imageSrc = "marker1.png",
			imageSize = new daum.maps.Size(27, 40), //마커의 크기(daummap에서 size 검색, 크기정보를 가지고 있는 사이즈 객체 생성)
			imageOption = {offset: new daum.maps.Point(14, 28)};//point 검색, 화면 좌표 정보를 담고 있는 포인터 객체 생성
		  
	      var loc = {//open API의 값들 위도와 경도
	            latitude : lib.XCNTS,
				longitude: lib.YDNTS
	      }; 
	   	}
	   
	   //밑에 리스트 추가하는 부분
	   	var cfiresDiv = document.getElementById("fires");
		cfiresDiv.innerHTML="";
		
		for(var i=0; i<cfires.length; i++){
			var lib = cfires[i];
			var div = document.createElement("div");
			div.setAttribute("class", "cfires");
			var aaa;
			if(gus == 2)	aaa= 2;
			else if(gus == 3) 	aaa=3;
			else if(gus == 4) 	aaa=4;
			else if(gus == 5) 	aaa=5;
			else if(gus == 6) 	aaa=6;
			else if(gus == 7) 	aaa=7;
			else if(gus == 8) 	aaa=8;
			else if(gus == 9) 	aaa=9;
			else if(gus == 10) 	aaa=10;
			else if(gus == 11) 	aaa=11;
			else if(gus == 12) 	aaa=12;
			else if(gus == 13) 	aaa=13;
			else if(gus == 14) 	aaa=14;
			else if(gus == 15) 	aaa=15;
			else if(gus == 16) 	aaa=16;		
			
			if (aaa == gus) {
				div.innerHTML = "------------------------화재사건--------------------------";
				average = lib.JAESANPIHAEGYEONGGAMAEK/lib.HAPGYE_1;
				
				if (lib.GYE_1 != "") {
					div.innerHTML += "<br>" + "화재 사건 수 : " + lib.HAPGYE_1 +"회";
				}
				if (lib.GYE_3 != "") {
					div.innerHTML += "<br>" + "인명피해 : " + lib.HAPGYE_3 + "명";
				}
				if (lib.JAESANPIHAEGYEONGGAMAEK != "") {
					div.innerHTML += "<br>" + "재산피해 경감액 : " + lib.JAESANPIHAEGYEONGGAMAEK + "원"+ "<br> 평균 경감액 : " + average + "원";
				}

				if(cfiresDiv.childElementCount==0){
					cfiresDiv.appendChild(div);
				}
				else{
					cfiresDiv.insertBefore(div, cfiresDiv.firstChild);
				}
			} //if
			
		}//for

		if(cfires.length > 0){
			lastReportTime = cfires[cfires.length-1].time;
		}
}//draw()

function trafficAcc(ctraffic) {
	   var ctraffic = ctraffic.octastatapi10057.row;
	   var addr = "";
	   var center = map.getCenter(); // 중심 가져오기 
	   var position = {
	          latitude : center.getLat(),
			  longitude: center.getLng()
	      };
	   
	   for (var i = 0; i < ctraffic.length; i++) {
	      var lib = ctraffic[i];
	      var imageSrc = "marker1.png",
			imageSize = new daum.maps.Size(27, 40), //마커의 크기(daummap에서 size 검색, 크기정보를 가지고 있는 사이즈 객체 생성)
			imageOption = {offset: new daum.maps.Point(14, 28)};//point 검색, 화면 좌표 정보를 담고 있는 포인터 객체 생성
		  
	      var loc = {//open API의 값들 위도와 경도
	            latitude : lib.XCNTS,
				longitude: lib.YDNTS
	      }; 
	   	}
	   
	   //밑에 리스트 추가하는 부분
	   	var ctrafficDiv = document.getElementById("traffic");
		ctrafficDiv.innerHTML="";
		
		for(var i=0; i<ctraffic.length; i++){
			var lib = ctraffic[i];
			var div = document.createElement("div");
			div.setAttribute("class", "ctraffic");
			var aaa;
			if(gus == 2)	aaa= 2;
			else if(gus == 3) 	aaa=3;
			else if(gus == 4) 	aaa=4;
			else if(gus == 5) 	aaa=5;
			else if(gus == 6) 	aaa=6;
			else if(gus == 7) 	aaa=7;
			else if(gus == 8) 	aaa=8;
			else if(gus == 9) 	aaa=9;
			else if(gus == 10) 	aaa=10;
			else if(gus == 11) 	aaa=11;
			else if(gus == 12) 	aaa=12;
			else if(gus == 13) 	aaa=13;
			else if(gus == 14) 	aaa=14;
			else if(gus == 15) 	aaa=15;
			else if(gus == 16) 	aaa=16;		
			
			if (aaa == gus) {
				div.innerHTML = "------------------------교통사고---------------------------";
				if (lib.BALSAENGGEONSU != "") {
					div.innerHTML += "<br>" + "발생건수 : " + lib.BALSAENGGEONSU +"회";
					if(lib.BALSAENGGEONSU>1300) alert("교통사고 다발지역입니다.");
					else alert("교통사고에 안전한 지역입니다.");
				}
				if (lib.SAMANGJASU != "") {
					div.innerHTML += "<br>" + "사망자수 : " + lib.SAMANGJASU + "명";
				}
				if (lib.BUSANGJASU != "") {
					div.innerHTML += "<br>" + "부상자수 : " + lib.BUSANGJASU + "명";
				}
				if(ctrafficDiv.childElementCount==0){
					ctrafficDiv.appendChild(div);
				}
				else{
					ctrafficDiv.insertBefore(div, ctrafficDiv.firstChild);
				}
			} //if
			
		}//for

		if(ctraffic.length > 0){
			lastReportTime = ctraffic[ctraffic.length-1].time;
		}
}//trafficAcc()


function diseaseAcc(cdisease) {
	   var cdisease = cdisease.octastatapi37.row;
	   var addr = "";
	   var center = map.getCenter(); // 중심 가져오기 
	   var position = {
	          latitude : center.getLat(),
			  longitude: center.getLng()
	      };
	   
	   for (var i = 0; i < cdisease.length; i++) {
	      var lib = cdisease[i];
	      var imageSrc = "marker1.png",
			imageSize = new daum.maps.Size(27, 40), //마커의 크기(daummap에서 size 검색, 크기정보를 가지고 있는 사이즈 객체 생성)
			imageOption = {offset: new daum.maps.Point(14, 28)};//point 검색, 화면 좌표 정보를 담고 있는 포인터 객체 생성
		  
	      var loc = {//open API의 값들 위도와 경도
	            latitude : lib.XCNTS,
				longitude: lib.YDNTS
	      }; 
	   	}
	   
	   //밑에 리스트 추가하는 부분
	   	var cdiseaseDiv = document.getElementById("disease");
		cdiseaseDiv.innerHTML="";
		
		for(var i=0; i<cdisease.length; i++){
			var lib = cdisease[i];
			var div = document.createElement("div");
			div.setAttribute("class", "cdisease");
			var aaa;
		
			if (gus == 2) aaa=2;
			else if(gus == 3) 	aaa=3;
			else if(gus == 4) 	aaa=4;
			else if(gus == 5) 	aaa=5;
			else if(gus == 6) 	aaa=6;
			else if(gus == 7) 	aaa=7;
			else if(gus == 8) 	aaa=8;
			else if(gus == 9) 	aaa=9;
			else if(gus == 10) 	aaa=10;
			else if(gus == 11) 	aaa=11;
			else if(gus == 12) 	aaa=12;
			else if(gus == 13) 	aaa=13;
			else if(gus == 14) 	aaa=14;
			else if(gus == 15) 	aaa=15;
			else if(gus == 16) 	aaa=16;		
			
			if (aaa == gus) {
				div.innerHTML = "------------------------전염병--------------------------";
				if (lib.BALSAENG_1 != "") {
					div.innerHTML += "<br>" + "1군감염병(장티푸스, A형 감염) : " + lib.BALSAENG_1 +"명";
				}
				if (lib.BALSAENG_7 != "") {
					div.innerHTML += "<br>" + "2군감염병(수두, B형 감염) : " + lib.BALSAENG_7 + "명";
				}
				if (lib.BALSAENG_16 != "") {
					div.innerHTML += "<br>" + "3군감염병(결핵, 쯔쯔가무시증, 말라리아) : " + lib.BALSAENG_16 + "명";
				}
				if(cdiseaseDiv.childElementCount==0){
					cdiseaseDiv.appendChild(div);	
				}
				else{
					cdiseaseDiv.insertBefore(div, cdiseaseDiv.firstChild);
				}
			} //if
		}//for

		if(cdisease.length > 0){
			lastReportTime = cdisease[cdisease.length-1].time;
		}
}//diseaseAcc()






