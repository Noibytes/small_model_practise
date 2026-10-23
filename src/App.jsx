import axios from 'axios'
import { setStudents } from './slice/Slice'
import { useSelector,useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const dispatch=useDispatch()
  const students=useSelector(state=>state.StudentReducer.students)
  const[id,setId]=useState("")
  const[name,setName]=useState("")
  const[course,setCourse]=useState("")

  useEffect(()=>{
    axios.get("https://small-model-practise.onrender.com/students").then(response=>{dispatch(setStudents(response.data))})
    
  },[])

  const addstudent=()=>{
    const student={
      id:id,
      name:name,
      course:course
    }
    axios.post("https://small-model-practise.onrender.com/students",student).then((response)=>
      dispatch(setStudents([...students,response.data])))
    setId('')
    setName('')
    setCourse('')
  }

  const delstudent=(id)=>{
    axios.delete(`https://small-model-practise.onrender.com/students/${id}`).then(()=>dispatch(setStudents(students.filter(stu=>stu.id!=id))))

  }

  const changestudent=(stud)=>{
    setId(stud.id)
    setName(stud.name)
    setCourse(stud.course)
  }

  const upstud=()=>{

    const updatedstudent={
      id:id,
      name:name,
      course:course
    }

    axios.put(`https://small-model-practise.onrender.com/students/${id}`,updatedstudent).then((response)=>dispatch(setStudents(students.map(st=>st.id==id? response.data:st))))

  }

  

  return (
    <>

    <h1>Student</h1>
      
      <input type="text" value={id} onChange={e=>setId(e.target.value)}/>
    <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
    
    <input type="text" value={course} onChange={e=>setCourse(e.target.value)}/>

    <button onClick={addstudent}>Add</button>
    <button onClick={upstud}>update</button>

    {students.map(st=>
      <div key={st.id}>
      <p>{st.name}</p>
      <p>{st.course}</p>

      <button onClick={()=>delstudent(st.id)}>delete</button>
      <button onClick={()=>changestudent(st)}>edit</button>

      
      
      </div>
      
      
    )

    }
      
    </>
  )
}

export default App
