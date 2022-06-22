import Trailer from "../models/trailer.js"

export const fetchAll = async (req, res) => {
  try {
    const data = await Trailer.find().populate("movieId")

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const fetchById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Trailer.findById(id).populate("movieId")

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const create = async (req, res) => {
  try {
    await Trailer.create(req.body)

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params

    await Trailer.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const destroy = async (req, res) => {
  try {
    const { id } = req.params

    await Trailer.findByIdAndRemove(id)

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
