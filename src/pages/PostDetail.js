import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { getUserId } from '../supabase';

function PostDetail() {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) {console.error(error);
        setLoading(false);
    }
    else {
      setPost(data);
      setEditedTitle(data.title);
      setEditedContent(data.content);
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase.from('comments').select('*').eq('post_id', id);
    if (error) console.error(error);
    else setComments(data);
  };

  const handleUpvote = async () => {
    if (post) {
      await supabase
        .from('posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', id);
      fetchPost(); // Refresh the post data
    }
  };

  const handleComment = async () => {
    const userId = getUserId(); // Get the pseudo-authenticated user ID
    const { error } = await supabase.from('comments').insert({
      post_id: id,
      content: newComment,
      user_id: userId,
    });
    if (error) console.error(error);
    else {
      setNewComment('');
      fetchComments(); // Refresh comments
    }
  };

  const handleDelete = async () => {
    const secretKey = prompt('Enter the secret key to delete this post:');
    if (secretKey === post.secret_key) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) console.error(error);
      else {
        alert('Post deleted successfully.');
        navigate('/'); // Redirect to the home page
      }
    } else {
      alert('Incorrect secret key!');
    }
  };

  const handleEdit = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ title: editedTitle, content: editedContent })
      .eq('id', id);
    if (error) console.error(error);
    else {
      setIsEditing(false);
      fetchPost(); // Refresh the post data
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {isEditing ? (
        <div className="edit-container">
          <h1>Edit Post</h1>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleEdit}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          {post.image_url && <img src={post.image_url} alt="Post Visual" />}
          <p>Upvotes: {post.upvotes}</p>
          <button onClick={handleUpvote}>Upvote</button>
          <button onClick={() => setIsEditing(true)}>Edit Post</button>
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      )}

      <div>
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <small>By User ID: {comment.user_id}</small>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

        <div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleComment}>Comment</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
