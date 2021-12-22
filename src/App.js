import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import "antd/dist/antd.css";
import './style.css';
import Navbar from "./Components/Navbar/Navbar";
import LearnHow from "./Components/LearnHow/LearnHow";
import Sidebar from "./Components/Sidebar/Sidebar";
import MintPage from "./Pages/MintPage";
import DifiChange from "./Pages/DifiChangePage";
import Stake from "./Pages/Stake";
import LockesAndToken from "./Pages/Lockers/Token";
import { Routes, Route } from "react-router-dom";
import CreatePresale from "./Pages/Lockers/CreatePresale/CreatePresale";
import CreateNow from "./Pages/Lockers/CreatePresale/CreateInfo/CreateNow";
import styled from "styled-components";
import { DefiProvider } from "./state/defiState";
import ApiProvider from "./Components/DifiChange/api";
const Wrapper = styled.div`
  display: flex;
  .sidebar-container {
    background: #0037c6 !important;
  }
  .left-container {
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
    background: #e5e5e5;
  }
  .left-container ::-webkit-scrollbar {
    width: 0px;
  }
`;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <DefiProvider>
      <ApiProvider>
    <Wrapper>
      <div
        className="sidebar-container"
        style={{
          height: "100vh",
        }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div
        className="w-100 left-container"
        style={{
          background: "#FAFAFA",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        {/* <Navbar className=" inline-block " collapsed={collapsed} /> */}
        <LearnHow collapsed={collapsed} />
        <Routes>
          <Route path="/" element={<Home collapsed={collapsed} />}></Route>
          <Route
            path="/mint"
            element={<MintPage collapsed={collapsed} />}
          ></Route>
          <Route
            path="/difiexchange"
            element={<DifiChange collapsed={collapsed} />}
          ></Route>
          <Route
            path="/stake"
            element={<Stake collapsed={collapsed} />}
          ></Route>
          <Route
            path="/swap"
            element={<Stake collapsed={collapsed} />}
          ></Route>
          
          <Route
            path="/createlauncpad"
            element={<CreatePresale collapsed={collapsed} />}
          ></Route>
          <Route
            path="createlauncpad/createnow"
            element={<CreateNow collapsed={collapsed} />}
          ></Route>
        </Routes>
      </div>
    </Wrapper>
    </ApiProvider>
    </DefiProvider>
  );
}

export default App;
