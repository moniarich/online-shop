import React, { Fragment, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ButtonToggle } from "reactstrap";
import { useRouter } from "next/router";

const Search = () => {
  const [term, setTerm] = useState([]);
  const router = useRouter();

  const goToPage = () => router.push(`/product/list/?q=${term}`);

  //   const enterPressed = (e) =>{
  //   const code = e.keyCode || e.which;
  // if(code===13){
  //   setTerm();
  // }

  return (
    <Fragment>
      <form
        className="form-inline mt-4 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          goToPage();
        }}
      >
        <input
          value={term}
          className="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
        <ButtonToggle type="submit" style={{backgroundColor:"#011a00"}}>
          <span>
            <FaSearch />
          </span>
        </ButtonToggle>{" "}
      </form>
    </Fragment>
  );
};

export default Search;
