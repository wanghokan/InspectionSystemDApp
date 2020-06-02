import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { setContract, fetchContractAddressAsync } from '../../redux/contract/contract.actions'

import ProjectSelector from '../../components/project-selector/project-selector.component'
import CustomButton from '../../components/custom-button/custom-button.component'

import './homepage.style.css'

const HomePage = ({ account, fetchContractAddress, contractAddress, setContract }) => {

    useEffect(() => {
        if (account) {
            fetchContractAddress(account)
        }
    }, [account])

    useEffect(() => {
        if (contractAddress) {
            setContract(contractAddress)
        }
    }, [contractAddress])

    return (
        <div className='homepage'>
            <ProjectSelector />
            <div className='execute-inspection-button-container'>
                <Link to='/execute_inspection'>
                    <CustomButton label='Inspect' />
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    account: state.userAccount.account,
    contractAddress: state.contract.contractAddress,
})

const mapDispatchToProps = dispatch => ({
    fetchContractAddress: account => dispatch(fetchContractAddressAsync(account)),
    setContract: contractAddress => dispatch(setContract(contractAddress)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)