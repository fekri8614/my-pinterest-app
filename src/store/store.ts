import { configureStore } from '@reduxjs/toolkit'
import selectedImagesReducer from './features/selectedImages/selectedImagesSlice'
import pinsReducer from "./features/pins/pinsSlice"

export const store = configureStore({
    reducer: {
        selectedImages: selectedImagesReducer,
        pins: pinsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch