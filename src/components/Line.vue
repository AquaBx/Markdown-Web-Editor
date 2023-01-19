<script lang="ts" setup>

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
        <div class="actions">
          <button @click="del">delete</button>
        </div>
        <div @input="input" class="input empty" tabindex="-1" placeholder="..." data-content-editable-leaf="true" contenteditable="true"></div>
    </div>
</template>

<style scoped>

.line {
  display: flex;
}

.line .input{
  flex:auto;
}

</style>