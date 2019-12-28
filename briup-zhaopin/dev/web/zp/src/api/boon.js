/*
 * @Author: Wuxy 
 * @Date: 2019-12-26 17:09:42 
 * @Last Modified by: Wuxy
 * @Last Modified time: 2019-12-26 17:15:04
 */

import axios from '@/utils/axios'

export function deleteWelfareById(param){
    return axios.post('/Welfare/deleteById',param);
  };

  export  function findAllWelfare(param) {
    return axios.get('/Welfare/findAll',{param:param});
  };
  
  export  function findWelfareById(param) {
    return axios.get('/Welfare/findById',{param:param});
  };

  export function saveOrWelfareUpdate(param){
    return axios.post('/Welfare/saveOrUpdate ',param);
  };