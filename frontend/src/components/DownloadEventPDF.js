// src/utils/DownloadEventPDF.js
import jsPDF from 'jspdf';

const downloadEventPDF = (event) => {
    const doc = new jsPDF();
    const margin = 10;
    let y = margin + 10;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Draw border
    doc.setDrawColor(0, 0, 128);
    doc.setLineWidth(0.8);
    doc.rect(margin, margin, pageWidth - 2 * margin, 260);

    // Header
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 128);
    doc.text("ArtSphere - Event Overview", pageWidth / 2, y, { align: "center" });

    // Event Details
    y += 15;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Title: ${event.title}`, margin + 5, y); y += 10;
    doc.text(`Date: ${event.date}`, margin + 5, y); y += 10;
    doc.text(`Time: ${event.time}`, margin + 5, y); y += 10;
    doc.text(`Venue: ${event.venue}`, margin + 5, y); y += 10;
    doc.text(`Tickets Available: ${event.ticketsAvailable}`, margin + 5, y); y += 10;
    doc.text(`Ticket Price: Rs. ${event.ticketPrice}`, margin + 5, y); y += 15;

    // Description
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 180);
    doc.text("Description:", margin + 5, y); y += 8;

    doc.setFontSize(11);
    doc.setTextColor(0);
    const lines = doc.splitTextToSize(event.description, pageWidth - 2 * margin - 5);
    doc.text(lines, margin + 5, y);
    y += lines.length * 7;

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("© 2025 ArtSphere. All rights reserved.", margin + 5, y + 10);

    doc.save(`${event.title}-details.pdf`);
};

export default downloadEventPDF;
