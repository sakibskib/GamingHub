// import React, { useState, useEffect } from 'react';
// import { supabase } from '../supabase';

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [sortBy, setSortBy] = useState('created_at');

//   useEffect(() => {
//     fetchPosts();
//   }, [sortBy]);

//   const fetchPosts = async () => {
//     const { data, error } = await supabase
//       .from('posts')
//       .select('*')
//       .order(sortBy, { ascending: false });
//     if (error) console.log(error);
//     else setPosts(data);
//   };

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(sortBy, { ascending: false });
    if (error) console.log(error);
    else setPosts(data);
  }, [sortBy]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  return (
    <div>
      <h1>Gaming Hub</h1>
      <div>
        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>Upvotes: {post.upvotes}</p>
            <a href={`/post/${post.id}`}>View Post</a>
          </div>
        ))}
      </div>
      <Link to="/create">
        <button>Create New Post</button>
      </Link>
    </div>
  );
}

export default Home;
