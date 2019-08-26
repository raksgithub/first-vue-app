<template>
  <div>
    <ul>
      <strong>Total ({{ todos.length }}), Done ({{ done }}), Pending ({{ todos.length - done }})</strong>
      <div
        v-if="todos.length === 0"
        class="empty-todo"
      >Todo list is empty. Please add some todos in it.</div>
      <div v-else class="empty-todo">
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          :onTodoClick="handleTodoClick"
          :onToggleTodo="toggleTodo"
        />
      </div>
      <div v-if="!bulk">
        <input type="text" v-model="newTodo" placeholder="Enter new todo" class='new-todo' />
      </div>
      <div v-else v-for="(bulkTodo, index) in bulkTodos" :key="index" class="bulk-todo">
        <div>
          <input type="text" v-model="bulkTodos[index]" :placeholder="`Enter Todo ${index + 1}`" class='new-todo' />
          <button @click="removeFromBulk(index)" class='bulk-x'>x</button>
        </div>
      </div>
      <div class="todo-operation">
        <div class="todo-addition">
          <span>Addition:&nbsp;</span>
          <button @click="addTodo" :disabled="bulk">Add Todo</button>&nbsp;
          <button @click="addInBulk" :disabled="newTodo !== ''">Bulk Add</button>
        </div>
        <div class="todo-deletion">
          <span>Deletion:&nbsp;</span>
          <button @click="removeTodo">Remove Todo</button>&nbsp;
          <button @click="removeInBulk">Bulk Remove</button>&nbsp;
          <button @click="removeAll">Remove All</button>
        </div>
        <div class="todo-reset">
          <span>Reset:&nbsp;</span>
          <button @click="reset">Reset</button>
        </div>
      </div>
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
    done: 0,
    todos_copy: [],
    bulk: false,
    bulkTodos: [],
    todos: [
      { id: v4(), text: "Learn Vue", completed: false },
      { id: v4(), text: "Go to School", completed: false },
      { id: v4(), text: "Buy some breads", completed: false },
      { id: v4(), text: "Eat your breakfast", completed: true }
    ]
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
      if (!this.bulk) {
        const count = Number(prompt("How many ?"));
        if (count === 0) {
          return;
        }
        this.bulk = true;
        for (let i = 0; i < count; i++) {
          this.bulkTodos.push("");
        }
      } else {
        // Bulk Add
        let emptyTodos = 0;
        this.bulkTodos.forEach(todo => {
          if (todo === "") {
            emptyTodos++;
          }
        });
        if (emptyTodos > 0) {
          alert(
            `${emptyTodos} ${emptyTodos > 1 ? "todos are" : "todo is"} empty`
          );
          return;
        }
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
    removeInBulk: function() {
      const count = Number(prompt("How many ?"));
      if (count === 0) {
        return;
      }
      this.todos.splice(-count);
    },
    removeFromBulk: function(index) {
      this.bulkTodos.splice(index, 1);
    }
  }
};
</script>

<style>
strong {
  text-decoration: underline;
}
span {
  font-weight: bold;
}
.empty-todo {
  margin: 10px 0;
}

.todo-operation {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;
  padding: 10px;
}

.todo-operation button {
  border: none;
  cursor: pointer;
  border-radius: 5px;
  height: 35px;
  width: 105px;
}

.todo-operation button:hover {
  color: rgb(141, 92, 130);
  font-size: 15px;
}

.new-todo {
  border-radius: 5px;
  height: 30px;
  text-align: center;
  color: black;
  border: 1px solid rgb(65, 150, 189);
  width: 200px;
}

.bulk-x {
  border: none;
  cursor: pointer;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  font-size: 20px;
  margin: 0 0.3rem;
}

.bulk-todo {
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>