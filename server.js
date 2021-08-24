const db = require("./db/db.json");
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = 3001;

const app = express();

app.use(express.static("public"));

app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(db));

app.post("/api/notes", (req, res) => {});

app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () => {
	console.log(`Server is listenting at http://localhost:${PORT}...`);
});
