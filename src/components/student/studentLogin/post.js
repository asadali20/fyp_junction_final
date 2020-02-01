import React, { Component } from 'react'
// import {Form,Button, Jumbotron} from 'react-bootstrap';
import {Form,Row,Col, Button, Jumbotron,DropdownButton,Dropdown} from 'react-bootstrap';
import '../studentLogin/post.css';
import  firebase from  '../../../firebase';
import Header from '../../header/header';
import {NavDropdown,Nav,Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import {Navigation, Drawer} from 'react-mdl';


const db = firebase.firestore();
var auth = firebase.auth()
var provider = new firebase.auth.FacebookAuthProvider();


export default class Post extends Component {
    constructor(){
        super()
        this.state={
            cost:"",
            title:"",
            categoryies:"",
            idea:"",
            img:"",
            description:"",


        }
        this.saverecord=this.saverecord.bind(this)
    }

    handleChange = (e) =>
    {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({image: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }

      logout=()=>{
        // alert("logout")
         localStorage.clear();
         window.location.reload();
        
         
       }

      saverecord (){
        var date=new Date().toLocaleString();
        var image=this.state.img;
        var costs=this.state.cost
         var discriptio= this.state.description;
         var ideas = this.state.idea;
         var titles=this.state.title;
         var category=this.state.categoryies
         var uid=localStorage.getItem("uid")
         var uid1=uid+Math.random()
         var storage = firebase.storage();
         var storageRef = storage.ref();
         var name=localStorage.getItem("name")
         var phone=localStorage.getItem("phone")
         var uni=localStorage.getItem("uni")
         var imagesRef = storageRef.child('images/ads_'+ Math.random().toString().substring(2, 6) +'.jpg');
         var file = document.getElementById('imageId').files[0] // use the Blob or File API
         
         console.log(this.state.img, "image")
         console.log(uid1,"uid1")
         imagesRef.put(file)
         .then(function(snapshot) {
             console.log('Uploaded a blob or file!', snapshot);
             imagesRef.getDownloadURL().then(function(url) {
                 console.log(url)
                
                 db.collection('post').add({url,titles,discriptio,ideas,category,uid1,uid,date,name,uni,phone,costs})
                 .then(function(){
                     console.log("add added ")
                      alert("project posted successfully")
                    
                 }
                 ).catch(function(error)
                 {
                     console.log('error,error.message')
                 })
               }).catch(function(error) {
                 // Handle any errors
               });
         }).catch((e) => {
             console.log('bhai kuch masla hai', e)
         });
       
        //    db.collection("postproject").add({ titles,discriptio,ideas,category,image
        //    })
        //    .then(function(docRef) {
        //        console.log("Document written with ID: ", docRef.id);
        //        alert("your record has been saved")
        //    })
        //    .catch(function(error) {
        //        console.error("Error adding document: ", error);
        //    });
             }
            
    render() 
    {
        const{ discription,categoryies,img,title,idea}=this.state
        
        return (
            <div className='Post'>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">FYP Junction</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='ml-auto'>
                        <Nav.Link href="/studentLogin">Home</Nav.Link>
                      
                           
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {/* <input type="text" name="title" value={this.state.title}  onChange={this.handleChange}/> */}
                <div className="form">
                <Jumbotron>
                    <h4 style={{textAlign:"center"}}><b>Add Post</b></h4>
                <Form>
                    <Row>
                        <Col>
                        <Form.Group controlId="formGridAddress1">
                        <Form.Label className='address'><b>Project Title</b></Form.Label>
                        <Form.Control type='text' name='title'  onChange={this.handleChange}  onplaceholder="First name" />
                        </Form.Group>
                        </Col>
                        <Col>
                        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button"> */}
                        <Form.Group controlId="formGridAddress1">
                        <Form.Label className='address'><b>Project Category</b></Form.Label>
                        <div style={{marginTop:'0px'}} id="dropdown-basic-button">
                            <select type='select' name='categoryies' className="browser-default custom-select"   value={this.state.categoryies} onChange={this.handleChange}>
                            <option>Project Catygory</option>
                            <option value="computerscience">Computer science</option>
                            <option value="mechanical">Mechanical</option>
                            <option value="civil">Civil</option>
                            <option value="electical">Electrical</option>
                            </select>
                        </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formGridAddress1">
                    <Form.Label className='address'><b>Project Idea</b></Form.Label>
                    <Form.Control type='text' name='idea' value={this.state.idea} onChange={this.handleChange} placeholder="Project Idea" />
                    </Form.Group>
                    <Row>
                        {/* <div className='imput-file'>
                        <input type='file'/>
                        </div> */}
                    </Row>
                    <Row>
                    <Col>
                    <Form.Group controlId="formGridAddress1">
                    <Form.Label className='address'><b>Project Image</b></Form.Label>
                    <br/>
                    <input type="file" id="imageId" />
                    </Form.Group>
                    </Col>    
                    <Col>
                    <Form.Group controlId="formGridAddress1">
                    <Form.Label className='address'><b>Project Cost</b></Form.Label>
                    <Form.Control type='text' name='cost' value={this.state.cost} onChange={this.handleChange} placeholder="Project Idea" />
                    </Form.Group>
                    </Col>
                    </Row>
                    <Row >
                    <Form.Group controlId="exampleForm.ControlTextarea1" style={{padding:'10px'}}>
                    {/* <Form.Label>Example textarea</Form.Label> */}
                    <Form.Control type='textArea' name='description'  value={this.state.description} onChange={this.handleChange} as="textarea" rows="20" cols='1000'/>
                    </Form.Group>        
                    </Row>
                    <Row className='form-Row'>
                            <Col>
                             <Link to="/studentLogin">  <Button variant="primary" size="lg" block     onClick={this.saverecord}>Submit</Button>
                             </Link> 
                            </Col>
                        </Row>
                </Form>
                </Jumbotron>
                
                </div>
            </div>
        )
    }
}
