import React, { useState } from "react";
import styled from "styled-components";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Wrapper = styled.div`
  .my-select {
    font-size: 14px;
    padding: 10px 8px;
    color: #3d3d3d;
  }

  .item-container {
    position: absolute;
    left: -2px;
    background: #f1f5fb;

    border: 1px solid #c4d7f0;
    width: 100.7%;
    z-index: 10;

    top: 45px;
    border-radius: 8px;
  }
  .item-container .item {
    padding: 10px 25px;
    border-radius: 8px;
    cursor: pointer;
  }
  .item-container .item:hover {
    background: #fff;
  }
`;

const Selects = ({ select, initialValue, dropdown }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Wrapper className="w-100">
      <div className="my-select d-flex justify-content-between align-items-center w-100">
        <span> {value}</span>
        {dropdown && (
          <div className="item-container">
            {select.map((el, i) => (
              <div className="item" key={i} onClick={() => setValue(el)}>
                {el}
              </div>
            ))}
          </div>
        )}
        {dropdown ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>
    </Wrapper>
  );
};
export default Selects;
