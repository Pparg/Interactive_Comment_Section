import React from 'react';
import './App.css';
import {Comment} from "./Component/Comment"
import file from "./data.json"
import { useState } from 'react';
 let hello = "Hello"

export function CommentSection( ) {
  let [data, setData] = useState(file);
  let [newComment, setNewComment]= useState("");
  let [newId, setNewId] = useState(5)
  let handleNewComment= (content)=>{
    if(content!=="" ){
      let adding = {"id": newId, "content" : content, createdAt: "Now", "score":0, "user" : data.currentUser, replies : []}
      setData({
        ...data,
        comments :[...data.comments, adding]
      })
      setNewComment("");
    }
  }
  let handleReply= (id,newcontent)=>{
    if(newcontent!== ""){
      let adding = {
        id: newId,
        content: newcontent,
        createdAt: "Now",
        score: 0,
        replyingTo : data.comments[id-1].user.username,
        user : data.currentUser
      }
      let updatedComment = data.comments.map((item)=>{
        if(item.id === id){
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
  let handleEdit = (id, content, reply= false)=>{
    if(!reply){
      let updatedComment = data.comments.map((item)=>{
        if(item.id === id){
          return {...item, content : content}
        }
        else return item
      })
      setData({
        ...data,
        comments: updatedComment
      })
    }
    else{
      let updatedComment = data.comments.map((item)=>{
        if(item.replies.filter((item)=> item.id === id) !== []){
          let update = item.replies.map((arr)=>{
            if(arr.id === id){
              return {...arr, content: content}
            }
            else return arr
          })
          return {...item, replies: update}
        }
        else{
          return item
        }
      })
      setData({
        ...data,
        comments : updatedComment
      })
    }
  }
  let handleLikeDislike = (id, like_dislike, reply = false)=>{
    if(like_dislike){
      let updatedComment = data.comments.map((item)=>{
        if(reply){
          let updateReplyScore = item.replies.map((item=> {
            if(item.id=== id){
              let newScore = item.score +1
              return {...item, score: newScore}
            }
            return item
          }))
          return {...item, replies: updateReplyScore}
        }
        else if(item.id === id){
          let newScore = item.score +1
          return {...item , score : newScore}
        }
        else return item
      })
      setData({
        ...data,
        comments : updatedComment,
      })
    }
    else{
      let updatedComment = data.comments.map((item)=>{
        if(reply){
          let updateReplyScore = item.replies.map((item=> {
            if(item.id=== id && item.score >0){
              let newScore = item.score -1
              return {...item, score: newScore}
            }
            return item
          }))
          return {...item, replies: updateReplyScore}
        }
        if(item.id === id && item.score >0){
          let newScore = item.score -1
          return {...item , score : newScore}
        }
        else return item
      })
      setData({
        ...data,
        comments : updatedComment,
      })
    }
  }
  return (
  <div className='main_container'>
    {data.comments.map((obj,index)=> <Comment key={obj.id} id={obj.id} data_comment={obj} user={data.currentUser} handleReply={handleReply} deleteComment={deleteComment} handleEdit={handleEdit} handleLikeDislike={handleLikeDislike}/>)}
    <div className='new_comment'>
      <img className='usersimg' alt="img" src={file.currentUser.image.png}></img>
      <textarea value={newComment} onChange={(e)=> setNewComment(e.target.value)} placeholder="Add a comment.."></textarea>
      <button className='boxes' onClick={()=>handleNewComment(newComment)}>Send</button>
    </div>
  </div>)
  
}