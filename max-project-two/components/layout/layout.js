import { Fragment } from 'react';
import MainHeader from './main-headr';

const Layout = props => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout