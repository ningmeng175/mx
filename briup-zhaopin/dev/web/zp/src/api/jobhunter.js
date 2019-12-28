/*
 * @Author: liuyr
 * 求职者模块API
 * @Date: 2019-12-25 08:58:09 
 * @Last Modified by: dayi
 * @Last Modified time: 2019-12-25 21:47:27
 */

import axios from '@/utils/axios'
/* 查找数据 */
export function findAllJobhunter(param) {
  return axios.get('/Jobhunter/findAll',{params:param});
}

/**
 * 通过id删除求职者信息
 * @param {object} param 
 * {id:''}
 */
export function deleteJobhunterById(param){
    return axios.post('/Jobhunter/deleteById',param);
}
 
/**
 * 根据学历查找求职者信息
 * @param {object} param {Education:''}
 */
export function findJobhunterByEducation(param) {
  return axios.get('/Jobhunter/findByEducation',{params:param});
}

/**
 * 根据性别查找求职者信息
 * @param {object} param {Gender:''}
 */
export function findJobhunterByGender(param) {
    return axios.get('/Jobhunter/findByGender',{params:param});
  }

/**
 * 通过Id查找求职者信息
 * @param {object} param {id:''}
 */
export function
findJobhunterById(param){
    return axios.get('/Jobhunter/findById',{params:param});
}

/**
 * 通过手机号查找求职者信息
 * @param {object} param {Telephone:''}
 */
export function
findJobhunterByTelephone(param){
    return axios.get('/Jobhunter/findByTelephone',{params:param});
}

/**
 * 通过用户名查找求职者信息
 * @param {object} param {Username:''}
 */
export function
findJobhunterByUsername(param){
    return axios.get('/Jobhunter/findByUsername',{params:param});
}

/**
 * 快速注册和报名
 * @param {object} param {Jobhunter:''}
 */
export function
quickRegistrationJobhunter(param){
    return axios.post('/Jobhunter/quickRegistration',param);
}

/**
 * 保存或更新求职者信息
 * @param {object} param {Jobhunter:''}
 */
export function
saveOrUpdateJobhunter(param){
    return axios.post('/Jobhunter/saveOrUpdate',param);
}

