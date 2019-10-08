import React from 'react';
import '../../styles/general/workInProgress.scss';

class WorkInProgress extends React.Component {
  render() {
    return (
      <div className="work-in-progress">
        <img alt="" src="/img/wip.jpg" className="work-in-progress-logo" />
      </div>
    );
  }
}

export default WorkInProgress;
