import React, {useState} from 'react'

export default function TextView(props) {

    const [placeholder, setPlaceholder] = useState(true);

    const handleChange = (event) => {
        if (event.target.innerHTML.length == 1 && event.key === "Backspace")
            setPlaceholder(true);
        else
            setPlaceholder(false);
    }

    return (
        <div className="text-wrapper" style={{fontSize: props.fontSize}}>
            <div className="text-input" contentEditable="true" onKeyDown={handleChange}>
            </div>
            {   placeholder? 
                <div className="placeholder-overlay">Title..</div> : ''
            }
        </div>
    )

}