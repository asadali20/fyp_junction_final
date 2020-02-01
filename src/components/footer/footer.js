import React, { Component } from 'react';
// import {FooterSection ,FooterLinkList} from 'react-mdl';
import './footer.css'
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";

class Footer extends Component
{
    render()
    
        {
            return(
      <div className='footer'>
          
                {/* Footer */}
      <footer className="page-footer font-small blue pt-4">
        {/* Footer Links */}
        <div className="container-fluid text-center text-md-left">
          {/* Grid row */}
          <div className="row">
            {/* Grid column */}
            <div className="col-md-6 mt-md-0 mt-3">
              {/* Content */}
              <h5 className="text-uppercase"><b>Vision :</b></h5>
              <p>we intend to provide a platform where students from various universities can show the abstract of their project and the investors who want to invest their money can invest in the projects of their interests. It will be very helpful for both the students and the investors as students can easily get the investments for their projects and on the other hand the investors can find the projects to invest their money without any trouble and wastage of time.</p>
            </div>
            {/* Grid column */}
            <hr className="clearfix w-100 d-md-none pb-3" />
            {/* Grid column */}
            <div className="col-md-3 mb-md-0 mb-3">
              {/* Links */}
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                <li>
                <a href="#" className="fa fa-facebook"><img src=""/></a>
                </li>
                <li>
                <a href="#" className="fa fa-twitter"></a>
                </li>
                <li>
                <a href="#" className="fa fa-google"></a>
                </li>
                <li>
                <a href="#" className="fa fa-linkedin"></a>

                </li>
              </ul>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-3 mb-md-0 mb-3">
              {/* Links */}
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                <li>
                <a href="#" class="fa fa-instagram"></a>



                </li>
                <li>
                <a href="#" class="fa fa-pinterest"></a>
                </li>
                <li>
                <a href="#" class="fa fa-skype"></a>
                </li>
                <li>
                <a href="#" class="fa fa-snapchat-ghost"></a>
                </li>
              </ul>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Footer Links */}
        {/* Copyright */}
        <div style={{color:'white'}} className="footer-copyright text-center py-3">© 2020 Copyright
          <a style={{color:'white'}} href=""> FYP-JUNCTION</a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
                    </div>
                );
    }
}

export default Footer;