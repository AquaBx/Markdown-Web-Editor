<script>
    import { Router, Link, Route } from "svelte-routing";
    export let components
    export let url = "";
</script>


<Router url="{url}">
    {#each components as component}
        <Route path={component["path"]}>{component["node"]}</Route>
    {/each}
</Router>