import React from 'react'
import { connect } from 'react-redux'

import { setFileBuffer } from '../../redux/file-buffer/file-buffer.actions'

import './custom-file-uploader.style.css'

class CustomFileUploader extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            fileName: '',
        }
    }


    captureFile = event => {
        const { setFileBuffer } = this.props
        if (event.target.files[0]) {
            this.setState({ fileName: event.target.files[0].name })
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(event.target.files[0])
            reader.onloadend = () => {
                setFileBuffer(Buffer(reader.result))
            }
        }
    }

    render() {
        return (
            <div className='custom-file-uploader-container'>
                <label className='custom-file-uploader'>
                    <input className='custom-file-input' type='file' accept={this.props.accpet} onChange={this.props.onChange ? this.props.onChange : this.captureFile} />
                    <a>
                        {this.state.fileName
                            ? this.state.fileName
                            : this.props.label
                        }
                    </a>
                </label>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setFileBuffer: fileBuffer => dispatch(setFileBuffer(fileBuffer))
})

export default connect(null, mapDispatchToProps)(CustomFileUploader)