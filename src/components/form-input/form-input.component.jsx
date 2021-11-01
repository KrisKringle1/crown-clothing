import React from 'react'

import './form-input.styles.scss';


const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className="group">
        <input {...otherProps} onChange={handleChange} className="form-input" />
        {

            //if theres a label prop, render the label with the label prop, otherwise render nothing
            label ?
            <label className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`}>
                {label}
            </label>
            :null
        }
    </div>
)

export default FormInput