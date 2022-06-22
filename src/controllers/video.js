import { v2 as cloudinary } from "cloudinary"

import Video from "../models/video.js"

cloudinary.config()

export const fetchAll = async (req, res) => {
  try {
    const data = await Video.find().populate("movieId")

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const fetchById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Video.findById(id).populate("movieId")

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const videoUrl = await cloudinary.uploader.upload(req.body.url, {
      allowed_formats: ["mp4"],
    })

    await Video.create({
      ...req.body,
      url: videoUrl.secure_url,
    })

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params

    await Video.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const destroy = async (req, res) => {
  try {
    const { id } = req.params

    await Video.findByIdAndRemove(id)

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
