import React, { useState ,useEffect} from 'react'
import './ServiceForm.css'
// import './App.css';
const ServiceForm = ({ onSubmit, serviceToEdit, onCancel }) => {
    const [service,setService]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [errors,setErrors]=useState({})

    useEffect(()=>{
        if(serviceToEdit){
            setService(serviceToEdit.service)
            setDescription(serviceToEdit.description)
            setPrice(serviceToEdit.price)
        }
    },[serviceToEdit])



    const validate=()=>{
        const newErrors={}
        if (!service.trim()){
            newErrors.service='Name is required!'
        }
        if(!description.trim()){
            newErrors.description='Description is required!'
        }
        if(!price){
            newErrors.price='Price field is required'
        }
        setErrors(newErrors)
        if(Object.keys(newErrors).length === 0){
            return true
        }
        else{
            return false
        }

    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!validate()) return;

        const serviceData = {
            id: serviceToEdit? serviceToEdit.id : Date.now(),
            service,
            description,
            price
        }
        onSubmit(serviceData)
        // if(!serviceToEdit){
        //     setService('')
        //     setDescription('')
        //     setPrice('')
        // }
        setService('')
        setDescription('')
        setPrice('')


    }
const handleCancel=()=>{
        setService('')
        setDescription('')
        setPrice('')
        onCancel()
}
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='name form-group'>
                <label htmlFor="servicename">
                    Service:
                </label>
                <input 
                id="servicename"
                type="text"
                className={`form-inp ${(errors.service) && 'input-err' } `}
                value={service}
                onChange={(e)=>setService(e.target.value)}
                placeholder='Enter Name of the Service'
                
                 />
                 {errors.service && <div className='err-msg'>{errors.service} </div> }

            </div>
            <div className='desc form-group'>
                <label htmlFor="description">
                    Description:
                </label>
                <textarea
                id="description"
            
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder='Enter Description'
                className={`form-inp ${(errors.description) && 'input-err' } `}
                 ></textarea>
                {errors.description && <div className='err-msg'>{errors.description} </div> }

            </div>
            <div className='cost form-group'>
                <label htmlFor="price">
                    Price(₹):
                </label>
                <input 
                id="price"
                type="number"
                value={price}
                min="0"
                step="0.1"
                onChange={(e)=>setPrice(e.target.value)}
                className={`form-inp ${(errors.price) && 'input-err' } `}
                 />
                {errors.price && <div className='err-msg'>{errors.price} </div> }

            </div>
            <div className='buttons'>
                <button className='btn btn-add' type='submit'>
                {serviceToEdit ? 'Update Service' : 'Add Service'}
                </button>
                {
                    serviceToEdit && (
                        <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    )
                }

            </div>
        </form>
      
    </div>
  )
}

export default ServiceForm
