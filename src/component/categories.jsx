import React from 'react';
import {
	Tree,
}
from 'antd';
import './categories.less';
import _ from "underscore";
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { selectCategry, fetchTextsIfNeeded, invalidateTexts } from '../actions/getTextsByCategry';

const TreeNode = Tree.TreeNode;

function setLeaf(treeData, curKey, level) {
	const loopLeaf = (data, lev) => {
		const l = lev - 1;
		data.forEach((item) => {
			if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
				curKey.indexOf(item.key) !== 0) {
				return;
			}
			if (item.children) {
				loopLeaf(item.children, l);
			} else if (l < 1) {
				item.isLeaf = true;
			}
		});
	};
	loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
	const loop = (data) => {
		if (level < 1 || curKey.length - 3 > level * 2) return;
		data.forEach((item) => {
			if (curKey.indexOf(item.key) === 0) {
				if (item.children) {
					loop(item.children);
				} else {
					item.children = child;
				}
			}
		});
	};
	loop(treeData);
	setLeaf(treeData, curKey, level);
}

export default class categories extends React.Component {
	static propTypes = {
		dispatch: React.PropTypes.func.isRequired,
		selectedCategry: React.PropTypes.string.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			treeData: [{
				name: "法律",
				key: 0,
				isLeaf: false
			}],
			url: this.props.url,
			selected: ["-1"],
			expanded: ["-1"]
		};
	}
	componentDidMount() {
		fetch(`${this.state.url}/categories`)
			.then(res => res.json())
			.then(res => {
				let treeNodes = _.map(res, (val) => {
					return {
						name: val.name,
						key: val.id,
						isLeaf: true
					}
				});
				const treeData = [...this.state.treeData];
				getNewTreeData(treeData, "0", treeNodes, 2);
				this.setState({
					treeData
				});
			}).catch((error) => {
				console.error(error);
			});
	}

	onSelect(info) {
		if (info.length) {
			this.props.dispatch(selectCategry(info[0]));
			this.setState({
				selected: info,
				expanded: info
			});
		}
	}
	render() {
		const loop = data => data.map((item) => {
			if (item.children) {
				return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
			}
			return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />;
		});
		const treeNodes = loop(this.state.treeData);
		return (
			<Tree selectedKeys={this.state.selected} onSelect={this.onSelect.bind(this)} >
       		 {treeNodes}
      		</Tree>
		);
	}
}

function mapStateToProps(state) {
  const { selectedCategry,  } = state;

  return {
    selectedCategry,
  }
}

export default connect(mapStateToProps)(categories);
