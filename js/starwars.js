window.onload = function() {
	$("#calculator").click(connectAPI); 

	function connectAPI() {

		var distance = $("#distance").val(); //Taking value from input

		if(!isNaN(distance) && distance >= 0) { //Filter incorrect input
			
			var starRequest = new XMLHttpRequest();
			starRequest.open('GET', 'https://swapi.co/api/starships/');
			starRequest.onload = function() { //Once the data is loaded, execute the function
				
				var starJSON = JSON.parse(starRequest.responseText);//Store JSON data onto the variable
				var starships = starJSON.results;
				showInfo(starships);//send JSON results to the especific function
			};
			starRequest.send();

			function showInfo(starships) { //Shows data onto the screen
				
				for (let i = 0; i < starships.length; i++) {
                                	var name = starships[i].name;
					var megalights = starships[i].MGLT;
					var calculation;
					console.log(name + ": " + megalights);
					//$("#stats").html("<li>" + name + megalights + "</li>");
                                }
			}

		} else {
			console.log("Incorrect value");
		}
	}	
}

