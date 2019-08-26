<template>
  <div>
    <ul>
      <strong>Total ({{ todos.length }}), Done ({{ done }}), Pending ({{ todos.length - done }})</strong>
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :onTodoClick="handleTodoClick"
        :onToggleTodo="toggleTodo"
      />
      <br />
      <input type="text" v-model="newTodo" placeholder="Enter new todo" />
      <br />
      <br />
      <button @click="addTodo">Add Todo</button>&nbsp;
      <button @click="removeTodo">Remove Todo</button>&nbsp;
      <button @click="reset">Reset</button>
      <br />
      <br />
      <button @click="removeAll">Remove All</button>
    </ul>
  </div>
</template>

<script>
import Todo from "./todo/Todo";
import { v4 } from "uuid";
import _cloneDeep from 'lodash/cloneDeep';

export default {
  name: "Todos",
  components: {
    Todo
  },
  data: function() {
    return {
      newTodo: "",
      todos: [
        { id: v4(), text: "Learn Vue", completed: false },
        { id: v4(), text: "Go to School", completed: false },
        { id: v4(), text: "Buy some breads", completed: false },
        { id: v4(), text: "Eat your breakfast", completed: true }
      ],
      done: 0,
      todos_copy: []
    };
  },
  created() {
    this.todos_copy = _cloneDeep(this.todos);
    this.done = this.todos.filter(todo => todo.completed).length;
  },
  updated() {
    this.done = this.todos.filter(todo => todo.completed).length;
  },
  methods: {
    addTodo: function() {
      if (this.newTodo !== "") {
        this.todos.push({
          id: v4(),
          text: this.newTodo,
          completed: false
        });
        this.newTodo = "";
      } else {
        alert("Please enter a valid todo");
      }
    },
    removeTodo: function() {
      this.todos.pop();
    },
    removeAll: function() {
      this.todos = [];
    },
    reset: function() {
      this.todos = _cloneDeep(this.todos_copy);
    },
    handleTodoClick: function(message) {
      alert(message);
    },
    toggleTodo: function(todoId) {
      this.todos = this.todos.map(todo => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    }
  }
};
</script>

<style>
strong {
  text-decoration: underline;
}
</style>