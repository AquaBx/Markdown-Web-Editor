import katex from 'katex'
import globals from '../globals'

let katex_options = {
  displayMode: true,
	throwOnError: true,
	macros: JSON.parse( globals.contents["katexmacros"] )
}

function render(text:string){
  return katex.renderToString(text,katex_options)
}

export default class {
    static get toolbox() {
        return {
          title: 'Math',
          icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9.08333V7.5C16 7.22386 15.7761 7 15.5 7H8.25761C7.80524 7 7.58542 7.5529 7.9143 7.86351L11.9092 11.6365C12.1181 11.8338 12.1181 12.1662 11.9092 12.3635L7.9143 16.1365C7.58542 16.4471 7.80524 17 8.25761 17H15.5C15.7761 17 16 16.7761 16 16.5V14.9167" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>'
        }
    }

    constructor({config}){
      this.config = config || {}
    }

    render(){
      let div = document.createElement("div")
      div.setAttribute("class","ce-paragraph cdx-block")
      div.setAttribute("data-placeholder","")
      div.setAttribute("contenteditable","false")

      div.innerText = "Empty"
      div.value = "Empty"
      div.onclick = (e) => { this.config.show_popup(div,render) }

      return div;
    }
  
    save(blockContent:HTMLElement){
      return {
        latex: blockContent.value
      }
    }
  }