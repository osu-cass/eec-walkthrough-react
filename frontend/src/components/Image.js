import React, { Fragment } from 'react'
import BulletPoint from './BulletPoint'

const Image = props => {
  return (
    <Fragment>
      <BulletPoint icon="chart-area" text={props.caption} bold={true}>
        <img src={props.URL} alt={props.header} className="rounded img-fluid" style={{ maxWidth: "30em" }} />
      </BulletPoint>
    </Fragment>
  )
}

export default Image
