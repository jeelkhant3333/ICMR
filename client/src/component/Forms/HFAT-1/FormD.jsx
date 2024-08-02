import React ,{ useEffect }from 'react'
import SidePanel from './SidePanelHFAT1';
import Buttons from '../child-comp/Buttons';
import Checkbox from '../child-comp/Checkbox';
import { useState } from 'react';
import setLocalStorage from '../setLocalStorage';
import { turnOffbutton } from '../helpers';
import Heading from '../../Heading/Heading';
import AOS from 'aos'
import 'aos/dist/aos.css'

function FormD() {

  // --toggle--
  const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth > 1024);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const handleResize = () => {
    if (window.innerWidth >= 1025) {
      setSidebarVisible(true);
    }
  };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  // --toggle end--

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    AOS.init({ duration: 2000 })
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  turnOffbutton();

  var formd = setLocalStorage("formd",
   {H1D1:[]})

  const [formD, setFormD] = useState(JSON.parse(formd));
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    if (formD.H1D1.filter(item => item !== "").length === 0) {
        setFormError("Select at least one drug option");
        return false;
    }
    setFormError("");
    return true;
};

  return (
    <div>
      <div className="header">
        <div className="burger-menu" onClick={toggleSidebar}>
          &#9776;
        </div>
        <Heading h2="Health Facility Assessment Tool 1: District Hospital/Tertiary Care (Public or Private)"></Heading>
      </div>
      <section className="form-main">
        {isSidebarVisible && (
          <>
            <SidePanel id={"4"} />
            <div className="grayedover" onClick={toggleSidebar}></div>
          </>
        )}
       {/* <SidePanel id={"4"} /> */}
        <div className="siteInfo" data-aos="fade-left">

          <div className="formhdr">
            <div>
              <h3>
                1D. Logistics (Drugs/ Consumables/ Equipment)
              </h3>
            </div>
          </div>

          <div className="formcontent">
            <h3>1D.1 : Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital?
              (Multiple answers possible)?</h3>
              <h3>Drug Name:</h3>

            <Checkbox  setFunction={setFormD} StateValue={formD} array={formD.H1D1}  name="H1D1" CheckbobItems={["Oxygen medicinal gas","Atropine","Diazepam/Lorazepam","Adrenaline","Charcoal activated","Antisnake venom","Pralidoxime (PAM)","Magnesium sulphate","Tetanus immunoglobulin","Neostigmine","Aspirin","Clopidogrel","Atorvastatin","Misoprostol","Labetalol IV","Phenobarbitone","Phenytoin (inj)","Plasma volume expander","3% Saline","Dobutamine","Streptokinase","Tenecteplase","Oxytocin","Salbutamol sulphate","Glucose/ 25 % dextrose","Tranexamic acid","tPA IV","Methergine","Carboprost"]}                             required={true}
                              errorMsg="Select at least one drug"
                              // other={true}
                              />
            
            {formError && <p className="error-msg">{formError}</p>}
            <Buttons formName="formd" formData={formD} prevText="Previous" nextText="Save & Next" prev="/humanresources" next="/logisticsdrugsconsumablesequipment-2" validateForm={validateForm} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default FormD