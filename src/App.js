import NavbarComponent from "./components/NavbarComponent";
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import parse from 'html-react-parser'
import { getUser,getToken } from "./services/authoriza";

function App() {
  const [blogs,setBlogs] = useState([])

  const fatcData =()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    })
    .catch(err=>alert(err))
  }

  useEffect(()=>{
   fatcData()
  },[])

  const confirmDelete=(slug,title)=>{
    Swal.fire({
      title:`คุณต้องการลบบทควม ${title} หรือไม่ ?`,
      icon:'warning',
      showCancelButton:true
    }).then((result)=>{
      //กดปุ่ม ok หรือ ตกลง
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog=(slug)=>{
    //ส่ง request ไปที่ API เพื่อลบข้อมูล
    axios
    .delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
      headers:{
        'x-access-token':getToken()
      }
    })
    .then(response=>{
      Swal.fire('Deleted!!',response.data.message,'success')
      fatcData()
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className='container p-5'>
      <NavbarComponent/>
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
            <div className="col pt-3 pb-2">
              <Link to={`/blog/${blog.slug}`}><h2>{blog.title}</h2></Link>
              <div className="pt-3">{parse(blog.content.substring(0,200))}</div>
              <p className="text-muted">ผู้เขียน: {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
              { getUser() && (
                <div>
                  <Link to={`/blog/edit/${blog.slug}`} className="btn btn-outline-success">แก้ไขบทความ</Link> &nbsp;
                  <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug,blog.title)}>ลบบทความ</button>
                </div>
              )}
            </div>
        </div>
      ))}
    </div>
  );
}

export default App;
