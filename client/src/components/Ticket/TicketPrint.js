import React, { Component } from 'react'
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import MoviesTicket from './MoviesTicket';
import QRgenerator from './QRgenerator';
export default class TicketPrint extends Component {
    componentDidMount(){
        const {id}= this.props.match.params;
       
    }
    
    render() {
        return (
            
            <div>TicketPrint
<div ref={(el) => (this.componentRef = el)}>
                    {/* <MoviesTicket/> */}
                    <QRgenerator />
                </div>
                <ReactToPrint

                    trigger={() => <button className="btn btn-dark" style={{ margintop: '400px' }}>

                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i> &nbsp;</button >}

                    content={() => this.componentRef}

                />


                
            </div>
        )
    }
}
