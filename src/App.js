import React from 'react';
import './App.css';
import {Comment} from "./Component/Comment"
import file from "./data.json"
import { useState } from 'react';

export function CommentSection( ) {
  let [data, setData] = useState(file);
  let [newComment, setNewComment]= useState("");
  let [newId, setNewId] = useState(5)
  let handleNewComment= ()=>{
    if(newComment!==""){
      let adding = {"id": newId, "content" : newComment, "score":0, "user" : data.currentUser, replies : []}
      setData({
        ...data,
        comments :[...data.comments, adding]
      })
      setNewComment("");
    }
  }
  let handleReply= (id,newcontent)=>{
    // need to make changes with the id
    if(newcontent!== ""){
      console.log("hello")
      let adding = {
        id: newId,
        content: newcontent,
        createdAt: "Now",
        score: 0,
        replyingTo : data.comments[id-1].user.username,
        user : data.currentUser
      }
      let updatedComment = data.comments.map((item, index)=>{
        if(index === id-1){
          let updated = item
          updated.replies = [...item.replies, adding]
          return updated
        }else{
          return item
        }
      })
      setData({
        ...data,
        comments : updatedComment
      })
      setNewId(newId+1)
    }
  }
  let deleteComment = (id, reply= false )=>{
    //for the reply.js
    if(reply){
      let deletepart = data.comments.map((obj)=> {
        let filterArr = obj.replies.filter((arr)=> arr.id !== id)
        return {...obj, replies : filterArr}
      })
      setData({
        ...data,
        comments: deletepart
      })
    }
    // for the comment.js
    else{
      let deletepart = data.comments.filter((obj)=> obj.id !== id)
      setData({
        ...data,
        comments : deletepart
      })
    }
    
  }
  return (
  <div className='main_container'>
    {data.comments.map((obj,index)=> <Comment key={obj.id} id={obj.id} data_comment={obj} user={data.currentUser} handleReply={handleReply} deleteComment={deleteComment} />)}
    <div className='new_comment'>
      <img className='usersimg' alt="img" src={file.currentUser.image.png}></img>
      <textarea value={newComment} onChange={(e)=> setNewComment(e.target.value)} placeholder="Add a comment.."></textarea>
      <button className='boxes' onClick={handleNewComment}>Send</button>
    </div>
  </div>)
  
}