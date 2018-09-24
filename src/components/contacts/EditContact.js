import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import Axios from "axios";

export default class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await Axios.get(
      `http://jsonplaceholder.typicode.com/users/${id}`
    );

    // destructure variables from res.data
    const { name, email, phone } = res.data;

    // SetState to new variables
    this.setState({
      name,
      email,
      phone
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    // Axios.post("http://jsonplaceholder.typicode.com/users", newContact).then(
    //   res => dispatch({ type: "ADD_CONTACT", payload: res.data })
    // );

    //  1. Update the backend

    const UpdateContact = {
      name,
      email,
      phone
    };

    // Retrieve ID from selected params
    const { id } = this.props.match.params;

    const res = await Axios.put(
      `http://jsonplaceholder.typicode.com/users/${id}`,
      UpdateContact
    );

    // 2. Update the front end and redirect to homepage
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>

              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
