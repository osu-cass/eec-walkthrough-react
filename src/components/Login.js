import React, {useState} from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './Login.css';

const Login = (props) => {
    return (
        <div className='login'>
            {/* Login Button */}
            <button className='btn btn-success ml-5' type='button' data-toggle="modal" data-target="#loginModal">Login</button>
            
            {/* Login Modal */}
            <div className="modal fade" tabIndex="-1" role="dialog" id='loginModal'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Form>
                                <Form.Group>
                                    <Form.Label className="mr-2">Username</Form.Label>
                                    <Form.Control type="username" id="username" placeholder="Enter username"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="mr-2">Password</Form.Label>
                                    <Form.Control type="password" id="password" placeholder="Enter password"/>
                                </Form.Group>
                            </Form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-success" name="login" value="login">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

