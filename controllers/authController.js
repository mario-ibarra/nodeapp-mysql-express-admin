import express from 'express';
import bcrypt from 'bcryptjs';

import pool from '../db.js';



export const logIn = (req, res) => {
    res.render('auth/login')
}

export const dashboard= (req, res) => {
    res.render('auth/dashboard')
}


