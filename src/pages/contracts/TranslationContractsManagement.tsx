import { Breadcrumb, Button, Dropdown, Form } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import { useEffect, useState } from "react";
import { Icon } from "../../components/Icon";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { deleteTranslationContract, getAllTranslationContractsWithNames, updateTranslationContractStatus } from "../../services/TranslationContractsService";
import { TranslationContractWithNames } from "../../model/translationContracts/TranslationContractWithNames";
import { TranslationContract, TranslationContractStatus } from "../../model/translationContracts/TranslationContract";

export default function TranslationContractsManagement() {
  const [translationContracts, setTranslationContracts] = useState<TranslationContractWithNames[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{
    show: boolean;
    value?: TranslationContractWithNames;
  }>({
    show: false
  });
  const [showAssignTranslatorDialog, setShowAssignTranslatorDialog] = useState<{
    show: boolean;
    value?: TranslationContractWithNames;
  }>({
    show: false
  });
  const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
  const [showCreateFromFileDialog, setShowCreateFromFileDialog] = useState<boolean>(false);

  useEffect(() => {
    getAllTranslationContractsWithNames()
    .then(result => {
      setTranslationContracts(result.value);
    });
  }, [])

  function deleteDialog(value: TranslationContractWithNames) {
    setShowDeleteDialog({
      show: true,
      value
    });
  }

  function deleteConfirm() {
    deleteTranslationContract(showDeleteDialog.value!.uid);

    setTranslationContracts(translationContracts.filter(c => c.uid !== showDeleteDialog.value?.uid));
    
    setShowDeleteDialog({
      show: false
    });
  }

  function createFromFile() {
    alert("this is crazy");
  }

  function updateStatus(value: TranslationContract) {
    value.status++;
    updateTranslationContractStatus(value.uid, value.status);
    
    var newTranslationContracts = [...translationContracts];
    newTranslationContracts.find(t => t.uid === value.uid)!.status = value.status;
    
    setTranslationContracts(newTranslationContracts);
  }

  return (
    <div>
      <Breadcrumb className="ps-3 pt-3">
        <Breadcrumb.Item active>Contracts</Breadcrumb.Item>
      </Breadcrumb>

      <hr />

      <div className="d-flex justify-content-end">
        <Button onClick={() => setShowCreateFromFileDialog(true)} className="mb-2 me-2 d-inline-flex align-items-center text-decoration-none" variant="outline-success">
          <Icon iconName="FileEarmarkPlus" className="me-1" size={22}/>
          Create from file
        </Button>
        <Link to="/contracts/new" className="mb-2 ps-2 d-inline-flex btn btn-outline-success align-items-center text-decoration-none">
          <Icon iconName="Plus" size={30}/>
          Create new
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center" style={{width:50}}>#</th>
            <th>Customer</th>
            <th>Translator</th>
            <th>Price</th>
            <th>Status</th>
            <th style={{width: 150}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            translationContracts.map((tc, i) =>
              <tr key={i}>
                <td className="text-center">{i + 1}</td>
                <td>{tc.customerName}</td>
                <td>{tc.translatorName}</td>
                <td>{tc.price},-</td>
                <td>{TranslationContractStatus[tc.status]}</td>
                <td>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <Dropdown align={"end"}>
                      <Dropdown.Toggle className="dropdown-hide-arrow p-0" variant="link">
                      <Icon
                        cursor="pointer" 
                        iconName="ThreeDotsVertical" 
                        color="black" 
                        size={22}
                      />
                      </Dropdown.Toggle>
                  
                      <Dropdown.Menu>
                        <Dropdown.Item>Download original</Dropdown.Item>
                        <Dropdown.Item onClick={() => setShowAssignTranslatorDialog({ show: true})}>Assign translator</Dropdown.Item>
                        <Dropdown.Item disabled={tc.translatorUid == null}>Download translated</Dropdown.Item>
                        <Dropdown.Item disabled={tc.translatorUid == null}>Upload translated</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Icon 
                      onClick={tc.status === TranslationContractStatus.Completed ? undefined : () => updateStatus(tc)} 
                      cursor="pointer" 
                      iconName="ArrowUpSquare" 
                      color="green" 
                      style={(tc.status === TranslationContractStatus.Completed ? ({opacity:0.5, cursor:"not-allowed"}) : undefined)} 
                      size={22}
                    />
                    <Link to={`${tc.uid}`}><Icon cursor="pointer" iconName="PencilFill" color="royalBlue" size={22}/></Link>
                    <Icon onClick={() => deleteDialog(tc)} cursor="pointer" iconName="TrashFill" color="red" size={22}/>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
  
  
      <Modal show={showDeleteDialog!.show}>
        <Modal.Header>
          <Modal.Title>Delete contract</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete contract <b className="text-danger">{showDeleteDialog.value?.uid}</b>?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog({ show: false })}>Cancel</Button>
          <Button variant="danger" onClick={deleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>

        
      <Modal show={showAssignTranslatorDialog!.show}>
        <Modal.Header>
          <Modal.Title>Assign translator</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete contract <b className="text-danger">{showDeleteDialog.value?.uid}</b>?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignTranslatorDialog({ show: false })}>Cancel</Button>
          <Button variant="success" onClick={deleteConfirm}>Assign</Button>
        </Modal.Footer>
      </Modal>
        
      <Modal show={showCreateFromFileDialog}>
        <Modal.Header>
          <Modal.Title>Create contract from file</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="formFileDisabled">
            <Form.Control type="file" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateFromFileDialog(false)}>Cancel</Button>
          <Button variant="primary" onClick={createFromFile}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
