const express = require("express");
const server = express();


server.use(express.json())

const projects = [];

function validateProjectExists(req, res, next) {
    const { id } = req.params;
    const index = projects.findIndex(element => element.id == id);

    if (index > -1) {
        req.index = index;
        return next();
    }

    res.json({ message: `Project not found with id> ${id}` });
    return res.status(404).end();
}

function countRequests(req, res, next) {
    console.count('REQUEST_COUNT');
    return next();
}

server.post('/projects', countRequests, (req, res) => {
    const { id, title } = req.body;
    projects.push({ id, title, tasks: [] });
    return res.status(201).json(projects[projects.length - 1]);
});

server.get('/projects', countRequests, (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', countRequests, validateProjectExists, (req, res) => {
    const { title } = req.body;
    const { index } = req;
    projects[index].title = title;
    return res.json(projects[index]);
});


server.delete('/projects/:id', countRequests, validateProjectExists, (req, res) => {
    const { index } = req;
    projects.splice(index, 1);
    return res.send();
});

server.post('/projects/:id/tasks', countRequests, validateProjectExists, (req, res) => {
    const { index } = req;
    const { title } = req.body;
    projects[index].tasks.push(title);
    return res.json(projects[index]);
});

server.listen(3000);



