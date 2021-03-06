<h1 align="center">Note Taker Using Express.js</h1>
<h2 align="center">Express.js, Routing and Heroku</h2>

## Description

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](http://choosealicense.com/licenses/mit/)

This application allows a user to write and save notes using an Express.js back end server and is deployed on [Heroku](https://frozen-garden-12510.herokuapp.com/).

![A screenshot of an application with a title of "Note Taker", an existing note titled "Coffee" and fields for creating a new note labeled "Note Title" and "Note Text".](./src/Note-Taker.jpg)

## User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Questions](#questions)

## Installation

This application makes use of the following Node.js packages:

- [Express](https://www.npmjs.com/package/express) for the back end server
- [Uuid](https://www.npmjs.com/package/uuid) for generating unique identifiers for the notes
- [Joi](https://www.npmjs.com/package/joi) for data validation

Run `npm i` with the included `packages.json` file to install the required packages.

## Usage

After clicking the "Get Started" button, the user is presented with a list of any existing notes that they created previously with the option to delete existing notes. Clicking on an existing note will reveal the details of that note. They are also provided with a template to create and save a new note to the list.

## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](http://choosealicense.com/licenses/mit/)

This application is covered under the MIT license. Information about this license can be found [here](http://choosealicense.com/licenses/mit/).

## How to Contribute

[MichaelHermes](https://github.com/MichaelHermes)

## Questions?

Find me on [Github](https://github.com/MichaelHermes) or email me at [mikehermes87@gmail.com](mailto:mikehermes87@gmail.com).
