import React, {useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {setPublished} from "../../utilities/publishedMode";

// Button that toggles viewing published or edited content in move mode
function ChangePublished(props) {

  const [publishedMode, setPublishedMode] = useState(props.publishedMode);

  // update the published value
  function toggleMode(publishedValue) {
    setPublished(publishedValue);
    setPublishedMode(publishedValue);
    props.onPublishedMode(publishedValue);
  }

  return props.role >= 4 && props.mode === 2 ? (
    <div className="text-center mx-2 my-auto">
      {publishedMode ? (
        <Button size="sm"
          variant="info"
          onClick={() => toggleMode(0)}
        >
          <span className="text-white">Move Pending Content</span>
        </Button>
      ) : (
        <Button size="sm"
          variant="info"
          onClick={() => toggleMode(1)}
        >
          <span className="text-white">Move Published Content</span>
        </Button>
      )}
    </div>
  ) : (
    null
  );

}
export default ChangePublished;

ChangePublished.propTypes = {
  role: PropTypes.number,
  publishedMode: PropTypes.number,
  mode: PropTypes.number,
  onPublishedMode: PropTypes.func
};