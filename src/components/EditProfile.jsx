import { useState } from 'react'
export function EditProfile({ firstName, lastName, onSave, onCancel }) {
    const [newFirstName, setFirstName] = useState(firstName)
    const [newLastName, setLastName] = useState(lastName)
    const handleSave = (e) => {
        e.preventDefault()
        onSave(newFirstName, newLastName)
    }
    return (
        <form className="edit-profile-form">
            <h3>Welcome back</h3>
            <div className="edit-input-container">
                <input
                    type="text"
                    placeholder={firstName}
                    className="edit-input"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={lastName}
                    className="edit-input"
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="edit-buttons">
                <button className="edit-button button" onClick={handleSave}>
                    Save
                </button>
                <button className="edit-button button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}
