import React, {useState, useEffect} from 'react';
import {Container, Box, Typography, Paper, Grid, Button, Modal, FormControl, Select, InputLabel, MenuItem, Stack } from '@mui/material'

import ParkingSlot from './components/ParkingSlot';
import { PARKING_MAP, PARKING_SPACE, getParkingSize, CAR_SIZES, ENTRY_POINTS } from './helper/constants';
import { findSlot } from './helper/helperFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { initParking, park } from './reducers/parkingActions'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}
export default function App() {
    const [parkingMap, setParkingMap] = useState(PARKING_MAP)
    const [parkingSpace, setParkingSpace] = useState(PARKING_SPACE)
    const parkingLot = useSelector(state => state.parkingLot)
    const dispatch = useDispatch()

    //Modal
    const [openParkModal, setOpenParkModal] = useState(false)
    const handleOpenParkModal = () => {
        setOpenParkModal(true)
        setCarSize('')
        setEntryPoint('')
    }
    const handleCloseParkModal = () => setOpenParkModal(false)

    //Form
    const [carSize, setCarSize] = useState('')
    const [entryPoint, setEntryPoint] = useState('')

    const handleCarSizeChange = (event) => {
        setCarSize(event.target.value);
    }

    const handleEntryPointChange = (event) => {
        setEntryPoint(event.target.value);
    }

    useEffect(() => {
        let lot = []

        parkingMap?.map((parking, index) => (
            lot.push({ slot: index, numericSize: parking, size: getParkingSize(parking), location: parkingSpace[index], isOccupied: false })
        ))

        dispatch(initParking(lot))
    },[])

    const parkCar = () => {
        if(carSize === '' || entryPoint === '') {
            alert('error')
        } else {
            const slot = findSlot(parkingLot, carSize, entryPoint)
    
            if(slot !== null) dispatch(park(slot))
            setOpenParkModal(false)
        }
    }

    return (
        <>
        <Container maxWidth="xl">
            <Box sx={{ my: 4 }} align='center'>
                <Typography variant="h4" component="h1" gutterBottom>
                    Parking Lot
                </Typography>
                <Button variant="outlined" onClick={handleOpenParkModal}> Park a Car </Button>
                <Modal
                    open={openParkModal}
                    onClose={handleCloseParkModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} spacing={2}>
                        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
                            Park a Car
                        </Typography>
                        <Stack spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id="car-size">Car Size</InputLabel>
                                <Select
                                    labelId="car-size"
                                    value={carSize}
                                    label="Car Size"
                                    onChange={handleCarSizeChange}
                                >
                                    {
                                        CAR_SIZES?.map((car, index) => (
                                            <MenuItem key={index} value={car.value}>{car.label}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="entry-point">Entry Point</InputLabel>
                                <Select
                                    labelId="entry-point"
                                    value={entryPoint}
                                    label="Entry Point"
                                    onChange={handleEntryPointChange}
                                >
                                    {
                                        ENTRY_POINTS?.map((ep, index) => (
                                            <MenuItem key={index} value={ep.value}>{ep.label}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <Button variant="contained" onClick={parkCar}>Park</Button>
                        </Stack>
                    </Box>
                </Modal>
            </Box>

            {
                parkingLot &&
                <Grid container spacing={2}>
                    <Grid item xs={1} align='center'>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Entry Point A
                        </Typography>                        
                    </Grid>
                    <Grid item xs={10} align='center'>
                        <Paper variant="outlined" square sx={{ p: 2 }}>
                            <Grid container spacing={2} rowSpacing={10} >
                                {
                                    parkingLot?.map((lot, index) => (
                                        <ParkingSlot key={index} slotDetails={lot}/>
                                    ))
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={1} align='center'>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Entry Point B
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Entry Point C
                        </Typography>
                    </Grid>
                </Grid>
            }
        </Container>
        </>
    );
}
