import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = e => {
        const {value, name } = e.target

        this.setState({ [name]: value})

        
    }


    handleSubmit = async e => {

        e.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state

        if(password !== confirmPassword){
            alert("passwords dont match")
            return
        }

        try{
            //creates user account with the associated email and password 
            const {user} = await auth.createUserWithEmailAndPassword(email, password)

            //creates the user profile
            await createUserProfileDocument(user, {displayName})

            //empties the form 
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch(error) {
            console.error(error)
        }

    }


    render(){
        const {displayName, email, password, confirmPassword} = this.state
        return(
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit} className="sign-up-form">
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        handleChange={this.handleChange}
                        label="Display Name"
                        required
                    ></FormInput>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    ></FormInput>
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    ></FormInput>
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label="Confirm Password"
                        required
                    ></FormInput>

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp