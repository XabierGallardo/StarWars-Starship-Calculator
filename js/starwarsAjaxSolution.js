// Buttons
$("#calculator").click(connectAPI);

$("#instructions").click(printInstructions);

$("#clear").click(function() {

	$("#stats").html("");
});


function printInstructions() {

	$("#stats").html("<p class='paragraph'>We want to know for all SW starships, to cover a given distance, how many stops for resupply are required</p>" +
"<p class='paragraph'>The application will take as input a distance in mega lights (MGLT)</p>" +
"<p class='paragraph'>The output should be a collection of all the star ships and the total amount of stops required to make the distance between the planets</p>");
}


function connectAPI() {

	let inputDistance = $("#distance").val(); //Taking value from input

	if(!isNaN(inputDistance) && inputDistance >= 0) { //Filtering incorrect input

		$.ajax({
			url: "https://swapi.dev/api/starships/",
			type: "get",
			dataType: "JSON",
			contentType: "application/json",

			success: function(data) { //If success, shows data onto screen
				
				console.table(data); //Visualizing ordered data onto the console
				
				let printData = "<ul>";
				let starships = data.results;

				for (let i = 0; i < starships.length; i++) {

					let name = starships[i].name;
					let megalights = starships[i].MGLT;
					let consumables = starships[i].consumables;

					let hoursDistance = getConsumableHours(consumables);
					let totalDistance = hoursDistance * megalights;
					let calculateStops = totalDistance / inputDistance;

					if(inputDistance > totalDistance) {
						// Filling list element with each loop interation
						printData += "<li>" + name + " / " + calculateStops + " stops" + "</li>";
					} else {
						printData += "<li>" + name + " / " + " no stops needed" + "</li>";
					}
				}

				$("#stats").html(printData + " </ul>"); // Print all elements and end list element
				


				function getConsumableHours(time) { // Receive a number and a string as a parameter

					if(time.includes("days") || time.includes("day")) { // First, filter days, weeks, months or years
						
						consumables = time.match(/\d/g); // Extract the number from the string
						const days = consumables * 24;
						return days;

					} else if(time.includes("weeks") || time.includes("week")) { 
						
						consumables = time.match(/\d/g);
						const weeks = consumables * 24;
						return weeks;

					} else if(time.includes("months") || time.includes("month")) { 
						
						consumables = time.match(/\d/g); 
						const months = consumables * 24;
						return months;
					
					} else if(time.includes("years") || time.includes("year")) { 
						
						consumables = time.match(/\d/g); 
						const years = consumables * 24;
						return years;
					
					} else {

						console.log("Incorrect value");
						
					}
				}
			}
		});
	}
}