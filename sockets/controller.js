import TicketControl from '../models/ticket-control.js'

const ticketControl = new TicketControl()

export const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last)

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id)
  })

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.next()
    callback(next)

    //TODO: notificate new pending ticket
  })

  socket.on('manage-ticket', ({ desktop }, callback) => {
    if (!desktop) {
      callback({
        ok: false,
        msg: 'Desktop is required',
      })
    }
  })
}
