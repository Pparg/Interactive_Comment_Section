import React from "react";
import { useState } from "react";

export function Reply({info, current, deleteComment,id, handleReply,parentId}) {
    let [clicked,setClicked] = useState(false);
    let [edit, setEdit] = useState(false)
    let [ReplyTo, setReplyTo] = useState("");
    return(<>
        <section className="reply_container">
            <div className="like_dislike">
                <button><i className="fa-solid fa-plus"></i></button>
                <h3>{info.score}</h3>
                <button><i className="fa-solid fa-minus"></i></button>
            </div>
            <div className="replyinfo_main_container">
                <div className="comment_header">
                    <div className="user_info">
                        <img className="usersimg" alt="img" src={info.user.image.png}></img>
                        <h5 className="username">{info.user.username}</h5>
                        {info.user.username === current.username? <p className="current_user">you</p>:""}
                        <p>{info.createdAt}</p>
                    </div>
                    <div className="reply_comment">
                        {info.user.username === current.username? 
                        <div className="current_option">
                            <button className="delete" onClick={()=> deleteComment(id, true)}><i className="fa-solid fa-trash"></i> Delete</button>
                            <button onClick={()=>{setEdit(!edit); setReplyTo(info.content)}}><i className="fa-solid fa-pen"></i> Edit</button>
                        </div>
                        :
                        <button onClick={()=> setClicked(true)}><i className="fa-solid fa-reply"></i> Reply</button>}  
                    </div>    
                </div>
                <div className="comment_section">
                    {edit? <div className="update"><textarea value={ReplyTo} onChange={(e)=> setReplyTo(e.target.value)} ></textarea><button>Update</button></div>: <h2><span>@{info.replyingTo}</span> {info.content}</h2>}
                </div>  
            </div>
        </section>
        {clicked? 
        <div className="answerbox_reply">
            <img className="usersimg" alt="img" src={current.image.png}></img>
            <textarea value={ReplyTo} onChange={(e)=> setReplyTo(e.target.value)}></textarea>
            <div className="options">
                <button className="boxes" onClick={()=> {handleReply(parentId,ReplyTo); setClicked(!clicked); setReplyTo("")}}>Reply</button>
            </div>
        </div>:""}
        </>
    )
    
}