import React, { Component } from 'react'
import {Form,Row,Col, Button, Jumbotron, FormGroup} from 'react-bootstrap';
import '../studentSignup/studentSignup.css';
import  firebase from  '../../../firebase';
import Header from '../../header/header';
import {Link} from 'react-router-dom';

const db= firebase.firestore();
var auth = firebase.auth()
var provider = new firebase.auth.FacebookAuthProvider();

class StudentSignup extends Component {

    state={ 
        firstName: '' ,
        lastName: '',
        userName: '',
        password: '',
        emails: '',
        Phone: '',
        universityName: '',
        addmisionYear: '',
        State: '',
        City: '',
        
        };
    
    handleChange = (e) =>
    {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    }

    signup = () => 
    {
    //   const {loginEmail,loginPassword,username,usersignup,usersignin,geterror} = this.state
    const {firstName,lastName , emails, password,userName, Phone, universityName, addmisionYear, State, City} = this.state
      var email= this.state.emails
      var pwd = this.state.password  
      var fname=this.state.firstName
      var lname=this.state.lastName
      var uname=this.state.userName
      var phone=this.state.Phone
      var uniname=this.state.universityName
      var addyear=this.state.addmisionYear
      var state=this.state.State
      var city=this.state.City

    //   var addr=this.state.username
    //   var nic=this.state.username
    //   var pnum=this.state.username
    //   var xy = document.getElementById("myEmail1").pattern;
    //   var y=document.getElementById("myEmail1").value
    //   var x="@a.com"
    //   var res11=y.match(xy)
    //   console.log("text ha innae",y)
    //   console.log("xxxx",x)
      
        firebase.auth().createUserWithEmailAndPassword(email, pwd)
      .then(function(res) {
          alert('Registered Successfully!');
         
          console.log('res =>', res.user.uid);
          var uids= res.user.uid
          db.collection('student').doc(res.user.uid).set({email,uids,fname,lname,uname,phone,uniname,addyear,state,city})
          .then(() => {
              console.log('Added in db');
             
              
      
           
           })
           .catch((e) => {
               console.log('error Adding in db');
           })
      })
      .catch(function(error) {
           //Handle Errors here.
           var errorCode = error.code;
           var errorMessage = error.message;
           console.log(errorMessage);
           alert(errorMessage)
          
        });
       
       
    }
    
   

    render() {
        return (
            <div className='signup-form'>
                <Header/>
                <h1>Student SignUp Form</h1>
                <div className="text-left pt-3 form-Content">
                    <Jumbotron>
                    <Form>
                        <Row className='form-Row'>
                            <Col>
                            <FormGroup>
                            <Form.Label className='fName'><b>First Name</b></Form.Label>
                                <Form.Control size='lg' type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange}  placeholder="First name" required />
                            </FormGroup>
                            </Col>
                            <Col>
                            <Form.Label className='lName'><b>Last Name</b></Form.Label>
                                <Form.Control size='lg' type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange}  placeholder="Last name" />
                            </Col>
                        </Row>
                        <Row className='form-Row'>
                            <Col>
                            <Form.Label className='UName'><b>User Name</b></Form.Label>
                                <Form.Control size='lg' type='text' name='userName' value={this.state.userName} onChange={this.handleChange}  placeholder="UserName" />
                            </Col>
                            <Col>
                            <Form.Label className='pass'><b>Password</b></Form.Label>
                                <Form.Control size='lg' type='password' name='password' value={this.state.password} onChange={this.handleChange}  placeholder="Password" />
                            </Col>
                        </Row>

                        <Row className='form-Row'>
                            <Col>
                            <Form.Label className='email'><b>email</b></Form.Label>
                                <Form.Control size='lg' type='email' name='emails' value={this.state.emails} onChange={this.handleChange}  placeholder="Email" />
                            </Col>
                            <Col>
                            <Form.Label className='Phone'><b>Phone</b></Form.Label>
                                <Form.Control size='lg' type='text' name='Phone' value={this.state.phone} onChange={this.handleChange}  placeholder="Phone" />
                            </Col>
                        </Row>

                        <Row className='form-Row'>
                            <Col>
                            <Form.Label className='UniName'><b>University Name</b></Form.Label>
                                <Form.Control size='lg' type='text' name='universityName' value={this.state.universityName} onChange={this.handleChange}  placeholder="University Name" />
                            </Col>
                            <Col>
                            <Form.Label className='adddate'><b>Addmission Year</b></Form.Label>
                                <Form.Control size='lg' type='date' name='addmisionYear' value={this.state.addmisionYear} onChange={this.handleChange}  placeholder="Addmission Date" />
                            </Col>
                        </Row>

                        <Row className='form-Row'>
                            <Col>
                            <Form.Label className='State'><b>State</b></Form.Label>
                                <Form.Control size='lg' type='text' name='State' value={this.state.state} onChange={this.handleChange}  placeholder="State" />
                            </Col>
                            <Col>
                            <Form.Label className='City'><b>City</b></Form.Label>
                                <Form.Control size='lg' type='text' name='City' value={this.state.city} onChange={this.handleChange}  placeholder="City" />
                            </Col>
                        </Row>

                        <Row className='form-Row'>
                            <Col>
                            <Link to="/studentLogin"><Button variant="primary" size="lg" block     onClick={this.signup}>Submit</Button>
                           </Link>
                            </Col>
                        </Row>
                        <Row className='form-Row'>
                            <Col>
                            Already have an Account ?   <Link to="/studentLogin">   <a  style={{textDecoration:'Underline' , color:'blue'}}href="#">SignIn</a>
                           </Link>
                            </Col>
                        </Row>
                    </Form>
                    </Jumbotron>
                </div>     
                <div style={{color:'white'}} className="footer-copyright text-center py-3">© 2020 Copyright
          <a style={{color:'white'}} href=""> FYP-JUNCTION</a>
        </div>
            </div>
        );
    }
}

export default StudentSignup ;