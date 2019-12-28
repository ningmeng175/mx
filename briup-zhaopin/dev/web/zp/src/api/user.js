
import axios from '@/utils/axios'
/**
 * 通过id删除求职者信息
 * @param {Object} param {id:''} 
 */
export function deleteJobhunterById(param) {
  return axios.post('/Jobhunter/deleteById', param);
}
/**
 * 查找所有求职者信息
 */
export function findAllJobhunter() {
  return axios.get('/Jobhunter/findAll');
}

/**
 * 通过学历查找求职者信息
 * @param {Object} param {Education:''}
 */
export function findJobhunterByEducation(param) {
  return axios.get('/Jobhunter/findByEducation', {
    params: param
  });
}
/**
 * 通过性别查找求职者信息
 * @param {Object} param {Gender:''}
 */
export function findJobhunterByGender(param) {
  return axios.get('/Jobhunter/findByGender', {
    params: param
  });
}
/**
 * 通过id查找求职者信息
 * @param {Object} param {id:''}
 */
export function findJobhunterById(param) {
  return axios.get('/Jobhunter/findById', {
    params: param
  });
}
/**
 * 通过手机号查找求职者信息
 * @param {Object} param {Telephone:''}
 */
export function findJobhunterByTelephone(param) {
  return axios.get('/Jobhunter/findByTelephone', {
    params: param
  });
}

/**
 * 通过用户名查找求职者信息
 * @param {Object} param {Username:''}
 */
export function findJobhunterByUsername(param) {
  return axios.get('/Jobhunter/findByUsername', {
    params: param
  });
}
/**
 * 保存或更新求职者信息
 * @param {Object} param 
 */
export function quickRegistrationJobhunter(param) {
  return axios.post('/Jobhunter/quickRegistration', param);
}
/**
 * 保存或更新求职者信息
 * @param {Object} param
 */
export function saveOrUpdateJobhunter(param) {
  return axios.post('/Jobhunter/saveOrUpdate', param);
}

