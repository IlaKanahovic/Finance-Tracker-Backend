import { Request, Response } from 'express'
import prisma from '../db/prisma'

export const changeName = async (req: Request, res: Response) => {
    try {
        const { userName } = req.body

        if (!userName) return res.status(400).json({ message: 'userName обязателен' })
        if (userName.length === 0 || userName.trim().length === 0) return res.status(422).json({ message: 'Введите корректный userName' })

        const user = await prisma.user.findUnique({
            where: { id: (req as any).userId }
        })

        const checkValidUserName = await prisma.user.findFirst({
            where: {
                userName: userName,
                NOT: {
                    id: (req as any).userId
                }
            }
        })
        if (checkValidUserName) return res.status(409).json({ message: 'Пользователь с таким userName уже существует' })

        const userUpdate = await prisma.user.update({
            where: { id: (req as any).userId },
            data: { userName: userName }
        })

        res.json({
            userName: userName
        })

    } catch (error) {
        console.error('Error changeName', error)
        res.status(500).json({ message: 'Error server :(' })
    }
}