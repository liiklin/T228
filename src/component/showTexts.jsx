import React from 'react';
import _ from "underscore";
import classNames from 'classnames';
import Lists from "./lists";

export default class showTexts extends React.Component{
  static propTypes = {
    posts: React.PropTypes.array.isRequired,
    url:React.PropTypes.string.isRequired,
  };
	constructor(props) {
		super(props);
    console.log(props);
	}
	render(){
		return (
			<div>
          {this.props.posts.map((post, i) =>
            <li key={i}>{post.level.name}</li>
          )}
			</div>
		);
	}
}
