import Payments from '../models/payment.js';
import Tickets from '../models/ticket.js';

const paymentController ={
    createPayment: async(req, res) => {
        try {
           
            const {ticket_id, total} = req.body;



            const newPayment = new Payments({
                ticket_id , total
            })

            
            await newPayment.save();
            await Tickets.findOneAndUpdate({_id: ticket_id}, {
                isPaid: true
            });
            res.json({msg: "Payment Success!"});
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

}
export default paymentController;