import streamifier from "streamifier";

import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message: "No image uploaded"

      });

    }

    const streamUpload = () => {

      return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

          {
            folder: "real-estate"
          },

          (error, result) => {

            if (result) {

              resolve(result);

            } else {

              reject(error);

            }

          }

        );

        streamifier.createReadStream(req.file.buffer)
          .pipe(stream);

      });

    };

    const result = await streamUpload();

    res.status(200).json({

      success: true,

      imageUrl: result.secure_url

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};