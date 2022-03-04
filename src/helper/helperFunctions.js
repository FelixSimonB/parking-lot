import { PARKING_FEE } from './constants';

export const findSlot = (parkingLot, size, entryPoint) => {
    let temp = [...parkingLot]
    
    temp = temp.filter((a) => {
        if(a.numericSize >= size && !a.isOccupied) {
            return a
        }
    })

    if(temp.length > 0) {
        temp = temp.sort((a, b) => {
            return a.location[entryPoint] - b.location[entryPoint]
        })
    
        parkingLot[temp[0].slot].isOccupied = true
        
        temp = [...parkingLot]

        return temp
    } else {
        alert('No more available Parking')
    }

    return null
}

export const calculateParkingFee = (hours, size) => {
    hours = Math.round(hours)
    if(hours <= 3) {
        return 40
    } else if(hours > 24) {
        let remainder = hours % 24
        let fee = (((hours - remainder)/24) * 5000) + (remainder * PARKING_FEE[size])
        return fee
    } else {
        let remainder = hours - 3
        let fee = (remainder * PARKING_FEE[size]) + 40
        return fee
    }
}