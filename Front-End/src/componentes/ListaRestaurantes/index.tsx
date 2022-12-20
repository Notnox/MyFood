import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import IPaginacao from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Button, TextField } from '@mui/material';
import http from '../../http';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    getRestaurantes();
  }, [])
  
  const getRestaurantes = () => {
    http.get<IPaginacao<IRestaurante>>('v1/restaurantes/')
      .then(response => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
      })
      .catch(error => {
        console.log("Erro: " + error)
      })

      setBusca('');
  }

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
    .then(response => {
      setRestaurantes([...restaurantes, ...response.data.results]);
      setProximaPagina(response.data.next);
    })
    .catch(error => {
      console.log("Erro: " + error)
    })
  }

  useEffect(() => {
		const novaLista = restaurantes.filter(restaurante => testaBusca(restaurante.nome));
		setRestaurantes([...novaLista]);
	}, [busca]);

	function testaBusca(title: string){
		const regex = new RegExp(busca, 'i');
		return regex.test(title);
	}

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <TextField 
      label="Buscar por Restaurante" 
      variant="outlined" 
      value={busca}
      onChange={evento => setBusca(evento.target.value)}
    />
    {busca && 
    <Button 
      variant='text'
      onClick={getRestaurantes}
    >
      Limpar
    </Button>
    }
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {(proximaPagina && !busca) && 
    <button
      onClick={verMais}
    >Ver mais</button>}
  </section>)
}

export default ListaRestaurantes