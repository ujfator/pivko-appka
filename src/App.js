import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { Navbar, NavbarBrand, Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  FormTextarea 
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
    this.createNewCard = this.createNewCard.bind(this);
    this.getCards = this.getCards.bind(this);
    this.state = {
      cardText: '',
      cards: [],
    };
  }
  getCards() {
    axios.get('/cards').then(function(value) {
      this.setState({cards: [...this.state.cards, value]})
    })
  }
  handleChange(e) {
    this.setState({cardText: e.target.value});
  }
  createNewCard() {
    axios
			.post("/create", {text: this.state.cardText})
			.then(function () {
				axios.get('/');
			})
			.catch(function () {
				throw("Error.")
			});
  }
  render() {
    return (
      <div className="content">
        <Card style={{ maxWidth: "300px" }}>
          <CardHeader>První várka</CardHeader>
          <CardBody>
            <CardTitle>Uvařeno cca 1.3.</CardTitle>
            <p>Uvařeno z 5 kg sladu - 4 Plzeň, trochu Vídeň</p>
            <p>Problém: hrnec o objemu 20 litrů nepojme 18.6 litru vodu a 5 kg sladu. </p>
            <p>Pivo nalahvováno 13. - 20.3, po 2 týdnech není moc perlivé.</p>
            <p>Mladina není dostatečně sladká. Z důvodu malého hrnce, čili málo sladiny, bylo nutno nastavovat vodou v poměru 7l mladiny na 4l vody.</p>
            <p>Chuť v pořádku, trochu do Ale. Příště 3kg sladu a 14l vody.</p>
          </CardBody>
        </Card>
        <Card className="my-card">
          <CardHeader>Vytvořit novou kartu</CardHeader>
          <CardBody>
            <FormTextarea className="text-area" onChange={this.handleChange}/>
            <Button onClick={this.createNewCard}>Vytvořit záznam</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default App;
