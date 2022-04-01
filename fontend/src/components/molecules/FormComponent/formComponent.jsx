import React from "react";
import Image_component from "../../atoms/Image/image";
import Buttons from "../../atoms/button/button";
import Input from "../../atoms/inputField/inputField";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import { BsExclamationSquareFill } from "react-icons/bs";
import {
  GrUserAdd
} from "react-icons/gr";
import {
  RiPassportLine,
  RiLockPasswordLine,
  RiLockPasswordFill,
} from "react-icons/md";
import { FaBeer } from "react-icons/ri";
import "./formComponent.scss";
const FormComponent = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [passport_no, setPassport_no] = useState("");
  const [email, setEmail] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");
  const [reTypeEmail, setReTypeEmail] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailMatched, setIsEmailMatched] = useState(false);
  const [isPassMatched, setIsPassMatched] = useState(false);
  const [responseData, setResponseData] = useState({
    __name: "",
    __surname: "",
    __email: "",
    __passport_no: "",
    __password: "",
    __reTypePassword: "",
    __reTypeEmail: "",
    __isPasswordMatched: "",
    __isEmailMatched: "",
  });
  const logo =
    "https://cdn1.iconfinder.com/data/icons/online-video-creation/64/upload_video_content_to_youtube_website-512.png";
  const endpoint = "http://localhost:5000/insert";
  const {
    __name,
    __surname,
    __email,
    __passport_no,
    __password,
    __reTypePassword,
    __reTypeEmail,
    __isPasswordMatched,
    __isEmailMatched,
  } = responseData;
  const SaveDataIntoDb = async (e) => {
    e.preventDefault();
    const form_data = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      passport_no: passport_no,
      reTypeEmail: reTypeEmail,
      reTypePassword: reTypePassword,
    };
    const isMatched_Email = email.localeCompare(reTypeEmail);
    const isMatched_Password = password.localeCompare(reTypePassword);
    if (isMatched_Email === 0 && isMatched_Password === 0) {
      await axios.post(endpoint, form_data).then((response) => {
        setResponseData({
          __name: response.data.__name,
          __surname: response.data.__surname,
          __email: response.data.__email,
          __passport_no: response.data.__passport_no,
          __password: response.data.__password,
          __reTypePassword: response.data.__reTypePassword,
          __reTypeEmail: response.data.__reTypeEmail,
          __isPasswordMatched: response.data.__isPasswordMatched,
          __isEmailMatched: response.data.__isEmailMatched,
        });
        setTimeout(() => {
          setResponseData({
            __name: "",
            __surname: "",
            __email: "",
            __passport_no: "",
            __password: "",
            __reTypePassword: "",
            __reTypeEmail: "",
            __isPasswordMatched: "",
            __isEmailMatched: "",
          });
        }, 3000);
        if(response.data.message==="inserted"){
          swal({
            title: "Congratulation!",
            text: "You have registered successfully",
            icon: "success",
            button: "OK",
          });
        }
     

        // window.alert("data inserted successfully");
        // navigate("/");
      });
    } else {
      if (isMatched_Email !== 0 && isMatched_Password !== 0) {
        setIsEmailMatched(true);
        setIsPassMatched(true);
        setTimeout(() => {
          setIsEmailMatched(false);
          setIsPassMatched(false);
        }, 3000);
      }
      if (isMatched_Password !== 0) {
        setIsPassMatched(true);
        setTimeout(() => {
          setIsPassMatched(false);
        }, 3000);
      }
      if (isMatched_Email !== 0) {
        setIsEmailMatched(true);
        setTimeout(() => {
          setIsEmailMatched(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="container">
      <form className="form-class" onSubmit={SaveDataIntoDb}>
        <div
        className="header"
        >
          Registration Form
        </div>

        <div className="tooltip">
          <Input
            type="text"
            value={name}
            placeholder="Enter your name"
            regex="[a-zA-Z][0-9\ w \[\]`!@#$%\^&*()={}:;<>+.']*"
            maxLength="15"
            minLength="5"
            id="name"
      
            onchange={(e) => {
              setName(e.target.value);
            }}
            label="Name"
            title="Name can't start with number or special char"
          />
          {__name ? (
            <span className="tooltipText">
              <span className="iconClass">
                <BsExclamationSquareFill />{" "}
              </span>
              <span className="textClass">{responseData.__name}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="tooltip">
          <Input
            type="text"
            value={surname}
            placeholder="Enter surname"
            onchange={(e) => setSurname(e.target.value)}
            label="Surname"
            regex="[a-zA-Z][0-9\ w \[\]`!@#$%\^&*()={}:;<>+.'-/]*"
            maxLength="15"
            id="surname"
            minLength="5"
            onchange={(e) => {
              setSurname(e.target.value);
            }}
            label="Sur Name"
            title="Surname can't start with number or special char"
          />
          {__surname ? (
            <span className="tooltipText">
              <span className="iconClass">
                <BsExclamationSquareFill fontSize="20px" />
              </span>
              <span className="textClass">{__surname}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="tooltip">
          <Input
            type="text"
            value={email}
            placeholder="Enter your email"
            id="email"
            onchange={(e) => setEmail(e.target.value)}
            regex="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
            title="Please include an @ or . in email address"
            label="Email"
          />
          {__email ? (
            <span className="tooltipText">
              <span className="iconClass">
                <BsExclamationSquareFill />{" "}
              </span>
              <span className="textClass">{__email}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="tooltip">
          <Input
            type="text"
            value={reTypeEmail}
            placeholder="Re-type your email"
            regex="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
            title="Please include an @ or . in email address"
            onchange={(e) => setReTypeEmail(e.target.value)}
            label="Re-type Email"
          />
          {__reTypeEmail || __isEmailMatched || isEmailMatched ? (
            <span className="tooltipText">
              <span className="iconClass">
                <BsExclamationSquareFill />{" "}
              </span>
              <span className="textClass">{`${__reTypeEmail} ${
                __isEmailMatched ? __isEmailMatched : ""
              }${
                isEmailMatched ? "email and confirm email must be same" : ""
              }`}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="tooltip">
          <Input
            type="text"
            value={passport_no}
            placeholder="Enter your passport no"
            regex="^[a-zA-Z0-9]*$"
            maxLength="15"
            minLength="5"
            title="Special characters are not allowed"
            onchange={(e) => setPassport_no(e.target.value)}
            label="Passport No"
          />
          {__passport_no ? (
            <span className="tooltipText">
              <span className="iconClass">
                <BsExclamationSquareFill />{" "}
              </span>
              <span className="textClass">{__passport_no}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="tooltip">
          <Input
            type="password"
            value={password}
            id="password"
            placeholder="Enter your password"
            onchange={(e) => setPassword(e.target.value)}
            regex="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{4,}$"
            maxLength="20"
            minLength="8"
            title="Password must containt at least 1 lower and upper case letter,number and special character"
            label="Password"
          />
          {__password ? (
            <span className="tooltipText">
              <span className="iconClass">
                <BsExclamationSquareFill />{" "}
              </span>
              <span className="textClass">{__password}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="tooltip">
          <Input
            type="password"
            value={reTypePassword}
            placeholder="Re-type your passoword"
            onchange={(e) => setReTypePassword(e.target.value)}
            regex="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{4,}$"
            maxLength="20"
            minLength="8"
            title="Password must containt at least 1 lower and upper case letter,number and special character"
            label="Re-type Password"
          />
          {__reTypePassword || __isPasswordMatched || isPassMatched ? (
            <span className="tooltipText">
              <span className="iconClass">
                <BsExclamationSquareFill />{" "}
              </span>
              <span className="textClass">{`${__reTypePassword}${
                __isPasswordMatched ? __isPasswordMatched : ""
              }${
                isPassMatched
                  ? "password and confirm password must be same"
                  : ""
              }`}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <br></br>
        <Buttons label="Submit" Class="btn" id="btn" type="submit" />
      </form>
    </div>
  );
};

export default FormComponent;
