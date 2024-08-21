import Dropdown from "react-bootstrap/Dropdown";
import "./DropdownButton.css";

const parentTypes = [
  { type: "All", link: "/placeholder" },
  { type: "Carers", link: "/placeholder" },
  { type: "Expecting parents", link: "/placeholder" },
  { type: "New parents", link: "/placeholder" },
  { type: "Single parents", link: "/placeholder" },
  { type: "LGBTQIA+ parents", link: "/placeholder" },
];

function DropdownButton() {
  return (
    <Dropdown>
      <Dropdown.Toggle className="dropdown-button">
        Filter by parent type
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {parentTypes.map((type, index) => (
        <Dropdown.Item key={index} href={type.link}>
          {type.type}
        </Dropdown.Item>))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
