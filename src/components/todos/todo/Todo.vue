<template>
  <div>
    <li>
      <span
        @click="onTodoClick(`Todo: ${todo.text}`)"
        :style="{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'grey' : 'black' }"
      >{{ todo.text }}</span>
      &nbsp;
      <button @click="onToggleTodo(todo.id)">{{ todo.completed ? '-' : '+' }}</button>
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
</style>