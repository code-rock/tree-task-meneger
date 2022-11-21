import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { createTask, ITask, select } from '../store/tasks/tasks.reducer';
import { getLevels } from '../store/tasks/tasks.selector';

interface ITree{
    levels: {
      lvl: { number: ITask[] } | {},
      ids: string[]
    },
    selected: string,
    setSelectedId: any,
    create: (parent_id: string | null) => void
}

export function Tree({
    selected, setSelectedId, levels, create
}: ITree) {
  const { lvl, ids } = levels;
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelectedId(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ids : [],
    );
  };

  const drawLevel = (items: any) => {
    return items.map((item: any) => <TreeItem key={item.id} nodeId={item.id} label={item.name}>
        {// @ts-ignore
        lvl[item.id] && drawLevel(lvl[item.id])}
        <Button onClick={() => create(item.id)}>+</Button>
    </TreeItem>)
  }

  return (
    <Box sx={{ overflowWrap: 'break-word', textAlign: 'start', flexGrow: 1, overflowY: 'auto', height: '75vh', margin: '30px 30px' }}>
      <Box sx={{ mb: 1 }}>
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? 'Развернуть все' : 'Свернуть все'}
        </Button>
      </Box>
      
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={[selected]}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        style={{ width: '96%' }}
      >
        {
            // @ts-ignore
            drawLevel(lvl.null)
        }
        <Button onClick={() => create(null)}>+</Button>
      </TreeView>
    </Box>
  );
}


const mapStateToProps = (state: RootState) => ({
    selected: state.tasks.selectedId,
    levels: getLevels(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setSelectedId: (id: string) => dispatch(select(id)),
    create: (parent_id: string | null) => dispatch(createTask(parent_id))
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Tree);