<script>
  import "../style.css";
  import _ from "../globals";
  import Icon from "../lib/Icon.svelte"
  let navigation_tools = [
      '',
      'doc',
      // 'draw',
      // 'calc',
      // 'deepl',
      'settings'
  ]
</script>
  
<div class="menu glass_component">
  {#each navigation_tools as component}
  <a href={"./" + component}>
    <Icon type={component}></Icon>
  </a>
  {/each}
</div>

<main>
  <slot />
</main>

<style scoped>

  main{
    display: flex;
    height: var(--vh);
  }

  .menu{
      bottom: 0;
      display: flex;
      flex-direction: column;
      gap:1em;
      padding:0.5em;
      margin: 1em 1em;
  

      position: absolute;
  }
  
  .menu a {
      color:var(--text);
      border-radius: 1.25rem;
      aspect-ratio: 1/1;
      width:3.5em;
      display: block;
      transition:0.1s;
      display: grid;
      place-items: center;
      border:1px solid transparent;
  }
  
  .menu a:hover{
      background: rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.3);
  }
  </style>
