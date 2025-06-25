// src/components/TicketPurchase.js
import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import '../styles/TicketPurchase.css';

const TicketPurchase = ({ event }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    const ticketPrice = event.ticketPrice || 1000; // Default to Rs.1000 if price is not defined
    const totalPrice = quantity * ticketPrice;

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const lineSpacing = 10;
        let y = margin + 10;
    
        // Draw border frame
        doc.setDrawColor(0, 0, 128); // Dark Blue
        doc.setLineWidth(0.8);
        doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    
        // Header
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 128);
        doc.text("ArtSphere Exhibitions", pageWidth / 2, y, { align: "center" });
        y += lineSpacing + 2;
        doc.setFontSize(16);
        doc.setTextColor(33, 37, 41); // dark grey
        doc.text("Ticket Confirmation", pageWidth / 2, y, { align: "center" });
    
        // Meta info
        y += lineSpacing * 2;
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin + 5, y);
    
        // Section: Event Details
        y += lineSpacing * 2;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 180);
        doc.text("Event Details", margin + 5, y);
    
        doc.setFontSize(12);
        doc.setTextColor(0);
        y += lineSpacing;
        doc.text(`Event Name: ${event.title}`, margin + 5, y);
        y += lineSpacing;
        doc.text(`Quantity: ${quantity}`, margin + 5, y);
        y += lineSpacing;
        doc.text(`Total Price: Rs. ${totalPrice}`, margin + 5, y);
    
        // Section: Purchaser Info
        y += lineSpacing * 2;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 180);
        doc.text("Purchaser Information", margin + 5, y);
    
        doc.setFontSize(12);
        doc.setTextColor(0);
        y += lineSpacing;
        doc.text(`Name: ${name}`, margin + 5, y);
        y += lineSpacing;
        doc.text(`Email: ${email}`, margin + 5, y);
    
        // Section: Payment
        y += lineSpacing * 2;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 180);
        doc.text("Payment Status", margin + 5, y);
    
        doc.setFontSize(12);
        doc.setTextColor(0);
        y += lineSpacing;
        doc.text("Status: Approved", margin + 5, y);
        y += lineSpacing;
        doc.text(`Payment Date: ${new Date().toLocaleDateString()}`, margin + 5, y);
    
        // Footer
        y += lineSpacing * 3;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("This is an official ticket confirmation from ArtSphere.", margin + 5, y);
        y += lineSpacing;
        doc.text("© 2025 ArtSphere Auctions. All rights reserved.", margin + 5, y);
    
        // Save PDF
        doc.save("ticket-confirmation.pdf");
    };
    
    
    const handlePurchase = async () => {
        if (quantity <= 0 || !name || !email) {
            setMessage('⚠️ Please fill all fields correctly');
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/ticketpurchases", {
                eventId: event._id,
                quantity,
                name,
                email,
            });

            setMessage(response.data.message);
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful 🎉',
                text: 'Your ticket confirmation is downloading!',
              });
              
            generatePDF();

            setTimeout(() => {
                window.location.href = '/exhibitions';
            }, 3000);
        } catch (error) {
            console.log("Error details:", error);
        
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`❌ ${error.response.data.message}`);
                Swal.fire({
                    icon: 'error',
                    title: 'Purchase Failed ❌',
                    text: error.response.data.message,
                });
            } else {
                setMessage('❌ Failed to purchase ticket. Try again.');
                Swal.fire({
                    icon: 'error',
                    title: 'Purchase Failed ❌',
                    text: 'An unexpected error occurred. Please try again.',
                });
            }
        }
        
    };
 //  Prevent ticket purchase for past exhibitions
 const isPastEvent = new Date(event.endDate) < new Date();

 if (isPastEvent) {
     return (
         <div className="ticket-purchase-container">
             <h2>Ticket Purchase Closed ❌</h2>
             <p>This exhibition has already ended. Ticket purchasing is no longer available.</p>
         </div>
     );
 }

    return (
        <div className="ticket-purchase-container">
            <h2>Purchase Tickets</h2>

            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    max={event.ticketsAvailable}
                />
            </div>

            <p>Total Price: Rs. {totalPrice}</p>

            <div className="bank-details">
                        <h3>Bank Details</h3>
                        <p>Bank: Commercial Bank</p>
                        <p>Account Name: ArtSphere Exhibitions</p>
                        <p>Account Number: 1234567890</p>
                        <p>Branch: Colombo Main Branch</p>
                    </div>

            <div>
                <button onClick={handlePurchase}>Purchase Ticket</button>
            </div>

            {message && <p>{message}</p>}
        </div>
    );
};

export default TicketPurchase;
