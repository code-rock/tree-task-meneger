import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import tasksJson from '../../tasks.json';

export interface ITask{
  id: string,
  parent_id: string | null,
  name?: string,
  done?: boolean,
  params?: {
    description?: string,
    category?: string
  }
}

interface TasksState {
    selectedId: string,
    selectedTask: ITask,
    tasks: ITask[]
}

const EmptyTask = { 
  id: Date.now().toString(),
  parent_id: null
};

const initialState: TasksState = {
  selectedId: '1',
  selectedTask: tasksJson[0] || EmptyTask,
  tasks: tasksJson || [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<string>) => {
      state.selectedTask = state.tasks.find((task: any) => task.id === action.payload) || EmptyTask;
      state.selectedId = action.payload;
    },
    changeTask: (state, action: PayloadAction<ITask>) => {
      const id = state.tasks.findIndex((task: any) => task.id === action.payload.id)
      if (id === -1) {
        state.tasks = [...state.tasks, action.payload];
      } else {
        state.tasks[id] = action.payload;
      }
    },
    saveTasksFromJson: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload
    },
    createTask: (state, action: PayloadAction<string | null>) => {
      state.selectedTask = {
        id: Date.now().toString(),
        parent_id: action.payload,
        name: '',
        params: {
          description: '',
          category: ''
        }
      }
    }
  },
})

export const { select, saveTasksFromJson, changeTask, createTask } = tasksSlice.actions

export default tasksSlice.reducer