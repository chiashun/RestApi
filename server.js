const express = require('express');

const app = express();

app.use(express.json());

//controller
const postController = require('./controllers/postController');
const searchController = require('./controllers/searchController');

//search api
app.get('/search', searchController.search);

//post api
app.get('/get-post', postController.getPost);

//run in port 3000
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})