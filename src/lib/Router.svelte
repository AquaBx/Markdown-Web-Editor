<script lang="ts">
    import { Router, Route } from "svelte-routing";

    type obj = {"path":String}

    export let components:obj[]
    export let url = "";
</script>


<Router url="{url}">
    {#each components as component}
        <Route path={component["path"]}></Route>
    {/each}
</Router>