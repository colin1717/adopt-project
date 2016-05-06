# Take Me Home App - Version 1.0 - May 6, 2016

## Live Link to Take Me Home Application:
   https://secret-scrubland-79329.herokuapp.com/

## Overview and Motivation

The Take Me Home App was created in an effort to connect animals in rescues and shelters with potential new forever homes. After researching the applications that are currently available, a recurring theme became painfully clear. There are no pet adoption apps on the market that provide a clean, seamless interface. By creating 'Take Me Home', we hope that we can help all homeless pets find a life long love connection with their humans. 


## Our Approach

We approached creating this app with the MVP in mind. We utilized a MOSCOW strategy for develpment.

    Mo - Must Have: What does this app absolutely HAVE TO HAVE in order to function properly
    S -  Should Have: This functionality is what the app should have, based on what a user
         expects to see in a pet adoption app. This is baesd on the products that have already 
         paved the way.. Users have seen certain features and this is their "norm".
    Co - Could Have: These are features that we could have. These are the "bells and whistles"
         features that could be added to increase the WOW factor of our app. These will only be
         implemented after the Must Haves and Should Haves are fleshed out, and solidly working.
    W -  Won't Have: Generally, these are the ideas akin to "Let's create an app that's a mash up
         of Facebook and.. all of Google... and let's do it in a couple of days!" In otherwords, 
         these are features that are placed in the Ice Box. 
         
## User Flow

![alt tag](/takeMeHomeUFScaled.png)
## Wire Frames

![alt tag](/viewAllPets.png)
![alt tag](/petProfile.png)
![alt tag](/myLikedPets.png)
![alt tag](/shelterInfo.png)
## Technologies

* JavaScript - JavaScript is the programming language of HTML and the Web.

* jQuery -  jQuery is a fast, small, and feature-rich JavaScript library. It makes things like 
            HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

* $.ajax -  AJAX stands for Asynchronous JavaScript and XML. In a nutshell, it is the use of 
            the XMLHttpRequest object to communicate with server-side scripts. It can send as well as receive information in a variety of formats, including JSON, XML, HTML, and even text files.

* JSON -    JSON is an open-standard format that uses human-readable text to transmit data 
            objects consisting of attribute–value pairs.

* Node.js - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript Engine. 
            As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications. Documentation and Downloads for Node.js are availble on the 
            Node.js website - https://nodejs.org/en/

* npm -     npm is the default package manager for the JavaScript runtime environment Node.js. 

* Express - Express is a fast, unopinionated, minimalist web framework for node.

* EJS -     EJS is a client-side templating language.

* HTML -    HTML is a markup language for describing web documents (web pages). HTML stands 
            for Hyper Text Markup Language. A markup language is a set of markup tags. HTML documents are described by HTML tags. Each HTML tag describes different document content.

* CSS -     Cascading Style Sheets (CSS) is a style sheet language used for describing 
            the presentation of a document written in a markup language.

* MongoDB - MongoDB is a cross-platform document-oriented database. Classified as a NoSQL 
            database, MongoDB avoids the traditional table-based relational database structure in favor of JSON-like documents with dynamic schemas (MongoDB calls the format BSON), making the integration of data in certain types of applications easier and faster. MongoDB is developed by MongoDB Inc. and is published as free and open-source software under a combination of the GNU Affero General Public License and the Apache License. As of July 2015, MongoDB is the fourth most popular type of database management system, and the most popular for document stores.

* mLab -    mLab is a fully managed cloud database service for MongoDB.

* Mongoose - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous
             environment.

* Passport -    Passport is authentication middleware for Node.js. Extremely flexible and 
                modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more. Documentation for passport
                can be found at - http://passportjs.org/docs

* Passport-Local -  This module lets you authenticate using a username and password in your 
                    Node.js applications. By plugging into Passport, local authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.

* Heroku -  Heroku is a cloud platform that lets companies build, deliver, monitor and scale apps — we're the fastest way to             go from idea to URL, bypassing all those infrastructure headaches.

* Git and GitHub - As Git is a distributed version control system, it can be used as a server out of the box. Dedicated 
                  Git server software helps, amongst other features, to add access control, display the contents of a Git repository via the web, and help managing multiple repositories.


## Installation Dependencies

* node.js - This was the backbone for our application, allowing for our use of npm dependencies.
            node.js may be downloaded at - https://nodejs.org/en/

* Express and EJS - We relied on Express to provide the framework for our app and EJS for the 
  our views template.

  For documentaion on Express, visit their site at: http://expressjs.com/

  $ npm install express --save

  For documentation on EJS, visit - http://ejs.co/

  $ npm install ejs

* MongoDB, mLab and Mongoose - We utilized Mongoose to create our User and Likes Schemas, which we 
  stored in MongoDB. Our User Schema was utilized not only for Authentication purposes, but 
  also, to link users to their liked pets, via a melding of data from the User Schema and our
  petFinder API.

  Please note that you will need to create an account with MongoDB at - https://www.mongodb.com/

  For our specific purposes, we chose mLab to host our MongoDB. You can find sign up for an account and view their Quick-Start guide at - http://docs.mlab.com/

  If you have not already done so, you will need to initialize your project before installing the mongodb package

  $npm init
  npm install mongodb --save

  For documentation on Mongoose, please visit - http://mongoosejs.com/

  $ npm install mongoose

* Passport and Passport-Local - We utilized these dependencies in order to create our
  user authentication strategy.

  For documentation on the passport package, visit - https://www.npmjs.com/package/passport

  $ npm install passport

  For documentation on passport-local package, visit - https://www.npmjs.com/package/passport-local

  $ npm install passport-local


## API Reference

This program utilizes our internal APIs, developed by Team CatDog, as well as the Petfinder API.

The Petfinder API gives developers access to access Petfinder's database of over 300,000 adoptable pets and 11,000 animal welfare organizations (AWO). In addition to searching for adoptable pets on the Petfinder.com web site, you can use the API to create your own dynamic pet web sites or applications, using the same data we use on Petfinder.com.

## Challenges 

As a team, one of our challenges out of the gate was with our the first API we attempted to utilize. Lack of documentation and explanation of requirements to utilize the API, was a major hurdle for us. Luckily, we found the petfinder API, which has much better documentation.

Another major hurdle was learning how to navigate the team's code. It became very apparent how important readable code is. This was a valuable learning experience, early on. Luckily, our team wrote relatively clean code, so there weren't many issues.

## What's Next for Take Me Home? - Future Development Plans
   
   Where do we go from here, you might ask? Well, for starters... we'd like to include a way for users to donate to animals
   that they would like to help, but can't adopt. The donate feature would allow users to contribute a certain amount that would be sent to the "hosting" shelter or rescue group. This contribution will pay for the animal's needs, while they're in their temporary home, such as food, medical needs or even toys (Hey, it's about the creature comforts too!). 
   
   We'd also like to implement a volunteer feature, where users are able to sign up and help out at shelters and rescue groups in need of some extra hands. This feature would include a calendar, where Administrators of Rescues and Shelters could post times/days they need help and volunteers could click and sign up for a shift on the designated days/times.
   
   Marketing, Marketing, Marketing! We'd like to provide an even better experience for our users, so that we can facilitate animals finding loving homes! NO PET LEFT BEHIND!
   






