import React, {useState} from 'react'

export default function EditableText(props) {

    const [placeholder, setPlaceholder] = useState(true);
    const [editable, setEditable] = useState(true);

    const handleChange = (event) => {
        var text = event.target.innerHTML;
        if (text.length < 1)
            setPlaceholder(true);
        else if (text.length == 1 && event.key === "Backspace")
            setPlaceholder(true);
        else
            setPlaceholder(false);
        
        if (text.length > 0 && event.key === "Enter")
            setEditable(false);
    }

    return (
        <div className="text-wrapper" style={{fontSize: props.fontSize}}>
            <p className="text-input" contentEditable={editable} onKeyDown={handleChange}>
            </p>
            {   placeholder? 
                <div className="placeholder-overlay">{props.placeholderText}</div> : ''
            }
        </div>
    )

}