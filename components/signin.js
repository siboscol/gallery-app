import React from 'react'
import Router from 'next/router'
import { Row, Col, Form, Input, Label, Button, FormGroup, FormFeedback } from 'reactstrap'
import Cookies from 'universal-cookie'
import fetch from 'isomorphic-fetch'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      submitting: false,
      error: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)

  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value.trim()
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    if (!this.state.username && !this.state.password) return

    this.setState({
      submitting: true
    })

    console.log('credentials', this.state)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    };
    const res = await fetch('/users/authenticate', requestOptions)
    if (res.ok) {
      const data = await res.json()
      console.log('Authenticate response', data)

      const cookies = new Cookies()
      cookies.set('token', data.token)

      Router.push('/examples/gallery')
    } else {
      // Error while logging in
      this.setState({
        error: true,
        submitting: false
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={12} md={6}>
            <SignUp />
          </Col>
          <Col xs={12} md={6}>
            <p className="font-weight-bold">Have an account?</p>
            <Form id="signin" method="post" onSubmit={this.handleSubmit}>
                <Label htmlFor="username">Username</Label><br />
                <Input invalid={this.state.error} name="username" style={{ marginBottom: 5 }} disabled={this.state.submitting} type="text" id="username" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} />
                <FormGroup>
                  <Label htmlFor="password">Password</Label><br />
                  <Input invalid={this.state.error} name="password" disabled={this.state.submitting} type="password" id="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
                  <FormFeedback>Username or password is incorrect</FormFeedback>
                </FormGroup>
              <p/>
              <p className="text-right">
                <Button id="submitButton" disabled={this.state.submitting} outline color="dark" type="submit">
                  {this.state.submitting === true && <span className="icon icon-spin ion-md-refresh mr-2" />}
                  Log in
                  </Button>
              </p>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signUpsubmitting: false,
      error: false,
      firstname: '',
      lastname: '',
      username: '',
      password: ''
    }
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this)
    this.handleLastnameChange = this.handleLastnameChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleFirstnameChange(event) {
    this.setState({
      firstname: event.target.value.trim()
    })
  }

  handleLastnameChange(event) {
    this.setState({
      lastname: event.target.value.trim()
    })
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value.trim()
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  async handleSignUpSubmit(event) {
    event.preventDefault()

    if (!this.state.username && !this.state.password) return

    this.setState({
      signUpsubmitting: true
    })

    console.log('Registration form', this.state)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        username: this.state.username,
        password: this.state.password
      })
    };
    const res = await fetch('/users/register', requestOptions)
    if (res.ok) {
      // If registration went well, I authenticate the user and move to gallery
      const authOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.state.username, password: this.state.password })
      };
      const res = await fetch('/users/authenticate', authOptions)
      const data = await res.json()
      console.log('Authenticate response sign up', data)
      const cookies = new Cookies()
      cookies.set('token', data.token);

      Router.push('/examples/gallery')
    } else {
      // Error while signing up
      this.setState({
        error: true
      })
    }

  }
  render() {
    return (
      <React.Fragment>
        <p className="font-weight-bold">Don't have an account?</p>
        <Form id="signup" method="post" action="/users/register" onSubmit={this.handleSignUpSubmit}>
          <FormGroup>
            <Label htmlFor="firstName">First name</Label><br />
            <Input name="firstName" style={{ marginBottom: 5 }} type="text" id="firstName" disabled={this.state.signUpsubmitting} className="form-control" value={this.state.firstname} onChange={this.handleFirstnameChange} />

            <Label htmlFor="lastName">Last Name</Label><br />
            <Input name="lastName" style={{ marginBottom: 5 }} type="text" id="lastName" disabled={this.state.signUpsubmitting} className="form-control" value={this.state.lastname} onChange={this.handleLastnameChange} />

            <Label htmlFor="signUpUsername">Username</Label><br />
            <Input invalid={this.state.error} name="username" style={{ marginBottom: 5 }} type="text" id="signUpUsername" disabled={this.state.signUpsubmitting} className="form-control" value={this.state.username} onChange={this.handleUsernameChange} />
            <FormFeedback>Oh noes! that username is already taken</FormFeedback>
            <p>
              <Label htmlFor="signUpPassword">Password</Label><br />
              <Input name="password" type="password" id="signUpPassword" disabled={this.state.signUpsubmitting} className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
            </p>
            <p className="text-right">
              <Button id="signUpsubmitButton" disabled={this.props.signUpsubmitting} outline color="dark" type="submit">
                {this.props.signUpsubmitting === true && <span className="icon icon-spin ion-md-refresh mr-2" />}
                Sign up
            </Button>
            </p>
          </FormGroup>
        </Form>
      </React.Fragment>
    )
  }
}