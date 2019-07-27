import React from 'react'
import Layout from './layout'

export default class extends React.Component {

  static async getInitialProps({req}) {
    return {
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