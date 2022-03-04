import React from 'react'
import { Typography, Paper, Grid } from '@mui/material'
import { PARK_NAME_SIZES, PARK_WIDTH, PARK_SIZES } from '../helper/constants';
import { useSelector, useDispatch } from 'react-redux';
import { unpark } from '../reducers/parkingActions';

const ParkingSlot = (props) => {
    const { slot, size, location, isOccupied, unparkHandler} = props?.slotDetails
    const parkingLot = useSelector(state => state.parkingLot)
    const dispatch = useDispatch()

    const unparkCar = () => {
        dispatch(unpark(parkingLot, slot))
    }

    return (
        <Grid item xs={PARK_WIDTH[size]} align='center' onClick={unparkCar}>
            <Paper sx={{ height: '180px', p: 1, backgroundColor: isOccupied ? '#556cd6' : '#00000', cursor: 'pointer' }} variant="outlined" square>
                <Typography variant="h6" component="h3">
                    {PARK_NAME_SIZES[size]} Parking Slot {slot + 1} {isOccupied ? 'Occupied' : ''}
                </Typography>
            </Paper>
        </Grid>
    )
}

export default ParkingSlot