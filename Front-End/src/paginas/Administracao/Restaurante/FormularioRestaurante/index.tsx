import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http";
import IRestaurante from "../../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
    const parametros = useParams();
    const [nomeRestaurante, setNomeRestaurante] = useState('');

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`v2/restaurantes/${parametros.id}/`)
            .then(response => {
                setNomeRestaurante(response.data.nome);
            })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            http.put(`v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert('Restaurante atualizado com sucesso!');
            })
            .catch(error => {
                console.log('Erro: ' + error);
            })
        } else {
            http.post('v2/restaurantes/', {
                nome: nomeRestaurante
            })
            .then(() => {
                alert('Restaurante cadastrado com sucesso!');
            })
            .catch(error => {
                console.log('Erro: ' + error);
            })
        }
    }
    return (
        <>
            <Typography component="h1" variant="h6">
                Formulário de Restaurantes
            </Typography>
            <Box component="form" onSubmit={aoSubmeterForm} sx={{width: '100%'}}>
                <TextField 
                    label="Nome do restaurante" 
                    variant="standard" 
                    value={nomeRestaurante} 
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    fullWidth
                    required
                    />
                <Button 
                    sx={{marginTop: '1'}}
                    variant="outlined"
                    type="submit"
                    fullWidth
                    >
                    Salvar
                </Button>
            </Box>
        </>
    )
}

export default FormularioRestaurante;