import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import apiClient from "../../../utils/api";
import {FormControl} from "@material-ui/core";
import useAuth from "../../../hooks/useAuth";
import api from "../../../utils/api";



export default function EmailPage() {
    const [email, setEmail] = useState('abc@ECS.com');


    const sendEmail=async()=>{
        try {
            const response = await api.post('/machine/dimensions/email/', email);
            console.log(response)
        }
        catch (e) {

        }


    }
    function handleChange(e) {
        let inputValue = e.target.value;


        let isEmpty = inputValue === '';

        if (isEmpty) {
            console.log('Update value to: ' + inputValue);
            setEmail(inputValue);
        }
    }

    return (
        <p align="center">
        <FormControl  autoComplete="off">
                    <TextField
                        id='email'
                        label="enter your email here"
                        name="email"
                        type="email"
                        onChange={handleChange}
                    />
                <Grid item xs={12} sm={12} md={12}>
                    <Button  variant="contained" color="primary" onClick={sendEmail}>
                        Submit
                    </Button>
                </Grid>
        </FormControl>
        </p>
    );
}
