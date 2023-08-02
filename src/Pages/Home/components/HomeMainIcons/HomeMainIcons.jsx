import React from "react";
import {ReactComponent as AppsIcon} from '../../../../Resources/Icons/new_releases.svg'
import {ReactComponent as UsersIcon} from '../../../../Resources/Icons/group.svg'
import {ReactComponent as ThumbIcon} from '../../../../Resources/Icons/thumb_up.svg'
import {ReactComponent as CSIcon} from '../../../../Resources/Icons/support_agent.svg'

const HomeMainIcons = () => {
  return (
    <div className="home-main-icons">
      <div className="container">
        <AppsIcon className="icon"/>
        <h1>20+</h1>
        <p>App & Services</p>
      </div>

      <div className="container">
        <UsersIcon className="icon"/>
        <h1>2000+</h1>
        <p>User Subscriptions</p>
      </div>

      <div className="container">
        <ThumbIcon className="icon"/>
        <h1>5 &#9733;</h1>
        <p>Rating</p>
      </div>

      <div className="container">
        <CSIcon className="icon"/>
        <h1>24/7</h1>
        <p>Customer Support</p>
      </div>
    </div>
  )
}

export default HomeMainIcons