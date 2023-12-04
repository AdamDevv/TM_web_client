import { FormEvent, createRef, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Form } from "react-bootstrap";
import { ErrorResponse, Link, useNavigate, useParams } from "react-router-dom";
import { CommonApiResultCode } from "../../model/resultCodes/CommonApiResultCode";
import { Translator, TranslatorStatus } from "../../model/translators/Translator";
import { createTranslator, getTranslator, updateTranslator } from "../../services/TranslatorsService";

export default function TranslatorsEditor() {
  let { uid } = useParams();
  const [validated, setValidated] = useState(false);
  const [translator, setTranslator] = useState<Translator>({
    uid: "",
    name: "",
    hourlyRate: 0,
    status: TranslatorStatus.Applicant,
    creditCardNumber: ""
  });
  const [breadcrumbLabel, setBreadcrumbLabel] = useState<string>();
  const navigate = useNavigate();

  const standaloneMode = uid === undefined;
  
  const creditCardRef = createRef<HTMLInputElement>();

  function creditCardNumberValid(value: string) {
    return /^\d{4} \d{4} \d{4} \d{4}$/.test(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    
    creditCardRef.current?.setCustomValidity(creditCardNumberValid(translator.creditCardNumber) ? "" : "error");
    
    if (event.currentTarget.checkValidity()) {
      const request: Promise<any> = standaloneMode 
        ? createTranslator(translator.name, translator.hourlyRate, translator.creditCardNumber) 
        : updateTranslator(uid!, translator.name, translator.hourlyRate, translator.creditCardNumber);
      
      request.then(() => {
        navigate("/translators");
      })
    }
  };

  function creditCardNumberOnChange(newValue: string) {
    const raw = newValue.replaceAll(' ', '');
    const valid = raw.length === 0 || (/^\d+$/.test(raw) && raw.length <= 16);

    
    if (!valid) {
      return;
    }
    
    const validateInput = 
      validated && 
      newValue.length !== 0 && 
      !creditCardNumberValid(newValue);
    
    creditCardRef.current?.setCustomValidity(validateInput ? "error" : "");
    
    const formattedValue = newValue.toString().replace(/(\d{4})(?=\d)/g, '$1 ');

    setTranslator({ 
      ...translator,
      creditCardNumber: formattedValue,
    });
  }

  useEffect(() => {
    if (!standaloneMode) {
      getTranslator(uid!)
      .then(result => {
        if (result.resultCode !== CommonApiResultCode.Ok) {
          navigate("/translators");
          return;
        }

        setTranslator(result.value);
        setBreadcrumbLabel(result.value!.name);
      }).catch((error: ErrorResponse) => {
        navigate("/translators");
      });
    }
  }, [navigate, standaloneMode, uid]);

  return (
    <div>
      <Breadcrumb className="ps-3 pt-3">
        <Link className="breadcrumb-item" to="/translators">Translators</Link>
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
                  value={translator.name} 
                  onChange={v => setTranslator({ 
                    ...translator, 
                    name: v.target.value 
                  })} 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Hourly rate</Form.Label>
                <Form.Control 
                  required 
                  type="number" 
                  placeholder="Hourly rate" 
                  value={translator.hourlyRate || ""} 
                  onChange={v => setTranslator({ 
                    ...translator, 
                    hourlyRate: Number(v.target.value)
                  })} 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Credit card number</Form.Label>
                <Form.Control
                  ref={creditCardRef}
                  required 
                  type="string" 
                  placeholder="Credit card number" 
                  value={translator.creditCardNumber} 
                  onChange={v => creditCardNumberOnChange(v.target.value)}
                  isValid={false}

                />
                <Form.Control.Feedback type="invalid">
                  Must be in format XXXX-XXXX-XXXX-XXXX.
                </Form.Control.Feedback>
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
