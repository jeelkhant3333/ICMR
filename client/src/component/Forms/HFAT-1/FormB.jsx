import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Checkbox from '../child-comp/Checkbox';
import SidePanel from './SidePanelHFAT1';
import Buttons from '../child-comp/Buttons';
import Radio from '../child-comp/Radio';
import InputField from '../child-comp/InputField';
import { handleChange, turnOffbutton } from '../helpers';
import setLocalStorage from '../setLocalStorage';
import Heading from '../../Heading/Heading';

function FormB() {
  var formb = setLocalStorage("formb", { B1: "", B2: "", B3: "", B4: "", B5: "", B6: "", B7: "", B8: [], B9: "", B10: [], B11: [], B12: [""], B13: [], B14: "", B15: "" }
  )

  console.log("Hello");

  const [formB, setFormB] = useState(JSON.parse(formb));
  const [errors, setErrors] = useState({});

  turnOffbutton();

  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, []);

  useEffect(()=>{
    if(formB.B2 === "No"){
      setFormB({...formB, B3: "" , B4 : ""})
    }

    if(formB.B14 === "Yes"){
      setFormB({...formB, B15: ""})
    }
  } , [formB.B2 , formB.B14])

  const validateForm = () => {
    const newErrors = {};
    if (!formB.B1) newErrors.B1 = "This field is required";
    if (!formB.B2) newErrors.B2 = "This field is required";
    if (!formB.B3) newErrors.B3 = "This field is required";
    if (!formB.B4) newErrors.B4 = "This field is required";
    if (!formB.B5) newErrors.B5 = "This field is required";
    if (!formB.B6) newErrors.B6 = "This field is required";
    if (!formB.B7) newErrors.B7 = "This field is required";
    if (!formB.B8) newErrors.B8 = "This field is required";
    if (!formB.B9) newErrors.B9 = "This field is required";
    if (!formB.B14) newErrors.B14 = "This field is required";
    if (!formB.B15) newErrors.B15 = "This field is required";


    if (formB.B10.length === 0) newErrors.B10 = "Select at least one option";
    if (formB.B11.length === 0) newErrors.B11 = "Select at least one option";
    if (formB.B12.length === 0) newErrors.B12 = "Select at least one option";
    if (formB.B13.length === 0) newErrors.B13 = "Select at least one option";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <Heading h2="Health Facility Assessment Tool 1: District Hospital/Tertiary Care (Public or Private)"></Heading>
      <section>
        <SidePanel id={"2"} />
        <div className="siteInfo" data-aos="fade-left">

          <div className="formhdr">
            <div>
              <h3>
                1B. Infrastructure
              </h3>
            </div>
          </div>

          <div className="formcontent">

            <InputField name="B1" h3="1B.1 : How many beds are available for the in-patient department (IPD)?" value={formB.B1} onChange={handleChange(setFormB)} placeholder="Type here" required={true} errorMsg={errors.B1}/>

            <Radio h3="1B.2 : Whether any dedicated bed present for emergency care?" CheckbobItems={["Yes", "No"]} byDefault={formB.B2} onClick={handleChange(setFormB)} name="B2" />

            {
              (formB.B2 === "Yes") &&
              <>
                <InputField name="B3" onChange={handleChange(setFormB)} h3="1B.3 : How many beds are available for emergency care?" value={formB.B3} placeholder="Type here" required={true} errorMsg={errors.B3}/>

                <Radio h3="1B.4 : Number of Beds by Emergency Severity Index (ESI):" CheckbobItems={["Red", "Yellow", "Green"]} otherArray={[1, 1, 1]} setter={setFormB} name="B4" onClick={handleChange(setFormB)} byDefault={formB.B4} st={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid black', borderRadius: "0" }} />
              </>
            }

            <InputField name="B5" onChange={handleChange(setFormB)} h3="1B.5 : What is the average number of patients presenting to OPD per month?" value={formB.B5} placeholder="Type here" required={true} errorMsg={errors.B5} />

            <InputField name="B6" onChange={handleChange(setFormB)} value={formB.B6} p="(Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites, road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)" h3="1B.6 : What is the average number of patients presenting with emergency conditions daily?" placeholder="Type here" required={true}
              errorMsg={errors.B6} />

            <Radio h3="1B.7 : Does the facility have a licensed in-house blood bank?" onClick={handleChange(setFormB)} CheckbobItems={["Yes, it is available 24/7", "Yes, but it is not available 24/7", "No, but there is a tie up with external Blood bank facility  (Specify) ", "No"]} name="B7" otherArray={[0, 0, 1, 0]} byDefault={formB.B7} setter={setFormB} required={true}
              errorMsg={errors.B7}/>

            <Checkbox h3="1B.8 : Which of these does the blood bank have among the following?" CheckbobItems={["Component facility", "O -ve Blood availability"]} setFunction={setFormB} StateValue={formB} array={formB.B8}  name="B8" />

            <Radio h3="1B.9 : Is there a blood storage facility inside the emergency?" CheckbobItems={["Yes", "No"]} byDefault={formB.B9} onClick={handleChange(setFormB)} name="B9" />

            <Checkbox
              h3="1B.10 : Which of the following does your facility have to provide easy access for emergency care?"
              CheckbobItems={[
                "No vehicles parked on the way/in front of emergency department",
                "Designated parking area for Ambulance, Staff and Public",
                "Smooth entry area with adequate wheelchair, trolley and stretcher bay"
              ]}
              name="B10" setFunction={setFormB} StateValue={formB} array={formB.B10}               required={true}
              errorMsg={errors.B10}
            />

            <Checkbox
              h3="1B.11 : Which of the following demarcated/dedicated areas does this facility have for emergency care? (Select all that apply)"
              CheckbobItems={[
                "Decontamination Area at the Entrance of ED",
                "Hospital attendant at the entrance of hospital to help the patient with the wheelchair, stretcher, etc.",
                "Waiting area for patients/ attendants",
                "Police control room",
                "Emergency Registration Counter",
                "Department has proper layout and demarcated areas as per Triage.",
                "Demarcated station for doctors and nurses",
                "Demarcated plaster room",
                "Dedicated isolation rooms (Emergency Infections)",
                "Dedicated minor OT",
                "Provision for emergency OT",
                "Point of care lab (24x7)",
                "Demarcated duty room for doctors",
                "Demarcated duty room for nursing staff",
                "Ambulance driver’s room",
                "Dedicated LaQshya certified labor room",
                "Child-friendly service based on MusQan",
                "NABH Accreditation"
              ]}
              name="B11"
              setFunction={setFormB} StateValue={formB} array={formB.B11}
              required={true}
              errorMsg={errors.B11}
            />

            <Checkbox
              h3="1B.12 : Is there any display board of all the emergency services and entitlements available in its departments?"
              CheckbobItems={[
                "Services provided to the patients are clearly defined, displayed prominently.",
                "Names of doctor and nursing staff on duty are displayed and updated.",
                "List of available drugs are displayed.",
                "All relevant information is displayed for the patients and visitors including user charges wherever applicable at the time of procedure/ investigation/admission.",
                "Important contact numbers including ambulance, blood bank, police and referral centers displayed."
              ]}
              other={true}
              name="B12"
              setFunction={setFormB} StateValue={formB} array={formB.B12}
              required={true}
              errorMsg={errors.B12}
            />

            <Checkbox
              h3="1B.13 : Which of the following safety and security infrastructure/measures are in place at your hospital (Select all that apply):"
              CheckbobItems={[
                "Fire safety",
                "Building safety",
                "Electrical safety",
                "Patient and healthcare provider safety",
                "Chemical safety",
                "Periodic training of staff (Every 6 months)",
                "Periodic mock drill (Every 6 months)",
                "Police post available within the premises.",
                "Alarm bell in Emergency / Code announcement available for extra help.",
                "Disease outbreak management plan",
                "Surge capacity in your hospital"
              ]}
              name="B13"
              setFunction={setFormB} StateValue={formB} array={formB.B13}
              required={true}
              errorMsg={errors.B13}
            />

            <Radio
              h3="1B.14 : Does the hospital provide ambulance services?"
              CheckbobItems={["Yes", "No"]}
              name="B14" onClick={handleChange(setFormB)} byDefault={formB.B14}
            />

            {
              (formB.B14 === "No") && 
              <InputField name="B15" onChange={handleChange(setFormB)} h3="1B.15 : If ambulances are not there, how are patients transferred?" value={formB.B15} placeholder="Type here"               required={true}
              errorMsg={errors.B15} />
            }

            <Buttons formName={"formb"} formData={formB} prevText="Previous" nextText="Save & Next" prev="/healthfacilityinformation" next="/humanresources" validateForm={validateForm} />
            {Object.keys(errors).length > 0 && (
              <div className="error-msg">
                Please fill out all required fields before proceeding.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FormB