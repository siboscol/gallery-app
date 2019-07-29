import Link from 'next/link'
import React from 'react'
import { Container, Row, Col, Button, Jumbotron, ListGroup, ListGroupItem } from 'reactstrap'
import Page from '../components/page'
import Layout from '../components/layout'

export default class extends Page {
  render() {
    return (
      <Layout {...this.props} title={'Gallery App Project'} navmenu={false} container={false}>
        <Jumbotron className="text-light rounded-0" style={{
          backgroundColor: 'rgba(73,155,234,1)',
          background: 'url("/static/home.jpg")',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1)'
          }}>
          <Container className="mt-2 mb-2">
            <h1 className="display-2 mb-3" style={{fontWeight: 300}}>
              <span style={{fontWeight: 600}}>
                <span className="mr-3">▲</span>
                <br className="v-block d-sm-none"/>
                Gallery App Project
              </span>
            </h1>
            <p className="lead mb-5">
              Prototype of personal photo gallery built with Next.js
            </p>
            <p className="text-right">
              <a href="https://github.com/siboscol/gallery-app" className="btn btn-outline-light btn-lg"><span className="icon ion-logo-github mr-2"/> Download from GitHub</a>
            </p>
            <style jsx>{`
              .display-2  {
                text-shadow: 0 5px 10px rgba(0,0,0,0.3);
                color: rgba(255,255,255,0.9);
              }
              .lead {
                font-size: 3em;
                opacity: 0.7;
              }
              @media (max-width: 767px) {
                .display-2 {
                  font-size: 3em;
                  margin-bottom: 1em;
                }
                .lead {
                  font-size: 1.5em;
                }
              }
            `}</style>
          </Container>
        </Jumbotron>
        <Container>
          <h2 className="text-center display-4 mt-5 mb-2">Features</h2>
          <Row className="pb-5">
            <Col xs="12" sm="4" className="pt-5">
              <h3 className="text-center mb-4">Frameworks</h3>
              <ListGroup>
                <ListGroupItem><a className="text-dark" href="https://nodejs.org/en/">NodeJs</a></ListGroupItem>
                <ListGroupItem><a className="text-dark" href="https://expressjs.com">ExpressJs</a></ListGroupItem>
                <ListGroupItem><a className="text-dark" href="https://nextjs.org/features/server-side-rendering">NextJs</a></ListGroupItem>
                <ListGroupItem><a className="text-dark" href="https://reactjs.org/">ReactJs</a></ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="12" sm="4" className="pt-5">
              <h3 className="text-center mb-4">Authentication</h3>
              <ListGroup>
                <ListGroupItem><a className="text-dark" href="https://jwt.io/">Stateless authentication (JWT)</a></ListGroupItem>
                <ListGroupItem><a className="text-dark">Registration / Login / Sign out</a></ListGroupItem>
                <ListGroupItem><a className="text-dark" href="https://www.npmjs.com/package/cors">Cross-origin resource sharing (CORS)</a></ListGroupItem>
                <ListGroupItem><a className="text-dark" href="https://www.mongodb.com/">MongoDB cloud database</a></ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="12" sm="4" className="pt-5">
              <h4 className="text-center mb-4">CSS / SCSS</h4>
              <ListGroup>
                <ListGroupItem><a className="text-dark" href="https://getbootstrap.com">Bootstrap 4.0</a></ListGroupItem>
                <ListGroupItem><a className="text-dark" href="http://reactstrap.github.io/">Reactstrap</a></ListGroupItem>
                <ListGroupItem><a className="text-dark" href="https://ionicframework.com/docs/ionicons/">Ionicons</a></ListGroupItem>
                <ListGroupItem><a className="text-dark" href="http://sass-lang.com/">SASS</a></ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <h2 className="text-center display-4 mt-2 mb-5">Getting Started</h2>
          <p>
            This project integrates several concepts to show how you can use them together in a Next.js project.
          </p>
          <p>
            It also serves as template for creating new projects.
          </p>
          <pre>
{`git clone https://github.com/siboscol/gallery-app.git
npm install
npm start`}
          </pre>
          <p>
            In order to get access to the gallery the user needs to sign up.
          </p>
          <p>
            For more information see <a href="https://github.com/siboscol/gallery-app/blob/master/README.md">README.md</a>
          </p>
        </Container>
      </Layout>
    )
  }
}