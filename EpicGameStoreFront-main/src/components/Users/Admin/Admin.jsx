import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Admin.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../../NavBar/NavBar";
import ListUsers from "./ListUsers/ListUsers";
import ListVideogames from "./ListVideogames/ListVideogames";
import { getVideogames } from "../../../actions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Admin() {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("Token"));
    const [acti, setActivos] = useState(null);
    const [user, setUser] = useState({});
    const [listGames, setListGames] = useState([])
    const [listUsersAct, setListUsers] = useState([]);
    const [listUsersFil, setListUsersFil] = useState([])
    const listaUserFil = useSelector((state) => state.usersFiltra);
    const [listaVideogames, setListaVideogames] = useState([]);
    const history = useHistory();
    const [selectedRole, setSelectedRole] = useState("");
    const [userStats, setUserStats] = useState({})
    const [statsVideogames, setUserStatsVideogames] = useState({})


    const dataStatusUsers = [
        {
            name: "Usuarios Activos",
            cantidad: userStats.activeUsers,
        },
        {
            name: "Usuarios Inactivos",
            cantidad: userStats.inactiveUsers,
        },
        {
            name: "Total Usuarios",
            cantidad: userStats.totalUsers,
        }
    ];

    const dataRolUsers = [
        {
            name: "Vendedores",
            cantidad: userStats.totalVendors,
        },
        {
            name: "Clientes",
            cantidad: userStats.totalClients,
        },
        {
            name: "Total Usuarios",
            cantidad: userStats.totalUsers,
        }
    ];

    const dataVideogames = [
        {
            name: "Videogames Activos",
            cantidad: statsVideogames.activeVideogames,
        },
        {
            name: "Videogames Inactivos",
            cantidad: statsVideogames.inactiveVideogames,
        },
        {
            name: "Videogames pending",
            cantidad: statsVideogames.pendingVideogames,
        },
        {
            name: "Videogames total",
            cantidad: statsVideogames.totalVideogames,
        }
    ];



    const handleGetStatsVideogames = () => {
        try {
            axios.get("/admin/videogameStats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUserStatsVideogames(response.data)
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetStatsUsers = () => {
        try {
            axios.get("/admin/userStats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUserStats(response.data)
                });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (acti === null) {
            return;
        }

        if (acti === "All") {
            console.log("todos los usuarios");
            getDataUsers();
        } else {
            setListUsers(listaUserFil);
        }
        handleGetStatsUsers()
    }, [acti, dataStatusUsers]);

    const handleBamUser = async (id, isActive) => {
        const update = {
            active: !isActive,
        };
        try {
            axios.patch(`/users/${id}`, update, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    getDataUsers();
                    handleGetStatsUsers();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditRole = async (e, id) => {
        const update = {
            role: e.target.value,
        };
        try {
            axios.patch(`/users/${id}`, update, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    getDataUsers()
                    handleGetStatsUsers()
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getListVideogame = async () => {
        axios.get("/admin/videogames", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setListaVideogames(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDataUsers = async () => {
        axios.get("/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setListUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            await getDataUsers();
            handleGetStatsVideogames();
            await handleGetStatsUsers();
            await getListVideogame();
            if (listaVideogames.length === 0) {
                dispatch(getVideogames());
            }
        };
        console.log("hola");
        fetchData();
    }, []);

    useEffect(() => {
        setListGames(listaVideogames);
    }, [listaVideogames]);

    useEffect(() => {
        setListUsersFil(listUsersAct)
    }, [listUsersAct]);


    const btnClick = () => {
        localStorage.setItem("userData", JSON.stringify({}));
        history.push("/home");
    };

    const filterListUsersAct = () => {
        const newList = listUsersAct.filter((game) => game.isActive)
        setListUsersFil(newList)
    };

    const filterListUsersInac = () => {
        const newList = listUsersAct.filter((game) => game.isActive === false)
        setListUsersFil(newList)
    };

    const filterListUsersAll = () => {
        if(listUsersAct.length === 0){
            console.log("holaaaa");
            getDataUsers()
        }
        const newList = listUsersAct
        setListUsersFil(newList)
    };

    const handleRoleChange = async (e) => {
        axios.get(`/admin/users?role=${e.target.value}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setListUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setSelectedRole(e.target.value);
    };

    const filterListVideogamesAct = () => {
        const newList = listaVideogames.filter((game) => game.status === "active")
        setListGames(newList)
    }

    const filterListVideogamesInac = () => {
        const newList = listaVideogames.filter((game) => game.status === "inactive")
        setListGames(newList)
    }

    const filterListVideogamesPending = () => {
        const newList = listaVideogames.filter((game) => game.status === "pendingApproval")
        setListGames(newList)
    }

    const filterListVideogamesAll = () => {
        const newList = listaVideogames
        setListGames(newList)
    }

    return (
        <div>
            <NavBar />
            {
                <div>
                    <div className={style.container}>
                        {/* <-----------------------------------------------------------------------------------usuarios------------------------------------------------->                         */}
                        <div className={style.containerUsers}>
                            <div className={style.listUsers}>

                                <div className={style.filtreusers} style={{ marginBottom: "10px" }}>
                                    <button className={style.button} onClick={filterListUsersAct}>
                                        usuariosAct
                                    </button>
                                    <button className={style.button} onClick={filterListUsersInac}>
                                        usuariosDes
                                    </button>
                                    <button
                                        className={style.button}
                                        onClick={filterListUsersAll}
                                    >
                                        todos
                                    </button>
                                    <select
                                        className={style.select}
                                        onChange={handleRoleChange}
                                        value={selectedRole}
                                    >
                                        <option value="">ALL</option>
                                        <option value="vendedor">Vendedor</option>
                                        <option value="cliente">Cliente</option>
                                    </select>
                                </div>
                                <div className={style.user}>
                                    <h1 className={style.title}>{user.nombre}</h1>
                                    <div className={style.listContainer}>
                                        <ListUsers
                                            lista={listUsersFil}
                                            boton={handleBamUser}
                                            handleEditRole={handleEditRole}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={style.statisticsContainer}>
                                <h2>Estadísticas</h2>
                                <p>Total Active Users: {userStats.activeUsers}</p>
                                <p>Total Inactive Users: {userStats.inactiveUsers} </p>
                                <p>Total Users: {userStats.totalUsers}</p>
                                {/* Gráfico con Recharts */}
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={dataStatusUsers}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="cantidad" fill="#b4d1f0" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className={style.statisticsContainer}>
                                <h2>Estadísticas Rol Vendedores</h2>
                                {/* Gráfico con Recharts */}
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={dataRolUsers}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="cantidad" fill="#858a8f" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            </div>
                        </div>
                        {/* <----------------------------------------------------------------------------- Videogames ------------------------------------------------------------->                         */}
                        <div className={style.videogamesContainer}>
                            <button className={style.button} onClick={() => filterListVideogamesAct()}>
                                VideogamesAct
                            </button>
                            <button className={style.button} onClick={() => filterListVideogamesInac()}>
                                VideogamesDes
                            </button>
                            <button className={style.button} onClick={() => filterListVideogamesPending()}>
                                VideogamesPending
                            </button>
                            <button className={style.button} onClick={() => filterListVideogamesAll()}>
                                All
                            </button>
                            <ListVideogames
                                lista={listGames}
                                token={token}
                                getListVideogame={getListVideogame}
                                handleGetStatsVideogames={handleGetStatsVideogames}
                            />
                            <div className={style.statisticsContainer}>
                                <h2>Estadísticas</h2>
                                <p>Total Active Videogame: {userStats.activeUsers}</p>
                                <p>Total Inactive Videogame: {statsVideogames.inactiveVideogames} </p>
                                <p>Total Pensing Videogame: { statsVideogames.pendingVideogames} </p>
                                <p>Total Videogame: {statsVideogames.totalVideogames}</p>
                                {/* Gráfico con Recharts */}
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={dataVideogames}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="cantidad" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.button} onClick={btnClick}>
                                Cerrar sesión
                            </button>
                            <br />
                            <Link to="/home" className={style.link}>
                                HOME
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default Admin;