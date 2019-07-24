/**
 * This is a very simple class that returns data asynchronously.
 *
 * This code runs on both the server and in the browser.
 *
 * You could also put the logic to detect if code is being run on
 * the server or in the browser inside the page template.
 *
 * We use 'isomorphic-fetch' as it runs both server and client side.
 */
import fetch from 'isomorphic-fetch'

export default class {
  static async getData(url) {
    const uri = url || '//jsonplaceholder.typicode.com/posts';
    const res = await fetch(uri)
    const data = await res.json()
    return data
  }
}
