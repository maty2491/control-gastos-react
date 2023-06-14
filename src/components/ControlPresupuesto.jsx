import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ gastos,setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    setGastado(totalGastado);
    const totalDisponible = presupuesto - totalGastado;

    // Calcular el porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(0);
    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleReset = () =>{
    const res = confirm('¿Deseas renicinar la app?')
    if(res){
      setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
    }

  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "3BB2F6",
            trailColor: "#f5f5f5",
            textColor: porcentaje > 100 ? "#DC2626" : "3BB2F6",
          })}
          value={porcentaje}
          text={`Gastado ${porcentaje}%`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleReset}>
          Resetear APP
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : " "}`}>
          <span>Disponible: </span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
