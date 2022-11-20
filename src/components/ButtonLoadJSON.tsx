import { Button } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { AppDispatch } from '../store/store';
import { ITask, saveTasksFromJson } from '../store/tasks/tasks.reducer';
import { warningShow } from '../store/warning';

export type TJSON<T> = Object | Array<T> | number | string | boolean;

interface IButtonLoadJSON<T> {
    saveFile: (value: TJSON<T>) => void,
    warning: () => void
}

export function ButtonLoadJSON<T>({ saveFile, warning }: IButtonLoadJSON<T>) {
    const handleLoadJson = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            // @ts-ignore
            const file = event.target.files[0];
            const text = await file.text();
            saveFile(JSON.parse(text));
        } catch(e) {
            warning()
        }
    }

    return (
        <Button variant="contained" component="label">
            Загрузить JSON
            <input hidden accept="application/json" type="file" onChange={handleLoadJson} />
        </Button>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    saveFile: (value: TJSON<ITask>) => { 
        if (Array.isArray(value) 
            && value[0].hasOwnProperty('id')
            && value[0].hasOwnProperty('parent_id')
            && value[0].hasOwnProperty('name')) {
            dispatch(saveTasksFromJson(value)) 
            console.log('ok')
        } else {
            dispatch(warningShow({
                show: true,
                error: 'Загруженный файл не соответвует формату файлов приложения'
            }))
            console.log('error')
        }
    },
    warning: () => {
        dispatch(warningShow({
            show: true,
            error: 'Произошла ошибка при загрузке файла'
        }))
    }
})
  
  
export default connect(null, mapDispatchToProps)(ButtonLoadJSON<ITask>);