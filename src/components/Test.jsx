import React, { Component } from "react";
import {PostData} from '../services/PostData';
import axios from "axios";
import md5 from "md5";

const BaseURL = `http://pipipol.btoz.co.id`;

class Test extends Component {

    constructor(props){
        super(props);
       
        this.state = {
            username: 'silver.perak',
            idVoucher: 16,
        };
        this.submitTestRedeem = this.submitTestRedeem.bind(this);
        this.submitTestChangePassword = this.submitTestChangePassword.bind(this);
    }

    submitTestRedeem() {

        const dataForSubmit = this.state
        console.log(dataForSubmit)
        
        if(this.state.username && this.state.idVoucher){
            PostData('redeem', dataForSubmit)
                .then((result) => {
                let responseJson = result;
                if(responseJson){
                    // console.log("success")
                }
                else{
                    console.log("error")
                }
            });
        }
    }

    submitTestChangePassword() {

        let passwordOld = md5("tester12");
        let passwordNew = md5("tester12new");

        let dataForSubmit = { 'username':'tester12', 'oldPassword': passwordOld, 'newPassword': passwordNew }

        console.log(dataForSubmit)
        
        const AUTH_TOKEN = localStorage.getItem("id_token");

        axios
        .post(`http://pipipol.btoz.co.id/api/changePassword`, dataForSubmit,{
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Cache-Control': 'no-cache',
            'x-access-token': AUTH_TOKEN
            }
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            <div>
                <button onClick={this.submitTestRedeem} type="submit" className="btn btn-lg btn-danger w-100 mt-3 mb-3">Submit Test Redeem</button>
                <button onClick={this.submitTestChangePassword} type="submit" className="btn btn-lg btn-danger w-100 mt-3 mb-3">Submit Test Change Password</button>
            </div>
        )
    }
}
export default Test;