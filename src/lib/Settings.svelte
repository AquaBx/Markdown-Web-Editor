<script lang="ts">
    import globals from '../globals';
</script>

<div class="fileexp glass_component">
    {#each Object.keys(globals.contents) as key}
        <div>
            <label for={key}>{key}</label>
            <input id={key} on:blur={async() => {await globals.save()}} bind:value={globals.contents[key]}>
        </div>
    {/each}
</div>

<style scoped>

    .fileexp{
        margin:auto;

        height: 80%;
        width:21cm;
        overflow: auto;
    }
</style>
