const wordExport = (element, cvData) => {
  if (!element) return;

  const htmlContent = element.outerHTML;

  // Structure Word
  const preHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>CV Export</title>
    </head>
    <body>
  `;

  const postHtml = "</body></html>";
  const fullHtml = preHtml + htmlContent + postHtml;

  // Convertir en Blob Word
  const blob = new Blob(['\ufeff', fullHtml], {
    type: "application/msword",
  });

  // Nom du fichier
  const filename = (cvData?.personalInfo?.fullName || "Mon_CV") + ".doc";

  // Download
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  URL.revokeObjectURL(url);
};

export default wordExport;
