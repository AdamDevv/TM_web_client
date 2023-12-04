import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center' style={{height: 250}}>
        <h1>Translation Management</h1>
      </div>

      <div className="d-flex gap-3 justify-content-center">
        <Link to="translators"><Button href="translators" variant="primary" size="lg">Translators</Button></Link>
        <Link to="customers"><Button variant="success" size="lg">Customers</Button></Link>
        <Link to="contracts"><Button variant="danger" size="lg">Contracts</Button></Link>
      </div>
    </div>
  )
}