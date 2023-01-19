<script lang="ts" setup>

  import Line from '../components/Line.vue'
  
  let components = 3
</script>

<template>
  <div id="editor" class="editor">
    <component v-for="(index) in components" :key="index" :is="Line"/>
  </div>
</template>

<style>

  .editor {
    width : 21cm;
    height: 29.7cm;
    border: 1mm solid black;
    border-radius: 2mm;
    padding:1cm;
    margin: 50px auto;

  }
  span {
    width:100%;
    display: block;
  }
  .editor > *:focus{
    border: unset;
    outline: unset;
  }

  .input.empty::after {
    content: attr(placeholder);
    opacity: 0.5;
  }
</style>
