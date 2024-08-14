import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="welcome-section">
        <div className="welcome-image">
          <img src="./booksmartlogo.png" alt="Welcome" />
        </div>
        <div className="welcome-content">
          <h1>Welcome to Book Smart</h1>
          <p>
            Book Smart is your go-to platform for booking the best hotels around the world. We offer a wide range of accommodations to suit every traveler's needs, ensuring a seamless and enjoyable booking experience.
          </p>
        </div>
      </section>

      <section className="mission-values-section">
        <div className="mission">
          <h2>Our Mission</h2>
          <h3>Transforming Travel</h3>
          <p>
            At Book Smart, our mission is to make hotel booking simple, efficient, and affordable. We strive to provide our customers with the best options and unbeatable deals, making travel planning a breeze.
          </p>
        </div>
        <div className="values">
          <h2>Our Values</h2>
          <h3>Guiding Principles</h3>
          <p>
            Convenience, Reliability, Affordability, and Customer Satisfaction are the core values that drive our business. We are committed to offering a user-friendly platform, reliable service, competitive prices, and exceptional customer support.
          </p>
        </div>
      </section>

      <section className="legacy-section">
        <h2>A Legacy of Excellence</h2> 
        <p>
          Book Smart was founded in 2010 with the vision of revolutionizing the hotel booking industry. Over the past decade, we have grown into a trusted name in travel, constantly innovating and adapting to meet the evolving needs of our customers.
        </p>
        {/* <div className="team">
          <div className="team-member">
            <img src="" alt="Alice Brown" />
            <p>Alice Brown</p>
          </div>
          <div className="team-member">
            <img src="" alt="Bob Green" />
            <p>Bob Green</p>
          </div>
          <div className="team-member">
            <img src="" alt="Catherine White" />
            <p>Catherine White</p>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default AboutUs;
