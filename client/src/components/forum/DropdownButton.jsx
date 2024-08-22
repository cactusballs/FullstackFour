import Dropdown from "react-bootstrap/Dropdown";
import "./DropdownButton.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function DropdownButton({ onSelect }) {
  // const location = useLocation();
  // const url = location.pathname;
  // console.log(url);

  const [dropdownText, setDropdownText] = useState("Filter by parent type");

  const parentTypes = [
    { type: "Carers", tag: "carers" },
    { type: "Expecting parents", tag: "expecting_parents" },
    { type: "New parents", tag: "new_parents" },
    { type: "Single parents", tag: "single_parents" },
    { type: "LGBTQIA+ parents", tag: "LGBTQIA_plus_parents" },
    { type: "All posts for this topic", tag: "" },
  ];

  const dropdownTextUpdate = (type) => {
    console.log(type);
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
          <Dropdown.Item
            key={index}
            onClick={() => dropdownTextUpdate(type)}
            // href={type.link}
          >
            {type.type}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownButton;
