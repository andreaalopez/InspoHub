import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import './ViewPost.css'


const ViewPost = () => {

    const { post_id } = useParams();
    const [post, setPost] = useState({ user_id: null, username: "", image: "", text: "", likeCount: 0, comments: [] })
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select()
                .eq('post_id', post_id)
                .single();

            if (data) {
                setPost(data);
            } else if (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [post_id]);

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    }

    const addComment = async (event) => {
        event.preventDefault();

        const newComment = {
            text: commentText,
        };

        const existingComments = post.comments || [];

        const updatedComments = [...existingComments, newComment];

        await supabase
            .from('Posts')
            .update({ comments: updatedComments })
            .eq('post_id', post_id);

        const { data } = await supabase
            .from('Posts')
            .select()
            .eq('post_id', post_id)
            .single();

        if (data) {
            setPost(data);
        }

        setCommentText('');
    };

    return (
        <div className="view-post-container">
            <div className="post-details">
                <p>{post.text}</p>
            </div>

            <div className="comments-section">
                <p className="comments-title">Comments</p>
                    {post.comments.map((comment, index) => (
                        <p key={index} className="comment-bubble">{comment.text}</p>
                    ))}
            </div>

            <div className="add-comment-section">
                <p className="comments-title">Add Comment</p>
                <form onSubmit={addComment}>
                    <textarea
                        rows="3"
                        cols="50"
                        name="commentText"
                        value={commentText}
                        onChange={handleCommentChange}
                        placeholder="Type your comment here"
                    ></textarea>
                    <br />
                    <button type="submit">Add Comment</button>
                </form>
            </div>
        </div>
    )
}

export default ViewPost