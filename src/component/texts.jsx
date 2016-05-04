import React from 'react';
import {
	Icon, Form, Input, Row, Col, Button,
}
from 'antd';

import _ from "underscore";
import fetch from 'isomorphic-fetch';
import classNames from 'classnames';
import Lists from "./lists";
import ShowTexts from "./showTexts";
import './texts.less';
import { connect } from 'react-redux';
import { selectCategry, fetchTextsIfNeeded, invalidateTexts } from '../actions/getTextsByCategry';

const InputGroup = Input.Group;

class texts extends React.Component {
	static propTypes = {
		posts: React.PropTypes.array.isRequired,
		isFetching: React.PropTypes.bool.isRequired,
		lastUpdated: React.PropTypes.number,
		dispatch: React.PropTypes.func.isRequired,
		selectedCategry: React.PropTypes.string.isRequired,
	};
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			loading: false,
			iconLoading: false,
			value: '交通安全',
			focus: false,
			url: this.props.url,
			datas: this.props.posts,
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedCategry !== this.props.selectedCategry) {
			const { dispatch, selectedCategry } = nextProps;
			dispatch(fetchTextsIfNeeded(selectedCategry));
		}
	}
	handleInputChange(e) {
		this.setState({
			value: e.target.value,
		});
	}
	handleFocusBlur(e) {
		this.setState({
			focus: e.target === document.activeElement,
		});
	}
	handleSearch() {
		let words = this.state.value;
		if (words) {
			this.props.dispatch(selectCategry('-1'));
			fetch(`${this.state.url}/texts?word=${words}`)
				.then(res => res.json())
				.then(res => {
					this.setState({
						datas: new Array()
					});
					this.setState({
						datas: res
					});
				}).catch((error) => {
					console.error(error);
				});
		}
	}
	render() {
		const btnCls = classNames({
			'ant-search-btn': true,
			'ant-search-btn-noempty': !!this.state.value.trim(),
		});
		const searchCls = classNames({
			'ant-search-input': true,
			'ant-search-input-focus': this.state.focus,
		});
		const { selectedCategry, posts, isFetching, lastUpdated } = this.props;
		const isEmpty = posts.length === 0;
		return (
			<div>
				<Row>
					<Col span="1"></Col>
					<Col span="22">
				      <InputGroup className={searchCls} style={this.props.style}>
				        <Input {...this.props} value={this.state.value} onChange={this.handleInputChange.bind(this)}
				          onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
				        <div className="ant-input-group-wrap">
				          <Button className={btnCls} size={this.props.size} onClick={this.handleSearch.bind(this)}>
				            <Icon type="search" />
				          </Button>
				        </div>
				      </InputGroup>
					</Col>
				</Row>
				<Row>
				<Col span="1"></Col>
				<Col span="22">
					<Row>
				{
					isEmpty
					?
					<div>
						<ShowTexts url={this.state.url} posts={this.state.datas}/>
					</div>

					:
					<div>
						<ShowTexts url={this.state.url} posts={posts}/>
					</div>
				}
				</Row>
				</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
  const { selectedCategry, textsByCategry } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = textsByCategry[selectedCategry] || {
    isFetching: true,
    items: []
  }

  return {
    selectedCategry,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(texts);
