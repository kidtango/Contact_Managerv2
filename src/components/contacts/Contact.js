import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../Context";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Contact extends Component {
  state = { showContactInfo: false };

  // onDeleteClick = (id, dispatch) => {
  //   axios
  //     .delete(`http://jsonplaceholder.typicode.com/users/${id}`)
  //     .then(res => dispatch({ type: "DELETE_CONTACT", payload: id }));
  // };

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`http://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  onShowClick = e => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  render() {
    const { name, email, phone, id } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                <i className="fas fa-pencil-alt" style={{cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem'}}></i>
                </Link>
              </h4>
              {showContactInfo ? this.renderDetail(email, phone) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }

  renderDetail(email, phone) {
    return (
      <ul className="list-group">
        <li className="list-group-item">Email: {email}</li>
        <li className="list-group-item">Phone: {phone}</li>
      </ul>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isrequired
};
