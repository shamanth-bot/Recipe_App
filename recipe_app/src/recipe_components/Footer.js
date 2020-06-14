import React, { Fragment } from 'react'

import Logo from '../images/Myrecipe.png'

import {Link} from 'react-router-dom'

 

function Footer(){

 

return(

 

        <footer class="page-footer  #ef5350 red lighten-1">

        <div class="container">

          <div class="row">

          <div class="col s3 m3 l3 ">

 

          <img img src={Logo} alt="HeaderLin"/></div>

          <div class="col s3 m3 l3 ">

 

          <h6 class="white-text">General</h6>

              <ul>

                <li><a class="grey-text text-lighten-3" href="#!">Home</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">SignUp</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">Register</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">Jobs&Careers</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">contactUS</a></li>

    

              </ul>

 

              </div>

 

              <div class="col s3 m3 l3">

            <h6 class="white-text">Social Media</h6>

              <ul>

                <li><a class="grey-text text-lighten-3" href="#!">Facebook</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">Twitter</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">Instagram</a></li>

              </ul>

            </div>

            <div class="col s3 m3 l3">

              <h6 class="white-text">Additional</h6>

              <ul>

                <li><a class="grey-text text-lighten-3" href="#!">Advertising</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">About MyRecipies</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">Help&FAQ</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">Terms&Conditions</a></li>

                <li><a class="grey-text text-lighten-3" href="#!">Inspiring Partners</a></li>

 

              </ul>

            </div>

          </div>

        </div>

        <div class="footer-copyright">

          <div class="container">

              <p> Copyright © MyRecipes.com, 2019 - 2020. All rights reserved.<br/>This website promotes good dining experience. Some food may contain meat, eggs, dairy products or alcohol, please view individual listings for details.</p>

          </div>

        </div>

      </footer>

)

 

}

export default Footer

