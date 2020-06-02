import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { loadWeb3 } from './web3/web3.utils';
import { fetchAccountAsync } from './redux/user/user-account/user-account.actions';

import Header from './components/header/header.component';
import SideBar from './components/side-bar/side-bar.component';
import HomePage from './pages/homepage/homepage.component';
import WithSelectedChecker from './components/with-selected-checker/with-selected-checker.component'
import NewProject from './pages/new-project/new-project.component';
import NewSheet from './pages/new-sheet/new-sheet.component';
import ImportInspectionItems from './pages/import-inspection-items/import-inspection-items.component';
import ExecuteInspection from './pages/execute-inspection/execute-inspection.component';
import ExecutingState from './pages/executing-state/executing-state.component';
import ExportSheet from './pages/export-sheet/export-sheet.component';

import './App.css';

const ImportInspectionItemsWithSelectedChecker = WithSelectedChecker(ImportInspectionItems)
const NewSheetWithSelectedChecker = WithSelectedChecker(NewSheet)
const ExecutingStateWithSelectedChecker = WithSelectedChecker(ExecutingState)
const ExportSheetWithSelectedChecker = WithSelectedChecker(ExportSheet)

const App = ({ fetchUserAccount, selectedProject }) => {

  useEffect(() => {
    console.log('app')
    loadWeb3()
    fetchUserAccount()
  }, [])

  return (
    <HashRouter basename='/'>
      <div className='app'>
        <Header />
        <SideBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/new_project' component={NewProject} />
          <Route
            path='/import_inspection_items'
            render={props => (
              <ImportInspectionItemsWithSelectedChecker isSelected={selectedProject != -1} {...props} />
            )}
          />
          <Route
            path='/new_sheet'
            render={props => (
              <NewSheetWithSelectedChecker isSelected={selectedProject != -1} {...props} />
            )}
          />
          <Route path='/execute_inspection' component={ExecuteInspection} />
          <Route
            path='/executing_state'
            render={props => (
              <ExecutingStateWithSelectedChecker isSelected={selectedProject != -1} {...props} />
            )}
          />
          <Route
            path='/export_sheet'
            render={props => (
              <ExportSheetWithSelectedChecker isSelected={selectedProject != -1} {...props} />
            )}
          />
        </Switch>
      </div>
    </HashRouter>
  )
}

const mapStateToProps = state => ({
  selectedProject: state.selectedProject.selectedProject
})

const mapDispatchToProps = dispatch => ({
  fetchUserAccount: () => dispatch(fetchAccountAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
