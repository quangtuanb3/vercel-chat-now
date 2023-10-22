import { useState } from "react";
import axios from "axios";

const useCloudinaryFileUpload = () => {
    const cloudName = 'dvv61dvht';
    const unsignedUploadPrefix = 'qnwjqsbm';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const [imageUrls, setImageUrls] = useState([]);

    const handleUpload = async (selectedFiles) => {
        if (!selectedFiles || selectedFiles.length === 0) {
            return;
        }
        const newImageUrls = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const formData = new FormData();

            formData.append("file", file);
            formData.append("upload_preset", unsignedUploadPrefix);

            try {
                const response = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                newImageUrls.push(response.data.url.replace("http", "https"));
                // console.log('Upload success', response.data.url);
            } catch (error) {
                console.error('Upload failed', error);
            }
        }

        setImageUrls(newImageUrls);

    };
    return { handleUpload, imageUrls, setImageUrls };

};

export default useCloudinaryFileUpload;
