import React, { Component } from 'react'
import firebase from '../../../firebase';
import "./description.css";
import { NavDropdown, Nav, Navbar, Button, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const db = firebase.firestore();
var auth = firebase.auth()
var provider = new firebase.auth.FacebookAuthProvider();

var datas1 = []
export default class Description extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data1: []
        }
    }
    async componentDidMount() {
        const { match } = this.props;
        console.log(match.params.post_id, "iddddddddd")
       await db.collection("post").where("uid1", "==", match.params.post_id).get()
            .then(function (querysnapshot) {
                querysnapshot.forEach(function (doc) {
                    console.log(doc.data(), "data11123")
                    datas1=[]
                    datas1.unshift(doc.data())
                    console.log(datas1, "datas1209")




                })
            })
        this.setState({
            data1: datas1
        })

        console.log("data1111111", this.state.data1)

    }
    render() {
        console.log(datas1, "render")
        console.log("aaa")
        return (
           
               

                <div >

<div className='stu-navbar'>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">FYP Junction</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className='ml-auto'>
                                <Nav.Link href="/studentLogin">Home</Nav.Link>
                                <Nav.Link href="">settings</Nav.Link>
                                <Nav.Link href="">Profile</Nav.Link>
                                <Nav.Link href="">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>

                    {
                        this.state.data1.map((item) => {
                            return (
                                
                                     <div >
                
                <div className='main' style={{}}>
                    
                    <h5 style={{ marginLeft: "22px", fontFamily: "italic",fontWeight:"bold", marginTop: "42px", borderBottom: "3px solid rgb(44, 135, 240)", width: "200px", }}>student detail</h5>

                            <h6 style={{ position: "absolute", fontWeight: "bolder", color: "#147099", top: "106px", left: "22px" }}>authore</h6>  <span style={{ marginLeft: "108px", fontWeight: "bold" }}> :</span><h6 style={{ marginTop: "0px", display: "inline", marginLeft: "13px" }}>{item.name}</h6>
                </div>
                <div className='main' style={{}}>


                            <h6 style={{ position: "absolute", fontWeight: "bolder", color: "gray", top: "130px", left: "22px" }}>cetagory</h6>  <span style={{ marginLeft: "108px", fontWeight: "bold" }}> :</span><h6 style={{ marginTop: "0px", display: "inline", marginLeft: "13px" }}>{item.category}</h6>

                            <h6 style={{ position: "absolute", fontWeight: "bolder", color: "gray", top: "160px", left: "22px" }}>title</h6>  <span style={{ position: "absolute", left: "8%", top: "185px", fontWeight: "bold" }}> :</span><h6 style={{position: "absolute", left: "9%", top: "160px" }}>{item.titles}</h6>

                            <h6 style={{ position: "absolute", fontWeight: "bolder", color: "gray", top: "190px", left: "22px" }}>Date  </h6>  <span style={{ position: "absolute", left: "8%", top: "214px", fontWeight: "bold" }}> :</span><h6 style={{ position: "absolute", left: "9%", top: "190px" }}>{item.date}</h6>
                            <h6 style={{ position: "absolute", fontWeight: "bolder", color: "gray", top: "220px", left: "22px" }}>phone  </h6>  <span style={{ position: "absolute", left: "8%", top: "244px", fontWeight: "bold" }}> :</span><h6 style={{ position: "absolute", left: "9%", top: "220px" }}>{item.phone}</h6>
                            <h6 style={{ position: "absolute", fontWeight: "bolder", color: "gray", top: "250px", left: "22px" }}>university  </h6>  <span style={{ position: "absolute", left: "8%", top: "274px", fontWeight: "bold" }}> :</span><h6 style={{ position: "absolute", left: "9%", top: "250px"  }}>{item.uni}</h6>

                </div>
                
                {/* <h6 style={{ position: "relative", fontWeight: "bolder", top: "10%", left: "24%",fontFamily:"italic",fontWeight:"bold", borderBottom: "3px solid rgb(44, 135, 240)" }}>DESCRIPTION</h6> */}
                <caption id="example2" style={{padding:"10px",color:"black", border: "0px solid", wordBreak:"break-all", width: "1000px", height: "700px", position: "absolute", left: "25%", fontWeight: "bold", top: "9%" }}><h6 style={{display:"inline-block",}}><h5 style={{borderBottom:"3px solid rgb(44, 135, 240)",color:"black",fontFamily:"italic",fontWeight:"bolder", width:"150px"}}>DESCRIPTION</h5> <img src={item.url} id="immg" style={{verticalAlign:"text-bottom",marginLeft:"3%",width:"500px"}}/><br/>
                <br/>
                <h5 style={{borderBottom:"3px solid rgb(44, 135, 240)"}}><b>PROJECT ABSTRACT :</b></h5>
                   {item.discriptio}
    </h6></caption>


            </div>
                                 
                                

                            )
                        })

                    }

              
                
            </div>
        )
    }
}

