const formidable = require('formidable');
const validator = require('validator');
const registerModel = require('../models/authModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { match } = require('assert');

module.exports.userRegister = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const {
            userName, email, password, confirmPassword
        } = fields;
        const { image } = files;
        const error = [];
        if (!userName) {
            error.push('Vui lòng nhập tên người dùng.');
        }
        if (!email) {
            error.push('Vui lòng nhập địa chỉ Email.');
        }
        if (email && !validator.isEmail(email)) {
            error.push('Vui lòng nhập địa chỉ Email hợp lệ.');
        }
        if (!password) {
            error.push('Vui lòng nhập mật khẩu.');
        }
        if (!confirmPassword) {
            error.push('Vui lòng xác nhận mật khẩu.');
        }
        if (password && confirmPassword && password !== confirmPassword) {
            error.push('Mật khẩu và xác nhận mật khẩu không khớp.');
        }
        if (password && password.length < 6) {
            error.push('Mật khẩu phải có ít nhất 6 ký tự.');
        }
        if (Object.keys(files).length === 0) {
            error.push('Vui lòng chọn ảnh đại diện.');
        }
        if (error.length > 0) {
            res.status(400).json({
                error: {
                    errorMessage: error
                }
            })
        } else {
            const getImageName = files.image.originalFilename;
            const randNumber = Math.floor(Math.random() * 99999);
            const newImageName = randNumber + getImageName;
            files.image.originalFilename = newImageName;
            const newPath = __dirname + `../../../frontend/public/image/${files.image.originalFilename}`;
            try {
                const checkUser = await registerModel.findOne({
                    email: email
                });
                if (checkUser) {
                    res.status(404).json({
                        error: {
                            errorMessage: ['Email này đã được sử dụng.']
                        }
                    })
                } else {
                    fs.copyFile(files.image.filepath, newPath, async (error) => {
                        if (!error) {
                            const userCreate = await registerModel.create({
                                userName,
                                email,
                                password: await bcrypt.hash(password, 10),
                                image: files.image.originalFilename
                            });
                            const token = jwt.sign({
                                id: userCreate._id,
                                userName: userCreate.userName,
                                email: userCreate.email,
                                image: userCreate.image,
                                registerTime: userCreate.createdAt
                            }, process.env.SECRET, {
                                expiresIn: process.env.TOKEN_EXP
                            });
                            const options = {
                                expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)
                            }
                            res.status(201).cookie('authToken', token, options).json({
                                successMessage: 'Bạn đã đăng ký thành công!', token
                            })
                        } else {
                            console.error(error);
                            res.status(500).json({
                                error: {
                                    errorMessage: ['Interanl Server Error']
                                }
                            })
                        }
                    })
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    error: {
                        errorMessage: ['Interanl Server Error']
                    }
                })
            }
        }
    })
}

module.exports.userLogin = async (req, res) => {
    const error = [];
    const { email, password } = req.body;
    if (!email) {
        error.push('Vui lòng nhập địa chỉ Email.');
    }
    if (!password) {
        error.push('Vui lòng nhập mật khẩu.');
    }
    if (email && !validator.isEmail(email)) {
        error.push('Vui lòng nhập địa chỉ Email hợp lệ.');
    }
    if (error.length > 0) {
        res.status(400).json({
            error: {
                errorMessage: error
            }
        })
    } else {
        try {
            const checkUser = await registerModel.findOne({
                email: email
            }).select('+password');
            if (checkUser) {
                const matchPassword = await bcrypt.compare(password, checkUser.password);
                if (matchPassword) {
                    const token = jwt.sign({
                        id: checkUser._id,
                        userName: checkUser.userName,
                        email: checkUser.email,
                        image: checkUser.image,
                        registerTime: checkUser.createdAt
                    }, process.env.SECRET, {
                        expiresIn: process.env.TOKEN_EXP
                    });
                    const options = {
                        expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000)
                    }
                    res.status(200).cookie('authToken', token, options).json({
                        successMessage: 'Bạn đã đăng nhập thành công!', token
                    })
                } else {
                    res.status(400).json({
                        error: {
                            errorMessage: ['Mật khẩu không đúng.']
                        }
                    })
                }
            } else {
                res.status(404).json({
                    error: {
                        errorMessage: ['Email không tồn tại.']
                    }
                })
            }
        } catch {
            res.status(404).json({
                error: {
                    errorMessage: ['Interanl Server Error']
                }
            })
        }
    }
}