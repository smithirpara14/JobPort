import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { UPLOAD_RESUME, FETCH_RESUME, DELETE_RESUME, FETCH_RESUME_FILE } from './graphqlQueries';
import { useQuery, useMutation } from '@apollo/client';
import { getUserEmail } from '../controllers/auth';

const ManageResume = () => {
    
    const userEmail = getUserEmail();
    const [selectedFile, setSelectedFile] = useState();
    const [fileName, setFileName] = useState('');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [message, setMessage] = useState('');
    const [hasResume, setHasResume] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [uploadResume, { data, loading, error }] = useMutation(UPLOAD_RESUME);
    const [deleteResume, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_RESUME);

    const { data: resumeData, loading: resumeLoading, error: resumeError, refetch } = useQuery(FETCH_RESUME, {
        variables: {
            userId: userEmail
        },
        onCompleted: (data) => {
            console.log('Resume data:', data);
            if (data.getResume) {
                setHasResume(true);
            } else {
                setHasResume(false);
            }
        }
    });

    const { data: resumeFileData, loading: resumeFileLoading, error: resumeFileError, refetchFile } = useQuery(FETCH_RESUME_FILE, {
        variables: {
            userId: userEmail
        }
    });

    const handleFileChange = (event) => {
        console.log('File selected:', event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
        if (event.target.files[0]) {
            setIsFilePicked(true);
        } else {
            setIsFilePicked(false);
        }
    };


    const handleUpload = async () => {
        // Implement your upload logic here
        
        if (selectedFile && selectedFile instanceof File) {
            console.log('selectedFile type:', selectedFile instanceof File);
            console.log('Uploading file:', selectedFile);

            if (selectedFile) {
                const { data } = await uploadResume({
                    variables: {
                        userId: userEmail,
                        file: selectedFile
                    }
                });
                if(data.uploadResume.fileId) { 
                    setSuccessMessage('File uploaded successfully');
                    refetch();
                    refetchFile();
                } else {
                    setSuccessMessage('');
                    setMessage('File upload failed. Please try again later.');
                }
                console.log('File uploaded:', data.uploadResume);
            } else {
                console.log('No file selected');
            }

        } else {
            setMessage('Please select a file to upload');
            console.log('No file selected');
        }
    };

    const handleDownload = async () => {
        try {
            console.log('Downloading file:', resumeFileData);
            const { getResumeFile } = await resumeFileData;
            console.log('Download file:', getResumeFile);
            const { filename, mimetype, data: fileData } = getResumeFile;

            // Convert base64 data to Blob
            const byteCharacters = atob(fileData);
            const byteArrays = [];
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArrays.push(byteCharacters.charCodeAt(i));
            }
            const byteArray = new Uint8Array(byteArrays);
            const blob = new Blob([byteArray], { type: mimetype });

            // Create download link and trigger download
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error('Error downloading file:', error);
          }
    }

    const handleRemoveFile = async () => {
        const { data } = await deleteResume({
            variables: {
                userId: userEmail
            }
        });
        if(data.deleteResume) {
            setSuccessMessage('Resume removed successfully');
            refetch();
            setHasResume(false);
        } else {
            setSuccessMessage('');
            setMessage('File delete failed. Please try again later.');
        }
    }

    return (
        <div>
            <h3>Manage your resume</h3>
            <div className='p-4'>
                <Row className='mt-2'>
                    
                    <Col md={4}>
                        <input type="file" onChange={handleFileChange} accept='.pdf' placeholder='Upload pdf file only.'/>
                        {!isFilePicked ? (
                            <p className='text-danger'>{message}</p>
                        ) : null}
                    </Col>
                    
                    <Col md={4}>
                        <button onClick={handleUpload} className='btn btn-primary mx-2'>Upload</button>
                    </Col>
                    {
                        successMessage ? (
                                <p className='text-success'>{successMessage}</p>
                        ) : null
                    }
                </Row>
                { hasResume ? (<Row className='mt-2'>
                    <Col md={3}>
                        <p>{resumeData.getResume.filename}</p>
                    </Col>
                    <Col md={4}>
                        <button onClick={handleDownload} className='btn btn-outline-primary mx-1'>Download</button>
                        <button onClick={handleRemoveFile} className='btn btn-outline-danger'>Remove</button>
                    </Col>
                </Row>) : null}
            </div>
            
        </div>
    );
};


export default ManageResume;