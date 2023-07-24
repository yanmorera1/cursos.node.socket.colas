//html references
const lblDesktop = document.querySelector('h1')
const btnManage = document.querySelector('button')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('desktop')) {
  window.location = 'index.html'
  throw new Error('Desktop is required')
}

const desktop = searchParams.get('desktop')
console.log({ desktop })

const socket = io()

socket.on('connect', () => {
  btnManage.disabled = false
})

socket.on('disconnect', () => {
  btnManage.disabled = true
})

socket.on('enviar-mensaje', (payload) => {
  console.log(payload)
})

socket.on('last-ticket', (ticket) => {
  //lblNuevoTicket.innerText = 'Ticket ' + ticket
})

btnManage.addEventListener('click', () => {
  socket.emit('manage-ticket', ({ ticket }, payload) => {
    console.log(payload)
  })
})
