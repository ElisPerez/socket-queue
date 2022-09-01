// HTML References
const lblDesk = document.querySelector('h1');
const btnServe = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
  window.location = 'index.html';
  throw new Error('The desk is required');
}

const desk = searchParams.get('desk');
// console.log({ desk });
lblDesk.innerText = desk;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
  btnServe.disabled = false;
});

socket.on('disconnect', () => {
  btnServe.disabled = true;
});

socket.on('tickets-pending', ticketsPending => {
  // console.log(ticketsPending);
  if (ticketsPending === 0) {
    lblPending.style.display = 'none';
  } else {
    lblPending.style.display = '';
    lblPending.innerText = ticketsPending;
  }
});

btnServe.addEventListener('click', () => {
  socket.emit('serve-ticket', { desk }, ({ ok, msg, ticket }) => {
    if (!ok) {
      lblTicket.innerText = 'No one.';
      return (divAlert.style.display = '');
    }

    lblTicket.innerText = 'Ticket ' + ticket.number;
  });
});
