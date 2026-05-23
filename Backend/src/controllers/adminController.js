import prisma from "../config/prisma.js";


// ================= GET PENDING PROPERTIES =================

export const getPendingProperties = async (req, res) => {

  try {

    const properties = await prisma.property.findMany({

      where: {
        approved: false
      },

      orderBy: {
        createdAt: "desc"
      }

    });

    res.status(200).json({

      success: true,

      properties

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ================= APPROVE PROPERTY =================

export const approveProperty = async (req, res) => {

  try {

    const property = await prisma.property.update({

      where: {
        id: Number(req.params.id)
      },

      data: {
        approved: true
      }

    });

    res.status(200).json({

      success: true,

      message: "Property approved successfully",

      property

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ================= REJECT PROPERTY =================

export const rejectProperty = async (req, res) => {

  try {

    await prisma.property.delete({

      where: {
        id: Number(req.params.id)
      }

    });

    res.status(200).json({

      success: true,

      message: "Property rejected successfully"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};