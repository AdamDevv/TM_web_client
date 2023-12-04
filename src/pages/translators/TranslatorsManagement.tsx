import { Breadcrumb, Button } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import { useEffect, useState } from "react";
import { Icon } from "../../components/Icon";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { Translator, TranslatorStatus } from "../../model/translators/Translator";
import { deleteTranslator, getAllTranslators, updateTranslatorStatus } from "../../services/TranslatorsService";

export default function TranslatorsManagement() {
  const [translators, setTranslators] = useState<Translator[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{
    show: boolean;
    value?: Translator;
  }>({
    show: false
  });

  useEffect(() => {
    getAllTranslators()
    .then(result => {
      setTranslators(result.value);
    });
  }, [])

  function deleteDialog(value: Translator) {
    setShowDeleteDialog({
      show: true,
      value
    });
  }

  function deleteConfirm() {
    deleteTranslator(showDeleteDialog.value!.uid);

    setTranslators(translators.filter(c => c.uid !== showDeleteDialog.value?.uid));
    
    setShowDeleteDialog({
      show: false
    });
  }

  function updateStatus(value: Translator) {
    updateTranslatorStatus(value.uid, TranslatorStatus.Certified);
    
    var a = [...translators];
    a.find(t => t.uid === value.uid)!.status = TranslatorStatus.Certified;
    
    console.log(a);

    setTranslators(a);
  }

  return (
    <div>
      <Breadcrumb className="ps-3 pt-3">
        <Breadcrumb.Item active>Translators</Breadcrumb.Item>
      </Breadcrumb>

      <hr />

      <div className="d-flex justify-content-end">
        <Link to="/translators/new" className="mb-2 ps-2 d-inline-flex btn btn-outline-success align-items-center text-decoration-none">
          <Icon iconName="Plus" size={30}/>
          Create new
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center" style={{width:50}}>#</th>
            <th>Name</th>
            <th>Hourly rate</th>
            <th>Status</th>
            <th>Credit card number</th>
            <th style={{width: 150}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            translators.map((t, i) =>
              <tr key={i}>
                <td className="text-center">{i + 1}</td>
                <td>{t.name}</td>
                <td>{t.hourlyRate},-</td>
                <td>{TranslatorStatus[t.status]}</td>
                <td>{t.creditCardNumber}</td>
                <td>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <Icon 
                      onClick={t.status === TranslatorStatus.Certified ? undefined : () => updateStatus(t)} 
                      cursor="pointer" 
                      iconName="ArrowUpSquare" 
                      color="green" 
                      style={(t.status === TranslatorStatus.Certified ? ({opacity:0.5, cursor:"not-allowed"}) : undefined)} 
                      size={22}/
                    >
                    <Link to={`${t.uid}`}><Icon cursor="pointer" iconName="PencilFill" color="royalBlue" size={22}/></Link>
                    <Icon onClick={() => deleteDialog(t)} cursor="pointer" iconName="TrashFill" color="red" size={22}/>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
  
  
      <Modal show={showDeleteDialog!.show}>
        <Modal.Header>
          <Modal.Title>Delete translator</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete translator <b className="text-danger">{showDeleteDialog.value?.name}</b>?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog({ show: false })}>Cancel</Button>
          <Button variant="danger" onClick={deleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}