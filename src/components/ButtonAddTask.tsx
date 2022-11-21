import { Button, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { createTask, ITask } from '../store/tasks/tasks.reducer';
import { TJSON } from './ButtonLoadJSON';

interface IButtonAddTask<T> {

}

export function ButtonAddTask<T>({  }: IButtonAddTask<T>) {
    const handleClick = () => {

    }

    return (
        <Button onClick={handleClick}>+</Button>
    )
}

const mapStateToProps = (state: RootState) => ({
    // data: state.tasks.tasks
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    create: (parent_id: string | null) => dispatch(createTask(parent_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddTask<ITask>)