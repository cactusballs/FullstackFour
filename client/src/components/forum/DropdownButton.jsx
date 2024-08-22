import Dropdown from "react-bootstrap/Dropdown";
import "./DropdownButton.css";
import { useState } from "react";

function DropdownButton({ onSelect }) {
  const [dropdownText, setDropdownText] = useState("Filter by parent type");

  const parentTypes = [
    { type: "Carers", tag: "carers" },
    { type: "Expecting parents", tag: "expecting_parents" },
    { type: "New parents", tag: "new_parents" },
    { type: "Single parents", tag: "single_parents" },
    { type: "LGBTQIA+ parents", tag: "LGBTQIA_plus_parents" },
  ];

  const dropdownTextUpdate = (type) => {
    onSelect(type.tag);
    setDropdownText(type.type);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="dropdown-button">
        {dropdownText}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {parentTypes.map((type, index) => (
          <Dropdown.Item key={index} onClick={() => dropdownTextUpdate(type)}>
            {type.type}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
