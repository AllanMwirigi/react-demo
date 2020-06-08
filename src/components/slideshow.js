import React, { Component } from 'react'
import { Form, Grid, Image, Transition } from 'semantic-ui-react'

import slide1 from '../assets/images/try.jpg';
// import slide2 from '../../assets/images/tunadiscuss.jpg';
// import slide3 from '../../assets/images/kids-digital.jpg';
// import slide4 from '../../assets/images/td.jpg';

import '../css/slideshow.css';

const transitions = [
  'browse', 'browse right',
  'drop',
  'fade', 'fade up', 'fade down', 'fade left', 'fade right',
  'fly up', 'fly down', 'fly left', 'fly right',
  'horizontal flip', 'vertical flip',
  'scale',
  'slide up', 'slide down', 'slide left', 'slide right',
  'swing up', 'swing down', 'swing left', 'swing right',
]
const options = transitions.map(name => ({ key: name, text: name, value: name }))

export default class Slideshow extends Component {
    
    constructor(){
        super();

        this.state = { animation: transitions[10], duration: 1000, 
            visible: {slide1: true, slide2: false, slide3: false, slide4: false},
            unmounting: {slide1: false, slide2: false, slide3: false, slide4: false},
            counter: 0 }    

        this.runSlides = this.runSlides.bind(this);
        this.isMobile = this.isMobile.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.slides = [];
        this.indicators = [];

        // tried to do a slideshow, no luck yet
        // if(!this.isMobile() || navigator.userAgent.match(/Chrome/i)){
        //     this.runSlides();
        // }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleVisibility = (c) => {
        let s = "slide";
        let visible = this.state.visible[s+c.toString()];

        if(c > 1){
            let unmounting = this.state.unmounting[s+(c-1).toString()];
            this.setState({ unmounting: { [s+(c-1).toString()]: !visible }});                        
        }

        if(!visible){
            this.setState({ visible: { [s+c.toString()]: !visible }});            
        }
        // if(c > 1){
            // this.setState({ visible: { [s+(c-1).toString()]: !this.state.visible[s+(c-1).toString()] }});            
        // }
    }

    isMobile(){
        if(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){
          return true;
        }
        return false;
     }

    runSlides(){
        // for(let slide in this.slides){
        //     console.log('1');
        //     {visible && <Image fluid src={slide} />}
        // }
        // this.slides.map(()=>{        });
        let that = this;
        
        (function loop(){
            
            setTimeout(()=>{
                ++that.state.counter;
                that.handleVisibility(that.state.counter);
                if(that.state.counter === 4){
                    that.state.counter %= 4;
                }
                loop();  
            }, 3000);
        })();
        

        // return( <Image fluid src={slide4} />);
           
    }
 
    runSlides1(){
        this.slides[this.state.counter].classList.remove('inactive');
        this.indicators[this.state.counter].classList.add('indicator-active');

        setTimeout(function(){
            this.indicators[this.state.counter].classList.remove('indicator-active');
            // ++this.state.counter;
            this.setState( (prevState, props) => ({
                counter: ++prevState.counter
            }));
            console.log(this.state.counter);
            if (this.state.counter === 4) {
                for(let item of this.slides){
                    item.classList.add('inactive');
                }
                // this.state.counter %= 4;
                if((this.state.counter % 4) === 0){
                    this.setState( (prevState, props) => ({
                        counter: 0
                    }));
                }
            }
            //    if(backtoHome){
            //     backtoHome = false;
            //     return;
            //    }

            this.runSlides1();
        }.bind(this), 5000);
        
    }

    // anything refs related can only work once the component is mounted
    componentDidMount(){
        // if(!this.isMobile() || navigator.userAgent.match(/Chrome/i)){
        //     console.log('starting');
        //     this.runSlides1();
        // }
    }

    render() {
        const { animation, duration, visible, unmounting } = this.state

        return (
            <Transition.Group animation={animation} duration={duration}>
                {visible.slide1 && <Image fluid src={slide1} />}
                {/* {visible.slide2 && <Image fluid src={slide2} />}
                {visible.slide3 && <Image fluid src={slide3} />}
                {visible.slide4 && <Image fluid src={slide4} />} */}
            </Transition.Group>


            // refs is a bad practice, when you get time, explore the above further
            // <div className="welcome-img home-content" id="hmPage">
            //     <div className="slide slide-left bkImg1"
            //         ref = {(div) => {this.slides[0] = div;}}>
            //         <div className="info">
            //             <div className="info-par"> Welcome to Tunachop</div>
            //             <div id="mini-par">Learn. Discuss. Discover.</div>
            //         </div>
            //     </div>

            //     <div className="slide slide-left bkImg2 inactive"
            //         ref = {(div) => {this.slides[1] = div}}>
            //         <div className="info">
            //             <div className="info-par">Learn</div>
            //             <div id="mini-par"></div>
            //         </div>
            //     </div>

            //     <div className="slide slide-left bkImg3 inactive"
            //         ref = {(div) => {this.slides[2] = div}}>
            //         <div className="info">
            //             <div className="info-par">Discuss</div>
            //             <div id="mini-par"></div>
            //         </div>
            //     </div>

            //     <div className="slide slide-left bkImg4 inactive"
            //         ref = {(div) => {this.slides[3] = div}}>
            //         <div className="info">
            //             <div className="info-par">Discover</div>
            //             <div id="mini-par"></div>
            //         </div>
            //     </div>

            //     <div className="indicator-container">
            //         <span className="indicator first"
            //             ref = {(elem) => {this.indicators[0] = elem;}}></span>
            //         <span className="indicator second"
            //             ref = {(elem) => {this.indicators[1] = elem;}}></span>
            //         <span className="indicator third"
            //             ref = {(elem) => {this.indicators[2] = elem;}}></span>
            //         <span className="indicator fourth"
            //             ref = {(elem) => {this.indicators[3] = elem;}}></span>
            //     </div>
            // </div>
        )
    }
}
