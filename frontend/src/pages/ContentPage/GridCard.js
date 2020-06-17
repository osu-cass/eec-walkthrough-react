import React, {useState, useEffect} from "react";
import {Card as CardBS} from "react-bootstrap";
import EditCard from "./EditCard";
import GridReviewCard from "./GridReviewCard";
import PropTypes from "prop-types";
import Image from "./Image";
import "./GridCard.css";

// A single card on a subject or industry page
// Has a special grid format that works well with images
function GridCard(props) {

  const [imageItems, setImageItems] = useState([]);

  // whenever we get new items, filter out all of the non-url ones
  useEffect(() => {
    const imageArray = [];
    for (let i = 0; i < props.items.length; i++) {
      if (props.items[i].contentUrl.length) {
        imageArray.push(props.items[i]);
      }
    }
    setImageItems(imageArray);
  }, [props.items]);

  return (
    <CardBS className={`my-2 shadow-sm ${props.approved ? "card-body-approved" : "card-body-review"}`}>
      <CardBS.Header as="h5" className="d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold">
        {props.card}
        <div className="row">
          <EditCard
            title={`Edit ${props.card} Card`}
            cardName={props.card}
            icons={props.iconSet}
            items={props.items}
            headerId={props.headerId}
            cardId={props.cardId}
            cardType={props.cardType}
            parentId={props.parentId}
            orderIndex={props.orderIndex}
            refresh={() => props.refresh()}
          />
          <GridReviewCard
            title={props.card}
            cardId={props.cardId}
            refresh={() => props.refresh()}
            approved={props.approved}
            cardItems={imageItems}
            userId={props.userId}
            created={props.created}
          />
        </div>
      </CardBS.Header>
      <CardBS.Body>
        <div className="row text-center text-lg-left">
          {imageItems.map((item) =>
            <div className="col-lg-3 col-md-4 col-6 my-auto" align="center"
              key={item.itemId + "a"}
            >
              <div className="d-block mb-4 h-100" key={item.itemId + "b"}>
                <Image
                  url={item.contentUrl}
                  title={item.contentLabel}
                  thumbnail={true}
                  header={false}
                  key={item.itemId + "c"}
                />
              </div>
            </div>
          )}
        </div>
      </CardBS.Body>
    </CardBS>
  );

}
export default GridCard;

GridCard.propTypes = {
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
  cardType: PropTypes.any,
  parentId: PropTypes.any,
  approved: PropTypes.number,
  userId: PropTypes.number,
  created: PropTypes.any
};