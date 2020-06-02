import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import WorkSelector from '../../components/work-selector/work-selector.component'
import CustomButton from '../../components/custom-button/custom-button.component'

import { fetchInspectionSheetAsync } from '../../redux/inspection-sheet/inspection-sheet.actions'
import { fetchInspectionItemsAsync } from '../../redux/inspection-items/inspection-items.actions'

import './export-sheet.style.css'

const ExportSheet = ({
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
    fetchInspectionSheet,
    fetchInspectionItems,
    inspectionItems,
    sheetContent
}) => {

    const [timing, setTiming] = useState(undefined)
    const [itemsState, setItemsState] = useState(undefined)
    const [notes, setNotes] = useState(undefined)
    const [photoHash, setPhotoHash] = useState(undefined)

    useEffect(() => {
        if (sheetContent) {
            if (sheetContent._timing == 0) setTiming('Check point')
            if (sheetContent._timing == 1) setTiming('During custructing')
            if (sheetContent._timing == 2) setTiming('After constructing')
            const stateArray = []
            sheetContent._itemsState.map((state, key) => {
                if (state == 0) stateArray.push('Blank')
                if (state == 1) stateArray.push('Qualified')
                if (state == 2) stateArray.push('Defective')
                if (state == 3) stateArray.push('Corrected')
                if (state == 4) stateArray.push('No this item')
                if (key == sheetContent._itemsState.length - 1) setItemsState(stateArray)
            })
            setNotes(window.web3.utils.toUtf8(sheetContent._note).split('@'))
            setPhotoHash(window.web3.utils.toUtf8(sheetContent._photo).split('@'))
        }
    }, [sheetContent != undefined])

    const showSheetContent = () => {
        const sheetIndex = 10000000 * selectedFirstLevelIndex + 100000 * selectedSecondLevelIndex + 1000 * selectedThirdLevelIndex + 1 * selectedForthLevelIndex
        fetchInspectionSheet(contract, selectedProject, sheetIndex)
        const workIndex = 10000000 * selectedFirstLevelIndex + 100000 * selectedSecondLevelIndex + 1000 * selectedThirdLevelIndex
        fetchInspectionItems(contract, selectedProject, workIndex)
    }

    const exportSheetToPDF = () => {
        html2canvas(document.getElementById('sheet-to-export'),
            { logging: true, letterRendering: 1, allowTaint: false, useCORS: true })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                const doc = new jsPDF()
                doc.addImage(imgData, "PNG", 6, 5)
                doc.save(`${10000000 * selectedFirstLevelIndex + 100000 * selectedSecondLevelIndex + 1000 * selectedThirdLevelIndex + 1 * selectedForthLevelIndex}.pdf`)
            })
    }

    return (
        <div className='export-sheet-page'>
            <div className='sheet-to-export-basic-info'>
                <a className='sheet-to-export-number'>
                    Sheet number: {10000000 * selectedFirstLevelIndex + 100000 * selectedSecondLevelIndex + 1000 * selectedThirdLevelIndex + 1 * selectedForthLevelIndex}
                </a>
                <div className='work-to-export-sheet-selector'>
                    <WorkSelector />
                    <CustomButton label='Confirm' onClick={showSheetContent} />
                </div>
            </div>
            <div className='sheet-to-export-container'>
                {
                    sheetContent && timing && itemsState && notes && photoHash
                        ?
                        <div>
                            <table className='sheet-to-export' id='sheet-to-export'>
                                <tbody>
                                    <tr>
                                        <td colSpan='5'>
                                            Inspection Sheet #{10000000 * selectedFirstLevelIndex + 100000 * selectedSecondLevelIndex + 1000 * selectedThirdLevelIndex + 1 * selectedForthLevelIndex}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Project</td>
                                        <td colSpan="3">{window.web3.utils.toUtf8(projects[selectedProject].name)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Contractor</td>
                                        <td colSpan="3">{window.web3.utils.toUtf8(sheetContent._contractor)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Inspector</td>
                                        <td colSpan="3">{sheetContent._executor}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Execute time</td>
                                        <td colSpan="3">{window.web3.utils.toUtf8(sheetContent._executeTime)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Work Item</td>
                                        <td colSpan="3">
                                            {
                                                WBSFirstLevel[selectedFirstLevelIndex] + '-'
                                                + WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]][selectedSecondLevelIndex] + '-'
                                                + WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]][selectedSecondLevelIndex]][selectedThirdLevelIndex] + '-'
                                                + WBSForthLevel[WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[selectedFirstLevelIndex]][selectedSecondLevelIndex]][selectedThirdLevelIndex]][selectedForthLevelIndex]
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Timing</td>
                                        <td colSpan="3">{timing}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">State</td>
                                        <td colSpan="3">
                                            {
                                                sheetContent._executed == 1
                                                    ? 'Initial Examination'
                                                    : 'Repeat Examination'
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">Inspection Result</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" align="center">Items</td>
                                        <td align="center">Result</td>
                                        <td align="center">Note</td>
                                        <td align="center">Photo</td>
                                    </tr>
                                    {
                                        inspectionItems.map((item, key) =>
                                            <tr key={key}>
                                                <td colSpan='2' style={{ width: 200, height: 150 }}>
                                                    {item}
                                                </td>
                                                <td style={{ width: 100 }}>
                                                    {itemsState[key]}
                                                </td>
                                                <td style={{ width: 130 }}>
                                                    {notes[key]}
                                                </td>
                                                <td style={{ width: 170 }}>
                                                    {photoHash[key]
                                                        ? <img src={"https://ipfs.infura.io/ipfs/" + photoHash[key]} style={{ width: 160, height: 120 }} />
                                                        : null
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className='export-button-container'>
                                <CustomButton label='Export' onClick={exportSheetToPDF} />
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    contract: state.contract.contract,
    projects: state.projects.projects,
    WBSFirstLevel: state.selectedProject.WBSFirstLevel,
    WBSSecondLevel: state.selectedProject.WBSSecondLevel,
    WBSThirdLevel: state.selectedProject.WBSThirdLevel,
    WBSForthLevel: state.selectedProject.WBSForthLevel,
    selectedProject: state.selectedProject.selectedProject,
    selectedFirstLevelIndex: state.selectWork.firstLevel,
    selectedSecondLevelIndex: state.selectWork.secondLevel,
    selectedThirdLevelIndex: state.selectWork.thirdLevel,
    selectedForthLevelIndex: state.selectWork.forthLevel,
    inspectionItems: state.inspectionItems.inspectionItems,
    sheetContent: state.inspectionSheet.sheetContent
})

const mapDispatchToProps = dispatch => ({
    fetchInspectionSheet: (contract, selectedProject, sheetIndex) => dispatch(fetchInspectionSheetAsync(contract, selectedProject, sheetIndex)),
    fetchInspectionItems: (contract, selectedProject, workIndex) => dispatch(fetchInspectionItemsAsync(contract, selectedProject, workIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExportSheet)