import React from "react";
import { ReactComponent as FacebookIcon } from '../Resources/Icons/facebook.svg'
import { ReactComponent as InstagramIcon } from '../Resources/Icons/instagram.svg'
import { ReactComponent as TwitterIcon } from '../Resources/Icons/twitter.svg'

function Footer() {
  return (
    <footer className="footer">
      <div className="upper_footer">
        <div className="upper_footer_info">
          <div className="upper_footer_info_title">PREDU</div>
          <div className="upper_footer_info_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
           Officiis, hic. Nobis ut aliquam dolore. Consequuntur facere, cumque facilis fugiat porro consectetur, 
           recusandae beatae voluptates ipsam velit, harum repellat optio temporibus.</div>
          <div className="upper_footer_info_signature">-MinhCH, The Dev</div>
        </div>
        <div className="upper_footer_contacts">
          <div className="upper_footer_contacts_title">CONTACTS</div>
          <div className="upper_footer_contacts_content">
            <div className="upper_footer_contacts_content_item">
              <i className="ri-map-pin-2-line upper_footer_contacts_content_item_icon"></i>
              <div className="upper_footer_contacts_content_item_title">Location:</div>
              <div className="upper_footer_contacts_content_item_content">Lorem Ipsum dolor sit amet consectetur</div>
            </div>
            <div className="upper_footer_contacts_content_item">
              <i className="ri-phone-fill upper_footer_contacts_content_item_icon"></i>
              <div className="upper_footer_contacts_content_item_title">Hotline:</div>
              <div className="upper_footer_contacts_content_item_content">0919092002</div>
            </div>
            <div className="upper_footer_contacts_content_item">
              <i className="ri-mail-line upper_footer_contacts_content_item_icon"></i>
              <div className="upper_footer_contacts_content_item_title">E-Mail:</div>
              <div className="upper_footer_contacts_content_item_content">mailmail@mail.com</div>
            </div>
          </div>
        </div>
        <div className="upper_footer_media">
          <div className="upper_footer_media_title">FOLLOW US</div>
          <div className="upper_footer_media_content">
            <a href="#" className="upper_footer_media_content_link">
              <FacebookIcon className="upper_footer_media_content_link_icon"/>
            </a>
            <a href="#" className="upper_footer_media_content_link">
              <InstagramIcon className="upper_footer_media_content_link_icon"/> 
            </a>
            <a href="#" className="upper_footer_media_content_link">
              <TwitterIcon className="upper_footer_media_content_link_icon"/>
            </a>
          </div>
        </div>
      </div>
      <div className="lower_footer">
        <div className="lower_footer_copyrights">
          <i className="ri-copyright-line lower_footer_copyrights_icon"></i>
          <div className="lower_footer_copyrights_content">2023 PREDU. All Rights Reserved. | Designed by Zeigst</div>
        </div>
        <div className="lower_footer_termcond">
          <a className="lower_footer_termcond_link" href="#">Privacy Policy</a>
          <div className="lower_footer_termcond_separate"></div>
          <a className="lower_footer_termcond_link" href="#">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;