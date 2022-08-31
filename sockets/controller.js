const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = socket => {
  // Events that are fired when a client connects
  socket.emit('last-ticket', ticketControl.last);
  socket.emit('current-state', ticketControl.last4);
  socket.emit('tickets-pending', ticketControl.tickets.length);

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
    socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);
  });

  socket.on('serve-ticket', ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        msg: 'The desk is required',
      });
    }

    const ticket = ticketControl.serveTicket(desk);

    socket.broadcast.emit('current-state', ticketControl.last4);
    socket.emit('tickets-pending', ticketControl.tickets.length);
    socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: 'There are no pending tickets',
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
