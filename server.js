const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const PORT = process.env.PORT || 3001;
const dbFilename = "./db/db.json";
const app = express();

app.use(express.static("public"));
app.use(express.json());

const writeFile = data => {
	fs.writeFile(dbFilename, data, err => {
		if (err) throw err;
		console.log("Data successfully written to file");
	});
};

app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => {
	fs.readFile(dbFilename, (err, data) => {
		if (err) throw err;
		res.json(JSON.parse(data));
	});
});

app.post("/api/notes", (req, res) => {
	// Validate the request body

	// Create a new note object
	const note = {
		id: uuidv4(),
		title: req.body.title,
		text: req.body.text,
	};

	// Read the existing notes
	fs.readFile(dbFilename, (err, data) => {
		// Handle any error
		if (err) throw err;
		// Read the current notes from the datastore
		let notes = JSON.parse(data);
		// Add a new note to the datastore
		notes.push(note);
		// Write the updated notes object to the datastore file.
		writeFile(JSON.stringify(notes));
	});
});

app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () => {
	console.log(`Server is listenting at http://localhost:${PORT}...`);
});
