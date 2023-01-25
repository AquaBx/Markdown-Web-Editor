<script lang="ts">
    // import * as deepl from 'deepl-node';
    import globals from '../../globals';

    const authKey = globals.contents["deeplkey"]

    let text = "";
    let translated_text = "";
    let target_lang = ""
    let source_lang = ""

    async function translate(){
        let result = await fetch("https://api-free.deepl.com/v2/translate", {
          body: `text=${text}&target_lang=${target_lang}&source_lang=${source_lang}`,
          headers: {
            Authorization: `DeepL-Auth-Key ${authKey}:fx`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        });
        translated_text = await result.text
    }

    function switch_translate(){
        text = translated_text
        translate()
    }

</script>

<div class="container">
    <textarea id="text" bind:value="{text}" placeholder="Enter text"></textarea>
    <a on:click="{translate}">Translate</a>
    <a on:click="{switch_translate}">switch</a>
    <div id="translated">{translated_text}</div>
</div>


<style scoped>
</style>