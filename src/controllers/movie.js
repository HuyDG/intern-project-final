import { v2 as cloudinary } from "cloudinary"

import Movie from "../models/movie.js"

cloudinary.config()

export const fetchAll = async (req, res) => {
  try {
    const data = await Movie.find().populate("genres")

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const fetchById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Movie.findById(id).populate("genres")

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const posterImage = await cloudinary.uploader.upload(req.body.posterImage, {
      allowed_formats: ["jpg", "png"],
    })
    const bannerImage = await cloudinary.uploader.upload(req.body.bannerImage, {
      allowed_formats: ["jpg", "png"],
    })

    await Movie.create({
      ...req.body,
      posterImage: posterImage.secure_url,
      bannerImage: bannerImage.secure_url,
    })

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params

    await Movie.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const destroy = async (req, res) => {
  try {
    const { id } = req.params

    await Movie.findByIdAndRemove(id)

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
