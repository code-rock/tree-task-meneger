import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface WarningState {
    show: boolean,
    error: string
}

const initialState: WarningState = {
    show: false,
    error: ''
}

export const warningSlice = createSlice({
  name: 'warning',
  initialState,
  reducers: {
    warningShow: (state, action: PayloadAction<{ show: boolean, error: string }>) => {
      state.show = action.payload.show;
      state.error = action.payload.error;
    }
  },
})

export const { warningShow } = warningSlice.actions

export default warningSlice.reducer