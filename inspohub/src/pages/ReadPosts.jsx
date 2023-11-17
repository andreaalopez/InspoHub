import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import Card from '../components/Card';


const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // READ all posts from table
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: false });

            // set state of posts
            setPosts(data)
        }

        fetchPosts();

    }, [props]);

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                    posts.map((post, index) =>
                        <Card key={post.post_id} id={post.post_id} username={post.username} text={post.text} likeCount={post.likeCount} />
                    ) : <h2>{'No Posts Yet 😞'}</h2>
            }
        </div>
    )
}

export default ReadPosts;