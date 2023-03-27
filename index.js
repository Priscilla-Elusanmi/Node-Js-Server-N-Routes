import http from "http";
import fetch from "node-fetch"

const server = http.createServer((req, res) => {
    const url = req.url;
    let tableData = "<table border='1'><tr><th>Name</th><th>height</th><th>birth_year</th><th>gender</th><th>url</th></tr>";
    if (url === "/") {
        res.write("<h1>Home Page</h1>");
        res.end('<img src ="https://dummyimage.com/600x400/000/fff">');
        return;

    }
   
    if (url === "/list") {
        fetch("https://swapi.dev/api/people")
            .then(res => res.json())
            .then(data => {
                createData(data.results)
                res.write(tableData)
                res.end();
                return;
            });

    } else {
        res.write("Ooops!...Page Not Found!");
        res.end();
        return;
    
    }
   

    function createData(data) {
        data.forEach(element => {
            tableData+=`<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
        });
        tableData+= `</table>`;
    }

}).listen(1234, console.log(`Server is listening on port 1234`));