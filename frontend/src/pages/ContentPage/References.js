import React, {Fragment} from "react";
import PropTypes from "prop-types";
import "./References.css";

// Header and card that describes the references for the current page
function References(props) {

  return (props.mode === 0 && props.sources.length) || (props.mode === 1 && props.tempSources.length) ? (
    <div className="citation-reference-container">
      <div className={`d-flex reference-header-bar justify-content-between sticky-top
        my-3 p-3 text-dark-50 rounded shadow-sm border`}
      style={{top: "1em", zIndex: "998"}}
      >
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            References
          </h4>
        </div>
      </div>

      <div className={`my-3 p-3 card rounded shadow-sm`}>
        <div>
          <ol className="source-list">
            {props.mode === 0 ? (
              <Fragment>
                {props.sources.map((source, i) =>
                  <li key={source.sourceId}>
                    {source.url.length ? (
                      <a href={source.url}>
                        <a href={`#source-` + (i + 1)} name={`source-` + (i + 1)} className="source-anchor">&nbsp;</a>
                        <span>{source.text}</span>
                      </a>
                    ) : (
                      <Fragment>
                        <a href={`#source-` + (i + 1)} name={`source-` + (i + 1)} className="source-anchor">&nbsp;</a>
                        <span>{source.text}</span>
                      </Fragment>
                    )}
                  </li>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {props.tempSources.map((source, i) =>
                  <li key={source.sourceId}>
                    {source.url.length ? (
                      <a href={source.url}>
                        <a href={`#source-` + (i + 1)} name={`source-` + (i + 1)} className="source-anchor">&nbsp;</a>
                        <span>{source.text}</span>
                      </a>
                    ) : (
                      <Fragment>
                        <a href={`#source-` + (i + 1)} name={`source-` + (i + 1)} className="source-anchor">&nbsp;</a>
                        <span>{source.text}</span>
                      </Fragment>
                    )}
                  </li>
                )}
              </Fragment>
            )}
          </ol>
        </div>

      </div>
    </div>
  ) : (
    null
  );

}
export default References;

References.propTypes = {
  mode: PropTypes.number,
  sources: PropTypes.array,
  tempSources: PropTypes.array
};
