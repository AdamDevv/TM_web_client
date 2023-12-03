import { FormEvent, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Form } from "react-bootstrap";
import { ErrorResponse, Link, useNavigate, useParams } from "react-router-dom";
import { Customer } from "../../model/customers/Customer";
import { createCustomer, getCustomer, updateCustomer } from "../../services/CustomersService";
import { CommonApiResultCode } from "../../model/resultCodes/CommonApiResultCode";

export default function CustomersEditor() {
  let { uid } = useParams();
  const [validated, setValidated] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    uid: "",
    name: "",
  });
  const [breadcrumbLabel, setBreadcrumbLabel] = useState<string>();
  const navigate = useNavigate();

  const standaloneMode = uid === undefined;
  
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    
    
    if (event.currentTarget.checkValidity()) {
      const request: Promise<any> = standaloneMode 
        ? createCustomer(customer.name) 
        : updateCustomer(customer);
      
      request.then(() => {
        navigate("/customers");
      })
    }
  };

  useEffect(() => {
    if (!standaloneMode) {
      getCustomer(uid!)
      .then(result => {
        if (result.resultCode !== CommonApiResultCode.Ok) {
          navigate("/customers");
          return;
        }

        setCustomer(result.value);
        setBreadcrumbLabel(result.value!.name);
      }).catch((error: ErrorResponse) => {
        navigate("/customers");
      });
    }
  }, [navigate, standaloneMode, uid]);

  return (
    <div>
      <Breadcrumb className="ps-3 pt-3">
        <Link className="breadcrumb-item" to="/customers">Customers</Link>
        <Breadcrumb.Item active>{standaloneMode ? "New" : breadcrumbLabel}</Breadcrumb.Item>
      </Breadcrumb>

      <hr />

      <div className="d-flex justify-content-center mt-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-50">
          <Card>
            <Card.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  required 
                  type="text" 
                  placeholder="Name" 
                  value={customer.name} 
                  onChange={a => setCustomer({ 
                    ...customer, 
                    name: a.target.value 
                  })} 
                />
              </Form.Group>
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
