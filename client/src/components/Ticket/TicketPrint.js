import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';
import MoviesTicket from './MoviesTicket';
import QRgenerator from './QRgenerator';
export default class TicketPrint extends Component {
    render() {
        return (
            <div>TicketPrint
<div ref={(el) => (this.componentRef = el)}>
                    {/* <MoviesTicket/> */}
                    <QRgenerator />
                </div>
                <ReactToPrint

                    trigger={() => <button className="btn btn-dark" style={{ margintop: '400px' }}>

                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i> &nbsp;Get a Print of the Ticket</button >}

                    content={() => this.componentRef}

                />


                
            </div>
        )
    }
}
