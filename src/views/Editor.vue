<script lang="ts" setup>
  import md from 'markdown-it';
  import hljs from 'highlight.js'
  import mdhljs from 'markdown-it-highlightjs';
  import mk from 'markdown-it-katex';
  import mdemoji from 'markdown-it-emoji';

  const markdownit = md({
    html: true
  })
  .use(mdhljs, {
    auto: true,
    ignoreIllegals: true,
    code: true,
    inline: false,
    hljs
  })
  .use(mk, {
    displayMode: true,
    throwOnError: true,
    macros: {
      '\\(': '\\lparen',
      '\\)': '\\rparen',
      '\\{': '\\lbrace',
      '\\}': '\\rbrace',
      '\\[': '\\lbrack',
      '\\]': '\\rbrack',
      '\\n': '\\\\ \\ \\\\',
      '\\vec': '\\overrightarrow{#1}',
      '\\embrace': '\\left#2\\begin{split} #1 \\end{split}\\right#3',
      '\\aembrace': '\\embrace{#1}{\\{}{\\}}',
      '\\pembrace': '\\embrace{#1}{\\(}{\\)}',
      '\\cembrace': '\\embrace{#1}{\\[}{\\]}',
      '\\abs': '\\displaystyle\\left\\lvert{#1}\\right\\rvert',
    }
  })
  .use(mdemoji)
  .use(function underline(md) {
    function renderEm(tokens:any, idx:any, opts:any, _:any, slf:any) {
      let token = tokens[idx];
      if(token.markup === '_')
        token.tag = 'u';
      return slf.renderToken(tokens, idx, opts);
    }
    md.renderer.rules.em_open = renderEm;
    md.renderer.rules.em_close = renderEm;
  });

	

  // function check_event_key(e:Event){
  //   let target = e.target as HTMLInputElement
    
  //   if (e.key === "Enter"){
  //     new Line(target.parentNode)
  //     return true
  //   }
  //   return false
  // }

  class Line {
    node : HTMLElement
    raw_content: string = ""

    on_focus = () => {
      console.log(this)
      this.node.innerHTML = this.raw_content
    }
    
    on_lose_focus = () => {
      this.raw_content = this.node.innerText
      this.node.innerHTML = markdownit.render(this.raw_content)
    }

    constructor(target:HTMLElement){
      this.node = target
      this.node.setAttribute("tabindex","-1")
      this.raw_content = target.innerText
      this.node.onfocus = this.on_focus
      this.node.oninput = this.on_focus
      this.node.onblur = this.on_lose_focus
    }   
  }

  function checkdivs(e:Event){
    let target = e.target as HTMLInputElement
    if (target.id !== "editor") {target = target.parentElement}

    if (target.children.length === 0){
        let div = document.createElement("div")
        target.appendChild(div)
        div.innerHTML = "<br/>"
    }
    for (let child of target.children) {
        if (! child.onfocus ){
          new Line(child)
        }
    }
    target.children[target.children.length-1].focus()
  }
  let debug = console.log
</script>

<template>
  <div contenteditable="true" spellcheck="true" id="editor" class="editor" @input="debug" @click="checkdivs"></div>
</template>

<style>

  .editor {
    width : 21cm;
    height: 29.7cm;
    border: 1px solid black;
    padding:1cm;

  }
  span {
    width:100%;
    display: block;
  }
  .editor > *:focus{
    border: unset;
    outline: unset;
  }
</style>
