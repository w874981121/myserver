/**
 * Created wangyanqi
 * Date 2017/9/12
 * GitHub w874981121 ——小小疯
 */
'use strict';

import jurisdiction from '../../models/admin/Jurisdiction'

class JurisdictionList {
    constructor() {
    }

    //============== 添加权限功能，仅超级管理员可控 ==============

    async add(req, res, next) {
        let doc, data = {}
        try {
            if (!req.query.jurisdiction_name) {
                throw new Error('权限名称参数缺失或错误')
            } else if (!req.query.jurisdiction) {
                throw new Error('权限字段参数缺失或错误')
            }
        } catch (err) {
            res.send({
                state: false,
                message: err.message
            })
            return
        }
        await jurisdiction.findOne({"jurisdiction_name":req.query.jurisdiction_name},(err,str)=>{
            if(str){
                res.send({
                    state: false,
                    message: "名称已存在"
                })
            }
        })

        await jurisdiction.findOne({"jurisdiction":req.query.jurisdiction},(err,str)=>{
            if(str){
                res.send({
                    state: false,
                    message: "权限字段已存在"
                })
            }
        })
        doc = {
            jurisdiction_name: req.query.jurisdiction_name,
            jurisdiction: req.query.jurisdiction,
            state: true
        }
        await new jurisdiction(doc).save().then((str)=> {
            if (str) {
                data.state = true
                data.message = "添加成功"
            } else {
                data.state = false
                data.message = "添加失败"
            }
        }).catch((err)=> {
            data.err = err
            data.state = false
            data.message = "数据库存储错误"
        })
        res.send(JSON.stringify(data))

    }

    //============== 返回所有权限列表 ==============

    async returnList(req, res, next) {
        await jurisdiction.find((err, str)=> {
            let data = {}
            if (!err && str) {
                data.data = str
                data.state = true
                data.message = "成功"
            } else if (err) {
                data.err = err
                data.state = false
                data.message = "失败"
            } else if (!str) {
                data.state = false
                data.message = "数据为空或失败"
            }
            res.send(JSON.stringify(data))
        })
    }

    //============== 修改权限功能状态，仅超级管理员可控 ==============

    //============== 注销权限功能，仅超级管理员可控 ==============


}

export default new JurisdictionList()