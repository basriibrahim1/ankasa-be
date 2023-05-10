const pool = require("../config/db");



const ticketModels = (data) => {
    const {sort, search, searchBy} = data
    return (
        pool.query(`SELECT ticket.*, users.photo, users.name, users.id AS id_users FROM ticket JOIN users ON ticket.users_id=users.id WHERE ticket.deleted_at IS NULL AND ticket.${searchBy} ILIKE '%${search}' ORDER BY ticket.to_country ${sort}`)
    )
}

const ticketIdModels = (id) => {
    return (
        pool.query(`SELECT ticket.*, users.photo, users.name, users.id AS id_users, TO_CHAR(ticket.schedule, 'FMDay, DD Month YYYY') AS schedule_time FROM ticket JOIN users ON ticket.users_id = users.id WHERE ticket.id=${id} AND ticket.deleted_at IS NULL `)
    )
}


module.exports ={
    ticketIdModels,
    ticketModels
}

