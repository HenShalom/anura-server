const ActionButton = {
  position: 'absolute',
  zIndex: 10,
  top: '52px',
  right: '30px'
};
export const VersionViewer = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  viewer: {
    margin: '2vh 1vw',
    height: 'inherit',
    overflowY: 'auto'
  },
  paperRoot: {
    position: 'relative',
    paddingBottom: '5px'
  },
  editButton: ActionButton,
  container: {
    width: '100%',
    height: '100%'
  }
});

export const EditActions = theme => ({
  settingButton: ActionButton,
  saveChanges: {
    position: 'absolute',
    zIndex: 10,
    bottom: '10px',
    right: '125px'
  },
  cancel: {
    position: 'absolute',
    zIndex: 10,
    bottom: '10px',
    right: '15px'
  }
});
