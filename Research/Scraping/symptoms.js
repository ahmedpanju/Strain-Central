var request = require('request');
var fs = require('fs')
var cheerio = require('cheerio');
var symptoms = [];

request('https://www.marijuana.com/strains/', function (error, response, html) {
    
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var strains = [];
        var json = [{ link : ""}];
        $('.column.half').each(function(i, element){
            var a = $(this).children().children().next().next().children().attr('href');
            strains.push(a);
        });
        
        for (var i = 0; i < strains.length; i++) {
            request(strains[i], function (error, response, html) {
                var $ = cheerio.load(html);
                var symptoms = [];
                $('.helps-with ul li').each(function(i, element){
                    var a = $(this).text();
                    symptoms.push(a);
                    console.log(symptoms);
                });
            });
    
        }
    }
    
    
    });
