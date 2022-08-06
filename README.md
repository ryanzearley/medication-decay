# Medication Decay
Visualize how medication decays in the body with an interactive graph! Built with Desmos API and plain HTML, CSS, and JS.

<img width="667" alt="image of medication decay application" src="https://user-images.githubusercontent.com/96708796/183257005-e8da9469-37cf-49cc-ab99-0ef839e874ad.png">

## Table of contents
* [Features](#features)
* [What I Learned](#what-i-learned)
* [Technologies](#technologies)
* [Special Thanks](#special-thanks)

## Features
* Interactive graph window
* Enter custom medication start/end date, dose, and half-life
* Input validation to ensure user enters correct values
* Equations are automatically calculated after user enters data

### Future Features
* Include search bar for medication half-lives

## What I Learned
* Adding `.addEventListener("input", function)` to an input and `setAttribute("min", value)` can be used to set the minimum date for a date input based on another date input (to ensure end date is after start date)
* Data inputs are not easily formatted
* `const date = new Date(input.value)` can be used to get date values from form
* `date2.getTime() - date1.getTime()` can be used to find the time difference between two dates (the result must be converted from milliseconds to days)
* During input validation, nesting can be prevented by returning rather than using an if/else structure
	
## Technologies
Project is created with:
* JavaScript (ES6)
* HTML 5
* CSS 3
	
## Special Thanks
* Thank you to Desmos for offering a free and interactive graph API for development
* [Link to API Documentation](https://www.desmos.com/api/)
