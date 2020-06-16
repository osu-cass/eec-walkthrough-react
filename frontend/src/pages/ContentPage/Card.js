import React from "react";
import {Card as CardBS} from "react-bootstrap";
import BulletPoint from "./BulletPoint";
import EditCard from "./EditCard";
import ReviewCard from "./ReviewCard";
import PropTypes from "prop-types";
import "./Card.css";

// A single card on a subject or industry page
class Card extends React.Component {

  // return children of id === parentId
  getChildren(id) {
    const results = this.props.items.reduce((result, item) => {
      if (item.parentId === id) {
        result.push(item);
      }
      return result;
    }, []);
    return results.length ? results : false;
  }

  recurseItems(item, icon, categoryId, used, isChild) { // isChild = marks if it has any parent, for coloring
    const children = this.getChildren(item.itemId); // get all children of this item
    const hide = this.props.checkFilter(item.iconType);
    if (!(used.includes(item.itemId))) {
      used.push(item.itemId);  // push used
      if (children) {  // if has child, recurse
        return (
          <BulletPoint
            key={item.itemId}
            id={item.itemId}
            icon={item.typeName}
            text={item.contentText}
            label={item.contentLabel}
            child={isChild}
            url={item.contentUrl}
            checkFilter={this.props.checkFilter}
            hide={hide}
          >
            {children.map((child) => (this.recurseItems(child, icon, categoryId, used, true)))}
          </BulletPoint>
        );
      } else {
        return <BulletPoint
          key={item.itemId}
          url={item.contentUrl}
          id={item.itemId}
          icon={item.typeName}
          text={item.contentText}
          label={item.contentLabel}
          child={isChild}
          checkFilter={this.props.checkFilter}
          hide={hide}
        />;
      } // if no children, base case
    }
  }

  generateItems(list) {
    let used = this.props.used1;
    if (list === 2) {
      used = this.props.used2;
    }
    const jsx = []; // hold items
    this.props.items.map((item) => { // Loop through items of some category
      if (item.CategoryID === this.props.categoryId) {
        jsx.push(this.recurseItems(item, this.props.icon, this.props.categoryId, used, false));
      }
      return null;
    });

    return jsx;
  }

  render() {
    return (
      <CardBS className={`my-2 shadow-sm ${this.props.approved ? "card-body-approved" : "card-body-review"}`}>
        <CardBS.Header as="h5" className="d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold">
          {this.props.card}
          <div className="row">
            <EditCard
              title={`Edit ${this.props.card} Card`}
              cardName={this.props.card}
              icons={this.props.iconSet}
              items={this.props.items}
              headerId={this.props.headerId}
              cardId={this.props.cardId}
              parentId={this.props.parentId}
              orderIndex={this.props.orderIndex}
              refresh={() => this.props.refresh()}
            />
            <ReviewCard
              title={`${this.props.card}`}
              cardId={this.props.cardId}
              refresh={() => this.props.refresh()}
              approved={this.props.approved}
              cardItems={this.generateItems(1)}
              userId={this.props.userId}
              created={this.props.created}
            />
          </div>
        </CardBS.Header>
        <CardBS.Body>
          {this.generateItems(2)}
        </CardBS.Body>
      </CardBS>
    );
  }
}
export default Card;

Card.propTypes = {
  items: PropTypes.any,
  checkFilter: PropTypes.any,
  categoryId: PropTypes.any,
  used1: PropTypes.any,
  used2: PropTypes.any,
  card: PropTypes.any,
  iconSet: PropTypes.any,
  headerId: PropTypes.any,
  orderIndex: PropTypes.any,
  refresh: PropTypes.any,
  icon: PropTypes.any,
  cardId: PropTypes.any,
  parentId: PropTypes.any,
  approved: PropTypes.number,
  userId: PropTypes.number,
  created: PropTypes.any
};