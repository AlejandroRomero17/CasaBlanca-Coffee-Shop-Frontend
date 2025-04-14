import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#4B2E2E] text-white py-16 px-6 md:px-16 lg:px-32">
      <div className="flex flex-col gap-12 md:flex-row md:justify-between md:items-start">
        {/* Marca */}
        <div className="text-center md:text-left">
          <h3 className="mb-2 text-2xl font-bold font-fancy text-gold">
            CasaBlanca
          </h3>
          <p className="max-w-xs text-sm text-white/80">
            Disfruta de una experiencia única con nuestros cafés de
            especialidad, elaborados con pasión y tradición.
          </p>
        </div>

        {/* Navegación */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="mb-1 text-lg font-semibold">Navegación</h4>
          <Link
            to="/"
            className="text-sm transition text-white/80 hover:text-gold"
          >
            Inicio
          </Link>
          <Link
            to="/menu"
            className="text-sm transition text-white/80 hover:text-gold"
          >
            Menú
          </Link>
          <Link
            to="/nosotros"
            className="text-sm transition text-white/80 hover:text-gold"
          >
            Sobre nosotros
          </Link>
          <Link
            to="/contacto"
            className="text-sm transition text-white/80 hover:text-gold"
          >
            Contacto
          </Link>
        </div>

        {/* Contacto y redes */}
        <div className="text-center md:text-left">
          <h4 className="mb-1 text-lg font-semibold">Contáctanos</h4>
          <div className="flex items-center justify-center gap-2 mb-2 text-sm text-white/80 md:justify-start">
            <Mail size={16} /> contacto@casablanca.coffee
          </div>
          <div className="flex items-center justify-center gap-2 mb-4 text-sm text-white/80 md:justify-start">
            <MapPin size={16} /> CDMX, México
          </div>

          <div className="flex justify-center gap-4 md:justify-start">
            <a
              href="#"
              className="transition hover:text-gold"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="transition hover:text-gold"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="pt-6 mt-12 text-sm text-center border-t border-white/20 text-white/60">
        © {new Date().getFullYear()} CasaBlanca Coffee Shop. Todos los derechos
        reservados.
      </div>
    </footer>
  );
};

export default Footer;
