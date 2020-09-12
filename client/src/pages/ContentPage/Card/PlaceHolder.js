import React, {Fragment} from "react";
import PropTypes from "prop-types";
import "./BasicItems.css";

// A placeholder item for prototyping
function PlaceHolder(props) {

  if (props.type === 1) {
    // default
    return (
      <Fragment>
        {/* An item */}
        <div className="row mx-auto">
          <div className="icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="content-td pb-2 col">
            <span className="icon-item-text">
              Lorem ipsum dolor sit amet.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="row mx-auto">
          <div className="icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="content-td pb-2 col">
            <span className="icon-item-text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="row mx-auto">
          <div className="icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="content-td pb-2 col">
            <span className="icon-item-text">
              At vero eos et accusamus et iusto.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="row mx-auto">
          <div className="icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="content-td pb-2 col">
            <span className="icon-item-text">
              In vehicula lectus vitae nisi consectetur.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="row mx-auto">
          <div className="icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="content-td pb-2 col">
            <span className="icon-item-text">
              Nunc laoreet porta est vel consectetur. Nunc molestie lectus purus, eu fringilla ipsum feugiat eu. Praesent luctus eleifend velit quis accumsan.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="row mx-auto">
          <div className="icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="content-td pb-2 col">
            <span className="icon-item-text">
              Mauris ac elit a sapien auctor varius.
            </span>
          </div>
        </div>
      </Fragment>
    );
  } else if (props.type === 2) {
    // inline
    return (
      <Fragment>
        {/* An item */}
        <div className="d-inline icon-td justify-content-center">
          <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
        </div>
        <div className="d-inline content-td pb-2 col mr-2">
          <span className="icon-item-text">
              Lorem ipsum dolor sit amet.
          </span>
        </div>
        {/* An item */}
        <div className="d-inline icon-td justify-content-center">
          <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
        </div>
        <div className="d-inline content-td pb-2 col mr-2">
          <span className="icon-item-text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </span>
        </div>
        {/* An item */}
        <div className="d-inline icon-td justify-content-center">
          <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
        </div>
        <div className="d-inline content-td pb-2 col mr-2">
          <span className="icon-item-text">
              At vero eos et accusamus et iusto.
          </span>
        </div>
        {/* An item */}
        <div className="d-inline icon-td justify-content-center">
          <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
        </div>
        <div className="d-inline content-td pb-2 col mr-2">
          <span className="icon-item-text">
              In vehicula lectus vitae nisi consectetur.
          </span>
        </div>
        {/* An item */}
        <div className="d-inline icon-td justify-content-center">
          <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
        </div>
        <div className="d-inline content-td pb-2 col mr-2">
          <span className="icon-item-text">
              Nunc laoreet porta est vel consectetur. Nunc molestie lectus purus, eu fringilla ipsum feugiat eu. Praesent luctus eleifend velit quis accumsan.
          </span>
        </div>
        {/* An item */}
        <div className="d-inline icon-td justify-content-center">
          <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
        </div>
        <div className="d-inline content-td pb-2 col mr-2">
          <span className="icon-item-text">
              Mauris ac elit a sapien auctor varius.
          </span>
        </div>
      </Fragment>
    );
  } else if (props.type === 3) {
    // inline with no-wrap
    return (
      <Fragment>
        {/* An item */}
        <div className="d-inline text-nowrap">
          <div className="d-inline icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="d-inline content-td pb-2 col mr-2">
            <span className="icon-item-text">
              Lorem ipsum dolor sit amet.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="d-inline text-nowrap">
          <div className="d-inline icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="d-inline content-td pb-2 col mr-2">
            <span className="icon-item-text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="d-inline text-nowrap">
          <div className="d-inline icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="d-inline content-td pb-2 col mr-2">
            <span className="icon-item-text">
              At vero eos et accusamus et iusto.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="d-inline text-nowrap">
          <div className="d-inline icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="d-inline content-td pb-2 col mr-2">
            <span className="icon-item-text">
              In vehicula lectus vitae nisi consectetur.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="d-inline text-nowrap">
          <div className="d-inline icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="d-inline content-td pb-2 col mr-2">
            <span className="icon-item-text">
              Nunc laoreet porta est vel consectetur. Nunc molestie lectus purus, eu fringilla ipsum feugiat eu. Praesent luctus eleifend velit quis accumsan.
            </span>
          </div>
        </div>
        {/* An item */}
        <div className="d-inline text-nowrap">
          <div className="d-inline icon-td justify-content-center">
            <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
          </div>
          <div className="d-inline content-td pb-2 col mr-2">
            <span className="icon-item-text">
              Mauris ac elit a sapien auctor varius.
            </span>
          </div>
        </div>
      </Fragment>
    );
  } else if (props.type === 4) {
    // grid
    return (
      <Fragment>

        <div className="row text-center text-lg-left">

          <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
            <div className="d-block my-2 h-100">
              <div className="row mx-auto">
                <div className="icon-td justify-content-center">
                  <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                </div>
                <div className="content-td pb-2 col text-left">
                  <span className="icon-item-text">
                  Lorem ipsum dolor sit amet.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
            <div className="d-block my-2 h-100">
              <div className="row mx-auto">
                <div className="icon-td justify-content-center">
                  <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                </div>
                <div className="content-td pb-2 col text-left">
                  <span className="icon-item-text">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
            <div className="d-block my-2 h-100">
              <div className="row mx-auto">
                <div className="icon-td justify-content-center">
                  <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                </div>
                <div className="content-td pb-2 col text-left">
                  <span className="icon-item-text">
                  At vero eos et accusamus et iusto.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
            <div className="d-block my-2 h-100">
              <div className="row mx-auto">
                <div className="icon-td justify-content-center">
                  <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                </div>
                <div className="content-td pb-2 col text-left">
                  <span className="icon-item-text">
                  In vehicula lectus vitae nisi consectetur.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
            <div className="d-block my-2 h-100">
              <div className="row mx-auto">
                <div className="icon-td justify-content-center">
                  <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                </div>
                <div className="content-td pb-2 col text-left">
                  <span className="icon-item-text">
                  Nunc laoreet porta est vel consectetur. Nunc molestie lectus purus, eu fringilla ipsum feugiat eu. Praesent luctus eleifend velit quis accumsan.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
            <div className="d-block my-2 h-100">
              <div className="row mx-auto">
                <div className="icon-td justify-content-center">
                  <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                </div>
                <div className="content-td pb-2 col text-left">
                  <span className="icon-item-text">
                  Mauris ac elit a sapien auctor varius.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </Fragment>
    );
  } else if (props.type === 5) {
    // grid with border
    return (
      <Fragment>
        <div className="border rounded py-2 px-3">
          <div className="row text-center text-lg-left">

            <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
              <div className="d-block my-2 h-100">
                <div className="row mx-auto">
                  <div className="icon-td justify-content-center">
                    <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                  </div>
                  <div className="content-td pb-2 col text-left">
                    <span className="icon-item-text">
                  Lorem ipsum dolor sit amet.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
              <div className="d-block my-2 h-100">
                <div className="row mx-auto">
                  <div className="icon-td justify-content-center">
                    <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                  </div>
                  <div className="content-td pb-2 col text-left">
                    <span className="icon-item-text">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
              <div className="d-block my-2 h-100">
                <div className="row mx-auto">
                  <div className="icon-td justify-content-center">
                    <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                  </div>
                  <div className="content-td pb-2 col text-left">
                    <span className="icon-item-text">
                  At vero eos et accusamus et iusto.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
              <div className="d-block my-2 h-100">
                <div className="row mx-auto">
                  <div className="icon-td justify-content-center">
                    <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                  </div>
                  <div className="content-td pb-2 col text-left">
                    <span className="icon-item-text">
                  In vehicula lectus vitae nisi consectetur.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
              <div className="d-block my-2 h-100">
                <div className="row mx-auto">
                  <div className="icon-td justify-content-center">
                    <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                  </div>
                  <div className="content-td pb-2 col text-left">
                    <span className="icon-item-text">
                  Nunc laoreet porta est vel consectetur. Nunc molestie lectus purus, eu fringilla ipsum feugiat eu. Praesent luctus eleifend velit quis accumsan.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 mb-auto" align="center">
              <div className="d-block my-2 h-100">
                <div className="row mx-auto">
                  <div className="icon-td justify-content-center">
                    <i className="fas fa-fw fa-pencil-alt mr-2 icon-item indent-level-0"/>
                  </div>
                  <div className="content-td pb-2 col text-left">
                    <span className="icon-item-text">
                  Mauris ac elit a sapien auctor varius.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }

}
export default PlaceHolder;

PlaceHolder.propTypes = {
  type: PropTypes.number
};