import express, { request } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';
import multer from 'multer'
import path from 'path';
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url';
import { send } from 'process';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)

// console.log(__filename);
// console.log(__dirname);

// Set storage
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '/public/img/avatars'))
        
//     },
//     filename: (req, file, cb)=> {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// let upload = multer({ storage: storage })



//List all users
export const viewUsers = (req, res) => {
    let sql = "SELECT * FROM users ORDER BY id DESC";
    pool.query(sql, (err, rows) =>{
        if(!err) {
            res.render('staff/index', {rows});
        } else {
            console.log(err.message);
        }
    })
}

//get Form page
export const getUserForm = (req, res) => {
    res.render('staff/add-user');
}
// // Add User
// export const addUser = (req, res) => {
    //         const { first_name, last_name, phone, email, dob, comments } = req.body;
    //            pool.query('INSERT INTO users SET first_name = ?, last_name = ?,  phone = ?, email = ?, dob = ?, comments = ?', [first_name, last_name, phone, email, dob, comments], (err, rows) =>{
        //                if(!err){
            //                     req.flash('message', 'Staff member created successfully!')
//                     res.redirect('/staff');
//                 //    res.render('staff/add-user', { alert: 'User added succesfully!' });
//                    } else {
    //                    console.log("Number of records inserted ", rows.affectedRows);
    //                   }
    //         });     


    // app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    //     const file = req.file
    //     if (!file) {
    //         const error = new Error('Please upload a file')
    //         error.httpStatusCode = 400
    //         return next(error)
    //     }
    //     res.send(file)
    // })
    // }

    // Add User
    
    
    export const addUser = ( req, res) => {
        let { first_name, last_name, phone, email, dob, image, comments } = req.body;
        let message = '';
        if (req.method === 'POST') {
            console.log('I been clicked');
            // let upload = multer({ storage: storage }).single('image')
            // let file = req.file.upload;
            // let image = file.name;
            const files = req.body
            console.log(first_name);
            if(!req.files) {
                const error = new Error('Please upload files')
                return res.status(400).send('No files were uploaded.');

                let file = req.files.image;
                let image_name = file.name;
                
                if(file.mimetype == 'image/jpeg' || file.mimetype == "image/png" || file.mimetype == 'image/jpg' || file.mimetype == 'image/gif'){
                    
                     file.mv(__dirname + 'public/img/avatars' + file.name, (err) => {
                         if(err) {
                             return res.status(500).send(err);
                             pool.query('INSERT INTO users SET first_name = ?, last_name = ?,  phone = ?, email = ?, dob = ?, image = ?,comments = ?', [first_name, last_name, phone, email, dob, image, comments], (err, rows) =>{
                                 if(!err){
                                     req.flash('message', 'Staff member created successfully!')
                                     res.redirect('/staff');
                                 } else {
                                     console.log("Number of records inserted ", rows.affectedRows);
                                 }
                             });     

                         }
                     }) 
     
                }
            } else {
                message = "This format is not allowed , please upload file with: png, jpeg, jpg, gif extentions!!!";
                res.render('staff/add-user',{message: message});
        }
    } else {
        res.render('staff/add-user')
    }
        
}


//Find user by search 
export const findUser = (req, res) => {

        let searchTerm = req.body.search;
        pool.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name Like ?', ['%' + searchTerm +'%', '%' + searchTerm +'%'], (err, rows) => {
           if(!err) {
               res.render('/staff/index', {rows});
            } else {
                console.log(err.message);
            }
            
            console.log("Entry name is: \n", rows);
        });
   
}

//get edit form and pass id to update
export const getEditForm = (req, res) => {
       pool.query( "SELECT * FROM users WHERE id = ?", [req.params.id], (err, rows) => {
           if(!err) {
               res.render('staff/edit-user', {rows});
               console.log(rows);
            } else {
                console.log(err.message);
            }
        });
 
}

//Update User
export const updateUser = (req, res) => {
    const { first_name, last_name, email, phone, dob, comments } = req.body;

        pool.query( "UPDATE users SET first_name = ?, last_name= ?,  phone = ?, email = ?, dob = ?, comments = ? WHERE id = ?", [first_name, last_name, phone, email,  dob, comments, req.params.id], (err, rows) => {
           if(!err) {

            pool.query( "SELECT * FROM users WHERE id = ?", [req.params.id], (err, rows) => {
                if(!err) {
                    req.flash('message', 'Staff member updated successfully!')
                    res.redirect('/staff');
                 } else {
                     console.log(err.message);
                 }
             });   
            } else {
                console.log(err.message);
            }
        }); 
}

// Delete user
export const deleteUser = (req, res) => {
        pool.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {
           if(!err) {
               let removeUser = encodeURIComponent('User succesfully romoved!');
               res.redirect('/staff'); 
            //    res.redirect('?removed=' + removeUser); 
            } else {
                console.log(err.message);
            }
            
        });
}


//View singel user
export const singleUser = (req, res) => {
    
        pool.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
           if(!err) {
            res.render('staff/view-user', {rows}); 
            } else {
                console.log(err.message);
            }
            
        });    
}

