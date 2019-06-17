const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User'); 

module.exports.login = async function(req, res){
  const candidate = await User.findOne({email: req.body.email});
  
  if(candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if(passwordResult) {
        const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id
        }, keys.jwt, {expiresIn: 60 * 60})

        res.status(200).json({
            token: `Bearer ${token}`
        })
    } else {
        res.status(401).json({
            message: 'Неправильный пароль'
        })
    }
  } else {
      res.status(404).json({
          message: 'Пользователь с таким email не зарегистрирован'
      })
  }
}

module.exports.register = async function(req, res){
    const candidateLogin = await User.findOne({login: req.body.login});
    const candidateEmail = await User.findOne({email: req.body.email});
    
    if(candidateLogin || candidateEmail ){
        if(candidateLogin) {
            res.status(409).json({
                message: 'Этот логин уже занят, попробуйте другой'
            })
        } else {
            res.status(409).json({
                message: 'Этот email уже зарегистрирован'
            })
        }
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            login: req.body.login
        })

        try {
            await user.save();
            res.status(201).json({user});
        } catch (e) {
            
        }
    }
}