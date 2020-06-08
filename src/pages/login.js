
import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

// import LoginForm from '../components/loginform';

export default class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state = { loggedIn: false }
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.loginForm = this.loginForm.bind(this);
    }

    changeLoginStatus(status){
        this.setState({ loggedIn: status });
    }

    loginClick(event){
        this.setState( { loggedIn: !this.state.loggedIn } );
        this.test();
    }

    async test(){
        const fetchOptions = {
            method: "GET"
        }
        let result = await fetch('/test', fetchOptions)
        let res = await result.json();
        console.log(res.message);
    }

    loginForm(){
        return(
            <div className='login-form'>
                {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid textAlign='center' style={{ height: '95vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                    {/* <Image src='/logo.png' /> */}
                    {' '}Log-in to your account
                    </Header>
                    <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'/>
                        <Button color='teal' fluid size='large' onClick={this.loginClick}>Login</Button>
                    </Segment>
                    </Form>
                    <Message>
                    New to us? <a href='#'>Sign Up</a>
                    </Message>
                </Grid.Column>
                </Grid>
            </div>
        );
    }

    render(){

        const { loggedIn } = this.state;
        const LoginForm = this.loginForm();

        return(
            <div>
                { !loggedIn && LoginForm }
                { loggedIn && this.props.targetpage }
            </div>
        );
    }
}