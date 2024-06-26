import { Fragment } from 'react';
// import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, logout } from '../helpers/auth';
import Nprogeess from 'nprogress';

Router.onRouteChangeStart = url => Nprogeess.start();
Router.onRouteChangeComplete = url => Nprogeess.done();
Router.onRouteChangeError = url => Nprogeess.done();

const Layout = ({ children }) => {
  const head = () => (
    <Fragment>
      <link
        rel='stylesheet'
        href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
        integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk'
        crossOrigin='anonymous' />
    </Fragment>
  );

  const nav = () => (
    <ul className='nav nav-tabs bg-warning'>
      <li className='nav-item'>
        <Link href='/'>
          <a className='nav-link text-dark'>Home</a>
        </Link>
      </li>

      <li className='nav-item'>
        <Link href='/user/link/create'>
          <a
            className='nav-link text-dark btn btn-success'
            style={ { borderRadius: '0px' } }>
            Submit a link
          </a>
        </Link>
      </li>

      { process.browser && !isAuth() && (
        <Fragment>
          <li className='nav-item'>
            <Link href='/login'>
              <a className='nav-link text-dark'>Login</a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/register'>
              <a className='nav-link text-dark'>Register</a>
            </Link>
          </li>
        </Fragment>
      ) }
      
      { process.browser && isAuth() && isAuth().role === 'admin' && (
        <li className='nav-item ml-auto'>
          <Link href='/admin'>
            <a className='nav-link text-dark'>{ isAuth().name }</a>
          </Link>
        </li>
      ) }
      
      { process.browser && isAuth() && isAuth().role === 'subscriber' && (
        <li className='nav-item ml-auto'>
          <Link href='/user'>
            <a className='nav-link text-dark'>{ isAuth().name }</a>
          </Link>
        </li>
      ) }

      { isAuth() && (
        <li className='nav-item'>
          <a
            onClick={ logout }
            className='nav-link text-dark'>
            Logout
          </a>
        </li>
      ) }
    </ul>
  );

  return (
    <Fragment>
      { head() }
      { nav() }
      <div className='container pt-5 pb-5'>{ children }</div>
    </Fragment>
  );
};

export default Layout;