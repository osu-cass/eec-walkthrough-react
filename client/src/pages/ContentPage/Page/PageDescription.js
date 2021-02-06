import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Image from "../../../components/General/Image";
import ReviewPage from "./ReviewPage";
import ChangeMode from "./ChangeMode";
import ChangePublic from "./ChangePublic";
import ChangePublished from "./ChangePublished";
import EditPage from "./EditPage";
import SaveView from "./SaveView";
import LoadView from "./LoadView";
import AddSource from "./AddSource";
import QuickLinks from "../Various/QuickLinks";
import Sanitized from "../../../components/General/Sanitized";
import "./PageDescription.css";

// Header and card that describes the page
function PageDescription(props) {

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newViews, setNewViews] = useState(0);

  // decide what is displayed based on the current page mode
  useEffect(() => {
    if (props.page.approved && props.page.tempPageId && props.mode === 1) {
      setName(props.page.tempName);
      setTitle(props.page.tempTitle);
      setDescription(props.page.tempDescription);
      setImageUrl(props.page.tempImageUrl);
    } else {
      setName(props.page.name);
      setTitle(props.page.title);
      setDescription(props.page.description);
      setImageUrl(props.page.imageUrl);
    }
  }, [props.page, props.mode, props.pageState]);

  // determines if the current object is only internal viewable
  function isInternal() {
    if (props.mode === 1) {
      if ((props.page.tempPageId && props.page.tempInternal) || (!props.page.tempPageId && props.page.internal)) {
        return 1;
      }
    } else {
      if (props.page.internal) {
        return 1;
      }
    }
    return 0;
  }

  return (
    <div>
      <div className={`d-flex header-bar justify-content-between
        ${props.page.approved && (!props.page.tempPageId || props.mode !== 1) ? "page-approved" : "page-review"}
        ${isInternal() ? "page-internal" : ""} my-3 p-3 text-dark-50 rounded shadow-sm border`}
      style={{top: "1em", zIndex: "998"}}
      >
        <div className="row w-100 ml-0">
          <div className="col align-self-center pl-0">
            <h4 className="flex-grow-1 font-weight-bold my-0 mx-0">
              {name}
            </h4>
          </div>

          <div className="col pr-0">
            <div className="btn-group align-self-center float-right">
              <ChangePublic
                role={props.role}
                mode={props.mode}
                publicMode={props.publicMode}
                onPublicMode={e => props.onPublicMode(e)}
              />
              <ChangePublished
                role={props.role}
                mode={props.mode}
                publishedMode={props.publishedMode}
                onPublishedMode={e => props.onPublishedMode(e)}
              />
              <SaveView
                role={props.role}
                mode={props.mode}
                pageId={props.page.pageId}
                headers={props.headers}
                onNewView={() => setNewViews(newViews + 1)}
              />
              <LoadView
                mode={props.mode}
                pageId={props.page.pageId}
                newViews={newViews}
                onNewView={e => props.onNewView(e)}
              />
              <EditPage
                page={props.page}
                role={props.role}
                mode={props.mode}
                handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
                handlePageEdit={props.handlePageEdit}
              />
              <ReviewPage
                page={props.page}
                mode={props.mode}
                handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
                handlePageEdit={props.handlePageEdit}
              />
              <AddSource
                pageId={props.page.pageId}
                role={props.role}
                mode={props.mode}
              />
              <ChangeMode
                role={props.role}
                mode={props.mode}
                onPageMode={e => props.onPageMode(e)}
                moved={props.moved}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`${props.page.approved && (!props.page.tempPageId || props.mode !== 1) ? "page-approved" : "page-review"}
        ${isInternal() ? "page-internal" : ""} my-3 p-3 card rounded shadow-sm`}
      >
        <div className="page-desc">
          <div className="row">
            <div className="col-8">
              <h5 className="font-weight-bold">{title}</h5>
              <p className="allow-newlines">
                <Sanitized html={description} />
              </p>
              <QuickLinks
                headers={props.headers}
                quiz={props.quiz}
                references={props.references}
                mode={props.mode}
                publishedMode={props.publishedMode}
                publicMode={props.publicMode}
              />
            </div>
            <div className="col-4 text-center">
              <Image url={imageUrl}
                title={name}
                thumbnail={false}
                header={true}
              />
            </div>
          </div>
        </div>

        <div className="page-desc-s">
          <div className="row mb-3">
            <div className="mx-auto">
              <Image url={imageUrl}
                title={name}
                thumbnail={false}
                header={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5 className="font-weight-bold">{title}</h5>
              <p className="allow-newlines">
                <Sanitized html={description} />
              </p>
            </div>
          </div>
          <QuickLinks
            headers={props.headers}
            quiz={props.quiz}
            references={props.references}
            mode={props.mode}
            publishedMode={props.publishedMode}
            publicMode={props.publicMode}
          />
        </div>
      </div>
    </div>
  );

}
export default PageDescription;

PageDescription.propTypes = {
  publicMode: PropTypes.number,
  publishedMode: PropTypes.number,
  page: PropTypes.object,
  role: PropTypes.number,
  mode: PropTypes.number,
  pageState: PropTypes.number,
  onPageMode: PropTypes.func,
  onPublicMode: PropTypes.func,
  onPublishedMode: PropTypes.func,
  handlePageEdit: PropTypes.func,
  handleUpdate: PropTypes.func,
  moved: PropTypes.bool,
  onNewView: PropTypes.func,
  headers: PropTypes.array,
  quiz: PropTypes.bool,
  references: PropTypes.bool
};
