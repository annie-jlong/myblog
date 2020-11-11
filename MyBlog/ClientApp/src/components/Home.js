import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

   constructor(props) {
        super(props);
        this.state = { card: [], loading: true, created: true }; 
   }

    componentDidMount() {
        this.populateData();
    }

    renderButton() {
        if (!this.state.created) {
            return <div style={{ float: 'right'}}><Link to="/card">Edit</Link></div>
        }
        else {
            return <div style={{ float: 'right'}}><Link to="/card">Create</Link></div>
        }
    }

    render () {
        return (
          <div>
                <h1>My Blog</h1>
                {this.renderButton()}
                <p>{this.state.card.name}</p>
                <p>{this.state.card.content}</p>
          </div>
        );
      }

    async populateData() {
        const token = await authService.getAccessToken();
        const user = await authService.getUser();
        //console.log(user);

        if (user != null) {
            this.setState({ user: user.name, user_token: token });
            const response = await fetch('api/card/' + user.name, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            if (response.status === 200) {
                const data = await response.json();
                this.setState({ card: data, created: false });
            }
        }
        
        this.setState({ loading: false });
    }
}
