<script lang="ts">
    import globals from '../globals';
</script>

<div class="fileexp glass_component">
    {#each Object.keys(globals.contents) as key}
        <div>
            <label>{key}</label>
            <input on:blur={globals.save()} bind:value={globals.contents[key]}>
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
