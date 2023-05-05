const pool = require("../config/db");


const registerUserModels = (data) => {
    const { id, email, name, password, otp } = data;
    return new Promise((resolve, reject) =>
      pool.query(`INSERT INTO users(id, email, name, password, otp) VALUES('${id}', '${email}', '${name}', '${password}', ${otp})`, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err.message);
        }
      })
    );
};


const userEmailModels = (email) => {
    return new Promise((resolve, reject) => 
        pool.query(`SELECT * FROM users WHERE users.email = '${email}'`, 
            (err, res) => {
                if(!err){
                    resolve(res);
                } else {
                    reject(err.message);
                }
            }) 
    );
};

const userIdModels = (id) => {
    return new Promise((resolve, reject) => 
        pool.query(`SELECT * FROM users WHERE users.id = '${id}'`, 
            (err, res) => {
                if(!err){
                    resolve(res);
                } else {
                    reject(err.message);
                }
        }) 
    );
};

const verifyUserModels = (id) => {
    return pool.query(`UPDATE users SET verif=1 WHERE users.id='${id}';`);
};


const updateUserModels = (data, id) => {
    let { email, password, name, photo, phone, address, city, country, postal_code  } = data;
  
    return pool.query(`UPDATE users SET email='${email}',password ='${password}',name ='${name}', photo = '${photo}', phone='${phone}', address='${address}', city='${city}', country='${country}', postal_code='${postal_code}' WHERE users.id='${id}';`);
  };



module.exports ={registerUserModels, userIdModels, userEmailModels, verifyUserModels, updateUserModels}