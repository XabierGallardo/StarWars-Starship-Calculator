window.onload = function() {
	$("#calculator").click(connectAPI);

	function connectAPI() {
		const inputDistance = $("#distance").val(); //Taking value from input
		if(inputDistance > 0) { //Filtering incorrect input
			$.ajax({
				url: "https://swapi.co/api/starships/",
				type: "get",
				dataType: "JSON",
				contentType: "application/json",
				success: function(data) {
					console.table(data);
					let printData = "<ul>";
					
				}
			});

		}
	}
}
