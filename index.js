const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mountainsRouter = require("./route/mountainTrailsRouter");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "Service running."});
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

app.use("/mountainTrailsData", mountainsRouter);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    console.error(error.message, error.stack);
    res.status(statusCode).json({ message: error.message });
    return;
});

app.listen(port, () => {
    console.log(`Server listening at ${port} port.`);
});