import { Breadcrumb } from "react-bootstrap";

export default function CustomersManagement() {
  return (
    <div className="text-start">
      <Breadcrumb className="p-3">
        <Breadcrumb.Item active>Customers</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}