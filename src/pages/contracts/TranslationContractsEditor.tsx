import { FormEvent, createRef, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Form } from "react-bootstrap";
import { ErrorResponse, Link, useNavigate, useParams } from "react-router-dom";
import { Customer } from "../../model/customers/Customer";
import { createCustomer, getAllCustomers, getCustomer, updateCustomer } from "../../services/CustomersService";
import { CommonApiResultCode } from "../../model/resultCodes/CommonApiResultCode";
import { TranslationContract } from "../../model/translationContracts/TranslationContract";
import { createTranslationContract, getTranslationContract, updateTranslationContract } from "../../services/TranslationContractsService";
import { getAllTranslators } from "../../services/TranslatorsService";

export default function TranslationContractsEditor() {
  let { uid } = useParams();
  const [validated, setValidated] = useState(false);
  const [translationContract, setTranslationContract] = useState<Omit<TranslationContract, "status"> & { content: string }>({
    uid: "",
    customerUid: "",
    translatorUid: undefined,
    price: 0,
    content: "",
  });
  const [customers, setCustomers] = useState<Customer[]>();

  const [breadcrumbLabel, setBreadcrumbLabel] = useState<string>();
  const navigate = useNavigate();

  const standaloneMode = uid === undefined;
  
  const customerSelectRef = createRef<HTMLSelectElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    
    const customerSelectValid = customerSelectRef.current!.selectedIndex === 0
    customerSelectRef.current!.setCustomValidity(customerSelectValid ? "error" : "");
    
    if (event.currentTarget.checkValidity()) {
      const request: Promise<any> = standaloneMode 
        ? createTranslationContract(translationContract.customerUid, translationContract.content, translationContract.price, translationContract.translatorUid) 
        : updateTranslationContract(translationContract.uid, translationContract.price);
      
      request.then(() => {
        navigate("/contracts");
      })
    }
  };

  useEffect(() => {
    if (!standaloneMode) {
      getTranslationContract(uid!)
      .then(result => {
        if (result.resultCode !== CommonApiResultCode.Ok) {
          navigate("/contracts");
          return;
        }

        setTranslationContract({ ...result.value, content: "" });
        setBreadcrumbLabel(result.value!.uid);
      }).catch((error: ErrorResponse) => {
        navigate("/contracts");
      });
    }

    getAllCustomers()
      .then(result => {
        if (result.resultCode !== CommonApiResultCode.Ok) {
          navigate("/contracts");
          return;
        }

        setCustomers(result.value);
      }).catch((error: ErrorResponse) => {
        navigate("/contracts");
      });
  }, [navigate, standaloneMode, uid]);

  return (
    <div>
      <Breadcrumb className="ps-3 pt-3">
        <Link className="breadcrumb-item" to="/contracts">Contracts</Link>
        <Breadcrumb.Item active>{standaloneMode ? "New" : breadcrumbLabel}</Breadcrumb.Item>
      </Breadcrumb>

      <hr />

      <div className="d-flex justify-content-center mt-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-50">
          <Card>
            <Card.Body>
              {standaloneMode ? (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Customer</Form.Label>
                  
                  <Form.Select required ref={customerSelectRef} onChange={v => setTranslationContract({ 
                    ...translationContract,
                    customerUid: v.target.value,
                  })}>
                    <option>Select customer</option>
                    {customers?.map((c, i) => (
                      <option key={i} value={c.uid}>{c.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ) : undefined}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Price" 
                  value={translationContract.price}
                  onChange={v => setTranslationContract({ 
                    ...translationContract,
                    price: Number(v.target.value)
                  })} 
                />
              </Form.Group>

              {standaloneMode ? (
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  required 
                  as="textarea" 
                  rows={5}
                  placeholder="Content"
                  value={translationContract.content}
                  onChange={v => setTranslationContract({ 
                    ...translationContract,
                    content: v.target.value
                  })} 
                />
              </Form.Group>
              ) : undefined}

              </Card.Body>
            </Card>
            <div className="mt-3 d-flex justify-content-center">
              <Button variant="outline-primary" type="submit">Submit</Button>
            </div>
          </Form>
        </div>
    </div>
  )
}
