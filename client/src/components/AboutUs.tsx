import React from 'react';
import {
  Col, Row, Image, Container, Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWheatAlt, faPlay,
} from '@fortawesome/free-solid-svg-icons';
import imageOne from '../assets/about-us-1.png';
import imageTwo from '../assets/about-us-2.png';
import FoodItem from './FoodItem';
import { demoFoodItems } from '../utils/consts';
import { IFoodItem } from '../types/types';

function ExploreOurFoods() {
  return (
    <Container className="explore-our-foods">
      <h2>
        Explore Our Foods
      </h2>
      <Row>
        {demoFoodItems.map((foodItem: IFoodItem) => (
          <FoodItem
            foodItem={foodItem}
            bootstrapWidth={4}
          />
        ))}
      </Row>
    </Container>
  );
}

function MissionStatement() {
  return (
    <Container className="mission-statement">
      <Col>
        <Row>
          <Col md={7}>
            <Image className="image-one" src={imageOne} />
          </Col>
          <Col md={5}>
            <h2>
              We pride ourselves on making real food from the best ingredients.
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit amet leo. Mauris feugiat erat tellus.Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
            </p>
            <Button>
              Learn More
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <h2>
              We make everything by hand with the best possible ingredients.
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit amet leo. Mauris feugiat erat tellus.
            </p>
            <ul>
              <li>
                <FontAwesomeIcon icon={faWheatAlt} />
                Etiam sed dolor ac diam volutpat.
              </li>
              <li>
                <FontAwesomeIcon icon={faWheatAlt} />
                Erat volutpat aliquet imperdiet.
              </li>
              <li>
                <FontAwesomeIcon icon={faWheatAlt} />
                purus a odio finibus bibendum.
              </li>
            </ul>
            <Button>
              Learn More
            </Button>
          </Col>
          <Col md={7}>
            <Image className="image-two" src={imageTwo} />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

function VideoPresentation() {
  return (
    <Col className="video-presentation">
      <h2>
        When one&apos;s stomach is full it makes no
        difference whether they are rich or poor.
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio
        finibus bibendum in sit amet leo. Mauris feugiat erat tellus.
      </p>
      <a href="https://www.youtube.com/watch?v=bZx8rPd-PKQ">
        <FontAwesomeIcon icon={faPlay} />
        Watch Our Story
      </a>
    </Col>
  );
}

function AboutUs() {
  return (
    <div id="about-us">
      <ExploreOurFoods />
      <MissionStatement />
      <VideoPresentation />
    </div>
  );
}

export default AboutUs;
