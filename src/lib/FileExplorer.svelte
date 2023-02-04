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

<div class="container glass_component">
    <div class="flexbox">
        {#each files as file}
        <a href="/doc#{file.name}">
            <Icon type={file.name?.split(".").at(-2)} ></Icon>
            {file.name}
        </a>
        {/each}
    </div>
</div>

<style scoped>
    .container > .flexbox{
        display: flex;
	    flex-direction: column;
        padding:1cm;
        gap:1em;
    }
    .container > .flexbox > a {
        display: flex;
        align-items: center;
    }
</style>
