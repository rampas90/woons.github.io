d3.json("data.json", function(error, data) {


	//======================== svg 사이즈 & 반응형 
	var windowSize = document.documentElement.clientHeight; 

	var windowW = windowSize*0.8; 

	// 중심좌표 & 반지름 
	var circleX = (windowW/2);
	var circleY = (windowW/2);
	var radiusS = (windowW/6);
	var radiusM = (windowW/6)*2;
	var radiusL = (windowW/6)*3-30;

	var node_radius = 6;
	padding = 3,
	cluster_padding =  4,	
	num_nodes = 345;

	go();

	window.addEventListener('resize', go);

	function go(){
  		var windowSizeM = document.documentElement.clientWidth; 

		if (windowSizeM < 640) {
			

			windowW = (windowSizeM/10)*9; 

			circleX = (windowW/2);
			circleY = (windowW/2);
			radiusS = (windowW/10)*2;
			radiusM = (windowW/10)*3.5;
			radiusL = (windowW/10)*4.5;

			node_radius = 2;
			padding = 2;
			cluster_padding = 2;
		}
	}

	//======================== 체크 연동 
	var vm = new Vue({
		el : '#canvas',
		data: {
			whois: false,
			name: '원을 클릭하세요',
			hometown: '출신 지역',
			highschool: '출신 고등학교',
			university: '출신 대학교',
			checklist: [
				{ "name":"지역", "code": "hometown" },
				{ "name":"출신 고등학교", "code": "high" },
				{ "name":"출신 대학교", "code": "univ" }
			],
			checkReturn: [
			]
		}, 
		watch: {
			checkReturn: function() {
				vm.whois = false;
				var check = vm.checkReturn;


				if(check.indexOf("hometown") != -1) {
					 
					if (check.indexOf("high") != -1 && check.indexOf("univ") != -1) {
						// 지역 + 출신고등학교 + 출신대학 
				

						selectValue = 19;
						selectA = 10; //(10/2)
						selectB = 9.5; //(19/2)

						foci = fociRHU;
						options = 'RHU';
						networkB();

					} else if (check.indexOf("high") != -1 && check.indexOf("univ")  == -1) {
						// 지역 + 출신고등학교 
						
						selectValue = 30;
						selectA = 7; //(14/2)
		
						foci = fociRH;
						options = 'RH';
						networkB(); 
					} else if (check.indexOf("high") == -1 && check.indexOf("univ")  != -1) {
						// 지역 + 출신대학 
						

						selectValue = 20;
						selectA = 7;  


						foci = fociRU;
						options = 'RU';
						networkB();
					} else {
						//지역만 
						
						foci = Reg;
						networkReg();
					} 
				} else {
					if (check.indexOf("high") != -1 && check.indexOf("univ") != -1) {
						// 출신고등학교 + 출신대학 
						

						selectValue = 21;
						selectA = 8;  

						foci = fociHU;
						options = 'HU';

						networkB();
					}  else if (check.indexOf("high") != -1 && check.indexOf("univ")  == -1) {
						// 출신고등학교 
						

						selectValue = 17;
						selectA = 7; //(14/2)
		
						foci = High;
						options = 'high';
						networkB(); 


					} else if (check.indexOf("high") == -1 && check.indexOf("univ")  != -1) {
						// 출신대학 
					
 						selectValue = 11;
						selectA = 7;  

						foci = Univ;
						options = 'Univ';

 						networkUniv(); 
					}
				}
			}
		}
	});

	//======================== 데이터 
	var Reg = {
		"Reg001": { x: 600, y: 600, color: "#78E299", kor: "PK"},
		"Reg010": { x: 600, y: 600, color: "#78E299", kor: "호남"},
		"Reg002": { x: 600, y: 600, color: "#78E299", kor: "TK"},
		"Reg005": { x: 600, y: 600, color: "#78E299", kor: "서울"},
		"Reg009": { x: 600, y: 600, color: "#78E299", kor: "충청"},
		"Reg004": { x: 600, y: 600, color: "#78E299", kor: "경기"},
		"Reg006": { x: 600, y: 600, color: "#78E299", kor: "이북"},
		"Reg003": { x: 600, y: 600, color: "#78E299", kor: "강원"},
		"Reg007": { x: 600, y: 600, color: "#78E299", kor: "인천"},
		"Reg008": { x: 600, y: 600, color: "#78E299", kor: "제주"} 
	}; // Reg 끝(10) : 전체 

	var High = {
		"High001": { x: 600, y: 600, color: "#78E299", kor: "경기고"},
		"etc":  { x: 1300, y: 900, color: "#cccccc" , kor: "기타" }, 
		"High002": { x: 600, y: 600, color: "#78E299", kor: "경북고"},
		"High003": { x: 600, y: 600, color: "#78E299", kor: "고교 정보 없음"},
		"High004": { x: 600, y: 600, color: "#78E299", kor: "부산고"},
		"High005": { x: 600, y: 600, color: "#78E299", kor: "전주고"},
		"High006": { x: 600, y: 600, color: "#78E299", kor: "광주제일고"},
		"High007": { x: 600, y: 600, color: "#78E299", kor: "서울고"},
		"High008": { x: 600, y: 600, color: "#78E299", kor: "대전고"},
		"High009": { x: 600, y: 600, color: "#78E299", kor: "경남고"},
		"High010": { x: 600, y: 600, color: "#78E299", kor: "경복고"},
		"High011": { x: 600, y: 600, color: "#78E299", kor: "광주고"},
		"High012": { x: 600, y: 600, color: "#78E299", kor: "진주고"},
		"High013": { x: 600, y: 600, color: "#78E299", kor: "청주고"},
		"High014": { x: 600, y: 600, color: "#78E299", kor: "대구고"},
		"High015": { x: 600, y: 600, color: "#78E299", kor: "경동고"},
		"High016": { x: 600, y: 600, color: "#78E299", kor: "목포고"}

	}; // high 끝(17) : 5이상 

	var Univ = {
		"Univ001": { x: 600, y: 600, color: "#78E299", kor: "서울대"}, 
		"etc":  { x: 1300, y: 900, color: "#cccccc" , kor:"기타" }, 
		"Univ002": { x: 600, y: 600, color: "#78E299", kor: "고려대"},
		"Univ003": { x: 600, y: 600, color: "#78E299", kor: "성균관대"},
		"Univ004": { x: 600, y: 600, color: "#78E299", kor: "연세대"},
		"Univ005": { x: 600, y: 600, color: "#78E299", kor: "한양대"},
		"Univ006": { x: 600, y: 600, color: "#78E299", kor: "한양대"},
		"Univ007": { x: 600, y: 600, color: "#78E299", kor: "한양대"},
		"Univ008": { x: 600, y: 600, color: "#78E299", kor: "한양대"},
		"Univ009": { x: 600, y: 600, color: "#78E299", kor: "한양대"},
		"Univ010": { x: 600, y: 600, color: "#78E299", kor: "한양대"}
	}; // univ 끝(11) : 4 이상 

	var fociRH= {
		"Reg002_High002": { x: 600, y: 600, color: "#91e9ff", kor: "TK, 경북고"},
		"etc":  { x: 1300, y: 900, color: "#cccccc" , kor:"기타" }, 
		"Reg005_High001": { x:  10, y: 10, color: "#5CD9A7", kor:"서울, 경기고" }, 
		"Reg001_High004": { x:  10, y: 10, color: "#46CFB3", kor:"PK, 부산고" }, 
		"Reg010_High005": { x: 10, y: 10, color: "#3DC4BC", kor:"호남, 전주고" }, 
		"Reg010_High006": { x: 10, y: 10, color: "#43B7C1", kor:"호남, 광주제일고" }, 
		"Reg009_High008": { x: 10, y: 10, color: "#53AAC2", kor:"충청, 대전고" }, 
		"Reg001_High009": { x: 10, y: 10, color: "#659CBE", kor:"PK, 경남고" }, 
		"Reg001_High012": { x: 10, y: 10, color: "#768EB5", kor:"PK, 진주고" }, 
		"Reg009_High013": { x: 10, y: 10, color: "#8380A9", kor:"충청, 청주고" }, 
		"Reg010_High001": { x: 10, y: 10, color: "#8D7299", kor:"호남, 경기고" }, 
		"Reg010_High011": { x: 10, y: 10, color: "#926587", kor:"호남, 광주고" }, 
		"Reg001_High001": { x: 10, y: 10, color: "#935974", kor:"PK, 경기고" }, 
		"Reg010_High016": { x: 10, y: 10, color: "#935974", kor:"호남, 목포고" }, 
		"Reg002_High003": { x: 10, y: 10, color: "#935974", kor:"TK, 고교 정보 없음" }, 
		"Reg002_High014": { x: 10, y: 10, color: "#935974", kor:"TK, 대구고" }, 
		"Reg005_High003": { x: 10, y: 10, color: "#935974", kor:"서울, 고교 정보 없음" }, 
		"Reg009_High001": { x: 10, y: 10, color: "#935974", kor:"충청, 경기고" }, 
		"Reg010_High017": { x: 10, y: 10, color: "#935974", kor:"호남, 남성고" }, 
		"Reg001_High002": { x: 10, y: 10, color: "#935974", kor:"PK, 경북고" }, 
		"Reg001_High003": { x: 10, y: 10, color: "#935974", kor:"PK, 고교 정보 없음" }, 
		"Reg001_High023": { x: 10, y: 10, color: "#935974", kor:"PK, 동래고" }, 
		"Reg001_High028": { x: 10, y: 10, color: "#935974", kor:"PK, 마산상고" }, 
		"Reg002_High019": { x: 10, y: 10, color: "#935974", kor:"TK, 경북사대부고" }, 
		"Reg002_High026": { x: 10, y: 10, color: "#935974", kor:"TK, 대륜고" }, 
		"Reg003_High001": { x: 10, y: 10, color: "#935974", kor:"강원, 경기고" }, 
		"Reg004_High001": { x: 10, y: 10, color: "#935974", kor:"경기, 경기고" }, 
		"Reg005_High029": { x: 10, y: 10, color: "#935974", kor:"서울, 환일고" }, 
		"Reg006_High001": { x: 10, y: 10, color: "#935974", kor:"이북, 경기고" }, 
		"Reg006_High007": { x: 10, y: 10, color: "#935974", kor:"이북, 서울고" }
	}; // fociRH 끝  (30)

	var fociRU = {
		"Reg001_Univ001": { x: 600, y: 600, color: "#91e9ff", kor: "PK, 서울대" }, 
		"etc":  { x: 1300, y: 900, color: "#cccccc", kor:"기타" }, 
		"Reg005_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "서울, 서울대" },
		"Reg010_Univ001": { x:  10, y: 10, color: "#46CFB3", kor: "호남, 서울대" },
		"Reg002_Univ001": { x: 10, y: 10, color: "#3DC4BC", kor: "TK, 서울대" },
		"Reg009_Univ001": { x: 10, y: 10, color: "#43B7C1", kor: "충청, 서울대" },
		"Reg010_Univ002": { x: 10, y: 10, color: "#53AAC2", kor: "호남, 고려대" },
		"Reg002_Univ002": { x: 10, y: 10, color: "#659CBE", kor: "TK, 고려대" },
		"Reg004_Univ001": { x: 10, y: 10, color: "#768EB5", kor: "경기, 서울대" },
		"Reg006_Univ001": { x: 10, y: 10, color: "#8380A9", kor: "이북, 서울대" },
		"Reg009_Univ002": { x: 10, y: 10, color: "#8D7299", kor: "충청, 고려대" },
		"Reg001_Univ002": { x: 10, y: 10, color: "#926587", kor: "PK, 고려대" },
		"Reg010_Univ003": { x: 10, y: 10, color: "#935974", kor: "호남, 성균관대" },
		"Reg005_Univ002": { x: 10, y: 10, color: "#935974", kor: "서울, 고려대" },
		"Reg007_Univ001": { x: 10, y: 10, color: "#935974", kor: "인천, 서울대" },
		"Reg001_Univ003": { x: 10, y: 10, color: "#935974", kor: "PK, 성균관대" },
		"Reg003_Univ001": { x: 10, y: 10, color: "#935974", kor: "강원, 서울대" },
		"Reg002_Univ012": { x: 10, y: 10, color: "#935974", kor: "TK, 경북대" },
		"Reg008_Univ001": { x: 10, y: 10, color: "#935974", kor: "제주, 서울대" },
		"Reg009_Univ004": { x: 10, y: 10, color: "#935974", kor: "충청, 연세대" }
	}; // fociRU  끝  (20)
 	
 	var fociHU = {
 		"High001_Univ001": { x: 600, y: 600, color: "#91e9ff", kor: "경기고, 서울대" }, 
		"etc":  { x: 1300, y: 900, color: "#cccccc", kor:"기타" }, 
		"High002_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "경북고, 서울대" },
		"High004_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "부산고, 서울대" },
		"High007_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "서울고, 서울대" },
		"High005_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "전주고, 서울대" },
		"High006_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "광주제일고, 서울대" },
		"High008_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "대전고, 서울대" },
		"High009_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "경남고, 서울대" },
		"High010_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "경복고, 서울대" },
		"High011_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "광주고, 서울대" },
		"High003_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "고교 정보 없음, 서울대" },
		"High015_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "경동고 서울대" },
		"High002_Univ002": { x:  10, y: 10, color: "#5CD9A7", kor: "경북고 고려대" },
		"High003_Univ002": { x:  10, y: 10, color: "#5CD9A7", kor: "고교 정보 없음, 고려대" },
		"High006_Univ002": { x:  10, y: 10, color: "#5CD9A7", kor: "광주제일고, 고려대" },
		"High014_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "대구고, 서울대" },
		"High019_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "경북사대부고, 서울대" },
		"High022_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "계성고, 서울대" },
		"High023_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "동래고, 서울대" },
		"High024_Univ001": { x:  10, y: 10, color: "#5CD9A7", kor: "여의도고, 서울대" }
 	}; // fociHU 끝 (21)


	var fociRHU = {
		"Reg002_High002_Univ001": { x: 600, y: 600, color: "#91e9ff", kor: "TK, 경북고, 서울대" },
		"etc":  { x: 100, y: 100, color: "#cccccc", kor: "기타" },
		"Reg005_High001_Univ001": { x:  200, y: 100, color: "#5CD9A7", kor: "서울, 경기고, 서울대" },
		"Reg001_High004_Univ001": { x: 350, y:100, color: "#46CFB3", kor: "PK, 부산고, 서울대" },
		"Reg010_High005_Univ001": { x: 500, y: 100, color: "#3DC4BC" , kor: "호남, 전주고, 서울대" },
		"Reg010_High006_Univ001": { x: 750, y: 100, color: "#43B7C1", kor: "호남, 광주제일고, 서울대" },
		"Reg009_High008_Univ001": { x: 50, y: 400, color: "#53AAC2", kor: "충청, 대전고, 서울대" },
		"Reg010_High001_Univ001": { x: 200, y: 400, color: "#659CBE" , kor: "호남, 경기고, 서울대" },
		"Reg001_High009_Univ001": { x: 350, y: 400, color: "#768EB5", kor: "PK, 경남고, 서울대" },
		"Reg010_High011_Univ001": { x: 500, y: 400, color: "#8380A9" , kor: "호남, 광주고, 서울대" },
		"Reg001_High001_Univ001": { x: 500, y: 400, color: "#8380A9" , kor: "PK, 경기고, 서울대" },
		"Reg009_High001_Univ001": { x: 500, y: 400, color: "#8380A9", kor: "충청, 경기고, 서울대" },
		"Reg001_High023_Univ001": { x: 500, y: 400, color: "#8380A9", kor: "PK, 동래고, 서울대" },
		"Reg002_High002_Univ002": { x: 500, y: 400, color: "#8380A9" , kor: "TK, 경북고, 고려대" },
		"Reg002_High019_Univ001": { x: 500, y: 400, color: "#8380A9", kor: "TK, 경북사대부고, 서울대" },
		"Reg004_High001_Univ001": { x: 500, y: 400, color: "#8380A9", kor: "경기, 경기고, 서울대" },
		"Reg006_High001_Univ001": { x: 500, y: 400, color: "#8380A9" , kor: "이북, 경기고, 서울대" },
		"Reg006_High007_Univ001": { x: 500, y: 400, color: "#8380A9" , kor: "이북, 서울고, 서울대" },
		"Reg010_High006_Univ002": { x: 500, y: 400, color: "#8380A9", kor: "호남, 광주제일고, 고려대" }
	}; // foci 끝  (19)

	//======================== svg 그리기 

	var datalength = data.length; 

	var margin = {top: 16, right: 0, bottom: 0, left: 0},
	width = windowW - margin.left - margin.right,
	height = windowW - margin.top - margin.bottom;

	

	var svg = d3.select("#chart") 
		.append("svg") 
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var foci = {
		"toppos": { x: circleX, y: (circleX/2), color: "#cccccc" }
	};


	var selectValue = 0;
	var selectA = 0; 	
	var options = '';
	var etcnumber = 0;

	//======================== 원 그리기 
	var pie = (Math.PI);

	//이너서클 1번
	function circleDrawA(xx,yy,r) {
		var eachPie = (pie*2)/selectA; 

		var basketX = [ ];
		var basketY = [ ];

		//xx=원의중심x좌표, yy=원의중심y좌표, rr=원의반지름  

		for (var i=0; i<(selectA+1); i+=eachPie ) {
			//각도에 따른 원의 좌표 구하기(X축 또는 Y축이 0 도 일때 좌표구하는 공식)
			cx = xx + ( (Math.cos(i)) * r ); //x = 반지름 * sin쎄타
			cy = yy - ( (Math.sin(i)) * r ); //y = 반지름 * cos쎄타

			basketX.push(cx);
			basketY.push(cy);
		} // for문 끝

		for (var j=0; j<(selectA+2); j++) {
			var value = d3.keys(foci)[j];
			foci[value].x = basketX[j];
		 	foci[value].y  = basketY[j];

		 	if (j==0) {
		 		foci[value].x = circleX;
		 		foci[value].y = circleX;
		 	}

		 	if (value == 'etc') {
		 		foci[value].x = (circleX)+1;
		 		foci[value].y = (circleX)+1;
		 	} 
		} 
	}; // circleDraw끝  

	// 이너서클 2번
	function circleDrawB(xx,yy,r) {
		//xx=원의중심x좌표, yy=원의중심y좌표, rr=원의반지름  
		var drawB = (selectValue - selectA-2);


		
		var eachPie = (pie*2)/ drawB

		var basketX = [ ];
		var basketY = [ ];
 
		for (var i=0; i<(drawB+1); i+=eachPie ) {
			//각도에 따른 원의 좌표 구하기(X축 또는 Y축이 0 도 일때 좌표구하는 공식)
			cx = xx + ( (Math.cos(i)) * r ); //x = 반지름 * sin쎄타
			cy = yy - ( (Math.sin(i)) * r ); //y = 반지름 * cos쎄타

			basketX.push(cx);
			basketY.push(cy);
		} // for문 끝
 
		for (var j=(selectA+2); j<selectValue; j++) {
			var value = d3.keys(foci)[j];
			var sj = j - (selectA+1);

			foci[value].x = basketX[sj];
		 	foci[value].y  = basketY[sj] ; 
		} 
	}; // circleDrawB끝  

	function circleOne(xx,yy,r) {
			var eachPie = (pie*2)/(selectValue-1); 

			var basketX = [ ];
			var basketY = [ ];

			//xx=원의중심x좌표, yy=원의중심y좌표, rr=원의반지름  

			for (var i=0; i<(selectValue); i+=eachPie ) {
				//각도에 따른 원의 좌표 구하기(X축 또는 Y축이 0 도 일때 좌표구하는 공식)
				cx = xx + ( (Math.cos(i)) * r ); //x = 반지름 * sin쎄타
				cy = yy - ( (Math.sin(i)) * r ); //y = 반지름 * cos쎄타

				basketX.push(cx);
				basketY.push(cy);
			} // for문 끝

			for (var j=0; j<(selectValue); j++) {
				var value = d3.keys(foci)[j];
				foci[value].x = basketX[j];
			 	foci[value].y  = basketY[j];

			 	if (j==0) {
			 		foci[value].x = circleX;
			 		foci[value].y = circleX;
			 	}
			} 
	}; // circleOne 끝 


	function addText() { 
		svg.selectAll("text").remove();

	 		for (var i=0; i<selectValue; i++) {
				var value = d3.keys(foci)[i];
				if ( value != 'etc') {
					 svg.append("text") 
					.attr("x",  function(d) {
						if (i == 0) {
							return circleX;
						} else {  
							return foci[value].x-20;
						}
					})
					.attr("y", function(d) {
						if (i==0) {
							return circleX;
						} else {
							return (foci[value].y)-20
						}
					})
					.style("fill", "#ffffff")
					.text(function(d){
						return foci[value].kor
					});
				}
				
			};
	}; // addText() 끝 


	// 노드  
	var nodes = d3.range(0, num_nodes).map(function(o, i) {
		return {
			id: 'node'+i,
			name : data[i].Name,
			hometown: data[i].RegK,
			high: data[i].highK,
			univ: data[i].UnivK,
			x: foci.toppos.x + Math.random(),
			y: foci.toppos.y + Math.random(),
			radius: node_radius,
			choice: "toppos",
		}
	}); // node 끝  

	// Force-directed layout
	var force = d3.layout.force()
		.nodes(nodes)
		.size([width, height])
		.gravity(0)
		.charge(0)
		.friction(0.5)
		.on("tick", tick);
		
		force.start();  
		setTimeout(function() {force.stop(); }, 1500);

	// Draw circle for each node.
	var circle = svg.selectAll("g")
		.append("g") 
		.data(nodes)
		.enter()
		.append("circle")
		.attr("r",3)
		.attr("id", function(d) { return d.id; })
		.attr("class", "node")
		.style("opacity", 0.7)
		.style("fill", function(d) { return foci[d.choice].color; });

	circle.append("title")
		.text(function(d) { return d.id; });

	   
	// For smoother initial transition to settling spots.
	/*circle.transition() 
		.duration(300) 
		.attrTween("r", function(d) {
			var i = d3.interpolate(0, d.radius);
			return function(a) { return d.radius = i(a); };
		}); */
 
	//========================  점 뿌리기 

	var choices = d3.keys(foci);
	var foci_index = 1;	
	var choice = d3.keys(foci)[foci_index];
	var random_index = 0;

	function movingme() {
			nodes[random_index].cx = foci[choice].x;
			nodes[random_index].cy = foci[choice].y;
			nodes[random_index].choice = choice;  
	};


	function circles() {
		circleDrawA(circleX, circleY, radiusS); 
		circleDrawB(circleX, circleY, radiusM);
	};


	// 지역만 
	function networkReg() { 
		selectValue = 10; 
		
		circleOne(circleX, circleY, radiusM);	 
		addText(); 
 
		for (var t=0; t<datalength; t++) {
			foci_index= 0;


			for (var l=0; l<selectValue; l++) {  
				var listReg = d3.keys(foci)[l];
 
				if (data[t].Reg === listReg) { 
					foci_index = l;  
				} 
			}; 

			

			random_index= t; 
			choice = d3.keys(foci)[foci_index]; 
			movingme(); 
		}// for문 끝

		force.start();
		//setTimeout(function() { force.stop(); }, 1000);
	} // networkReg 끝  


 

	// 대학만 
	function networkUniv() { 
		 circleDrawA(circleX, circleY, radiusM); 
			addText(); 

			for (var t=0; t<datalength; t++) {
				foci_index= 1;
				

				for (var l=0; l<selectValue; l++) {  
					var list = d3.keys(foci)[l];
	 		
					if (data[t][options] === list) { 
						foci_index = l;  

					} 
				}; 

				random_index= t; 
				choice = d3.keys(foci)[foci_index]; 
				movingme(); 
			}// for문 끝

			force.start();
			 
	} // networkUniv 끝  


	function networkB() {
		//etcnumber = 0;
		circles();
		addText(); 

		for (var t=0; t<datalength; t++) {
			foci_index= 1;
			//etcnumber = etcnumber+1;

			for (var l=0; l<selectValue; l++) {  
				var list = d3.keys(foci)[l];
 
				if (data[t][options] === list) { 
					foci_index = l;  
					//etcnumber = (etcnumber -1);
				} 
			}; 



			random_index= t; 
			choice = d3.keys(foci)[foci_index]; 
			movingme(); 
		}// for문 끝

		force.start();
		//setTimeout(function() { force.stop(); }, 1000);
	}
	   
	//==== 기본 함수 
	function tick() {  
		 circle.each(gravity(.05))
		.each(collide(.04))
		.style("fill", function(d) { return foci[d.choice].color; })
		.attr("cx", function(d,i) {  
			return d.x; 
		})
		.attr("cy", function(d) { return d.y; }); 
		/*
		circle.each(gravity(.1)*e.alpha)
		.on("click",function(d,i) {
			vm.whois = true;
			vm.name = d.name;
			vm.hometown = d.hometown;
			vm.highschool = d.high;
			vm.university = d.univ;
		}); */  
	} // tick() 끝

	// Move nodes toward cluster focus.
	function gravity(alpha) {  
		var etcValue =  circleX+1;
		return function(d,i) {    
				d.y += (foci[d.choice].y - d.y) * alpha;
				d.x += (foci[d.choice].x - d.x) * alpha;  
				 if (foci[d.choice].x == etcValue) {  
					d.x = etcValue + ( (Math.cos(i)) * radiusL ); //x = 반지름 * sin쎄타
					d.y = etcValue - ( (Math.sin(i)) *  radiusL ); //y = 반지름 * cos쎄타 					  
				}
		};
	} // gravity 끝


	// Resolve collisions between nodes.
	function collide(alpha) {
		var quadtree = d3.geom.quadtree(nodes);
		return function(d) {
			var r = d.radius + node_radius + Math.max(padding, cluster_padding),
			nx1 = d.x - r ,
			nx2 = d.x + r ,
			ny1 = d.y - r ,
			ny2 = d.y + r ;

			quadtree.visit(function(quad, x1, y1, x2, y2) {
				if (quad.point && (quad.point !== d)) {
					var x = d.x - quad.point.x,
					y = d.y - quad.point.y,
					l = Math.sqrt(x * x + y * y),
					r = d.radius + quad.point.radius + (d.choice === quad.point.choice ? padding : cluster_padding);

					if (l < r) {
						l = (l - r) / l * alpha;
						d.x -= x *= l;
						d.y -= y *= l;
						quad.point.x += x;
						quad.point.y += y;
					} // if( l < r ) 끝 
				} // if(quat.point) 끝 
				return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
			}); // quadtree 끝 
		}; // return 끝 
	} // collide 끝 
 
}); // json 끝
