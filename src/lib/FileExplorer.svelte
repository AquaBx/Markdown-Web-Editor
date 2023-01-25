<script lang="ts">
    import {readDir} from '@tauri-apps/api/fs'
    import type {FileEntry} from '@tauri-apps/api/fs'
    import globals from '../globals';
    console.log(globals.contents)
    let files:FileEntry[]
    files = [];
    (async function() {
        files = await readDir(globals.contents["directory"])
    })()

</script>

<div class="fileexp glass_component">
    {#each files as file}
        <a href="/doc#{file.name}">{file.name}</a>
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
