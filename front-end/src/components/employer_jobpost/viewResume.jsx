import React from "react";
import { useQuery } from "@apollo/client";
import { FETCH_RESUME_FILE } from "../graphqlQueries";
import { useParams } from "react-router-dom";
const EMP_ViewResume = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(FETCH_RESUME_FILE, {
        variables: {
            userId: id
        },
        onCompleted: async (data) => {
            try {
                console.log('Downloading file:', data);
                const { getResumeFile } = await data;
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

                //after downloading the file, redirect to the previous page
                window.history.back();

              } catch (error) {
                console.error('Error downloading file:', error);
              }
        }
    });


    return (
        <div>
            
        </div>
    );

};

export default EMP_ViewResume;
    