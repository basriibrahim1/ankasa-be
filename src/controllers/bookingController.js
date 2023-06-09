const { ticketBookingModels, bookingpPayloadModels, bookingInsertModels, bookingIdModels, bookingUpdateModels } = require("../models/bookingModels");


const booking = {
    getBookingController: async (req, res) => {
        try {
            const result = await ticketBookingModels()
            res.status(200).json({
            message: "booking",
            data: result.rows,
        
          });
        } catch (error) {
          res.status(400).json({
            message: "Booking not found"
          });
        }
    },


    bookingPayloadController: async (req, res) => {
        let id = req.payload.id;
    
        try {
          let result = await bookingpPayloadModels(id);
    
          res.status(200).json({
            message: "my booking",
            data: result.rows,
          });
        } catch (error) {
          res.status(400).json({
            message: "Booking not found"
          });
        }
    },

    bookingIdController: async (req, res) => {
      let id = req.params.id;
  
      try {
        let result = await bookingIdModels(id);
  
        res.status(200).json({
          message: `Booking with id ${id}`,
          data: result.rows,
        });
      } catch (error) {
        res.status(400).json({
          message: "Booking not found"
        });
      }
  },

      bookingUpdateController: async (req, res) => {
          const id = req.params.id

        try {
          
          let result = await bookingUpdateModels(id);
          
          let data = await bookingIdModels(id)


          res.status(200).json({
            message: "Payment success",
            data: data.rows,
          });
        } catch (error) {
          res.status(400).json({
            message: "Booking not found"
          });
        }
    },


    bookingInsertController: async (req, res) => {
        try {
            const data = {
                users_id: req.payload.id, 
                ticket_id: req.body.ticket_id, 
                fullname: req.body.fullname,
                email: req.body.email,
                phone : req.body.phone, 
                nationality : req.body.nationality,
                insurance : req.body.insurance, 
                total: req.body.total
            }
          

          const result = await bookingInsertModels(data);
          console.log(result)
    
          res.status(200).json({
            message: "booking success",
            ...data,
            id: result
          });
        } catch (error) {
          res.status(401).json({
            message: error.message
          });
        }
    },
}


module.exports = booking