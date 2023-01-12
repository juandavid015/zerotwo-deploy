const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken.js');
const sendEmail  =require ('../utils/sendEmail.js');
const comparePassword = require('../utils/comparePassword.js');
const { Op } = require('sequelize');
const dotenv = require('dotenv').config();
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

exports.getUserInfoWithGoogle = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email, email_verified: true, registered: true } });
    if (!user) {
      throw new Error("User has not been registered yet. Please Sign up");
    } else {
      if (user.permissions === "Banned")
        throw new Error("User has been banned");
      if (user.email_verified && user.registered) return user;
      throw new Error(
        "Unregistered account. Complete the account veryfication"
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.getUserInfo = async (token, email) => {
  try {
    if (!token) {
      throw new Error("Invalid user");
    } else {
      return jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        { algorithms: "HS256" },
        async function (err, verified) {
          if (err) throw new Error(err.message);
          else {
            const email = verified.email;
            const user = await User.findOne({
              where: { email: email, email_verified: true, registered: true },
            });

            if (user) {
              return user;
            } else throw new Error("Unauthorized");
          }
        }
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginUser = async (email, password) => {
  console.log("email", email);
  try {
    const user = await User.findOne({
      where: { email: email, email_verified: true, registered: true },
    });
    if (!user) throw new Error("User has not been registered. Please Sign up");
    else {
      if (user.permissions === "Banned")
        throw new Error("User has been banned");
      let hashedPassword = user.password;
      console.log("hashed", hashedPassword, password);
      let passwordIsValid = await comparePassword(password, hashedPassword);
      if (passwordIsValid) {
        if (user.email_verified && user.registered) {
          let token = generateToken({ email: user.email });
          return { token: token };
        } else {
          throw new Error(
            "Unregistered account. Complete the account veryfication"
          );
        }
      } else {
        throw new Error("Invalid password");
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.verifyUser = async (token, email) => {
  console.log("email", email);
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return "Something happened. Incorret User verification";
    } else {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        { algorithms: "HS256" },
        async function (err, verified) {
          if (err) throw new Error(err.message);
          else {
            user.email_verified = true;
            user.registered = true;
            console.log(verified);
            await user.save();
            console.log(verified);
            return user;
          }
        }
      );
    }
  } catch (err) {
    console.log("aa", err);
    throw new Error(err.message);
  }
};

exports.createUser = async (user) => {
  //Finding user in db

  const email = user.email;
  const password = user.password.toString();
  const userInDatabase = await User.findAll({
    where: { email: email, email_verified: true, registered: true },
  });
  const userExpired = await User.findOne({
    where: { email: email, email_verified: false, registered: false },
  });

  const userExists = await userInDatabase.length;
  //Hashinh password to secure
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  delete user.changePassword;
  // Asigning/Verifying role, permissions and plan /hardcoded
  user.password = hashedPassword;
  user.rol = user.email === "nicolas.sanchez.previtera2019@gmail.com" ? "Admin" : 
  user.email === 'juandavidgr1002@gmail.com' ? "Admin" : "User";
  user.permissions = user.email === "nicolas.sanchez.previtera2019@gmail.com" ? "All" : 
  user.email === 'juandavidgr1002@gmail.com' ? "All" : "Watch";

  try {
    if (userExists) {
      throw new Error(`User is already registered with email ${email}`);
    } else if(userExpired) {
      await userExpired.destroy();
    } else {
  
      const userCreated = await User.create(user);
      let token = generateToken({ email: user.email });
      console.log(token);
      console.log(user);
      const message = `${CLIENT_ORIGIN_URL || 'http://localhost:3001'}/user/verify/${email}/${token}`;
      await sendEmail(email, "Zero Two: Verify your account", message);
      return userCreated;
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteUser = async (email) => {
  let user = await User.findOne({ where: { email: email } });

  try {
    if (!user) {
      throw new Error("User could not be founded");
    } else {
      await User.destroy({ where: { email: email } });
      return "User deleted successfully!";
    }
  } catch (err) {
    throw new Error(err.message);
  }

};

exports.defineCategoryGenin = async (id, token) => {
  try {
    let userX = await User.findOne({ where: { id } });
    userX.token = token;
    userX.plan = "1";

    await userX.save();
    return userX;
  } catch (error) {
    console.log(error.message);
  }
};

exports.defineCategoryChuunin = async (id, token) => {
  try {
    let userX = await User.findOne({ where: { id } });
    userX.token = token;
    userX.plan = "2";

    await userX.save();
    return userX;
  } catch (error) {
    console.log(error);
  }
};

exports.defineCategoryJounin = async (id, token) => {
  try {
    let userX = await User.findOne({ where: { id } });
    userX.token = token;
    userX.plan = "3";
    
    await userX.save();
    return userX;
  } catch (error) {
    console.log(error);
  }
};


exports.searchuser = async (name) => {

  if (!name) {
    return [];
  }
  else {
    let user = await User.findAll({where: {nickname: {[Op.like]: `%${name}%`}, email_verified: true, registered: true}});
  
    try {
      if(!user) {
        throw new Error('User could not be founded');
      }
       else {
        return user
      }
    } catch(err) {
      throw new Error(err.message);
    }
  }
  
}

exports.modifyUser = async (userId, settings) => {
  let user = await User.findOne({where: {id: userId}});
  console.log(userId, settings)
  try {
    if(!user) {
      throw new Error('User could not be founded');
    } else {

      let password = settings.password;
      let confirmPassword = settings.confirmPassword;

      if(password.length && confirmPassword.length) {
        if (password === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          Object.entries(settings).forEach(([key, value]) => {
            if(key === 'password') {
              user[key] = hashedPassword;
              
            } else {
              user[key] = value;
            }
            
          })

          await user.save();
          console.log(user);
    
          return user

        } else {
          throw new Error('"Password" and "Confirm password" are not the same')
        }
       
      } else {
        delete settings.password;
        delete settings.confirmPassword;

        Object.entries(settings).forEach(([key, value]) => {
          if(value.length) user[key] = value;
          else return
        })

        await user.save();
        console.log(user);
  
        return user
      }
      
    }
  } catch(err) {
    console.log(err.message)
    throw new Error(err.message);
  }
}
