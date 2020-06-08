// import React, {Component} from 'react'; 
// // import firebase from 'firebase'
// import {FirebaseStorage} from '../utilities/firebase' 
// import ProgressBar from './progressbar';

// export default class FileUpload extends Component {
//   constructor(props){
//     super(props);
//     this.state = { progresspercent: 0, progressSuccess: false, progresserror: false, 
//       label: 'Uploading pic' };
//     // this.storageRef = Firebase.storage().ref();      
//     this.uploadFile(this.props.file, this.props.filepath);
//   }

//   /* in case of errors in file uploads: 
//       check for indefined files or filepaths, invalid file paths
//       ensure that you are signed in to the app
//   */
//   uploadFile = (file, filePath) => {
//     let that = this;
//     // Upload file and metadata to the object 'images/mountains.jpg'
//     let storageRef = FirebaseStorage.ref();
//     let uploadTask = storageRef.child(filePath).put(file);
//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//       function(snapshot) {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         var percentdone = parseFloat((snapshot.bytesTransferred / snapshot.totalBytes).toPrecision(3) * 100);
//         console.log('Upload is ' + percentdone + '% done');
  
//         // set and update the progressbar values
//         that.setState({ progresspercent: snapshot.bytesTransferred });
  
//         switch (snapshot.state) {
//           case firebase.storage.TaskState.PAUSED: // or 'paused'
//             console.log('Upload is paused');
//             break;
//           case firebase.storage.TaskState.RUNNING: // or 'running'
//             console.log('Upload is running');
//             break;
//         }
//       }, function(error) {
  
//       // A full list of error codes is available at
//       // https://firebase.google.com/docs/storage/web/handle-errors
//       switch (error.code) {
//         case 'storage/unauthorized':
//           // User doesn't have permission to access the object
//           break;
  
//         case 'storage/canceled':
//           // User canceled the upload
//           break;
  
//         case 'storage/unknown':
//           // Unknown error occurred, inspect error.serverResponse
//           break;
//       }
//       console.log('Upload Error:' + error.code)
//       that.setState( { progresserror: true });
//     }, function() {
//       // Upload completed successfully, now we can get the download URL
//       let downloadURL = uploadTask.snapshot.downloadURL;
//       console.log('Upload completed successfully');
//       that.setState({progressSuccess: true});
//       //lift state up to the parent in order to use the url
//       that.props.onGetURL(downloadURL);
//     });
//   }

//   // componentDidMount(){
//   //   // reset error and success states of progress bar in case of resubmission
//   //   this.setState({ progresserror: false, progressSuccess: false});
//   // }

//   render(){
//     const { progresspercent, progresserror, progresslabel, progressSuccess } = this.state;
//     return(
//       <div>
//         { <ProgressBar label={progresslabel} percent={progresspercent}
//           success={progressSuccess} error={progresserror}/> }
//       </div>
//     );
//   }
// }
