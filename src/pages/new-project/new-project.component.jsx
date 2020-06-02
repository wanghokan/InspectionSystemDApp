import React, { useState } from 'react'
import { connect } from 'react-redux'

import CustomFileUploader from '../../components/custom-file-uploader/custom-file-uploader.component'
import CustomButton from '../../components/custom-button/custom-button.component'

import './new-project.style.css'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const NewProject = ({ account, fileBuffer, contract }) => {

    const [newProjectName, setNewProjectName] = useState('')

    const uploadNewProject = event => {
        event.preventDefault()
        console.log("Submitting file to ipfs...")
        ipfs.add(fileBuffer, async (error, result) => {
            if (error) {
                console.error(error)
                return
            }
            contract.methods.createProject(newProjectName, result[0].hash).send({ from: account }).once("receipt", () => { console.log("receipt") })
        })
    }

    return (
        <div className='new-project-page'>
            <div className='project-name-input-container'>
                <a>Project Name:</a>
                <input className='project-name-input' onChange={event => setNewProjectName(event.target.value)} />
            </div>
            <div className='project-wbs-file-uploader-container'>
                <CustomFileUploader label='Select the file' accpet='.json' />
                <CustomButton label='Upload' onClick={uploadNewProject} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    fileBuffer: state.fileBuffer.fileBuffer,
    account: state.userAccount.account,
    contract: state.contract.contract
})


export default connect(mapStateToProps)(NewProject)