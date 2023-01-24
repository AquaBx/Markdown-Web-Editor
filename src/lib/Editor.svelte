<script lang="ts">
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import Katex from '../plugins/katex'

const editor = new EditorJS({
  holder: 'editorjs',  
  tools: {
    header: Header,
    list: {
      class: List,
      inlineToolbar: true,
      config: { defaultStyle: 'unordered' }
    },
    table: Table,
    underline: Underline,
    math:Katex,
    },
  
});

function save(e){
  editor.save().then((outputData) => {
    console.log('Article data: ', outputData)
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
}

</script>

<!-- <div id="toolbar">
<a on:click={save}>save</a>
<a></a>
</div> -->
<div id="editorjs"></div>

<style scoped>
    #editorjs{
        width : 21cm;
        height: 80%;
        padding:1cm;
        margin:auto;

        background: var(--glass);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
</style>