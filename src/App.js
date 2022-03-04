import React, {useState, useRef, useEffect} from 'react';
import {Container, Box, Typography, Paper, Grid, Button, Modal, FormControl, Select, InputLabel, MenuItem, Stack, TextField } from '@mui/material'

import ParkingSlot from './components/ParkingSlot';
import AlertMessage from './components/AlertMessage';
import { PARKING_MAP, PARKING_SPACE, getParkingSize, CAR_SIZES, ENTRY_POINTS, modalStyle, getEntryPoints } from './helper/constants';
import { findSlot } from './helper/helperFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { initParking, park } from './reducers/parkingActions'

export default function App() {
    const [noEntryPoints, setNoEntryPoints] = useState(3)
    const [entryPoints, setEntryPoints] = useState(ENTRY_POINTS)
    const [parkingMap, setParkingMap] = useState(PARKING_MAP)
    const [parkingSpace, setParkingSpace] = useState(PARKING_SPACE)
    const [intialized, setIntialized] = useState(false)
    const [alert, setAlert] = useState(null)

    const inputParkingMap = useRef()
    const inputParkingSpace = useRef()
    
    const parkingLot = useSelector(state => state.parkingLot)
    const dispatch = useDispatch()

    const handleEntryPointsChange = (event) => {
        setNoEntryPoints(event.target.value)
        setEntryPoints(getEntryPoints(event.target.value))
    }

    const handleInitialize = (event) => {
        let lot = []
        
        try {
            setParkingMap(JSON.parse(inputParkingMap?.current?.value))
            setParkingSpace(JSON.parse(inputParkingSpace?.current?.value))

            let map = JSON.parse(inputParkingMap?.current?.value)
            let space = JSON.parse(inputParkingSpace?.current?.value)

            if (map.length != space.length) {
                throw("Parking Map size is not equal to Parking Space")
            }

            map?.map((parking, index) => {                
                if (parking > 2) {
                    throw("Invalid size in Parking Map")
                }
                if (space[index].length != noEntryPoints) {
                    throw("Invalid length in Parking Space")
                }
                lot.push({ slot: index, numericSize: parking, size: getParkingSize(parking), location: space[index], isOccupied: false })
            })
    
            dispatch(initParking(lot))
            setIntialized(true)
            setAlert({ msg: `Parking lot initialized`, sev: "success"})
        } catch(e) {
            setAlert({ msg: `${e.message ? e.message : e}`, sev: "error"})
        }
    }

    // Modal
    const [openParkModal, setOpenParkModal] = useState(false)
    const handleOpenParkModal = () => {
        setAlert(null)
        setOpenParkModal(true)
        setCarSize('')
        setEntryPoint('')
    }

    const handleCloseParkModal = () => {
        setAlert(null)
        setOpenParkModal(false)
    }

    // Inputs
    const [carSize, setCarSize] = useState('')
    const [entryPoint, setEntryPoint] = useState('')

    const handleCarSizeChange = (event) => {
        setAlert(null)
        setCarSize(event.target.value);
    }

    const handleEntryPointChange = (event) => {
        setAlert(null)
        setEntryPoint(event.target.value);
    }

    const parkCar = () => {
        if(carSize === '') {
            setAlert({ msg: `Invalid input Car Size`, sev: "error"})
        } else if(entryPoint === '') {
            setAlert({ msg: `Invalid input Entry Point`, sev: "error"})
        } else {
            const slot = findSlot(parkingLot, carSize, entryPoint)
    
            if(slot !== null) dispatch(park(slot))
            
            setOpenParkModal(false)
        }
    }

    if(!intialized) {
    return (
        <>
        <Container maxWidth="xl" sx={{ my: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create Parking Lot
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                maxWidth="md"
            >
                <Stack spacing={2}>
                    <TextField
                        id="hours-spent"
                        label="Number of Entry Points"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onChange={(event) => event.target.value < 1
                            ? (event.target.value = '')
                            : handleEntryPointsChange}
                        defaultValue={noEntryPoints}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Parking Map"
                        multiline
                        rows={5}
                        inputRef={inputParkingMap}
                        defaultValue={JSON.stringify(parkingMap)}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Parking Space"
                        multiline
                        rows={5}
                        inputRef={inputParkingSpace}
                        defaultValue={JSON.stringify(parkingSpace)}
                    />
                    <Button variant="outlined" onClick={handleInitialize}> Create </Button>
                </Stack>
            </Box>
            {alert ? <AlertMessage key={Math.random()} message={alert?.msg} severity={alert?.sev}/> : null}
        </Container>
        </>
    )
    } else {
        return (
            <>
            <Container maxWidth="xl" sx={{ my: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Parking Lot
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align='right'>
                        <Button variant="outlined" onClick={handleOpenParkModal}> Park a Car </Button>
                        <Modal
                            open={openParkModal}
                            onClose={handleCloseParkModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle} spacing={2}>
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
                                                entryPoints?.map((ep, index) => (
                                                    <MenuItem key={index} value={ep.value}>{ep.label}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" onClick={parkCar}>Park</Button>
                                </Stack>
                            </Box>
                        </Modal>
                    </Grid>
                </Grid>
                {
                    parkingLot &&
                        <Paper variant="outlined" sx={{ mt: 2, p: 2, backgroundColor: '#19857b' }}>
                            <Grid container spacing={2} rowSpacing={10} >
                                {
                                    parkingLot?.map((lot, index) => (
                                        <ParkingSlot key={index} slotDetails={lot}/>
                                    ))
                                }
                            </Grid>
                        </Paper>
                }
                {alert ? <AlertMessage key={Math.random()} message={alert?.msg} severity={alert?.sev}/> : null}
            </Container>
            </>
        )
    }

    
}
