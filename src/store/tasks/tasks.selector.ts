import { RootState } from "../store";
import { ITask } from "./tasks.reducer";

export const getLevels = (state: RootState) => {
  const lvl = {}
  const ids = state.tasks.tasks.map((task: ITask) => {
    // @ts-ignore
    lvl[task.parent_id] = lvl[task.parent_id ] ? [...lvl[task.parent_id], task]: [task]
    return task.id
  })
  return {
    lvl,
    ids
  }
}
