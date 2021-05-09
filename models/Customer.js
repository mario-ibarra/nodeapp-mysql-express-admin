import express, { request } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

// Constructor
 export const Customer = (req, res, customer) => {
    this.name = customer.name;
    this.email = customer.email;
    this.active = customer.active;
}

Customer.create = (newCustomer, result) => {
    pool.query("INSERT INTO customers SET ?", newCustomer, ( err, res) => {
        if(!err) {
            console.log("Customer Created", {id: res.insertId, ...newCustomer});
            result(null, {id: res.insertId, ...newCustomer})
            return
        }
        console.log("error:", err);
        result (err, null);
        return
    })
}

Customer.findById = (customerId, result) => {
    pool.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Customer.getAll = result => {
    pool.query("SELECT * FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
  
  Customer.updateById = (id, customer, result) => {
    pool.query(
      "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
      [customer.email, customer.name, customer.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  };
  
  Customer.remove = (id, result) => {
    pool.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  };
  
  Customer.removeAll = result => {
    pool.query("DELETE FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };
  
export default Customer;