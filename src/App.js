import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { Navbar, NavbarBrand, Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  FormTextarea,
  FormInput
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
      date: '',
      cards: [],
    };
    this.getCards();
  }

  getCards() {
    axios.get('/cards').then((value) => {
      console.log(value.data);
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
			.delete('/cards', {
        id
      })
			.then(() => this.getCards())
			.catch(function () {
				throw("Error.")
			});
  }

  createNewCard() {
    axios
			.post('/cards', {
        text: this.state.cardText,
        date: this.state.cardDate,
      })
			.then(() => this.getCards())
			.catch(function () {
				throw("Error.")
			});
  }
  render() {
    return (
      <div className="content">
        {
          this.state?.cards.map((val, index) => 
            <Card style={{ maxWidth: "300px" }} className="my-card">
              <CardHeader>
                <div>{val.date}</div>
                <Button onClick={() => this.deleteCard(val.id)}>Smazat</Button>
              </CardHeader>
              <CardBody>
                <CardTitle>{val.text}</CardTitle>
              </CardBody>
            </Card>
          )
        }
        <Card className="my-card">
          <CardHeader>Vytvořit novou kartu</CardHeader>
          <CardBody>
            <FormInput placeholder="Datum" onChange={this.handleChangeDate}/>
            <FormTextarea className="text-area" onChange={this.handleChange}/>
            <Button onClick={this.createNewCard}>Vytvořit záznam</Button>
          </CardBody>
        </Card>
       </div>
    );
  }
}

export default App;
