import Genre from "../models/genre.js"

export const fetchAll = async (req, res) => {
  try {
    const data = await Genre.find()

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const fetchById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Genre.findById(id)

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const create = async (req, res) => {
  try {
    await Genre.create(req.body)

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params

    await Genre.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const destroy = async (req, res) => {
  try {
    const { id } = req.params

    await Genre.findByIdAndRemove(id)

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
