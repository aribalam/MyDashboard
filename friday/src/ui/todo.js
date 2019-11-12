import React from 'react';

import EditableText from './EditableText.js';

export default function Todo(props) {

    return (
        <div style={{width: 500, margin: 5, fontSize: 24, textAlign: "left"}}>
            <label class="checkbox-label">
                <input type="checkbox" />
                <span class="checkbox-custom"></span>
            </label>
            <div style={{marginLeft: 35}}>
                <EditableText 
                    fontSize="20px"
                    placeholderText="Add Todo..."
                />
            </div>
        </div>
    )
    
}