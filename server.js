// const port = process.env.PORT || 5000;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// if (
//   process.env.NODE_ENV === `production` ||
//   process.env.NODE_ENV === `staging`
// ) {
//   app.use(express.static(`client/build`));
//   app.get(`*`, (req, res) => {
//     res.sendFile(path.join(__dirname + `/client/build/index.html`));
//   });
// }

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    'mongodb+srv://todolist:73QXAvvCUv2lcfL5@cluster0.3uxxf2t.mongodb.net/devtown?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    console.log('DB connected!!');
  })
  .catch(console.error);

// import todo Schema
const Todo = require('./models/todo');

app.get('/todos', async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});

//adding new todo post method
app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

app.delete('/todos/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get('/todos/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;

  todo.save();
  res.json(todo);
});

app.put('/todo/update/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.text = req.body.text;

  todo.save();

  res.json(todo);
});

app.listen(4001, () => {
  console.log('server up and running on port 4001');
});
