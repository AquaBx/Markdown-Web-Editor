<script lang="ts">
    export let ref
    export let render_func

    function save(){
        ref.innerHTML = render(ref.value)
        ref = ""
        render_func = ""
    }

    function render(text){
        try{
            let value = render_func(text)
            return value
        }
        catch(e:Error){
            return e.toString()
        }
    }
</script>

{#if ref}
<div class="modal">
    <div class="flex">
        <div>{@html render(ref.value)}</div>
        <textarea spellcheck="false" bind:value={ref.value}></textarea>
    </div>
    <button on:click={save}>Save</button>
</div>
{/if}
<style scoped>

.modal {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    height: 400px;
    width: 800px;
    background: var(--background);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgb(0 0 0 / 10%);
    border-radius: 1em;
    overflow: hidden;
}

.modal > .flex {
    display: flex;
    height: 100%;
}

.modal > .flex > * {
    all:unset;
    flex:1;
    resize: none;
    overflow: auto;
    padding:1em;
}

.modal > .flex > *:nth-child(1) {
    border-right: 1px solid rgba(255, 255, 255, 0.3);
}

.modal > button {
    bottom:10px;
    right:10px;
    position: absolute;
}

</style>