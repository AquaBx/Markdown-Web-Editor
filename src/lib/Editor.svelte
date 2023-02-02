<script lang="ts">
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import SimpleImage from '@editorjs/simple-image'
import {readTextFile, writeTextFile} from '@tauri-apps/api/fs'

import Katex from '../plugins/katex'
import globals from '../globals';
import export_file_pdf from '../plugins/export'

let file = document.location.hash.substring(1);
let directory = globals.contents["directory"]
let title = "";
let editor:EditorJS

(async function(){
  let saved_data = {blocks:[]};
  if (file !== ""){
    title = file.split(".")[0]
    let text = await readTextFile(directory+"/"+file)
    saved_data = JSON.parse( text )
  }

  editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      header: {
        class: Header,
        config: {
          levels: [1,2,3],
          defaultLevel: 1
        }
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: { defaultStyle: 'unordered' }
      },
      table: Table,
      underline: Underline,
      math:Katex,
      image:SimpleImage,
    },
    data:saved_data
  });

})()

function save(e){
  editor.save().then((outputData) => {
    let path = directory + "/" + title + ".doc.json"
    writeTextFile(path,JSON.stringify(outputData))
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
}

function export_file(){
  export_file_pdf(title,document.querySelector("#editorjs"))
}

</script>
<div class="container">
  <div id="toolbar" class="glass_component">
    <input id="title" bind:value="{title}" placeholder="Enter a filename">
    <a href="#." on:click={save}>save</a>
    <a href="#." on:click={export_file}>export</a>
  </div>


  <div id="editorjs" class="glass_component"></div>
</div>

<style scoped>
    .container{
      margin:auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: calc( 100% - 2cm );
      gap:1em;
      width : clamp(0px,calc(100vw - 2cm - 2px),21cm);
    }
    #editorjs{
      flex:1;
      overflow: scroll;
    }
    input{
      all: unset;
    }

</style>
