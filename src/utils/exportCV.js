import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// EXPORT PDF ----------------------------
export async function exportToPDF(element) {
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("cv.pdf");
}


// EXPORT WORD ----------------------------
export function exportToWord(element) {
  if (!element) return;

  const content =
    `
    <html>
      <head><meta charset="UTF-8"></head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
    `;

  const blob = new Blob(["\ufeff", content], {
    type: "application/msword"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "cv.doc";
  link.click();

  URL.revokeObjectURL(url);
}
