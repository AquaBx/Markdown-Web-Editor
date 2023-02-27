<div class="container">
    <div id="pdf"></div>
</div>

<script lang="ts">
  import globals from '../../globals';
  import {getDocument,GlobalWorkerOptions,renderTextLayer} from 'pdfjs-dist'
  import {readBinaryFile} from '@tauri-apps/api/fs'
    import { PDFDocumentProxy, type RenderParameters } from 'pdfjs-dist/types/src/display/api';
  let directory = globals.contents["directory"]
  var isPen = false;

document.body.addEventListener(
  "pointerdown",
  function (e) {
    if (e.pointerType === "pen") {
      isPen = true;
    } else {
      isPen = false;
    }
    e.preventDefault();
  },
  {
    capture: true
  }
);

document.body.addEventListener(
  "touchstart",
  function (e) {
    if (isPen) {
      e.preventDefault();
    }
  },
  {
    passive: false,
    capture: false
  }
);




    
    // The workerSrc property shall be specified.
    GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';
    
    function create_canva(){
      let canva = document.createElement("canvas")
      canva.onpointermove = (e: PointerEvent) => {
        let x = e.layerX
        let y = e.layerY

        if (e.pressure === 0 || e.pointerType === "touch"){
          //
        }
        else{
          let lastx = parseInt( canva.getAttribute("lastx") as string )
          let lasty = parseInt( canva.getAttribute("lasty") as string )
          let ctx = canva.getContext("2d");

          if (ctx === null){
            console.trace("ctx null")
            return
          }

          ctx.beginPath();
          ctx.moveTo(lastx, lasty);
          ctx.lineTo(x, y);
          ctx.stroke(); 
          ctx.lineWidth = e.pressure*2;
          ctx.closePath();
        }
        
        canva.setAttribute("lastx",x.toString())
        canva.setAttribute("lasty",y.toString())
      }
      return canva
    }

    let file = document.location.hash.substring(1);
    (async function() {
      let text = await readBinaryFile(directory+"/"+file)

      let loadingTask = getDocument(text);

      let pdf = await loadingTask.promise
      var scale = 1.3;
      for (let i=1; i<=pdf.numPages;i++){
        let page = await pdf.getPage(i)
        PDFDocumentProxy
        
        document.body.style.setProperty('--scale-factor', scale.toString());
        var viewport = page.getViewport({ scale: scale, });
        // Support HiDPI-screens.
        var outputScale = window.devicePixelRatio || 1;

        let div_page = document.createElement("div")
        let canvas = document.createElement("canvas")
        let layer = document.createElement("div")
        let anotlayer = create_canva()
        div_page.style.position = "relative"

        anotlayer.style.position = "absolute"
        anotlayer.style.left = "0"
        anotlayer.style.top = "0"

        layer.style.position = "absolute"
        layer.style.opacity = "0.2"

        layer.className = "text-layer"

        div_page.appendChild(canvas)
        div_page.appendChild(layer)
        div_page.appendChild(anotlayer)
        document.querySelector("#pdf")?.appendChild(div_page)

        var context = canvas.getContext('2d');

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);

        anotlayer.width = Math.floor(viewport.width * outputScale);
        anotlayer.height = Math.floor(viewport.height * outputScale);

        var transform = outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : null;

        var renderContext = {
          canvasContext: context,
          transform: transform,
          viewport: viewport
        };

        page.render(renderContext as RenderParameters);
        
        let textContent = await page.getTextContent()

        var canvas_offset_left = canvas.offsetLeft;
        var canvas_offset_top = canvas.offsetTop;
        var canvas_height = canvas.height;
        var canvas_width = canvas.width;

        layer.style.left = canvas_offset_left + 'px'
        layer.style.top = canvas_offset_top + 'px'
        layer.style.height = canvas_height + 'px'
        layer.style.width = canvas_width + 'px'


        let textlayer = renderTextLayer({
          textContentSource: textContent,
          container: layer,
          viewport: viewport,
        })

        textlayer._textDivs.forEach((element: HTMLElement) => {
          element.style.position = "absolute"
          element.style.color = "transparent"
        });
      }
  })()
</script>
