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

// import React, { useState, useEffect, useCallback } from 'react';
// import { supabase } from '../supabase';
// import { Link } from 'react-router-dom';

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [sortBy, setSortBy] = useState('created_at');
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchPosts = useCallback(async () => {
//     const { data, error } = await supabase
//       .from('posts')
//       .select('*')
//       .order(sortBy, { ascending: false });
//     if (error) console.log(error);
//     else setPosts(data);
//   }, [sortBy]);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);


//   return (
//     <div>
//       <h1>Gaming Hub</h1>
//       <input
//       type="text"
//       placeholder="Search posts..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//     <button onClick={fetchPosts}>Search</button>
//       <div>
//         <label>Sort By:</label>
//         <select onChange={(e) => setSortBy(e.target.value)}>
//           <option value="created_at">Newest</option>
//           <option value="upvotes">Most Upvoted</option>
//         </select>
//       </div>
//       <div>
//         {posts.map((post) => (
//           <div key={post.id} className="post-card">
//             <h3>{post.title}</h3>
//             <p>Upvotes: {post.upvotes}</p>
//             <a href={`/post/${post.id}`}>View Post</a>
//           </div>
//         ))}
//       </div>
//       <Link to="/create">
//         <button>Create New Post</button>
//       </Link>
//     </div>
//   );
// }

// export default Home;
// import React, { useState, useEffect, useCallback } from 'react';
// import { supabase } from '../supabase';
// import { Link } from 'react-router-dom';

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [sortBy, setSortBy] = useState('created_at');
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchPosts = useCallback(async () => {
//     const { data, error } = await supabase
//       .from('posts')
//       .select('*')
//       .order(sortBy, { ascending: false });

//     if (error) {
//       console.log(error);
//     } else {
//       // Filter posts based on the search term
//       const filteredPosts = data.filter((post) =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setPosts(filteredPosts);
//     }
//   }, [sortBy, searchTerm]); // Added searchTerm as a dependency

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   return (
//     <div>
//       <h1>Gaming Hub</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Search posts..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={fetchPosts}>Search</button>
//       </div>
//       <div>
//         <label>Sort By:</label>
//         <select onChange={(e) => setSortBy(e.target.value)}>
//           <option value="created_at">Newest</option>
//           <option value="upvotes">Most Upvoted</option>
//         </select>
//       </div>
//       <div>
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <div key={post.id} className="post-card">
//               <h3>{post.title}</h3>
//               <p>Upvotes: {post.upvotes}</p>
//               <Link to={`/post/${post.id}`}>View Post</Link>
//             </div>
//           ))
//         ) : (
//           <p>No posts found.</p>
//         )}
//       </div>
//       <Link to="/create">
//         <button>Create New Post</button>
//       </Link>
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import '../App.css'; // Import your CSS file

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(sortBy, { ascending: false });

    if (error) {
      console.log(error);
    } else {
      const filteredPosts = data.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPosts(filteredPosts);
    }
  }, [sortBy, searchTerm]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container">
      <h1>Gaming Hub</h1>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
        <button onClick={fetchPosts}>Search</button>
      </div>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>Upvotes: {post.upvotes}</p>
              <Link to={`/post/${post.id}`}>View Post</Link>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
      <div className="create-post-btn">
        <Link to="/create">
          <button>Create New Post</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
