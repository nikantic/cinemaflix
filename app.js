var express = require("express"),
    app     = express(),
    request = require("request");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ROUTES

// Index route
app.get("/", function(req, res){
    res.render("home");
});

// Results route
app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data, queryInfo: query});
        }
    });
});

// Page not found route
app.get("/*", function(req, res) {
    res.render("404", {url: req.url});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");     
});