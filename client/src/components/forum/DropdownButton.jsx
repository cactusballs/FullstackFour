import Dropdown from "react-bootstrap/Dropdown";
import "./DropdownButton.css";
import { useLocation } from "react-router-dom";

function DropdownButton({ onSelect }) {
  // const location = useLocation();
  // const url = location.pathname;
  // console.log(url);

  // const parentTypes = [
  //   { type: "Carers", link: url+"/carers" },
  //   { type: "Expecting parents", link: url+"/expecting_parents" },
  //   { type: "New parents", link: url+"/new_parents" },
  //   { type: "Single parents", link: url+"/single_parents" },
  //   { type: "LGBTQIA+ parents", link: url+"/LGBTQIA_plus_parents" },
  //   { type: "Back to all topics", link: "/forum" }
  // ];

  // const parentTypes = [
  //   { type: "Carers", tag: "carers_tag" },
  //   { type: "Expecting parents", tag: "expecting_parents_tag" },
  //   { type: "New parents", tag: "new_parents_tag" },
  //   { type: "Single parents", tag: "single_parents_tag" },
  //   { type: "LGBTQIA+ parents", tag: "LGBTQIA_plus_parents_tag" },
  //   { type: "Back to all topics", tag: "" },
  // ];

  const parentTypes = [
    { type: "Carers", tag: "carers" },
    { type: "Expecting parents", tag: "expecting_parents" },
    { type: "New parents", tag: "new_parents" },
    { type: "Single parents", tag: "single_parents" },
    { type: "LGBTQIA+ parents", tag: "LGBTQIA_plus_parents" },
    { type: "Back to all topics", tag: "" },
  ];

  return (
    <Dropdown>
      <Dropdown.Toggle className="dropdown-button">
        Filter by parent type
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {parentTypes.map((type, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => onSelect(type.tag)}

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
