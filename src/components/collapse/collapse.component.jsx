import React from 'react'

import './collapse.style.css'

class Collapse extends React.Component {

    expandContent = event => {
        if (event.target.nextSibling.className == 'content-container') {
            event.target.nextSibling.className = 'expanded-content-container'
        }
        else {
            event.target.nextSibling.className = 'content-container'
        }
    }

    render() {
        return (
            <div>
                <button className='collapsible' onClick={this.expandContent}>
                    {this.props.label}
                </button>
                <div className='content-container'>
                    {this.props.children}
                </div>
            </div>

        )
    }
}

export default Collapse