import React from 'react';
import Slideshow from '../components/slideshow';
import { Segment } from 'semantic-ui-react';

export default class HomePage extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <Slideshow />
                <h1>More Home Content goes here</h1>
            </div>
            
        );
    }
}

