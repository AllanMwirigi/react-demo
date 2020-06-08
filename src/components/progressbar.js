
import React from 'react'
import { Progress } from 'semantic-ui-react'

const ProgressBar = (props) => (
    <div>
        { !props.success && !props.error && <Progress label={props.label} active percent={props.percent} progress/> }
        { !props.success && props.error && <Progress label= 'There was an error. Please try again' percent={props.percent} error/> }
        { !props.error && props.success && <Progress label='Upload successful!' percent={100} success/> }         
    </div>
)

export default ProgressBar

// export default class ProgressBar extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = { label: this.props.label, success: this.props.success, error: this.props.error,
//                         currentvalue: this.props.currentvalue, total: this.props.total }
//         // console.log(this.props.currentvalue)
//     }

//     render(){
//         const { label,currentvalue, total, success, error } = this.state;
//         return(
//             <div>
//                 {console.log(this.props.currentvalue)}
//                 <div>
//                     { !success && !error &&
//                      <Progress label={label} active percent={this.props.percent}/> 
//                     }
//                 </div>
//                 <div>
//                     { !success && error && <Progress label= 'There was an error. Please try again'/>  }
//                 </div>
//                 <div>
//                     { !error && success && <Progress label='Upload successful!' percent={100} success/> } 
//                 </div>
//             </div>
//         );
//     }
// }