import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { withRouter } from 'react-router-dom';
import ServiceItem from './ServiceItem';
import { SearchContext } from '../../Context/Contexts';
import { configFilter, configSort } from '../../utils/configSearchHelpers';
import AddItemListItem from './AddItemListItem';
import LoadingError from '../Common/LoadingError';
import Loading from '../Common/Loading';
import { GET_SERVICE_LIST } from '../../Constant/GqlQueries';

const styles = theme => ({
  gridItem: {
    margin: '5px 50px'
  },
  title: {
    padding: '30px'
  },
  container: {
    maxHeight: '75vh',
    overflowY: 'auto'
  },
  subheader: {
    backgroundColor: '#fff',
    zIndex: 100
  }
});

class ConfigList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="config_list">
        <Query query={GET_SERVICE_LIST} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error)
              return (
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  <LoadingError />
                </Typography>
              );
            return (
              <List className={classes.gridItem} component="nav">
                <ListSubheader className={classes.subheader} component="div">
                  Your Services
                </ListSubheader>
                <AddItemListItem
                  onClick={() => this.props.history.push('new-service')}
                  text="Add New Service"
                />
                <SearchContext.Consumer>
                  {({ text }) => {
                    return data.services
                      .filter(configFilter(text))
                      .sort(configSort(text))
                      .map((service, key) => (
                        <ServiceItem service={service} key={key} searchText={text} />
                      ));
                  }}
                </SearchContext.Consumer>
              </List>
            );
          }}
        </Query>
      </div>
    );
  }
}

ConfigList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ConfigList));
