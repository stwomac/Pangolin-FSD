import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
import PDFDocument from "pdfkit";
import {PassThrough} from 'stream';
import pkg from 'pdfkit-table';

export const handler = async (event) => {
  const obj = JSON.parse(event.body);
  try {
    const client = new S3Client({ region: 'us-east-1'});
    const BUCKET_NAME  = process.env.BUCKET_NAME;
    const doc = new PDFDocument();
    const stream = new PassThrough();

    let pdfBuffer = [];
    
    stream.on('data', (chunk) => {
    
      pdfBuffer.push(chunk);
    
    });

    doc.pipe(stream);

    doc.fontSize(20).font('Helvetica-Bold').text('Report: ' + obj.reportId , { align: 'center' });
    doc.moveDown();
    
    console.log("1");
    // Add basic report details
    const details = [
      { label: 'Report Type', value: obj.reportType },
      { label: 'Description', value: obj.description },
      { label: 'Paid', value: obj.paid ? 'Yes' : 'No' },
      { label: 'Amount', value: obj.amount },
      { label: 'Payment Method', value: obj.paymentMethod },
      { label: 'Recent Date', value: obj.recentDate },
      { label: 'Initial Date', value: obj.initialDate },
      { label: 'Suspicious', value: obj.isSus ? 'Yes' : 'No' },
      { label: 'Completed', value: obj.isDone ? 'Yes' : 'No' }
    ];

    details.forEach(item => {
      doc.fontSize(12).text(`${item.label}: ${item.value}`);
    });

    console.log("2");
    // Check and add additional content if arrays are non-empty
    // Annotations Table
    doc.moveDown(); 
    if (obj.annotations && obj.annotations.length > 0) {
      doc.fontSize(14).text("Annotations", { underline: true });
      doc.moveDown();
      obj.annotations.forEach(annotation => {
        doc.fontSize(12).text(`Annotation: ${annotation.annotation}`);
        doc.moveDown();
      });
      //doc.table(annotationTable);
      doc.moveDown();
    }

    if (obj.contexts && obj.contexts.length > 0) {
      doc.fontSize(14).text("Contexts", { underline: true });
      doc.moveDown();
      obj.contexts.forEach(context => {
        if (context.orgClaim !== null) doc.fontSize(12).text(`Org Claim: ${context.orgClaim}`);
        if (context.firstName !== null) doc.text(`First Name: ${context.firstName}`);
        if (context.lastName !== null) doc.text(`Last Name: ${context.lastName}`);
        if (context.streetAddress !== null) doc.text(`Street Address: ${context.streetAddress}`);
        if (context.city !== null) doc.text(`City: ${context.city}`);
        if (context.zip !== null) doc.text(`ZIP: ${context.zip}`);
        if (context.country !== null) doc.text(`Country: ${context.country}`);
        if (context.phone !== null) doc.text(`Phone: ${context.phone}`);
        doc.moveDown();
      });
    }
    
    doc.moveDown();
    doc.fontSize(14).text("Reportee Details", { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`User ID: ${obj.reportee.userId}`);
    doc.text(`Email: ${obj.reportee.email}`);
    doc.text(`Role: ${obj.reportee.role}`);
    doc.moveDown();

    doc.end();
    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });
    console.log("3");
    pdfBuffer = Buffer.concat(pdfBuffer);

    const input = {
      'Body': pdfBuffer,
      'Bucket': BUCKET_NAME,
      'Key' : obj.reportId + '.pdf'

    };
    console.log("4");
    const command = new PutObjectCommand(input);

    const createOb = await client.send(command);
    const response = {
      statusCode: 200,
      body: event,
    };
    console.log("5");
    return response;
  } catch (error) {
    console.error("Error generating or uploading PDF:", error);
    return {
      
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate and upload PDF: " + obj}),
    };
  }
};