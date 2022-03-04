export const PARK_NAME_SIZES = {
    S: 'Small',
    M: 'Medium',
    L: 'Large'
}

export const CAR_SIZES = [
    {
        label: 'Small',
        value: 0
    },
    {
        label: 'Medium',
        value: 1
    },
    {
        label: 'Large',
        value: 2
    }
]

export const PARK_SIZES = {
    S: 1,
    M: 2,
    L: 3
}

export const PARK_WIDTH = {
    S: 3,
    M: 3,
    L: 3
}
export const getParkingSize = (size) => {
    switch (size) {
        case 0:
            return 'S'
        case 1:
            return 'M'
        case 2:
            return 'L'
        default:
            break
    }
}

//INPUT
export const NO_ENTRY_POINTS = 3

export const getEntryPoints = () =>{
    let entryPoints = []

    for (let index = 0; index < NO_ENTRY_POINTS; index++) {
        let value = index + 1
        entryPoints.push({
            label: (value + 9).toString(36).toUpperCase(),
            value: index
        })
    }

    return entryPoints
}

export const ENTRY_POINTS = getEntryPoints()

//INPUTS

export const PARKING_MAP =
[
    0, 2, 1, 1,
    2, 2, 2, 0,
    0, 0, 0, 2
]

// Actual Size
// [
//     1, 3, 2, 2,
//     3, 3, 3, 1,
//     1, 1, 1, 3
// ]

export const PARKING_SPACE =
[
    [1,8,5], [2,5,5], [5,3,5], [7,1,5],
    [1,8,2], [4,5,2], [7,2,2], [10,1,4],
    [1,6,1], [2,5,1], [3,4,1], [4,1,1]
]
