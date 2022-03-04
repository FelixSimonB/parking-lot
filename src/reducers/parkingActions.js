import { SETTING_PARKING_LOT, SET_PARKING_LOT, PARK, UNPARK } from "./parkingTypes"

export const initParking = (parkingLot) => {
    return {
        type: SET_PARKING_LOT,
        payload: parkingLot
    }
}

export const park = (parkingLot) => {
    return {
        type: PARK,
        payload: parkingLot
    }
}

export const unpark = (parkingLot, slot) => {
    parkingLot[slot].isOccupied = false

    let temp = [...parkingLot]

    return {
        type: UNPARK,
        payload: temp
    }
}