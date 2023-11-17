import './App.css';
import React, { useState, useEffect } from "react";
import { useRoutes } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import ReadPosts from './pages/ReadPosts';
import EditPost from './pages/EditPost';
import ViewPost from './pages/ViewPost';
import NavBar from "./components/NavBar.jsx";
import { Link } from "react-router-dom";
import { supabase } from "./client.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

const App = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("Posts")
        .select()
        .order("created_at", { ascending: true });

      // set state of posts
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);


  return (

    <Router>
      <div className="App">

        <div className="header">
          <h1>InspoHub 📷</h1>
          <h2>Today's post inspiration:</h2>
          <div className='inspoBox'>
            <div className='inspo'>
              Someone who makes you happy.
            </div>
            <div className='inspo'>
              A new hobby or interest of yours.
            </div>
            <div className='inspo'>
              The rose or thorn of your day.
            </div>
          </div>

          <Link to="/"><button className="headerBtn"> Explore Page </button></Link>
          <Link to="/new"><button className="headerBtn"> Create a Post </button></Link>
        </div>

        <Routes>
          <Route path="/" element={<> <NavBar /> <Outlet /> </>}>
            <Route index={true} element={<ReadPosts data={posts} />} />
            <Route path="/edit/:post_id" element={<EditPost />} />
            <Route path="/new" element={<CreatePost />} />
            <Route path="/view/:post_id" element={<ViewPost />} />
          </Route>
        </Routes>

      </div>
    </Router>

  );
}

export default App;