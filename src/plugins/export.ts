import { dataDir } from "@tauri-apps/api/path";
import { jsPDF } from "jspdf"

export default function (name:string,json:any) {

    let doc:any = new jsPDF();

    let heigth = 0
    for ( let item of json.blocks){
        let output = ""
        switch (item.type){
            case "header" :
            case "paragraph" : doc.text(20, heigth,item.data.text)
            case "table" :
            case "mermaid" :
        }
        heigth+= 20
    }


    doc.save(`${name}.pdf`)
}