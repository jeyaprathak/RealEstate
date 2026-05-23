import prisma from "../config/prisma.js";

export const adminDashboard = async (req, res) => {

  try {

    const totalUsers =
      await prisma.user.count();

    const totalProperties =
      await prisma.property.count();

    const pendingProperties =
      await prisma.property.count({

        where: {
          approved: false
        }

      });

    const featuredProperties =
      await prisma.property.count({

        where: {
          featured: true
        }

      });

    const totalInquiries =
      await prisma.inquiry.count();

    res.status(200).json({

      success: true,

      data: {

        totalUsers,

        totalProperties,

        pendingProperties,

        featuredProperties,

        totalInquiries

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