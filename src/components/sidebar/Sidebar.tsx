import React, { useEffect, useState, SyntheticEvent } from "react";
import { Button, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Tab, Tabs, TextField, ThemeProvider } from "@mui/material";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { changeTask, ITask } from "../../store/tasks/tasks.reducer";
import { TabContext, TabPanel } from "@mui/lab";
import theme from './SidebarTheme';

interface IInfo {
    task: ITask,
    saveTaskChanges: (task: ITask) => void
}

const categories = {
    undefined: 'Не задана',
    home: 'Домашние дела',
    work: 'Работа'
}


export function Info({ task, saveTaskChanges }: IInfo) {
    const [value, setValue] = useState("description")
    const [form, changeForm] = useState(task)

    useEffect(() => {
        changeForm(task)
    }, [task])

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        saveTaskChanges(form)
    }
    const handleChangeField = (e: any) => {
        const name = e.target.getAttribute('name');
        changeForm({
            ...form,
            // @ts-ignore
            name: name === 'name' ? e.target.value : form.name,
            // @ts-ignore
            params: {
                ...form.params,
                description: name === 'description' ? e.target.value : (form.params ? form.params.description : ''),

            }
        })
    }

    const handleChangeSelect = (event: SelectChangeEvent<string>) => {
        changeForm({
            ...form,
            params: {
                ...form.params,
                category: event.target.value
            }
        })
    }

    const handleTabChange = (e: SyntheticEvent, value: string) => {
        setValue(value)
    }

    const handleDone = (e: SyntheticEvent) => {
        changeForm({ ...form, done: !form.done })
    }

    return (
        <Grid style={{ paddingBottom: "20px", background: form.done? "#36D986": "#282c34" }} xs={12} alignItems="stretch">
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit}>
                    <TabContext value={value}>
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="Task options"
                        >
                            <Tab label="Описание" value="description" key="description"  className="sidebar__text" />
                            <Tab label="Параметры" value="internals" key="internals" className="sidebar__text" />
                        </Tabs>
                        <TabPanel value="description">
                            <TextField
                                onChange={handleChangeField}
                                name="name"
                                label="Задача"
                                multiline
                                variant="filled" 
                                value={form.name} 
                            />
                            <TextField
                                value={form.params ? form.params.description : ''}
                                label="Описание"
                                name="description"
                                placeholder="Напишите подробности, чтобы не забыть.."
                                multiline 
                                variant="filled"
                                onChange={handleChangeField}
                            />
                        </TabPanel>
                        <TabPanel value="internals">
                            <p className="sidebar__text">Категория</p>
                            <Select
                                variant="filled"
                                onChange={handleChangeSelect}
                                name="category"
                                // @ts-ignore
                                value={form.params.category}
                                input={<OutlinedInput />}
                            >
                                {Object.entries(categories).map((category) => (
                                    <MenuItem key={category[0]} value={category[0]} >
                                        {category[1]}
                                    </MenuItem>
                                ))}
                            </Select>
                            
                        </TabPanel>
                    </TabContext>
                    <Grid spacing={0} columns={{ xs: 4, sm: 8, md: 12 }} container direction="row" justifyContent="center" alignItems="center" gap={2}>
                        <Button variant="contained" onClick={handleDone}>{form.done? "Доработать": "Выполнено"}</Button>
                        <Button variant="contained" type="submit">Сохронить</Button>
                    </Grid>
                </form>
            </ThemeProvider>
        </Grid>
    );
}

const mapStateToProps = (state: RootState) => ({
    task: state.tasks.selectedTask
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    saveTaskChanges: (task: ITask) => dispatch(changeTask(task))
})


export default connect(mapStateToProps, mapDispatchToProps)(Info);


