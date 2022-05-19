import React from 'react'



function ContactUs () {
 
   return(
       <form action="" onSubmit="">
           <div className='forward'>
               <h2>Contact Us</h2>
               <span>Full name</span>
               < br/>
               <input className="input100"
               type="text" name="fullname" required
               />
               <br />
               <span>Phone number</span>
               < br/>
               <input className="input100"
               type="text" name="phone" required
               />
               < br/>
               <span>Email</span>
               < br/>
               <input className="input100"
               type="text" name="email" required
               />
               < br/>

           </div>
       </form>
   )
  
}

export default ContactUs;