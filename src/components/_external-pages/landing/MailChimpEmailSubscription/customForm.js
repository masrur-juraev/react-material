import {Button,TextField} from "@material-ui/core";
import './customForm.scss'

const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
        email &&
        onValidated({
            EMAIL: email.value,
        });

    return (
        <center>
        <div align="center" className="customForm">
            {status === "sending" && <div className="customFormSending">sending...</div>}
            {status === "error" && (
                <div align="center" className="customFormError"
                     dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div align="center" className="customFormSuccess"
                     dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
<p align="center">
    <TextField className="customInput"
               inputProps={{ref:node=>(email = node)}}
           type="email"
           tabIndex="1"
           size="large"
           placeholder="Please enter your email here"
           color='primary'

    />
            <Button variant="contained" size="large" onClick={submit}>
                Subscribe
            </Button>
</p>

        </div>
        </center>
    );
};

export default CustomForm