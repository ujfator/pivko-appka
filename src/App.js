import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { Navbar, NavbarBrand, Card,
  CardHeader,
  CardTitle,
  CardBody
 } from 'shards-react';

function App() {
  return (
    <div className="App">
       <Navbar type="dark" theme="primary" expand="md">
          <NavbarBrand href="#">Pivka</NavbarBrand>
      </Navbar>
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
      </div>
    </div>
  );
}

export default App;
