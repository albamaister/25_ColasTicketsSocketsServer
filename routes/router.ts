// archivo donde se van a crear las apisResfull

import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';
import { GraficaData } from '../classes/grafica';
import { Mapa } from '../classes/mapa';
import { TicketArrayRepository } from "../repositories/ticketArrayRepository";
import { TicketEscritorioArrayRepository } from "../repositories/ticketEscritorioArrayRepository";

const router = Router(); // es lo que se va a ocupar para crear mis servicios rest


//#region colas
// Tickets
const ticketRepository =  TicketArrayRepository.instance;
const ticketEscritorioRepository = TicketEscritorioArrayRepository.instance;

router.get("/currentTicket", (req: Request, res: Response) => {
  let ticket: number; 
  try{
    ticket = ticketRepository.last();
  } catch(e) {
    return res.json({
      error: true,
      message: e
    });
  }
  res.json({error: false, ticket});
});

router.get("/newTicket", (req: Request, res: Response) => {
  let ticket: number; 
  try{
    ticket = ticketRepository.add();
  } catch(e) {
    return res.json({
      error: true,
      message: e
    });
  }

  const server = Server.instance;
  server.io.emit('last-ticket', ticketRepository.last());
  res.json({error: false, ticket});
});

router.get("/ticketsEscritorios", (req: Request, res: Response) => {
  let ticketsEscritorios; 
  try{
    ticketsEscritorios = ticketEscritorioRepository.getAll();
  } catch(e) {
    return res.json({
      error: true,
      message: e
    });
  }
  res.json({error: false, ticketsEscritorios});
});

router.post("/nextClient", (req: Request, res: Response) => {
  const escritorio = Number(req.body.escritorio);

  let ticket;
  let ticketEscritorio;
  try{
    ticket = ticketRepository.del();
    ticketEscritorio = ticketEscritorioRepository.add(ticket, escritorio);
  } catch(e) {
    return res.json({
      error: true,
      message: e
    });
  }

  const server = Server.instance;
  server.io.emit('update-attend-tickets', ticketEscritorioRepository.getAll());
  console.log(ticketEscritorioRepository.getAll());
  res.json({error: false, ticket});


});

//#endregion colas

const tickets = [
    {
      id: '1',
      numero: 1
    },
    {
      id: '2',
      numero: 2
    },
    { 
      id: '3',
      numero: 3
    }
  ];


// Mapa
export const mapa = new Mapa(); 
const lugares = [
  {
    id: '1',
    nombre: 'Udemy',
    lat: 37.784679,
    lng: -122.395936
  },
  {
    id: '2',
    nombre: 'Bahía de San Francisco',
    lat: 37.798933,
    lng: -122.377732
  },
  { 
    id: '3',
    nombre: 'The Palace Hotel',
    lat: 37.788578,
    lng: -122.401745
  }
];
mapa.marcadores.push(...lugares); // el ... inserta cada dato como si fuera independientes

// Get-todos maracadores que estan en mi clase mapa
router.get('/mapa', ( req: Request, res: Response ) => {
    res.json( mapa.getMarcadores() );
});



// Grafica

const grafica = new GraficaData();

router.get('/grafica', ( req: Request, res: Response ) => {
    res.json( grafica.getDataGrafica() );
});

router.post('/grafica', ( req: Request, res: Response ) => {
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);

    grafica.incrementarValor( mes, unidades );
    const server = Server.instance;

    server.io.emit('cambio-grafica', grafica.getDataGrafica());
  

    res.json(grafica.getDataGrafica());
});


router.post('/mensajes/:id', ( req: Request, res: Response ) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id

    });
});


// Servicio para obtener todos los ids de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[] ) => {
        if ( err ) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clientes
        });
    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => {

        res.json({
            ok: true,
            clientes: usuariosConectados.getLista()
        });
});


export default router;
