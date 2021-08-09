# EventTrackerProject

## Full-Stack Spring/REST/JPA Project for Skill Distillery

## Overview
Welcome to EMET, the Electronic Music Event Tracker! This project will contain a
database of concerts, venues, and performers so that you may plan your next trip!
Along with having a supplied list of upcoming shows, EMET will also allow you, the
user, to add shows, edit existing shows, or even delete shows that have already passed.

## REST Endpoints

| Return Type   | Route                 | Functionality                  |
|---------------|-----------------------|--------------------------------|
| `List<Concert>`  |`GET api/concerts`        | Gets all concerts                 |
| `Post`        |`GET api/concerts/{concertId}`   | Gets one concert by id            |
| `Post`        |`POST api/concerts`       | Creates a new concert             |
| `Post`        |`PUT api/concerts/{concertId}`   | Replaces an existing concert by id|
| `void`        |`DELETE api/concerts/{concertId}`| Deletes an existing concert by id |

## Technologies Used
- Java
- RESTful API
- Javascript
- DOM
- AJAX
- JSON

## Lessons Learned(Pos/Neg)
Pos: So far I have implemented the REST Endpoints and this is just the beginning
of where EMET can go. I have learned so much since midterms and I am so excited to
see what I can produce and where this project will go.
UPDATE 1: This weekend we were tasked with implementing CRUD operations into the front end
dynamically using JS. I think I learned quite a bit about function structure as it pertains
to JS and really reinforced materials learned this past week.

Neg: No critique quite yet! Creating the REST Endpoints was smooth sailing. I'm sure
the headaches are yet to come when I want to implement all the cool features I have
floating around my mind for EMET. Looking forward to the challenge!
Update 1: This weekend my biggest challenge was using my front end to update and delete
existing data in my database. I seem to be struggling to find my ID value which is crucial
to either updating or deleting existing things in my database.  
