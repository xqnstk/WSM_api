/* playlist.js */

window.onload = init;
//페이지가 완전히 로드된 후 호출되어 실행, 실행되지 않도록 init함수를 사용함

function init() {
	//"노래추가" 버튼에 접근하기
	var button = document.getElementById("addButton");
	button.onclick = handleButtonClick;
	
	var button2 = document.getElementById("removeButton");
	button2.onclick = handleButtonClick1;
	//버튼에 클릭 핸들러 부여하기
	loadPlaylist();
}

function removeAll(){
	if(confirm('모두 지울까요?')){
		localStorage.clear();
	}
}

function handleButtonClick1(e) {
	removeAll();
}

function handleButtonClick(e) {
	var textInput = document.getElementById("songTextInput");
	var songName = textInput.value;
	//alert("Adding " + songName);

	//추가1
	if(songName==""){
		alert("곡을 입력하세요.");
	}
	else{
		//alert("Adding " + songName);
		var li = document.createElement("li");
		//노래 제목에 들어갈 새 <li>요소를 만듭니다.
		li.innerHTML = songName;
		var ul = document.getElementById("playlist");
		//id가 playlist인 ul이 새로 만든 <li>의 부모 요소입니다.
		ul.appendChild(li); //dom에 추가
		save(songName);
	}
}


