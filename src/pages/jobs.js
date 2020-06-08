
import React, { Component } from 'react';
import FormGroup, { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react' 

import LoadScreen from '../components/loader';
import ProgressBar from '../components/progressbar';
import '../css/userform.css';
import { fetchData, postData } from '../utilities/networkcalls';

// import firebase from 'firebase'
// import Firebase, {FirebaseStorage} from '../utilities/firebase'

export default class JobsPage extends Component{

  constructor(props){
    super(props);
    // this.firebaseInstance = this.props.firebaseInstance;
    // this.storageRef = this.firebaseInstance.storage().ref();
    // this.storageRef = FirebaseStorage.ref();
    // TODO, have substates with common states e.g. for progressbar
    this.state = { 
      isRegistered: null, displayErrors: false, formerror: false, termschecked: false,
      gender: null, marstat:null, bmonth: null,
      selecterror: { gender: false, marstat: false, bmonth: false}, //TODO, select element error highlighting
      errmessage: '' , atfileUpload: false, uploadformerror: false, uploadloading: false,
      formloading: false, postsuccess: false, formsubmitdisabled: false,  //TODO, use this to prevent user from resubmitting the same form if you decide to first show a success message after post
      displayCVProgressBar: false, displayPicProgressBar: false, progresslabel: 'loading', currentprogress: 0, 
      progresstotal: 0, progresserror: false, progressSuccess: false, progresspercent: 0,
      cvFile: null, picFile: null, urlUploaded: false
    }
    
    // TODO, make these arrow functions so that they won't need to be bound
    this.checkIfRegistered = this.checkIfRegistered.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleUploadProceed = this.handleUploadProceed.bind(this);
    this.handleUploadSkip = this.handleUploadSkip.bind(this);
    this.handleCVUpload = this.handleCVUpload.bind(this);
    this.handlePicUpload = this.handlePicUpload.bind(this);
    this.handleCVInput = this.handleCVInput.bind(this);
    this.handlePicInput = this.handlePicInput.bind(this);
    this.registrationForm = this.registrationForm.bind(this);
    this.fileUploadForm = this.fileUploadForm.bind(this);

    this.options = [
      { key: 'm', text: 'Male', value: 'Male' },
      { key: 'f', text: 'Female', value: 'Female' },
    ]

    this.marstat = [
      { key: 's', text: 'Single', value: 'Single'},
      { key: 'm', text: 'Married', value: 'Married'}      
    ]

    this.months = [
      { key: 'jan', text: 'January', value: '01'},
      { key: 'feb', text: 'February', value: '02'},
      { key: 'mar', text: 'March', value: '03'},
      { key: 'apr', text: 'April', value: '04'},
      { key: 'may', text: 'May', value: '05'},      
      { key: 'jun', text: 'June', value: '06'},
      { key: 'jul', text: 'July', value: '07'},
      { key: 'aug', text: 'August', value: '08'},
      { key: 'sep', text: 'September', value: '09'},
      { key: 'oct', text: 'October', value: '10'},
      { key: 'nov', text: 'November', value: '11'},
      { key: 'dec', text: 'December', value: '12'}   
    ]
    this.checkIfRegistered(this.props.email);
  }

  async checkIfRegistered(email){
    // TODO, change this to use the fetchData function 
    if(email != null){
      const route = '/registration/checkregistered?email='+email;
      const fetchOptions = {
        method: "GET"
      }
      let res = await fetch(route, fetchOptions);
      let result = await res.json();
      console.log('User registered: ' + (result.isRegistered).toString());
      this.setState({ isRegistered: result.isRegistered });
      // return result.isRegistered;
    }
    else{
      // TODO, Do some error handling here
      console.log('email is null');
    }
    
  }

  handleChange(event){
    let elem = event.currentTarget;

    // find out why the defined className isn't being registered
    // if(elem.classlist.contains('genderSelect')){
    //   console.log('gender is '+elem.textContent)
    // }
    // if(elem.classList.contains('monthSelect')){
    //   console.log('month is '+elem.textContent)
    // }
    // if(elem.classList.contains('marstatSelect')){
    //   console.log('marstat is '+elem.textContent)
    // }
    // if(elem.classList.contains('termscheck')){
    //   console.log(elem)
    // }

    // hack
    let text = elem.textContent;
    if(text === 'Male' || text === 'Female'){
      this.setState({ gender: text });
    }
    if(text === 'Single' || text === 'Married'){
      this.setState({ marstat: text});
    }
    if(text === 'I agree to the Terms and Conditions'){
      this.setState({ termschecked: !this.state.termschecked });
    }
    else{
      for(let item of this.months){         
        if(text === item.text){
          this.setState({ bmonth: item.value });
        }
      }
    }
  }

  async handleSubmit(event){
    event.preventDefault();

    // what i have used here is a shortcut and not the recommended way to handle forms in react

    //resets form in case there was an error in data post to server and the user resubmits
    this.setState({ displayErrors: false });
    this.setState({ formerror: false });

    if (!event.target.checkValidity()) {
      // form is invalid! so we do nothing
      this.setState( { displayErrors: true} );
      this.setState({ formerror: true });
      this.setState({ errmessage: '* is a required field'})
      return;
    }
    // if(){ //TODO handle errors in the select elements

    // }
    if(!this.state.termschecked){
      this.setState({ formerror: true });      
      this.setState({ errmessage: 'Please accept the Terms and Conditions'});
      return;      
    }

    console.log('form is valid');
    // form is valid! We can parse and submit 
    this.setState({ displayErrors: false });
    this.setState({ formerror: false });    
    this.setState({ formloading: true });
    let form = event.target;
    const data = new FormData(form);
    let fname = data.get('fname').trim();
    let lname = data.get('lname').trim();
    let name = fname+' '+lname;
    let gender = this.state.gender;
    let marstat = this.state.marstat;
    let bdate = data.get('bdate').trim();
    let bmonth = this.state.bmonth;
    let byear = data.get('byear').trim();
    let dob = bdate+'/'+bmonth+'/'+byear;
    let contact = data.get('contact');
    let IDNo = data.get('idno');
    let age = this.getAge(parseInt(byear),parseInt(bmonth),parseInt(bdate));
    // console.log(fname+' '+lname+' '+ gender+' '+marstat+' '+dob+' '+contact+' '+IDNo);
    const userData = {
      name: name,
      age: age,
      marital_status: marstat,
      email: 'testemail',
      contact: contact,
      idNo: IDNo,
      dob: dob
    }
    let response = await postData('/registration/saveuser', userData);
    this.setState({ formloading: false });          
    if(response.saveSuccess){
      this.setState({ isRegistered: true, atfileUpload: true });
    }
    else{
      console.log('sth went wrong')
      this.setState({ formerror: true });          
      this.setState({ errmessage: 'Something went wrong. Please try again'});      
    }
  }

  getAge(y,mth,d) {
    var today = new Date();
    console.log(today)
    var birthDate = new Date(y,mth,d);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  handlePicInput(event){
    this.setState({ picFile: event.currentTarget.files[0]}) 
  }
  handleCVInput(event){
    this.setState({ cvFile: event.currentTarget.files[0]}) 
  }

  handleUploadProceed(event){
    // javascript seems to evaluate sth as true if it has a value, so no need to risk
    if(this.state.urlUploaded === false){
      this.setState({ uploadformerror: true });
    }
    else{
      this.setState({ atfileUpload: false });
    }
  }

  handleUploadSkip(event){
    this.setState({ atfileUpload: false });    
  }

  handleCVUpload(event){
    // reset progressbars in case user resubmits 
    // TODO temporary workaround, should have seperate states for each progressbar 
    this.setState({ displayCVProgressBar: false, displayPicProgressBar: false, progressSuccess: false, progresserror: false, uploadformerror: false });

    //the files picked in the form    //TODO handle situation where user selects inappropriate file type
    let cvFile = this.state.cvFile;   
    if(cvFile === null){
      this.setState({ uploadformerror: true });
      console.log('No file selected');
      return;
    }
    else{
      // Create the file metadata
      // var metadata = {
      //   contentType: 'image/jpeg'
      // };
      let fixedName= this.props.email.split('@')[0];      
      let filePath = 'CVs/'+fixedName+'_'+cvFile.name;
      this.uploadFile(cvFile, filePath, 'Uploading CV ...', 'CV');

      // was unable to make upload synchronous
      // let result = this.uploadFile(cvFile, filePath, 'Uploading CV ...', 'CV');      
      // if(result !== null){
      //   if(result === 'UploadError'){
      //     console.log('error in upload');
      //     return;
      //   }
      //   else{
      //     // TODO, first post url then disable this section of form or just leave it in case user wants to upload a different file
      //     cvURL = result;
      //     console.log(cvURL);        
      //   }
      // }
    }
  }

  async handlePicUpload(event){
    // reset progressbar in case user resubmits form
    this.setState({ displayCVProgressBar: false, displayPicProgressBar: false, progressSuccess: false, progresserror: false, uploadformerror: false });
    //the file picked   //TODO handle situation where user selects inappropriate file type  
    let picFile = this.state.picFile;  
    if(picFile === null){
      this.setState({ uploadformerror: true });
      console.log('No file selected');
      return;
    }  
    else{
      let fixedName = this.props.email.split('@')[0];    
      let filePath = 'profilepics/'+fixedName+picFile.name;    
      // this.uploadFile(picFile, filePath, 'Uploading Profile Picture ...', 'pic');
    }   
  }

  // async uploadFile(file, filePath, label, whichupload){
  //   let that = this;

  //   // display and set the label of the progress bar
  //   if(whichupload === 'CV'){
  //     this.setState({ displayCVProgressBar: true });
  //   }
  //   if(whichupload === 'pic'){
  //     this.setState({ displayPicProgressBar: true });      
  //   }
  //   this.setState({ progresslabel: label });

  //   // Upload file and metadata to the object 'images/mountains.jpg'
  //   let uploadTask = this.storageRef.child(filePath).put(file);

  //   // Listen for state changes, errors, and completion of the upload.
  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //     await function(snapshot) {
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       var percentdone = parseFloat((snapshot.bytesTransferred / snapshot.totalBytes).toPrecision(3) * 100);
  //       console.log('Upload is ' + percentdone + '% done');

  //       // set and update the progressbar values
  //       // that.setState({ currentprogress: snapshot.bytesTransferred, progresstotal: snapshot.totalBytes });

  //       switch (snapshot.state) {
  //         case firebase.storage.TaskState.PAUSED: // or 'paused'
  //           console.log('Upload is paused');
  //           break;
  //         case firebase.storage.TaskState.RUNNING: // or 'running'
  //           console.log('Upload is running');
  //           that.setState({ progresspercent: percentdone });            
  //           break;
  //       }
  //     }, function(error) {

  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     switch (error.code) {
  //       case 'storage/unauthorized':
  //         // User doesn't have permission to access the object
  //         break;

  //       case 'storage/canceled':
  //         // User canceled the upload
  //         break;

  //       case 'storage/unknown':
  //         // Unknown error occurred, inspect error.serverResponse
  //         break;
  //     }
  //     that.setState({ progresserror: true });
  //     // return 'UploadError';
  //   }, async function() {
  //     // Upload completed successfully, now we can get the download URL
  //     let downloadURL = uploadTask.snapshot.downloadURL;
  //     that.setState({ uploadloading: true });
  //     // setTimeout(function(){
  //     //   if(whichupload === 'CV'){
  //     //     that.setState({ displayCVProgressBar: false });
  //     //   }
  //     //   if(whichupload === 'pic'){
  //     //     that.setState({ displayPicProgressBar: false });      
  //     //   }
  //     // }, 2000);
  //     let svres;
  //     if(whichupload === 'CV'){
  //       svres = await postData('/registration/saveuploadurl', { email: that.props.email, cvURL: downloadURL })
  //     }
  //     if(whichupload === 'pic'){
  //       svres = await postData('/registration/saveuploadurl', { email: that.props.email, picURL: downloadURL })      
  //     }

  //     let message = svres.message;
  //     if(message != null && message === 'Success'){
  //       console.log('here 1 '+ message);
  //       that.setState({ urlUploaded: true });
  //       that.setState({ uploadloading: false });      
  //       that.setState({ progressSuccess: true });
  //     }
  //     else{
  //       console.log('here 2 '+message); 
  //       that.setState({ uploadloading: false });                     
  //       that.setState({ progresserror: true });        
  //     }
      
  //     // console.log('upload completed');
  //     // return downloadURL;
  //   });
  // }

  // later, could try a semantic tab for the two forms
  registrationForm(){
    const { displayErrors, formerror, selecterror, checked,
           errmessage, postsuccess, formloading, formsubmitdisabled } = this.state;
    return(
      <div className='login-form' style={ { marginTop: '5%', height: '95vh', marginBottom: '10%'} }>
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
        <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '75%' }}>
            <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo.png' /> */}
            {' '}Please fill in your details
            </Header>
            <Form success={postsuccess} error={formerror} loading={formloading} size='big' onSubmit={this.handleSubmit} noValidate className={displayErrors ? 'displayErrors' : ''}>
              <Segment>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='First name' placeholder='First name' name='fname' required/>
                  <Form.Input fluid label='Last name' placeholder='Last name' name='lname' required/>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Select  onChange={this.handleChange} label='Gender' options={this.options} placeholder='Gender' name='gender' className={'genderSelect'} error={selecterror.gender} required/>
                  <Form.Select className={'marstatSelect'} onChange={this.handleChange} label='Marital Status' options={this.marstat} placeholder='Marital Status' name='marstat' error={selecterror.marstat} required/>
                </Form.Group>
                <Form.Group inline widths='equal'>
                  <label>Date of Birth</label>
                  {/* could use react datepicker library to improve UX */}
                  <Form.Input fluid label='Date' placeholder='Date' name='bdate' type='text' pattern="\d+" required/>
                  <Form.Select className='monthSelect' onChange={this.handleChange} fluid label='Month'options={this.months} placeholder='Month' name='bmonth' error={selecterror.bmonth} required/>
                  <Form.Input fluid label='Year' placeholder='Year' name='byear' type='text' pattern="\d{4}" required/>          
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='Phone No.' placeholder='Phone No.' name='contact'type='text' pattern="\d+" required/>
                  <Form.Input label='ID No.' placeholder='ID No.' name='idno' type='text' pattern="\d+" required/>
                </Form.Group>
                <Form.Checkbox className={'termscheck'} label='I agree to the Terms and Conditions' name='termscheck' onChange={this.handleChange} required/>
                <Button disabled={formsubmitdisabled} color='teal' fluid size='large'>Submit</Button>               
                <Message
                  error
                  header='Could you check something!'
                  content={errmessage}
                  // list={[
                  //   'That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.',
                  // ]}
                />
                {/* <Message
                  success
                  header='Success'
                  content="Form Completed"
                />
                <Button color='teal' size='large'>Proceed</Button> */}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
  
  fileUploadForm(){
    const { displayErrors, uploadformerror, errmessage, uploadloading, displayCVProgressBar, 
      displayPicProgressBar, progresslabel, progresserror, progressSuccess, progresspercent } = this.state;     
    return(
      <div className='login-form' style={ { marginTop: '5%', height: '95vh', marginBottom: '10%'} }>
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
        <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '55%' }}>
            <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo.png' /> */}
            {' '}Upload your CV and Profile Picture (Optional)
            </Header>
            <Form error={uploadformerror} size='big' loading={uploadloading} noValidate className={displayErrors ? 'displayErrors' : ''}>
              <Segment>
              <Header as='h4' color='teal' textAlign='center'>
                {' '}Upload will boost chances of placement.{<br/>}You can still upload them later in your Personal Profile
              </Header>
                <Form.Group inline style={{ marginTop: '5%'}}>
                  <Form.Input label='Upload CV' onChange={this.handleCVInput}
                    type='file' name='cvInput' width={10}/>
                  <Button color='teal' size='small' onClick={this.handleCVUpload}>Upload</Button>
                </Form.Group>
                { displayCVProgressBar && <ProgressBar  width={5} label={progresslabel} percent={progresspercent}
                  success={progressSuccess} error={progresserror}/> }
                <Form.Group inline style={{ marginTop: '10%'}}>
                  <Form.Input label='Upload profile picture' onChange={this.handlePicInput}
                    type='file' name='picInput' width={10}/>
                  <Button color='teal' size='small'onClick={this.handlePicUpload}>Upload</Button>                
                </Form.Group>   
                { displayPicProgressBar && <ProgressBar label={progresslabel} percent={progresspercent}
                  success={progressSuccess} error={progresserror}/> }           
                <Form.Group inline style={{ marginTop: '10%'}}>
                  <Button color='teal' fluid size='large' onClick={this.handleUploadSkip}>Skip Step</Button>
                  <Button color='teal' fluid size='large' onClick={this.handleUploadProceed}>Proceed</Button>
                </Form.Group>               
                <Message
                  error
                  header='Error!'
                  content='Please select a file before proceeding. Otherwise press skip'
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>

    );
  }

  render(){
    const { isRegistered, atfileUpload } = this.state;

    if(isRegistered === null){
      return(
        <div style={ { height: '95vh' } }>
          <LoadScreen/>
        </div>
      );
    }
    else if(isRegistered === false){
      let RegistrationForm = this.registrationForm();
      return(
        <div>{RegistrationForm}</div>
      );
    }
    else if(isRegistered === true){
      let FileUploadForm = this.fileUploadForm();
      return(
        <div>
          {atfileUpload && FileUploadForm}
          {!atfileUpload && <div><h1>More Jobs Content here></h1><br/><br/>
            {/* <a onClick={() => Firebase.auth().signOut()}>Sign-out from jobs</a> */}
            </div>}
        </div>
      )
    }
  }
}