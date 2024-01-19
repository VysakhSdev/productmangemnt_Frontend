import React from 'react'
import { Helmet } from 'react-helmet'

function Footer() {
  return (
    <>
      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <script>document.write(new Date().getFullYear())</script> © EKART.
            </div>
            <div class="col-sm-6">
              <div class="text-sm-end d-none d-sm-block">
                {/* Design & Develop by Themesbrand */}
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>

  )
}

export default Footer