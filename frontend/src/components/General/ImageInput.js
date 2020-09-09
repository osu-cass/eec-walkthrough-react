import React, {useState} from "react";
import PropTypes from "prop-types";

// Input for sending local images with a request
function ImageInput(props) {

  const [fileName, setFileName] = useState("... or Upload an Image");

  // when a new file is selected update the saved file information
  function handleChangeStatus(e) {
    // get file name
    const input = document.getElementById(`custom-file-upload-${props.id}`);
    const file = input.value.split("\\");
    const newFileName = file[file.length-1];
    setFileName(newFileName);

    // get file data
    props.onNewImage(e.target.files[0]);
  }

  return (
    <div className="input-group">
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id={`custom-file-upload-${props.id}`}
          aria-describedby="inputGroupFileAddon01"
          onChange={(e) => handleChangeStatus(e)}
        />
        <label className="custom-file-label" htmlFor={`custom-file-upload-${props.id}`}>
          {fileName}
        </label>
      </div>
    </div>
  );
}
export default ImageInput;

ImageInput.propTypes = {
  id: PropTypes.number,
  onNewImage: PropTypes.func
};

