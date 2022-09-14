import joi from "joi"; 

export const signUpSchema = joi.object({ 
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(/^[a-zA-Z0-9"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", ".", ":", ";", "|","~","`","{","}","<",">","?","/"]{10,}/).required(), 
    confirmPassword: joi.string().pattern(/^[a-zA-Z0-9"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", ".", ":", ";", "|","~","`","{","}","<",">","?","/"]{10,}/).required()
}) 

export const loginSchema = joi.object({ 
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(/^[a-zA-Z0-9"!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", ".", ":", ";", "|","~","`","{","}","<",">","?","/"]{10,}/).required(), 
})