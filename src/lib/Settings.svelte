<script lang="ts">
    import globals from '../globals';
</script>
<div class="container glass_component">
    
    <table >
        {#each Object.keys(globals.contents) as key}
            <tr>
            <td> {key} </td>
            <td>
                <textarea id={key} on:blur={async() => {await globals.save()}} bind:value={globals.contents[key]}/> 
                </td>
            </tr>
        {/each}
    </table>
</div>
<style scoped>
    .container > table{
        padding:1cm;
        width:100%;
    }

    textarea{
        background  :unset;
        font-family: unset;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 16px;
        color: var(--text);
        width: 100%;
        padding:1em;
        resize: vertical;
    }
</style>
