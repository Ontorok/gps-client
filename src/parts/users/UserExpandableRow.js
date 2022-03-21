import React from 'react'

const UserExpandableRow = ({ data }) => {
  return (
    <div style={{ backgroundColor: '#F2F4F8', color: 'black' }}>
      <p>
        <span>
          <strong>Address : </strong>
          {data.data.address}
        </span>


      </p>
    </div>
  )
}

export default UserExpandableRow