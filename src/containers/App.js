import React, { Component, PropTypes } from 'react';
import '../common/lib';
import Categories from '../component/categories';
import Texts from '../component/texts';

const url = "http://0.0.0.0:8360";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
		return (
  				<div style={{display:"flex",flex:4}}>
            <div style ={{flex:1,background:"#FFFFFF"}}>
              <Categories url={url}/>
  					</div>
			  		<div style ={{flex:3,paddingLeft:5,paddingRight:5,paddingTop:5,paddingBottom:5,}}>
				 	  	<Texts url={url} />
			  		</div>
				  </div>
			);
		}
}
