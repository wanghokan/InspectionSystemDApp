import React from 'react'
import { connect } from 'react-redux'

import Collapse from '../../components/collapse/collapse.component'

import './executing-state.style.css'

class ExecutingStateContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            State: undefined,
            contract: this.props.contract,
            selectedProject: this.props.selectedProject,
            WBSFirstLevel: this.props.WBSFirstLevel,
            WBSSecondLevel: this.props.WBSSecondLevel,
            WBSThirdLevel: this.props.WBSThirdLevel,
            WBSForthLevel: this.props.WBSForthLevel
        }
    }

    async componentDidMount() {
        const {
            contract,
            selectedProject,
            WBSFirstLevel,
            WBSSecondLevel,
            WBSThirdLevel,
            WBSForthLevel
        } = this.state

        const executingState = []

        setTimeout(async () => {
            if (WBSFirstLevel != undefined) {
                console.log('loading')
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
                                    forth.state = '表單尚未建立'
                                }
                                else {
                                    if (result._executed == 0) {
                                        forth.state = '表單已建立, 尚未執行查驗'
                                    }
                                    else {
                                        let falseNum = 0
                                        for (let a = 0; a < result._itemsState.length; a++) {
                                            if (result._itemsState[a] == 2) {
                                                falseNum++
                                            }
                                        }
                                        if (falseNum == 0) {
                                            forth.state = '表單已建立, 已查驗, 無查驗項目不合格, 查驗時間: ' + window.web3.utils.toUtf8(result._executeTime) + ', 查驗人員: ' + result._executor.toString()
                                        }
                                        else {
                                            forth.state = '表單已建立, 已查驗, ' + falseNum.toString() + '個查驗項目不合格, 查驗時間: ' + window.web3.utils.toUtf8(result._executeTime) + ', 查驗人員: ' + result._executor.toString()
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
                }
                this.setState({ State: executingState })
            }
        }, 3000)
    }

    render() {
        if (this.state.State != undefined) {
            return (
                <div className='executing-state-page'>
                    {
                        this.state.State.map(work =>
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
                    loading...
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

export default connect(mapStateToProps)(ExecutingStateContainer)

/*
{
                    WBSFirstLevel.map((work, index) => {
                        if (index != 0) {
                            return (
                                <Collapse key={index} label={work}>
                                    {
                                        WBSSecondLevel[work].map((work, index) => {
                                            if (index != 0) {
                                                return (
                                                    <Collapse key={index} label={work}>
                                                        {
                                                            WBSThirdLevel[work].map((work, index) => {
                                                                if (index != 0) {
                                                                    return (
                                                                        <Collapse key={index} label={work}>
                                                                            {
                                                                                WBSForthLevel[work].map((work, index) => {
                                                                                    if (index != 0) {
                                                                                        return (
                                                                                            <div key={index}>{work}</div>
                                                                                        )
                                                                                    }
                                                                                    else {
                                                                                        return null
                                                                                    }
                                                                                })
                                                                            }
                                                                        </Collapse>
                                                                    )
                                                                }
                                                                else {
                                                                    return null
                                                                }
                                                            })
                                                        }
                                                    </Collapse>
                                                )
                                            }
                                            else {
                                                return null
                                            }
                                        })
                                    }
                                </Collapse>
                            )
                        }
                        else {
                            return null
                        }
                    })
                }



const ExecutingState = ({
    contract,
    projects,
    selectedProject,
    fetchProjectWBS,
    WBSFirstLevel,
    WBSSecondLevel,
    WBSThirdLevel,
    WBSForthLevel,
    fetchExcutingState,
    executingState
}) => {

    useEffect(() => {
        fetchProjectWBS(projects, selectedProject)

    }, [selectedProject])

    useEffect(() => {
        if (WBSFirstLevel != undefined) {
            fetchExcutingState(contract, selectedProject, WBSFirstLevel, WBSSecondLevel, WBSThirdLevel, WBSForthLevel)
        }
    }, [WBSFirstLevel])

    if (executingState != undefined) {
        return (
            <div className='executing-state-page'>
                {
                    executingState.map(work =>
                        <Collapse key={work.key} label={work.name}>
                            {
                                work.children.map(work =>
                                    <Collapse key={work.key} label={work.name}>
                                        {
                                            work.children.map(work =>
                                                <Collapse key={work.key} label={work.name}>
                                                    {
                                                        work.children.map(work =>
                                                            <div key={work.key}>{work.name + work.currentState}</div>
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
                loading...
            </div>
        )
    }


}
*/