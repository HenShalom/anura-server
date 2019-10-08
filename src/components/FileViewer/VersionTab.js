import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class VersionTab extends React.PureComponent {
  render() {
    const { maxVersion, configs, currentIndex, handleChange } = this.props;
    return (
      <Grid item xs={12} sm={12}>
        <AppBar position="static" color="inherit">
          <Tabs
            value={currentIndex}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            {configs.map((item, key) => (
              <Tab
                key={key}
                label={
                  maxVersion === item.version
                    ? `newest (${item.version + 1})`
                    : `Version ${item.version + 1}`
                }
              />
            ))}
          </Tabs>
        </AppBar>
      </Grid>
    );
  }
}

export default VersionTab;
