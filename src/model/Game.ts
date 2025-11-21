import mongoose, {Document, Schema} from "mongoose";

export interface IGame extends Document {
    title: string;
    genre: string[];
    plateforme: string[];
    editeur: string;
    developpeur: string;
    annee_sortie: number;
    metacritic_score: number;
    temps_jeu_heures: number;
    termine: boolean;
    user: mongoose.Types.ObjectId;
}

const GameSchema: Schema<IGame> = new Schema(
    {
        title: {type: String, required: true},
        genre: {type: [String], required: true, index: true},
        plateforme: {type: [String], required: true, index: true},
        editeur: {type: String, required: true},
        developpeur: {type: String, required: true},
        annee_sortie: {type: Number, required: true},
        metacritic_score: {type: Number, required: true},
        temps_jeu_heures: {type: Number, required: true},
        termine: {type: Boolean, required: true, default: false},
        user: {type: Schema.Types.ObjectId, ref: "User", required: true, index: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Game = mongoose.model<IGame>("Game", GameSchema);

export default Game;
