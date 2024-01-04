import React from 'react'
import { Link } from 'react-router-dom'

const Navlink = () => {
  return (
    <>
      <div id="list-example" class="list-group">
        <Link class="list-group-item list-group-item-action" to="/admin/dashbord">Dash bord</Link>
        <Link class="list-group-item list-group-item-action" to="/admin/product">All product</Link>
        <Link class="list-group-item list-group-item-action" to="/admin/newproduct">New product</Link>
        <Link class="list-group-item list-group-item-action" to="/admin/order">Orders</Link>
        <Link class="list-group-item list-group-item-action" to="/admin/useres">Useres</Link>
      </div>
    </>
  )
}

export default Navlink