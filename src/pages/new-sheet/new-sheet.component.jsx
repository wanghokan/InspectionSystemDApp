import React, { useState } from 'react'
import { connect } from 'react-redux'

import { fetchInspectionItemsAsync } from '../../redux/inspection-items/inspection-items.actions'

import WorkSelector from '../../components/work-selector/work-selector.component'
import CustomButton from '../../components/custom-button/custom-button.component'

import './new-sheet.style.css'

const NewSheet = ({ account, projects, contract, selectedProject, fetchInspectionItems, selectedWork, inspectionItems, selectedForthLevelIndex }) => {
    const [contractorName, setContractorName] = useState('')
    const [timing, setTiming] = useState(-1)

    const uploadNewSheet = () => {
        const itemsState = new Array(inspectionItems.length).fill(0)
        console.log(selectedProject, selectedWork, itemsState, timing, contractorName)
        contract.methods.createSheet(selectedProject, selectedWork, itemsState, timing, contractorName).send({ from: account }).once("receipt", () => { console.log("receipt") })
    }

    return (
        <div className='new-sheet-page'>
            <div className='new-sheet-container'>
                <div className='new-sheet-basic-info-container'>
                    <div className='new-sheet-basic-info-title'>
                        <a>Basic Information</a>
                    </div>
                    <div className='new-sheet-number-and-project-name'>
                        <a className='new-sheet-number'>Sheet number: {selectedWork + 1 * selectedForthLevelIndex}</a>
                        <a className='new-sheet-project-name'>Project: {window.web3.utils.toUtf8(projects[selectedProject].name)}</a>
                    </div>
                    <div className='new-sheet-work'>
                        <WorkSelector />
                    </div>
                    <div className='new-sheet-contractor'>
                        <a>Contractor: </a>
                        <input className='contractor-input' onChange={event => setContractorName(event.target.value)} />
                    </div>
                    <div className='new-sheet-executing-timing'>
                        <a>Inspection Timing: </a>
                        <select className='executing-timing-selector' onChange={event => setTiming(event.target.value)}>
                            <option></option>
                            <option value={0}>Check point</option>
                            <option value={1}>During custructing</option>
                            <option value={2}>After constructing</option>
                        </select>
                    </div>
                </div>
                <div className='new-sheet-inspection-items-container'>
                    <div className='new-sheet-inspection-items-title-and-button'>
                        <a className='new-sheet-inspection-items-title'>Inspection Items</a>
                        <CustomButton label='Import' onClick={() => fetchInspectionItems(contract, selectedProject, selectedWork)} />
                    </div>
                    <div className='new-sheet-inspection-items'>
                        {
                            inspectionItems.map((item, index) =>
                                <div className='inspection-item' key={index}>
                                    <a>{index + 1}. {item}</a>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='new-sheet-upload-button-container'>
                <CustomButton label='Create' onClick={uploadNewSheet} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    account: state.userAccount.account,
    contract: state.contract.contract,
    projects: state.projects.projects,
    selectedProject: state.selectedProject.selectedProject,
    selectedFirstLevelIndex: state.selectWork.firstLevel,
    selectedSecondLevelIndex: state.selectWork.secondLevel,
    selectedThirdLevelIndex: state.selectWork.thirdLevel,
    selectedForthLevelIndex: state.selectWork.forthLevel,
    selectedWork: 10000000 * state.selectWork.firstLevel + 100000 * state.selectWork.secondLevel + 1000 * state.selectWork.thirdLevel,
    inspectionItems: state.inspectionItems.inspectionItems
})

const mapDispatchToProps = dispatch => ({
    fetchInspectionItems: (contract, selectedProject, workIndex) => dispatch(fetchInspectionItemsAsync(contract, selectedProject, workIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewSheet)