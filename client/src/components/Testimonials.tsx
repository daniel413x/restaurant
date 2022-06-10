import React, { ReactElement, useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Slider from 'react-slick';
import { ITestimonial } from '../types/types';
import reviewImageOne from '../assets/review-1-temp.jpg';

interface TestimonialProps {
  testimonial: ITestimonial;
}

function Testimonial({ testimonial }: TestimonialProps): ReactElement<ITestimonial> {
  return (
    <div className="testimonial">
      <Image src={reviewImageOne} />
      <div className="body">
        {`"${testimonial.body}"`}
      </div>
      <div className="name">
        {testimonial.user.name}
      </div>
    </div>
  );
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  useEffect(() => {
    setTestimonials([
      {
        id: 1,
        body: 'Протягом наступних уроків ми будем крок за кроком створювати веб-додаток Cat Photo мовою HTML5.',
        user: {
          name: 'Скісна',
          email: 'fdsf',
          avatar: 'fgdg',
        },
      },
      {
        id: 2,
        body: 'Виберіть усі теги li у документі використовуючи .selectAll() та змініть їх текст на рядок list item, послідовно скориставшись методом .text().',
        user: {
          name: 'Cкориставшись',
          email: 'fdsf',
          avatar: 'fgdg',
        },
      },
      {
        id: 3,
        body: 'Ваш код має застосовувати методselect. Ваш код має застосовувати метод append. Ваш код має застосовувати метод text.',
        user: {
          name: 'Застосовувати',
          email: 'fdsf',
          avatar: 'fgdg',
        },
      },
    ]);
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div id="testimonials">
      <h2>
        Testimonials
      </h2>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        {testimonials.map((t) => (
          <Testimonial
            testimonial={t}
            key={t.id}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
