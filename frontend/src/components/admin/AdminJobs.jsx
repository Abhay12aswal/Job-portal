import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {

  useGetAllAdminJobs();

  const [input , setInput]= useState("");
  const navigate=useNavigate();
  const dispatch= useDispatch();

  // useEffect(()=>{

  // },[])

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5 gap-3'>
          <Input
            className='w-full'
            placeholder="Filter by name, role"
            onchange={(e)=>setInput(e.target.value)}
          />
          <Button onClick={()=> navigate('/admin/jobs/create')}>New Jobs</Button>
        </div>

        <AdminJobsTable/>
        
      </div>
    </div>
  )
}

export default AdminJobs
