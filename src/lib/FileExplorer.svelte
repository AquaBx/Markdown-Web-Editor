<script lang="ts">
    import {readDir} from '@tauri-apps/api/fs'
    import type {FileEntry} from '@tauri-apps/api/fs'
    import globals from '../globals';
    import Icon from './Icon.svelte';


    let files:FileEntry[]
    files = [];
    (async function() {
        files = await readDir(globals.contents["directory"])
    })()

</script>

<div class="fileexp glass_component">
    {#each files as file}
    <a href="/doc#{file.name}">
        <Icon type={file.name?.split(".").at(-2)} ></Icon>
        {file.name}
    </a>
    {/each}
</div>

<style scoped>

    .fileexp{
        margin:auto;
        display: flex;
        height: 80%;
        width:21cm;
        overflow: auto;
        flex-direction: column;
        gap:1em;
    }

    .fileexp a {
        display: flex;
        align-items: center;
        gap:1em;
    }
</style>
