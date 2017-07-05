$.getJSON("data.json", function(dataA) {

		var bookData = dataA;     

		Vue.component('icons', {
 			props: ['one', 'index','book'],
 			template: '#man-icon', 
 			methods: {
 				testimg: function(test) { 
 					vm.caseArray = [];
 					 samplearray = test; 

 					 vm.imglink = samplearray.img;
 					 vm.bookTitle = samplearray.Title; 
 					 vm.bookCategory = samplearray.Subjects;
 					 vm.bookgenre = samplearray.Genre;
 					 vm.bookauthor = samplearray.Author;
 					 vm.bookpublic = samplearray.Publisher;
 					 vm.bookprice = samplearray.Price; 

 					 vm.showCard =  true; 


 				}
 			}
 		});

		 

		var vm = new Vue({
			el: '#containers',
			data: { 
				locationlist: [
					{ "name": "국내", "code": "domestic"},
					{"name": "해외", "code": "international"}
				],
				subjectlist: [
					{ "name": "data", "code": "data"},
					{"name": "data visualization", "code": "data visualization"},
					{ "name": "design", "code": "design"},
					{ "name": "develop", "code": "develop"},
					{ "name": "infographics", "code": "infographics"},
					{ "name": "mapping", "code": "mapping"},
					{ "name": "etc", "code": "etc"} 

				],
				btnactive: true,
				btnactiveB: true,  
				pick: [],
				subIs: [],
				imglink:'',
				showCard: false,  
				samplearray: [], 
				book: bookData,
				manPic: '#',
				bookTitle: '책제목', 
				bookCategory:'책분류',
				bookgenre:'',
				bookauthor:'',
				bookpublic:'',
				bookprice:''
			},    
			methods: { 
				one: function() {

				},
				index: function(value) { 
					 

				}, 
				pickbook: function() {
					var bookcountry = '';
 					var lengthis = vm.pick.length; 
 					 
					if(vm.pick.length == 0) {	
						$('.testbox').each(function(index) {
							$(this).css('display','block'); 
						});  
					} else {
						for (var i=0; i<lengthis; i++) {
							bookcountry = vm.pick[i];  
 
							$('.testbox').each(function(index) { 
								$(this).css('display','none');

								if(vm.book[index].Location == bookcountry) { 
									$(this).css('display','block');  
								} 
							}); 
						} 
					}
				},
				category: function() {
					var bookSubjects = '';
 					var lengthis = vm.subIs.length; 
 					 
					if(vm.subIs.length == 0) {	
						$('.testbox').each(function(index){
							$(this).css('display','block');
						});
					} else {
						$('.testbox').each(function(index){
							$(this).css('display','none');
						});
						for (var i=0; i<lengthis; i++) {

							bookSubjects = vm.subIs[i];  
 
							$('.testbox').each(function(index) { 
								

								if(vm.book[index].Subjects == bookSubjects) { 
									$(this).css('display','block');  
								} 
							}); 
						} 
					}
				}
			}
		});   
 
	 	if (screen.width < 640) {
	 		vm.btnactive = false; 
	 		vm.tableshow = false; 
	 	};


	});

