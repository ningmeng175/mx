/*
 * @Author: mikey.zhaopeng 
 *求职模块API
 * @Date: 2019-12-25 15:06:49 
 * @Last Modified by: dayi
 * @Last Modified time: 2019-12-25 22:23:13
 */
import axios from '@/utils/axios'
/* 查找数据 */
export function findAllEmploymentJobhunter() {
  return axios.get('/EmploymentJobhunter/findAll');
}

/**
 * 通过id删除求职信息
 * @param {object} param 
 * {id:''}
 */
export function deleteEmploymentJobhunterById(param){
    return axios.post('/EmploymentJobhunter/deleteById',param);
}
 

/**
 * 查询所有求职信息（扩展）
 * @param {object} param {WithJobhAndEmpl:''}
 */
export function findAllEmploymentJobhunterWithJobhAndEmpl(param) {
    return axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl',{params:param});
  }

/**
 * 通过Id查找求职信息
 * @param {object} param {id:''}
 */
export function
findEmploymentJobhunterById(param){
    return axios.get('/EmploymentJobhunter/findById',{params:param});
}


/**
 * 保存或更新求职信息
 * @param {object} param {EmploymentJobhunter:''}
 */
export function
saveOrUpdateEmploymentJobhunter(param){
    return axios.post('/EmploymentJobhunter/saveOrUpdate',param);
}

