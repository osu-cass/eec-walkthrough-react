import React, {useState, useEffect} from "react";

// A single card on a subject or industry page
function CardObject(props) {

  const [number, setNumber] = useState(1);

  useEffect(() => {
    setNumber(2);
  }, []);

  useEffect(() => {
    console.log("HELLO", number);
  }, [number]);

  return (
    <div>{number}</div>
  );
}
export default CardObject;
