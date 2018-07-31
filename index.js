const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json()); // parse json objects in the body of a request

const courses = [
    { 'id': 1, 'name': 'Accounting' },
    { 'id': 2, 'name': 'Computer Sci' },
    { 'id': 3, 'name': 'Biology' },
    { 'id': 4, 'name': 'Maths' },
    { 'id': 5, 'name': 'Geology' },
    { 'id': 6, 'name': 'Medicine' }
];

// Root route
app.get('/', (req, res) => {
    res.send("Hello World again!");
})

// GET - Get list of courses route
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//GET - Get a single course route
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (course) return res.status(404).send(`Course with id ${req.params.id} was not found!`);  //404
    res.send(course);
    
})

// POST - Create a new course
app.post('/api/courses', (req, res) => {
   
    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message) // 400 - Bad Request

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

//PUT - Update a course
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} was not found!`);  //404 - Not found


    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message) // 400 - Bad Request

    course.name = req.body.name;
    res.send(course);
})

//DELETE - Delete a course
app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} was not found!`);  //404 - Not found
    
    //Now delete course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
    
});


//Port - Config
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`))


/**
 * Util function to validate request for a course
 * @param {*} course 
 */
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}