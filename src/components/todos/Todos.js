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
        addTodo: function () {
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
        removeTodo: function () {
            this.todos.pop();
        },
        removeAll: function () {
            this.todos = [];
        },
        reset: function () {
            // Shallow recursive copy of todos_copy
            this.todos = _cloneDeep(this.todos_copy);
        },
        handleTodoClick: function (message) {
            alert(message);
        },
        toggleTodo: function (todoId) {
            this.todos = this.todos.map(todo => {
                if (todo.id === todoId) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
        },
        addInBulk: function () {
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
        removeInBulk: function () {
            const count = Number(prompt("How many ?"));
            if (count === 0) {
                return;
            }
            this.todos.splice(-count);
        },
        removeFromBulk: function (index) {
            this.bulkTodos.splice(index, 1);
        }
    }
};