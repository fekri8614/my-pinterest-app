import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Pin {
    id: number
    image: string
    title: string
    height: number
}

interface PinsState {
    savedPins: Pin[]
    selectedPin: Pin | null
}

const initialState: PinsState = {
    savedPins: [],
    selectedPin: null,
}

const pinsSlice = createSlice({
    name: "pins",
    initialState,
    reducers: {
        savePin: (state, action: PayloadAction<Pin>) => {
            const exists = state.savedPins.some(p => p.id === action.payload.id)
            if (!exists) state.savedPins.push(action.payload)
        },
        unsavePin: (state, action: PayloadAction<number>) => {
            state.savedPins = state.savedPins.filter(p => p.id !== action.payload)
        },
        setSelectedPin: (state, action: PayloadAction<Pin | null>) => {
            state.selectedPin = action.payload
        },
    },
})

export const { savePin, unsavePin, setSelectedPin } = pinsSlice.actions
export default pinsSlice.reducer
