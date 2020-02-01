import React, { Component } from 'react'
import { Form ,NavDropdown, Nav, Navbar, Button, DropdownButton, Col,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './titleshadow.css';
import firebase from '../../firebase';

const db = firebase.firestore();
var auth = firebase.auth()
var provider = new firebase.auth.FacebookAuthProvider();

var datasi = []
export default class InvestorDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datai: [],
            visiblePhotos: [],
            categoryies:""
        }
    }


    async componentDidMount() {
        datasi=[]
        console.log("Project Catygory", this.state.categoryies)
        
            await db.collection("post").get()
            .then(function (querysnapshot) {
                querysnapshot.forEach(function (doc) {
                    console.log(doc.data(), "Asad123")
                    datasi.push(doc.data())
                    console.log(datasi, "!!!!!!!!helo!!!!")




                })
            })

        this.setState({
            datai: datasi,
            visiblePhotos: datasi 
        })

        console.log("data", this.state.datai)

    }

    handleChange = (e) =>
    {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    }

    logout=()=>{
        // alert("logout")
         localStorage.clear();
         window.location.reload();
        
         
       }
    filterPhotos = () => {
        console.log(this.filterText.value);
        const filterPhotoList = this.state.datai.filter(photo => {
           return    photo.category == this.state.categoryies && ( photo.titles.indexOf(this.filterText.value) !== -1 || photo.costs.indexOf(this.filterText.value) !== -1)  
                               // return console.log(photo.category,"phototottot")
                               
        });
        // console.log(filterPhotoList);
    
        this.setState({
          visiblePhotos: filterPhotoList
        });
      };
    
      filterPhotos1 = () => {
        console.log(this.filterText.value);
        const filterPhotoList = this.state.datai.filter(photo => {
           return    photo.category == this.state.categoryies && photo.costs.indexOf(this.filterText.value) !== -1  
                               // return console.log(photo.category,"phototottot")
                               
        });
        // console.log(filterPhotoList);
    
        this.setState({
          visiblePhotos: filterPhotoList
        });
      };
    

    render() {
        console.log(datasi, "render")

        var name=localStorage.getItem("name1")


        return (
            <div className='stu-dashboard'>

                <div className='stu-navbar'>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">FYP Junction</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className='ml-auto'>
                                <Nav.Link href="/investorLogin">Home</Nav.Link>
                                <Nav.Link href="/investorLogin">{name}</Nav.Link>
                               
                                <Link to="/investorLogin">  <Nav.Link href=""><a  onClick={this.logout}>Logout</a></Nav.Link> </Link> 
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                
                <div>
                <Row>
                <Col>
                        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button"> */}
                        <Form.Group controlId="formGridAddress1">
                        <Form.Label className='address' style={{maxWidth:'30%',marginLeft:"3%", marginTop:'0%'}}><b>Project Category</b></Form.Label>
                        <div style={{marginTop:'0px', marginLeft:'3%'}} id="dropdown-basic-button">
                            <select type='select' name='categoryies' className="browser-default custom-select"   value={this.state.categoryies} onChange={this.handleChange}>
                            <option>Project Catygory</option>
                            <option value="computerscience">Computer science</option>
                            <option value="mechanical">Mechanical</option>
                            <option value="civil">Civil</option>
                            <option value="electical">Electrical</option>
                            </select>
                        </div>
                        </Form.Group>
                        {console.log("select", this.state.categoryies)}
                        <div className="row">
                            
            <label style={{position:'absolute',left:'35%',top:'12%',fontWeight:'2px', fontSize:'20px'}}><b>Search Title</b></label>
          <input placeholder="Search By Title or Cost" style={{maxWidth:'30%',position:'absolute',left:'35%',top:'43px'}} 
            type="text"
            onChange={this.filterPhotos}
            ref={node => (this.filterText = node)}
            className="col s4 m4"
            
          />
          
        </div>
  
       
        {/* <div className="row">

<input placeholder="Search by cost" style={{maxWidth:'30%',marginLeft:"33%"}} 
  type="text"
  onChange={this.filterPhotos1}
  ref={node => (this.filterText = node)}
  className="col s4 m4"
/>

</div> */}
                        
                        </Col>
                        </Row>
                </div>

                <div >
                    {
                    //this.state.datai.map((item)
                        this.state.visiblePhotos.map((item) => {
                            return (
                                <div className="card" style={{width: '400px' ,backgroundColor:"#D0D3D4 ", display: "inline-block",border:"3px solid black",   marginTop: "25px" , marginLeft: "3%" }}>
        <img className="card-img-top" src={item.url} alt="Card image"  />
        {/* <div className="card-body" style={{marginLeft:"23%"}}>
          <h5 className="card-title" style={{fontFamily:"italic"}}><b>PROJECT TITLE</b></h5>
          <p className="card-text">
              <b>
              {item.titles}
              </b>
              
              
          </p>
         <Link to={`/${item.uid1}`}>  <a href="#" className="btn btn-primary">Description</a>  </Link>
        </div> */}
         <div class="card-body" >
    <h5 style={{fontWeight:"bolde",paddingLeft:"5%",width:"393px"}} id="title" class="card-title"><b>{item.titles}</b></h5>
    <p style={{fontSize:"15px"}}class="card-text"><b>Category  of Project:   {item.category} 
   <br/>
    Date:    {item.date}
    <br/>
    Estimated Cost:    {item.costs}
    </b>
     </p>
    
     <Link style={{paddingLeft:"8%"}} to={`/${item.uid1}`}>  <a href="#"   className="btn btn-primary">Description</a>  </Link>
  </div>
      </div>


                            )
                        })

                    }

                </div>
            </div>
        )
    }
}