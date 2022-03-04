
import { SETTING_PARKING_LOT, SET_PARKING_LOT, PARK, UNPARK } from "./parkingTypes"

const initialState = {
    parkingLot: null
}

const parkingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETTING_PARKING_LOT:
            return {
                parkingLot: null
            }
        case SET_PARKING_LOT:
            return {
                parkingLot: action.payload
            }
        case PARK:
            return {
                parkingLot: action.payload
            }
        case UNPARK:
            return {
                parkingLot: action.payload
            }
        default:
            return state
    }
}

export default parkingReducer