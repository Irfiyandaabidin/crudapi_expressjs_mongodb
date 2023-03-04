const Todo = require('../Model/Todo')

// get todo dengan async/await
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    }
    catch (err) {
        res.send(err);
    }; 
};

// create todo dengan promise
const createTodo = (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
    });

    todo.save()
    .then(todo => {
        res.json(todo);
    })
    .catch(err => {
        res.send(err);
    })
};

// Update todo
const updateTodo = async (req, res) => {
    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: req.params.todoID },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
          },
        },
        { new: true }
      );
      res.json(updatedTodo);
    } catch (err) {
      res.send(err);
    }
  };

const deleteTodo = (req, res) => {
    Todo.deleteOne({ _id: req.params.todoID })
      .then(() => res.json({ message: "Todo Deleted" }))
      .catch((err) => res.send(err));
};
  
  

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
