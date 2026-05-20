import React, {useState} from "react";
import PropTypes from "prop-types";
import BulletPointItem from "./BulletPointItem";
import BulletPointGraphic from "./BulletPointGraphic";
import BulletPointResource from "./BulletPointResource";
import BulletPointText from "./BulletPointText";
import "./BulletPoint.css";
import {useDispatch, useSelector} from "react-redux";
import {addTrainingItem, removeTrainingItem} from "../../../redux/actions";

// Represents a single bullet point inside a card
function BulletPoint(props) {
  const dispatch = useDispatch();
  const storeItem = useSelector(state => state.trainingPageItems.find(item => item.id === props.id));
  const storeAnnotationInput = storeItem ? storeItem.annotation : "";
  const [annotationInput, setAnnotationInput] = useState(storeAnnotationInput);
  const [selected, setSelected] = useState(!!storeItem);
  const [openAnnotation, setOpenAnnotation] = useState(!!annotationInput);
  const [annotationSaved, setAnnotationSaved] = useState(!!annotationInput);

  const handleSelect = () => {
    // if currently selected, then de-select it
    if (selected) {
      setSelected(false);
      setOpenAnnotation(false);
      setAnnotationInput("");
      dispatch(removeTrainingItem({id: props.id}));
    } else {
      setSelected(true);
      dispatch(addTrainingItem({id: props.id, annotation: annotationInput}));
    }
  };
  const handleAnnotationClicked = () => {
    setOpenAnnotation(!openAnnotation);
  };

  const handleOnSave = e => {
    e.preventDefault();
    if (!annotationInput) {
      return;
    }
    dispatch(addTrainingItem({id: props.id, annotation: annotationInput}));

    setAnnotationSaved(true);
  };

  const handleOnDelete = () => {
    setAnnotationInput("");
    setOpenAnnotation(false);
    setAnnotationSaved(false);
    dispatch(removeTrainingItem({id: props.id}));
  };

  // Don't show bullet points that are internal when we are viewing in public mode
  return !props.internal || !props.publicMode ? (
    props.inline ? (
      <span
        className={`
      ${props.mode === 3 && selected === false ? "grayed-out" : ""}

      `}
      >
        {/* If the bullet point is an item */}
        {props.groupIndex === 1 && props.icon !== "font" ? (
          <BulletPointItem
            id={props.id}
            learnMoreUrl={props.learnMoreUrl}
            text={props.text}
            icon={props.icon}
            indentation={props.indentation}
            mode={props.mode}
            color={props.color}
            tooltip={props.tooltip}
            setCheck={(state, id) => props.setCheck(state, id)}
            checked={props.checked}
            highlightStyle={props.highlightStyle}
            internal={props.internal}
            source={props.source}
            sourceText={props.sourceText}
            inline={props.inline}
            onSelect={handleSelect}
            selected={selected}
            onAnnotationClicked={handleAnnotationClicked}
          />
        ) : null}
        {/* If the bullet point is a text field */}
        {props.groupIndex === 1 && props.icon === "font" ? (
          <BulletPointText
            id={props.id}
            text={props.text}
            mode={props.mode}
            indentation={props.indentation}
            highlightStyle={props.highlightStyle}
            internal={props.internal}
            inline={props.inline}
            source={props.source}
            sourceText={props.sourceText}
            onSelect={handleSelect}
            selected={selected}
            onAnnotationClicked={handleAnnotationClicked}
          />
        ) : null}
        {/* If the bullet point is a graphic */}
        {props.groupIndex === 2 ? (
          <BulletPointGraphic
            text={props.text}
            label={props.label}
            altText={props.altText}
            url={props.url}
            icon={props.icon}
            indentation={props.indentation}
            mode={props.mode}
            color={props.color}
            tooltip={props.tooltip}
            highlightStyle={props.highlightStyle}
            internal={props.internal}
            source={props.source}
            sourceText={props.sourceText}
            inline={props.inline}
            onSelect={handleSelect}
            selected={selected}
            onAnnotationClicked={handleAnnotationClicked}
          />
        ) : null}
        {/* If the bullet point is a resource */}
        {props.groupIndex === 3 ? (
          <BulletPointResource
            id={props.id}
            text={props.text}
            label={props.label}
            url={props.url}
            learnMoreUrl={props.learnMoreUrl}
            icon={props.icon}
            created={props.created}
            indentation={props.indentation}
            mode={props.mode}
            contentMode={props.contentMode}
            handleTimestamp={m => props.handleTimestamp(m)}
            color={props.color}
            tooltip={props.tooltip}
            reviewing={props.reviewing}
            highlightStyle={props.highlightStyle}
            internal={props.internal}
            inline={props.inline}
            onSelect={handleSelect}
            selected={selected}
            onAnnotationClicked={handleAnnotationClicked}
          />
        ) : null}
        {props.mode === 3 && openAnnotation === true && (
          <form className="annotation-container" onSubmit={handleOnSave}>
            <input
              onClick={() => {
                if (annotationSaved) {
                  setAnnotationSaved(false);
                }
              }}
              type="search"
              placeholder="Enter annotation"
              value={annotationInput}
              onChange={e => {
                setAnnotationInput(e.target.value);
              }}
              readOnly={annotationSaved}
              className={annotationSaved && "input-disabled"}
            />
            <button
              type="submit"
              className={
                annotationSaved ? "btn-accept btn-disabled" : "btn-accept"
              }
              disabled={annotationSaved}
            >
  						Save
            </button>
            <button type="button" className="btn-cancel" onClick={handleOnDelete}>
  						Delete
            </button>
          </form>
        )}
      </span>
    ) : (
      <div
        className={`
      ${props.mode === 3 && selected === false ? "grayed-out" : ""}

      `}
      >
        {/* If the bullet point is an item */}
        {props.groupIndex === 1 && props.icon !== "font" ? (
          <BulletPointItem
            id={props.id}
            learnMoreUrl={props.learnMoreUrl}
            text={props.text}
            icon={props.icon}
            indentation={props.indentation}
            mode={props.mode}
            color={props.color}
            tooltip={props.tooltip}
            setCheck={(state, id) => props.setCheck(state, id)}
            checked={props.checked}
            highlightStyle={props.highlightStyle}
            internal={props.internal}
            source={props.source}
            sourceText={props.sourceText}
            inline={props.inline}
            onSelect={handleSelect}
            selected={selected}
            onAnnotationClicked={handleAnnotationClicked}
          />
        ) : null}
        {/* If the bullet point is a text field */}
        {props.groupIndex === 1 && props.icon === "font" ? (
          <BulletPointText
            id={props.id}
            text={props.text}
            mode={props.mode}
            indentation={props.indentation}
            highlightStyle={props.highlightStyle}
            internal={props.internal}
            inline={props.inline}
            source={props.source}
            sourceText={props.sourceText}
            onSelect={handleSelect}
            selected={selected}
            onAnnotationClicked={handleAnnotationClicked}
          />
        ) : null}
        {/* If the bullet point is a graphic */}
        {props.groupIndex === 2 ? (
          <BulletPointGraphic
            text={props.text}
            label={props.label}
            altText={props.altText}
            url={props.url}
            icon={props.icon}
            indentation={props.indentation}
            mode={props.mode}
            color={props.color}
            tooltip={props.tooltip}
            highlightStyle={props.highlightStyle}
            internal={props.internal}
            source={props.source}
            sourceText={props.sourceText}
            inline={props.inline}
            onSelect={handleSelect}
            selected={selected}
            onAnnotationClicked={handleAnnotationClicked}
          />
        ) : null}
        {/* If the bullet point is a resource */}
        {props.groupIndex === 3 ? (
          <BulletPointResource
            id={props.id}
            text={props.text}
            label={props.label}
            url={props.url}
            learnMoreUrl={props.learnMoreUrl}
            icon={props.icon}
            created={props.created}
            indentation={props.indentation}
            mode={props.mode}
            contentMode={props.contentMode}
            handleTimestamp={m => props.handleTimestamp(m)}
            color={props.color}
            tooltip={props.tooltip}
            reviewing={props.reviewing}
            highlightStyle={props.highlightStyle}
            internal={props.internal}
            inline={props.inline}
            onSelect={handleSelect}
            selected={selected}
            onAnnotationClicked={handleAnnotationClicked}
          />
        ) : null}
        {props.mode === 3 && openAnnotation === true && (
          <form className="annotation-container" onSubmit={handleOnSave}>
            <input
              onClick={() => {
                if (annotationSaved) {
                  setAnnotationSaved(false);
                }
              }}
              type="search"
              placeholder="Enter annotation"
              value={annotationInput}
              onChange={e => {
                setAnnotationInput(e.target.value);
              }}
              readOnly={annotationSaved}
              className={annotationSaved && "input-disabled"}
            />
            <button
              type="submit"
              className={
                annotationSaved ? "btn-accept btn-disabled" : "btn-accept"
              }
              disabled={annotationSaved}
            >
  						Save
            </button>
            <button type="button" className="btn-cancel" onClick={handleOnDelete}>
  						Delete
            </button>
          </form>
        )}
      </div>
    )
  ) : null;
}
export default BulletPoint;

BulletPoint.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  label: PropTypes.string,
  altText: PropTypes.string,
  url: PropTypes.string,
  learnMoreUrl: PropTypes.string,
  icon: PropTypes.string,
  created: PropTypes.string,
  indentation: PropTypes.number,
  mode: PropTypes.number,
  publicMode: PropTypes.number,
  contentMode: PropTypes.number,
  handleTimestamp: PropTypes.func,
  color: PropTypes.string,
  tooltip: PropTypes.string,
  reviewing: PropTypes.bool,
  setCheck: PropTypes.func,
  checked: PropTypes.bool,
  highlightStyle: PropTypes.number,
  internal: PropTypes.number,
  source: PropTypes.number,
  sourceText: PropTypes.string,
  inline: PropTypes.number,
  groupIndex: PropTypes.number
};
