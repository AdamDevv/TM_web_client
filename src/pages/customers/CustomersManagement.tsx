import { Breadcrumb, Button } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import { deleteCustomer, getAllCustomers } from "../../services/CustomersService";
import { useEffect, useState } from "react";
import { Customer } from "../../model/customers/Customer";
import { Icon } from "../../components/Icon";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{
    show: boolean;
    value?: Customer;
  }>({
    show: false
  });

  useEffect(() => {
    getAllCustomers()
    .then(result => {
      setCustomers(result.value);
    });
  }, [])

  function deleteDialog(value: Customer) {
    setShowDeleteDialog({
      show: true,
      value
    });
  }

  function deleteConfirm() {
    deleteCustomer(showDeleteDialog.value!.uid);

    setCustomers(customers.filter(c => c.uid !== showDeleteDialog.value?.uid));
    
    setShowDeleteDialog({
      show: false
    });
  }

  return (
    <div>
      <Breadcrumb className="ps-3 pt-3">
        <Breadcrumb.Item active>Customers</Breadcrumb.Item>
      </Breadcrumb>

      <hr />

      <Link to="/customers/new" className="d-flex justify-content-end text-decoration-none">
        <Button className="mb-2 ps-2 d-inline-flex align-items-center" variant="outline-success">
          <Icon iconName="Plus" size={30}/>
          Create new
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center" style={{width:50}}>#</th>
            <th>Name</th>
            <th style={{width: 150}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            customers.map((c, i) =>
              <tr key={i}>
                <td className="text-center">{i + 1}</td>
                <td>{c.name}</td>
                <td>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    {/* <Icon onClick={test} cursor="pointer" iconName="List" color="gray" size={22}/> */}
                    <Link to={`${c.uid}`}><Icon cursor="pointer" iconName="PencilFill" color="royalBlue" size={22}/></Link>
                    <Icon onClick={() => deleteDialog(c)} cursor="pointer" iconName="TrashFill" color="red" size={22}/>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
  
  
      <Modal show={showDeleteDialog!.show}>
        <Modal.Header>
          <Modal.Title>Delete customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete customer <b className="text-danger">{showDeleteDialog.value?.name}</b>?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog({ show: false })}>Cancel</Button>
          <Button variant="danger" onClick={deleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}