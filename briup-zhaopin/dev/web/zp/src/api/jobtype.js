import axios from '@/utils/axios'

export  function deleteJobTypeById(param) {
    return axios.post('/JobType/deleteById',param);
  };

export  function findAllJobType(param) {
    return axios.get('/JobType/findAll',{param:param});
};

export  function findJobTypeById(param) {
    return axios.get('/JobType/findById',{params:param});
  };

export  function saveOrJobTypeUpdate(param) {
    return axios.post('/JobType/saveOrUpdate',param);
  };

