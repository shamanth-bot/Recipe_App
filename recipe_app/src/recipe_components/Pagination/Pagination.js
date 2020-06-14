import React from 'react'

import {Helmet} from "react-helmet";

 

const Pagination=(props)=>{

    var final_count= props.pages;

 

    const pageLinks=[]

    var left_disabled= (props.currentPage===props.pages)?"disabled":"waves-effect";

    var right_disabled=(props.currentPage===1)?"disabled":"waves-effect"

 

    for (let i = 1; i <= final_count; i++) {

        let active=props.currentPage==i?'active':''

        pageLinks.push(<li className={`waves-effect ${active}`} key={i} onClick={()=>props.nextPage(i)}><a>

        {i}</a></li>);

    }

 

   return(

       <>

    <Helmet>

    <meta charSet="utf-8" />

    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js" rel="stylesheet"/>

 

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

</Helmet>

 

    <ul className="pagination">

    <li class={right_disabled} onClick={()=>(right_disabled!=="disabled") ? props.nextPage(props.currentPage-1): null}><a><i class="material-icons">chevron_left</i></a></li>{pageLinks}

    <li class={left_disabled} onClick={()=>(left_disabled!=="disabled") ? props.nextPage(props.currentPage+1) : null}><a><i class="material-icons">chevron_right</i></a></li>

  </ul>

  </>

   )

 

}

 

export default Pagination;

