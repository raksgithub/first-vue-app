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
      <input type="text" v-model="newTodo" placeholder="Enter new todo" @submit="addTodo" />
      <br />
      <br />
      <button @click="addTodo">Add Todo</button>&nbsp;
      <button @click="removeTodo">Remove Todo</button>&nbsp;
      <button @click="reset">Reset</button>
    </ul>
  </div>
</template>

<script>
import Todo from "./todo/Todo";
export default {
  name: "Todos",
  components: {
    Todo
  },
  data: function() {
    return {
      newTodo: "",
      todos: [
        { id: 1, text: "Learn Vue", completed: false },
        { id: 2, text: "Go to School", completed: false },
        { id: 3, text: "Buy some breads", completed: false },
        { id: 4, text: "Eat your breakfast", completed: true }
      ],
      done: 0
    };
  },
  mounted() {
      this.done = this.todos.filter(todo => todo.completed).length;
  },
  updated() {
      this.done = this.todos.filter(todo => todo.completed).length;
  },
  methods: {
    addTodo: function() {
      this.todos.push({
        id: this.todos.length + 1,
        text: this.newTodo,
        completed: false
      });
      this.newTodo = "";
    },
    removeTodo: function() {
      this.todos.pop();
    },
    reset: function() {
      if (this.todos.length !== 4) {
        this.todos.splice(4);
      }
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