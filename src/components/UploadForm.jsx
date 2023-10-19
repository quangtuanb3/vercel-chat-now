import CloudUploadImg from '../img/cloud-upload.jpg';

const UploadForm = ({ handleFileChange }) => {
    return (
        <>
            <input type="file" id='images' name="files" style={{ display: "none" }} multiple onChange={handleFileChange} />
            <label htmlFor="images">
                <img
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: "auto"
                    }}
                    src={CloudUploadImg}
                    alt="cloud upload"
                />
            </label>
        </>
    );
};

export default UploadForm; 
