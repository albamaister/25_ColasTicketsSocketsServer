import { TicketEscritorioRepositoryInterface } from "../interfaces/ticketEscritorioRepositoryInterface";

export class TicketEscritorioArrayRepository implements TicketEscritorioRepositoryInterface {
    private static _instance: TicketEscritorioArrayRepository;

    private constructor() {};

    public ticketsEscritorio = [{ticket:0, escritorio: 0}];

    public static get instance() {
        return this._instance || (this._instance = new this());
      }

    public add(ticket: number, escritorio: number):any {
        if (ticket === 0) { return; }
        this.ticketsEscritorio.push({ticket: ticket, escritorio: escritorio})
        return {ticket, escritorio};
    }

    /**
     * Get last 4 
     */
    public getAll():any {
        return this.ticketsEscritorio.slice(Math.max(this.ticketsEscritorio.length - 4, 1));
    }
}