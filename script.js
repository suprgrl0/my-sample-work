
var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D'20002'%20and%20query%3D'parks'&format=json&diagnostics=true&callback=";
          $.getJSON(url, function(data){
       
               var results = data.query.results.Result;
               var html = "<ul><h5 class='text-primary'>Parks</h5>";
 
        for(var i = 0;i<results.length;i++){
            html += 
                '<details><summary><li class="title">'+results[i].Title+'</li></summary>'+
                '<li class="fields">'+results[i].Address+','+results[i].City+','+results[i].State+'</li></details>';
        }
 
        html += "</ul>";
        $("#parks").html(html);
       });

var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D'20002'%20and%20query%3D'schools'&format=json&diagnostics=true&callback=";
          $.getJSON(url, function(data){
       
               var results = data.query.results.Result;
               var html = "<ul><h5 class='text-success'>Schools</h5>";
 
        for(var i = 0;i<results.length;i++){
            html += 
                '<details><summary><li class="title">'+results[i].Title+'</li></summary>'+
                '<li class="fields">'+results[i].Address+','+results[i].City+','+results[i].State+'</li></details>';
        }
 
        html += "</ul>";
        $("#schools").html(html);
       });
          
var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D'20002'%20and%20query%3D'restaurants'&format=json&diagnostics=true&callback=";
          $.getJSON(url, function(data){
       
               var results = data.query.results.Result;
               var html = "<ul><h5 class='text-info'>Restaurants</h5>";
 
        for(var i = 0;i<results.length;i++){
            html += 
                '<details><summary><li class="title">'+results[i].Title+'</li></summary>'+
                '<li class="fields">'+results[i].Address+','+results[i].City+','+results[i].State+'</li></details>';
        }
 
        html += "</ul>";
        $("#restaurants").html(html);
       });          

var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D'20002'%20and%20query%3D'apartments'&format=json&diagnostics=true&callback=";
          $.getJSON(url, function(data){
       
               var results = data.query.results.Result;
               var html = "<ul><h5 class='text-warning'>Apartments</h5>";
 
        for(var i = 0;i<results.length;i++){
            html += 
                '<details><summary><li class="title">'+results[i].Title+'</li></summary>'+
                '<li class="fields">'+results[i].Address+','+results[i].City+','+results[i].State+'</li></details>';
        }
 
        html += "</ul>";
        $("#apartments").html(html);
       });          

var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D'20002'%20and%20query%3D'transit'&format=json&diagnostics=true&callback=";
          $.getJSON(url, function(data){
       
               var results = data.query.results.Result;
               var html = "<ul><h5 class='text-danger'>Transit</h5>";
 
        for(var i = 0;i<results.length;i++){
            html +=
                '<details><summary><li class="title">'+results[i].Title+'</li></summary>'+
                '<li class="fields">'+results[i].Address+','+results[i].City+','+results[i].State+'</li></details>';
        }
 
        html += "</ul>";
        $("#transit").html(html);
       });
          
var databaseOptions = {
	fileName: "MyDatabase",
	version: "1.0",
	displayName: "YQL Database",
	maxSize: 1024
};

var database = openDatabase(
	databaseOptions.fileName,
	databaseOptions.version,
	databaseOptions.displayName,
	databaseOptions.maxSize
);

database.transaction(function( transaction ){
	transaction.executeSql("CREATE TABLE IF NOT EXISTS Items (uId INTEGER PRIMARY KEY, title TEXT NOT NULL,address TEXT NOT NULL,category TEXT NOT NULL );");
});

dAllItems();

function resetEverything(){
	database.transaction(function( transaction ){
		var deleteQuery = "DELETE FROM Items;";
		transaction.executeSql(deleteQuery,[],successHandler, errorHandler);

		function successHandler(transaction, rows) {
			dAllItems();
		}

		function errorHandler(transaction, error) {
			console.log("Error : " + error.message);
		}
	});
}
function fetchAndSave(item,location){
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D%27"+location+"%27%20and%20query%3D%27"+item+"%27&format=json&callback=";

	$.getJSON( url, function( data ) {
		var results = data.query.results.Result;

		database.transaction(
            function( transaction ){
                console.log("Inserting");
                for(var i = 0;i<results.length;i++) {

					var title = escape(results[i].Title),
				 		address = results[i].Address +", "+results[i].City+", "+results[i].State,
				 		theId = results[i].id;

				 	console.log("Title: "+title);
				 	var insertQuery = "INSERT INTO Items (uId,title,address,category) VALUES ('"+theId+"','"+title+"','"+address+"','"+item+"');";
				 	console.log(insertQuery);
	                transaction.executeSql(insertQuery,[],successHandler, errorHandler);

	            }
            }
        );
	});
}

function downloadItems(){
	
	fetchAndSave("parks","20002");
	fetchAndSave("schools","20002");
	fetchAndSave("restaurants","20002");
	fetchAndSave("apartments","20002");
	fetchAndSave("transit","200002");

}