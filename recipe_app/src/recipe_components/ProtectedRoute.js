import React from 'react';

import { Route } from 'react-router-dom';

import {Redirect } from 'react-router-dom';

 

const ProtectedRoute = ({ component: Component,user, ...rest }) => {

  return (

    <Route {...rest} render={

      props => {

        if (user) {

          return <Component {...rest} {...props} user={user} />

        } else {

          return <Redirect to={

            {

              pathname: '/Login',

              state: {

                from: props.location

              }

            }

          } />

        }

      }

 

    } />

  )

}

 

export default ProtectedRoute;