import React from 'react'
import Layout from './layout'
import Cookies from 'universal-cookie'

export default class extends React.Component {

  static async getInitialProps({req}) {
    let username = null
    if(req) {
      username = req.cookies.user
    } else {
      const cookies = new Cookies()
      username = cookies.get('user')
    }
    return {
      session: {user: username},
      lang: 'en' // Add a lang property to all pages for accessibility
    }
  }

  adminAccessOnly() {
    return (
      <Layout {...this.props} navmenu={false}>
        <div className="text-center pt-5 pb-5">
          <h1 className="display-4 mb-5">Access Denied</h1>
          <p className="lead">You must be signed in as an administrator to access this page.</p>
        </div>
      </Layout>
    )
  }

}