/**
 * interface that controls the methods of the access classes
 */
export interface TicketRepositoryInterface {
    /**
     * Add new number to ticker list
     */
    add(): number

    /**
     * Delete first number from ticker list, and return it to the client
     */
    del(): number

    /**
     * return last ticket to update new-ticket component
     */
    last(): number
}