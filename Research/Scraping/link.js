var request = require('request');
var fs = require('fs')
var cheerio = require('cheerio');

request('https://www.marijuana.com/strains/', function (error, response, html) {
    
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var strains = [];
        var json = [{ link : ""}];
        $('.column.half').each(function(i, element){
            var a = $(this).children().children().next().next().children().attr('href');
            strains.push(a);
        });
    }
    fs.writeFile('output.json', JSON.stringify(strains, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

  });
});
