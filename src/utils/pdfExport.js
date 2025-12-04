import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const pdfExport = async (element, options = {}) => {
  try {
    if (!element) {
      throw new Error("Element to export is NULL");
    }

    // options possibles : orientation, format, compress...
    const opt = {
      orientation: options.orientation || "p",
      unit: "mm",
      format: "a4",
    };

    // Canvas depuis l’élément
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF(opt);

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let Y = 0;

    pdf.addImage(imgData, "PNG", 0, Y, imgWidth, imgHeight);

    // Multi-pages si trop long
    let remainingHeight = imgHeight;

    while (remainingHeight > pageHeight) {
      pdf.addPage();
      remainingHeight -= pageHeight;
      pdf.addImage(imgData, "PNG", 0, -remainingHeight, imgWidth, imgHeight);
    }

    pdf.save("mon_cv.pdf");
  } catch (err) {
    console.error("PDF Export Error:", err);
    throw err;
  }
};

export default pdfExport;
