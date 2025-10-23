import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectedImagesState {
    images: string[]
}

const initialState: SelectedImagesState = {
    images: [],
}

const selectedImagesSlice = createSlice({
    name: 'selectedImages',
    initialState,
    reducers: {
        addImage: (state, action: PayloadAction<string>) => {
            if(!state.images.includes(action.payload)) {
                state.images.push(action.payload)
            }
        },
        removeImage: (state, action:PayloadAction<string>) => {
            state.images = state.images.filter(img => img !== action.payload)
        },
        clearSelection: state => {
            state.images = []
        }
    }
})

export const { addImage, removeImage, clearSelection } = selectedImagesSlice.actions
export default selectedImagesSlice.reducer