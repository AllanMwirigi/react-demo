import React from 'react';
import { fetchData } from '../utilities/networkcalls'
import { Button, Segment, Card, Image } from 'semantic-ui-react';
import '../css/sponsorshippage.css'

export default class SponsorshipPage extends React.Component{
  constructor(){
    super();
    this.state = { datafetched: false };
    this.kidslist = null;
    this.getKidsData();
  }

  // TODO, fetch data periodically maybe upon scroll or on click 
  getKidsData = async () => {
    console.log('fetching data')
    this.kidslist = await fetchData('/sponsorship/getneedystudents');
    console.log(this.kidslist)    
    this.setState({ datafetched: true })
  }

  viewClick = (event) => {
    console.log('see more')
  }

  Kids = (props) => {
    const kidslist = props;
    const cards = kidslist.map((listitem) => 
      <Card key={Date.now().toString()}>
        <Image src={listitem.picURL} />
        <Card.Content>
          <Card.Header>
            {listitem.name}
          </Card.Header>
          <Card.Meta>
            <span>
              {listitem.age}
            </span>
          </Card.Meta>
          <Card.Description>
            {listitem.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color='teal' onClick={this.viewClick} size='small'>View</Button>
        </Card.Content>
      </Card>
    );
    return(
      <Card.Group itemsPerRow={4}>
        {cards}
      </Card.Group>
    );
  }

  render(){
    const { datafetched } = this.state;
    return(
      <div className='page-background'>
          <Segment raised className='heading'>
            Sponsor a Child Today and help bring hope to these kids in need
          </Segment>
          <Segment className='items-container' loading={!datafetched}>
            { datafetched && this.Kids(this.kidslist) }
          </Segment>
      </div>
    );
  }
}