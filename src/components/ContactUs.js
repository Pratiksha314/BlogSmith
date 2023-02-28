import React from 'react'
import Photo from './Photo'
import contactImage from '../images/contact_us/pexels-lisa-fotios-1107717.jpg'
import contact from '../images/contact_us/pexels-kai-pilger-547494.jpg'

function ContactUs() {
  return (
    <div id='contact'>
      <Photo title='CONTACT US' photo={contactImage} />
      <div id='contact-details'>
        <div id='information'>
          <h4>
            Address: 798 West 14th <br />Busan Street, Suite 721 <br/>New Delhi, ND 10016
          </h4>
          <h4>
            Phone: + 798 542 5692
          </h4>
          <h4>
            Email<span>: info@yoursite.com</span>
          </h4>
          <h4>
            Website<span>: blogsmith@site.com</span>
          </h4>
        </div>
        <div id='msg'>
          <img src={contact} alt='contact us' />
          <div id='input-us'>
            <input type='text' placeholder='Your Name' /> <br />
            <input type='text' placeholder='Your Email' /> <br />
            <input type='text' placeholder='Subject' /> <br />
            <textarea type='text' placeholder='Message' /> <br />
            <button>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs