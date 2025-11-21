import { Request, Response } from "express";
import GameServices from "../services/GameService.js";

const gameServices = new GameServices();

class GameController {
    private service: GameServices;

    constructor(service: GameServices) {
        this.service = service;

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async create(req: Request, res: Response) {
        //@ts-ignore
        const userId = req.userId;

        const r = await this.service.createGame(req.body, userId);
        return res.status(r.statusCode).send(r);
    }

    public async getAll(req: Request, res: Response) {
        //@ts-ignore
        const userId = req.userId;

        const r = await this.service.getAllGames(userId);
        return res.status(r.statusCode).send(r);
    }

    public async getById(req: Request, res: Response) {
        const { id } = req.params;
        //@ts-ignore
        const userId = req.userId;

        const r = await this.service.getGameById(id, userId);
        return res.status(r.statusCode).send(r);
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        //@ts-ignore
        const userId = req.userId;

        const r = await this.service.updateGame(id, req.body, userId);
        return res.status(r.statusCode).send(r);
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        //@ts-ignore
        const userId = req.userId;

        const r = await this.service.deleteGame(id, userId);
        return res.status(r.statusCode).send(r);
    }
}

export default new GameController(gameServices);
