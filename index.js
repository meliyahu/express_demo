const express = require('express');
const app = express();

// Root route
app.get('/', (req, res) => {
 res.send("Hello World");
})

// Courses route
app.get('/api/courses', (req, res) => {
 res.send([{'id': 1, 'course': 'Accounting','desc': 'Counting the beans'},{'id': 2, 'course': 'Computer Sci','desc': 'Abaccas things'}]);
});

//Single course route
app.get('/api/courses/:id', (req, res) => {
    console.log('id=' + req.params.id);
    res.send({'id': 1, 'course': 'Accounting','desc': 'Counting the beans'});
})
//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`))