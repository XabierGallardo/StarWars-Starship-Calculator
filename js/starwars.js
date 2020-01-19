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
				
				for (let i = 0; i < starships.length; i++) {
                                	let name = starships[i].name;
					let megalights = starships[i].MGLT;
					let consumables = starships[i].consumables;

					var hoursDistance = consumableHours(consumables);

					let calculation;
					console.log("name: " + name + ", mglt: " + megalights + ", consumables: " + consumables);
					console.log("Consumable hours: " + hoursDistance);				
/*
Calculation steps:

- Need to know the total distance a starhip can cover

- Divide consumables results to get hours and store on new variable consumeHors

- (new variable) totalDistance = mglt * consumeHours 

- resupplyStops = totalDistance / inputDistance

Show name and resupplyStops onto the screen

 */
                                }
			}

			function consumableHours(data) {
				
				if (data.includes("days")) { //filter days, weeks, months or years
					//A day has 24 hours, therefore consumables/24

					consumables = data.match(/\d/g);//We extract the number from the string
					let days = consumables*24;
					console.log("TEST Result: " + days + " hours");
				
				} else if (data.includes("weeks")) {
					consumables = data.match(/\d/g);
					let weeks = (consumables*24)*7;
					console.log("TEST Result: " + weeks + " hours");
				
				} else if (data.includes("months")){
					consumables = data.match(/\d/g);
					let months = ((consumables*24)*7)*30;
					console.log(consumables + " months");
				
				} else if (data.includes("years")) {
					consumables = data.match(/\d/g);
					console.log(consumables + " years");
				} else {
					console.log("incorrect value");
				}
			
			//return sentence?
			}

		} else {
			console.log("Incorrect value");
		}
	}	
}

