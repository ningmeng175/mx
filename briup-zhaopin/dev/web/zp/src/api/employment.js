import axios from '@/utils/axios'

/* 查找数据 */
export function findAllEmployment() {
  return axios.get('/Employment/findAll');
}
/**
 * 根据id删除信息
 * @param {Object} param {id:''}
 */
export function deleteEmploymentById(param){
  return axios.post('/Employment/deleteById',param);
}
/**
 * 通过id查找招聘信息
 * @param {Object} param {id:''} 
 */
export function findEmploymentById(param){
  return axios.get('/Employment/findById',{params:param});
}
/**
 * 根据城市查找招聘信息
 * @param {Object} param {city:''} 
 */
export function findEmploymentByCity(param){
    return axios.get('/Employment/findByCity',{params:param});
  }
/**
 * 根据工作查找招聘信息
 * @param {Object} param {job:''} 
 */
export function findEmploymentByJob(param){
    return axios.get('Employment/findByJob',{params:param});
  }
/**
 * 根据标题查找招聘信息
 * @param {Object} param {title:''} 
 */
export function findEmploymentByTitle(param){
    return axios.get('/Employment/findByTitle',{params:param});
  }
/**
 * 根据福利查找招聘信息
 * @param {Object} param {welfare:''} 
 */
export function findEmploymentByWelfare(param){
    return axios.get('/Employment/findByWelfare',{params:param});
  }
/**
 * 新增或修改商家信息
 * @param {Object} param 
 */
export function saveOrUpdateEmployment(param){
  return axios.post('/Employment/saveOrUpdate',param);
}