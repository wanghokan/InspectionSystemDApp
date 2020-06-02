import React from 'react'
import { connect } from 'react-redux'

import WorkSelector from '../../components/work-selector/work-selector.component'
import CustomFileUploader from '../../components/custom-file-uploader/custom-file-uploader.component'
import CustomButton from '../../components/custom-button/custom-button.component'

import './import-inspection-items.style.css'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const ImportInspectionItems = ({ contract, account, selectedProject, fileBuffer, selectedFirstLevelIndex, selectedSecondLevelIndex, selectedThirdLevelIndex }) => {

    const uploadNewInspectionItems = event => {
        const inspectionItemsIndex = 10000000 * selectedFirstLevelIndex + 100000 * selectedSecondLevelIndex + 1000 * selectedThirdLevelIndex
        event.preventDefault()
        console.log("Submitting file to ipfs...")
        console.log(fileBuffer)
        ipfs.add(fileBuffer, async (error, result) => {
            if (error) {
                console.error(error)
                return
            }
            contract.methods.uploadItem(selectedProject, inspectionItemsIndex, result[0].hash).send({ from: account }).once("receipt", () => { console.log("receipt") })
        })
    }

    return (
        <div className='import-inspection-items-page' >
            < div className='work-to-import-selector-container' >
                <WorkSelector direction='vertical' />
            </div >
            <div className='inspection-items-file-uploader-container'>
                <CustomFileUploader label='Select the file' accpet='.json' />
                <CustomButton label='Upload' onClick={uploadNewInspectionItems} />
            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    contract: state.contract.contract,
    account: state.userAccount.account,
    selectedProject: state.selectedProject.selectedProject,
    fileBuffer: state.fileBuffer.fileBuffer,
    selectedFirstLevelIndex: state.selectWork.firstLevel,
    selectedSecondLevelIndex: state.selectWork.secondLevel,
    selectedThirdLevelIndex: state.selectWork.thirdLevel
})

export default connect(mapStateToProps)(ImportInspectionItems)