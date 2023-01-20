<script lang="ts" setup>
  import { ref } from 'vue';
  import Line from '../components/Line.vue'


  let components = ref([
    ref("")
  ])

  function pressed(e){
    let id = parseInt(e.target.parentElement.id)
    let target = components.value[id].value
    let pos = document.getSelection()?.focusOffset
    if (e.key === "Enter"){
      e.preventDefault();
      
      let val = target.slice(pos,target.length)
      components.value.splice(id+1,0,ref(val))
      components.value[id].value = target.slice(0,pos)
    }
    else if (e.key === "Delete"){
      if ( pos === target.length){
        components.value[id].value += components.value[id+1].value
        components.value.splice(id+1,1)
        console.log(components)
      }
    }
    
    else if (e.key === "ArrowRight"){}
    else if (e.key === "ArrowLeft"){}
    else if (e.key === "ArrowUp"){}
    else if (e.key === "ArrowDown"){}
    
    else if (e.key === "Backspace"){
      
      if ( pos === 0){
        components.value[id-1].value += target
        components.value.splice(id,1)
      }
    }
  }

</script>

<template>
  <div id="editor" class="editor" @keydown="pressed">
    <template v-for="(value,index) in components">
      <Line :text="value" :id="index"/>
    </template> 
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
