import React, { Component } from 'react';
import {Form, ButtonToolbar, Button, Jumbotron,Row,Col} from 'react-bootstrap';
import '../studentLogin/studentLogin.css';
import  firebase from '../../../firebase';
import { thisExpression } from '@babel/types';
import Studashbord from "./studashbord";
import Header from '../../header/header';
import {Link} from 'react-router-dom';

const db= firebase.firestore();
var auth = firebase.auth()
var provider = new firebase.auth.FacebookAuthProvider();
var a;
var b;

class studentLogin extends Component {

    state=
    {
        email: '',
        password: '',
        stsigin :true,
        stdash: false

        
    };

    handleChange = (e) =>
    {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    }  

    signin =  () => {
        
        const {email , password, stdash,stsigin } = this.state
          var mail=this.state.email
          var pass=this.state.password
         
      
          
            firebase.auth().signInWithEmailAndPassword(mail,pass)
        .then((res)=>{
            console.log("asad",res.user.uid )
            db.collection('student').where("uids","==",res.user.uid).get().then( (querysnapshot) =>{


                    querysnapshot.forEach((doc)=> {
                        
                        console.log(doc.data().uids , "qqqqqqqqqqqqq")
                        if(doc.data().uids===res.user.uid){
                            localStorage.setItem("uid" ,res.user.uid  )
                            localStorage.setItem("name" , doc.data().uname )
                            localStorage.setItem("uni" ,  doc.data().uniname )
                            localStorage.setItem("phone" , doc.data().phone )
                            this.setState({
                                stsigin: false,
                                stdash: true 
                             })
                            
                            
                
                           }
                          
                           
                           else{
                               alert("not ok")
                            document.getElementById("p1").innerHTML="No record found!!!!";  
                            document.getElementById("p1").style.color="red"
                               
                           }
                          
                    
                    })
                                
             
                })

           
                localStorage.setItem("usersignin", this.state.stsigin)
                localStorage.setItem("usersignup", this.state.stdash)
       
               
        } )
    
        .catch((e) => {
            alert('NO RECORD FOUND',e);
        })
        
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
        });  

        
        
      }

      componentDidMount()
      {
        const{stdash , stsigin}= this.state
       
        if(a=='true' &&  b=='false')
  {
    a=true;
    b=false
    this.setState({
        stdash:a,
        stsigin:b
    })

  }
console.log(this.state.stdash,this.state.stsigin,"ifffffffffffff")
   
      }

      rendersigin=()=>{
        return (
            <div className='Student-login'>
                <Header/>
                <h2 className='welcome'>Welcome</h2>
                <h1 className='font-weight-bold'>FYP Junction</h1>
                <div className='Login-form'>
                <Jumbotron>
                <Form>
                    {/* <h1 className='font-weight-bold'>FYP Junction.com</h1> */}
                    {/* <h2 className='welcome'>Welcome</h2> */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><b>Email address</b></Form.Label>
                        <Form.Control type="email" size='lg' placeholder="Enter email" name='email' value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control type="password" size='lg' placeholder="Password" name='password' value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>

                    <ButtonToolbar>
                        <Button variant="primary" size="md" block   onClick={this.signin}>Login</Button>
                    </ButtonToolbar>
                    <Row className='form-Row'>
                            <Col>
                            Don't have an Account ?   <Link to="/StudentSignup">   <a  style={{textDecoration:'Underline' , color:'blue'}}href="#">SignIn</a>
                           </Link>
                            </Col>
                        </Row>
                    {/* <div className='text-center pt-3'>
                        Or cintinue with your google account
                    </div> */}
                    <p id="p1"></p>
                </Form>
                </Jumbotron>
                </div>
                <div style={{color:'white'}} className="footer-copyright text-center py-3">© 2020 Copyright
          <a style={{color:'white'}} href=""> FYP-JUNCTION</a>
        </div>
  </div>
        )
      }
        

    render() {
        const{stdash , stsigin}= this.state
       a=localStorage.getItem("usersignin")
         b=localStorage.getItem("usersignup")
      return(
          <div>
              {!stdash && stsigin && <this.rendersigin /> }
              { stdash && !stsigin &&  <Studashbord />}

          </div>
      )
    }
}

export default studentLogin;