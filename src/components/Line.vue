<script lang="ts" setup>
import { Icon } from '@iconify/vue';

let input = (e) => {
  let target = e.target

  if ( target.innerHTML === '' ) target.classList.add("empty")
  else target.classList.remove("empty")
}

let del = (e) => {
  e.target.parentNode.parentNode.remove()
}



</script>

<template>
    <div class="line">
        <Icon icon="carbon:overflow-menu-horizontal" />

        <div class="actions" tabindex="-1">
          <button @click="del">delete</button>
          <button @click="">insert before</button>
          <button @click="">insert after</button>
        </div>
        <div @input="input" class="input empty" tabindex="-1" placeholder="..." data-content-editable-leaf="true" contenteditable="true"></div>
    </div>
</template>

<style scoped>

.line {
  position: relative;
}

.line .input{
}

.actions{
  position: absolute;
  left:-50px;
  width:50px;
  aspect-ratio:1/1;

}
.actions *{
  display: none;
}

.actions:focus-within * {
  display: block;
}

.actions:hover::after {
  content:"show menu"
}



</style>