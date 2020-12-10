import React from "react";
//import { toast } from "react-toastify";
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { Avatar,Badge } from "antd";
//access user
import {useSelector} from 'react-redux';

const FileUpload = ({values,setValues,setLoading}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {

    // resize , using package react-image-file-resizer npmm 
    //multiple uploads
    let files=e.target.files;
    //acess images in values in parent
    let allUploadedFiles=values.images;

    if(files){
      setLoading(true)
      for (let i=0;i<files.length;i++){
        //pass to a callback which gives us the uri
        Resizer.imageFileResizer(files[i],720,720,'JPEG',100,0,(uri)=>{
          //this response set in parent component
          axios.post(`${process.env.REACT_APP_API}/uploadimages`,{image:uri},{
            headers:{
              authtoken:user?user.token:""

            }
          })
          .then(res=>{
        
            setLoading(false);
            allUploadedFiles.push(res.data);
            setValues({...values,images:allUploadedFiles});
          })
          .catch(err=>{
            setLoading(false);
           // toast.error("Cloudinary Upload Err",err);
           alert('Upload error')
       
          })

        },"base64")
  

      }
    }

    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  //note the handleImageRemove, use arrow function as u passing arg
  const handleImageRemove=(public_id)=>{
    setLoading(true);
  
    axios.post(`${process.env.REACT_APP_API}/removeimage`,{public_id},{
      headers:{
        authtoken:user?user.token:""
      }
    }).then((res)=>{
      setLoading(false);
      const {images}=values;
      //then we filter out the item
      let filteredImages=images.filter((item)=>{
        return item.public_id!==public_id;
      });
      //reset state
      setValues({...values,images:filteredImages})

    }).catch((err)=>{
   
      
      setLoading(false)

    })
    
  }

  return (

    <>
     <div className="row">
        {values.images &&
          values.images.map((image) => (
           <Badge count="X" key={image.public_id} onClick={()=>handleImageRemove(image.public_id)} style={{cursor:'pointer'}}>
              <Avatar
              key={image.public_id}
              src={image.url}
              size={100}
             
              shape="square"
              className="ml-3"
            />
           </Badge>
          ))}
      </div>
    <div className="row">
      
      <label className="btn btn-primary">
        Choose Image File(s)

       
    
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
   
    </div>
    </>
  );
};

export default FileUpload;
