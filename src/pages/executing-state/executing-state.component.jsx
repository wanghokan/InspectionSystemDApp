import React from 'react'
import { connect } from 'react-redux'

import Loader from '../../components/loader/loader.component'
import Collapse from '../../components/collapse/collapse.component'

import './executing-state.style.css'

class ExecutingState extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            executingState: undefined
        }
    }


    async componentDidMount() {
        const { contract, selectedProject, WBSFirstLevel, WBSSecondLevel, WBSThirdLevel, WBSForthLevel } = this.props

        const executingState = []
        for (let i = 1; i < WBSFirstLevel.length; i++) {
            let first = { key: null, name: null, children: [] }
            first.key = 10000000 * i
            first.name = WBSFirstLevel[i]
            for (let j = 1; j < WBSSecondLevel[WBSFirstLevel[i]].length; j++) {
                let second = { key: null, name: null, children: [] }
                second.key = 10000000 * i + 100000 * j
                second.name = WBSSecondLevel[WBSFirstLevel[i]][j]
                for (let k = 1; k < WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[i]][j]].length; k++) {
                    let third = { key: null, name: null, children: [] }
                    third.key = 10000000 * i + 100000 * j + 1000 * k
                    third.name = WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[i]][j]][k]
                    for (let l = 1; l < WBSForthLevel[WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[i]][j]][k]].length; l++) {

                        let forth = { key: null, name: null, state: null }
                        forth.key = 10000000 * i + 100000 * j + 1000 * k + 1 * l
                        forth.name = WBSForthLevel[WBSThirdLevel[WBSSecondLevel[WBSFirstLevel[i]][j]][k]][l]
                        const result = await contract.methods.sheetContent(selectedProject, 10000000 * i + 100000 * j + 1000 * k + 1 * l).call()
                        if (result._executor == '0x0000000000000000000000000000000000000000') {
                            forth.state = 'Inspection sheet uncreated'
                        }
                        else {
                            if (result._executed == 0) {
                                forth.state = 'Uninspected'
                            }
                            else {
                                let falseNum = 0
                                for (let a = 0; a < result._itemsState.length; a++) {
                                    if (result._itemsState[a] == 2) {
                                        falseNum++
                                    }
                                }
                                if (falseNum == 0) {
                                    forth.state = 'Inspected, no failed item, executed at: ' + window.web3.utils.toUtf8(result._executeTime) + ', executor: ' + result._executor.toString()
                                }
                                else {
                                    forth.state = 'Inspected, ' + falseNum.toString() + 'failed item, executed at: ' + window.web3.utils.toUtf8(result._executeTime) + ', executor: ' + result._executor.toString()
                                }
                            }
                        }
                        third.children.push(forth)
                    }
                    second.children.push(third)
                }
                first.children.push(second)
            }
            executingState.push(first)
            if (i == WBSFirstLevel.length - 1) this.setState({ executingState })
        }
    }

    render() {
        if (this.state.executingState) {
            return (
                <div className='executing-state-page'>
                    {
                        this.state.executingState.map(work =>
                            <Collapse key={work.key} label={work.name}>
                                {
                                    work.children.map(work =>
                                        <Collapse key={work.key} label={work.name}>
                                            {
                                                work.children.map(work =>
                                                    <Collapse key={work.key} label={work.name}>
                                                        {
                                                            work.children.map(work =>
                                                                <div key={work.key}>
                                                                    <p>{work.name}</p>
                                                                    <p style={{ fontSize: 14 }}>{work.state}</p>
                                                                </div>
                                                            )
                                                        }
                                                    </Collapse>
                                                )
                                            }
                                        </Collapse>
                                    )
                                }
                            </Collapse>
                        )
                    }
                </div>
            )
        }
        else {
            return (
                <div className='executing-state-page'>
                    <div className='loader-container'>
                        <Loader />
                    </div>
                </div>
            )
        }

    }

}

const mapStateToProps = state => ({
    contract: state.contract.contract,
    selectedProject: state.selectedProject.selectedProject,
    WBSFirstLevel: state.selectedProject.WBSFirstLevel,
    WBSSecondLevel: state.selectedProject.WBSSecondLevel,
    WBSThirdLevel: state.selectedProject.WBSThirdLevel,
    WBSForthLevel: state.selectedProject.WBSForthLevel,
})

export default connect(mapStateToProps)(ExecutingState)

