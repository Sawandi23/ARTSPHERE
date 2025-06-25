import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TicketList.css';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/tickets/ticketpurchases')
            .then((res) => setTickets(res.data))
            .catch((err) => console.error('Failed to load tickets:', err));
    }, []);

    return (
        <div className="ticket-list">
            <h2>Purchased Tickets</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Event</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket._id}>
                            <td>{ticket.name}</td>
                            <td>{ticket.email}</td>
                            <td>{ticket.eventId?.title || 'N/A'}</td>
                            <td>{ticket.tickets}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketList;
