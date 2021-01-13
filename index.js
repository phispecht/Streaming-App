const express = require("express");
const app = express();
const compression = require("compression");
const config = require("./config");
const axios = require("axios").default;

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(compression());
app.use(express.json());

app.use(
    express.static("./src"),
    express.urlencoded({
        extended: false,
    })
);

app.get("/handleClick/:id", (req, res) => {
    const id = req.params.id;
    const options = config.handleOption(id);

    axios
        .request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.get("/handleHover/:id", (req, res) => {
    const id = req.params.id;
    const options = config.handleOption(id);

    axios
        .request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.get("/handleSearch/:inputValue", (req, res) => {
    const input = req.params.inputValue;
    const options = config.handleOptionSearch(input);

    axios
        .request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("server listening.");
});
