import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import SettingsDialog from './components/Common/SettingsDialog';
import MainPage from './pages/MainPage';
import GlobalVariable from './pages/GlobalConfig';
import NewServicePage from './pages/NewServicePage';
import NewEnvironmentsPage from './pages/NewEnvironmentsPage';
import WorkInProgress from './pages/general/WorkInProgress';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Header />
            <Switch className="content">
              <Route path="/" exact component={MainPage} />
              <Route path="/new-service" component={NewServicePage} />
              <Route path="/new-environment" component={NewEnvironmentsPage} />
              <Route path="/global-variable" component={GlobalVariable} />
              <Route path="/status" component={WorkInProgress} />
              <Route path="/docs" component={WorkInProgress} />
            </Switch>
            <SettingsDialog />
          </div>
        </Router>
        <ToastContainer position="bottom-left" />
      </div>
    );
  }
}

export default App;
