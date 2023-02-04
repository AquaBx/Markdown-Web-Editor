import { jsPDF } from "jspdf"

export default function (name:string,elementHTML:HTMLElement) {

    let doc:any = new jsPDF();

    doc.html(elementHTML, {
        callback: function(doc:any) {
            doc.save(`${name}.pdf`)
        },
        x: 15,
        y: 15,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
    });
}