import { combineReducers } from 'redux'

import sideBarReducer from './side-bar/side-bar.reducer'
import headerReducer from './header/header.reducer'
import userAccountReducer from './user/user-account/user-account.reducer'
import userNameReducer from './user/user-name/user-name.reducer'
import userCompanyReducer from './user/user-company/user-company.reducer'
import contractReducer from './contract/contract.reducer'
import projectsReducer from './projects/projects.reducer'
import selectedProjectReducer from './seleted-project/selected-project.reducer'
import selectWorkReducer from './select-work/select-work.reducer'
import inspectionItemsReducer from './inspection-items/inspection-items.reducer'
import fileBufferReducer from './file-buffer/file-buffer.reducer'
import executingStateReducer from './executing-state/executing-state-reducer'
import inspectionSheetReducer from './inspection-sheet/inspection-sheet.reducer'

const rootReducer = combineReducers({
    sideBar: sideBarReducer,
    header: headerReducer,
    userAccount: userAccountReducer,
    userName: userNameReducer,
    userCompany: userCompanyReducer,
    contract: contractReducer,
    projects: projectsReducer,
    selectedProject: selectedProjectReducer,
    selectWork: selectWorkReducer,
    inspectionItems: inspectionItemsReducer,
    fileBuffer: fileBufferReducer,
    executingState: executingStateReducer,
    inspectionSheet: inspectionSheetReducer
})

export default rootReducer