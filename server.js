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

// Adds a new note to the collection and returns the newly created note to the client in JSON format.
app.post("/api/notes", (req, res) => {
	// Validate the request body
	const schema = Joi.object({
		title: Joi.string().required(),
		text: Joi.string().required(),
	});
	const { error } = schema.validate(req.body, { abortEarly: false });

	// Return a 400 Bad Request response if we're missing any required fields.
	if (error)
		return res
			.status(400)
			.json({ status: "error", message: error.details.map(e => e.message) });

	// Create a new note object to add to the collection.
	const note = {
		id: uuidv4(),
		title: req.body.title,
		text: req.body.text,
	};

	try {
		// Read the datastore file and add the new note to the collection.
		fs.readFile(dbFilename, (err, data) => {
			// Handle any error
			if (err) throw err;

			let notes = [];
			// Attempt to parse any existing notes
			if (data.length > 0) notes = JSON.parse(data);
			// Add the new note to the collection, write the updated datastore file, and return a 200 OK response with the new note back to the client.
			notes.push(note);
			writeFile(JSON.stringify(notes, null, 2));
			res.status(200).json({ status: "success", body: note });
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: "error", message: "Error creating note" });
	}
});

// Deletes a note based on a given ID value.
app.delete("/api/notes/:id", (req, res) => {
	try {
		// Read the datastore file. Locate the note based on the given ID.
		fs.readFile(dbFilename, (err, data) => {
			// Throw any error up to a higher level.
			if (err) throw err;

			let notes = [];
			// Attempt to parse any existing notes
			if (data.length > 0) notes = JSON.parse(data);
			// Find the note with the given 'id'
			const note = notes.find(n => n.id === req.params.id);
			// If a note with the given 'id' wasn't found, reject the request with a 404 Bad Request.
			if (!note)
				return res.status(404).json({
					status: "error",
					message: `The note with ID '${req.params.id}' was not found.`,
				});

			// If we found the note, remove it from the collection, write the updated datastore file, and return a 200 OK response with the deleted note back to the client.
			const index = notes.indexOf(note);
			notes.splice(index, 1);
			writeFile(JSON.stringify(notes, null, 2));
			res.status(200).json({ status: "success", body: note });
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: "error", message: "Error deleting note" });
	}
});

// Default route handler to display the 'index.html' page in the browser.
app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "public/index.html"))
);

// Start our express server listening on the given PORT.
app.listen(PORT, () =>
	console.log(`Server is listenting at http://localhost:${PORT}...`)
);
