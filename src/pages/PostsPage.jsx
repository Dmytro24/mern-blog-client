import React from 'react';
import axios from '../utils/axios';
import { PostItem } from '../components/PostItem';

export const PostsPage = () => {
  
  const [posts, setPosts] = React.useState([]);
  
  React.useEffect(() => {
    async function fetchMyPosts() {
      try {
        const { data } = await axios.get(`/posts/all/me`);
        setPosts(data);
      } catch (error) {
        alert('Error receiving posts!');
      }
    }
    fetchMyPosts();
  }, []);

  return (
    <div className="page__posts posts">
      <div className="posts__container">

        {posts?.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
