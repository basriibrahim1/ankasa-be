const { ticketModels, ticketIdModels } = require("../models/ticket");



const ticketController = {
    getTicketController: async (req, res) => {
        try {

            const result = await ticketModels()
            res.status(200).json({
            message: "ticket",
            data: result.rows,
        
          });
        } catch (error) {
          res.status(400).json({
            message: "Ticket not found"
          });
        }
    },

    ticketIdController: async (req, res) => {
        const id = req.params.id

        try {
            const result = await ticketIdModels(id)

            res.status(200).json({
                message: "ticket",
                data: result.rows,
            });
        } catch (error) {
            res.status(400).json({
                message: "Ticket not found"
            });
        }
    },
}

module.exports = ticketController