import { configureStore } from '@reduxjs/toolkit';
import tasks from './tasks/tasks.reducer';
import warning from './warning'

export const store = configureStore({
  reducer: {
    tasks,
    warning
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch