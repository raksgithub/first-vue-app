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
      <div v-if="!bulk">
        <input type="text" v-model="newTodo" placeholder="Enter new todo" />
      </div>
      <div v-else v-for="(bulkTodo, index) in bulkTodos" :key="index">
        <input type="text" v-model="bulkTodos[index]" v-bind:placeholder="'Enter Bulk Todo ' + (index + 1)" />
      </div>
      <br />
      <br />
      <button @click="addTodo">{{ bulk ? 'Bulk Add' : 'Add Todo' }}</button>&nbsp;
      <button @click="removeTodo">Remove Todo</button>&nbsp;
      <button @click="reset">Reset</button>
      <br />
      <br />
      <button @click="addInBulk" v-if="!bulk">Add In Bulk</button>&nbsp;
      <button @click="removeAll">Remove All</button>
    </ul>
  </div>
</template>

<script>
import Todo from "./todo/Todo";
import { v4 } from "uuid";
import _cloneDeep from "lodash/cloneDeep";

export default {
  name: "Todos",
  components: {
    Todo
  },
  data: () => ({
    newTodo: "",
    todos: [
      { id: v4(), text: "Learn Vue", completed: false },
      { id: v4(), text: "Go to School", completed: false },
      { id: v4(), text: "Buy some breads", completed: false },
      { id: v4(), text: "Eat your breakfast", completed: true }
    ],
    done: 0,
    todos_copy: [],
    bulk: false,
    addInBulkCount: 0,
    bulkTodos: []
  }),
  created() {
    // Shallow recursive copy of todos
    this.todos_copy = _cloneDeep(this.todos);
    this.done = this.todos.filter(todo => todo.completed).length;
  },
  updated() {
    this.done = this.todos.filter(todo => todo.completed).length;
  },
  methods: {
    addTodo: function() {
      if (!this.bulk) {
        // Non Bulk add
        if (this.newTodo !== "") {
          this.todos.push({
            id: v4(),
            text: this.newTodo,
            completed: false
          });
          this.newTodo = "";
        } else {
          alert("Todo can't be empty");
        }
      } else {
        // Bulk Add
        const newTodos = this.bulkTodos.map(bulkTodo => ({
          id: v4(),
          text: bulkTodo,
          completed: false
        }));
        this.todos = [...this.todos, ...newTodos];
        this.bulk = false;
        this.bulkTodos = [];
      }
    },
    removeTodo: function() {
      this.todos.pop();
    },
    removeAll: function() {
      this.todos = [];
    },
    reset: function() {
      // Shallow recursive copy of todos_copy
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
    },
    addInBulk: function() {
      const count = Number(prompt("How many ?"));
      this.bulk = true;
      this.addInBulkCount = count;
      for (let i = 0; i < count; i++) {
        this.bulkTodos.push("");
      }
    }
  }
};
</script>

<style>
strong {
  text-decoration: underline;
}
</style>