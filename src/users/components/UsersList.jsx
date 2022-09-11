import React from 'react'
import UsersItem from './UsersItem'

import './UsersList.scss'

const UsersList = ({ items }) => {
  if(items.length === 0) {
    return <div className='center'>
      <h2>No Users found.</h2>
    </div>
  }
  return (
    <ul className='users-list'>
      { items.map(({id, image, name, places}) =>
        <UsersItem key={id} id={id} name={name} image={image} placeCount={places} />
      )}
    </ul>
  )
}

export default UsersList
