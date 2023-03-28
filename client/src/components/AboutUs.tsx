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
import ShownInView from './ShownInView';

function ExploreOurFoods() {
  return (
    <Container className="explore-our-foods">
      <ShownInView timeout={2200}>
        <h2>
          Explore Our Foods
        </h2>
        <ul>
          {demoFoodItems.map((foodItem: IFoodItem, i) => (
            <li key={foodItem.name}>
              <ShownInView timeout={800 * (i + 1)}>
                <FoodItem
                  foodItem={foodItem}
                  demo
                />
              </ShownInView>
            </li>
          ))}
        </ul>
      </ShownInView>
    </Container>
  );
}

function MissionStatement() {
  return (
    <Container className="mission-statement">
      <Col>
        <ShownInView>
          <Row>
            <Col md={7}>
              <ShownInView timeout={700}>
                <Image className="image-one" src={imageOne} />
              </ShownInView>
            </Col>
            <Col className="text-col" md={5}>
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
        </ShownInView>
        <ShownInView animation="anim-two">
          <Row>
            <Col className="lower-col" md={5}>
              <h2>
                We make everything by hand with the best possible ingredients.
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit amet leo. Mauris feugiat erat tellus.
              </p>
              <ul>
                <li key="bp-1">
                  <FontAwesomeIcon icon={faWheatAlt} />
                  Etiam sed dolor ac diam volutpat.
                </li>
                <li key="bp-2">
                  <FontAwesomeIcon icon={faWheatAlt} />
                  Erat volutpat aliquet imperdiet.
                </li>
                <li key="bp-3">
                  <FontAwesomeIcon icon={faWheatAlt} />
                  purus a odio finibus bibendum.
                </li>
              </ul>
              <Button>
                Learn More
              </Button>
            </Col>
            <Col md={7}>
              <ShownInView timeout={700} animation="anim-two">
                <Image className="image-two" src={imageTwo} />
              </ShownInView>
            </Col>
          </Row>
        </ShownInView>
      </Col>
    </Container>
  );
}

function VideoPresentation() {
  return (
    <ShownInView animation="anim-three">
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
    </ShownInView>
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
