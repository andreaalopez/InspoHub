import { supabase } from '../client.jsx'
import './CreatePost.css';
import React, { useState, useEffect } from "react";


const CreatePost = () => {

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

    const createPost = async (event) => {
        event.preventDefault();
        console.log(post);

        const { error } = await supabase
            .from('Posts')
            .insert({
                user_id: post.user_id,
                username: post.username,
                image: post.image,
                text: post.text,
                likeCount: post.likeCount,
                comments: post.comments
            })
            .select();
        console.log(post);

        if (error) {
            console.log(error);
        }


        window.location = "/";
    }

    return (
        <div>
            <form>
                <label>What do you want to say?</label><br />
                <textarea rows="5" cols="50" id="text" name="text" onChange={handleChange}>
                </textarea>
                <br />
                <input className="post-btn" type="submit" value="Post" onClick={createPost} />
            </form>
        </div>
    );
};

export default CreatePost;

