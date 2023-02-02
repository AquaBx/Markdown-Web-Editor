import { jsPDF } from "jspdf"

export default function (name,elementHTML:HTMLElement) {

    let doc:any = new jsPDF();

    doc.html(elementHTML, {
        callback: function(doc:any) {
            // Save the PDF
            doc.save(`${name}.pdf`);
        },
        x: 15,
        y: 15,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
    });
}