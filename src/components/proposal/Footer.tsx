import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-dark border-t border-[hsl(var(--uvicuo-dark-border))] py-12 rounded-t-3xl">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/uvicuo-wordmark.png" alt="Uvicuo" className="h-6" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[hsl(var(--uvicuo-dark-muted))]">
            <Link to="/problema" className="hover:text-primary transition-colors">Análisis del Problema</Link>
            <Link to="/solucion" className="hover:text-primary transition-colors">Solución en Detalle</Link>
            <Link to="/impacto" className="hover:text-primary transition-colors">Caso de Negocio</Link>
            <Link to="/apendice" className="hover:text-primary transition-colors">Anexos</Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--uvicuo-dark-border))] pt-8 text-xs text-[hsl(var(--uvicuo-dark-muted))] md:flex-row">
          <p>© {new Date().getFullYear()} Uvicuo. Todos los derechos reservados.</p>
          <p>contacto@uvicuo.com · uvicuo.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
