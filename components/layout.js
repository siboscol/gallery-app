import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {
  Container, Row, Col, Nav, NavItem, Button, Form, NavLink, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Modal, ModalHeader, ModalBody,
  ModalFooter, ListGroup, ListGroupItem
} from 'reactstrap'
import Signin from './signin'
import Cookies from 'universal-cookie'
import Package from '../package'
import Styles from '../css/index.scss'

export default class extends React.Component {

  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired,
      children: React.PropTypes.object.isRequired,
      fluid: React.PropTypes.boolean,
      navmenu: React.PropTypes.boolean,
      signinBtn: React.PropTypes.boolean
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      navOpen: false,
      modal: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  async toggleModal(e) {
    if (e) e.preventDefault()

    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{this.props.title || 'Gallery Project'}</title>
          <style dangerouslySetInnerHTML={{ __html: Styles }} />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        </Head>
        <Navbar light className="navbar navbar-expand-md pt-3 pb-3">
          <Link prefetch href="/">
            <NavbarBrand href="/">
              <span className="icon ion-md-home mr-1"></span> {Package.name}
            </NavbarBrand>
          </Link>
          <input className="nojs-navbar-check" id="nojs-navbar-check" type="checkbox" aria-label="Menu" />
          <label tabIndex="1" htmlFor="nojs-navbar-check" className="nojs-navbar-label mt-2" />
          <div className="nojs-navbar">
            <Nav navbar>
              <NavItem>
                <Link prefetch href="/examples/gallery">
                  <NavLink href="/examples/gallery">Gallery</NavLink>
                </Link>
              </NavItem>
            </Nav>
            <UserMenu session={this.props.session} toggleModal={this.toggleModal} signinBtn={this.props.signinBtn} />
          </div>
        </Navbar>
        <MainBody navmenu={this.props.navmenu} fluid={this.props.fluid} container={this.props.container}>
          {this.props.children}
        </MainBody>
        <Container fluid={this.props.fluid}>
          <hr className="mt-3" />
          <p className="text-muted small">
            <Link href="https://github.com/siboscol/gallery-app"><a className="text-muted font-weight-bold"><span className="icon ion-logo-github" /> {Package.name} {Package.version}</a></Link>
            <span> built with </span>
            <Link href="https://github.com/zeit/next.js"><a className="text-muted font-weight-bold">Next.js {Package.dependencies.next.replace('^', '')}</a></Link>
            <span> &amp; </span>
            <Link href="https://github.com/facebook/react"><a className="text-muted font-weight-bold">React {Package.dependencies.react.replace('^', '')}</a></Link>
            .
            <span className="ml-2">&copy; {new Date().getYear() + 1900}.</span>
          </p>
        </Container>
        <SigninModal modal={this.state.modal} toggleModal={this.toggleModal} session={this.props.session} />
      </React.Fragment>
    )
  }
}

export class MainBody extends React.Component {
  render() {
    if (this.props.container === false) {
      return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      )
    } else if (this.props.navmenu === false) {
      return (
        <Container fluid={this.props.fluid} style={{ marginTop: '1em' }}>
          {this.props.children}
        </Container>
      )
    } else {
      return (
        <Container fluid={this.props.fluid} style={{ marginTop: '1em' }}>
          <Row>
            <Col xs="12" md="9" lg="10">
              {this.props.children}
            </Col>
            <Col xs="12" md="3" lg="2" style={{ paddingTop: '1em' }}>
              <h5 className="text-muted text-uppercase">Pages</h5>
              <ListGroup>
                <ListGroupItem>
                  <Link prefetch href="/examples/styling"><a href="/examples/gallery" className="d-block">Gallery</a></Link>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export class UserMenu extends React.Component {
  constructor(props) {
    super(props)
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this)
  }

  async handleSignoutSubmit(event) {
    event.preventDefault()
    // Remove all cookies in order to sign out the user
    const cookies = new Cookies()
    cookies.remove('token')
    cookies.remove('user')
    Router.push('/')
  }

  render() {
    if (this.props.session && this.props.session.user) {
      // If signed in display user dropdown menu
      const session = this.props.session
      return (
        <Nav className="ml-auto" navbar>
          {/*<!-- Uses .nojs-dropdown CSS to for a dropdown that works without client side JavaScript ->*/}
          <div tabIndex="2" className="dropdown nojs-dropdown">
            <div className="nav-item">
              <span className="dropdown-toggle nav-link d-none d-md-block">
                <span className="icon ion-md-contact" style={{ fontSize: '2em', position: 'absolute', top: -5, left: -25 }}></span>
              </span>
              <span className="dropdown-toggle nav-link d-block d-md-none">
                <span className="icon ion-md-contact mr-2"></span>
                {session.user}
              </span>
            </div>
            <div className="dropdown-menu">
              <div className="dropdown-item p-0">
                <Form id="signout" method="post"onSubmit={this.handleSignoutSubmit}>
                  <Button type="submit" block className="pl-4 rounded-0 text-left dropdown-item"><span className="icon ion-md-log-out mr-1"></span> Sign out</Button>
                </Form>
              </div>
            </div>
          </div>
        </Nav>
      )
    } if (this.props.signinBtn === false) {
      // If not signed in, don't display sign in button if disabled
      return null
    } else {
      // If not signed in, display sign in button
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <a href="#" className="btn btn-outline-primary" onClick={this.props.toggleModal}><span className="icon ion-md-log-in mr-1"></span> Sign up / Log in</a>
          </NavItem>
        </Nav>
      )
    }
  }
}

export class SigninModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} style={{ maxWidth: 700 }}>
        <ModalHeader>Sign up / Log in</ModalHeader>
        <ModalBody style={{ padding: '1em 2em' }}>
          <Signin />
        </ModalBody>
      </Modal>
    )
  }
}