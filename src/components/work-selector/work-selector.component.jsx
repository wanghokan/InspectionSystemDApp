import React from 'react'
import { connect } from 'react-redux'

import { selectFirstLevelWork, selectSecondLevelWork, selectThirdLevelWork, selectForthLevelWork } from '../../redux/select-work/select-work.actions'

import './work-selector.style.css'

const WorkSelector = ({
    direction = 'horizontal',
    WBSFirstLevel,
    WBSSecondLevel,
    WBSThirdLevel,
    WBSForthLevel,
    selectedFirstLevelIndex,
    selectedSecondLevelIndex,
    selectedThirdLevelIndex,
    selectedForthLevelIndex,
    selectFirstLevelWork,
    selectSecondLevelWork,
    selectThirdLevelWork,
    selectForthLevelWork
}) => {

    return (
        <div className={`${direction}-work-selector-container`}>
            <div className={`${direction}-each-level-work-selector`}>
                <a>Category: </a>
                <select
                    className={`${direction}-work-selector`}
                    defaultValue={selectedFirstLevelIndex}
                    onChange={event => {
                        selectFirstLevelWork(event.target.value)
                        selectSecondLevelWork(0)
                        selectThirdLevelWork(0)
                        selectForthLevelWork(0)
                    }}
                >
                    {
                        WBSFirstLevel
                            ? WBSFirstLevel.map((work, index) =>
                                <option key={index} value={index}>{work}</option>
                            )
                            : <option></option>
                    }
                </select>
            </div>
            <div className={`${direction}-each-level-work-selector`}>
                <a>Term: </a>
                <select
                    className={`${direction}-work-selector`}
                    defaultValue={selectedSecondLevelIndex}
                    onChange={event => {
                        selectSecondLevelWork(event.target.value)
                        selectThirdLevelWork(0)
                        selectForthLevelWork(0)
                    }}
                >
                    {
                        WBSSecondLevel
                            ? WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]].map((work, index) =>
                                <option key={index} value={index}>{work}</option>
                            )
                            : <option></option>
                    }
                </select>
            </div>
            <div className={`${direction}-each-level-work-selector`}>
                <a>Task: </a>
                <select
                    className={`${direction}-work-selector`}
                    defaultValue={selectedThirdLevelIndex}
                    onChange={event => {
                        selectThirdLevelWork(event.target.value)
                        selectForthLevelWork(0)
                    }}
                >
                    {
                        WBSThirdLevel
                            ? WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]][selectedSecondLevelIndex]].map((work, index) =>
                                <option key={index} value={index}>{work}</option>
                            )
                            : <option></option>
                    }
                </select>
            </div>
            <div className={`${direction}-each-level-work-selector`}>
                <a>Location: </a>
                <select
                    className={`${direction}-work-selector`}
                    defaultValue={selectedForthLevelIndex}
                    onChange={event => {
                        selectForthLevelWork(event.target.value)
                    }}
                >
                    {
                        WBSForthLevel
                            ? WBSForthLevel[WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]][selectedSecondLevelIndex]][selectedThirdLevelIndex]].map((work, index) =>
                                <option key={index} value={index}>{work}</option>
                            )
                            : <option></option>
                    }
                </select>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    WBSFirstLevel: state.selectedProject.WBSFirstLevel,
    WBSSecondLevel: state.selectedProject.WBSSecondLevel,
    WBSThirdLevel: state.selectedProject.WBSThirdLevel,
    WBSForthLevel: state.selectedProject.WBSForthLevel,
    selectedFirstLevelIndex: state.selectWork.firstLevel,
    selectedSecondLevelIndex: state.selectWork.secondLevel,
    selectedThirdLevelIndex: state.selectWork.thirdLevel,
    selectedForthLevelIndex: state.selectWork.forthLevel
})

const mapDispatchToProps = dispatch => ({
    selectFirstLevelWork: index => dispatch(selectFirstLevelWork(index)),
    selectSecondLevelWork: index => dispatch(selectSecondLevelWork(index)),
    selectThirdLevelWork: index => dispatch(selectThirdLevelWork(index)),
    selectForthLevelWork: index => dispatch(selectForthLevelWork(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkSelector)