
import axios from '@/utils/axios'

export  function deleteJobsById(param) {
  return axios.post('/Jobs/deleteById',param);
};

export  function findAllJobs(param) {
    return axios.get('Jobs/findAll',{param:param});
  };

  export  function findJobsById(param) {
    return axios.get('Jobs/findById',{param:param});
  };


  export  function findJobsByStatus(param) {
    return axios.get('/Jobs/findByStatus',{params:param});
  };

  export  function saveOrJobsUpdate(param) {
    return axios.post('/Jobs/saveOrUpdate ',param);
  };