import React from 'react'
import Photo from './Photo'
import mainPhoto from '../images/home/GettyImages-842486246-e1575380401179.webp'
import hiking from '../images/home/hiking-v1.jpg'
import walking from '../images/home/walking-v1.jpg'
import photo1 from '../images/home/image-1.jpg'
import photo2 from '../images/home/outdoor-image-01.jpg'
import photo3 from '../images/home/outdoor-image-04.jpg'
import photo4 from '../images/home/snow-1.jpg'

function Home() {
  return (
    <div id='home'>
      <Photo title='Explore the Colourful World' photo={mainPhoto} />
      <div id='welcome-home'>
        <h2> “Remember that happiness is a way of travel, not a destination.”</h2>
        <h2 id='blog-event'>BLOG EVENTS</h2>
        <div id='line'></div>
        <div id='main-event-div'>
          <div id='event-div'>
            <img src={hiking} alt='trek-pic' />
            <h3>Everest Camp Trek</h3>
            <p>The journey of a thousand miles begins with a single step. The goal is to die with memories not dreams.</p>
            <button id='learn-more-button'>LEARN MORE</button>
          </div>
          <div id='event-div'>
            <img src={walking} alt='trek-pic' />
            <h3>Walking Holidays</h3>
            <p>Live life with no excuses, travel with no regret. Adventures are the best way to learn.</p>
            <button id='learn-more-button'>LEARN MORE</button>
          </div>
        </div>
        <div id='many-photo-div'>
          <div id='many-photo-sub'>
            <h2 id='blog-event'>SEE BLOGS & ENJOY</h2>
            <div id='line'></div>
            <p>Of all the books in the world. The best stories are found between the pages of a passport. Don’t let fear get in the way of the life you are meant to live</p>
            <button id='learn-more-button'>LEARN MORE</button>
          </div>

          <div id='sub-photos-part'>
            <div id='photos-home'>
              <div id='two-photos-one'>
                <img src={photo2} alt='photo2' />
                <img src={photo1} alt='photo1' />
              </div>
              <div id='two-photos-two'>
                <img src={photo4} alt='photo4' />
                <img src={photo3} alt='photo3' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home