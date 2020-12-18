import React from "react";
import './App.css';
import movies from './helpers/SearchMovies'
import FindBySimilarPersons from "./helpers/FindBySimilarPersons";
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

function App() {
  const czarekRecomendations = movies().bestMoviesWithoutDuplicates;
  const wojtekRecommendations = FindBySimilarPersons();
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSec, setOpenSec] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickSec = () => {
    setOpenSec(!openSec);
  };

  return (
      <div style={{margin: "40px auto", width: "400px"}}>
      <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Rekomendowane filmy
            </ListSubheader>
          }
          className={classes.root}
      >
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Czarek" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {czarekRecomendations.map(recommendation =>(<ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
                <ListItemText primary={recommendation} />
            </ListItem>))}
          </List>
        </Collapse>
        <ListItem button onClick={handleClickSec}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Wojtek" />
          {openSec ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSec} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {wojtekRecommendations.map(recommendation =>(<ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={recommendation} />
            </ListItem>))}
          </List>
        </Collapse>
      </List>
      </div>
  )
}

export default App;
