import React, { useState } from "react"
import { Snackbar, IconButton, Alert } from '@mui/material'

const AlertMessage = (props) => {
    const { message, severity } = props
    const [open, setOpen] = useState(true)

    function handleClose() {
        setOpen(false)
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
                variant="warning"
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                sx={{ maxWidth: '550px' }}
            >
                <Alert icon={false} variant="filled" severity={severity || 'info'} onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AlertMessage