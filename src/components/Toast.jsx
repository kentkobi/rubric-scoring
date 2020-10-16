import React from 'react'

const Toast = ({title, message}) => { 
    return (
        <div className="toast show" role="alert" style={{position: 'absolute', top: 5, right: 5, zIndex: 999}}>
            <div className="toast-header">
                <strong className="mr-auto">{title}</strong>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    )
}
export default Toast

