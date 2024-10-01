const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const pdfConverter = (req, res) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    const filePath = path.join(__dirname, 'garba_event.txt');

    console.log(filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading the text file');
            return;
        }

        doc.addPage()
            .fontSize(10)
            .text(data, {
                align: 'center'
            });

        res.download(filePath, 'sample.pdf');
        doc.end();
    });
};

module.exports = { pdfConverter };
