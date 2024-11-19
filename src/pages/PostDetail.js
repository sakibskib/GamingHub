import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single();
    setPost(data);
  };

  const fetchComments = async () => {
    const { data } = await supabase.from('comments').select('*').eq('post_id', id);
    setComments(data);
  };

  const handleUpvote = async () => {
    await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id);
    fetchPost();
  };

  const handleComment = async () => {
    await supabase.from('comments').insert({ post_id: id, content: newComment });
    setNewComment('');
    fetchComments();
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Upvotes: {post.upvotes}</p>
      <button onClick={handleUpvote}>Upvote</button>

      <h3>Comments</h3>
      <div>
        {comments.map((comment) => (
          <p key={comment.id}>{comment.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleComment}>Comment</button>
    </div>
  );
}

export default PostDetail;
