import React, { useEffect, useState } from 'react';
import { Modal, Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { sendMessageGeneral, sendMessageToUser } from './sendMessageFunction.js';
import useCloudinaryFileUpload from './useCloudinaryFileUpload';
import UploadForm from './UploadForm';


const FileUploader = ({ open, handleClose }) => {
  let { handleUpload, imageUrls, setImageUrls } = useCloudinaryFileUpload();
  const [selected, setSelected] = useState();
  const [imgsPreview, setImgsPreview] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;

    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles) {
        return [...prevSelectedFiles, ...files];
      } else {
        return [...files];
      }
    });

    if (files) {
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setImgsPreview((prevPreviews) => {
        if (prevPreviews) {
          return [...prevPreviews, ...previews];
        } else {
          return [...previews];
        }
      });
    }
  };


  useEffect(() => {
    if (imgsPreview.length === 0) {
      setSelected(false)
    } else {
      // !imgsPreview.find(img => img === `${CloudUploadImg}`) && setImgsPreview(pre => [...pre, CloudUploadImg])
      setSelected(true)
    }
  }, [selectedFiles])

  function handleDeleteImage(index) {
    const updatedImgsPreview = imgsPreview.filter((_, i) => i !== index);
    setImgsPreview(updatedImgsPreview);

    if (selectedFiles) {
      const updatedSelectedFiles = Array.from(selectedFiles).filter((_, i) => i !== index);
      setSelectedFiles(updatedSelectedFiles);
    }
    console.log("selectedFiles ", selectedFiles)
    if (selectedFiles.length <= 1) {
      setSelected(false);
      setImgsPreview([]);
      setSelectedFiles([]);
    }
  }
  const handleCloseModal = () => {
    setImgsPreview([]);
    console.log(imgsPreview)
    setSelectedFiles([]);
    handleClose();
  };



  useEffect(() => {
    const handleImageUpload = async () => {
      if (imageUrls.length > 0) {
        if (location.pathname.includes("/channel/")) {
          const generalId = location.pathname.split("/")[2];
          // Use generalId as needed
          await sendMessageGeneral(generalId, "", imageUrls);
        } else if (location.pathname.includes("/direct-message/")) {
          // Use id from useParams
          sendMessageToUser(location.pathname.split("/")[2], "", imageUrls);
        }

        // sendMessageFunction("", imageUrls)

        setImgsPreview([]);
        console.log("imageUrls after handleciliupload", imageUrls);
        setImageUrls([])
        setSelected(false)
      }
    };

    handleImageUpload();
  }, [imageUrls]);


  const handleClickUpload = async () => {

    console.log("selectedFiles, ", selectedFiles)
    await handleUpload(selectedFiles);
    // sendMessageGeneral("", imageUrls)
    handleCloseModal();

  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="file-uploader-modal"
      aria-describedby="modal for uploading files"
    >
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        boxShadow: 24, p: 4,
        borderRadius: 10,
      }}>

        <div style={{ display: "flex", justifyContent: "space-between", width: "80%", margin: "auto", padding: 10 }}>
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            color="primary"
            onClick={handleClickUpload}
          >
            Send
          </Button>

        </div>

        {!selected && (<UploadForm handleFileChange={handleFileChange} />
        )}
        <div style={{
          marginTop: '20px',
          marginBottom: '20px',
          display: "flex",
          justifyContent: "center"
        }}>
          {selected && (
            <ImageList sx={{ width: "90%", height: 210 }} cols={3} rowHeight={100}>
              {imgsPreview.map((url, index) => (
                <ImageListItem key={index} style={{ position: 'relative' }}>
                  <img
                    srcSet={url}
                    src={url}
                    alt={`img-${index}`}
                    loading="lazy"
                    style={{
                      objectFit: 'cover', // To make the image fit within the container
                      width: '100%', // To cover the whole ImageListItem container
                      height: '100%', // To cover the whole ImageListItem container
                    }}
                  />
                  {(index !== imgsPreview.length) && <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      padding: '2px 6px',
                      cursor: 'pointer',
                      borderRadius: '0 0 0 4px', // To make the button edges rounded
                    }}
                    onClick={() => handleDeleteImage(index)} // Pass the index to the handleDeleteImage function
                  >
                    X
                  </span>}
                </ImageListItem>
              ))}
              <div style={{
                objectFit: 'cover', // To make the image fit within the container
                width: '100%', // To cover the whole ImageListItem container
                height: '100px', // To cover the whole ImageListItem container
              }}>
                <UploadForm handleFileChange={handleFileChange} />
              </div>

            </ImageList>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FileUploader;
