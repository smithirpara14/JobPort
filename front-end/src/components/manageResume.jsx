import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FETCH_RESUME } from './graphqlQueries';
import { useQuery, useMutation } from '@apollo/client';
import { getUserEmail } from '../controllers/auth';
import { gql } from '@apollo/client';
import Upload  from 'graphql-upload/Upload.mjs';

const ManageResume = () => {
    const UPLOAD_RESUME = gql`
  mutation uploadResume($userId: String!, $file: Upload!) {
    uploadResume(userId: $userId, file: $file) {
      filename
      mimetype
      encoding
    } 
  }
`;
    
    const userEmail = getUserEmail();
    const [selectedFile, setSelectedFile] = useState();
    const [fileName, setFileName] = useState('');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [message, setMessage] = useState('');
    const [hasResume, setHasResume] = useState(false);
    
    // const { data, loading, error } = useQuery(FETCH_RESUME, {
    //     variables: {
    //         userId: userEmail,
    //     },
    //     onCompleted: (data) => {
    //         if (data) {
    //             setHasResume(true);
    //         }
    //     }
    // });

    const [uploadResume, { data, loading, error }] = useMutation(UPLOAD_RESUME);


    // const [uploadResume] = useMutation(UPLOAD_RESUME, {
    //     variables: {
    //         userId: userEmail,
    //         file: selectedFile
    //     },
    //     onCompleted: (data) => {
    //         console.log('Resume uploaded:', data);
    //     },
    //     onError: (error) => {
    //         setIsFilePicked(false);
    //         setMessage('Error uploading resume: ' +  error.message);
    //     }

    // });
    
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
                const { filename, mimetype, encoding } = await uploadResume({
                    variables: {
                        userId: userEmail,
                        file: selectedFile
                    },
                    context: {
                        fetchOptions: {
                            useUpload: true,
                        },
                    },
                });
                console.log(data);
            } else {
                console.log('No file selected');
            }

        } else {
            setMessage('Please select a file to upload');
            console.log('No file selected');
        }
    };

    const handleDownload = () => {
        // Implement your download logic here
        console.log('Downloading file:', selectedFile);
        // You can use window.open to download the file
        window.open(selectedFile.url);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setIsFilePicked(false);
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
                </Row>
                { hasResume ? (<Row className='mt-2'>
                    <Col md={3}>
                        <p>{data.filename}</p>
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