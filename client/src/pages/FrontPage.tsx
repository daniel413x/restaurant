import React from 'react';
import Header from '../components/Header';
import Stats from '../components/Stats';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Parallax from '../components/Parallax';
import Subscribe from '../components/Subscribe';

function FrontPage() {
  return (
    <div>
      <Header />
      <Stats />
      <AboutUs />
      <Testimonials />
      <FAQ />
      <Parallax />
      <Subscribe />
    </div>
  );
}

export default FrontPage;
