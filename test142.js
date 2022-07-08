const http = require('http');
const url = require('url');
const { Client } = require('../../../nodeModules/pg/node_modules/pg');

// select \"zip\" from \"theZips\" where \"zip\" like \'" + neededNum + "\' limit 5;

http.createServer(function (req, res) {
    const client = new Client({
        user: "givi_user",
        password: "2007",
        host: "localhost",
        port: 5432,
        database: "Zip_Codes"
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    try {
        execIt();
        async function execIt() {
            try {
                /*
                var client = new Client();
                client.connectSync();
                var rows = client.querySync('SELECT NOW() AS the_date')
                console.log(rows[0].the_date)
                */

                var infoFromURL = url.parse(req.url, true).query;
                console.log("the Num: " + infoFromURL.need);
                var neededNum1 = infoFromURL.need;
                var neededNum = neededNum1.toString();
                if ((neededNum.length > 5) || (neededNum.length == 5)) {
                    res.write("");
                    return res.end();
                } else {
                    await client.connect();
                    console.log("Connected successfully.");
                    const { rows } = await client.query("select \"zip\" from \"theZips\" where \"zip\" like \'" + neededNum + "%\' limit 5;");
                    console.log(rows);
                    var toPrint = "[";
                    for (var i = 0; i < 5; i++) {
                        if (i == 4) {
                            toPrint = toPrint + "\"" + rows[i].zip.toString() + "\"" + "]";
                        } else {
                            toPrint = toPrint + "\"" + rows[i].zip.toString() + "\"" + ", ";
                        }
                    }
                    console.log(toPrint);
                    res.write(toPrint);
                    await client.end();
                    console.log("Client disconnected successfully.");
                    return res.end();
                }
            } catch (ex) {
                console.log(`Something wrong happend ${ex}`);
            }
        }
    } catch (error) {
        console.log(error);
    }
}).listen(8096);
console.log('Server running at http://127.0.0.1:8096/');