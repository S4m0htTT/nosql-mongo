import { useState, useEffect } from 'react';
import axios from 'axios';

interface Game {
    _id: string;
    title: string;
    genre: string[];
    plateforme: string[];
    editeur: string;
    developpeur: string;
    annee_sortie: number;
    metacritic_score: number;
    temps_jeu_heures: number;
    termine: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface GameDashboardProps {
    token: string;
    onLogout: () => void;
}

export default function GameDashboard({ token, onLogout }: GameDashboardProps) {
    const [games, setGames] = useState<Game[]>([]);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [plateforme, setPlateforme] = useState('');
    const [editeur, setEditeur] = useState('');
    const [developpeur, setDeveloppeur] = useState('');
    const [annee_sortie, setAnneeSortie] = useState('');
    const [metacritic_score, setMetacriticScore] = useState('');
    const [temps_jeu_heures, setTempsJeuHeures] = useState('');
    const [termine, setTermine] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const api = axios.create({
        baseURL: 'http://localhost:5002/v1/api',
        headers: { Authorization: `Bearer ${token}` },
    });

    const fetchGames = async () => {
        try {
            const response = await api.get('/games');
            setGames(response.data.data.games);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const gameData = {
                title,
                genre: genre.split(',').map(g => g.trim()),
                plateforme: plateforme.split(',').map(p => p.trim()),
                editeur,
                developpeur,
                annee_sortie: Number(annee_sortie),
                metacritic_score: Number(metacritic_score),
                temps_jeu_heures: Number(temps_jeu_heures),
                termine
            };

            if (editingId) {
                await api.put(`/game/${editingId}`, gameData);
            } else {
                await api.post('/game', gameData);
            }
            resetForm();
            fetchGames();
        } catch (error) {
            console.error('Error saving game:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this game?')) {
            try {
                await api.delete(`/game/${id}`);
                fetchGames();
            } catch (error) {
                console.error('Error deleting game:', error);
            }
        }
    };

    const handleEdit = (game: Game) => {
        setTitle(game.title);
        setGenre(game.genre.join(', '));
        setPlateforme(game.plateforme.join(', '));
        setEditeur(game.editeur);
        setDeveloppeur(game.developpeur);
        setAnneeSortie(game.annee_sortie.toString());
        setMetacriticScore(game.metacritic_score.toString());
        setTempsJeuHeures(game.temps_jeu_heures.toString());
        setTermine(game.termine);
        setEditingId(game._id);
    };

    const resetForm = () => {
        setTitle('');
        setGenre('');
        setPlateforme('');
        setEditeur('');
        setDeveloppeur('');
        setAnneeSortie('');
        setMetacriticScore('');
        setTempsJeuHeures('');
        setTermine(false);
        setEditingId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Game Dashboard</h1>
                    <button
                        onClick={onLogout}
                        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Form Section */}
                    <div className="md:col-span-1">
                        <div className="rounded-lg bg-white p-6 shadow-md sticky top-8">
                            <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                {editingId ? 'Edit Game' : 'Add New Game'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Developer</label>
                                        <input
                                            type="text"
                                            value={developpeur}
                                            onChange={(e) => setDeveloppeur(e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Publisher</label>
                                        <input
                                            type="text"
                                            value={editeur}
                                            onChange={(e) => setEditeur(e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Genres (comma separated)</label>
                                    <input
                                        type="text"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Platforms (comma separated)</label>
                                    <input
                                        type="text"
                                        value={plateforme}
                                        onChange={(e) => setPlateforme(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Year</label>
                                        <input
                                            type="number"
                                            value={annee_sortie}
                                            onChange={(e) => setAnneeSortie(e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Score</label>
                                        <input
                                            type="number"
                                            value={metacritic_score}
                                            onChange={(e) => setMetacriticScore(e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Hours</label>
                                        <input
                                            type="number"
                                            value={temps_jeu_heures}
                                            onChange={(e) => setTempsJeuHeures(e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={termine}
                                        onChange={(e) => setTermine(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">Game Completed</label>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                    >
                                        {editingId ? 'Update' : 'Create'}
                                    </button>
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                            {games.map((game) => (
                                <div key={game._id} className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{game.title}</h3>
                                        <p className="text-sm text-gray-500">{game.developpeur} - {game.annee_sortie}</p>
                                    </div>

                                    <div className="mb-4 space-y-2 text-sm text-gray-700">
                                        <p><span className="font-semibold">Editeur:</span> {game.editeur}</p>
                                        <p><span className="font-semibold">Genres:</span> {game.genre.join(', ')}</p>
                                        <p><span className="font-semibold">Plateformes:</span> {game.plateforme.join(', ')}</p>
                                        <div className="flex items-center gap-4">
                                            <p><span className="font-semibold">Metacritic:</span> <span className={game.metacritic_score >= 75 ? "text-green-600 font-bold" : "text-yellow-600 font-bold"}>{game.metacritic_score}</span></p>
                                            <p><span className="font-semibold">Temps de jeu:</span> {game.temps_jeu_heures}h</p>
                                        </div>
                                        <p>
                                            <span className="font-semibold">Statut:</span>
                                            <span className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs text-white ${game.termine ? 'bg-green-500' : 'bg-gray-400'}`}>
                                                {game.termine ? 'Terminé' : 'En cours / À faire'}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(game)}
                                            className="rounded-md bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(game._id)}
                                            className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {games.length === 0 && (
                                <div className="col-span-full py-8 text-center text-gray-500">
                                    No games found. Create one to get started!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
