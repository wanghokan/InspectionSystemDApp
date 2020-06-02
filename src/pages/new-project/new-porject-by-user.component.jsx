import React from 'react'

import './new-project-by-user.style.css'

import WBSJSON from './wbs.json'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class NewProjectPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            WBS: WBSJSON,
            FirstLevelWorkToCreate: '',
            SecondLevelWorkToCreate: '',
            ThirdLevelWorkToCreate: '',
            ForthLevelWorkToCreate: '',
            SelectedFirstLevelIndex: 0,
            SelectedSecondLevelIndex: 0,
            SelectedThirdLevelIndex: 0,
            SelectedForthLevelIndex: 0,
        }
    }

    componentDidMount = async () => {
        const w = await fetch('https://ipfs.infura.io/ipfs/QmU99Dq68YDXxbhvGbKj8dCUGbnwQo319YKL65pfYqgCbP').then(result => result.json())
        console.log(w)
    }

    createNewFirstLevelWork = () => {
        WBSJSON.first.push(`${this.state.FirstLevelWorkToCreate}`)
        WBSJSON.second[`${this.state.FirstLevelWorkToCreate}`] = [""]
        this.setState({
            SelectedFirstLevelIndex: WBSJSON.first.findIndex(i => i == `${this.state.FirstLevelWorkToCreate}`),
            SelectedSecondLevelIndex: 0,
            SelectedThirdLevelIndex: 0,
            SelectedForthLevelIndex: 0,
            FirstLevelWorkToCreate: '',
        }, () => console.log(this.state.SelectedFirstLevelIndex,
            this.state.SelectedSecondLevelIndex,
            this.state.SelectedThirdLevelIndex,
            this.state.SelectedForthLevelIndex))
    }

    createNewSecondLevelWork = () => {
        WBSJSON.second[WBSJSON.first[this.state.SelectedFirstLevelIndex]].push(`${this.state.SecondLevelWorkToCreate}`)
        WBSJSON.third[`${this.state.SecondLevelWorkToCreate}`] = [""]
        this.setState({
            SelectedSecondLevelIndex: WBSJSON.second[WBSJSON.first[this.state.SelectedFirstLevelIndex]].findIndex(i => i == `${this.state.SecondLevelWorkToCreate}`),
            SelectedThirdLevelIndex: 0,
            SelectedForthLevelIndex: 0,
            SecondLevelWorkToCreate: '',
        }, () => console.log(this.state.SelectedFirstLevelIndex,
            this.state.SelectedSecondLevelIndex,
            this.state.SelectedThirdLevelIndex,
            this.state.SelectedForthLevelIndex))
    }

    createNewThirdLevelWork = () => {
        WBSJSON.third[WBSJSON.second[WBSJSON.first[this.state.SelectedFirstLevelIndex]][this.state.SelectedSecondLevelIndex]].push(`${this.state.ThirdLevelWorkToCreate}`)
        WBSJSON.forth[`${this.state.ThirdLevelWorkToCreate}`] = [""]
        this.setState({
            SelectedThirdLevelIndex: WBSJSON.third[WBSJSON.second[WBSJSON.first[this.state.SelectedFirstLevelIndex]][this.state.SelectedSecondLevelIndex]].findIndex(i => i == `${this.state.ThirdLevelWorkToCreate}`),
            SelectedForthLevelIndex: 0,
            ThirdLevelWorkToCreate: '',
        }, () => console.log(this.state.SelectedFirstLevelIndex,
            this.state.SelectedSecondLevelIndex,
            this.state.SelectedThirdLevelIndex,
            this.state.SelectedForthLevelIndex))
    }

    createNewForthLevelWork = () => {
        WBSJSON.forth[WBSJSON.third[WBSJSON.second[WBSJSON.first[this.state.SelectedFirstLevelIndex]][this.state.SelectedSecondLevelIndex]][this.state.SelectedThirdLevelIndex]].push(`${this.state.ForthLevelWorkToCreate}`)
        this.setState({
            SelectedForthLevelIndex: WBSJSON.forth[WBSJSON.third[WBSJSON.second[WBSJSON.first[this.state.SelectedFirstLevelIndex]][this.state.SelectedSecondLevelIndex]][this.state.SelectedThirdLevelIndex]].findIndex(i => i == `${this.state.ForthLevelWorkToCreate}`),
            ForthLevelWorkToCreate: '',
        }, () => console.log(this.state.SelectedFirstLevelIndex,
            this.state.SelectedSecondLevelIndex,
            this.state.SelectedThirdLevelIndex,
            this.state.SelectedForthLevelIndex))
    }

    upload = () => {
        console.log(WBSJSON)
        /*
        const buffer = Buffer.from(JSON.stringify(WBSJSON))
        console.log("Submitting file to ipfs...")
        ipfs.add(buffer, async (error, result) => {
            console.log('Ipfs result', result)
            if (error) {
                console.error(error)
                return
            }
        })
        */
    }

    render() {
        const { WBS, SelectedFirstLevelIndex, SelectedSecondLevelIndex, SelectedThirdLevelIndex, SelectedForthLevelIndex } = this.state
        return (
            <div className='new-project-page' >
                <div className='project-name-input-container'>
                    <a>工程名稱: </a>
                    <input />
                </div>
                <div className='project-wbs-establish'>
                    <table className='project-wbs' border='1'>
                        <thead>
                            <tr className='wbs-header'>
                                <th>First Level</th>
                                <th>Second Level</th>
                                <th>Third Level</th>
                                <th>Forth Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {
                                        WBS.first.map((work, key) => (
                                            <div
                                                className={SelectedFirstLevelIndex == key ? 'selected-work' : 'unselected-work'}
                                                key={key}
                                                onClick={() => this.setState({ SelectedFirstLevelIndex: key, SelectedSecondLevelIndex: 0, SelectedThirdLevelIndex: 0, SelectedForthLevelIndex: 0 })}
                                            >
                                                {work}
                                            </div>
                                        ))
                                    }
                                    <div>
                                        <input
                                            value={this.state.FirstLevelWorkToCreate}
                                            onChange={event => this.setState({ FirstLevelWorkToCreate: event.target.value })}
                                        />
                                        <button onClick={this.createNewFirstLevelWork}>新增</button>
                                    </div>
                                </td>
                                <td>
                                    {
                                        WBS.second[WBS.first[SelectedFirstLevelIndex]].map((work, key) => (
                                            <div
                                                className={SelectedSecondLevelIndex == key ? 'selected-work' : 'unselected-work'}
                                                key={key}
                                                onClick={() => this.setState({ SelectedSecondLevelIndex: key, SelectedThirdLevelIndex: 0, SelectedForthLevelIndex: 0 })}
                                            >
                                                {work}
                                            </div>
                                        ))
                                    }
                                    <div>
                                        <input
                                            value={this.state.SecondLevelWorkToCreate}
                                            onChange={event => this.setState({ SecondLevelWorkToCreate: event.target.value })}
                                        />
                                        <button onClick={this.createNewSecondLevelWork}>新增</button>
                                    </div>
                                </td>
                                <td>
                                    {
                                        WBS.third[WBS.second[WBS.first[SelectedFirstLevelIndex]][SelectedSecondLevelIndex]].map((work, key) => (
                                            <div
                                                className={SelectedThirdLevelIndex == key ? 'selected-work' : 'unselected-work'}
                                                key={key}
                                                onClick={() => this.setState({ SelectedThirdLevelIndex: key, SelectedForthLevelIndex: 0 })}
                                            >
                                                {work}
                                            </div>
                                        ))
                                    }
                                    <div>
                                        <input
                                            value={this.state.ThirdLevelWorkToCreate}
                                            onChange={event => this.setState({ ThirdLevelWorkToCreate: event.target.value })}
                                        />
                                        <button onClick={this.createNewThirdLevelWork}>新增</button>
                                    </div>
                                </td>
                                <td>
                                    {
                                        WBS.forth[WBS.third[WBS.second[WBS.first[SelectedFirstLevelIndex]][SelectedSecondLevelIndex]][SelectedThirdLevelIndex]].map((work, key) => (
                                            <div
                                                className={SelectedForthLevelIndex == key ? 'selected-work' : 'unselected-work'}
                                                key={key}
                                                onClick={() => this.setState({ SelectedForthLevelIndex: key })}
                                            >
                                                {work}
                                            </div>
                                        ))
                                    }
                                    <div>
                                        <input
                                            value={this.state.ForthLevelWorkToCreate}
                                            onChange={event => this.setState({ ForthLevelWorkToCreate: event.target.value })}
                                        />
                                        <button onClick={this.createNewForthLevelWork}>新增</button>
                                    </div>
                                </td>
                            </tr>
                            <tr><button onClick={this.upload}>WBS</button></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default NewProjectPage