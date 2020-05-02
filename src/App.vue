<template>
  <div id="app">
    <Confirm></Confirm>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Confirm from "./components/Confirm";

  export default {
    name: 'App',

    components: {
      Confirm,
    },

  }

</script>

<style>
  body {
    box-sizing: border-box;
    margin: 0;
    font-family: 'arial';
  }

  a {
    color: black;
    font-weight: bold;
    text-decoration: none;
  }

  button,
  a.button-link {
    margin: 5px;
    background-color: white;
    border: 0;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: normal;
  }

  button:hover,
  a.button-link:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px;
  }

  textarea {
    width: 50%;
    padding: 10px;
  }

  input[type=text] {
    margin: 10px;
    padding: 5px;
    width: 50%;
  }

  hr {
    margin: 10px 0;
  }

  .container {
    padding: 10px;
    box-shadow: 0px 0px 5px;
    margin: 30px auto;
    width: 50%;
  }
</style>