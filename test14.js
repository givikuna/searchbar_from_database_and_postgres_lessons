const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    var infoFromURL_Global = url.parse(req.url, true).query;
    var fileLoc_Global = null;
    var countriesArr_Global = null;
    var fullArr_Global = [];

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    console.log("hii");
    try {
        if (infoFromURL_Global.need = "countries") {
            fileLoc_Global = "data/countries.json"
            if (fs.existsSync(fileLoc_Global)) {
                fs.readFile(fileLoc_Global, 'utf-8', function (err, data) {
                    countriesArr_Global = data.toString();
                    res.write(countriesArr_Global);
                    return res.end();
                });
            } else {
                res.write("");
                return res.end();
            }
        } else { }
    } catch (error) {
        console.log(error);
    }
}).listen(8095);
console.log('Server running at http://127.0.0.1:8095/');