/**
 * Created wangyanqi
 * Date 2017/9/11
 * GitHub w874981121 ——小小疯
 */
'use strict';

import crypto from 'crypto'

const hmacAlgorithm = string => {
    let shasum = crypto.createHash('sha1');
    if (string) {
        shasum.update(string);
        return shasum.digest('hex');
    } else {
        return false
    }
}
// 短KEY的测试
export default hmacAlgorithm;