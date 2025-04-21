import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { fetchProducts } from "@/services/productService";
import { addToCart } from "@/services/cartService";
import { useCart } from "@/context/CartContext";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category?: string;
};

const MotionButton = motion(Button);

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const isVisible = useInView(cardRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const { refreshCart, session_id } = useCart();

  const [adding, setAdding] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      
      console.log("DEBUG Producto a agregar:", product);
     
      const productId = product.id !== undefined && product.id !== null && product.id !== '' ? product.id : null;
      if (!productId) {
       
        console.warn("Producto sin id válido, no se puede agregar al carrito:", product);
        setAdding(false);
        return;
      }
      console.log("session_id:", session_id, "product_id:", productId);
      await addToCart(session_id, {
        product_id: productId,
        product_name: product.name,
        product_image: product.image,
        product_price: Number(product.price),
        quantity: 1,
      });
      await refreshCart();
      setAdding(false);
    } catch (e) {
      setAdding(false);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 0.77, 0.47, 0.99],
      }}
      whileHover={{ y: -5 }}
      className="relative h-full group"
    >
      <div
        className={clsx(
          "h-full overflow-hidden rounded-lg border border-[#f0e6db] bg-white",
          "transition-all duration-300 ease-out",
          "group-hover:shadow-lg group-hover:ring-1 group-hover:ring-[#e9d4ba]/50"
        )}
      >
        {/* Product Image with zoom effect */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={`${product.image}?auto=format&fit=crop&w=800&q=80`}
            alt={`${product.name} - ${product.description}`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          />
          {/* Category badge */}
          {product.category && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full bg-[#3B2F2F] text-[#f5e8db]">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between p-5 h-[40%]">
          <div>
            <motion.h3
              className="mb-2 text-lg font-medium text-[#3B2F2F] md:text-xl"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            >
              {product.name}
            </motion.h3>
            <motion.p
              className="text-sm text-[#3B2F2F]/80 line-clamp-2"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
            >
              {product.description}
            </motion.p>
          </div>
          <motion.div
            className="flex items-center justify-between mt-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
          >
            <span className="font-medium text-[#3B2F2F]">{product.price}</span>
            <MotionButton
              disabled={adding}
              size="sm"
              aria-label={`Agregar ${product.name} al carrito`}
              className={clsx(
                "bg-[#3B2F2F] hover:bg-[#5a4038] text-[#f5e8db] rounded-full",
                "px-4 py-2 text-sm flex gap-1.5 items-center mt-4",
                "transition-all duration-300 transform hover:scale-105",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a4038]",
                adding && "opacity-60 cursor-wait"
              )}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={16} strokeWidth={2} />
              <span className="hidden sm:inline">{adding ? 'Agregando...' : 'Agregar'}</span>
            </MotionButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductGrid = ({ filters = {} }) => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts(filters)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error conectando con backend: " + err.message);
        setLoading(false);
      });
  }, [filters]);

  if (loading) {
    return <div className="text-center py-10">Cargando productos...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#fefcf9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2
            id="products-heading"
            className="text-3xl font-light tracking-tight text-[#3B2F2F] sm:text-4xl"
          >
            <span className="block font-serif italic text-[#3B2F2F]/90">
              Nuestra
            </span>
            <span className="block mt-2 text-4xl font-bold sm:text-5xl">
              Colección Premium
            </span>
          </h2>
          <motion.p
            className="max-w-2xl mx-auto mt-4 text-base text-[#3B2F2F]/80 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Descubre la excelencia en cada detalle con nuestras selecciones
            cuidadosamente curadas.
          </motion.p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : ""}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* Optional View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button
            variant="outline"
            className="border-[#3B2F2F] text-[#3B2F2F] hover:bg-[#3B2F2F]/10 rounded-full px-8 py-3"
            onClick={() => (window.location.href = "/products")}
          >
            Ver colección completa
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
