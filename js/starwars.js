window.onload = function() {
	$("#calculator").click(connectAPI); 

	function connectAPI() {

		var distance = $("#distance").val(); // Taking value from input

		if(!isNaN(distance) && distance >= 0){ //Filter incorrect value

			var url = "https://swapi.co/api/starships/schema"; //Store url petition in a variable
			
			var connection =$.ajax({ //AJAX petition to get all info from API
								url: url,
								type: "get",
								dataType: "JSON",
								contentType: "application/json",
								success: function (data) {
									console.table({data}); //See all info in the console
									//$("#stats").html(names);
								}
							});

		} else {
			console.log("Incorrect value");
		}
	}	
}


