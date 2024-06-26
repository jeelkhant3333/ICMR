import React, { useState } from 'react'

function Checkbox({ CheckbobItems, name, h3, other, time, setFunction, StateValue, array }) {
    // console.log(name);
    const [otherSpecify , setOtherSpecify] = useState("");

    const handleChange = (event)=>{
        setOtherSpecify(event.target.value);
        array[0]=event.target.value;
    }

    const handleClick = (event) => {
        const { value } = event.target;
        if (array.includes(value)) {
            console.log(value);
            array = array.filter(item => {
                return item !== value
            })
        } else {
            array.push(value)
        }

        StateValue = {
            ...StateValue,
            [event.target.name]: array
        }
        setFunction(StateValue)
    }

    const handleCheckboxClick = ()=>{
        const otherSpecifyCheckBox = document.getElementById(`${name}otherSpecifyCheckBox`);
        if(otherSpecifyCheckBox.checked == true){
            console.log(otherSpecifyCheckBox.checked);
            document.getElementById(name).disabled = false;
        }else{
            setOtherSpecify("");
            array[0]="";
            document.getElementById(name).disabled = true;
        }
    }

    return (
        <>
            <div className='block'>
                <h3 className='h3block'>{h3}</h3>
                <form>
                    {
                        CheckbobItems.map((item, index) => {
                            return (
                                <div key={index} style={{ display: "flex", alignItems: "flex-start", marginBottom:"0.8vw" }}>

                                    {
                                        (array.includes(item)) ?
                                            <input onChange={handleClick} type="checkbox" id={item} name={name} value={item} checked />
                                            :
                                            <input onChange={handleClick} type="checkbox" id={item} name={name} value={item} />
                                    }

                                    <label style={{ fontSize:"1.1vw" ,fontWeight: "400", marginLeft: "0.25vw", color:"gray" }} htmlFor={item}>{item}</label>

                                    <br />
                                    {
                                        time &&
                                        <input type="time" className='blockinput others' />
                                    }

                                </div>
                            )
                        }

                        )


                    }
                    {
                        other &&
                        <>
                            <input id={`${name}otherSpecifyCheckBox`} onChange={handleCheckboxClick} value={otherSpecify} type="checkbox" name="checkbox" />
                            <span style={{fontSize : "1.1vw", color:"gray", paddingLeft:"0.2vw"}}>Other (Specify)</span>
                            <input
                                className='others blockinput' onChange={handleChange} type="text" name="otherSpecify" value={array[0]} id={name} disabled/>
                        </>

                    }
                </form>
            </div>

        </>
    )
}


export default Checkbox