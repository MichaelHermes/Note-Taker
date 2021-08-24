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

// A helper function to write a set of notes to the 'db.json' datastore.
const writeFile = data => {
	fs.writeFile(dbFilename, data, err => {
		if (err) throw err;
		console.log("Data successfully written to file");
	});
};

// Displays the 'notes.html' page in the browser.
app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Returns all notes to the client in JSON format.
app.get("/api/notes", (req, res) => {
	fs.readFile(dbFilename, (err, data) => {
		if (err) throw err;
		if (data.length > 0) return res.json(JSON.parse(data));
		return res.json([]);
	});
});

// Adds a new note to the list of notes and returns the newly added note to the client in JSON format. Returns a 400 Bad Request if any required fields are missing from the request.
app.post("/api/notes", (req, res) => {
	// Validate the request body
	const schema = Joi.object({
		title: Joi.string().required(),
		text: Joi.string().required(),
	});
	const { error } = schema.validate(req.body, { abortEarly: false });

	// Return a 400 Bad Request if we're missing required fields and stop processing the POST
	if (error)
		return res.status(400).json({ error: error.details.map(e => e.message) });

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
		// Attempt to parse any existing notes
		let notes = [];
		if (data.length > 0) notes = JSON.parse(data);
		// Add the new note to the datastore and return the new note to the client
		notes.push(note);
		writeFile(JSON.stringify(notes, null, 2));
		res.json(note);
	});
});

// Deletes a note based on a given ID value.
app.delete("/api/notes/:id", (req, res) => {
	// Locate the note based on the given ID
	fs.readFile(dbFilename, (err, data) => {
		// Handle any error
		if (err) throw err;
		// Attempt to parse any existing notes
		let notes = [];
		if (data.length > 0) notes = JSON.parse(data);
		// Find the note with the given 'id'
		const note = notes.find(n => n.id === req.params.id);
		if (!note)
			return res
				.status(404)
				.json({ error: `The note with id '${req.params.id}' was not found.` });
		// Remove the note from the datastore
		const index = notes.indexOf(note);
		notes.splice(index, 1);
		writeFile(JSON.stringify(notes, null, 2));
		// Return the deleted note to the client
		res.json(note);
	});
});

// Default route handler to display the 'index.html' page in the browser.
app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "public/index.html"))
);

// Start our express server listening on the given PORT.
app.listen(PORT, () =>
	console.log(`Server is listenting at http://localhost:${PORT}...`)
);
