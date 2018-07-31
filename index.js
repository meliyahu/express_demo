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

    // console.log('id=' + req.params.id);

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        res.send(course);
    } else {
        res.status(404).send(`Course with id ${req.params.id} was not found!`);  //404
    }
})

// Post route - create a course
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    // console.log('result=' + JSON.stringify(result));
    if (result.error) {
        res.status(400).send(result.error.details[0].message) // 400 - Bad Request
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});


//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`))