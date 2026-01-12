const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router
  .route('/')
  .get(todoController.getTodos)
  .post(todoController.addTodo);

router
  .route('/:id')
  .put(todoController.updateTodo)
  .delete(todoController.deleteTodo);
          
router.patch('/:id/complete', todoController.completeTodo);

module.exports = router;
