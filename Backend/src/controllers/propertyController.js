import prisma from "../config/prisma.js";


// CREATE PROPERTY 

export const createProperty = async (req, res) => {

  try {

    const {
      title,
      description,
      city,
      location,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      image
    } = req.body;

    const property = await prisma.property.create({

      data: {

        title,

        description,

        city,

        location,

        price: Number(price),

        bedrooms: Number(bedrooms),

        bathrooms: Number(bathrooms),

        propertyType,

        image,

        userId: req.user.id

      }

    });

    res.status(201).json({

      success: true,

      message: "Property created successfully",

      property

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// GET ALL PROPERTIES 

export const getProperties = async (req, res) => {

  try {

    const {
      city,
      propertyType,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10
    } = req.query;

    const properties = await prisma.property.findMany({

      where: {

        city: city
          ? {
              contains: city,
              mode: "insensitive"
            }
          : undefined,

        propertyType: propertyType || undefined,

        price: {

          gte: minPrice
            ? Number(minPrice)
            : undefined,

          lte: maxPrice
            ? Number(maxPrice)
            : undefined
        }
      },

      skip: (page - 1) * limit,

      take: Number(limit),

      orderBy: {
        createdAt: "desc"
      }

    });

    res.status(200).json({

      success: true,

      properties

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// GET SINGLE PROPERTY 

export const getSingleProperty = async (req, res) => {

  try {

    const property = await prisma.property.findUnique({

      where: {
        id: Number(req.params.id)
      }

    });

    res.status(200).json({

      success: true,

      property

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


//  UPDATE PROPERTY

export const updateProperty = async (req, res) => {

  try {

    const property = await prisma.property.update({

      where: {
        id: Number(req.params.id)
      },

      data: req.body

    });

    res.status(200).json({

      success: true,

      message: "Property updated successfully",

      property

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


//  DELETE PROPERTY 

export const deleteProperty = async (req, res) => {
  try {

    const propertyId = Number(req.params.id);

    // Delete related inquiries first
    await prisma.inquiry.deleteMany({
      where: {
        propertyId: propertyId
      }
    });

    // Then delete property
    await prisma.property.delete({
      where: {
        id: propertyId
      }
    });

    res.status(200).json({
      success: true,
      message: "Property deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// FEATURED PROPERTIES 

export const getFeaturedProperties = async (req, res) => {

  try {

    const properties = await prisma.property.findMany({

      where: {
        featured: true
      }

    });

    res.status(200).json({

      success: true,

      properties

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// SIMILAR PROPERTIES 

export const getSimilarProperties = async (req, res) => {

  try {

    const property = await prisma.property.findUnique({

      where: {
        id: Number(req.params.id)
      }

    });

    const properties = await prisma.property.findMany({

      where: {

        city: property.city,

        propertyType: property.propertyType,

        NOT: {
          id: property.id
        }

      },

      take: 4

    });

    res.status(200).json({

      success: true,

      properties

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};