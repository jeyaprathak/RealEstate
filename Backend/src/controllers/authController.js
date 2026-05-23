import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import prisma from "../config/prisma.js";


//  REGISTER 

export const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;


    // Validation

    if (!name || !email || !password) {

      return res.status(400).json({

        success: false,

        message: "All fields are required"

      });

    }


    // Check Existing User

    const existingUser = await prisma.user.findUnique({

      where: {
        email
      }

    });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message: "User already exists"

      });

    }


    // Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);


    // Role Logic

    const userRole =
      role === "ADMIN"
        ? "ADMIN"
        : "USER";


    // Create User

    const user = await prisma.user.create({

      data: {

        name,

        email,

        password: hashedPassword,

        role: userRole

      },

      select: {

        id: true,

        name: true,

        email: true,

        role: true,

        createdAt: true

      }

    });


    // Response

    res.status(201).json({

      success: true,

      message: "Registration successful",

      user

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// LOGIN 

export const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // Validation

    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message: "Email and password required"

      });

    }


    // Find User

    const user = await prisma.user.findUnique({

      where: {
        email
      }

    });

    if (!user) {

      return res.status(400).json({

        success: false,

        message: "Invalid credentials"

      });

    }


    // Compare Password

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message: "Invalid credentials"

      });

    }


    // JWT Token

    const token = jwt.sign(

      {
        id: user.id,
        email: user.email,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    // Response

    res.status(200).json({

      success: true,

      message: "Login successful",

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role

      }

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// GETUSER

export const getCurrentUser = async (req, res) => {

  try {

    const user = await prisma.user.findUnique({

      where: {
        id: req.user.id
      },

      select: {

        id: true,

        name: true,

        email: true,

        role: true,

        createdAt: true

      }

    });


    res.status(200).json({

      success: true,

      user

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};