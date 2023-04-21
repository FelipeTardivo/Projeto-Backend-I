const express = require("express");

const app = express();

app.use(express.json())

let Tasks = [
    {
        title: "Tarefa 1",
        description: "Esta é a tarefa 1",
        completed: false
    },
    {
        title: "Tarefa 2",
        description: "Esta é a tarefa 2",
        completed: true
    }
];

app.listen(8080, () => {
	console.log ("O server está ativo na porta 8080");
});

// GET (READ)
app.get('/tasks', (req, res) => {
    try {
        console.log(Tasks);
        res.send(Tasks);
    }catch (error) {
        console.error(error);
        res.status(500).send(`<h1>Erro Interno de servidor</h1>`);
    }
});

app.get('/tasks/:id', (req, res) => {
try {
    	const {id} = req.params; //desestruturação de objeto
        const index = id - 1; //ajuste do index da tarefa com o vetor
    	res.send(Tasks[index]);
    } catch (error) {
        console.error(error)
        res.status(500).send(`<h1>Erro Interno de servidor</h1>`)
        
    }
	
});

// POST (CREATE)
app.post('/Tasks', (req, res) => {
    try {
        const {title, description, completed} = req.body;
	    Tasks.push({title, description, completed})
	    res.send(Tasks);
    } catch (error) {
        console.error(error)
        res.status(500).send(`<h1>Erro Interno de servidor</h1>`);        
    }
	
});

// PUT (UPDATE)
app.put('/tasks/:id', (req,res) => {
    try {
        const {id} = req.params;
        const index = id - 1;
        const {title,description,completed} = req.body;
        Tasks[index] = {title,description,completed};
        res.send(`<h1>Tarefa atualizada</h1>`);
        console.log(Tasks);
    }catch (error) {
        console.error(error);
        res.status(500).send(`<h1>Erro Interno de servidor</h1>`);
    }
});

// DELETE
app.delete('/tasks/:id', (req,res) => {
    try {
        const {id} = req.params;
        const index = id - 1;
        Tasks.splice(index, 1);
        res.send(Tasks);
    }catch (error) {
        console.error(error);
        res.status(500).send("Erro interno de servidor");
    }
});

app.use(function (req, res) {
    res.status(404).send(`<h1> Droga! Página não encontrada!  </h1>`)
})