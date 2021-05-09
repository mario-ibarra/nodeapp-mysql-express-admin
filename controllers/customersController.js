import express, { request } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';


//List all users
export const findAll = (req, res) => {
    let sql = "SELECT * FROM customers ORDER BY id DESC";
    pool.query(sql, (err, rows) =>{
        if(!err) {
            res.render('customers/listAll', {rows});
        } else {
            console.log(err.message);
        }
    })
}

//get Form page
export const getCustomerForm = (req, res) => {
    res.render('customers/add-user');
}
// Add User
export const create = (req, res) => {
        const { first_name, last_name, phone, email } = req.body;
           pool.query('INSERT INTO customers SET first_name = ?, last_name = ?,  phone = ?, email = ?', [first_name, last_name, phone, email, ], (err, rows) =>{
               if(!err){
                    req.flash('message', 'Staff member created successfully!')
                    res.redirect('/staff');
                //    res.render('staff/add-user', { alert: 'User added succesfully!' });
                   } else {
                   console.log("Number of records inserted ", rows.affectedRows);
                  }
        });     
}


//Find user by search 
export const findSingle = (req, res) => {

        let searchTerm = req.body.search;
        pool.query('SELECT * FROM customers WHERE first_name LIKE ? OR last_name Like ?', ['%' + searchTerm +'%', '%' + searchTerm +'%'], (err, rows) => {
           if(!err) {
               res.render('/customers/listAll', {rows});
            } else {
                console.log(err.message);
            }
            
            console.log("Entry name is: \n", rows);
        });
   
}

//get edit form and pass id to update
export const getEditForm = (req, res) => {
       pool.query( "SELECT * FROM customers WHERE id = ?", [req.params.id], (err, rows) => {
           if(!err) {
               res.render('customers/edit-user', {rows});
               console.log(rows);
            } else {
                console.log(err.message);
            }
        });
 
}

//Update User
export const update = (req, res) => {
    const { first_name, last_name, email, phone, dob, comments } = req.body;

        pool.query( "UPDATE customers SET first_name = ?, last_name= ?,  phone = ?, email = ? WHERE id = ?", [first_name, last_name, phone, email,  req.params.id], (err, rows) => {
           if(!err) {

            pool.query( "SELECT * FROM customers WHERE id = ?", [req.params.id], (err, rows) => {
                if(!err) {
                    req.flash('message', 'Customer member updated successfully!')
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
export const remove = (req, res) => {
        pool.query('DELETE FROM customers WHERE id = ?', [req.params.id], (err, rows) => {
           if(!err) {
               let removeUser = encodeURIComponent('Customer succesfully romoved!');
               res.redirect('/staff'); 
            //    res.redirect('?removed=' + removeUser); 
            } else {
                console.log(err.message);
            }
            
        });
}


//View singel user
export const findOne = (req, res) => {
    
        pool.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
           if(!err) {
            res.render('staff/view-user', {rows}); 
            } else {
                console.log(err.message);
            }
            
        });    
}

