<script lang="ts">
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';

class MyTool {
  render() {
    return document.createElement('textarea');
  }
  save(textarea) {
    return {
      text: textarea.value
    }
  }
}


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
    },
});
</script>

<div id="editorjs"></div>

<style scoped>
    #editorjs{
        width : 21cm;
        border: 1px solid black;
        padding:1cm;
        margin:auto;
    }
</style>