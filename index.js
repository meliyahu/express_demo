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

// Courses route
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//Single course route
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        res.send(course);
    } else {
        res.status(404).send(`Course with id ${req.params.id} was not found!`);  //404
    }
})

// Post route - create a course
app.post('/api/courses', (req, res) => {
   
    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message) // 400 - Bad Request
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

//Put route - update a course
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send(`Course with id ${req.params.id} was not found!`);  //404 - Not found
        return;
    }

    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message) // 400 - Bad Request
        return;
    }

    course.name = req.body.name;
    res.send(course);
})

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`))


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}