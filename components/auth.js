import fetch from 'isomorphic-fetch';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { getOrigin } from './async-data';

export const handleAuthSSR = async (ctx) => {
    let token = null;
    let user = null;

    // if request exists we are on the server side
    if (ctx.req) {
        // Getting token from request cookies
        token = ctx.req.cookies.token;
        user = ctx.req.cookies.user;
    }
    else {
        // Request not present, we are on client side
        // Getting token from cookies
        const cookies = new Cookies();
        token = cookies.get('token');
        user = cookies.get('user');
    }

    // Validating token by pinging the server
    try {
        if (token) {
            const response = await fetch(getOrigin(ctx.req) + '/users/current', { headers: { Authorization: `Bearer ${token}` } });
            if(!response.ok) {
                throw new Error('Network response was not ok.');
            }

            return user;
        } else {
            throw new Error('Missing token');
        }
    } catch (err) {
        console.log("Redirecting back to main page:", err.message);
        // Redirect to home page
        if (ctx.res) {
            ctx.res.writeHead(302, { Location: '/'});
            ctx.res.end();
        } else {
            Router.push('/');
        }
    }
}