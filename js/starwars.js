window.onload = function() {

	$("#calculator").click(connectAPI); 

	function connectAPI() {

		let inputDistance = $("#distance").val(); //Taking value from input

		if(!isNaN(inputDistance) && inputDistance >= 0) { //Filter incorrect input
			
			let starRequest = new XMLHttpRequest();
			starRequest.open('GET', 'https://swapi.co/api/starships/');
			starRequest.onload = function() { //Once the data is loaded, execute the function
				
				let starJSON = JSON.parse(starRequest.responseText);//Store JSON data onto the variable
				let starships = starJSON.results;
				showInfo(starships);//send JSON results to the especific function
			};
			starRequest.send();

			function showInfo(starships) { //Shows data onto the screen
				
				for (let i = 0; i < starships.length; i++) { //Iterate over all starships

                	let name = starships[i].name;		
					let megalights = starships[i].MGLT;
					let consumables = starships[i].consumables;

					let hoursDistance = getConsumableHours(consumables);
					let totalDistance = hoursDistance * megalights;
					let calculateStops = totalDistance / inputDistance;

					console.log("Name: " + name + ", MGLT: " + megalights + ", consumables: " + consumables + ", total distance covered: " + totalDistance + " megalights");
					console.log("Number of stops: " + calculateStops);
            	}
			}

			function getConsumableHours(data) { //We'll receive a number and a string as a parameter
				
				//First, filter days, weeks, months or years
				if (data.includes("days") || data.includes("day")) { 
					consumables = data.match(/\d/g);//Extract the number from the string
					let days = consumables*24; 
					return days;
				
				} else if (data.includes("weeks") || data.includes("week")) {
					consumables = data.match(/\d/g);
					let weeks = consumables*24*7;
					return weeks;

				} else if (data.includes("months") || data.includes("month")){
					consumables = data.match(/\d/g);
					let months = consumables*24*7*30;
					return months;

				} else if (data.includes("years") || data.includes("year")) {
					consumables = data.match(/\d/g);
					let years = consumables*24*7*30*12; //24 hours a day * 7 days a week * 30 days a month * 12 months a year
					return years;

				} else {
					console.log("Incorrect value");
				}
			}

		} else {
			console.log("Incorrect value");
		}
	}	
}

