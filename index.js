const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let registerContent = "";
const args = require("minimist")(process.argv.slice(2), {
  default: {
    port: 4000,
  },
});
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});
fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("registration.html", (err, register) => {
  if (err) {
    throw err;
  }
  registerContent = register;
});
http
  .createServer((req, res) => {
    let url = req.url;
    res.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        res.write(projectContent);
        res.end();
        break;
      case "/register":
        res.write(registerContent);
        res.end();
        break;
      default:
        res.write(homeContent);
        res.end();
    }
  })
  .listen(args.port, () => {
    console.log(`Server running at port: ${args.port}`);
  });
