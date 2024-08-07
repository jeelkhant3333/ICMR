import React, { useEffect, useMemo, useState } from 'react'
import Checkbox from '../child-comp/Checkbox';
import SidePanel from './SidePanelHFAT3';
import Buttons from '../child-comp/Buttons';
import Radio from '../child-comp/Radio';
import InputField from '../child-comp/InputField';
import { handleChange, turnOffbutton } from '../helpers';
import setLocalStorage from '../setLocalStorage';
import Heading from '../../Heading/Heading.jsx';
import LocationButton from '../child-comp/Location.jsx';
import DropDown from "../child-comp/DropDown.jsx"
import { GJBRC_DH, MPBHS_DH, ORPUR_DH, PBLDH_DH, PYPDY_DH } from '../BlockItem/blockList.js';
function Form3A() {
  turnOffbutton();

  var form3a = setLocalStorage("form3a", {
    H3A1: "",
    H3A2: "",
    H3A3: "",
    H3A4: "",
    H3A5: "",
    H3A6: "",
    H3A7: "",
    H3A8: "",
    H3A9: "",
    H3A10: "",
    H3A11: "",
    HFAT3_DATE:""
  });

  const [form3A, setForm3A] = useState(JSON.parse(form3a));

  const date = new Date();

  useEffect(() => {
    setForm3A((prevValue) => {
      return {
        ...prevValue,
        HFAT3_DATE: (form3A.HFAT3_DATE == "") ? `${date.toDateString()}  ${date.getHours()}:${date.getMinutes()}` : form3A.HFAT3_DATE,
      }
    })
  }, [])

  const dropdownItems = useMemo(() => {
    switch (form3A.H3A2) {
      case "GJBRC_CS":
        return GJBRC_DH;
      case "ORPUR_CS":
        return ORPUR_DH;
      case "MPBHS_CS":
        return MPBHS_DH;
      case "PBLDH_CS":
        return PBLDH_DH;
      case "PYPDY_CS":
        return PYPDY_DH;
      default:
        return [];
    }
  }, [form3A.H3A2]);
  return (
    <div>
      <Heading h2="Health Facility Assessment Tool 3: Primary Health Centre"></Heading>
      <section>
        <SidePanel id={"1"} />
        <div className="siteInfo">
          <div className="formhdr">
            <div>
              <h3>3A. Facility Information</h3>
            </div>
          </div>

          <div className="formcontent">
            <InputField
              value={form3A.H3A1}
              onChange={handleChange(setForm3A)}
              name="H3A1"
              h3="3A.1 : Assessor’s Name:"
              placeholder="Type here"
            />

            <div>
              <p className="datetime">
                {
                  form3A.HFAT3_DATE
                }
              </p>
            </div>

            <Radio
              byDefault={form3A.H3A2}
              onClick={handleChange(setForm3A)}
              name="H3A2"
              h3="3A.2 : State :"
              CheckbobItems={[
                "GJBRC_CS",
                "ORPUR_CS",
                "MPBHS_CS",
                "PBLDH_CS",
                "PYPDY_CS",
              ]}
            />

            {/* <InputField value={form3A.H3A3} onChange={handleChange(setForm3A)} name="H3A3" h3="3A.3 : Block Name :" placeholder="Type here" /> */}
            <DropDown dropdownItems={dropdownItems} name="H3A3" h3="3A.3 : Block Name :" onClick={handleChange(setForm3A)} byDefault={form3A.H3A3}   />

            <InputField
              value={form3A.H3A4}
              onChange={handleChange(setForm3A)}
              name="H3A4"
              h3="3A.4 : Healthcare Facility Name :"
              placeholder="Type here"
            />

            <InputField
              value={form3A.H3A5}
              onChange={handleChange(setForm3A)}
              name="H3A5"
              h3="3A.5 : Healthcare Facility Address :"
              placeholder="Type here"
            />

            <InputField
              value={form3A.H3A6}
              onChange={handleChange(setForm3A)}
              name="H3A6"
              h3="3A.6 : Name of the Medical Officer :"
              placeholder="Type here"
            />

            <InputField
              value={form3A.H3A7}
              onChange={handleChange(setForm3A)}
              name="H3A7"
              h3="3A.7 : Contact Number of Medical Officer :"
              placeholder="Type here"
            />

            <InputField
              value={form3A.H3A8}
              onChange={handleChange(setForm3A)}
              name="H3A8"
              h3="3A.8 : Email ID :"
              placeholder="Type here"
            />

            {/* <InputField value={form3A.H3A9} onChange={handleChange(setForm3A)} name="H3A9" h3="3A.9 : GPS Coordinates :" placeholder="Type here" /> */}
            <LocationButton setter={setForm3A} name="H3A9" heading={"3A.9"} />

            <Radio
              byDefault={form3A.H3A10}
              onClick={handleChange(setForm3A)}
              name="H3A10"
              h3="3A.10 : What type of Health care facility is this?"
              CheckbobItems={[
                "HWC-PHC",
                " Urban HWC-PHC",
                "Specialist UPHC/Polyclinic",
              ]}
            />

            <Radio
              byDefault={form3A.H3A11}
              onClick={handleChange(setForm3A)}
              name="H3A11"
              h3="3A.11 : The facility is coming under : "
              CheckbobItems={["Urban", "Rural"]}
            />

            <Buttons
              formName="form3a"
              formData={form3A}
              prevText=""
              nextText="Save & Next"
              prev=""
              next="/infrastructure-3"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Form3A;
