
import React, { Component } from 'react';
import { Tab, Button, Header, Grid, Form, Message, Segment } from 'semantic-ui-react'
import AdminSponsorshipForm from '../components/adminforms/sponsorshipform'; 

// this page could be rendered from server, maybe have a secret route plus authentication once rendered
// hide anything related to it from github, try the process.ENV stuff
export default class AdminPage extends Component{

  constructor(){
    super();
    this.state = { 
      formerror: false, formpostsuccess: false, formdisplayErrors: false, formloading: false,
      formsdisp: {
        displayAboutForm: false, displayActivitiesForm: false, displayGroupsForm: false,
        displayHomeForm: false, displayNewsForm: false, displaySponsorshipForm: false, 
        displayYouthForm: false
      },
      homeform:{},
      newsform:{},
      sponsorshipform:{
        // sponsformerr: false, sponspostsuccess: false, sponsdisplayErrors: false
        gender: null, level: null, class: null, attendsschool: false
      },
      activitiesform:{},
      groupsform:{},
      youthform:{},
      aboutform:{}        
    }
    this.panes = [
      { menuItem: 'Home', render: () => <Tab.Pane attached={false}>{this.homeForm()}</Tab.Pane> },
      { menuItem: 'News', render: () => <Tab.Pane attached={false}>{this.newsForm()}</Tab.Pane> },
      { menuItem: 'Sponsorship', render: () => <Tab.Pane attached={false}><AdminSponsorshipForm/></Tab.Pane> },
      { menuItem: 'Groups', render: () => <Tab.Pane attached={false}>{this.groupsForm()}</Tab.Pane> },
      { menuItem: 'Activities', render: () => <Tab.Pane attached={false}>{this.activitiesForm()}</Tab.Pane> },
      { menuItem: 'Youth', render: () => <Tab.Pane attached={false}>{this.youthForm()}</Tab.Pane> },
      { menuItem: 'About', render: () => <Tab.Pane attached={false}>{this.aboutForm()}</Tab.Pane> },
    ]
  }
  
  homeForm = () => {
    return(
      <h1>Home Form</h1>
    );
  }

  newsForm = () => {
    return(
      <h1>News Form</h1>        
    );
  }

  sponsorshipForm = () => {
    
  }

  activitiesForm = () => {
    return(
      <h1>Activities Form</h1>        
    );
  }

  groupsForm = () => {
    return(
      <h1>Groups Form</h1>
      
    );
  }

  youthForm = () => {
    return(
      <h1>Youth Form</h1>        
    );
  }

  aboutForm = () => {
    return(
      <h1>About Form</h1>        
    );
  }

  render(){

    return(
      <div>
          {/* <h1>Admin</h1> */}
          <div style={ { maxWidth: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Header as='h2' color='teal' textAlign='center'>Update Pages</Header>
            <Tab menu={{ pointing: true }} panes={this.panes} />
          </div>
      </div>
    );
  }
}