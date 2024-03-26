import { useState } from 'react';
import './Signup.css';
import SignUpImg from '../../assets/SignUp_Img.png';
import Google from './Google';
import Facebook from './Facebook';
import Apple from './Apple';
import axios from 'axios';
const url = "http://localhost:3000"





export default function SignUp() {
    const [getOTP, setgetOTP] = useState(false);
    const [verifyOTP, setverifyOTP] = useState(false);
    let [SignupData, setSignupData] = useState({
        Name: "",
        Username: "",
        Password: "",
    })

    let handleSignup = ((Event) => {
        console.log(SignupData);
        setSignupData((crrdata) => {
            return { ...crrdata, [Event.target.name]: Event.target.value }
        })

    })

    let SubmitsignupData = ((Event) => {
        console.log("Submited");
        console.log(SignupData)
        Event.preventDefault();
        setSignupData({
            Name: "",
            Username: "",
            Password: "",
        })
    })

    const handleGetOTP = (async (event) => {

        function ValidateEmail(input) {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (input.match(validRegex)) {
                return true;
            } else {
                alert("Invalid email address!");
                return false;
            }
        }

        var velidateEmail = ValidateEmail(SignupData.Username);

        event.preventDefault();
        if (!getOTP && velidateEmail) {
            console.log("clicked");
            try {
                const response = await axios.get(`${url}/getotp?email=${SignupData.Username}`);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
            setgetOTP(true);
        }else if(!velidateEmail){
            console.log(velidateEmail);
        }
    })

    return (
        <div className='signup_main'>
            <div className='signup_con'>
                <div className='signup_content'>
                    <div className='signuptitle'>
                        <h4>Sign Up</h4>
                    </div>
                    <div className='webimgsignup_con'>
                        <Google />
                        <Facebook />
                        <Apple />
                    </div>
                    <div>
                        <hr />
                    </div>
                    <div className='signup_form_con'>
                        <form>
                            <div className='signup_D'>
                                <div className='singup_label'>
                                    <label htmlFor='name'>Name</label>
                                </div>
                                <div>
                                    <input
                                        className='singup_input'
                                        type='text'
                                        id='name'
                                        name='Name'
                                        value={SignupData.Name}
                                        onChange={handleSignup}
                                        spellCheck={false}
                                    />
                                </div>
                            </div>
                            <div className='signup_D'>
                                <div className='singup_label'>
                                    <label htmlFor='username'>Email</label>
                                </div>
                                <div>
                                    <input
                                        className='singup_input'
                                        type='email'
                                        id='username'
                                        name='Username'
                                        value={SignupData.Username}
                                        onChange={handleSignup}
                                        spellCheck={false}
                                    />
                                </div>
                            </div>

                            {!getOTP && <div style={{
                                marginTop: "40px",
                            }} className='signup_button'>
                                <button onClick={handleGetOTP} style={{ cursor: "pointer" }}>Get OTP</button>
                            </div>}



                            {getOTP && <div className='signup_D'>
                                <div className='singup_label'>
                                    <label htmlFor='username'>Enter OTP</label>
                                </div>
                                <div>
                                    <input
                                        className='singup_input'
                                        type='email'
                                        id='username'
                                        name='Username'
                                        value={SignupData.Username}
                                        onChange={handleSignup}
                                        spellCheck={false}
                                    />
                                </div>
                            </div>}





                            {/* <div className='signup_D'>
                                <div className='singup_label'>
                                    <label htmlFor='password'>Password</label>
                                </div>
                                <div>
                                    <input
                                        className='singup_input'
                                        type='password'
                                        id='password'
                                        name='Password'
                                        value={SignupData.Password}
                                        onChange={handleSignup}
                                    />
                                </div>
                            </div> */}
                        </form>
                    </div>
                    {/* <div>
                        <hr />
                    </div>
                    <div className='condition_con'>
                        <div>
                            <input
                                type='checkbox'
                            />
                        </div>
                        <div>
                            <p> I agree with <a href='#'>Terms</a> and <a href='#'>Privacy</a> </p>
                        </div>
                    </div>
                    <div className='signup_button' onClick={SubmitsignupData}>
                        <button>Sign Up</button>
                    </div> */}
                    <div>
                        <hr />
                    </div>
                    <div className='signup_footer'>
                        <p>Already have an account?</p>
                        <p><a href='#'>Log in</a></p>
                    </div>

                </div>
            </div>
            <div className='signup_img'>
                <div>
                    <img src={SignUpImg} alt="SignUp" />
                </div>
            </div>
        </div>
    )
}