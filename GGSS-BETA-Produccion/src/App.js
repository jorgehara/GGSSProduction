import './App.css';
import NavbarMenu from './components/Navbar/NavbarMenu';

import { Routes as Switch,  Route, useParams, useLocation,
  // useLocation
} from "react-router-dom";
import Empleados from './components/Home/Empleados';
import Superadmin from './components/Superadmin/Superadmin';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { saveError, saveStatusCode } from './redux/actions/fetchActions';
import ErrorPage from './components/ErrorPage/ErrorPage';



function App() {
  const [ existe, setExiste ] = useState(false);
  const [ tokenDef, setTokenDef ] = useState("");
  const [ error , setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ statusCode, setStatusCode ] = useState(0);
  const [ perfilesUsuario, sePerfilesUSuario ] = useState({});
  const [ renderButtons, setRenderButtons ] = useState(0);
  const [ modalOpen, setModalOpen ] = useState(false);
  
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const dispatch = useDispatch();
  const estadoCivilRef = useRef();
  const estudiosRef = useRef();
  const tipoDocumentoRef = useRef();
  const estadoRef = useRef();
  const formasPagoRef = useRef();
  const callesRef = useRef();
  const cargosRef = useRef();
  const tDesempeñadasRef = useRef();
  const mLiquidRef = useRef();
  const mContratRef = useRef();
  const parentRef = useRef();
  const paisesRef = useRef();
  const pldbRef = useRef();
  const docuRef = useRef();

  function handleClickRef(e, referencia, modalName) {
    e.preventDefault();
    referencia.current.click(modalName);
  }
  function renderButtonFunction(index){
    setRenderButtons(index)
 }
  
    const referencias = {
      estadoCivilRef : estadoCivilRef,
      estudiosRef: estudiosRef,
      tipoDocumentoRef : tipoDocumentoRef,
      estadoRef : estadoRef,
      formasPagoRef : formasPagoRef,
      callesRef : callesRef,
      cargosRef : cargosRef,
      tDesempeñadasRef : tDesempeñadasRef,
      mLiquidRef : mLiquidRef,
      mContratRef : mContratRef,
      parentRef : parentRef,
      paisesRef : paisesRef,
      pldbRef : pldbRef,
      docuRef : docuRef
    }
  async function validationUser(){
    setLoading(true)
    try{
      await axios.get(`http://18.205.227.88:8080/token?token=${token ? token : localStorage.getItem('token')}`,  {headers: {
        'Access-Control-Allow-Origin': '*'
    }})
      .then((res)=>{
          
          if(res.data.statusCode === 200){
            setExiste(true)
            setTokenDef(res.data.result)
            setLoading(false)
            localStorage.setItem('token', res.data.result);
          }else{
            setError(res.data.message);
            setStatusCode(res.data.statusCode);
            setLoading(false)
          }
      })
    }catch(err){
      setLoading(false)
      swal({
        title : "Error",
        text : "El usuario no tiene permiso o el Token es inválido",
        icon : "error"
      })
    }
  }
  async function validateAdmin(){
    try{
      await axios.post(`http://18.205.227.88/post?token=${token ? token : localStorage.getItem('token')}`)
      .then((res)=>{
        sePerfilesUSuario(res.data)
      })
    }catch(err){
      throw err
    }
  }
  
  useEffect(()=>{
    validationUser();
    validateAdmin();
  },[])
  useEffect(() => {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Configurar un tiempo límite de 2 horas (en milisegundos)
      const tiempoLimite = 2 * 60 * 60 * 1000;
      
      // Configurar la eliminación automática del token después del tiempo límite
      const timeoutId = setTimeout(() => {
        localStorage.removeItem('token');
      }, tiempoLimite);
      
      // Limpiar el timeout cuando se desmonte el componente
      return () => clearTimeout(timeoutId);
    }
  }, []);
  return (
    <>
      {
        tokenDef ? 
        <NavbarMenu modalOpen={modalOpen} setModalOpen={setModalOpen}  renderButtonFunction={renderButtonFunction} perfilesUsuario={perfilesUsuario} referencias={referencias} setTokenDef={setTokenDef} sePerfilesUSuario={sePerfilesUSuario} /> 
        : 
        <ErrorPage message={error} statusCode={statusCode} loading={loading} /> 
      } 
      {
      tokenDef && <Switch>
        <Route path="/ficha-empleados" exact element={<Empleados setRenderButtons={setRenderButtons} modalOpen={modalOpen} setModalOpen={setModalOpen}  renderButtons={renderButtons} handleClickRef={handleClickRef} referencia={referencias} loading={loading} sePerfilesUSuario={sePerfilesUSuario} tokenDef={tokenDef}/>} /> 
        <Route path="/superadmin" exact element={<Superadmin />} />
      </Switch> 
      }       
    </>
    
  );
}

export default App;