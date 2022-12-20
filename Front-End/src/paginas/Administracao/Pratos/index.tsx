import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(()=>{
        http.get<IPrato[]>('v2/pratos/')
        .then(response => {
            setPratos(response.data)
        })
        .catch(error => {
            console.log("Erro: " + error)
        })
    },[])

    const excluir = (pratoExclusao: IPrato) => {
        http.delete(`v2/pratos/${pratoExclusao.id}/`)
        .then(() => {
            const listaPrato = pratos.filter(prato => prato.id !== pratoExclusao.id);
            setPratos([...listaPrato]);
        })
    }
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos?.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                [<a href={prato.imagem} target='_blank' rel="noreferrer">Ver imagem</a>]
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    onClick={() => excluir(prato)}
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

export default AdministracaoPratos;

