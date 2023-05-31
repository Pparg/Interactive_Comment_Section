import React from "react";
import { useState } from "react";
import { Reply } from "./reply";

export function Comment({data_comment, user, handleReply, id, deleteComment, handleEdit, handleLikeDislike} ) {
    let [clicked , setClicked] = useState(false)
    let [edit, setEdit]= useState(false)
    let [reply, setReply]= useState("")
    return(<>
        <section className="comment_container">
            <div className="like_dislike">
                <button onClick={()=> handleLikeDislike(id, true)}><i className="fa-solid fa-plus"></i></button>
                <h3>{data_comment.score}</h3>
                <button onClick={()=> handleLikeDislike(id, false)} ><i className="fa-solid fa-minus"></i></button>
            </div>
            <div className="main_content">
                <div className="comment_header">
                    <div className="user_info">
                        <img className="usersimg" alt="img" src={data_comment.user.image.png}  ></img>
                        <h5 className="username">{data_comment.user.username}</h5>
                        {data_comment.user.username === user.username? <p className="current_user">you</p>:""}
                        <p>{data_comment.createdAt}</p>
                    </div>
                    <div className="reply_comment">
                        {data_comment.user.username === user.username? 
                        <div className="current_option">
                            <button className="delete" onClick={()=> deleteComment(id)}><i className="fa-solid fa-trash"></i> Delete</button>
                            <button className="reply_box" onClick={()=> {setEdit(!edit); setReply(data_comment.content)}}><i className="fa-solid fa-pen"></i> Edit</button>
                        </div>
                        :
                        <button className="reply_box" onClick={()=> setClicked(true)}><i className="fa-solid fa-reply"></i> Reply</button>}
                    </div>    
                </div>
                <div className="comment_section">
                    {edit?<div className="update"><textarea value={reply} onChange={(e)=> setReply(e.target.value)}></textarea><button className="boxes" onClick={()=> {handleEdit(id,reply); setEdit(false)}}>Update</button></div> :<h2>{data_comment.content}</h2>}
                </div>
            </div>
        </section>
        {clicked? 
        <div className="new_comment">
            <img className="usersimg" alt="img" src={user.image.png}></img>
            <textarea value={reply} onChange={(e)=> setReply(e.target.value)}></textarea>
            <button className="boxes" onClick={()=> {handleReply(id,reply); setClicked(false); setReply("")}}>Reply</button>
        </div>:""}
        <div className="reply_comment">
            {data_comment.replies.map((replie,index)=><Reply key={index} id={replie.id} info={replie} current={user} deleteComment={deleteComment} handleReply={handleReply} parentId={id} handleEdit={handleEdit} handleLikeDislike={handleLikeDislike}/>)}
        </div>
        </>
    )

    
}

