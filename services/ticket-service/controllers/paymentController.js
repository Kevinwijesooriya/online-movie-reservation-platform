import sendEmail from '../helpers/sendMail.js';
import Payments from '../models/payment.js';
import Tickets from '../models/ticket.js';
import User from '../models/user.js';

const paymentController ={
    createPayment: async(req, res) => {
        try {
           
            const {ticket_id, total} = req.body;
            const user = await User.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})
            const email=user.email;



            const newPayment = new Payments({
                ticket_id , total
            })

            sendEmail(email, ticket_id,total);
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