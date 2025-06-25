// src/pages/EventDetails.js

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import TicketPurchase from '../components/TicketPurchase';
import '../styles/EventDetails.css';
import downloadEventPDF from '../components/DownloadEventPDF';
import '../styles/DownloadButton.css';


const EventDetails = () => {
    const { id } = useParams(); // get the event id
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get(`http://localhost:3000/events/${id}`)
            .then(res => {
                setEvent(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleUpdate = () => {
        navigate(`/update-event/${id}`);
    };

    const handleViewInAR = () => {
        navigate('/ar-viewer', {
            state: { imageUrl: event.image }
        });
    };

    // const handleDownloadPDF = () => {
    //     const doc = new jsPDF();
    //     const margin = 10;
    //     let y = margin + 10;
    //     const pageWidth = doc.internal.pageSize.getWidth();
    
    //     doc.setDrawColor(0, 0, 128);
    //     doc.setLineWidth(0.8);
    //     doc.rect(margin, margin, pageWidth - 2 * margin, 260);
    
    //     doc.setFontSize(18);
    //     doc.setTextColor(0, 0, 128);
    //     doc.text("ArtSphere - Event Overview", pageWidth / 2, y, { align: "center" });
    
    //     y += 15;
    //     doc.setFontSize(12);
    //     doc.setTextColor(0);
    
    //     doc.text(`Title: ${event.title}`, margin + 5, y);
    //     y += 10;
    //     doc.text(`Date: ${event.date}`, margin + 5, y);
    //     y += 10;
    //     doc.text(`Time: ${event.time}`, margin + 5, y);
    //     y += 10;
    //     doc.text(`Venue: ${event.venue}`, margin + 5, y);
    //     y += 10;
    //     doc.text(`Tickets Available: ${event.ticketsAvailable}`, margin + 5, y);
    //     y += 10;
    //     doc.text(`Ticket Price: Rs. ${event.ticketPrice}`, margin + 5, y);
    //     y += 15;
    
    //     doc.setFontSize(13);
    //     doc.setTextColor(0, 0, 180);
    //     doc.text("Description:", margin + 5, y);
    //     y += 8;
    
    //     doc.setFontSize(11);
    //     doc.setTextColor(0);
    //     const lines = doc.splitTextToSize(event.description, pageWidth - 2 * margin - 5);
    //     doc.text(lines, margin + 5, y);
    
    //     y += lines.length * 7;
    
    //     doc.setFontSize(10);
    //     doc.setTextColor(100);
    //     doc.text("© 2025 ArtSphere. All rights reserved.", margin + 5, y + 10);
    
    //     doc.save(`${event.title}-details.pdf`);
    // };
    

    if (loading) return <p>Loading...</p>;
    if (!event) return <p>Event not found</p>;

    return (
        <div className="event-details-container">
            <h1>{event.title}</h1>
            <img src={event.image} alt={event.title} className="event-image" />
            <p className="event-description">{event.description}</p>
            <p className="event-date">{event.date} | {event.time}</p>
            <p className="event-venue">{event.venue}</p>
            <p className="event-tickets">Tickets Available: {event.ticketsAvailable}</p>
            <p className="event-price">Ticket Price: Rs. {event.ticketPrice}</p>
            
            <br />
            <button onClick={handleUpdate} className="update-btn">
                Edit Event Details
            </button>
            <br />

            {/* <button onClick={handleDownloadPDF} className="download-btn">
    Download Event PDF
</button> */}
   <button onClick={() => downloadEventPDF(event)} className="download-btn">
                Download Event PDF
            </button>

<br />

            <button onClick={handleViewInAR} className="ar-btn">
                View in AR
            </button>


            <TicketPurchase event={event} />
        </div>
    );
};

export default EventDetails;
