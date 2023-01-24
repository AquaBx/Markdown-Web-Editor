<script lang="ts">
  import Editor from './lib/Editor.svelte'
  import Menu from './lib/Menu.svelte'
</script>

<main>
  <Menu />
  <Editor />

</main>

<style scoped>
  main{
    display: flex;
    height: var(--vh);
  }
</style>