import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, fade } from '@material-ui/core';
import { useContext, useState } from 'react';
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme) => ({
  card: {
    width: '280px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: '#5AAC44',
    color: '#FFF',
    '&:hover': {
      background: fade('#5AAC44', 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));

const InputCard = ({ setOpen, listId, type }) => {
  const classes = useStyle();
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState(null);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBtnClick = () => {
    if (type === 'card') {
      console.log(listId, title);
      addMoreCard(title, listId);
      setTitle('');
      setOpen(false);
    } else {
      console.log(title);
      addMoreList(title);
      setTitle('');
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleChange}
            multiline
            onBlur={() => setOpen(false)}
            fullWidth
            inputProps={{
              classes: classes.input,
            }}
            value={title}
            placeholder={
              type === 'card' ? 'Enter a title...' : 'Enter list title'
            }
          />
        </Paper>
      </div>

      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleBtnClick}>
          {type === 'card' ? 'Add Card' : 'Add List'}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default InputCard;
