import React, { useContext, useState } from "react"
import { PreduContext } from "../../../../PreduContext"
import { ReactComponent as UserIcon } from '../../../../Resources/Icons/person_fill.svg'

const Profile = () => {
  const { currentUser, setAuthenticated } = useContext(PreduContext)
  console.log(currentUser)

  const [firstname, setFirstname] = useState(currentUser.firstname)
  const [lastname, setLastname] = useState(currentUser.lastname)
  return (
    <main className="profile">
      <div className="profile-detail">
        <div className="container">
          <UserIcon/>
          <div className="details">
            <div className="names">
              <input type="text" className="profile-firstname" value={firstname}/>
              <input type="text" className="profile-lastname" value={lastname}/>
            </div>
            
          </div>
        </div>
      </div>
      <div className="order-history"></div>
      <div className="coupon-history"></div>
      <button className="logout-btn">Log Out</button>
    </main>
  )
}

export default Profile