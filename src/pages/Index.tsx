import { Button } from "react-bootstrap";

export default function Index() {
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center' style={{height: 250}}>
        <h1>Translation Management</h1>
      </div>

      <div className="d-flex gap-3 justify-content-center">
        <Button as="a" href="translators" variant="primary" size="lg">Translators</Button>
        <Button as="a" href="customers" variant="success" size="lg">Customers</Button>
        <Button as="a" href="contracts" variant="danger" size="lg">Contracts</Button>
      </div>
    </div>
  )
}