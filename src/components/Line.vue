<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { ref,defineProps, VueElement } from 'vue';

import md from 'markdown-it';
import hljs from 'highlight.js'
import mdhljs from 'markdown-it-highlightjs';
import mk from '@aquabx/markdown-it-katex';
import mdemoji from 'markdown-it-emoji';

let mdd = md({
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
})

function change_empty(target){
  if ( target.innerHTML === '' ) target.classList.add("empty")
  else target.classList.remove("empty")
}

let input = (e) => {
  let target = e.target
  props.text.value = target.innerText
  change_empty(target)
}

let del = (e) => {
  e.target.parentNode.parentNode.parentNode.remove()
}

const props = defineProps<{
	text: string;
}>();

function focus(e){
  e.target.innerText = props.text.value
  change_empty(e.target)
}

function blur(e){
  e.target.innerHTML = mdd.render(props.text.value)
  change_empty(e.target)
}

</script>

<template>

    <div class="line" >
        <!-- <div class="buttons" tabindex="-1">
          <div class="icon">
            <Icon icon="carbon:overflow-menu-horizontal" />
          </div>
          <div class="actions" >
            <button @click="del">delete</button>
            <button @click="">insert before</button>
            <button @click="">insert after</button>
          </div>
        </div> -->

        <div @input="input" @blur="blur" @focus="focus" class="input empty" tabindex="-1" placeholder="..." data-content-editable-leaf="true" contenteditable="true"></div>
    </div>
</template>

<style scoped>

.line {
  position: relative;
}

.line .input{
  position:relative;
  z-index: 10;
  cursor:text;
  width: 100%;
}

.line .input:focus{

  border:none;
  outline:none;
  
}



.buttons{
  left:-25px;
  position: absolute;
  aspect-ratio:1/1;
  height:100%;
  z-index: 0;
}
.buttons .icon{
  /* width:50px; */
  opacity: 0;
}
.buttons .icon svg{
  display: block;
}
.buttons .actions{
  z-index: -50;
  background:var(--compl);
  border: 1px solid var(--text);
  border-radius: 0.1em;
  width:100px;
  transition: 0.1s;
  opacity: 0;
}

.buttons .actions button{
  all:unset;
  
}


.buttons:focus-within .actions {
  z-index: auto;
  opacity: 1;
}

.buttons:hover .icon, .line:focus-within .buttons .icon {
  opacity: 1;
}



</style>