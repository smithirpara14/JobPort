import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_ALL_JOB_POSTS, DELETE_JOB_POST } from '../graphqlQueries'; // Update import
import AdminNav from './adminNav';
import { Container } from 'react-bootstrap';

const CheckJobPosts = () => {
  const { loading, error, data } = useQuery(FETCH_ALL_JOB_POSTS); // Update query

  const [deleteJobPost] = useMutation(DELETE_JOB_POST, {
    refetchQueries: [{ query: FETCH_ALL_JOB_POSTS }]
  });

  const handleDeleteJobPost = (jobPostId) => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      deleteJobPost({ variables: { jobPostId } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AdminNav />
      <Container>
        <h2>Job Posts</h2>
        <Link to="/createJobPost" className="btn btn-primary mb-3">Create Job Post</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.allJobPosts.map(jobPost => (
              <tr key={jobPost._id}>
                <td>{jobPost._id}</td>
                <td>{jobPost.title}</td>
                <td>{jobPost.description}</td>
                <td>{jobPost.location}</td>
                <td>
                  <Link to={`/updateJobPost/${jobPost._id}`} className="btn btn-sm btn-info mr-1">
                    Update
                  </Link>
                  <button onClick={() => handleDeleteJobPost(jobPost._id)} className="btn btn-sm btn-danger ml-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default CheckJobPosts;
