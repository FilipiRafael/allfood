import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import IPaginacao from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState<string>('');

  const loadMore = () => {
    axios.get<IPaginacao<IRestaurante>>(nextPage)
      .then((response) => {
        setRestaurantes([...restaurantes, ...response.data.results]);
        setNextPage(response.data.next);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then((response) => {
        setRestaurantes(response.data.results);
        setNextPage(response.data.next);
      })
      .catch((err) => console.error(err));
  }, []);

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {nextPage && <button onClick={loadMore}>Ver mais</button>}
  </section>)
}

export default ListaRestaurantes;