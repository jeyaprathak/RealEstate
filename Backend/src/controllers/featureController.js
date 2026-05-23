import prisma from "../config/prisma.js";

export const featureProperty = async (req, res) => {

  try {

    const property = await prisma.property.update({

      where: {
        id: Number(req.params.id)
      },

      data: {
        featured: true
      }

    });

    res.status(200).json({

      success: true,

      message: "Property featured successfully",

      property

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};