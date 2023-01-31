import katex from 'katex'
import globals from '../globals'

console.log( globals.contents["katexmacros"] )

let katex_options = {
	displayMode: true,
	throwOnError: true,
	macros: JSON.parse( globals.contents["katexmacros"] )
}
export default class {
    static get toolbox() {
        return {
          title: 'Math',
          icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9.08333V7.5C16 7.22386 15.7761 7 15.5 7H8.25761C7.80524 7 7.58542 7.5529 7.9143 7.86351L11.9092 11.6365C12.1181 11.8338 12.1181 12.1662 11.9092 12.3635L7.9143 16.1365C7.58542 16.4471 7.80524 17 8.25761 17H15.5C15.7761 17 16 16.7761 16 16.5V14.9167" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>'
        }
    }
    static get editbox() {
        return {
          title: 'Math',
          icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9.08333V7.5C16 7.22386 15.7761 7 15.5 7H8.25761C7.80524 7 7.58542 7.5529 7.9143 7.86351L11.9092 11.6365C12.1181 11.8338 12.1181 12.1662 11.9092 12.3635L7.9143 16.1365C7.58542 16.4471 7.80524 17 8.25761 17H15.5C15.7761 17 16 16.7761 16 16.5V14.9167" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>'
        }
      }
  
    render(){
      let div = document.createElement("div")
      div.setAttribute("contenteditable","true")
      div.setAttribute("class","ce-paragraph cdx-block")
      div.setAttribute("style","overflow: auto hidden;")
      div.value = ""
      div.onfocus= (e:Event) => {e.target.innerHTML = e.target.value;e.target.focus()}
      div.onblur = (e:Event) => {e.target.innerHTML = katex.renderToString(e.target.value,katex_options) }
      div.oninput= (e:Event) => {e.target.value = e.target.innerText}
  
      return div;
    }
  
    save(blockContent){
      return {
        latex: blockContent.value
      }
    }
  }