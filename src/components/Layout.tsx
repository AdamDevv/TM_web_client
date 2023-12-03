import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link, Outlet } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Link
            to="/"
            className="navbar-brand me-5"
            style={{fontWeight: 'lighter', letterSpacing: '3px'}}
          >
            Translation Management
          </Link>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/translators">Translators</Link>
              <Link className="nav-link" to="/customers">Customers</Link>
              <Link className="nav-link" to="/contracts">Contracts</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Outlet />
      </Container>
    </div>
  )
}