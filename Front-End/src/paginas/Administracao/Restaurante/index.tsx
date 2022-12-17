import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
   
    const [restaurantes, setRestaurante] = useState<IRestaurante[]>([]);

    useEffect(()=>{
        http.get<IRestaurante[]>('v2/restaurantes/')
        .then(response => {
            setRestaurante(response.data)
        })
        .catch(error => {
            console.log("Erro: " + error)
        })
    },[])

    const excluir = (restauranteExclusao: IRestaurante) => {
        http.delete(`v2/restaurantes/${restauranteExclusao.id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExclusao.id);
            setRestaurante([...listaRestaurante]);
        })
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes?.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    onClick={() => excluir(restaurante)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;