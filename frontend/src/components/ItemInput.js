import React, {Fragment} from "react";
import FormControl from "react-bootstrap/FormControl";

class ItemInput extends React.Component {
  state = {
    input: ""
  }

  render() {
    return (
      <Fragment>
        {this.props.contentType === 1 ?
          <FormControl
            placeholder="Item text"
            value={this.props.value.content.text}
            aria-label="Insert Username"
            aria-describedby="basic-addon1"
            onChange={(e) => this.props.handleInput(e, this.props.index, 1)}
            required
          />
          : ""}
        {this.props.contentType === 2 ?
          <Fragment>
            <FormControl
              placeholder="Graphic description"
              value={this.props.value.content.label}
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => this.props.handleInput(e, this.props.index, 2)}
              required
            />
            <FormControl
              placeholder="Graphic URL"
              value={this.props.value.content.url}
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => this.props.handleInput(e, this.props.index, 3)}
              required
            />
          </Fragment>
          : ""}
        {this.props.contentType === 3 ?
          <Fragment>
            <FormControl
              placeholder="Resource text/description"
              value={this.props.value.content.text}
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => this.props.handleInput(e, this.props.index, 1)}
              required
            />
            <FormControl
              placeholder="Resource URL label"
              value={this.props.value.content.label}
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => this.props.handleInput(e, this.props.index, 2)}
              required
            />
            <FormControl
              placeholder="Resource URL"
              value={this.props.value.content.url}
              aria-label="Insert Username"
              aria-describedby="basic-addon1"
              onChange={(e) => this.props.handleInput(e, this.props.index, 3)}
              required
            />
          </Fragment>
          : ""}
      </Fragment>
    );
  }
}

export default ItemInput;
