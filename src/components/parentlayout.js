
import HomePage from '../pages/home';
import AboutPage from '../pages/about';
import ActivitiesPage from '../pages/activities';
import GroupsPage from '../pages/groups';
import NewsPage from '../pages/news';
import SponsorshipPage from '../pages/sponsorship';
import YouthPage from '../pages/youth';
import AdminPage from '../pages/admin';
import LoginPage from '../pages/login';
import JobsPage from '../pages/jobs';
// import SignInScreen from '../pages/signin';

import Footer from './footer';

import '../css/parentlayout.css';

import { BrowserRouter as Router, Route,Link, Switch } from 'react-router-dom'
  
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Container,Divider,Grid,Header,Icon,Image,List,Menu,
    Responsive,Segment,Sidebar,Visibility } from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Do whatever you want when you want to.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {

  constructor(props){
    super(props);

    this.state = {
      activeNav: "Home",
       navState: {Home: true, News: false, Sponsorship: false, Groups: false, 
        Youth:false, Activities: false, About: false, Jobs: false, Admin: false}
    }

    this.navClick = this.navClick.bind(this);
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  navActive = () => this.setState({ active: true })
  navInactive = () => this.setState({ active: false })  

  navClick(event){
      let nav = event.currentTarget;
      let navText = nav.textContent.trim();

      // set the state of the previously active nav to false
      this.setState({ navState: { [this.state.activeNav]: false}});
      // set the state of the clicked nav to true
      this.setState({ navState: {[navText]: true}});
      // make the clicked nav the active nav
      this.setState({ activeNav: navText });
  }

  render() {
    const { children } = this.props
    const { fixed, navState } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center' style={{ minHeight: '14vh', padding: '1em 0em' }} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Link to="/"><Menu.Item active={navState.Home} onClick={this.navClick} >Home</Menu.Item></Link>		  
                <Link to="/news"><Menu.Item  active={navState.News} onClick={this.navClick}>News</Menu.Item></Link>
                <Link to="/youth"><Menu.Item  active={navState.Youth} onClick={this.navClick}>Youth</Menu.Item></Link>
                <Link to="/sponsorship"><Menu.Item  active={navState.Sponsorship} onClick={this.navClick}>Sponsorship</Menu.Item></Link>
                <Link to="/jobs"><Menu.Item  active={navState.Jobs} onClick={this.navClick}>Jobs</Menu.Item></Link>                                
                <Link to="/groups"><Menu.Item  active={navState.Groups} onClick={this.navClick}>Groups</Menu.Item></Link>
                <Link to="/activities"><Menu.Item active={navState.Activities} onClick={this.navClick}>Activities</Menu.Item></Link>
                <Link to="/about"><Menu.Item  active={navState.About} onClick={this.navClick}>About</Menu.Item></Link>
                
                {/* remember to remove admin from public view, maybe have it as a path typed in browser and render it's page from server*/}
                <Link to="/admin"><Menu.Item  active={navState.Admin} onClick={this.navClick}>Admin</Menu.Item></Link>                
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>Log in</Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                </Menu.Item>
              </Container>
            </Menu>
            {/* <HomepageHeading /> */}
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Link to="/"><Menu.Item active>Home</Menu.Item></Link>		  
            <Link to="/news"><Menu.Item>News</Menu.Item></Link>
            <Link to="/youth"><Menu.Item>Youth Portal</Menu.Item></Link>
            <Link to="/sponsorship"><Menu.Item>Sponsorship</Menu.Item></Link>                            
            <Link to="/groups"><Menu.Item>Groups</Menu.Item></Link>
            <Link to="/activities"><Menu.Item>Activities</Menu.Item></Link>
            <Link to="/about"><Menu.Item>About</Menu.Item></Link>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handleToggle} style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>Log in</Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                  </Menu.Item>
                </Menu>
              </Container>
              {/* <HomepageHeading mobile /> */}
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

function ParentLayout() {
  return(
    <Router>
      <ResponsiveContainer>
        <main>
        <Switch>
          <Route exact path = '/' component={HomePage}/>
          <Route path='/about' component={AboutPage}></Route>
          <Route path='/activities' component={ActivitiesPage}></Route>
          <Route path='/groups' component={GroupsPage}></Route>
          <Route path='/news' component={NewsPage}></Route>
          <Route path='/sponsorship' component={SponsorshipPage}></Route>
          <Route path='/youth' component={YouthPage}></Route>
          {/* use Redux or MobX later, to store login status in global state store */}
          {/* <Route path='/jobs' component={SignInScreen} ></Route>       */}
          {/* <Route path='/jobs' render={ ()=> <LoginPage targetpage={<JobsPage/>}/> } ></Route>       */}
          {/* <Route path='/admin' render={ ()=> <LoginPage targetpage={<AdminPage/>}/> }></Route> */} {/* Use this for admin auth */}
          <Route path='/admin' component={AdminPage} ></Route>      
        </Switch>
      </main>
        <Footer />
      </ResponsiveContainer>
      </Router>
  );
}
export default ParentLayout

