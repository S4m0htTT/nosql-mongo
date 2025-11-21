import Game, { IGame } from "../model/Game.js";
import mongoose from "mongoose";

class GameServices {
    constructor() {
        this.createGame = this.createGame.bind(this);
        this.getAllGames = this.getAllGames.bind(this);
        this.getGameById = this.getGameById.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
    }

    async createGame(data: Partial<IGame>, userId: string) {
        try {

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return {
                    success: false,
                    statusCode: 400,
                    errors: "Invalid user ID.",
                    data: { message: "User ID format not valid." }
                };
            }

            const newGame = await Game.create({
                ...data,
                user: userId,
            });

            return {
                success: true,
                statusCode: 201,
                errors: null,
                data: { game: newGame },
            };

        } catch (err) {
            console.log(err);
            return {
                success: false,
                statusCode: 500,
                errors: err,
                data: { message: "Internal Server Error" },
            };
        }
    }

    async getAllGames(userId: string) {
        try {
            const games = await Game.find({ user: userId }).select("-__v");

            return {
                success: true,
                statusCode: 200,
                errors: null,
                data: { games },
            };

        } catch (err) {
            console.log(err);
            return {
                success: false,
                statusCode: 500,
                errors: err,
                data: { message: "Internal Server Error" },
            };
        }
    }

    async getGameById(id: string, userId: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return {
                    success: false,
                    statusCode: 400,
                    errors: "Invalid ID format.",
                    data: { message: "ID format not valid." }
                };
            }

            const game = await Game.findOne({ _id: id, user: userId });

            if (!game) {
                return {
                    success: false,
                    statusCode: 404,
                    errors: "Game not found.",
                    data: { message: "Game not found or not owned by this user." },
                };
            }

            return {
                success: true,
                statusCode: 200,
                errors: null,
                data: { game },
            };

        } catch (err) {
            console.log(err);
            return {
                success: false,
                statusCode: 500,
                errors: err,
                data: { message: "Internal Server Error" },
            };
        }
    }

    async updateGame(id: string, updates: Partial<IGame>, userId: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return {
                    success: false,
                    statusCode: 400,
                    errors: "Invalid ID format.",
                    data: { message: "ID format not valid." }
                };
            }

            const updatedGame = await Game.findOneAndUpdate(
                { _id: id, user: userId },
                updates,
                { new: true }
            );

            if (!updatedGame) {
                return {
                    success: false,
                    statusCode: 404,
                    errors: "Game not found.",
                    data: { message: "Game not found or not owned by this user." },
                };
            }

            return {
                success: true,
                statusCode: 200,
                errors: null,
                data: { game: updatedGame },
            };

        } catch (err) {
            console.log(err);
            return {
                success: false,
                statusCode: 500,
                errors: err,
                data: { message: "Internal Server Error" },
            };
        }
    }

    async deleteGame(id: string, userId: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return {
                    success: false,
                    statusCode: 400,
                    errors: "Invalid ID format.",
                    data: { message: "ID format not valid." }
                };
            }

            const deleted = await Game.findOneAndDelete({
                _id: id,
                user: userId,
            });

            if (!deleted) {
                return {
                    success: false,
                    statusCode: 404,
                    errors: "Game not found.",
                    data: { message: "Game not found or not owned by this user." },
                };
            }

            return {
                success: true,
                statusCode: 200,
                errors: null,
                data: { message: "Game deleted successfully." },
            };

        } catch (err) {
            console.log(err);
            return {
                success: false,
                statusCode: 500,
                errors: err,
                data: { message: "Internal Server Error" },
            };
        }
    }
}

export default GameServices;
