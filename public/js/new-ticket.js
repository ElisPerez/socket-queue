// HTML References
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('button');

const socket = io();
socket.connect( `https://socket-queue.vercel.app:${process.env.PORT}/` );

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
