import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class Card extends Component {
    static displayName = Card.name;

    constructor(props) {
        super(props);
        this.state = { card: [], loading: true, created: true };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.populateData();
    }

    handleSave(event) {

        event.preventDefault();
        const data = new FormData(event.target);
        //console.log(this.state.user);
        const token = this.state.user_token;
        data.set('email', this.state.user);

        if (this.state.created) {
            const response = fetch('api/card/create', {
                headers: !token ? {} : {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'POST',
                body: data,
            }).then(() => { alert('create card successfully.'); window.location.reload(false); });
            
        }
        else {
            const response = fetch('api/card/edit', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
                method: 'POST',
                body: data,
            }).then(() => { alert('Update card successfully.'); window.location.reload(false); });
        }
    }

    handleDelete(event) {
        event.preventDefault();
        const email = this.state.user;
        const token = this.state.user_token;
        fetch('api/card/'+ email, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
            method: 'DELETE',
            
        }).then(() => { alert('Delete card successfully.'); window.location.reload(false); });
    }

    renderDelete() {
        if (!this.state.created) {
            return <div className="col-md-2"><button name="delete" onClick={this.handleDelete} className="btn btn-primary">Delete</button></div>
        }
    }

    renderForm(card) {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="email" className="form-control" defaultValue={card.email} />
                    <input type="hidden" name="id" className="form-control" defaultValue={card.id} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={card.name} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12">Status</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="status" defaultValue={card.status} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12">Content</label>
                    <div className="col-md-4">
                        <textarea name="content" rows="4" cols="50" defaultValue={card.content}></textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12">Category</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="category" defaultValue={card.category} />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-1">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                    {this.renderDelete()}
                </div>
            </form>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForm(this.state.card);

        return (
            <div>
                <h1 id="tabelLabel" >Add/Edit Card</h1>
                {contents}
            </div>
        );
    }

    async populateData() {
        const token = await authService.getAccessToken();
        const user = await authService.getUser();
        console.log(user);
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
        
        this.setState({loading:false});
    }
}
