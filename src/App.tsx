import React from 'react';
import { Grid } from '@mui/material';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import ControlledTreeView from './components/Tree';
import ButtonLoadJSON from './components/ButtonLoadJSON';
import ButtonSaveToJSON from './components/ButtonSaveToJSON';

function App() {
  return (
    <div className="App">
      <main>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
              p={2}
            >
              <ButtonSaveToJSON />
              <ButtonLoadJSON />
            </Grid>
            <ControlledTreeView />
          </Grid>
          <Grid item xs={12} sm={4} className="sidebar" container>
            <Sidebar />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default App;
