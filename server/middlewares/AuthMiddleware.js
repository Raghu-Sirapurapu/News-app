const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers['authorization'];

    //split 'bearer token'
    const token = authHeader && authHeader.split(" ")[1];


    if(!token){
        return res.status(401).json({
            message : 'Access denied! Please login '
        });
    }

    //decode this token
    try{
        const decodedTokenInfo = jwt.verify(token,process.env.JWT_SECRET_KEY); 
        req.userInfo = decodedTokenInfo;
        next();
    }catch(err){
        return res.status(500).json({
            message : 'Access denied! Please login '
        });
    }

}

module.exports = authMiddleware