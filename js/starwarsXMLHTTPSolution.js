$("#calculator").click(connectAPI); 



function connectAPI() {

	const inputDistance = $("#distance").val(); //Taking value from input

	if(!isNaN(inputDistance) && inputDistance >= 0) { //Filter incorrect input
		
		const starRequest = new XMLHttpRequest();
		starRequest.open('GET', 'https://swapi.dev/api/starships/');

		starRequest.onload = function() { //Once the data is loaded, execute the function

			const starJSON = JSON.parse(starRequest.responseText);//Store JSON data onto the variable
			const starships = starJSON.results;
			showInfo(starships);//send JSON results to the especific function

		};

		starRequest.send();



		function showInfo(starships) { //Shows data onto the screen
			
			let printData = "<ul>"; //List element created

			for (let i = 0; i < starships.length; i++) { //Iterate over all starships

            	const name = starships[i].name;		
				const megalights = starships[i].MGLT;
				const consumables = starships[i].consumables;

				const hoursDistance = getConsumableHours(consumables);
				const totalDistance = hoursDistance * megalights;
				const calculateStops = totalDistance / inputDistance;

				if(inputDistance > totalDistance) {

					printData += "<li>" + name + " / " + calculateStops + " stops" + "</li>"; //Filling list element with each loop iteration

				} else {

					printData += "<li>"+name + " / " + " no stops needed" + "</li>";

				}

        	}

        	$("#stats").html(printData+"</ul>"); //Print all elements and end list element

		}


		
		function getConsumableHours(data) { //Receive a number and a string as a parameter
			
			if (data.includes("days") || data.includes("day")) { //First, filter days, weeks, months or years
			
				consumables = data.match(/\d/g);//Extract the number from the string
				const days = consumables*24; 
				return days;
			
			} else if (data.includes("weeks") || data.includes("week")) {
			
				consumables = data.match(/\d/g);
				const weeks = consumables*24*7;
				return weeks;

			} else if (data.includes("months") || data.includes("month")){
			
				consumables = data.match(/\d/g);
				const months = consumables*24*7*30;
				return months;

			} else if (data.includes("years") || data.includes("year")) {
			
				consumables = data.match(/\d/g);
				const years = consumables*24*7*30*12; //24 hours a day * 7 days a week * 30 days a month * 12 months a year
				return years;

			} else {
			
				console.log("Incorrect value");
			}
		}

	} else {
		console.log("Incorrect value");
	}
}