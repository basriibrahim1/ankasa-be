const pool = require("../config/db");



const ticketBookingModels = () => {
    return (
        pool.query(`
    SELECT 
        tb.*, 
        tb.id AS booking_id, 
        u1.name AS booking_owner,
        tb.users_id AS booking_owner_id,
        u2.name AS user_ticket_owner,
        u2.photo AS photo_ticket_owner,
        t.users_id AS ticket_owner,
        t.departure_time,
        t.from_country AS from,
        t.to_country AS to,
        t.code,
        TO_CHAR(t.schedule, 'FMDay, DD Month YYYY') AS schedule
    FROM 
        ticket_booking tb
        JOIN users u1 ON tb.users_id = u1.id
        JOIN ticket t ON tb.ticket_id = t.id
        JOIN users u2 ON t.users_id = u2.id`)
    )
}

const bookingpPayloadModels = (id) => {
    return (
        pool.query(`SELECT 
        tb.*, 
        tb.id AS booking_id, 
        u1.name AS booking_owner,
        tb.users_id AS booking_owner_id,
        u2.name AS user_ticket_owner,
        u2.photo AS photo_ticket_owner,
        t.users_id AS ticket_owner,
        t.departure_time,
        t.from_country AS from,
        t.to_country AS to,
        t.code,
        TO_CHAR(t.schedule, 'FMDay, DD Month YYYY') AS schedule
    FROM 
        ticket_booking tb
        JOIN users u1 ON tb.users_id = u1.id
        JOIN ticket t ON tb.ticket_id = t.id
        JOIN users u2 ON t.users_id = u2.id
    WHERE tb.users_id = '${id}'
    `)
    )
}

const bookingIdModels = (id) => {
    return (
        pool.query(`SELECT 
        tb.*, 
        tb.id AS booking_id, 
        u1.name AS booking_owner,
        tb.users_id AS booking_owner_id,
        u2.name AS user_ticket_owner,
        u2.photo AS photo_ticket_owner,
        t.users_id AS ticket_owner,
        t.departure_time,
        t.from_country AS from,
        t.to_country AS to,
        t.code,
        t.airlines_class,
        t.gate,
        t.terminal,
        TO_CHAR(t.schedule, 'FMDay, DD Month YYYY') AS schedule
    FROM 
        ticket_booking tb
        JOIN users u1 ON tb.users_id = u1.id
        JOIN ticket t ON tb.ticket_id = t.id
        JOIN users u2 ON t.users_id = u2.id
    WHERE tb.id = '${id}'
    `)
    )
}


const bookingInsertModels = (data) => {
    return new Promise((resolve, reject) => {
      const { users_id, ticket_id, fullname, email, phone, nationality, insurance, total } = data;
  
      const query = `INSERT INTO ticket_booking(users_id, ticket_id, fullname, email, phone, nationality, insurance, total) VALUES('${users_id}', ${ticket_id}, '${fullname}', '${email}', '${phone}', '${nationality}', ${insurance}, '${total}') RETURNING id`;
  
      pool.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const newBookingId = result.rows[0].id;
          resolve(newBookingId);
        }
      });
    });
  };


const bookingUpdateModels = (id) => {
    return( 
        pool.query(`UPDATE ticket_booking SET status='E-Ticket Issued' WHERE ticket_booking.id = ${id};`)
    )
}
  



module.exports ={
    ticketBookingModels,
    bookingpPayloadModels,
    bookingInsertModels,
    bookingIdModels,
    bookingUpdateModels
}

