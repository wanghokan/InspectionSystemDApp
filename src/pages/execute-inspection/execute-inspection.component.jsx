import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import WorkSelector from '../../components/work-selector/work-selector.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomFileUploader from '../../components/custom-file-uploader/custom-file-uploader.component'

import { fetchInspectionItemsAsync } from '../../redux/inspection-items/inspection-items.actions'
import { fetchInspectionSheetAsync } from '../../redux/inspection-sheet/inspection-sheet.actions'

import './execute-inspection.style.css'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const ExecuteInspection = ({
    account,
    contract,
    projects,
    selectedProject,
    WBSFirstLevel,
    WBSSecondLevel,
    WBSThirdLevel,
    WBSForthLevel,
    selectedFirstLevelIndex,
    selectedSecondLevelIndex,
    selectedThirdLevelIndex,
    selectedForthLevelIndex,
    workIndex,
    sheetIndex,
    fetchInspectionItems,
    inspectionItems,
    fetchInspectionSheet,
    sheetContent
}) => {

    const [isInspecting, setIsInspecting] = useState(false)

    const [resultsArray, setResultsArray] = useState([])
    const [photosHash, setPhotosHash] = useState([])
    const [notes, setNotes] = useState([])

    const inspectionTimingArray = ['Check point', 'During custructing', 'After constructing']

    useEffect(() => {
        if (sheetContent) {
            setResultsArray(sheetContent._itemsState)
            setPhotosHash(new Array(sheetContent._itemsState.length).fill(''))
            setNotes(new Array(sheetContent._itemsState.length).fill(''))
        }
    }, [sheetContent != undefined])

    const toExecuteTheInspection = () => {
        fetchInspectionItems(contract, selectedProject, workIndex)
        fetchInspectionSheet(contract, selectedProject, sheetIndex)
        setIsInspecting(true)
    }

    const handleResultSelect = event => {
        const id = event.target.id
        const value = event.target.value

        setResultsArray(prevState => {
            prevState[id] = value
            return prevState
        })
    }

    const handlePhotoChange = event => {
        const id = event.target.id
        if (event.target.files[0]) {
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(event.target.files[0])
            reader.onloadend = () => {
                ipfs.add(Buffer(reader.result), async (error, result) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                    setPhotosHash(prevState => {
                        prevState[id] = result[0].hash
                        return prevState
                    })
                    setIsInspecting(false)
                    setIsInspecting(true)
                })
            }
        }

    }

    const handleNoteChange = event => {
        const id = event.target.id
        const value = event.target.value
        setNotes(prevState => {
            prevState[id] = value
            return prevState
        })
    }

    const uploadInspectedSheet = () => {
        const photosHashString = photosHash.reduce((accumulator, currentValue, currentIndex) => {
            if (currentIndex != photosHash.length - 1) {
                return accumulator + (currentValue + '@')
            }
            else {
                return accumulator + currentValue
            }
        }, '')
        const notesString = notes.reduce((accumulator, currentValue, currentIndex) => {
            if (currentIndex != notes.length - 1) {
                return accumulator + (currentValue + '@')
            }
            else {
                return accumulator + currentValue
            }
        }, '')
        const date = new Date().toString()
        const photosHashStringToHex = window.web3.utils.fromUtf8(photosHashString)
        const notesStringToHex = window.web3.utils.fromUtf8(notesString)
        const dateToHex = window.web3.utils.fromUtf8(date)
        contract.methods.fillSheet(selectedProject, sheetIndex, resultsArray, dateToHex, notesStringToHex, photosHashStringToHex).send({ from: account }).once("receipt", () => { console.log("receipt") })
    }

    return (
        isInspecting && inspectionItems && sheetContent
            ?
            <div className='execute-inspection-page'>
                <div className='execute-inspection-sheet-container'>
                    <div className='execute-inspection-sheet-basic-info-container'>
                        <div className='execute-inspection-sheet-basic-info-title'>
                            <a>Basic Information</a>
                        </div>
                        <div className='execute-inspection-sheet-number'>
                            <a>Sheet number: {sheetIndex}</a>
                        </div>
                        <div className='execute-inspection-sheet-project-name'>
                            <a>Project: {window.web3.utils.toUtf8(projects[selectedProject].name)}</a>
                        </div>
                        <div className='execute-inspection-sheet-work'>
                            <a>Work item:
                                {
                                    WBSFirstLevel[selectedFirstLevelIndex] + '-'
                                    + WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]][selectedSecondLevelIndex] + '-'
                                    + WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]][selectedSecondLevelIndex]][selectedThirdLevelIndex] + '-'
                                    + WBSForthLevel[WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]][selectedSecondLevelIndex]][selectedThirdLevelIndex]][selectedForthLevelIndex]
                                }
                            </a>
                        </div>
                        <div className='execute-inspection-sheet-contractor'>
                            <a>Contractor: {window.web3.utils.toUtf8(sheetContent._contractor)}</a>
                        </div>
                        <div className='execute-inspection-sheet-executing-timing'>
                            <a>Inspection timing: {inspectionTimingArray[sheetContent._timing]}</a>
                        </div>
                        <div className='execute-inspection-sheet-executed-times'>
                            <a>Executed times: {sheetContent._executed}</a>
                        </div>
                    </div>
                    <div className='execute-inspection-items-container'>
                        <div className='execute-inspection-items-title'>
                            <a>Inspection Items</a>
                        </div>
                        <div className='execute-inspection-items'>
                            {
                                inspectionItems.map((item, key) =>
                                    <div key={key}>
                                        <div className='execute-inspection-item'>
                                            <a>{key + 1}. {item}</a>
                                        </div>
                                        <div className='execute-inspection-information-container'>
                                            <div className='execute-inspection-result-and-photo'>
                                                <div className='execution-inspection-result-selector'>
                                                    <a style={{ fontSize: 14, paddingRight: 5 }}>Result: </a>
                                                    <select id={key} defaultValue={resultsArray[key]} onChange={handleResultSelect}>
                                                        <option value={0}>Blank</option>
                                                        <option value={1}>Qualified</option>
                                                        <option value={2}>Defective</option>
                                                        <option value={3}>Corrected</option>
                                                        <option value={4}>No this item</option>
                                                    </select>
                                                </div>
                                                <div className='execute-inspection-photo'>
                                                    <a style={{ fontSize: 14, paddingRight: 5 }}>Photo: </a>
                                                    <label className='custom-file-uploader'>
                                                        <input id={key} className='custom-file-input' type='file' accept='image/*' capture='camera' onChange={handlePhotoChange} />
                                                        <a style={{ fontSize: 12 }}>
                                                            {
                                                                photosHash[key]
                                                                    ? 'uploaded'
                                                                    : 'Take a photo'
                                                            }
                                                        </a>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='execute-inspection-note-input'>
                                                <a style={{ fontSize: 14, paddingRight: 5 }}>Note: </a>
                                                <input id={key} style={{ width: '80%' }} onChange={handleNoteChange} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='execute-inspection-upload-button-container'>
                        <CustomButton label='Upload' onClick={uploadInspectedSheet} />
                    </div>
                </div>
            </div>
            :
            <div className='execute-inspection-page'>
                <div className='execute-inspection-work-selector-container'>
                    <WorkSelector direction='vertical' />
                    <div className='execute-inspection-selected-work-confirm-button-container'>
                        <CustomButton label='Confirm' onClick={toExecuteTheInspection} />
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = state => ({
    account: state.userAccount.account,
    contract: state.contract.contract,
    projects: state.projects.projects,
    selectedProject: state.selectedProject.selectedProject,
    WBSFirstLevel: state.selectedProject.WBSFirstLevel,
    WBSSecondLevel: state.selectedProject.WBSSecondLevel,
    WBSThirdLevel: state.selectedProject.WBSThirdLevel,
    WBSForthLevel: state.selectedProject.WBSForthLevel,
    selectedFirstLevelIndex: state.selectWork.firstLevel,
    selectedSecondLevelIndex: state.selectWork.secondLevel,
    selectedThirdLevelIndex: state.selectWork.thirdLevel,
    selectedForthLevelIndex: state.selectWork.forthLevel,
    workIndex: 10000000 * state.selectWork.firstLevel + 100000 * state.selectWork.secondLevel + 1000 * state.selectWork.thirdLevel,
    sheetIndex: 10000000 * state.selectWork.firstLevel + 100000 * state.selectWork.secondLevel + 1000 * state.selectWork.thirdLevel + 1 * state.selectWork.forthLevel,
    inspectionItems: state.inspectionItems.inspectionItems,
    sheetContent: state.inspectionSheet.sheetContent
})

const mapDispatchToProps = dispatch => ({
    fetchInspectionItems: (contract, selectedProject, workIndex) => dispatch(fetchInspectionItemsAsync(contract, selectedProject, workIndex)),
    fetchInspectionSheet: (contract, selectedProject, sheetIndex) => dispatch(fetchInspectionSheetAsync(contract, selectedProject, sheetIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteInspection)