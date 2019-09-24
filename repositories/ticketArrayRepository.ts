import { TicketRepositoryInterface } from "../interfaces/ticketRepositoryInterface";

export class TicketArrayRepository implements TicketRepositoryInterface {
    private static _instance: TicketArrayRepository;

    private constructor() {};

    public tickets: number[] = [];

    public static get instance() {
        return this._instance || (this._instance = new this());
      }

    public add(): number {
        let ticket: number;
        if (this.tickets.length === 0) {
            ticket = 1;
            this.tickets.push(ticket);
        } else {
            ticket = this.last() + 1;
            this.tickets.push(ticket);
        }
        return ticket;
    }

    public last(): number {
        if (this.tickets.length === 0) {
            return 0;
        }
        return this.tickets[this.tickets.length-1];
    }

    public del(): number {
        const value = this.tickets.shift();
        return value !== undefined ? value : 0;
    }
}
