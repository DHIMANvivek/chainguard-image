// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            // Update success message state
            setSuccessMessage("success");
            // Clear error message state
            setErrorMessage(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            // Update error message state
            // setErrorMessage('Error uploading file. Please try again.');
            // Clear success message state
            setSuccessMessage(null);
        }
    };

    return (
        <div>
            <h1>Secure File Sharing App</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
            {successMessage && (
                <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>
            )}
            {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
            )}
        </div>
    );
}

export default App;
