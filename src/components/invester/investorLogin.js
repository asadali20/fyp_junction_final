// import React, { Component } from 'react'
// import {Form, ButtonToolbar, Button, Jumbotron} from 'react-bootstrap';
// import './investerlogin.css';
// import Header from '../header/header';

// export default class investorLogin extends Component {
    
//     state=
//     {
//         email: '',
//         password: '',
//         insigin :false,
//         indash: true

        
//     };

//     handleChange = (e) =>
//     {
//         console.log(e.target.name);
//         this.setState({[e.target.name]: e.target.value});
//     }

//     rendersigin=()=>{

//         return (
//             <div>
//                 <div className='invester-login'>
//                     <Header/>
//                 <h2 className='welcome'>Welcome</h2>
//                 <h1 className='font-weight-bold'>FYP Junction.com</h1>
//                 <div className='Login-form'>
//                 <Jumbotron>
//                 <Form>
//                     {/* <h1 className='font-weight-bold'>FYP Junction.com</h1> */}
//                     {/* <h2 className='welcome'>Welcome</h2> */}
//                     <Form.Group controlId="formBasicEmail">
//                         <Form.Label><b>Email address</b></Form.Label>
//                         <Form.Control type="email" size='lg' placeholder="Enter email" name='email' value={this.state.email} onChange={this.handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="formBasicPassword">
//                         <Form.Label><b>Password</b></Form.Label>
//                         <Form.Control type="password" size='lg' placeholder="Password" name='password' value={this.state.password} onChange={this.handleChange} />
//                     </Form.Group>

//                     <ButtonToolbar>
//                         <Button variant="primary" size="md" block   onClick={this.signin}>Login</Button>
//                     </ButtonToolbar>

//                     <div className='text-center pt-3'>
//                         Or cintinue with your google account
//                     </div>
//                 </Form>
//                 </Jumbotron>
//                 </div>
//                 </div>
//             </div>
//         )
//     }
// }


import React, { Component } from 'react';
import {Form, ButtonToolbar, Button, Jumbotron,Row,Col} from 'react-bootstrap';
// import '../studentLogin/studentLogin.css';
import  firebase from '../../firebase';
import { thisExpression } from '@babel/types';
// import Studashbord from "./studashbord"
import InvestorDashboard from './investorDasboard';
import Header from '../header/header';
import {Link} from 'react-router-dom';

const db= firebase.firestore();
var auth = firebase.auth()
var provider = new firebase.auth.FacebookAuthProvider();
var a;
var b;

class InvestorLogin extends Component {

    state=
    {
        email: '',
        password: '',
        insigin :true,
        indash: false

        
    };

    handleChange = (e) =>
    {
        console.log(e.target.name);
        this.setState({[e.target.name]: e.target.value});
    }  

    signin =  () => {
        
        const {email , password, indash,insigin } = this.state
          var mail=this.state.email
          var pass=this.state.password
         
      
          
            firebase.auth().signInWithEmailAndPassword(mail,pass)
        .then((res)=>{
            console.log("asad",res.user.uid )
            db.collection('invester').where("uids","==",res.user.uid).get().then( (querysnapshot) =>{


                    querysnapshot.forEach((doc)=> {
                        
                        console.log(doc.data().uids , "qqqqqqqqqqqqq")
                        
                        if(doc.data().uids===res.user.uid){
                          
                            this.setState({
                                insigin: false,
                                indash: true 
                             })
                            
                             localStorage.setItem("uid" ,res.user.uid  )
                             localStorage.setItem("namesss" , doc.data().uname )
                
                           }
                          
                           
                           else{
                               alert("not ok")
                            document.getElementById("p1").innerHTML="No record found!!!!";  
                            document.getElementById("p1").style.color="red"
                               
                           }
                          
                    
                    })
                                
             
                })

           
                localStorage.setItem("insignin", this.state.insigin)
                localStorage.setItem("insignup", this.state.indash)

                window.location.reload()
       
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
        const{indash , insigin}= this.state
       
        if(a=='true' &&  b=='false')
  {
    a=true;
    b=false
    this.setState({
        indash:a,
        insigin:b
    })

  }
console.log(this.state.indash,this.state.insigin,"ifffffffffffff")
   
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
                            Don't have an Account ?   <Link to="/InvesterSignup">   <a  style={{textDecoration:'Underline' , color:'blue'}}href="#">SignUp</a>
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
        const{indash , insigin}= this.state
        a=localStorage.getItem("insignin")
        b=localStorage.getItem("insignup")
      return(
          <div>
              {!indash && insigin && <this.rendersigin /> }
              { indash && !insigin &&  <InvestorDashboard />}

          </div>
      )
    }
}

export default InvestorLogin;






// db.collection('Investor').get().then(function (querysnapshot) {
//     querysnapshot.forEach(function (doc) {
        
//         localStorage.setItem("a",doc.data().a )
//     })
  

// })
// b=localStorage.setItem("a")
//   if(b ==="invester")
//     {
//      this.setState({
//          insigin: false,
//          indash: true 
//       })
     
//     }
//     else
//     {
//      document.getElementById("p1").innerHTML="Account not found!!";
//      document.getElementById("p1").style.color="red"
//      document.getElementById("p1").style.fontsize="15px"

//     } 