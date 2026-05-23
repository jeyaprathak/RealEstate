import prisma from "../config/prisma.js";


// CREATE INQUIRY

export const createInquiry = async (req, res) => {

  try {

    const {
      propertyId,
      message
    } = req.body;

    if (!propertyId || !message) {

      return res.status(400).json({

        success: false,

        message: "Property ID and message are required"

      });

    }

    const inquiry = await prisma.inquiry.create({

      data: {

        propertyId: Number(propertyId),

        userId: req.user.id,

        message

      }

    });

    res.status(201).json({

      success: true,

      message: "Inquiry sent successfully",

      inquiry

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// GET MY INQUIRIES 

export const getMyInquiries = async (req, res) => {

  try {

    const inquiries = await prisma.inquiry.findMany({

      where: {
        userId: req.user.id
      },

      include: {

        property: true

      },

      orderBy: {

        createdAt: "desc"

      }

    });

    res.status(200).json({

      success: true,

      inquiries

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// GET ALL INQUIRIES 

export const getAllInquiries = async (req, res) => {

  try {

    const inquiries = await prisma.inquiry.findMany({

      include: {

        user: true,

        property: true

      },

      orderBy: {

        createdAt: "desc"

      }

    });

    res.status(200).json({

      success: true,

      inquiries

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// DELETE INQUIRY 

export const deleteInquiry = async (req, res) => {

  try {

    await prisma.inquiry.delete({

      where: {

        id: Number(req.params.id)

      }

    });

    res.status(200).json({

      success: true,

      message: "Inquiry deleted successfully"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};