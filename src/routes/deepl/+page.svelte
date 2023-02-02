<script lang="ts">
    import * as deepl from 'deepl-node';
    import globals from '../../globals';
    import {fetch} from "@tauri-apps/api/http"
    import { init } from 'svelte/internal';
    const authKey = globals.contents["deeplkey"]


    const translator = new deepl.Translator(authKey);

    let text:String|deepl.TextResult = "";
    let translated_text:String|deepl.TextResult = "";
    let target_lang: deepl.TargetLanguageCode = "en-US"
    let source_lang: deepl.SourceLanguageCode = "fr"

    async function translate(){
        const result = await translator.translateText(text.toString(), source_lang, target_lang);
        translated_text = result
        console.log(result)
    }

    function switch_translate(){
        text = translated_text
        translate()
    }

</script>

<div class="container">
    <textarea id="text" bind:value="{text}" placeholder="Enter text"></textarea>
    <a href="#." on:click="{translate}">Translate</a>
    <a href="#." on:click="{switch_translate}">switch</a>
    <div id="translated">{translated_text}</div>
</div>


<style scoped>
</style>