import Comment from "../models/comment.js"

export const fetchById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await Comment.findById(id)

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const fetchByUserId = async (req, res) => {
  try {
    const { userId } = req.params
    const data = await Comment.findOne({ userId: userId })

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const fetchByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params
    const data = await Comment.findOne({ movieId: movieId })

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const create = async (req, res) => {
  try {
    await Comment.create(req.body)

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params

    await Comment.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const destroy = async (req, res) => {
  try {
    const { id } = req.params

    await Comment.findByIdAndRemove(id)

    res.status(200).json({ message: "Success!" })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
