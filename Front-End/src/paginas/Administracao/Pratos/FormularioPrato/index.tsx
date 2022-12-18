import { Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http";
import IRestaurante from "../../../../interfaces/IRestaurante";
import ITag from "../../../../interfaces/ITag";


interface IPratoCadastro {
    nome: string;
    tag: string;
    descricao: string;
    restaurante: number | string;
    imagem: File | null;
}

const FormularioPratos: React.FC = () => {
    const parametros = useParams();
    const [prato, setPrato] = useState<Partial<IPratoCadastro>>({});
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        http.get<{tags: ITag[]}>('v2/tags/')
        .then(response => {
            setTags(response.data.tags);
        })

        http.get<IRestaurante[]>('v2/restaurantes/')
        .then(response => {
            setRestaurantes(response.data);
        })
    }, [])

    
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        console.log(prato)
        const formData = new FormData();

        if (prato.nome) {
            formData.append('nome', prato.nome);
        }
        if (prato.descricao) {
            formData.append('descricao', prato.descricao);
        }
        if (prato.tag) {
            formData.append('tag', prato.tag);
        }
        if (prato.restaurante) {
            formData.append('restaurante', prato.restaurante.toString());
        }
        if (prato.imagem) {
            formData.append('imagem', prato.imagem);
        }
        http.request({
            url: 'v2/pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(() => {
            alert('Prato cadastrado com sucesso!');
            setPrato({...prato, });
        })
        .catch(error => {
            console.log('Erro: ', error);
        })
    }

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setPrato({...prato, imagem: evento.target.files[0]});
        } else {
            setPrato({...prato, imagem: null});
        }
    }

    return (
        <>
            <Typography component="h1" variant="h6">
                Formulário de Pratos
            </Typography>
            <Box component="form" onSubmit={aoSubmeterForm} sx={{width: '100%'}}>
                <TextField 
                    label="Nome do Prato" 
                    variant="standard" 
                    value={prato?.nome} 
                    onChange={e => setPrato({...prato, nome: e.target.value})}
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField 
                    label="Descricao do Prato" 
                    variant="standard" 
                    value={prato?.descricao} 
                    onChange={e => setPrato({...prato, descricao: e.target.value})}
                    fullWidth
                    required
                    margin="dense"
                />
                <FormControl 
                    margin="dense"
                    fullWidth
                >
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select 
                        labelId="select-tag" 
                        value={prato.tag} 
                        onChange={e => setPrato({...prato, tag: e.target.value})}
                    >
                        {tags?.map(tag => (
                            <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl 
                    margin="dense"
                    fullWidth
                >
                    <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                    <Select 
                        labelId="select-restaurante" 
                        value={prato.restaurante} 
                        onChange={e => setPrato({...prato, restaurante: e.target.value})}
                    >
                        {restaurantes?.map(rest => (
                            <MenuItem key={rest.id} value={rest.id}>
                                {rest.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <input type='file' onChange={selecionarArquivo} />
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

export default FormularioPratos;