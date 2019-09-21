import React from 'react';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getCandidates } from '../../firebase/db';
import { Typography } from '@material-ui/core';

export class ListadoCandidatas extends React.Component {
  constructor(props) {
    super(props);
    //Para pruebas
    /*let arrayCandidatas = [
      {id: 1, nombre: "Pilar", email: "pilar@correo.es", edad: 30 },
      {id: 2, nombre: "Maria", email: "maria@correo.es", edad: 33 }
    ]*/
    this.state = { filtro: '', candidatas: [], error: null };
  }

  componentDidMount() {
    getCandidates()
    .then(datos => this.setState({ candidatas: [...datos.sort((a, b) => a.nombre.localeCompare(b.nombre))] }))
    .catch(err => {
      console.log(err);
      this.setState({ error: err });
    });
  }

  componentWillUnmount() {
  }

  handleChange = e => this.setState({ filtro: e.target.value });

  render() {
    let encabezado, listado;
    if(this.state.error) {
      encabezado = <div>¡Necesita ser administrador para ver las candidatas!</div>
    } else {
      if (this.state.candidatas.length === 0) {
        encabezado = <div>Cargando candidatas, espere...</div>;
      } else {
        encabezado = <div>Listado de candidatas:</div>;
        listado = <div>
            <TextField
                id="filtro"
                label="Filtro"
                onChange={this.handleChange}
                margin="normal"
                helperText="Utilice este filtro para buscar por nombre o email"
            />
            <List>
              {this.state.candidatas.map( c => {
                if (c.nombre.includes(this.state.filtro) || c.email.includes(this.state.filtro)) {
                  return (
                    <ListItem key={c.id}>
                      <ListItemIcon>
                        <Avatar>{c.nombre.charAt(0).toUpperCase()}</Avatar>
                      </ListItemIcon>
                      <ListItemText primary={c.nombre}
                                    secondary={c.email + ', ' + c.edad + ' años'}/>
                    </ListItem>)
                }
              })}
            </List>
          </div>
      }
    }
    return (
      <div>
        <Typography variant="h5">
          {encabezado}
        </Typography>
        {listado}
      </div>

    )
  }

}
