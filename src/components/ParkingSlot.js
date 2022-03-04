import React, {useState} from 'react'
import { Typography, Paper, Grid, Modal, Box, Stack, Button, FormControl, TextField  } from '@mui/material'
import { PARK_NAME_SIZES, PARK_WIDTH, modalStyle } from '../helper/constants';
import { calculateParkingFee } from '../helper/helperFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { unpark } from '../reducers/parkingActions';
import AlertMessage from './AlertMessage';

const ParkingSlot = (props) => {
    const { slot, size, isOccupied} = props?.slotDetails

    const parkingSlotStyle = {
        height: '180px',
        p: 1,
        backgroundColor: isOccupied ? '#556cd6' : '#00000',
        color: isOccupied ? 'white' : 'black',
        cursor: 'pointer' 
    }
    
    const parkingLot = useSelector(state => state.parkingLot)
    const dispatch = useDispatch()

    const [hoursParked, setHoursParked] = useState(0)
    const [openUnparkModal, setOpenUnparkModal] = useState(false)
    const [parkingFee, setParkingFee] = useState(0)
    const [alert, setAlert] = useState(null)

    const unparkCar = () => {
        if(hoursParked > 0 ) {
            dispatch(unpark(parkingLot, slot))
            setParkingFee(calculateParkingFee(hoursParked, size))
        } else {
            setAlert({msg:'Hours Spent must be more than 0', sev:'error'})
        }
    }

    const handleHoursParkedChange = (event) => {
        setAlert(null)
        setHoursParked(event.target.value);
    }
    const handleOpenUnparkModal = () => {
        isOccupied ? setOpenUnparkModal(true) : setOpenUnparkModal(false)
        setAlert(null)
    }
    const handleCloseUnparkModal = () => {
        setParkingFee(0)
        setHoursParked(0)
        setOpenUnparkModal(false)
        setAlert(null)
    }

    return (
        <>
            <Grid item xs={PARK_WIDTH[size]} align='center'>
                <Paper sx={parkingSlotStyle} variant="outlined" onClick={handleOpenUnparkModal}>
                    <Typography variant="h6" component="h3">
                        {PARK_NAME_SIZES[size]} Parking Slot {slot + 1} {isOccupied ? 'Occupied' : ''}
                    </Typography>
                </Paper>
                <Modal
                    open={openUnparkModal}
                    onClose={handleCloseUnparkModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle} spacing={2}>
                        {
                            parkingFee == 0 &&
                                <>
                                <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
                                    {`Unpark car in Slot ${slot + 1}`}
                                </Typography>
                                <Stack spacing={2}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="hours-spent"
                                            label="Hours Spent"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            onChange={(event) => event.target.value < 1
                                                ? (event.target.value = '')
                                                : handleHoursParkedChange(event)} />
                                    </FormControl>
                                    <Button variant="contained" onClick={unparkCar}>Unpark</Button>
                                </Stack>
                                </>
                        }
                        {
                            parkingFee > 0 &&
                                <>
                                <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
                                    {`Parking Fee`}
                                </Typography>
                                <Stack spacing={2}>
                                    <Typography id="modal-modal-title" variant="body">
                                        {`You're parked in a ${PARK_NAME_SIZES[size]} Parking Slot for ${Math.round(hoursParked)} hours.`}
                                    </Typography>
                                    <Typography id="modal-modal-title" variant="body" sx={{ mb: 5 }}>
                                        {`Total Fee: PHP ${parkingFee}`}
                                    </Typography>
                                    <Button variant="contained" onClick={handleCloseUnparkModal}>Close</Button>
                                </Stack>
                                </>
                        }
                    </Box>
                </Modal>
            </Grid>
            {alert ? <AlertMessage key={Math.random()} message={alert?.msg} severity={alert?.sev}/> : null}
        </>
    )
}

export default ParkingSlot