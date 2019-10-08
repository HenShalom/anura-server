import { makeStyles } from '@material-ui/core/styles';

function getPosition(selectedService, selectedEnvironment) {
  if (selectedService === '' || selectedEnvironment !== '') return '-50%';
  return '50%';
}

export default (selectedService, selectedEnvironment) =>
  makeStyles({
    card: {
      minWidth: '275',
      position: 'absolute',
      width: '30%',
      height: '45%',
      marginTop: '2.5%',
      top: '15%',
      transition: '1s',
      left: getPosition(selectedService, selectedEnvironment)
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    actions: {
      position: 'absolute',
      bottom: 0
    }
  });
