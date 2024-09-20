import React from 'react'
import './ServiceList.css'

const ServiceList = ({services,onEdit, onDelete}) => {
  return (
    <div className='service'>
        <h2>HealthCare Services</h2>
        {
            services.length === 0 ? ( <p>No services Available Add some.</p> )
            : (
            <ul>
                {  
                    services.map((service) => (
                        <li key={service.id}>
                            <div className='inf'>
                                
                                <div className='servname'>{service.service}</div>
                                <div className='desc'>{service.description}</div>
                                <div className='price'>Price: ₹{service.price}</div>
                            </div>
                            <div className='btns'>
                                <button onClick={()=>onEdit(service)} className='editbtn btn'>
                                    Edit
                                </button>
                                <button onClick={()=>onDelete(service.id)} className='deletebtn btn'>
                                    
                                    Delete
                                </button>
                            </div>
                        </li>

                    ))
                }   
            </ul>
                
            )
        }

      
    </div>
  )
}

export default ServiceList
