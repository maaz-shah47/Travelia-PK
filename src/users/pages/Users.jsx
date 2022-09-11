import React from 'react'
import Card from '../../shared/components/UIElements/Card'
import UsersList from '../components/UsersList'

const Users = () => {
  const USERS = [
    {
      id: 1,
      name: "Max Schwarz",
      image: "https://images.unsplash.com/photo-1662553172331-10b51cdfa963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2058&q=80",
      places: 1
    },
    {
      id: 2,
      name: "Max",
      image: "https://images.unsplash.com/photo-1662553172331-10b51cdfa963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2058&q=80",
      places: 2
    },
    {
      id: 3,
      name: "John",
      image: "https://images.unsplash.com/photo-1662553172331-10b51cdfa963?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2058&q=80",
      places: 5
    }
  ]
  return (
    <>
      <UsersList items={USERS} />
    </>
    )
}

export default Users
