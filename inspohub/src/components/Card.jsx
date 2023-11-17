import React from 'react'
import { useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { supabase } from '../client.jsx'



const Card = (props) => {

    const [likeCount, setLikeCount] = useState(props.likeCount)

    const updateLikeCount = async () => {
        try {
            // Update the like count in the Supabase database
            const { data, error } = await supabase
                .from('Posts')
                .update({ likeCount: likeCount + 1 })
                .eq('post_id', props.id);

            if (error) {
                console.error('Error updating like count:', error);
            } else {
                // Update the local state with the new like count
                setLikeCount(likeCount + 1);
            }
        } catch (error) {
            console.error('Error updating like count:', error);
        }
        console.log(likeCount);
        console.log(props.id)
    }

    return (
        <div className="Card">
            <div className="card-content">
                <div className="card-header">
                    <Link to={'edit/' + props.id}>Edit Post</Link>
                    <h3 className="username">{props.username}</h3>
                </div>
                <p className="text">{props.text}</p>
                <div className="card-footer">
                    <p className="likes">{likeCount} likes</p>
                    <button className="like-btn" onClick={updateLikeCount} > Like </button>
                    <button className="like-btn"><Link to={'view/' + props.id}>View Comments</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Card;