import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react'
import { supabase } from '../client'
import './EditPost.css'

const EditPost = ({data}) => {

    const {post_id} = useParams();
    const [post, setPost] = useState({ user_id: null, username: "", image: "", text: "", likeCount: 0, comments: [] })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
        console.log(post_id);

        await supabase
            .from('Posts')
            .update({ text: post.text, image: post.image })
            .eq('post_id', post_id);

        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('post_id', post_id); 
      
        window.location = "/";
      }


    return (
        <div>
            <form>

                <label>Upload an image</label><br />
                <input type="text" id="image" name="image" value={post.image} onChange={handleChange} /><br />
                <br />

                <label>What do you want to say?</label><br />
                <textarea rows="5" cols="50" id="text" name="text" value={post.text} onChange={handleChange} >
                </textarea>
                <br />
                <input className="post-btn" type="submit" value="Update" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost