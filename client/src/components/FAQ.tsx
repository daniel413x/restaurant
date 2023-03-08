import React from 'react';
import {
  Col, Container,
} from 'react-bootstrap';
import ShownInView from './ShownInView';

function FAQ() {
  return (
    <ShownInView animation="anim-four" timeout={200}>
      <Container id="faq">
        <h2>
          Frequently Asked Questions
        </h2>
        <div className="grid">
          <Col>
            <span className="question">
              <span className="tilda">
                ~
              </span>
              Is your bread really baked fresh each day?
            </span>
            <span className="answer">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
            </span>
          </Col>
          <Col>
            <span className="question">
              <span className="tilda">
                ~
              </span>
              Do you bake breads containing animal fats or products?
            </span>
            <span className="answer">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
            </span>
          </Col>
          <Col>
            <span className="question">
              <span className="tilda">
                ~
              </span>
              Can I order your products online?
            </span>
            <span className="answer">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
            </span>
          </Col>
          <Col>
            <span className="question">
              <span className="tilda">
                ~
              </span>
              When are you opening a shop near me?
            </span>
            <span className="answer">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
            </span>
          </Col>
        </div>
      </Container>
    </ShownInView>
  );
}

export default FAQ;
