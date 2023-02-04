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
    }
</style>
