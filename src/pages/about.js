import React from 'react';

// TODO, if errors arise in future, restore the package.json lock files which were changed in Eric's first commit

export default class AboutPage extends React.Component{
    constructor(){
        super();
        this.state = {
            aboutContent:[],
            aboutUpdates:""
        };
    }
    onInputChange = e =>{
        this.setState({aboutUpdates: e.target.value});
    }

    onClick = () =>{
        let aboutContentsCopy = this.state.aboutContent.slice();
        aboutContentsCopy.push(this.state.aboutUpdates);

        this.setState({aboutContent: aboutContentsCopy, aboutUpdates: ""});
    }
    render(){
        let bulletedAbout = this.state.aboutContent.map((e, i) => {
            return(
              <p key={i}>{e}</p>
            );
          });
          
        return(
            <div>
                <h1>About</h1>
                {this.state.aboutContent.length === 0 ? "No Content Yet !" : <div>{bulletedAbout}</div>}
                <br />
                <textarea placeholder="Enter content here" autocapitalize="sentences" autocomplete="on" cols="100" rows="5" value={this.state.aboutUpdates}
                onChange={this.onInputChange}> </textarea>
                <button onClick={this.onClick}>Add!</button>
            </div>
        );
    }
}