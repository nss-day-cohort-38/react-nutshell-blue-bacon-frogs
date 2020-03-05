import React from "react"
import {Link} from "react-router-dom"
//if the Navbar prop hasUser exists ( there is a user ) render the nav bar
const NavBar = (props) => {
    return (
        <nav>     
{props.hasUser ? (
   
            <ul className="navList">
                <li>
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/tasks">Tasks</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/events">Events</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/messages">Messages</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/friendships">Friends</Link>
                </li>
            </ul>
    ): null}
        </nav>

    )
}

export default NavBar