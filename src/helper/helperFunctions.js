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