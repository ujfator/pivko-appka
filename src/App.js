import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import { Navbar, NavbarBrand, Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  FormTextarea,
  FormInput,
  FormGroup 
 } from 'shards-react';
 import axios from 'axios';
 import React from 'react';

function App() {
  return (
    <div className="App">
       <Navbar type="dark" theme="primary" expand="md">
          <NavbarBrand>Pivka</NavbarBrand>
      </Navbar>
      <Cards></Cards>
    </div>
  );
}

class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.createNewCard = this.createNewCard.bind(this);
    this.getCards = this.getCards.bind(this);
    this.state = {
      cardText: '',
      cardDate: '',
      cards: [],
    };
    this.getCards();
  }

  getCards() {
    axios.get('/cards').then((value) => {
      this.setState({cards: [...value.data]})
    })
  }

  handleChange(e) {
    this.setState({cardText: e.target.value});
  }

  handleChangeDate(e) {
    this.setState({cardDate: e.target.value});
  }

  deleteCard(id) {
    axios
			.delete('/cards/' + id, {
        id
      })
			.then(() => this.getCards())
			.catch(function () {
				throw('Error.')
			});
  }

  createNewCard() {
    axios
			.post('/cards', {
        text: this.state.cardText,
        date: this.state.cardDate,
      })
			.then(() => {
        this.setState({cardDate: '', cardText: ''});
        this.getCards();
      })
			.catch(function () {
				throw('Error.')
			});
  }

  render() {
    return (
      <div className="content">
        <Card className="my-card">
          <CardHeader>Vytvořit novou kartu</CardHeader>
          <CardBody>
            <form onSubmit={this.createNewCard}>
              <FormGroup>
                <label>Datum</label>
                <FormInput 
                  required
                  placeholder="Datum" 
                  type="date" 
                  onChange={this.handleChangeDate} 
                  value={this.state.cardDate}
                />
              </FormGroup>
              <FormGroup>
                <label>Popis</label>
                <FormTextarea 
                  required
                  className="text-area" 
                  onChange={this.handleChange} 
                  value={this.state.cardText}
                />
                <input
                  className="btn btn-primary submit-button" 
                  type="submit" 
                  value="Vytvořit"
                />
              </FormGroup>
            </form>
          </CardBody>
        </Card>
        {
          this.state?.cards.map((val, index) => 
            <Card className="my-card">
              <CardHeader>
                {val.date}
              </CardHeader>
              <CardBody className="card-body">
                <CardTitle>{val.text}</CardTitle>
                <div className="delete-button">
                  <Button onClick={() => this.deleteCard(val.myId)} className="button">Smazat</Button>
                </div>
              </CardBody>
            </Card>
          )
        }
       </div>
    );
  }
}

export default App;
