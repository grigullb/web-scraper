var request = require('request');
var fs = require('fs');
var cheerio = require ('cheerio');
var permission = "(-rw-r--r--)";
request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    var num_rows = $('table').children('tr').length;
    var link_array = [];
    var data = "";
    var links = $('table').children('tr').children('td').children('a');
    for(var i=0;i<num_rows;i++){
    	var row = $(links[i]).text();
    	link_array.push(row);
  	}
  	for(var i=0;i<link_array.length;i++){
  		if(!(/\//.test(link_array[i]))){
  			var url = link_array[i];
  			var ext = link_array[i].split('.').pop();
  			data = data + permission+","+ url + "," + ext + "\n";
  		}
  	}
  	fs.writeFile('Workbook1.csv', data, function (err) {
  			if (err) {
    			console.log('Some error occured - file either not saved or corrupted file saved.');
  			} else{
    			console.log('It\'s saved!');
  			}
				});
  	
}
})

