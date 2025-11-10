import { useEffect, useState } from 'react';
import { Chrono } from "react-chrono";
import { TimelineMode } from 'react-chrono/dist/models/TimelineModel';
import styles from './styles.module.css'
import { Icon } from '../Icons';

const items = [
  {
    title: "1. Diagnóstico", 
    subtitle: "Medición inicial", 
    description: "Business Communication Health Score: Puntuación de la Salud de la comunicación empresarial. Duración: de 3 a 5 días.",
    trailingItem: {
        icon: 'velocimetro',
        bgColor: 'rgba(244, 239, 239, 1)',
        color: '#4a4949ff'
    }
  },
  { 
    title: "2. Estrategia a la medida", 
    subtitle: "Planificación práctica", 
    description: "Plan de comunicación práctico y calendarizado, adaptado a las necesidades de la empresa." ,
    trailingItem: {
        icon: 'rocket-02',
        bgColor: 'var(--orange-lighter)',
        color: 'var(--orange-dark)'
    }
  },
  { 
    title: "3. Ejecución certificada", 
    subtitle: "Aliados verificados", 
    description: "Colaboración con aliados certificados para creatividad, pauta y producción.",
    trailingItem: {
        icon: 'line-chart-up-02',
        bgColor: 'var(--green-light)',
        color: 'var(--green-dark)',
    }
  },
  { 
    title: "4. Medición continua", 
    subtitle: "Dashboard de KPI’s", 
    description: "Seguimiento con indicadores clave y mejoras iterativas para optimizar resultados.",
    trailingItem: {
        icon: 'presentation-chart-01',
        bgColor: 'var(--green-light)',
        color: 'var(--green-dark)',
    }
  },
  { 
    title: "5. Gestiona tu proyecto", 
    subtitle: "Plataforma para gestión de proyectos", 
    description: "Evaluaciones frente a resultados y pilotaje con objetivos medibles.",
    trailingItem: {
        icon: 'wallet-04',
        bgColor: 'rgba(244, 239, 239, 1)',
        color: '#4a4949ff'
    },
  },
  { 
    title: "6. Garantía brainOn24", 
    subtitle: "Pilotaje con objetivos claros", 
    description: "Evaluaciones frente a resultados y pilotaje con objetivos medibles.",
    trailingItem: {
        icon: 'corazon-mano',
        bgColor: 'var(--orange-lighter)',
        color: 'var(--orange-dark)'
    }
  },
];

export const HowWeDoItTimeline = () => {
  const [mode, setMode] = useState("VERTICAL_ALTERNATING");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setMode("VERTICAL");
      } else {
        setMode("VERTICAL_ALTERNATING");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", height: "auto" }}>
        <Chrono
          mode={mode as TimelineMode}
          // mode='VERTICAL'
          theme={{
              primary: "#000",
              secondary: "#000",
              cardBgColor: "#fff",
              cardForeColor: '#000',
          }}
          enableOutline={false}
          // cardHeight={120}
          cardHeight='auto'
          onItemSelected={() => {}}
          disableAutoScrollOnClick
          hideControls
          activeItemIndex={999}
          disableClickOnCircle
          disableNavOnKey
        >
          {
            items.map((i, idx) => (
              <CustomCard key={i.title + idx} {...i}  />
            ))
          }
        </Chrono>
    </div>
  )
}

const CustomCard = (
    { title, subtitle, description, trailingItem }: 
    {title: string, subtitle: string, description: string, trailingItem: {icon: string, bgColor: string, color: string}}
) => (
  <div style={{ color: "#000", width: '100%', }}>
    <div className={styles.cardHeader}>
        <div>
            <h4>{title}</h4>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div style={{backgroundColor: trailingItem.bgColor, padding: 7, borderRadius: 7, marginLeft: 20, marginTop: 5}}>
            <Icon name={trailingItem.icon} size={15} color={trailingItem.color} />
        </div>
    </div>
    <p className={styles.description}>{description}</p>
  </div>
);