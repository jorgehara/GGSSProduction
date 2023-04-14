import React from 'react'

const InputSelect = () => {
    return (
        <div>
            <select className="form-select row mt-1" multiple aria-label="multiple select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
    )
}

export default InputSelect