import React from 'react';
import ConfigList from '../components/ConfigLists/ConfigList';
import FileViewer from '../components/FileViewer/FileViewer';
import InfoViewer from '../components/InfoViewer/InfoViewer';

class MainPage extends React.Component {
  render() {
    return (
      <div className="main">
        <ConfigList />
        <FileViewer />
        <InfoViewer />
      </div>
    );
  }
}

export default MainPage;
