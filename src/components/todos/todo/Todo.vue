<template>
  <div class='todo'>
    <li>
      <span
        @click="onTodoClick(`Todo: ${todo.text}`)"
        :style="{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'grey' : 'black' }"
      >{{ todo.text }}</span>
      &nbsp;
      <button class='button' @click="onToggleTodo(todo.id)">{{ todo.completed ? '-' : '+' }}</button>
    </li>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: Object,
    onTodoClick: Function,
    onToggleTodo: Function
  }
};
</script>

<style>
li {
  list-style: none;
}

.button {
  border: none;
  cursor: pointer;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  font-size: 20px;
}

.todo {
  margin: 0.3rem 0;
}
</style>