import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import * as actions from "../../actions/categoryActions";

const DrawerTree = ({ node, path, openPath, onClick, level, ...props }) => {
  let children = null;
  if (node.children) {
    children = node.children.map(child => (
      <DrawerTree
        node={child}
        key={child.id}
        onClick={onClick}
        path={[...path, child.id]}
        openPath={openPath}
        level={level + 1}
        {...props}
      />
    ));
  }
  const childrenState = openPath.indexOf(node.id) === -1 ? false : true;
  return (
    <React.Fragment>
      <MenuItem
        selected={path[path.length - 1] === openPath[openPath.length - 1]}
        style={{ paddingLeft: (level + 1) * 10 + "px" }}
        onClick={() => onClick(node.id, path)}
      >
        <ListItemText primary={node.name} />
      </MenuItem>
      <li>
        <Divider />
      </li>
      <Collapse in={childrenState} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </React.Fragment>
  );
};

class CategoryDrawer extends Component {
  state = {
    openPath: []
  };

  togglePath = async (id, path) => {
    let newPath = path;
    if (id !== this.state.openPath[this.state.openPath.length - 1]) {
      await this.setState({ openPath: newPath });
    } else {
      newPath.splice(-1, 1);
      await this.setState({ openPath: newPath });
    }
    this.props.onClick(
      this.state.openPath[this.state.openPath.length - 1] || null
    );
  };

  render() {
    return (
      <Paper style={{ marginTop: "0.2rem" }}>
        <MenuList component="nav" style={{ padding: 0 }}>
          {this.props.tree
            ? this.props.tree.map(tree => (
                <DrawerTree
                  node={tree}
                  onClick={this.togglePath}
                  key={tree.id}
                  path={[tree.id]}
                  openPath={this.state.openPath}
                  level={0}
                />
              ))
            : ""}
        </MenuList>
      </Paper>
    );
  }
}

CategoryDrawer.propTypes = {
  tree: PropTypes.array
};

const mapStateToProps = state => {
  return {
    categoryTree: state.category.categoryTree
  };
};

export default connect(
  mapStateToProps,
  actions
)(CategoryDrawer);
