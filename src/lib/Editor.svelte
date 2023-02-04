<script lang="ts">
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import SimpleImage from '@editorjs/simple-image'
import {readTextFile, writeTextFile} from '@tauri-apps/api/fs'

import Katex from '../plugins/katex'
import Mermaid from '../plugins/mermaid'
import globals from '../globals';
import export_file_pdf from '../plugins/export'
import Preview from './Preview.svelte';

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
      image:SimpleImage,
      math:{
        class: Katex,
        config:{
          show_popup:show_popup,
        }
      },
      mermaid:{
        class: Mermaid,
        config:{
          show_popup:show_popup,
        }
      },
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

let popup_ref:HTMLElement
let popup_function:any

function show_popup(value:HTMLElement,sanitizer:any){
  popup_ref = value
  popup_function = sanitizer
  console.log(popup_ref)
}

</script>
<div class="container glass_component">
  <div id="toolbar" class="no-print">
    <input id="title" bind:value="{title}" placeholder="Enter a filename">
    <a href="#." on:click={save}>save</a>
    <a href="#." on:click={export_file}>export</a>
  </div>

  <Preview bind:ref={popup_ref} bind:render_func={popup_function}></Preview>

  <div id="editorjs" ></div>
</div>

<style scoped>

    .container{
      display: flex;
      flex-direction: column;
    }
    #toolbar{
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      padding:1cm;

    }
    #editorjs{
      padding:0.5cm 1cm;
      flex:1;
      overflow: auto;
    }
    input{
      all: unset;
    }

</style>
