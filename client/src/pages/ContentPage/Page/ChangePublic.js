import React, {useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {setPublic} from "../../../utilities/publicMode";

// Button that toggles viewing internal content and viewing public content
function ChangePublic(props) {

  const [publicMode, setPublicMode] = useState(props.publicMode);

  // update the public value
  function toggleMode(publicValue) {
    setPublic(publicValue);
    setPublicMode(publicValue);
    props.onPublicMode(publicValue);
  }

  return props.role > 1 && props.mode === 0 ? (
    <div className="text-center mx-2 my-auto">
      {publicMode ? (
        <Button size="sm"
          variant="info"
          onClick={() => toggleMode(0)}
        >
          <span className="text-white">Show Internal Content</span>
        </Button>
      ) : (
        <Button size="sm"
          variant="info"
          onClick={() => toggleMode(1)}
        >
          <span className="text-white">Hide Internal Content</span>
        </Button>
      )}
    </div>
  ) : (
    null
  );

}
export default ChangePublic;

ChangePublic.propTypes = {
  role: PropTypes.number,
  publicMode: PropTypes.number,
  mode: PropTypes.number,
  onPublicMode: PropTypes.func
};