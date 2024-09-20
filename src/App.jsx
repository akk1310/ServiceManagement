// Objective:
// Build a simple React web application to manage and display a list of healthcare services. Users should be able to add, update, and delete services.

// Assignment Requirements:

// 1. Service List:
// Build a component that displays a list of healthcare services. Each service should include name, description, and price.

// 2. Add New Service:
// Create a form that allows users to add a new service. After submission, the new service should appear in the list.

// 3.Update Service:
// Implement functionality to update an existing service’s details (name, description, price) within the list.

// 4.Delete Service:
// Add functionality to delete a service from the list.

// 5.State Management:
// Use React hooks (useState, useEffect) to manage the state of the services list.

// Bonus (Optional):
// •Add form validation (e.g., require all fields to be filled before adding a service).
// •Style the app using CSS or a UI framework like Bootstrap.

// Deliverables:
// •Provide a GitHub repository link or a zip file with:
// •The complete React project.
// •A README.md file with instructions on how to set up and run the project.
// -The webpage needs to be deployed as well.

// Technology Stack:
// •React for building the frontend.
// •Basic CSS for styling.

import { useState,useEffect } from 'react'
import './App.css'
import ServiceForm from './components/ServiceForm'
import ServiceList from './components/ServiceList'
import Footer from './components/Footer'

function App() {
  const [services, setServices] = useState([])
  const [serviceToEdit, setServiceToEdit] = useState(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const defaultServices = [
    {
      id: 1,
      service: 'General Consultation',
      description: 'Basic health check-up and consultation.',
      price: 100,
    },
    {
      id: 6,
      service: 'Dental Cleaning',
      description: 'Professional cleaning to remove plaque and tartar.',
      price: 80
    },
    {
      id: 7,
      service: 'Blood Test Panel',
      description: 'Comprehensive blood analysis for health markers.',
      price: 100
    },
    
    

    
  ];

  useEffect(()=>{
    const storedServices = localStorage.getItem('services')

    if (storedServices) {
      setServices(JSON.parse(storedServices))
      
    }else{
      setServices(defaultServices);
      localStorage.setItem('services', JSON.stringify(defaultServices));

    }
    setIsFirstLoad(false);
    
    
  },[])

  useEffect(()=>{
    if (!isFirstLoad) {
      if (services.length > 0) {
        localStorage.setItem('services', JSON.stringify(services))
      } else {
        localStorage.removeItem('services')
      }
    }
      

  },[services,isFirstLoad])

  const editService = (service)=>{
    setServiceToEdit(service)
  }
  const deleteService = (id)=>{
    setServices(services.filter((service)=>service.id !== id))

  }
  const updateService=(updatedService)=>{
    const updatedServices= services.map((service)=>
      service.id === updatedService.id ? updatedService: service )
    setServices(updatedServices)
    setServiceToEdit(null)
  }
  const addService=(service)=>{
    setServices([...services,service])
  }
  
  const cancelEdit=()=>{
    setServiceToEdit(null)
  }


  return (
    
    <div className='app-container '>
      <h1 className='texta'>HealthCare Service Management</h1>
      <ServiceForm 
      onSubmit={serviceToEdit ? updateService : addService}
      serviceToEdit={serviceToEdit}
      onCancel={cancelEdit}
      />
      <ServiceList 
      services={services}
      onEdit={editService}
      onDelete={deleteService}
      />
      <Footer />
    </div>
      
    
  )
}

export default App
