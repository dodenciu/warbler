import React, { Component } from "react";

class Authform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signup ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
        .then(() => {
           this.props.history.push("/");
        }).catch(() => {
            return;
        })
    };
    
    render() {
        // eslint-disable-next-line
        const { email, username, password, profileImageUrl } = this.state;
        const { heading, buttonText, signup, errors, removeError, history } = this.props;
        
        history.listen(() => {
            removeError();
        });
        
        return (
            <div>    
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && 
                                <div className="alert alert-danger">
                                    {errors.message}
                                </div>
                            }
                            <label htmlFor="email">Email:</label>
                            <input 
                                id="email" 
                                name="email"
                                value={email}
                                type="text"
                                className="form-control" 
                                onChange={this.handleChange} 
                            />
                            <label htmlFor="password">Password:</label>
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                className="form-control" 
                                onChange={this.handleChange} 
                            />
                            {signup && (
                                <div>
                                    <label htmlFor="username">Username:</label>
                                    <input 
                                        id="username" 
                                        name="username"
                                        value={username}
                                        type="text"
                                        className="form-control" 
                                        onChange={this.handleChange} 
                                    />
                                    <label htmlFor="image-url">Image:</label>
                                    <input 
                                        id="image-url" 
                                        name="profileImageUrl"
                                        value={profileImageUrl}
                                        className="form-control" 
                                        onChange={this.handleChange} 
                                    />
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                    {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>  
        );
    }
}

export default Authform;