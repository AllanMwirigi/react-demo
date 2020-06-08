
import React, { Component } from 'react';
import { Tab, Button, Header, Grid, Form, Message, Segment } from 'semantic-ui-react'
import '../../css/userform.css'
import { fetchData, postData } from '../../utilities/networkcalls';
import FileUpload from '../firebasefileupload'

export default class AdminSponsorshipForm extends Component{
  constructor(){
    super();
    this.state = { 
      formerror: false, formpostsuccess: false, formdisplayErrors: false, formloading: false,      
      gender: null, level: null, class: null, attendsschool: false, errmessage: null,
      picFile: null, filepath: null, picURL: null, // TODO, Use the default pic url here
      upload: false
    }
    this.filePath = null;
    this.selectOptions = {
      gender: [{ key: 'm', text: 'Male', value: 'Male' }, { key: 'f', text: 'Female', value: 'Female' } ],
      schoollevel : [ { text: 'Primary', value: 'Primary'}, { text: 'Secondary', value: 'Secondary'} ],
      class: [ { text: 'Class 1', value: 'Class 1'}, { text: 'Class 2', value: 'Class 2'}, { text: 'Class 3', value: 'Class 3'},{ text: 'Class 4', value: 'Class 4'},{ text: 'Class 5', value: 'Class 5'},{ text: 'Class 6', value: 'Class 6'},{ text: 'Class 7', value: 'Class 7'},{ text: 'Class 8', value: 'Class 8'},  
                { text: 'Form 1', value: 'Form 1'}, { text: 'Form 2', value: 'Form 2'},{ text: 'Form 3', value: 'Form 3'}, { text: 'Form 4', value: 'Form 4'}]
    }
    this.panes = [
      { menuItem: 'New Entry', render: () => <Tab.Pane attached>{this.entryForm()}</Tab.Pane> },
      { menuItem: 'Update Existing', render: () => <Tab.Pane attached>{this.updateForm()}</Tab.Pane> },
      { menuItem: 'Delete Entry', render: () => <Tab.Pane attached>{this.deleteForm()}</Tab.Pane> }
    ]
  }

  selectGender = (event) => {
    let text = event.currentTarget.textContent;
    this.setState({ gender: text });
  }
  selectLevel = (event) => {
    let text = event.currentTarget.textContent;
    this.setState({ level: text });
  }
  selectClass = (event) => {
    let text = event.currentTarget.textContent;
    this.setState({  class: text });
  }
  handleRadio = (event) => {
    this.setState({attendsschool : !this.state.attendsschool });
  }

  getPicURL = (url) => {
    this.setState({picURL: url});
    console.log(this.state.picURL);
  }

  handlePicInput = (event) => {
    this.setState({ picFile: event.currentTarget.files[0], picURL: null, upload: false }) 
  }

  uploadClick = (event) => {
    if(event.currentTarget.textContent === 'Upload'){
      if(this.state.picURL === null){      //this ensures that upload only occurs when input selection changes
        if(this.state.picFile === null){
          // if (!window.confirm("Make an entry without a profile picture ?")) {
          //   return;
          // }
          alert('No file selected');
          return;
        }  
        // TODO, find a way to uniquely name each pic since no email here, currently using current time                
        this.filePath = 'needykidpics/'+Date.now().toString()+'_'+this.state.picFile.name;    
        // this.setState({filepath: filePath});
        this.setState({upload : true });
        console.log('new url')
      }
      else
        alert('Already uploaded. Select new file');
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let form = event.target;
    //resets form in case there was an error in data post to server and the user resubmits
    this.setState({ displayErrors: false });
    this.setState({ formerror: false });

    if (!form.checkValidity()) {
      // form is invalid! 
      this.setState( { formdisplayErrors: true} );
      this.setState({ formerror: true });    
      console.log('form is invalid');
      return;
    }
    console.log('form is valid');
    // form is valid! We can parse and submit 
    this.setState({ displayErrors: false });
    this.setState({ formerror: false });       
    this.setState({ formloading: true });

    const data = new FormData(form);
    let fname = data.get('fname').trim();
    let mname = data.get('mname').trim();    
    let lname = data.get('lname').trim();
    let name = fname+' '+ mname+' ' + lname;
    let bdate = data.get('bdate').trim();
    let bmonth = data.get('bmonth').trim();    
    let byear = data.get('byear').trim();
    let age = this.getAge(parseInt(byear),parseInt(bmonth),parseInt(bdate));
    let dob = bdate+'/'+bmonth+'/'+byear;
    let contact = data.get('contact').trim();    
    let email = data.get('email').trim();
    let gender = this.state.gender;
    let attendsschool = this.state.attendsschool;
    let description = data.get('description').trim();
    const ndata = {
      name: name,
      age: age,
      contact: contact,
      email: email,
      gender: gender,
      dob: dob,
      attendsschool: attendsschool,
      level: '',
      school: '',
      class: '',
      description: description,
      picURL: this.state.picURL,
      key: ''
    }    
    if(attendsschool){
      let school = data.get('school').trim();
      let level = this.state.level;
      let cclass = this.state.class;
      if(level === null || cclass === null){
        this.setState({ formerror: true });        
        return;
      }
      ndata.level = level;
      ndata.school = school;
      ndata.class = cclass;
    }
    console.log(name+' '+ age+' '+contact+' '+email+' ' +dob+' '+ndata.school+' '+ndata.level+' '+ndata.class+' '+description);
    let response = await postData('/update/saveneedystudent', ndata);
    this.setState({ formloading: false });          
    if(response.success){
      alert('Details saved successfully');
      form.reset();
    }
    else{
      console.log('sth went wrong')
      this.setState({ formerror: true });          
      this.setState({ errmessage: 'Server Error'});      
    }
  }

  getAge(y,mth,d) {
    var today = new Date();
    var birthDate = new Date(y,mth,d);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  entryForm = () => {
    const { formloading, formpostsuccess, formdisplayErrors, formerror, displayProgress,
            errmessage, attendsschool, picFile, filepath, upload } = this.state;
      
    return(
      <div className='sform' style={ { margin: '5%' }}>
      {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
      */}
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.sform {
          height: 100%;
      }
      `}</style>
      <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Form onSubmit={this.handleSubmit} error={formerror} success={formpostsuccess} loading={formloading} size='big' noValidate className={formdisplayErrors ? 'displayErrors' : ''}>
          <Segment>
            <Form.Group inline >
              <Form.Input label='Upload profile picture' onChange={this.handlePicInput}
                type='file' name='picInput' width={10}/>
              <Button color='teal' size='small' type='button' onClick={this.uploadClick}>Upload</Button>                               
            </Form.Group>  
            { upload && <FileUpload file={picFile} filepath={this.filePath} onGetURL={this.getPicURL}/> }
            <Form.Group widths='equal' style={{ marginTop: '4%'}}>
              <Form.Input fluid label='First name' placeholder='First name' name='fname' required/>
              <Form.Input fluid label='Middle name' placeholder='Middle name' name='mname' required/>              
              <Form.Input fluid label='Last name' placeholder='Last name' name='lname' required/>
            </Form.Group>
            <Form.Group inline widths='equal'>
              <label>Date of Birth</label>
              {/* could use react datepicker library to improve UX */}
              <Form.Input fluid label='Date' placeholder='e.g. 12' name='bdate' type='text' pattern="\d{2}" required/>
              <Form.Input fluid label='Month' placeholder='e.g. 03' name='bmonth' pattern="\d{2}" required/>
              <Form.Input fluid label='Year' placeholder='e.g. 1998' name='byear' type='text' pattern="\d{4}" required/>          
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Gender' placeholder='e.g. Male' name='gender' options={this.selectOptions.gender} onChange={this.selectGender} required/>                              
              <Form.Input label='Contact' placeholder='Personal/Parent/Guardian Phone No.' name='contact'type='text' pattern="\d+" required/>
              <Form.Input label='Email' placeholder='Email' name='email' type='email'/>
            </Form.Group>
            <Form.Group inline required>
              <label>Attends School</label>
              <Form.Radio label='Yes' value='yes' checked={attendsschool} onChange={this.handleRadio} />
              <Form.Radio label='No' value='no' checked={!attendsschool} onChange={this.handleRadio} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select label='Level' name='level' options={this.selectOptions.schoollevel} onChange={this.selectLevel} disabled={attendsschool ? false : true} required/>              
              <Form.Input label='Current School' placeholder='School' name='school' type='text' disabled={attendsschool ? false : true} required/>
              <Form.Select label='Class/Form' placeholder='Class/Form' options={this.selectOptions.class} onChange={this.selectClass} disabled={attendsschool ? false : true} required/>
            </Form.Group>
            <Form.TextArea rows={3} placeholder='Short Description of child and their life situation' label='Description' autoHeight name='description'/>
            <Button color='teal' size='large'>Submit</Button>               
            <Message
              error
              header={errmessage !== 'Server Error' ? 'Check on one or more of the following where red is indicated!' : 'Something went wrong. Please try again'}
              list={errmessage !== 'Server Error' ? [
                '* is a required field',
                'Provide a full year e.g. 1998', 'Month should be a number',
                'Day and Month should be double digits e.g. 02, 12'
              ] : []}
            />
          </Segment>
        </Form>
      </Grid.Column>
      </Grid>
      </div>
    );
  }

  uploadPicForm = () => {

  }

  updateForm = () => {
    return(<h1>Update entry</h1>);
  }

  deleteForm = () => {
    return(<h1>Delete entry</h1>);
  }

  render(){
    return(
      <div>
          <div style={ {  marginLeft: 'auto', marginRight: 'auto'}}>
            <Tab menu={{ color: 'teal', pointing: true }} panes={this.panes} />
          </div>
      </div>
    );
  }
}