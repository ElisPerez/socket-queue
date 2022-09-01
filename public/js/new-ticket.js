// HTML References
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
  btnCreate.disabled = false;
});

socket.on('disconnect', () => {
  btnCreate.disabled = true;
});

socket.on('last-ticket', lastTicket => {
  lblNewTicket.innerText = 'Ticket ' + lastTicket;
});

btnCreate.addEventListener('click', () => {
  socket.emit('next-ticket', null, ticket => {
    // console.log('From server', ticket);
    lblNewTicket.innerText = ticket;
  });
});
