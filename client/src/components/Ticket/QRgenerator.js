import React, {useContext, useState} from 'react'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import QRcode from 'qrcode.react'

export default function QRgenerator() {
  
    const [qr, setQr] = useState("test");

    const handleChange = (event) => {
        setQr(event.target.value);
    };
  return (
    <div>QRgenerator
        {/* <div style={{marginTop:30}}>
                <TextField onChange={handleChange} style={{width:320}}
                value={qr} label="QR content" size="large" variant="outlined" color="primary" 
                />
            </div> */}

            <div>
                {
                    qr ?
                    <QRcode 
                        id="myqr"
                        value={qr} 
                        size={320}
                        includeMargin={true}
                    /> :
                    <p>No QR code preview</p>
                }
            </div>
            
    </div>
  )
}
