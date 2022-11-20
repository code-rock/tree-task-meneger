import { Button, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { ITask } from '../store/tasks/tasks.reducer';
import { TJSON } from './ButtonLoadJSON';

interface IButtonSaveToJSON<T> {
    data: TJSON<T>
}

export function ButtonSaveToJSON<T>({ data }: IButtonSaveToJSON<T>) {
    const [url, setUrl] = useState<null | string>(null) 

    useEffect(() => {
        const text = JSON.stringify(data)
        const blob = new Blob([text], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        setUrl(url)
    }, [data, setUrl])

    return (
        <Button 
            component={Link}
            href={url || '/'}
            variant="contained" 
            disabled={!url}
            download="task-list.json"
        >
                Скачать JSON
        </Button>
    )
}

const mapStateToProps = (state: RootState) => ({
    data: state.tasks.tasks
})
  
export default connect(mapStateToProps, null)(ButtonSaveToJSON<ITask>)