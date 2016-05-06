# Take Me Home App - Version 1.0 - May 6, 2016

## Overview and Motivation

The Take Me Home App was created in an effort to connect animals in rescues and shelters with potential new forever homes. After researching the applications that are currently available, a recurring theme became painfully clear. There are no pet adoption apps on the market that provide a clean, seamless interface. By creating 'Take Me Home', we hope that we can help all homeless pets find a life long love connection with their humans. 


## Technologies

* JavaScript
* jQuery
* $.ajax
* Node.js
* JSON
* Express
* EJS Template
* HTML
* CSS
* MongoDB
* Mongoose
* Passport
* Passport Sessions

## Installation Dependencies

* node.js - This was the backbone for our application, allowing for our use of npm dependencies.

* Express and EJS - We relied on Express to provide the framework for our app and EJS for the 
  our views template.

* MongoDB and Mongoose - We utilized Mongoose to create our User and Likes Schemas, which we 
  stored in MongoDB. Our User Schema was utilized not only for Authentication purposes, but 
  also, to link users to their liked pets, via a melding of data from the User Schema and our
  petFinder API.

* Passport Local and Passport Sessions - We utilized these dependencies in order to create our
  user authentication for log-in and session creation.


## API Reference

This program utilizes our internal APIs, written by Team CatDog, in combination with the petFinder API, which can be found at https://www.petfinder.com/developers/api-docs


