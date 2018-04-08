var http = require("http")
var Promise = require('Promise');
var cheerio = require('cheerio')
var baseUrl = 'XXXXXXXXX' 

function filterChapters(html){
    var $ = cheerio.load(html);
    var chapters = $(".learnchapter");
}

function printCourseInfo(html){
    console.log(html)
}

function getPageAsync(url){
    return new Promise(function(resolve,reject){
        console.log("Crawling...");

        http.get(url,function(res){
            var html = "";

            res.on('data',function(data){
                html+=data;
            })
            res.on('end',function(){
                resolve(html);

                var courseData = html;
                printCourseInfo(courseData)
            })
        }).on('error',function(e){
            reject(e);
            console.log("error happens");
        });
    })
}

var fetchCourseArray = [];

videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl+id))
})

Promise
 .all(fetchCourseArray)
 .then(function(pages){
    var courseData =  [];

    pages.forEach(function(html){
        var courses = filterChapters(html);
        courseData.push(courses)
    })
 });