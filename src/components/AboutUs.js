import React from 'react'
import Photo from './Photo'
import aboutImage from '../images/about_us/pexels-bruno-glätsch-1461027.jpg'
import about1 from '../images/about_us/about-1.jpg'

function AboutUs() {
  return (
    <div id='about'>
      <Photo title='WHO WE ARE?' photo={aboutImage} />
      <div id="about-data">
        <h2 id='blog-event'>OUR MISSION</h2>
        <div id='line'></div>
        <p>We spread humanity with our thoughts by writing blogs. <br /><br />
          Our goal is to people aware about them self.<br /><br />
          We have many campaings across the countries.
          We let our joiners who writes about their feelings, thoughts and have the courage to bring that infront of the people.
        </p>
      </div>
      <div id= 'core-values'>
        <div id='blog-div'>
          <h2 id='blog-event'>Our Core Values</h2>
          <div id='line'></div>
          <p>
            We should always respect to others. What goes around, comes around!! <br/><br/>
            <li>Always support and help our people</li>
            <li>We should appreciate others</li>
            <li>Treat everyone equally, no matter where they come from</li>
          </p>
        </div>
        <img src={about1} alt='about1-pic'/>
      </div>
      <div id="subscribe">
        <div className='style-sub'>
          <h2>Subscribe to our Newsletter</h2>
          <div id='line'></div>
          <h4>Get e-mail updates about our latest shops and special offers</h4>
        </div>
        <input type='text' placeholder='Enter email address' /><br />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default AboutUs