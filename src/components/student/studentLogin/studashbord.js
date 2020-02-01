import React, { Component } from 'react'
import { NavDropdown, Nav, Navbar, Button, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../studentLogin/studashboard.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import StuRoutes from '../studentLogin/Sturoutes';
import Cards from '../../cards/Cards'
import firebase from '../../../firebase';
const db = firebase.firestore();
var auth = firebase.auth()
var provider = new firebase.auth.FacebookAuthProvider();

var datas = []
export default class Studashbord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    logout=()=>{
        // alert("logout")
         localStorage.clear();
         window.location.reload();
        
         
       }
    async componentDidMount() {
        datas=[]
        var id=localStorage.getItem("uid")
        await db.collection("post").where("uid","==", id).get()
            .then(function (querysnapshot) {
                querysnapshot.forEach(function (doc) {
                    console.log(doc.data(), "Asad123")
                    datas.push(doc.data())
                    console.log(datas, "!!!!!!!!helo!!!!")




                })
            })

        this.setState({
            data: datas
        })

        console.log("data", this.state.data)



    }


    render() {
        console.log(datas, "render")
        var name=localStorage.getItem("name")
        return (
            <div className='stu-dashboard'>

                <div className='stu-navbar'>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">FYP Junction</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className='ml-auto'>
                                <li>
                                    <Link to="/post">
                                        <Button>
                                            Add post
                                    </Button>
                                    </Link>
                                </li>
                                <Nav.Link href="/studentLogin">{name}</Nav.Link>
                                <Nav.Link href="/studentLogin">Home</Nav.Link>
                              
                              <Link to="/studentLogin">  <Nav.Link href=""><a  onClick={this.logout}>Logout</a></Nav.Link> </Link> 
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>

                <div >
                    {
                        this.state.data.map((item) => {
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
