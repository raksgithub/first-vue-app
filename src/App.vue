<template>
  <div id="app">
    <HelloWorld msg="Todo List" />
    <Todos />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Todos from './components/todos/Todos';

export default {
  name: "app",
  components: {
    HelloWorld,
    Todos
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
