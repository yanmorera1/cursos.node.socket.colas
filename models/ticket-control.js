import { writeFileSync } from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const json = JSON.parse(
  await readFile(new URL('../db/data.json', import.meta.url))
)

export class Ticket {
  constructor(number, desktop) {
    ;(this.number = number), (this.desktop = desktop)
  }
}

export default class TicketControl {
  constructor() {
    this.last = 0
    this.today = new Date().getDate()
    this.tickets = []
    this.last4 = []

    this.init()
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4,
    }
  }

  init() {
    const { today, tickets, last4, last } = json
    if (today === this.today) {
      this.tickets = tickets
      this.last = last
      this.last4 = last4
    } else {
      this.saveDb()
    }
  }

  saveDb() {
    const dbPath = path.join(__dirname, '../db/data.json')
    writeFileSync(dbPath, JSON.stringify(this.toJson))
  }

  next() {
    this.last += 1
    const ticket = new Ticket(this.last, null)
    this.tickets.push(ticket)
    this.saveDb()
    return 'Ticket ' + ticket.number
  }

  manageTicket(desktop) {
    if (this.tickets.length === 0) return null

    const ticket = this.tickets.shift()
    ticket.desktop = desktop

    this.last4.unshift(ticket)

    if (this.last4.length > 4) this.last4.splice(-1, 1)

    console.log(this.last4)
    this.saveDb()
    return ticket
  }
}
