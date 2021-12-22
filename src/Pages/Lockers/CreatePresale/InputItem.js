import React, { useState } from "react";

import { Col } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Selects from "./Select";

const InputItem = ({
  col,
  name,
  select,
  icon,
  type,
  initialValue,
  placeholeder,
  warning,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [selectedDate, handleDateChange] = useState(
    new Date("2022-01-01T00:00:00.000Z")
  );
  return (
    <Col md={col || 6}>
      <div className="py-2">
        <p className="name ">{name}</p>
        <div
          className="input-container "
          onClick={() => setDropdown((prev) => !prev)}
        >
          {!select && (
            <>
              {icon && <BiUserCircle size="18px" color="#3D3D3D" />}
              {type ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    variant="inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{
                      padding: "5px 0",
                      color: "#fff",
                      width: "100%",
                      fontSize: "14px",
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    format="yyyy/MM/dd HH:mm"
                  />
                </MuiPickersUtilsProvider>
              ) : (
                <input className="input w-100" placeholder={placeholeder} />
              )}
            </>
          )}
          {select && (
            <Selects
              select={select}
              initialValue={initialValue}
              dropdown={dropdown}
            />
          )}
        </div>
        <p className="warning m-0">{warning}</p>
      </div>
    </Col>
  );
};
export default InputItem;
