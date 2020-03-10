import React from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import "./NavBar.css"

//if the Navbar prop hasUser exists ( there is a user ) render the nav bar
const NavBar = props => {
  const handleLogout = () => {
    props.clearUser()
    props.history.push("/login")
  }

  return (
    <nav>
      {props.hasUser ? (
        <ul className="navList">
          <li>
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" style={{ textDecoration: 'none' ,  color: '#160D58'}} to="/tasks">
              Tasks
            </Link>
          </li>
          <li>
            <Link className="nav-link" style={{ textDecoration: 'none' ,  color: '#160D58'}}   to="/events">
              Events
            </Link>
          </li>
          <li>
            <Link className="nav-link" style={{ textDecoration: 'none' ,  color: '#160D58' }} to="/messages">
              Messages
            </Link>
          </li>
          <li>
            <Link className="nav-link" style={{ textDecoration: 'none' ,  color: '#160D58'}} to="/friendships">
              Friends
            </Link>
          </li>
          <li>
            <Link className="nav-link" style={{ textDecoration: 'none' ,  color: '#160D58'}} to="/articles">
              Articles
            </Link>
          </li>
          <li>
            <span className="nav-link" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </span>
          </li>
        </ul>
      ) : null}
    </nav>
  )
}

export default withRouter(NavBar)
