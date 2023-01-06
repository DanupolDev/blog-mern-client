import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams,useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { getToken, getUser } from "../services/authoriza";

const EditComponent =(props)=>{
    const {slug} =useParams()
    const [state,setState]= useState({
      title:"",
      author:'',
      slug:''
    })

    const {title,author} = state
    const [content,setContent]=useState('')
    const navigate = useNavigate()

    const submitContent=(event)=>{
      setContent(event)
    }

    //กำหนดค่าให้ state
    const inputValue=name=>event=>{
      // console.log(name,'=',event.target.value);
      setState({...state,[name]:event.target.value})
    }
    
    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
            <div className="form-group">
              <label>ชื่อบทความ</label>
              <input type='text' className="form-control" value={title} onChange={inputValue('title')}/>
            </div>
            <div className="form-group">
              <label>รายละเอียด</label>
              <ReactQuill
                value={content}
                onChange={submitContent}
                theme='snow'
                className="pb-5 mb-3"
                style={{border:'1px solid #666'}}
              />
            </div>
            <div className="form-group">
              <label>ผู้แต่ง</label>
              <input type='text' className="form-control" value={author} onChange={inputValue('author')}/>
            </div>
            <br/>
            <input type='submit' value='อัพเดต' className="btn btn-primary"/>
          </form>
    )

    const submitForm =(event)=>{
    //   event.preventDefault();
    //   console.log('API URL',process.env.REACT_APP_API)
     axios
      .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
      {
        headers:{
          'x-access-token':getToken()
        }
      })
      .then(response=>{
        Swal.fire(
          'แจ้งเตือน',
          'อัพเดตบทความเรียบร้อย',
          'success'
        )
        const {title,content,author,slug} = response.data
        setState({...state,title,author,content,slug})
        console.log('test');
        
      })
      .catch(err=>{
        alert(err)
      })
    }
    //ดึงข้อมูลบทความที่ต้องการแก้ไข
    useEffect(()=>{
        if(!getUser()){
          navigate('/login')
        }else{
          axios
          .get(`${process.env.REACT_APP_API}/blog/${slug}`)
          .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err=>alert(err))
        // eslint-disable-next-line
        }
        // eslint-disable-next-line
    },[])
    
    return (
        <div className='container p-5'>
          <h1>เขียนบทความ</h1>
          <NavbarComponent/>
          <h1>แก้ไขบทความ {slug}</h1>
          {showUpdateForm()}
        </div>
      );
}
export default EditComponent