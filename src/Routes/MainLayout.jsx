import React from "react";
import Header from "../Layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";
import Sidebar from "../Layout/SideBar/SideBar";

function Children() {
  return (
    <>
    <Helmet>
    <link
          href="assets/css/icons.min.css"
          rel="stylesheet"
          type="text/css"
        />

        <link
          href="assets/css/bootstrap.min.css"
          id="bootstrap-style"
          rel="stylesheet"
          type="text/css"
        />

        <link
          href="assets/css/app.min.css"
          id="app-style"
          rel="stylesheet"
          type="text/css"
        />
      </Helmet>




      <div id="layout-wrapper">
        <Header />
        <Sidebar />
        <div className="main-content">
          <div id="page-content">
            <div class="container-fluid">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      
      <Helmet>
        <script src="assets/libs/jquery/jquery.min.js"></script>
        <script src="assets/libs/metismenu/metisMenu.min.js"></script>
        <script src="assets/libs/simplebar/simplebar.min.js"></script>
        <script src="assets/libs/node-waves/waves.min.js"></script>
        <script src="assets/libs/apexcharts/apexcharts.min.js"></script>
        <script src="assets/js/pages/dashboard.init.js"></script>
        <script src="assets/js/app.js"></script>
      </Helmet>
    
    </>
  );
}

export default Children;
